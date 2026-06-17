"use client";

import { useState } from "react";

type VisionStatus = "BALL_LOCKED" | "NOISE_HIGH" | "BALL_LOST";

function inHueRange(value: number, min: number, max: number) {
  if (min <= max) return value >= min && value <= max;
  return value >= min || value <= max;
}

function computeVision(
  exposure: number,
  tolerance: number,
  minSize: number,
  confidence: number
): { detected: boolean; noise: number; status: VisionStatus; boundingBoxOpacity: number } {
  const ballHue = 18;
  const ballSat = 84;
  const ballVal = 92;
  const ballRadius = 38;

  // Exposure affects effective saturation/value thresholds
  const effectiveSat = ballSat * (exposure / 100);
  const effectiveVal = ballVal * (exposure / 100) * 1.05;

  const hueMin = 18 - tolerance;
  const hueMax = 18 + tolerance;
  const ballInHue = inHueRange(ballHue, hueMin, hueMax);
  const satOk = effectiveSat >= 40;
  const valOk = effectiveVal >= 40;
  const sizeOk = minSize <= ballRadius;
  const colorMatch = ballInHue && satOk && valOk;
  const detected = colorMatch && sizeOk;

  // Noise: increases with wide tolerance or low confidence
  const toleranceNoise = tolerance > 30 ? (tolerance - 30) * 1.8 : 0;
  const confNoise = (100 - confidence) * 0.5;
  const exposureNoise = exposure > 85 ? (exposure - 85) * 1.5 : 0;
  const noise = Math.min(100, Math.round(toleranceNoise + confNoise + exposureNoise));

  let status: VisionStatus = "BALL_LOST";
  if (detected && noise >= 50) status = "NOISE_HIGH";
  else if (detected && noise < 50) status = "BALL_LOCKED";

  const boundingBoxOpacity = detected ? Math.max(0.4, (confidence / 100)) : 0;

  return { detected, noise, status, boundingBoxOpacity };
}

const STATUS_STYLE: Record<VisionStatus, { bg: string; text: string; dot: string }> = {
  BALL_LOCKED: { bg: "rgba(123,147,232,0.18)", text: "#7b93e8", dot: "#7b93e8" },
  NOISE_HIGH:  { bg: "rgba(255,170,40,0.18)",  text: "#ffaa28", dot: "#ffaa28" },
  BALL_LOST:   { bg: "rgba(255,80,60,0.18)",   text: "#ff5040", dot: "#ff5040" },
};

