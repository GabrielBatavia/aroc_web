"use client";

import { useEffect, useRef, useState } from "react";

type StabilityStatus = "STABLE" | "WOBBLE" | "FALL_RISK";

function computeStability(xMoveMm: number, periodMs: number, footHeightMm: number, balanceGain: number): number {
  // OP3 walking is sensitive to stride, cadence, foot clearance, and balance feedback.
  const stridePenalty = xMoveMm > 38 ? (xMoveMm - 38) * 1.6 : xMoveMm < 6 ? (6 - xMoveMm) * 1.1 : 0;
  const cadencePenalty = periodMs < 470 ? (470 - periodMs) * 0.13 : periodMs > 760 ? (periodMs - 760) * 0.08 : 0;
  const footPenalty = Math.abs(footHeightMm - 40) * 0.9;
  const balancePenalty = balanceGain < 60 ? (60 - balanceGain) * 0.9 : balanceGain > 88 ? (balanceGain - 88) * 0.35 : 0;
  const raw = 100 - stridePenalty - cadencePenalty - footPenalty - balancePenalty;
  return Math.max(0, Math.min(100, raw));
}

function getStatus(stability: number): StabilityStatus {
  if (stability >= 70) return "STABLE";
  if (stability >= 40) return "WOBBLE";
  return "FALL_RISK";
}

const STATUS_STYLE: Record<StabilityStatus, { bg: string; text: string; dot: string }> = {
  STABLE:    { bg: "rgba(255,228,92,0.15)",  text: "#ffe45c", dot: "#ffe45c" },
  WOBBLE:    { bg: "rgba(255,170,40,0.18)",  text: "#ffaa28", dot: "#ffaa28" },
  FALL_RISK: { bg: "rgba(255,80,60,0.18)",   text: "#ff5040", dot: "#ff5040" },
};

// Build SVG waveform path representing gait cadence.
function buildWaveform(xMoveMm: number, footHeightMm: number, periodMs: number, phase: number): string {
  const amplitude = (footHeightMm / 80) * 28 + 4;
  const frequency = (900 - periodMs) / 300 + 0.6;
  const strideWidth = (xMoveMm / 60) * 30 + 10;
  const points: string[] = [];
  for (let x = 0; x <= 360; x += 3) {
    const y = 48 - Math.sin(((x / strideWidth) + phase) * frequency) * amplitude;
    points.push(`${x},${y}`);
  }
  return `M ${points.join(" L ")}`;
}

// Footstep positions
function buildFootsteps(xMoveMm: number, balanceGain: number): Array<{ x: number; y: number; side: "L" | "R" }> {
  const stride = (xMoveMm / 60) * 60 + 20;
  const lateralLean = ((70 - balanceGain) / 70) * 8;
  const steps: Array<{ x: number; y: number; side: "L" | "R" }> = [];
  for (let i = 0; i < 5; i++) {
    steps.push({ x: 40 + i * stride + lateralLean, y: 140, side: i % 2 === 0 ? "L" : "R" });
    steps.push({ x: 40 + i * stride - lateralLean + stride / 2, y: 156, side: i % 2 === 0 ? "R" : "L" });
  }
  return steps;
}

