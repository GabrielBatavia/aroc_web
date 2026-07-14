"use client";

import { useState } from "react";

import type { LearningPath, SimulatorId } from "@/data/lab";

type LabLessonGuideProps = {
  color: string;
  division: string;
  learningPath: LearningPath;
  simulatorId: SimulatorId;
  onExperiment: () => void;
  onViewed: () => void;
};

function LearningIllustration({ simulatorId, color }: Pick<LabLessonGuideProps, "simulatorId" | "color">) {
  if (simulatorId === "image-processing") {
    return (
      <svg aria-label="Ilustrasi alur kamera, detector, localizer, dan posisi bola" className="h-full w-full" role="img" viewBox="0 0 560 240">
        <rect fill="#102144" height="240" width="560" />
        <rect fill="#174c34" height="160" opacity="0.74" rx="12" width="430" x="18" y="42" />
        <path d="M233 42v160M18 122h430" opacity="0.32" stroke="#f8f7f0" />
        <circle cx="315" cy="126" fill="#f18437" r="19" />
        <g className="lab-vision-detection">
          <rect fill="none" height="52" rx="5" stroke={color} strokeWidth="3" width="52" x="289" y="100" />
          <rect fill={color} height="17" rx="4" width="62" x="289" y="82" />
          <text fill="#07101f" fontFamily="monospace" fontSize="9" fontWeight="800" x="296" y="94">bola 58%</text>
        </g>
        <line className="lab-vision-scan" stroke={color} strokeWidth="3" x1="42" x2="42" y1="54" y2="190" />
        <path className="lab-vision-ray" d="M315 152 C360 189 405 190 463 164" fill="none" stroke={color} strokeDasharray="6 5" strokeWidth="3" />
        <g transform="translate(455 83)">
          <rect fill="#07101f" height="84" rx="10" stroke={color} strokeOpacity="0.52" width="88" />
          <text fill={color} fontFamily="monospace" fontSize="9" fontWeight="800" x="11" y="24">/ball_polar</text>
          <text fill="#f8f7f0" fontFamily="monospace" fontSize="10" x="11" y="47">0.48 m</text>
          <text fill="#f8f7f0" fontFamily="monospace" fontSize="10" x="11" y="67">0.19 rad</text>
        </g>
        <text fill="#f8f7f0" fontFamily="monospace" fontSize="10" opacity="0.65" x="35" y="28">frame kamera</text>
      </svg>
    );
  }

  if (simulatorId === "communication") {
    const nodes = ["/ball_polar", "Bridge", "KickGate", "OP3"];
    return (
      <svg aria-label="Ilustrasi alur pesan dari posisi bola sampai tindakan OP3" className="h-full w-full" role="img" viewBox="0 0 560 240">
        <rect fill="#102144" height="240" width="560" />
        {nodes.map((node, index) => {
          const x = 38 + index * 143;
          const isGate = node === "KickGate";
          return (
            <g key={node}>
              {index < nodes.length - 1 && <path d={`M${x + 94} 120 H${x + 138}`} stroke="rgba(248,247,240,0.34)" strokeDasharray="6 5" strokeWidth="2" />}
              <rect fill={isGate ? "rgba(255,228,92,0.11)" : "rgba(3,7,18,0.72)"} height="70" rx="12" stroke={isGate ? color : "rgba(248,247,240,0.26)"} width="94" x={x} y="85" />
              <text fill={isGate ? color : "#f8f7f0"} fontFamily="monospace" fontSize="11" fontWeight="800" textAnchor="middle" x={x + 47} y="124">{node}</text>
            </g>
          );
        })}
        <circle className="lab-message-packet" cx="85" cy="120" fill={color} r="7" />
        <text fill="#f18437" fontFamily="monospace" fontSize="10" fontWeight="800" x="316" y="66">perintah kick dapat ditahan</text>
        <path className="lab-gate-turn" d="M340 182c16 12 31 12 47 0" fill="none" stroke="#f18437" strokeWidth="3" />
        <path className="lab-gate-turn" d="m382 177 7 5-7 5" fill="none" stroke="#f18437" strokeWidth="3" />
      </svg>
    );
  }

  return (
    <svg aria-label="Ilustrasi top-down area tumpuan dan pusat massa saat berjalan" className="h-full w-full" role="img" viewBox="0 0 560 240">
      <rect fill="#102144" height="240" width="560" />
      <path d="M162 191 231 62h99l68 129Z" fill="rgba(130,219,178,0.1)" stroke={color} strokeDasharray="7 5" strokeWidth="2" />
      <g className="lab-gait-left-foot">
        <rect fill="rgba(130,219,178,0.18)" height="74" rx="14" stroke={color} strokeWidth="3" width="48" x="174" y="124" />
        <text fill={color} fontFamily="monospace" fontSize="9" textAnchor="middle" x="198" y="167">KIRI</text>
      </g>
      <g className="lab-gait-right-foot">
        <rect fill="rgba(130,219,178,0.18)" height="74" rx="14" stroke={color} strokeWidth="3" width="48" x="338" y="124" />
        <text fill={color} fontFamily="monospace" fontSize="9" textAnchor="middle" x="362" y="167">KANAN</text>
      </g>
      <circle className="lab-gait-com" cx="280" cy="117" fill="#ffe45c" r="12" />
      <text fill="#ffe45c" fontFamily="monospace" fontSize="10" fontWeight="800" textAnchor="middle" x="280" y="91">PUSAT MASSA</text>
      <text fill="#f8f7f0" fontFamily="monospace" fontSize="10" opacity="0.65" x="180" y="222">Area tumpuan berubah saat kaki bergantian menahan beban.</text>
    </svg>
  );
}

