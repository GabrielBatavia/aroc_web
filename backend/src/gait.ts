export type GaitSimulationInput = {
  strideMm: number;
  periodMs: number;
  footClearanceMm: number;
  balanceGain: number;
  comHeightMm: number;
  lateralOffsetMm: number;
  steps: number;
};

export type GaitSimulationStatus = "STABLE" | "WOBBLE" | "FALL_RISK";

export type GaitSimulationResult = {
  version: "1";
  summary: {
    stabilityScore: number;
    status: GaitSimulationStatus;
    recommendation: string;
  };
  metrics: {
    minimumMargin: number;
    meanMargin: number;
    estimatedCadenceHz: number;
    riskFactors: string[];
  };
  series: Array<{
    phase: number;
    stability: number;
    roll: number;
    pitch: number;
  }>;
};

export type ValidationError = {
  field: keyof GaitSimulationInput;
  message: string;
};

export type ValidationResult =
  | { ok: true; value: GaitSimulationInput }
  | { ok: false; errors: ValidationError[] };

const LIMITS: Record<keyof GaitSimulationInput, { min: number; max: number }> = {
  strideMm: { min: 0, max: 70 },
  periodMs: { min: 250, max: 1200 },
  footClearanceMm: { min: 10, max: 90 },
  balanceGain: { min: 0, max: 100 },
  comHeightMm: { min: 220, max: 360 },
  lateralOffsetMm: { min: -40, max: 40 },
  steps: { min: 24, max: 240 },
};

const RISK_FACTOR_LABELS: Record<string, string> = {
  stride: "Stride terlalu besar untuk margin stabilitas saat ini.",
  cadence: "Cadence terlalu tinggi untuk parameter stabil saat ini.",
  clearance: "Foot clearance terlalu jauh dari rentang efisien.",
  balance: "Balance feedback perlu dinaikkan.",
  comHeight: "Tinggi center of mass meningkatkan risiko osilasi.",
  lateralOffset: "Lateral offset perlu didekatkan ke center line.",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function round(value: number, precision = 2) {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
}

export function validateGaitSimulationInput(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {
      ok: false,
      errors: [{ field: "steps", message: "Request body must be a JSON object." }],
    };
  }

  const record = input as Record<string, unknown>;
  const errors: ValidationError[] = [];
  const value = {} as GaitSimulationInput;

  for (const field of Object.keys(LIMITS) as Array<keyof GaitSimulationInput>) {
    const rawValue = record[field];
    const limit = LIMITS[field];

    if (typeof rawValue !== "number" || !Number.isFinite(rawValue)) {
      errors.push({ field, message: `${field} must be a finite number.` });
      continue;
    }

    if (rawValue < limit.min || rawValue > limit.max) {
      errors.push({ field, message: `${field} must be between ${limit.min} and ${limit.max}.` });
      continue;
    }

    if (field === "steps" && !Number.isInteger(rawValue)) {
      errors.push({ field, message: "steps must be an integer." });
      continue;
    }

    value[field] = rawValue;
  }

  return errors.length > 0 ? { ok: false, errors } : { ok: true, value };
}

export function simulateGait(input: GaitSimulationInput): GaitSimulationResult {
  const penalties = {
    stride: Math.max(0, input.strideMm - 32) * 1.3,
    cadence:
      Math.max(0, 520 - input.periodMs) * 0.095 +
      Math.max(0, input.periodMs - 850) * 0.035,
    clearance: Math.abs(input.footClearanceMm - 40) * 0.65,
    balance:
      Math.max(0, 62 - input.balanceGain) * 1.05 +
      Math.max(0, input.balanceGain - 92) * 0.25,
    comHeight: Math.abs(input.comHeightMm - 295) * 0.36,
    lateralOffset: Math.abs(input.lateralOffsetMm) * 1.1,
  };

  const staticPenalty = Object.values(penalties).reduce((sum, value) => sum + value, 0);
  const cadenceHz = 1000 / input.periodMs;
  const dynamicAmplitude =
    3.2 +
    input.strideMm / 34 +
    Math.max(0, cadenceHz - 1.6) * 2.8 +
    Math.abs(input.lateralOffsetMm) / 18;

  const series: GaitSimulationResult["series"] = [];
  const margins: number[] = [];
  const stabilityValues: number[] = [];

  for (let index = 0; index < input.steps; index += 1) {
    const phase = index / (input.steps - 1);
    const cycle = phase * Math.PI * 2;
    const supportLoad = Math.abs(Math.sin(cycle));
    const transferLoad = Math.abs(Math.cos(cycle));
    const dynamicPenalty = dynamicAmplitude * (0.42 + supportLoad * 0.58) + transferLoad * (input.strideMm / 70) * 2;
    const phasePenalty = staticPenalty + dynamicPenalty;
    const stability = clamp(100 - phasePenalty, 0, 100);
    const margin = clamp(0.4 - phasePenalty / 180, 0, 0.4);
    const roll =
      (input.lateralOffsetMm / 180 + Math.sin(cycle) * (input.strideMm / 420)) *
      (1.25 - input.balanceGain / 260);
    const pitch =
      Math.cos(cycle) * (input.footClearanceMm / 1500 + input.strideMm / 1800) +
      (input.comHeightMm - 295) / 9000;

    series.push({
      phase: round(phase, 4),
      stability: round(stability),
      roll: round(roll, 4),
      pitch: round(pitch, 4),
    });
    margins.push(margin);
    stabilityValues.push(stability);
  }

  const stabilityScore = round(
    stabilityValues.reduce((sum, value) => sum + value, 0) / stabilityValues.length,
    0,
  );
  const status: GaitSimulationStatus =
    stabilityScore >= 70 ? "STABLE" : stabilityScore >= 40 ? "WOBBLE" : "FALL_RISK";
  const riskFactors = Object.entries(penalties)
    .filter(([, value]) => value >= 3)
    .sort(([, left], [, right]) => right - left)
    .map(([factor]) => RISK_FACTOR_LABELS[factor]);
  const leadingRisk = Object.entries(penalties).sort(([, left], [, right]) => right - left)[0];
  const recommendation =
    status === "STABLE"
      ? "Parameter berada dalam rentang simulasi stabil. Ubah satu parameter per kali untuk menjaga margin."
      : leadingRisk && leadingRisk[1] > 0
        ? RISK_FACTOR_LABELS[leadingRisk[0]]
        : "Kurangi variasi parameter dan ulangi simulasi.";

  return {
    version: "1",
    summary: { stabilityScore, status, recommendation },
    metrics: {
      minimumMargin: round(Math.min(...margins), 3),
      meanMargin: round(margins.reduce((sum, value) => sum + value, 0) / margins.length, 3),
      estimatedCadenceHz: round(cadenceHz),
      riskFactors,
    },
    series,
  };
}