export function VisionLockSimulator() {
  const [exposure, setExposure] = useState(65);
  const [tolerance, setTolerance] = useState(20);
  const [minSize, setMinSize] = useState(18);
  const [confidence, setConfidence] = useState(70);

  const { detected, noise, status, boundingBoxOpacity } = computeVision(exposure, tolerance, minSize, confidence);
  const ss = STATUS_STYLE[status];

  const controls = [
    { id: "vis-exposure",    label: "Exposure / Brightness", value: exposure,    setter: setExposure,    min: 10,  max: 100, unit: "" },
    { id: "vis-tolerance",  label: "HSV Color Tolerance",   value: tolerance,   setter: setTolerance,   min: 1,   max: 60,  unit: "" },
    { id: "vis-minsize",    label: "Min Object Size (px)",  value: minSize,     setter: setMinSize,     min: 4,   max: 60,  unit: "" },
    { id: "vis-confidence", label: "Confidence Threshold",  value: confidence,  setter: setConfidence,  min: 10,  max: 100, unit: "%" },
  ];

  const insightMap: Record<VisionStatus, string> = {
    BALL_LOCKED: "Deteksi stabil. Bola terbaca dengan noise rendah — parameter siap untuk match.",
    NOISE_HIGH: "Bola terdeteksi, tetapi noise terlalu tinggi. Persempit color tolerance atau naikkan confidence.",
    BALL_LOST: "Robot tidak menemukan bola. Sesuaikan exposure dan HSV tolerance ke rentang warna oranye.",
  };

  return (
    <div className="grid gap-0 lg:grid-cols-[340px_1fr]">
      {/* Controls */}
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em]"
            style={{ background: ss.bg, color: ss.text }}
            aria-live="polite"
          >
            <span className="size-1.5 rounded-full animate-pulse" style={{ background: ss.dot }} aria-hidden="true" />
            {status}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[rgba(123,147,232,0.2)] bg-[rgba(3,6,16,0.5)] p-3">
              <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">Noise</div>
              <div className="mt-1 font-mono text-[1.1rem] font-black" style={{ color: noise > 50 ? "#ffaa28" : "#7b93e8" }}>
                {noise}%
              </div>
            </div>
            <div className="rounded-xl border border-[rgba(123,147,232,0.2)] bg-[rgba(3,6,16,0.5)] p-3">
              <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">Detection</div>
              <div className="mt-1 font-mono text-[1.1rem] font-black" style={{ color: detected ? "#7b93e8" : "#ff5040" }}>
                {detected ? "PASS" : "FAIL"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {controls.map((ctrl) => (
            <label key={ctrl.id} className="block">
              <span className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[0.82rem] font-bold text-[rgba(248,247,240,0.9)]">{ctrl.label}</span>
                <span className="font-mono text-[0.7rem] font-black text-[#7b93e8]">
                  {ctrl.value}{ctrl.unit}
                </span>
              </span>
              <input
                id={ctrl.id}
                aria-label={`${ctrl.label}: ${ctrl.value}${ctrl.unit}`}
                className="w-full cursor-pointer accent-[#7b93e8]"
                max={ctrl.max}
                min={ctrl.min}
                onChange={(e) => ctrl.setter(Number(e.target.value))}
                type="range"
                value={ctrl.value}
              />
            </label>
          ))}
        </div>

        <div className="rounded-[1rem] border border-[rgba(123,147,232,0.2)] bg-[rgba(3,6,16,0.5)] p-4 text-[0.82rem] leading-[1.7] text-[rgba(248,247,240,0.6)]">
          {insightMap[status]}
        </div>
      </div>

      {/* Visualization */}
      <div className="border-t border-[rgba(123,147,232,0.12)] p-4 sm:p-6 lg:border-l lg:border-t-0">
        <div className="font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.4)] mb-3">
          Camera Feed
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Camera frame */}
          <div>
            <div className="mb-2 font-mono text-[0.5rem] font-black uppercase tracking-[0.13em] text-[rgba(248,247,240,0.35)]">
              Raw Frame
            </div>
            <svg
              viewBox="0 0 360 240"
              className="w-full rounded-[1rem] border border-[rgba(123,147,232,0.15)]"
              aria-label="Synthetic camera frame with soccer field and orange ball"
              role="img"
            >
              <rect fill="#1a3d28" width="360" height="240" />
              {/* Field markings */}
              <line x1="0" y1="120" x2="360" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <line x1="180" y1="0" x2="180" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <circle cx="180" cy="120" r="52" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
              {/* Exposure overlay */}
              <rect
                fill={`rgba(255,255,255,${(exposure - 50) * 0.004})`}
                width="360" height="240"
              />
              {/* Ball */}
              <circle cx="222" cy="132" r="38" fill={`hsl(25, ${Math.round(exposure * 0.84)}%, ${Math.round(exposure * 0.48)}%)`} />
              <circle cx="211" cy="118" fill="rgba(255,255,255,0.3)" r="9" />
              {/* Noise specks */}
              {tolerance > 25 && (
                <>
                  <circle cx="68" cy="49" fill="rgba(255,100,20,0.6)" r="5" />
                  <circle cx="96" cy="184" fill="rgba(255,80,10,0.5)" r="4" />
                  <circle cx="306" cy="71" fill="rgba(255,120,30,0.55)" r="6" />
                </>
              )}
              {/* Bounding box */}
              {detected && (
                <g opacity={boundingBoxOpacity}>
                  <rect
                    x="184" y="94" width="76" height="76" rx="4"
                    fill="none" stroke="#7b93e8" strokeWidth="2.5" strokeDasharray="6 3"
                  />
                  <rect x="184" y="84" width="76" height="14" rx="3" fill="rgba(123,147,232,0.85)" />
                  <text x="222" y="94" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="8" fontWeight="bold">
                    BALL {Math.round(confidence)}%
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Mask frame */}
          <div>
            <div className="mb-2 font-mono text-[0.5rem] font-black uppercase tracking-[0.13em] text-[rgba(248,247,240,0.35)]">
              Threshold Mask
            </div>
            <svg
              viewBox="0 0 360 240"
              className="w-full rounded-[1rem] border border-[rgba(123,147,232,0.15)]"
              aria-label="Threshold mask result showing detected regions"
              role="img"
            >
              <rect fill="#07101f" width="360" height="240" />
              {/* Noise blobs */}
              {noise > 30 && (
                <>
                  <circle cx="68" cy="49" fill="rgba(123,147,232,0.65)" r="5" />
                  <circle cx="96" cy="184" fill="rgba(123,147,232,0.55)" r="4" />
                  <circle cx="306" cy="71" fill="rgba(123,147,232,0.6)" r="6" />
                  {noise > 60 && <circle cx="140" cy="90" fill="rgba(123,147,232,0.45)" r="3" />}
                </>
              )}
              {/* Ball mask */}
              {detected ? (
                <circle cx="222" cy="132" r={Math.max(10, 38 - Math.max(0, minSize - 38))} fill="#7b93e8" />
              ) : (
                <circle cx="222" cy="132" r="38" fill="rgba(123,147,232,0.1)" />
              )}
              {/* Min size threshold indicator */}
              <circle cx="50" cy="210" r={minSize * 0.6} fill="none" stroke="rgba(255,228,92,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="50" y="213" textAnchor="middle" fill="rgba(255,228,92,0.5)" fontFamily="monospace" fontSize="7">
                min
              </text>
            </svg>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Exposure", value: `${exposure}` },
            { label: "Tolerance", value: `±${tolerance}` },
            { label: "Confidence", value: `${confidence}%` },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-[rgba(123,147,232,0.15)] bg-[rgba(3,6,16,0.5)] p-3 text-center"
            >
              <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">
                {m.label}
              </div>
              <div className="mt-1 font-mono text-[0.9rem] font-black text-[#7b93e8]">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
