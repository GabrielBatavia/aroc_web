"use client";

import { useState } from "react";

type VisionStatus = "BALL_FOUND" | "SEARCHING" | "NO_BALL" | "INVALID_RADIUS";

type VisionPreset = {
  id: string;
  label: string;
  description: string;
  values: {
    confidenceThreshold: number;
    frameSkip: number;
    inputSize: number;
    minSize: number;
  };
};

const VISION_PRESETS: VisionPreset[] = [
  {
    id: "source-default",
    label: "Source Default",
    description: "Mirip detector_config: confidence 0.15, input 320, frame_skip 2.",
    values: { confidenceThreshold: 15, inputSize: 320, frameSkip: 2, minSize: 4 },
  },
  {
    id: "precision-mode",
    label: "Precision Mode",
    description: "Input lebih besar dan frame_skip kecil. Lebih yakin, tapi latency naik.",
    values: { confidenceThreshold: 42, inputSize: 640, frameSkip: 1, minSize: 4 },
  },
  {
    id: "strict-fail",
    label: "Too Strict",
    description: "Confidence terlalu tinggi. Detector gagal publish circle yang cukup kuat.",
    values: { confidenceThreshold: 88, inputSize: 320, frameSkip: 2, minSize: 4 },
  },
  {
    id: "radius-reject",
    label: "Radius Reject",
    description: "Detector melihat bola, tapi localizer menolak karena min_radius_px terlalu besar.",
    values: { confidenceThreshold: 15, inputSize: 320, frameSkip: 2, minSize: 48 },
  },
];

function computeVision(
  confidenceThreshold: number,
  inputSize: number,
  frameSkip: number,
  minSize: number,
): {
  detected: boolean;
  modelConfidence: number;
  processedFps: number;
  latencyMs: number;
  localizerStatus: string;
  status: VisionStatus;
  boundingBoxOpacity: number;
} {
  const ballRadius = 38;
  const normalizedInput = (inputSize - 160) / 480;
  const modelConfidence = Math.max(0.35, Math.min(0.9, 0.58 + normalizedInput * 0.28 - Math.max(0, frameSkip - 2) * 0.025));
  const detected = modelConfidence >= confidenceThreshold / 100;
  const sizeOk = minSize <= ballRadius;
  const processedFps = Math.max(2, Math.round((30 / frameSkip) * Math.pow(320 / inputSize, 1.35)));
  const latencyMs = Math.round(1000 / processedFps);

  let status: VisionStatus = "SEARCHING";
  if (detected && !sizeOk) status = "INVALID_RADIUS";
  else if (detected) status = "BALL_FOUND";
  else if (confidenceThreshold > 78) status = "NO_BALL";

  const localizerStatus = !detected ? "WAITING" : sizeOk ? "OK" : "INVALID_RADIUS";
  const boundingBoxOpacity = detected ? Math.max(0.45, modelConfidence) : 0;

  return { detected, modelConfidence, processedFps, latencyMs, localizerStatus, status, boundingBoxOpacity };
}

const STATUS_STYLE: Record<VisionStatus, { bg: string; text: string; dot: string }> = {
  BALL_FOUND:     { bg: "rgba(123,147,232,0.18)", text: "#7b93e8", dot: "#7b93e8" },
  SEARCHING:      { bg: "rgba(255,170,40,0.18)",  text: "#ffaa28", dot: "#ffaa28" },
  NO_BALL:        { bg: "rgba(255,80,60,0.18)",   text: "#ff5040", dot: "#ff5040" },
  INVALID_RADIUS: { bg: "rgba(255,80,60,0.18)",   text: "#ff5040", dot: "#ff5040" },
};

