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
    label: "Langkah aman",
    description: "Nilai awal model pembelajaran: langkah sedang, tinggi kaki cukup, dan bantuan keseimbangan aktif.",
    values: { xMoveMm: 24, periodMs: 600, footHeightMm: 40, balanceGain: 74 },
  },
  {
    id: "fast-approach",
    label: "Mendekati lebih cepat",
    description: "Langkah lebih panjang dengan waktu lebih singkat. Robot bergerak cepat, tetapi margin stabilitas berkurang.",
    values: { xMoveMm: 42, periodMs: 470, footHeightMm: 42, balanceGain: 68 },
  },
  {
    id: "fall-risk",
    label: "Risiko jatuh",
    description: "Langkah terlalu besar, waktu siklus terlalu singkat, dan bantuan keseimbangan terlalu lemah.",
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
          throw new Error("Layanan simulasi mengembalikan respons yang tidak sesuai.");
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
        setSimulationError(error instanceof Error ? error.message : "Simulasi detail belum dapat dijalankan.");
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
      ? "Simulasi detail"
      : simulationState === "updating"
        ? "Memperbarui simulasi"
        : simulationState === "error"
          ? "Hasil terakhir dipertahankan"
          : "Pratinjau lokal";

  const controls = [
    { id: "gait-x-move", label: "Panjang langkah (x_move_amplitude)", value: xMoveMm, setter: setXMoveMm, min: 0, max: 60, unit: "mm" },
    { id: "gait-period", label: "Waktu satu siklus (period_time)", value: periodMs, setter: setPeriodMs, min: 350, max: 900, unit: "ms" },
    { id: "gait-foot-height", label: "Tinggi kaki (z_move_amplitude)", value: footHeightMm, setter: setFootHeightMm, min: 10, max: 80, unit: "mm" },
    { id: "gait-balance", label: "Bantuan keseimbangan", value: balanceGain, setter: setBalanceGain, min: 0, max: 100, unit: "%" },
    { id: "gait-com-height", label: "Tinggi pusat massa", value: comHeightMm, setter: setComHeightMm, min: 220, max: 360, unit: "mm" },
    { id: "gait-lateral-offset", label: "Pergeseran kiri atau kanan", value: lateralOffsetMm, setter: setLateralOffsetMm, min: -40, max: 40, unit: "mm" },
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
            Skor stabilitas
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
          <div className="mb-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.38)]">Skenario pembelajaran</div>
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
          Simulator menghitung pengaruh panjang langkah, waktu siklus, tinggi kaki, bantuan keseimbangan, pusat massa, dan pergeseran ke samping pada satu siklus gait. Ini adalah estimator pembelajaran, bukan perintah ke robot fisik.
        </div>

        {simulationState === "error" && (
          <div className="rounded-[1rem] border border-[rgba(255,80,60,0.24)] bg-[rgba(255,80,60,0.08)] p-4 text-[0.78rem] leading-[1.6] text-[rgba(248,247,240,0.7)]" role="status">
            <p>{simulationError}</p>
            <button className="mt-3 font-mono text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#ffb3a8] underline underline-offset-4" onClick={() => setRetryNonce((value) => value + 1)} type="button">Coba simulasi lagi</button>
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
          <span>Ilustrasi stabilitas gait</span>
          {simulation && <span className="text-[var(--yellow)]">v{simulation.version} / {simulation.metrics.estimatedCadenceHz.toFixed(2)} Hz</span>}
        </div>

        <svg viewBox="0 0 420 220" className="w-full rounded-[1.2rem] border border-[rgba(255,228,92,0.1)] bg-[rgba(3,6,16,0.5)]" aria-label="Ilustrasi area tumpuan, pusat massa, dan fase langkah robot humanoid" role="img">
          <rect fill="#0a1628" height="220" width="420" />
          <path d="M104 173 165 38h91l61 135Z" fill="rgba(255,228,92,0.065)" stroke={statusStyle.dot} strokeDasharray="6 5" strokeOpacity="0.72" strokeWidth="2" />
          <text fill="rgba(248,247,240,0.5)" fontFamily="monospace" fontSize="9" x="18" y="22">TAMPAK ATAS · AREA TUMPUAN</text>
          <text fill="rgba(248,247,240,0.46)" fontFamily="monospace" fontSize="8" x="18" y="207">Kaki yang menumpu membentuk area aman untuk pusat massa.</text>

          <g className="gait-swing-foot">
            <rect fill="rgba(255,228,92,0.14)" height="72" rx="13" stroke={statusStyle.dot} strokeWidth="2.5" width="43" x="117" y="116" />
            <text fill={statusStyle.dot} fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle" x="138" y="156">KAKI</text>
            <text fill={statusStyle.dot} fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle" x="138" y="168">AYUN</text>
          </g>
          <g>
            <rect fill="rgba(248,247,240,0.12)" height="72" rx="13" stroke="rgba(248,247,240,0.7)" strokeWidth="2.5" width="43" x="260" y="116" />
            <text fill="#f8f7f0" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle" x="281" y="156">KAKI</text>
            <text fill="#f8f7f0" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle" x="281" y="168">TUMPU</text>
          </g>

          <circle className="gait-com-marker" cx={210 + leanOffset * 1.25} cy="104" fill={statusStyle.dot} r="10" />
          <circle cx={210 + leanOffset * 1.25} cy="104" fill="none" opacity="0.32" r="18" stroke={statusStyle.dot} strokeWidth="2" />
          <text fill={statusStyle.dot} fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle" x="210" y="72">PUSAT MASSA</text>

          <line stroke="rgba(248,247,240,0.16)" strokeWidth="1" x1="40" x2="380" y1="194" y2="194" />
          {footsteps.map((footstep, index) => <ellipse key={index} cx={64 + index * 45} cy="194" fill={index === 0 ? statusStyle.dot : "rgba(255,228,92,0.22)"} opacity={1 - index * 0.12} rx="7" ry="3.6" />)}
          <circle className="gait-phase-dot" cx="56" cy="194" fill={statusStyle.dot} r="5" />

          <g transform="translate(0, 106)"><path d={waveformPath} fill="none" opacity="0.56" stroke={statusStyle.dot} strokeDasharray="4 2" strokeWidth="2" /></g>
          <rect fill="rgba(3,6,16,0.86)" height="29" rx="6" width="132" x="270" y="12" />
          <text fill={statusStyle.dot} fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle" x="336" y="30">{status}</text>
        </svg>

        <div className="mt-4 grid gap-2 rounded-[1rem] border border-[rgba(255,228,92,0.12)] bg-[rgba(255,228,92,0.045)] p-4 sm:grid-cols-3">
          <div><div className="font-mono text-[0.48rem] font-black uppercase tracking-[0.13em] text-[var(--yellow)]">1. Kaki tumpu</div><p className="mt-1 text-[0.72rem] leading-[1.55] text-[rgba(248,247,240,0.62)]">Satu kaki menahan berat ketika kaki lain mulai bergerak.</p></div>
          <div><div className="font-mono text-[0.48rem] font-black uppercase tracking-[0.13em] text-[var(--yellow)]">2. Pusat massa</div><p className="mt-1 text-[0.72rem] leading-[1.55] text-[rgba(248,247,240,0.62)]">Titik kuning perlu tetap dekat area tumpuan agar langkah tidak goyah.</p></div>
          <div><div className="font-mono text-[0.48rem] font-black uppercase tracking-[0.13em] text-[var(--yellow)]">3. Fase langkah</div><p className="mt-1 text-[0.72rem] leading-[1.55] text-[rgba(248,247,240,0.62)]">Penanda bawah bergerak melalui satu siklus gait dari hasil simulasi.</p></div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "margin minimum", value: simulation ? `${simulation.metrics.minimumMargin.toFixed(3)}m` : "pratinjau" },
            { label: "margin rata-rata", value: simulation ? `${simulation.metrics.meanMargin.toFixed(3)}m` : "pratinjau" },
            { label: "cadence", value: simulation ? `${simulation.metrics.estimatedCadenceHz.toFixed(2)}Hz` : `${(1000 / periodMs).toFixed(2)}Hz` },
            { label: "risk flags", value: simulation ? String(simulation.metrics.riskFactors.length) : "—" },
          ].map((metric) => <div key={metric.label} className="rounded-xl border border-[rgba(255,228,92,0.12)] bg-[rgba(3,6,16,0.5)] p-3 text-center"><div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">{metric.label}</div><div className="mt-1 font-mono text-[0.82rem] font-black text-[var(--yellow)]">{metric.value}</div></div>)}
        </div>

        <div className="mt-4 rounded-[1rem] border border-[rgba(255,228,92,0.12)] bg-[rgba(3,6,16,0.42)] p-4">
          <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.38)]">Penjelasan hasil simulasi</div>
          <p className="mt-2 text-[0.82rem] leading-[1.65] text-[rgba(248,247,240,0.68)]">{simulation?.summary.recommendation ?? "Hubungkan Lab API untuk melihat stabilitas setiap fase dan saran parameter yang lebih rinci."}</p>
          {simulation && simulation.metrics.riskFactors.length > 0 && <ul className="mt-3 grid gap-1 text-[0.72rem] leading-[1.5] text-[rgba(248,247,240,0.48)]">{simulation.metrics.riskFactors.slice(0, 3).map((risk) => <li key={risk}>• {risk}</li>)}</ul>}
        </div>
      </div>
    </div>
  );
}
