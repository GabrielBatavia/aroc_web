"use client";

import { useEffect, useState } from "react";

import {
  ArrowRightIcon,
  BoltIcon,
  CodeIcon,
  CpuIcon,
  EyeIcon,
  RadioIcon,
  ShieldIcon,
  TargetIcon,
} from "@/components/shared/Icons";
import type { LabDivision, LabDivisionId } from "@/data/lab";

type LabExperienceProps = {
  divisions: LabDivision[];
  stats: Array<{ label: string; value: string }>;
};

const STORAGE_KEY = "aroc-lab-progress-v1";

function DivisionIcon({ icon, className }: { icon: LabDivision["icon"]; className?: string }) {
  if (icon === "eye") return <EyeIcon className={className} />;
  if (icon === "radio") return <RadioIcon className={className} />;
  return <BoltIcon className={className} />;
}

function levelIndex(level: string) {
  return ["Foundation", "Tools", "Practice", "Match Ready"].indexOf(level) + 1;
}

export function LabExperience({ divisions, stats }: LabExperienceProps) {
  const [activeId, setActiveId] = useState<LabDivisionId>(divisions[0].id);
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const activeDivision = divisions.find((division) => division.id === activeId) ?? divisions[0];
  const totalModules = divisions.reduce((sum, division) => sum + division.modules.length, 0);
  const completedCount = divisions.reduce(
    (sum, division) => sum + division.modules.filter((module) => completed[module.id]).length,
    0,
  );
  const activeCompleted = activeDivision.modules.filter((module) => completed[module.id]).length;
  const totalProgress = Math.round((completedCount / totalModules) * 100);
  const divisionProgress = Math.round((activeCompleted / activeDivision.modules.length) * 100);
  const selectedResult = selectedOption === null ? null : activeDivision.miniLab.options[selectedOption];

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  return (
    <main className="flex-1" id="main-content">
      <section className="surface-ink campaign-shell relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div
          aria-hidden="true"
          className="absolute left-[-8rem] top-20 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.18),transparent_66%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute right-[-10rem] top-44 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(123,147,232,0.28),transparent_64%)] blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="kicker kicker-on-ink">AROC Training Ground</div>
              <h1 className="headline mt-6 max-w-[10ch] text-[clamp(4rem,11vw,9rem)] text-[var(--cream)]">
                AROC <span className="headline-italic-on-ink">Lab.</span>
              </h1>
              <p className="mt-7 max-w-[38rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.72)]">
                Portal latihan internal untuk anggota aktif AROC_PL: pilih divisi, selesaikan modul, jalankan mini lab, dan pantau kesiapan skill langsung dari browser.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(255,228,92,0.2)] bg-[rgba(248,247,240,0.06)] p-5 shadow-[0_34px_100px_-68px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-7">
              <div className="absolute inset-0 opacity-50" aria-hidden="true">
                <div className="h-full w-full bg-[linear-gradient(120deg,rgba(255,228,92,0.08),transparent_35%,rgba(123,147,232,0.12))]" />
              </div>
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">
                      Training Console
                    </div>
                    <h2 className="font-display mt-4 text-[clamp(2.8rem,6vw,5rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-[var(--cream)]">
                      Mission progress
                    </h2>
                  </div>
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--yellow)] text-[var(--navy-deep)] shadow-[0_0_0_8px_rgba(255,228,92,0.12)]">
                    <CpuIcon className="size-8" />
                  </div>
                </div>

                <div className="mt-8 rounded-[1.4rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(3,6,16,0.45)] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.55)]">
                      Overall readiness
                    </span>
                    <span className="font-display text-[2.4rem] font-black leading-none text-[var(--yellow)]">
                      {totalProgress}%
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(248,247,240,0.1)]">
                    <div
                      className="h-full rounded-full bg-[var(--yellow)] transition-all duration-500"
                      style={{ width: `${totalProgress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      className="rounded-[1.2rem] border border-[rgba(255,228,92,0.14)] bg-[rgba(248,247,240,0.055)] p-4"
                      key={stat.label}
                    >
                      <div className="font-mono text-[0.54rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.48)]">
                        {stat.label}
                      </div>
                      <div className="mt-3 font-display text-[2rem] font-black uppercase leading-none text-[var(--cream)]">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-paper relative overflow-hidden py-20 sm:py-28">
        <div className="dot-grid-paper absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="kicker">Division Switcher</div>
              <h2 className="headline mt-5 max-w-[12ch] text-[clamp(3rem,8vw,6.4rem)] text-[var(--navy-deep)]">
                Pilih jalur latihan.
              </h2>
            </div>
            <p className="max-w-[38rem] text-[1rem] leading-[1.85] text-[var(--muted-dark)] lg:justify-self-end">
              Setiap divisi punya modul, mini lab, skill matrix, dan resource vault. Progress disimpan lokal di browser, jadi cukup untuk versi awal tanpa login.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {divisions.map((division) => {
              const isActive = division.id === activeDivision.id;
              const done = division.modules.filter((module) => completed[module.id]).length;

              return (
                <button
                  className={[
                    "group text-left transition duration-300",
                    isActive ? "-translate-y-1" : "hover:-translate-y-1",
                  ].join(" ")}
                  key={division.id}
                  onClick={() => {
                    setActiveId(division.id);
                    setSelectedOption(null);
                  }}
                  type="button"
                >
                  <article
                    className={[
                      "h-full overflow-hidden rounded-[2rem] border p-5 shadow-[0_28px_80px_-62px_rgba(7,12,34,0.8)] transition duration-300 sm:p-6",
                      isActive
                        ? "border-[rgba(7,12,34,0.18)] bg-[var(--navy-deep)] text-[var(--cream)]"
                        : "border-[var(--rule)] bg-white/78 text-[var(--navy-deep)] hover:border-[rgba(255,228,92,0.7)]",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="flex size-13 items-center justify-center rounded-2xl"
                        style={{
                          background: `rgba(${division.accentRgb}, ${isActive ? 1 : 0.14})`,
                          color: isActive ? "var(--navy-deep)" : division.accent,
                        }}
                      >
                        <DivisionIcon className="size-6" icon={division.icon} />
                      </div>
                      <div className="rounded-full border border-current/15 px-3 py-1 font-mono text-[0.55rem] font-black uppercase tracking-[0.14em] opacity-75">
                        {done}/{division.modules.length} done
                      </div>
                    </div>
                    <div className="mt-7 font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] opacity-60">
                      {division.eyebrow}
                    </div>
                    <h3 className="font-display mt-3 text-[2.5rem] font-black uppercase leading-[0.86] tracking-[-0.05em]">
                      {division.shortTitle}
                    </h3>
                    <p className={[
                      "mt-4 text-[0.94rem] leading-[1.72]",
                      isActive ? "text-[rgba(248,247,240,0.68)]" : "text-[var(--muted-dark)]",
                    ].join(" ")}
                    >
                      {division.description}
                    </p>
                  </article>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="surface-ink campaign-shell relative overflow-hidden py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="kicker kicker-on-ink">Learning Path</div>
              <h2 className="headline mt-5 max-w-[12ch] text-[clamp(3rem,8vw,6.2rem)] text-[var(--cream)]">
                {activeDivision.title}
              </h2>
            </div>
            <div className="max-w-[34rem] rounded-[1.5rem] border border-[rgba(255,228,92,0.17)] bg-[rgba(248,247,240,0.06)] p-5 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.55)]">
                  Division progress
                </span>
                <span className="font-display text-[2.2rem] font-black leading-none text-[var(--yellow)]">
                  {divisionProgress}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(248,247,240,0.1)]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ background: activeDivision.accent, width: `${divisionProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {activeDivision.modules.map((module) => {
              const isDone = completed[module.id];

              return (
                <article
                  className="group flex min-h-[25rem] flex-col rounded-[2rem] border border-[rgba(255,228,92,0.16)] bg-[rgba(248,247,240,0.055)] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[rgba(255,228,92,0.42)]"
                  key={module.id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">
                        Mission {String(levelIndex(module.level)).padStart(2, "0")}
                      </div>
                      <div className="mt-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.13em] text-[rgba(248,247,240,0.45)]">
                        {module.level} / {module.duration}
                      </div>
                    </div>
                    <button
                      aria-pressed={isDone}
                      className={[
                        "flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-[0.7rem] font-black transition",
                        isDone
                          ? "border-[var(--yellow)] bg-[var(--yellow)] text-[var(--navy-deep)]"
                          : "border-[rgba(248,247,240,0.18)] text-[rgba(248,247,240,0.55)] hover:border-[var(--yellow)] hover:text-[var(--yellow)]",
                      ].join(" ")}
                      onClick={() => {
                        setCompleted((current) => ({ ...current, [module.id]: !current[module.id] }));
                      }}
                      type="button"
                    >
                      {isDone ? "OK" : "+"}
                    </button>
                  </div>
                  <h3 className="font-display mt-6 text-[2.25rem] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[var(--cream)]">
                    {module.title}
                  </h3>
                  <p className="mt-4 text-[0.92rem] leading-[1.72] text-[rgba(248,247,240,0.66)]">
                    {module.description}
                  </p>
                  <div className="mt-auto pt-6">
                    <div className="mb-3 font-mono text-[0.55rem] font-black uppercase tracking-[0.17em] text-[rgba(248,247,240,0.45)]">
                      Output latihan
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {module.outcomes.map((outcome) => (
                        <span
                          className="rounded-full border border-[rgba(255,228,92,0.18)] bg-[rgba(255,228,92,0.07)] px-3 py-1 font-mono text-[0.55rem] font-black uppercase tracking-[0.11em] text-[var(--yellow)]"
                          key={outcome}
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-paper-warm relative overflow-hidden py-20 sm:py-28">
        <div className="dot-grid-paper absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <article className="luxury-surface overflow-hidden rounded-[2.4rem] border border-[var(--rule)] bg-white/82 shadow-[0_40px_100px_-68px_rgba(7,12,34,0.7)]">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <div className="kicker">Interactive Zone</div>
                    <h2 className="headline mt-5 max-w-[11ch] text-[clamp(3rem,7vw,5.6rem)] text-[var(--navy-deep)]">
                      {activeDivision.miniLab.title}
                    </h2>
                  </div>
                  <div
                    className="flex size-16 shrink-0 items-center justify-center rounded-2xl text-[var(--navy-deep)]"
                    style={{ background: activeDivision.accent }}
                  >
                    <TargetIcon className="size-8" />
                  </div>
                </div>

                <p className="mt-7 text-[1rem] leading-[1.82] text-[var(--muted-dark)]">
                  {activeDivision.miniLab.prompt}
                </p>

                <div className="mt-7 grid gap-3">
                  {activeDivision.miniLab.options.map((option, index) => {
                    const isSelected = selectedOption === index;

                    return (
                      <button
                        className={[
                          "flex items-center justify-between gap-4 rounded-[1.2rem] border p-4 text-left transition duration-200",
                          isSelected
                            ? "border-[var(--navy-deep)] bg-[var(--navy-deep)] text-[var(--cream)]"
                            : "border-[rgba(7,12,34,0.1)] bg-[var(--cream-soft)] text-[var(--navy-deep)] hover:border-[rgba(7,12,34,0.35)]",
                        ].join(" ")}
                        key={option.label}
                        onClick={() => setSelectedOption(index)}
                        type="button"
                      >
                        <span className="font-bold leading-snug">{option.label}</span>
                        <ArrowRightIcon className="size-5 shrink-0" />
                      </button>
                    );
                  })}
                </div>

                {selectedResult ? (
                  <div
                    className={[
                      "mt-5 rounded-[1.4rem] border p-5",
                      selectedResult.correct
                        ? "border-[rgba(199,152,32,0.28)] bg-[rgba(255,228,92,0.34)] text-[var(--navy-deep)]"
                        : "border-[rgba(7,12,34,0.12)] bg-white/70 text-[var(--muted-dark)]",
                    ].join(" ")}
                  >
                    <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.16em]">
                      {selectedResult.correct ? "Diagnosis tepat" : "Review lagi"}
                    </div>
                    <p className="mt-2 text-[0.95rem] leading-[1.7]">{selectedResult.result}</p>
                  </div>
                ) : null}
              </div>
            </article>

            <div className="grid gap-5">
              <article className="rounded-[2rem] border border-[var(--rule)] bg-[var(--navy-deep)] p-6 text-[var(--cream)] shadow-[0_34px_100px_-72px_rgba(7,12,34,0.95)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">
                      Skill Matrix
                    </div>
                    <h3 className="font-display mt-3 text-[2.4rem] font-black uppercase leading-none tracking-[-0.05em]">
                      Kesiapan divisi
                    </h3>
                  </div>
                  <ShieldIcon className="size-9 text-[var(--yellow)]" />
                </div>
                <div className="mt-7 grid gap-5">
                  {activeDivision.skills.map((skill) => (
                    <div key={skill.label}>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-bold text-[0.92rem]">{skill.label}</span>
                        <span className="font-mono text-[0.7rem] font-black text-[var(--yellow)]">
                          {skill.mastery}%
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[rgba(248,247,240,0.11)]">
                        <div
                          className="h-full rounded-full"
                          style={{ background: activeDivision.accent, width: `${skill.mastery}%` }}
                        />
                      </div>
                      <p className="mt-2 text-[0.82rem] leading-[1.6] text-[rgba(248,247,240,0.58)]">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[2rem] border border-[var(--rule)] bg-white/80 p-6 shadow-[0_30px_80px_-65px_rgba(7,12,34,0.7)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                      Resource Vault
                    </div>
                    <h3 className="font-display mt-3 text-[2.3rem] font-black uppercase leading-none tracking-[-0.05em] text-[var(--navy-deep)]">
                      Catatan latihan
                    </h3>
                  </div>
                  <CodeIcon className="size-9 text-[var(--gold-deep)]" />
                </div>
                <div className="mt-6 grid gap-2">
                  {activeDivision.resources.map((resource) => (
                    <div
                      className="flex items-center justify-between rounded-[1rem] border border-[rgba(7,12,34,0.09)] bg-[var(--cream-soft)] px-4 py-3 text-[var(--navy-deep)]"
                      key={resource}
                    >
                      <span className="text-[0.92rem] font-bold">{resource}</span>
                      <span className="font-mono text-[0.56rem] font-black uppercase tracking-[0.14em] text-[var(--muted-dark)]">
                        Soon
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
