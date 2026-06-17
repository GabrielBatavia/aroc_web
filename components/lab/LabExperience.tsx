"use client";

import { useState } from "react";

import { GaitTunerSimulator } from "@/components/lab/GaitTunerSimulator";
import { SignalFlowSimulator } from "@/components/lab/SignalFlowSimulator";
import { VisionLockSimulator } from "@/components/lab/VisionLockSimulator";
import { BoltIcon, EyeIcon, RadioIcon } from "@/components/shared/Icons";
import { labHeroStats, labSimulators, type SimulatorId } from "@/data/lab";

type LabExperienceProps = {
  stats?: Array<{ label: string; value: string }>;
};

const DIVISION_ICON_MAP: Record<SimulatorId, React.FC<{ className?: string }>> = {
  "maneuvering":      BoltIcon,
  "image-processing": EyeIcon,
  "communication":    RadioIcon,
};

const SIMULATOR_MAP: Record<SimulatorId, React.FC> = {
  "maneuvering":      GaitTunerSimulator,
  "image-processing": VisionLockSimulator,
  "communication":    SignalFlowSimulator,
};

export function LabExperience({ stats = labHeroStats }: LabExperienceProps) {
  const [activeId, setActiveId] = useState<SimulatorId>(labSimulators[0].id);

  const activeSim = labSimulators.find((s) => s.id === activeId) ?? labSimulators[0];
  const ActiveSimulator = SIMULATOR_MAP[activeId];

  return (
    <main className="flex-1" id="main-content">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--navy-abyss)] pb-16 pt-36 sm:pb-24 sm:pt-44">
        {/* Ambient glow layers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(255,228,92,0.13), transparent 55%)," +
              "radial-gradient(ellipse 60% 70% at 90% 30%, rgba(38,55,122,0.45), transparent)," +
              "radial-gradient(ellipse 50% 40% at 10% 80%, rgba(20,30,70,0.7), transparent)",
          }}
        />
        {/* Grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,228,92,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,228,92,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
            {/* Left — copy */}
            <div>
              <div className="kicker kicker-on-ink">Robot Control Room</div>
              <h1 className="headline mt-5 max-w-[14ch] text-[clamp(3.5rem,9vw,7.5rem)] text-[var(--cream)]">
                AROC{" "}
                <span className="headline-italic-on-ink">Lab</span>
                <br />
                Experience.
              </h1>
              <p className="mt-6 max-w-[46rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.68)]">
                Tiga simulator singkat untuk merasakan bagaimana humanoid melihat, berpikir, berkomunikasi, lalu bergerak.
                Tidak ada artikel panjang — langsung main.
              </p>

              {/* CTA hint */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,228,92,0.25)] bg-[rgba(255,228,92,0.08)] px-4 py-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-[var(--yellow)]">
                  <span className="size-1.5 rounded-full bg-[var(--yellow)] animate-pulse" aria-hidden="true" />
                  Live Simulator
                </span>
                <span className="text-[0.82rem] text-[rgba(248,247,240,0.45)]">→ Pilih divisi di bawah lalu gerak slider</span>
              </div>
            </div>

            {/* Right — stats card */}
            <div className="rounded-[1.6rem] border border-[rgba(255,228,92,0.2)] bg-[rgba(248,247,240,0.05)] p-6 backdrop-blur-xl">
              <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.2em] text-[rgba(248,247,240,0.45)]">
                Lab Overview
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.1rem] border border-[rgba(255,228,92,0.12)] bg-[rgba(3,6,16,0.45)] p-4 text-center"
                  >
                    <div className="font-display text-[2rem] font-black leading-none text-[var(--yellow)]">
                      {stat.value}
                    </div>
                    <div className="mt-2 font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.45)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Division preview pills */}
              <div className="mt-5 grid gap-2">
                {labSimulators.map((sim) => {
                  const Icon = DIVISION_ICON_MAP[sim.id];
                  return (
                    <div
                      key={sim.id}
                      className="flex items-center gap-3 rounded-[0.85rem] border border-[rgba(255,228,92,0.1)] bg-[rgba(3,6,16,0.3)] px-3 py-2"
                    >
                      <span
                        className="flex size-7 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: `rgba(${sim.colorRgb}, 0.18)`, color: sim.color }}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[0.78rem] font-bold text-[rgba(248,247,240,0.8)]">{sim.division}</span>
                      <span className="ml-auto font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.35)]">
                        {sim.index}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMULATOR ARCADE ──────────────────────────────── */}
      <section className="bg-[var(--navy-deep)] py-12 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">

          {/* Section header */}
          <div className="mb-8">
            <div className="kicker kicker-on-ink">Playable Simulators</div>
            <h2 className="headline mt-4 text-[clamp(2.4rem,6vw,5rem)] text-[var(--cream)]">
              Pilih divisi,{" "}
              <span className="headline-italic-on-ink">eksplorasi.</span>
            </h2>
          </div>

          {/* Tab selector */}
          <div
            className="mb-6 flex gap-3 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Simulator division tabs"
          >
            {labSimulators.map((sim) => {
              const Icon = DIVISION_ICON_MAP[sim.id];
              const isActive = sim.id === activeId;
              return (
                <button
                  key={sim.id}
                  id={`tab-${sim.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${sim.id}`}
                  type="button"
                  onClick={() => setActiveId(sim.id)}
                  className={[
                    "flex shrink-0 items-center gap-2.5 rounded-[1.1rem] border px-4 py-3 text-left transition-all duration-200",
                    isActive
                      ? "border-transparent text-[var(--navy-deep)] shadow-[0_8px_30px_-12px_rgba(255,228,92,0.6)]"
                      : "border-[rgba(248,247,240,0.1)] text-[rgba(248,247,240,0.65)] hover:border-[rgba(248,247,240,0.2)] hover:text-[rgba(248,247,240,0.9)]",
                  ].join(" ")}
                  style={isActive ? { background: sim.color } : undefined}
                >
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                    style={
                      isActive
                        ? { background: "rgba(3,6,16,0.2)", color: "var(--navy-deep)" }
                        : { background: `rgba(${sim.colorRgb}, 0.12)`, color: sim.color }
                    }
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.82rem] font-black leading-tight">{sim.division}</span>
                    <span
                      className="mt-0.5 block font-mono text-[0.5rem] font-black uppercase tracking-[0.13em]"
                      style={{ opacity: isActive ? 0.6 : 0.5 }}
                    >
                      {sim.index} / {sim.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active simulator card */}
          <div
            id={`panel-${activeId}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeId}`}
            className="overflow-hidden rounded-[1.8rem] border border-[rgba(255,228,92,0.14)] bg-[rgba(7,16,31,0.85)] shadow-[0_40px_120px_-60px_rgba(3,6,16,0.9)] backdrop-blur-sm"
            style={{ borderColor: `rgba(${activeSim.colorRgb}, 0.2)` }}
          >
            {/* Simulator header strip */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 sm:px-8"
              style={{ borderColor: `rgba(${activeSim.colorRgb}, 0.15)` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em]"
                  style={{ color: activeSim.color }}
                >
                  {activeSim.index}
                </span>
                <span className="h-3 w-px bg-[rgba(248,247,240,0.2)]" aria-hidden="true" />
                <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.5)]">
                  {activeSim.division}
                </span>
                <span className="h-3 w-px bg-[rgba(248,247,240,0.2)]" aria-hidden="true" />
                <h2 className="text-[0.88rem] font-black text-[rgba(248,247,240,0.9)]">{activeSim.title}</h2>
              </div>
              <p className="max-w-[36rem] text-[0.78rem] leading-[1.6] text-[rgba(248,247,240,0.45)]">
                {activeSim.tagline}
              </p>
            </div>

            {/* The simulator itself */}
            <ActiveSimulator />
          </div>

          {/* Bottom hints — other simulators */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {labSimulators
              .filter((s) => s.id !== activeId)
              .concat(labSimulators.filter((s) => s.id === activeId))
              .slice(0, 2)
              .map((sim) => {
                const Icon = DIVISION_ICON_MAP[sim.id];
                const isActive = sim.id === activeId;
                return (
                  <button
                    key={sim.id}
                    onClick={() => setActiveId(sim.id)}
                    type="button"
                    aria-label={`Switch to ${sim.division} simulator`}
                    className={[
                      "flex items-center gap-4 rounded-[1.3rem] border p-4 text-left transition-all duration-200",
                      isActive
                        ? "border-[rgba(255,228,92,0.2)] bg-[rgba(255,228,92,0.06)]"
                        : "border-[rgba(248,247,240,0.08)] bg-[rgba(3,6,16,0.3)] hover:border-[rgba(248,247,240,0.15)] hover:bg-[rgba(3,6,16,0.5)]",
                    ].join(" ")}
                  >
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-[0.85rem]"
                      style={{ background: `rgba(${sim.colorRgb}, 0.14)`, color: sim.color }}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[0.82rem] font-black leading-tight text-[rgba(248,247,240,0.85)]">
                        {sim.title}
                      </div>
                      <div className="mt-1 font-mono text-[0.5rem] font-black uppercase tracking-[0.13em] text-[rgba(248,247,240,0.4)]">
                        {sim.division}
                      </div>
                    </div>
                    <span
                      className="ml-auto font-mono text-[0.58rem] font-black uppercase tracking-[0.14em]"
                      style={{ color: sim.color }}
                    >
                      {isActive ? "Active" : "Try →"}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      </section>

      {/* ── INSIGHT STRIP ─────────────────────────────────── */}
      <section className="border-t border-[rgba(255,228,92,0.1)] bg-[var(--navy-abyss)] py-12 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                id: "insight-maneuvering",
                num: "01",
                title: "Gait is fragile.",
                body: "Satu parameter off — lean terlalu jauh, foot lift terlalu tinggi — dan robot kehilangan stabilitas.",
                color: "#ffe45c",
              },
              {
                id: "insight-vision",
                num: "02",
                title: "Robot tidak 'melihat'.",
                body: "Ia memproses threshold, confidence, dan noise frame demi frame. Tidak ada mata — hanya angka.",
                color: "#7b93e8",
              },
              {
                id: "insight-comm",
                num: "03",
                title: "Latency = danger.",
                body: "Satu packet drop di kondisi kritis, dan robot terus bergerak tanpa perintah. Safety stop adalah jaring terakhir.",
                color: "#c8ccd8",
              },
            ].map((insight) => (
              <div
                key={insight.id}
                id={insight.id}
                className="rounded-[1.4rem] border border-[rgba(248,247,240,0.08)] bg-[rgba(248,247,240,0.03)] p-6"
              >
                <span
                  className="font-mono text-[0.58rem] font-black uppercase tracking-[0.2em]"
                  style={{ color: insight.color }}
                >
                  Insight {insight.num}
                </span>
                <h3 className="mt-3 text-[1.2rem] font-black leading-tight text-[var(--cream)]">
                  {insight.title}
                </h3>
                <p className="mt-3 text-[0.88rem] leading-[1.75] text-[rgba(248,247,240,0.55)]">
                  {insight.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