export function GaitTunerSimulator() {
  const [xMoveMm, setXMoveMm] = useState(24);
  const [periodMs, setPeriodMs] = useState(600);
  const [footHeightMm, setFootHeightMm] = useState(40);
  const [balanceGain, setBalanceGain] = useState(74);
  const [phase, setPhase] = useState(0);
  const rafRef = useRef<number | null>(null);

  const stability = computeStability(xMoveMm, periodMs, footHeightMm, balanceGain);
  const status = getStatus(stability);
  const statusStyle = STATUS_STYLE[status];
  const waveformPath = buildWaveform(xMoveMm, footHeightMm, periodMs, phase);
  const footsteps = buildFootsteps(xMoveMm, balanceGain);

  // Animate waveform
  useEffect(() => {
    let last = 0;
    const tick = (t: number) => {
      if (t - last > 16) {
        setPhase((p) => p + ((900 - periodMs) / 550) * 0.12 + 0.02);
        last = t;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [periodMs]);

  const leanOffset = ((70 - balanceGain) / 70) * 12;

  const controls = [
    { id: "gait-x-move", label: "x_move_amplitude", value: xMoveMm, setter: setXMoveMm, min: 0, max: 60, unit: "mm" },
    { id: "gait-period", label: "period_time", value: periodMs, setter: setPeriodMs, min: 350, max: 900, unit: "ms" },
    { id: "gait-foot-height", label: "z_move_amplitude", value: footHeightMm, setter: setFootHeightMm, min: 10, max: 80, unit: "mm" },
    { id: "gait-balance", label: "balance feedback", value: balanceGain, setter: setBalanceGain, min: 0, max: 100, unit: "%" },
  ];

  return (
    <div className="grid gap-0 lg:grid-cols-[340px_1fr]">
      {/* Controls */}
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em]"
            style={{ background: statusStyle.bg, color: statusStyle.text }}
            aria-live="polite"
          >
            <span
              className="size-1.5 rounded-full animate-pulse"
              style={{ background: statusStyle.dot }}
              aria-hidden="true"
            />
            {status}
          </div>
          <div className="mt-4 font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.5)]">
            Stability Score
          </div>
          <div
            className="mt-1 font-display text-[3.5rem] font-black leading-none tracking-tight transition-all duration-300"
            style={{ color: statusStyle.text }}
          >
            {Math.round(stability)}
            <span className="text-[1.5rem] opacity-60">%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(248,247,240,0.1)]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${stability}%`, background: statusStyle.dot }}
            />
          </div>
        </div>

        <div className="grid gap-5">
          {controls.map((ctrl) => (
            <label key={ctrl.id} className="block">
              <span className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[0.82rem] font-bold text-[rgba(248,247,240,0.9)]">{ctrl.label}</span>
                <span className="font-mono text-[0.7rem] font-black text-[var(--yellow)]">
                  {ctrl.value}
                  {ctrl.unit}
                </span>
              </span>
              <input
                id={ctrl.id}
                aria-label={`${ctrl.label}: ${ctrl.value}${ctrl.unit}`}
                className="w-full cursor-pointer accent-[var(--yellow)] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:shadow-none"
                max={ctrl.max}
                min={ctrl.min}
                onChange={(e) => ctrl.setter(Number(e.target.value))}
                type="range"
                value={ctrl.value}
              />
            </label>
          ))}
        </div>

        <div className="rounded-[1rem] border border-[rgba(255,228,92,0.14)] bg-[rgba(248,247,240,0.04)] p-4 text-[0.82rem] leading-[1.7] text-[rgba(248,247,240,0.6)]">
          Di source OP3, walking bukan animasi bebas: parameter seperti x_move_amplitude, period_time,
          z_move_amplitude, dan balance feedback masuk ke /robotis/walking/set_params. Satu nilai ekstrem bisa mengakibatkan{" "}
          <span className="font-bold text-[rgba(255,80,60,0.9)]">FALL_RISK</span>.
        </div>
      </div>

      {/* Visualization */}
      <div className="relative border-t border-[rgba(255,228,92,0.1)] p-4 sm:p-6 lg:border-l lg:border-t-0">
        <div className="font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.4)] mb-3">
          Live Simulation
        </div>

        {/* Field + Robot SVG */}
        <svg
          viewBox="0 0 420 200"
          className="w-full rounded-[1.2rem] border border-[rgba(255,228,92,0.1)] bg-[rgba(3,6,16,0.5)]"
          aria-label="Humanoid robot gait simulation on soccer field"
          role="img"
        >
          {/* Field */}
          <rect fill="#0d2218" width="420" height="200" />
          <rect fill="#122b1e" x="0" y="160" width="420" height="40" />
          {/* Grid lines */}
          {[0, 60, 120, 180, 240, 300, 360, 420].map((x) => (
            <line key={x} x1={x} y1="120" x2={x} y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          <line x1="0" y1="160" x2="420" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          {/* Footsteps */}
          {footsteps.map((f, i) => (
            <ellipse
              key={i}
              cx={f.x}
              cy={f.y}
              rx={6}
              ry={3.5}
              fill={i === 0 ? statusStyle.dot : "rgba(255,228,92,0.2)"}
              opacity={1 - i * 0.12}
            />
          ))}

          {/* Robot silhouette — centered, leans with bodyLean */}
          <g transform={`translate(80, 30) rotate(${leanOffset}, 40, 80)`}>
            {/* Head */}
            <rect x="30" y="0" width="20" height="22" rx="5" fill="rgba(248,247,240,0.85)" />
            {/* Visor */}
            <rect x="33" y="6" width="14" height="7" rx="2" fill={statusStyle.dot} opacity="0.9" />
            {/* Neck */}
            <rect x="37" y="22" width="6" height="6" rx="1" fill="rgba(248,247,240,0.5)" />
            {/* Torso */}
            <rect x="22" y="28" width="36" height="38" rx="7" fill="rgba(248,247,240,0.8)" />
            {/* Chest detail */}
            <rect x="30" y="34" width="20" height="10" rx="3" fill={statusStyle.dot} opacity="0.35" />
            {/* Left arm */}
            <rect x="8" y="30" width="12" height="30" rx="5" fill="rgba(248,247,240,0.65)" />
            {/* Right arm */}
            <rect x="60" y="30" width="12" height="30" rx="5" fill="rgba(248,247,240,0.65)" />
            {/* Left leg */}
            <rect
              x="24"
              y="66"
              width="14"
              height="36"
              rx="5"
              fill="rgba(248,247,240,0.75)"
              transform={`rotate(${-footHeightMm * 0.17}, 31, 66)`}
            />
            {/* Right leg */}
            <rect
              x="42"
              y="66"
              width="14"
              height="36"
              rx="5"
              fill="rgba(248,247,240,0.75)"
              transform={`rotate(${footHeightMm * 0.17}, 49, 66)`}
            />
            {/* Feet */}
            <rect x="20" y="98" width="20" height="8" rx="3" fill="rgba(248,247,240,0.6)" />
            <rect x="40" y="98" width="20" height="8" rx="3" fill="rgba(248,247,240,0.6)" />
          </g>

          {/* Gait Waveform */}
          <g transform="translate(0, 90)">
            <path
              d={waveformPath}
              fill="none"
              stroke={statusStyle.dot}
              strokeWidth="2"
              strokeDasharray="4 2"
              opacity="0.6"
            />
          </g>

          {/* Status label overlay */}
          <rect x="310" y="12" width="96" height="28" rx="6" fill="rgba(3,6,16,0.85)" />
          <text x="358" y="30" textAnchor="middle" fill={statusStyle.dot} fontFamily="monospace" fontSize="10" fontWeight="bold">
            {status}
          </text>
        </svg>

        {/* Metrics row */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { label: "x amp", value: `${xMoveMm}mm` },
            { label: "period", value: `${periodMs}ms` },
            { label: "z amp", value: `${footHeightMm}mm` },
            { label: "balance", value: `${balanceGain}%` },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-[rgba(255,228,92,0.12)] bg-[rgba(3,6,16,0.5)] p-3 text-center"
            >
              <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">
                {m.label}
              </div>
              <div className="mt-1 font-mono text-[0.9rem] font-black text-[var(--yellow)]">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