export function LabLessonGuide({ color, division, learningPath, simulatorId, onExperiment, onViewed }: LabLessonGuideProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = learningPath.steps[stepIndex];
  const isLastStep = stepIndex === learningPath.steps.length - 1;

  const goForward = () => {
    if (isLastStep) {
      onViewed();
      onExperiment();
      return;
    }
    setStepIndex((current) => current + 1);
  };

  return (
    <section aria-labelledby="lab-lesson-title" className="border-y border-[rgba(248,247,240,0.1)] bg-[rgba(3,7,18,0.42)] py-12 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em]" style={{ color }}>{division}</div>
            <h2 className="headline mt-4 text-[clamp(2.35rem,5vw,4.6rem)] text-[var(--cream)]" id="lab-lesson-title">Belajar sebelum mencoba.</h2>
            <p className="mt-5 max-w-[35rem] text-[0.98rem] leading-[1.8] text-[rgba(248,247,240,0.7)]">{learningPath.overview}</p>
            <div className="mt-7 rounded-[1.2rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.045)] p-5">
              <div className="font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.46)]">Tujuan materi</div>
              <p className="mt-2 text-[0.9rem] leading-[1.65] text-[rgba(248,247,240,0.82)]">{learningPath.goal}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.55rem] border border-[rgba(248,247,240,0.13)] bg-[rgba(9,18,42,0.82)] shadow-[0_30px_80px_-56px_rgba(0,0,0,0.96)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(248,247,240,0.1)] px-5 py-4 sm:px-6">
              <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.48)]">Penjelasan bertahap</div>
              <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.14em]" style={{ color }}>Langkah {stepIndex + 1} / {learningPath.steps.length}</div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="min-h-[260px] border-b border-[rgba(248,247,240,0.1)] p-4 lg:border-b-0 lg:border-r">
                <LearningIllustration color={color} simulatorId={simulatorId} />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex gap-2" role="tablist" aria-label="Langkah pembelajaran">
                  {learningPath.steps.map((item, index) => (
                    <button aria-controls={`lesson-step-${index}`} aria-selected={stepIndex === index} className="flex size-8 items-center justify-center rounded-full border font-mono text-[0.62rem] font-black transition" key={item.title} onClick={() => setStepIndex(index)} role="tab" style={stepIndex === index ? { background: color, borderColor: color, color: "#07101f" } : { borderColor: "rgba(248,247,240,0.2)", color: "rgba(248,247,240,0.68)" }} type="button">{index + 1}</button>
                  ))}
                </div>
                <div id={`lesson-step-${stepIndex}`} role="tabpanel">
                  <h3 className="mt-6 text-[1.45rem] font-black leading-tight text-[var(--cream)]">{step.title}</h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.76] text-[rgba(248,247,240,0.7)]">{step.body}</p>
                  <div className="mt-5 rounded-[0.95rem] border border-[rgba(248,247,240,0.1)] bg-[rgba(3,7,18,0.48)] p-4">
                    <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.15em]" style={{ color }}>Catatan dari source</div>
                    <p className="mt-2 text-[0.78rem] leading-[1.65] text-[rgba(248,247,240,0.62)]">{step.source}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-full border border-[rgba(248,247,240,0.2)] px-4 py-2.5 font-mono text-[0.58rem] font-black uppercase tracking-[0.13em] text-[rgba(248,247,240,0.78)] transition hover:border-[rgba(248,247,240,0.45)] disabled:cursor-not-allowed disabled:opacity-35" disabled={stepIndex === 0} onClick={() => setStepIndex((current) => current - 1)} type="button">Kembali</button>
                  <button className="rounded-full px-4 py-2.5 font-mono text-[0.58rem] font-black uppercase tracking-[0.13em] text-[var(--navy-deep)] transition hover:brightness-110" onClick={goForward} style={{ background: color }} type="button">{isLastStep ? "Mulai percobaan" : "Lanjutkan"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 grid gap-4 rounded-[1.35rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.04)] p-5 sm:grid-cols-[0.9fr_1.1fr] sm:p-6">
          <div>
            <div className="font-mono text-[0.54rem] font-black uppercase tracking-[0.16em]" style={{ color }}>Percobaan yang disarankan</div>
            <p className="mt-2 text-[0.88rem] leading-[1.7] text-[rgba(248,247,240,0.82)]">{learningPath.experiment}</p>
          </div>
          <div className="border-t border-[rgba(248,247,240,0.1)] pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <div className="font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.52)]">Setelah mencoba</div>
            <p className="mt-2 text-[0.88rem] leading-[1.7] text-[rgba(248,247,240,0.7)]">{learningPath.conclusion}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