export function VisionLockSimulator() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(15);
  const [inputSize, setInputSize] = useState(320);
  const [frameSkip, setFrameSkip] = useState(2);
  const [minSize, setMinSize] = useState(4);

  const { detected, modelConfidence, processedFps, latencyMs, localizerStatus, status, boundingBoxOpacity } = computeVision(
    confidenceThreshold,
    inputSize,
    frameSkip,
    minSize,
  );
  const ss = STATUS_STYLE[status];

  const controls = [
    { id: "vis-confidence", label: "confidence_threshold", value: confidenceThreshold, setter: setConfidenceThreshold, min: 5, max: 95, unit: "%" },
    { id: "vis-input-size", label: "YOLO input_size", value: inputSize, setter: setInputSize, min: 160, max: 640, unit: "px" },
    { id: "vis-frame-skip", label: "frame_skip", value: frameSkip, setter: setFrameSkip, min: 1, max: 6, unit: "" },
    { id: "vis-minsize", label: "localizer min_radius_px", value: minSize, setter: setMinSize, min: 4, max: 60, unit: "px" },
  ];

  const insightMap: Record<VisionStatus, string> = {
    BALL_FOUND: "Sesuai source: detector publish /ball_detector_node/circle_set, lalu localizer mengubah center+radius menjadi /ball_polar.",
    SEARCHING: "Threshold terlalu ketat untuk confidence frame ini. Source akan publish SEARCHING sebelum akhirnya NO_BALL.",
    NO_BALL: "Confidence threshold terlalu tinggi. Tidak ada circle_set yang cukup kuat untuk dipakai localizer.",
    INVALID_RADIUS: "Detector melihat bola, tapi radius terlalu kecil untuk localizer. Output berhenti di status INVALID_RADIUS.",
  };
  const publishStatus = detected ? `BALL_FOUND conf=${modelConfidence.toFixed(3)}` : confidenceThreshold > 78 ? "NO_BALL" : "SEARCHING";
  const polarOutput = localizerStatus === "OK" ? "/ball_polar x=0.48 y=0.19" : "no /ball_polar";

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
              <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">Model Conf</div>
              <div className="mt-1 font-mono text-[1.1rem] font-black" style={{ color: detected ? "#7b93e8" : "#ffaa28" }}>
                {Math.round(modelConfidence * 100)}%
              </div>
            </div>
            <div className="rounded-xl border border-[rgba(123,147,232,0.2)] bg-[rgba(3,6,16,0.5)] p-3">
              <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">Localizer</div>
              <div className="mt-1 font-mono text-[1.1rem] font-black" style={{ color: localizerStatus === "OK" ? "#7b93e8" : "#ff5040" }}>
                {localizerStatus}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.38)]">
            Scenario Preset
          </div>
          <div className="grid gap-2">
            {VISION_PRESETS.map((preset) => (
              <button
                className="rounded-[0.95rem] border border-[rgba(123,147,232,0.15)] bg-[rgba(123,147,232,0.05)] px-3 py-2 text-left transition duration-200 hover:border-[rgba(123,147,232,0.48)] hover:bg-[rgba(123,147,232,0.09)]"
                key={preset.id}
                onClick={() => {
                  setConfidenceThreshold(preset.values.confidenceThreshold);
                  setInputSize(preset.values.inputSize);
                  setFrameSkip(preset.values.frameSkip);
                  setMinSize(preset.values.minSize);
                }}
                type="button"
              >
                <span className="block text-[0.78rem] font-black text-[rgba(248,247,240,0.9)]">{preset.label}</span>
                <span className="mt-1 block text-[0.68rem] leading-[1.45] text-[rgba(248,247,240,0.48)]">
                  {preset.description}
                </span>
              </button>
            ))}
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

        <div className="grid grid-cols-2 gap-2 rounded-[1rem] border border-[rgba(123,147,232,0.15)] bg-[rgba(3,6,16,0.42)] p-3">
          {[
            { label: "detector", value: publishStatus },
            { label: "localizer", value: polarOutput },
          ].map((item) => (
            <div key={item.label} className="min-w-0">
              <div className="font-mono text-[0.48rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.34)]">
                {item.label}
              </div>
              <div className="mt-1 truncate font-mono text-[0.66rem] font-black text-[#7b93e8]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visualization */}
      <div className="border-t border-[rgba(123,147,232,0.12)] p-4 sm:p-6 lg:border-l lg:border-t-0">
        <div className="font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.4)] mb-3">
          YOLO Ball Pipeline
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Camera frame */}
          <div>
            <div className="mb-2 font-mono text-[0.5rem] font-black uppercase tracking-[0.13em] text-[rgba(248,247,240,0.35)]">
              Debug Image: /ball_detector_node/image_out
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
              {/* Ball */}
              <circle cx="222" cy="132" r="38" fill="#f07c1d" />
              <circle cx="211" cy="118" fill="rgba(255,255,255,0.3)" r="9" />
              <circle cx="68" cy="49" fill="rgba(255,100,20,0.28)" r="5" />
              <circle cx="306" cy="71" fill="rgba(255,120,30,0.22)" r="6" />
              {/* Bounding box */}
              {detected && (
                <g opacity={boundingBoxOpacity}>
                  <rect
                    x="184" y="94" width="76" height="76" rx="4"
                    fill="none" stroke="#7b93e8" strokeWidth="2.5" strokeDasharray="6 3"
                  />
                  <rect x="184" y="84" width="76" height="14" rx="3" fill="rgba(123,147,232,0.85)" />
                  <text x="222" y="94" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="8" fontWeight="bold">
                    ball {Math.round(modelConfidence * 100)}%
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Mask frame */}
          <div>
            <div className="mb-2 font-mono text-[0.5rem] font-black uppercase tracking-[0.13em] text-[rgba(248,247,240,0.35)]">
              CircleSet + Localizer
            </div>
            <svg
              viewBox="0 0 360 240"
              className="w-full rounded-[1rem] border border-[rgba(123,147,232,0.15)]"
              aria-label="CircleSet and localizer pipeline output"
              role="img"
            >
              <rect fill="#07101f" width="360" height="240" />
              <g transform="translate(18, 18)">
                {[
                  { label: "YOLO", active: detected || status === "SEARCHING" },
                  { label: "CircleSet", active: detected },
                  { label: "Localizer", active: localizerStatus === "OK" },
                ].map((stage, index) => (
                  <g key={stage.label} transform={`translate(${index * 88}, 0)`}>
                    <rect
                      fill={stage.active ? "rgba(123,147,232,0.18)" : "rgba(248,247,240,0.055)"}
                      height="22"
                      rx="5"
                      stroke={stage.active ? "rgba(123,147,232,0.52)" : "rgba(248,247,240,0.11)"}
                      width="74"
                    />
                    <text x="37" y="14" textAnchor="middle" fill={stage.active ? "#7b93e8" : "rgba(248,247,240,0.36)"} fontFamily="monospace" fontSize="7" fontWeight="bold">
                      {stage.label}
                    </text>
                  </g>
                ))}
              </g>
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
              {detected && (
                <>
                  <line x1="222" y1="132" x2="300" y2="70" stroke="rgba(123,147,232,0.45)" strokeDasharray="4 3" />
                  <rect x="230" y="42" width="112" height="42" rx="7" fill="rgba(3,6,16,0.82)" />
                  <text x="286" y="58" textAnchor="middle" fill="#7b93e8" fontFamily="monospace" fontSize="8" fontWeight="bold">
                    x=0.23 y=0.10
                  </text>
                  <text x="286" y="72" textAnchor="middle" fill="#7b93e8" fontFamily="monospace" fontSize="8" fontWeight="bold">
                    z=38px
                  </text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "FPS", value: `${processedFps}` },
            { label: "Latency", value: `${latencyMs}ms` },
            { label: "Circle z", value: detected ? "38px" : "--" },
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
