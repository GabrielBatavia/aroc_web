"use client";

import { useState, type ComponentType } from "react";

import { GaitTunerSimulator } from "@/components/lab/GaitTunerSimulator";
import { LabLessonGuide } from "@/components/lab/LabLessonGuide";
import { SignalFlowSimulator } from "@/components/lab/SignalFlowSimulator";
import { VisionLockSimulator } from "@/components/lab/VisionLockSimulator";
import { BoltIcon, EyeIcon, RadioIcon } from "@/components/shared/Icons";
import { labHeroStats, labLearningPaths, labSimulators, type SimulatorId } from "@/data/lab";

type LabExperienceProps = {
  stats?: Array<{ label: string; value: string }>;
};

const DIVISION_ICON_MAP: Record<SimulatorId, ComponentType<{ className?: string }>> = {
  "maneuvering": BoltIcon,
  "image-processing": EyeIcon,
  "communication": RadioIcon,
};

const SIMULATOR_MAP: Record<SimulatorId, ComponentType> = {
  "maneuvering": GaitTunerSimulator,
  "image-processing": VisionLockSimulator,
  "communication": SignalFlowSimulator,
};

export function LabExperience({ stats = labHeroStats }: LabExperienceProps) {
  const [activeId, setActiveId] = useState<SimulatorId>(labSimulators[0].id);
  const [viewedDivisions, setViewedDivisions] = useState<SimulatorId[]>([]);

  const activeSim = labSimulators.find((simulator) => simulator.id === activeId) ?? labSimulators[0];
  const ActiveSimulator = SIMULATOR_MAP[activeId];
  const activeLearningPath = labLearningPaths[activeId];

  const markViewed = () => {
    setViewedDivisions((current) => current.includes(activeId) ? current : [...current, activeId]);
  };

  const scrollToSimulator = () => {
    markViewed();
    document.getElementById("lab-simulator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="flex-1" id="main-content">
      <section className="relative overflow-hidden bg-[var(--navy-abyss)] pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 lab-learning-grid" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-28 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(123,147,232,0.19),transparent_68%)] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.16),transparent_68%)] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-8">
          <div className="grid gap-9 lg:grid-cols-[1fr_21rem] lg:items-end">
            <div>
              <div className="kicker kicker-on-ink">AROC Lab · materi anggota baru</div>
              <h1 className="headline mt-5 max-w-[13ch] text-[clamp(3.2rem,8vw,6.6rem)] text-[var(--cream)]">
                Belajar cara kerja robot, <span className="headline-italic-on-ink">perlahan dan jelas.</span>
              </h1>
              <p className="mt-6 max-w-[44rem] text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.72)]">
                Pilih satu divisi, baca penjelasannya langkah demi langkah, lihat ilustrasi bergerak yang sesuai, lalu coba parameter di simulator. Lab ini adalah alat belajar berbasis source robot, bukan kontrol untuk robot fisik.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Konsep sebelum slider",
                  "Animasi menjelaskan proses",
                  "Kontrol lanjutan tetap tersedia",
                ].map((item) => (
                  <span className="rounded-full border border-[rgba(248,247,240,0.15)] bg-[rgba(248,247,240,0.05)] px-3.5 py-2 font-mono text-[0.56rem] font-black uppercase tracking-[0.13em] text-[rgba(248,247,240,0.68)]" key={item}>{item}</span>
                ))}
              </div>
            </div>

            <aside className="rounded-[1.5rem] border border-[rgba(255,228,92,0.2)] bg-[rgba(248,247,240,0.055)] p-5 backdrop-blur-xl">
              <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.5)]">Peta pembelajaran</div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {stats.map((stat) => (
                  <div className="rounded-[1rem] border border-[rgba(248,247,240,0.1)] bg-[rgba(3,7,18,0.4)] p-3 text-center" key={stat.label}>
                    <div className="font-display text-[1.55rem] font-black leading-none text-[var(--yellow)]">{stat.value}</div>
                    <div className="mt-2 font-mono text-[0.46rem] font-black uppercase tracking-[0.12em] text-[rgba(248,247,240,0.46)]">{stat.label}</div>
                  </div>
                ))}
              </div>
              <ol className="mt-5 grid gap-2">
                {labSimulators.map((simulator) => {
                  const complete = viewedDivisions.includes(simulator.id);
                  return (
                    <li className="flex items-center gap-3 rounded-[0.9rem] border border-[rgba(248,247,240,0.09)] bg-[rgba(3,7,18,0.28)] px-3 py-2" key={simulator.id}>
                      <span className="flex size-7 items-center justify-center rounded-full font-mono text-[0.56rem] font-black" style={{ background: complete ? simulator.color : `rgba(${simulator.colorRgb}, 0.14)`, color: complete ? "#07101f" : simulator.color }}>{complete ? "✓" : simulator.index}</span>
                      <span className="text-[0.74rem] font-bold text-[rgba(248,247,240,0.78)]">{simulator.division}</span>
                    </li>
                  );
                })}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy-deep)] py-12 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
          <div className="max-w-[44rem]">
            <div className="kicker kicker-on-ink">Pilih divisi</div>
            <h2 className="headline mt-4 text-[clamp(2.25rem,5vw,4.35rem)] text-[var(--cream)]">Materi tetap terpisah agar mudah dipahami.</h2>
            <p className="mt-4 text-[0.96rem] leading-[1.75] text-[rgba(248,247,240,0.64)]">Ketiga divisi saling terhubung pada robot, tetapi fokus belajar dan istilahnya berbeda. Mulailah dari bagian yang ingin dipelajari.</p>
          </div>

          <div aria-label="Pilih materi divisi" className="mt-8 grid gap-4 lg:grid-cols-3" role="tablist">
            {labSimulators.map((simulator) => {
              const Icon = DIVISION_ICON_MAP[simulator.id];
              const isActive = activeId === simulator.id;
              const isViewed = viewedDivisions.includes(simulator.id);
              return (
                <button aria-controls={`division-panel-${simulator.id}`} aria-selected={isActive} className="group relative overflow-hidden rounded-[1.45rem] border p-5 text-left transition duration-300 hover:-translate-y-1" key={simulator.id} onClick={() => setActiveId(simulator.id)} role="tab" style={{ background: isActive ? `linear-gradient(145deg, rgba(${simulator.colorRgb}, 0.2), rgba(3,7,18,0.7))` : "rgba(248,247,240,0.035)", borderColor: isActive ? simulator.color : "rgba(248,247,240,0.12)" }} type="button">
                  <div aria-hidden="true" className="absolute -right-8 -top-10 size-32 rounded-full opacity-0 blur-2xl transition duration-300 group-hover:opacity-80" style={{ background: simulator.color }} />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-[0.95rem]" style={{ background: `rgba(${simulator.colorRgb}, 0.16)`, color: simulator.color }}><Icon className="size-5" /></span>
                    <span className="font-mono text-[0.58rem] font-black uppercase tracking-[0.14em]" style={{ color: simulator.color }}>{isViewed ? "Materi sudah dibuka" : `Materi ${simulator.index}`}</span>
                  </div>
                  <h3 className="relative mt-8 text-[1.18rem] font-black leading-tight text-[var(--cream)]">{simulator.division}</h3>
                  <p className="relative mt-2 min-h-[3rem] text-[0.8rem] leading-[1.55] text-[rgba(248,247,240,0.62)]">{simulator.tagline}</p>
                  <div className="relative mt-5 flex items-center justify-between border-t border-[rgba(248,247,240,0.1)] pt-4 font-mono text-[0.56rem] font-black uppercase tracking-[0.12em]" style={{ color: isActive ? simulator.color : "rgba(248,247,240,0.46)" }}><span>{isActive ? "Sedang dipelajari" : "Buka materi"}</span><span>→</span></div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div id={`division-panel-${activeId}`} role="tabpanel">
        <LabLessonGuide color={activeSim.color} division={activeSim.division} learningPath={activeLearningPath} onExperiment={scrollToSimulator} onViewed={markViewed} simulatorId={activeId} />
      </div>

      <section className="bg-[var(--navy-deep)] py-12 sm:py-18" id="lab-simulator">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="mb-7 grid gap-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em]" style={{ color: activeSim.color }}>{activeSim.division}</div>
              <h2 className="headline mt-3 text-[clamp(2.1rem,5vw,4.2rem)] text-[var(--cream)]">{activeSim.title}</h2>
            </div>
            <div className="rounded-[1.15rem] border border-[rgba(248,247,240,0.1)] bg-[rgba(248,247,240,0.04)] p-5 text-[0.9rem] leading-[1.7] text-[rgba(248,247,240,0.65)]">Gunakan simulator untuk menguji satu perubahan dalam satu waktu. Ketika hasil berubah, baca penjelasan di dalam panel sebelum mencoba parameter berikutnya.</div>
          </div>

          <div className="overflow-hidden rounded-[1.7rem] border bg-[rgba(7,16,31,0.9)] shadow-[0_38px_100px_-68px_rgba(0,0,0,0.95)]" style={{ borderColor: `rgba(${activeSim.colorRgb}, 0.28)` }}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-7" style={{ borderColor: `rgba(${activeSim.colorRgb}, 0.17)` }}>
              <div className="flex items-center gap-3"><span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em]" style={{ color: activeSim.color }}>Simulator interaktif</span><span className="h-3 w-px bg-[rgba(248,247,240,0.2)]" /><span className="font-mono text-[0.56rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.45)]">Ubah satu nilai, lalu perhatikan akibatnya</span></div>
              <button className="rounded-full border px-3 py-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.12em] transition hover:bg-[rgba(248,247,240,0.06)]" onClick={() => document.getElementById("lab-lesson-title")?.scrollIntoView({ behavior: "smooth", block: "start" })} style={{ borderColor: `rgba(${activeSim.colorRgb}, 0.36)`, color: activeSim.color }} type="button">Baca materi lagi ↑</button>
            </div>
            <ActiveSimulator />
          </div>
        </div>
      </section>
    </main>
  );
}
