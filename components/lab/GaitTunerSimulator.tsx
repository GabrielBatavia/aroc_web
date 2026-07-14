"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type StabilityStatus = "STABLE" | "WOBBLE" | "FALL_RISK";
type SimulationState = "local" | "updating" | "ready" | "error";

type GaitPreset = {
  id: string;
  label: string;
  description: string;
  values: {
    balanceGain: number;
    footHeightMm: number;
    periodMs: number;
    xMoveMm: number;
  };
};

type SimulationResult = {
  version: "1";
  summary: {
    stabilityScore: number;
    status: StabilityStatus;
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

type SimulationInput = {
  strideMm: number;
  periodMs: number;
  footClearanceMm: number;
  balanceGain: number;
  comHeightMm: number;
  lateralOffsetMm: number;
  steps: number;
};

const LAB_API_URL = process.env.NEXT_PUBLIC_LAB_API_URL?.replace(/\/$/, "");

const GAIT_PRESETS: GaitPreset[] = [
  {
    id: "match-safe",
    label: "Match Safe",
    description: "Parameter mendekati default OP3: cadence aman, foot clearance cukup, balance aktif.",
    values: { xMoveMm: 24, periodMs: 600, footHeightMm: 40, balanceGain: 74 },
  },
  {
    id: "fast-approach",
    label: "Fast Approach",
    description: "Robot mengejar bola lebih agresif. Lebih cepat, tapi margin stabilitas turun.",
    values: { xMoveMm: 42, periodMs: 470, footHeightMm: 42, balanceGain: 68 },
  },
  {
    id: "fall-risk",
    label: "Fall Risk",
    description: "Langkah terlalu besar, period terlalu pendek, dan balance feedback terlalu lemah.",
    values: { xMoveMm: 56, periodMs: 380, footHeightMm: 68, balanceGain: 44 },
  },
];

const STATUS_STYLE: Record<StabilityStatus, { bg: string; text: string; dot: string }> = {
  STABLE: { bg: "rgba(255,228,92,0.15)", text: "#ffe45c", dot: "#ffe45c" },
  WOBBLE: { bg: "rgba(255,170,40,0.18)", text: "#ffaa28", dot: "#ffaa28" },
  FALL_RISK: { bg: "rgba(255,80,60,0.18)", text: "#ff5040", dot: "#ff5040" },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function computePreviewStability(input: SimulationInput) {
  const stridePenalty = Math.max(0, input.strideMm - 32) * 1.3;
  const cadencePenalty = Math.max(0, 520 - input.periodMs) * 0.095 + Math.max(0, input.periodMs - 850) * 0.035;
  const footPenalty = Math.abs(input.footClearanceMm - 40) * 0.65;
  const balancePenalty = Math.max(0, 62 - input.balanceGain) * 1.05;
  const comPenalty = Math.abs(input.comHeightMm - 295) * 0.36;
  const lateralPenalty = Math.abs(input.lateralOffsetMm) * 1.1;
  return Math.round(clamp(96 - stridePenalty - cadencePenalty - footPenalty - balancePenalty - comPenalty - lateralPenalty, 0, 100));
}

function getStatus(stability: number): StabilityStatus {
  if (stability >= 70) return "STABLE";
  if (stability >= 40) return "WOBBLE";
  return "FALL_RISK";
}

function buildWaveform(input: SimulationInput, series?: SimulationResult["series"]): string {
  const amplitude = (input.footClearanceMm / 80) * 28 + 4;
  const frequency = (900 - input.periodMs) / 300 + 0.6;
  const strideWidth = (input.strideMm / 60) * 30 + 10;
  const points: string[] = [];
  const samples = series?.length ? series : undefined;

  for (let x = 0; x <= 360; x += 6) {
    const phase = x / 360;
    const sample = samples?.[Math.min(samples.length - 1, Math.round(phase * (samples.length - 1)))];
    const localWave = Math.sin((x / strideWidth) * frequency) * amplitude;
    const simulatedPitch = sample ? sample.pitch * 210 : 0;
    points.push(`${x},${(48 - localWave - simulatedPitch).toFixed(2)}`);
  }

  return `M ${points.join(" L ")}`;
}

function buildFootsteps(xMoveMm: number, balanceGain: number, lateralOffsetMm: number): Array<{ x: number; y: number; side: "L" | "R" }> {
  const stride = (xMoveMm / 60) * 60 + 20;
  const lateralLean = ((70 - balanceGain) / 70) * 8 + lateralOffsetMm * 0.12;
  const steps: Array<{ x: number; y: number; side: "L" | "R" }> = [];

  for (let index = 0; index < 5; index += 1) {
    steps.push({ x: 40 + index * stride + lateralLean, y: 140, side: index % 2 === 0 ? "L" : "R" });
    steps.push({ x: 40 + index * stride - lateralLean + stride / 2, y: 156, side: index % 2 === 0 ? "R" : "L" });
  }

  return steps;
}

function isSimulationResult(value: unknown): value is SimulationResult {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SimulationResult>;
  return Boolean(candidate.summary && candidate.metrics && Array.isArray(candidate.series));
}

export function GaitTunerSimulator() {
  const [xMoveMm, setXMoveMm] = useState(24);
  const [periodMs, setPeriodMs] = useState(600);
  const [footHeightMm, setFootHeightMm] = useState(40);
  const [balanceGain, setBalanceGain] = useState(74);
  const [comHeightMm, setComHeightMm] = useState(295);
  const [lateralOffsetMm, setLateralOffsetMm] = useState(0);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [simulationState, setSimulationState] = useState<SimulationState>(LAB_API_URL ? "updating" : "local");
  const [simulationError, setSimulationError] = useState<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);
  const requestIdRef = useRef(0);
  const cacheRef = useRef(new Map<string, SimulationResult>());

  const input = useMemo<SimulationInput>(
    () => ({
      strideMm: xMoveMm,
      periodMs,
      footClearanceMm: footHeightMm,
      balanceGain,
      comHeightMm,
      lateralOffsetMm,
      steps: 120,
    }),
    [balanceGain, comHeightMm, footHeightMm, lateralOffsetMm, periodMs, xMoveMm],
  );
  const simulationKey = useMemo(() => JSON.stringify(input), [input]);

  useEffect(() => {
    if (!LAB_API_URL) {
      setSimulationState("local");
      return;
    }

    const cached = cacheRef.current.get(simulationKey);
    if (cached) {
      setSimulation(cached);
      setSimulationError(null);
      setSimulationState("ready");
      return;
    }

    const controller = new AbortController();
    const requestId = ++requestIdRef.current;
    setSimulationError(null);
    setSimulationState("updating");

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`${LAB_API_URL}/v1/simulations/gait`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: simulationKey,
          signal: controller.signal,
        });
        const payload: unknown = await response.json();

        if (!response.ok || !isSimulationResult(payload)) {
          throw new Error("The simulation service returned an invalid response.");
        }
        if (requestId !== requestIdRef.current) return;

        if (cacheRef.current.size >= 40) {
          const oldestKey = cacheRef.current.keys().next().value;
          if (oldestKey) cacheRef.current.delete(oldestKey);
        }
        cacheRef.current.set(simulationKey, payload);
        setSimulation(payload);
        setSimulationState("ready");
      } catch (error) {
        if (controller.signal.aborted || requestId !== requestIdRef.current) return;
        setSimulationState("error");
        setSimulationError(error instanceof Error ? error.message : "Unable to run the detailed simulation.");
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [retryNonce, simulationKey]);

  const previewStability = computePreviewStability(input);
  const stability = simulation?.summary.stabilityScore ?? previewStability;
  const status = simulation?.summary.status ?? getStatus(previewStability);
  const statusStyle = STATUS_STYLE[status];
  const waveformPath = buildWaveform(input, simulation?.series);
  const footsteps = buildFootsteps(xMoveMm, balanceGain, lateralOffsetMm);
  const sourceOutput = status === "FALL_RISK" ? "hold tuning" : "/robotis/walking/set_params";
  const commandHint = status === "STABLE" ? "/robotis/walking/command start" : "tune before start";
  const leanOffset = ((70 - balanceGain) / 70) * 12 + lateralOffsetMm * 0.24;
  const simulationLabel =
    simulationState === "ready"
      ? "Detailed engine"
      : simulationState === "updating"
        ? "Updating simulation"
        : simulationState === "error"
          ? "Last result retained"
          : "Local preview";

  const controls = [
    { id: "gait-x-move", label: "x_move_amplitude", value: xMoveMm, setter: setXMoveMm, min: 0, max: 60, unit: "mm" },
    { id: "gait-period", label: "period_time", value: periodMs, setter: setPeriodMs, min: 350, max: 900, unit: "ms" },
    { id: "gait-foot-height", label: "z_move_amplitude", value: footHeightMm, setter: setFootHeightMm, min: 10, max: 80, unit: "mm" },
    { id: "gait-balance", label: "balance feedback", value: balanceGain, setter: setBalanceGain, min: 0, max: 100, unit: "%" },
    { id: "gait-com-height", label: "center of mass", value: comHeightMm, setter: setComHeightMm, min: 220, max: 360, unit: "mm" },
    { id: "gait-lateral-offset", label: "lateral offset", value: lateralOffsetMm, setter: setLateralOffsetMm, min: -40, max: 40, unit: "mm" },
  ];

  return (
    <div className="grid gap-0 lg:grid-cols-[340px_1fr]">
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em]"
            style={{ background: statusStyle.bg, color: statusStyle.text }}
            aria-live="polite"
          >
            <span className="size-1.5 rounded-full animate-pulse" style={{ background: statusStyle.dot }} aria-hidden="true" />
            {status}
          </div>
          <div className="mt-4 font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.5)]">
            Stability Score
          </div>
          <div className="mt-1 font-display text-[3.5rem] font-black leading-none tracking-tight transition-all duration-300" style={{ color: statusStyle.text }}>
            {Math.round(stability)}<span className="text-[1.5rem] opacity-60">%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(248,247,240,0.1)]">
            <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${stability}%`, background: statusStyle.dot }} />
          </div>
          <div className="mt-3 flex items-center gap-2 font-mono text-[0.52rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.45)]">
            <span className="size-1.5 rounded-full" style={{ background: simulationState === "error" ? "#ff5040" : statusStyle.dot }} />
            {simulationLabel}
          </div>
        </div>

        <div>
          <div className="mb-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.38)]">Scenario Preset</div>
          <div className="grid gap-2">
            {GAIT_PRESETS.map((preset) => (
              <button
                className="rounded-[0.95rem] border border-[rgba(255,228,92,0.12)] bg-[rgba(255,228,92,0.045)] px-3 py-2 text-left transition duration-200 hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(255,228,92,0.08)]"
                key={preset.id}
                onClick={() => {
                  setXMoveMm(preset.values.xMoveMm);
                  setPeriodMs(preset.values.periodMs);
                  setFootHeightMm(preset.values.footHeightMm);
                  setBalanceGain(preset.values.balanceGain);
                  setComHeightMm(295);
                  setLateralOffsetMm(0);
                }}
                type="button"
              >
                <span className="block text-[0.78rem] font-black text-[rgba(248,247,240,0.9)]">{preset.label}</span>
                <span className="mt-1 block text-[0.68rem] leading-[1.45] text-[rgba(248,247,240,0.48)]">{preset.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {controls.map((control) => (
            <label key={control.id} className="block">
              <span className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[0.82rem] font-bold text-[rgba(248,247,240,0.9)]">{control.label}</span>
                <span className="font-mono text-[0.7rem] font-black text-[var(--yellow)]">{control.value}{control.unit}</span>
              </span>
              <input
                id={control.id}
                aria-label={`${control.label}: ${control.value}${control.unit}`}
                className="w-full cursor-pointer accent-[var(--yellow)] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:shadow-none"
                max={control.max}
                min={control.min}
                onChange={(event) => control.setter(Number(event.target.value))}
                type="range"
                value={control.value}
              />
            </label>
          ))}
        </div>

        <div className="rounded-[1rem] border border-[rgba(255,228,92,0.14)] bg-[rgba(248,247,240,0.04)] p-4 text-[0.82rem] leading-[1.7] text-[rgba(248,247,240,0.6)]">
          Simulator menghitung pengaruh stride, cadence, foot clearance, balance feedback, center of mass, dan lateral offset pada satu siklus gait. Ini estimator edukatif, bukan command ke robot fisik.
        </div>

        {simulationState === "error" && (
          <div className="rounded-[1rem] border border-[rgba(255,80,60,0.24)] bg-[rgba(255,80,60,0.08)] p-4 text-[0.78rem] leading-[1.6] text-[rgba(248,247,240,0.7)]" role="status">
            <p>{simulationError}</p>
            <button className="mt-3 font-mono text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#ffb3a8] underline underline-offset-4" onClick={() => setRetryNonce((value) => value + 1)} type="button">Retry simulator</button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 rounded-[1rem] border border-[rgba(255,228,92,0.12)] bg-[rgba(3,6,16,0.42)] p-3">
          {[{ label: "topic", value: sourceOutput }, { label: "command", value: commandHint }].map((item) => (
            <div key={item.label} className="min-w-0">
              <div className="font-mono text-[0.48rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.34)]">{item.label}</div>
              <div className="mt-1 truncate font-mono text-[0.66rem] font-black text-[var(--yellow)]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-[rgba(255,228,92,0.1)] p-4 sm:p-6 lg:border-l lg:border-t-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.4)]">
          <span>Detailed Gait Simulation</span>
          {simulation && <span className="text-[var(--yellow)]">v{simulation.version} / {simulation.metrics.estimatedCadenceHz.toFixed(2)} Hz</span>}
        </div>

        <svg viewBox="0 0 420 200" className="w-full rounded-[1.2rem] border border-[rgba(255,228,92,0.1)] bg-[rgba(3,6,16,0.5)]" aria-label="Humanoid robot gait simulation on soccer field" role="img">
          <rect fill="#0d2218" width="420" height="200" />
          <rect fill="#122b1e" x="0" y="160" width="420" height="40" />
          {[0, 60, 120, 180, 240, 300, 360, 420].map((x) => <line key={x} x1={x} y1="120" x2={x} y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />)}
          <line x1="0" y1="160" x2="420" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          {footsteps.map((footstep, index) => <ellipse key={index} cx={footstep.x} cy={footstep.y} rx={6} ry={3.5} fill={index === 0 ? statusStyle.dot : "rgba(255,228,92,0.2)"} opacity={1 - index * 0.12} />)}
          <line x1="120" y1="42" x2="120" y2="166" stroke={statusStyle.dot} strokeDasharray="3 5" opacity="0.28" />
          <circle cx={120 + leanOffset * 1.4} cy="102" r="5" fill={statusStyle.dot} opacity="0.85" />

          <g transform={`translate(80, 30) rotate(${leanOffset}, 40, 80)`}>
            <rect x="30" y="0" width="20" height="22" rx="5" fill="rgba(248,247,240,0.85)" />
            <rect x="33" y="6" width="14" height="7" rx="2" fill={statusStyle.dot} opacity="0.9" />
            <rect x="37" y="22" width="6" height="6" rx="1" fill="rgba(248,247,240,0.5)" />
            <rect x="22" y="28" width="36" height="38" rx="7" fill="rgba(248,247,240,0.8)" />
            <rect x="30" y="34" width="20" height="10" rx="3" fill={statusStyle.dot} opacity="0.35" />
            <rect x="8" y="30" width="12" height="30" rx="5" fill="rgba(248,247,240,0.65)" />
            <rect x="60" y="30" width="12" height="30" rx="5" fill="rgba(248,247,240,0.65)" />
            <rect x="24" y="66" width="14" height="36" rx="5" fill="rgba(248,247,240,0.75)" transform={`rotate(${-footHeightMm * 0.17}, 31, 66)`} />
            <rect x="42" y="66" width="14" height="36" rx="5" fill="rgba(248,247,240,0.75)" transform={`rotate(${footHeightMm * 0.17}, 49, 66)`} />
            <rect x="20" y="98" width="20" height="8" rx="3" fill="rgba(248,247,240,0.6)" />
            <rect x="40" y="98" width="20" height="8" rx="3" fill="rgba(248,247,240,0.6)" />
          </g>

          <g transform="translate(0, 90)"><path d={waveformPath} fill="none" stroke={statusStyle.dot} strokeWidth="2" strokeDasharray="4 2" opacity="0.6" /></g>
          <rect x="286" y="12" width="120" height="28" rx="6" fill="rgba(3,6,16,0.85)" />
          <text x="346" y="30" textAnchor="middle" fill={statusStyle.dot} fontFamily="monospace" fontSize="10" fontWeight="bold">{status}</text>
        </svg>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "min margin", value: simulation ? `${simulation.metrics.minimumMargin.toFixed(3)}m` : "preview" },
            { label: "mean margin", value: simulation ? `${simulation.metrics.meanMargin.toFixed(3)}m` : "preview" },
            { label: "cadence", value: simulation ? `${simulation.metrics.estimatedCadenceHz.toFixed(2)}Hz` : `${(1000 / periodMs).toFixed(2)}Hz` },
            { label: "risk flags", value: simulation ? String(simulation.metrics.riskFactors.length) : "—" },
          ].map((metric) => <div key={metric.label} className="rounded-xl border border-[rgba(255,228,92,0.12)] bg-[rgba(3,6,16,0.5)] p-3 text-center"><div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">{metric.label}</div><div className="mt-1 font-mono text-[0.82rem] font-black text-[var(--yellow)]">{metric.value}</div></div>)}
        </div>

        <div className="mt-4 rounded-[1rem] border border-[rgba(255,228,92,0.12)] bg-[rgba(3,6,16,0.42)] p-4">
          <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.38)]">Simulation recommendation</div>
          <p className="mt-2 text-[0.82rem] leading-[1.65] text-[rgba(248,247,240,0.68)]">{simulation?.summary.recommendation ?? "Connect the Lab API to inspect per-phase stability and parameter recommendations."}</p>
          {simulation && simulation.metrics.riskFactors.length > 0 && <ul className="mt-3 grid gap-1 text-[0.72rem] leading-[1.5] text-[rgba(248,247,240,0.48)]">{simulation.metrics.riskFactors.slice(0, 3).map((risk) => <li key={risk}>• {risk}</li>)}</ul>}
        </div>
      </div>
    </div>
  );
}
