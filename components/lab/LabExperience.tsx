"use client";

import { useEffect, useState } from "react";

import {
  ArrowRightIcon,
  BoltIcon,
  CodeIcon,
  EyeIcon,
  RadioIcon,
  ShieldIcon,
} from "@/components/shared/Icons";
import { Ros2CodeChecker } from "@/components/lab/Ros2CodeChecker";
import { VisionPlayground } from "@/components/lab/VisionPlayground";
import type { LabDivision, LabDivisionId, LabModule } from "@/data/lab";

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

function buildReadableContent(module: LabModule, division: LabDivision) {
  if (module.content?.length) return module.content;

  return [
    {
      heading: "Tujuan pembelajaran",
      body: [
        module.description,
        `Modul ini berada di level ${module.level.toLowerCase()} untuk divisi ${division.shortTitle}. Materi bisa dikembangkan menjadi catatan panjang, dokumentasi internal, contoh kasus, atau SOP latihan tanpa mengubah layout halaman.`,
      ],
    },
    {
      heading: "Konteks di robot AROC_PL",
      body: [
        `Fokus utama divisi ini meliputi ${division.focus.join(", ").toLowerCase()}. Saat materi asli sudah siap, bagian ini bisa diisi dengan penjelasan detail, gambar pendukung, potongan kode, rumus, atau langkah troubleshooting.`,
        "Gunakan struktur paragraf pendek, subjudul jelas, dan checklist praktis agar anggota aktif bisa membaca materi saat sesi latihan tanpa kehilangan konteks.",
      ],
    },
  ];
}

export function LabExperience({ divisions, stats }: LabExperienceProps) {
  const [activeId, setActiveId] = useState<LabDivisionId>(divisions[0].id);
  const [activeModuleId, setActiveModuleId] = useState(divisions[0].modules[0].id);
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
  const activeModule =
    activeDivision.modules.find((module) => module.id === activeModuleId) ?? activeDivision.modules[0];
  const readableContent = buildReadableContent(activeModule, activeDivision);
  const totalModules = divisions.reduce((sum, division) => sum + division.modules.length, 0);
  const completedCount = divisions.reduce(
    (sum, division) => sum + division.modules.filter((module) => completed[module.id]).length,
    0,
  );
  const activeCompleted = activeDivision.modules.filter((module) => completed[module.id]).length;
  const totalProgress = Math.round((completedCount / totalModules) * 100);
  const divisionProgress = Math.round((activeCompleted / activeDivision.modules.length) * 100);
  const selectedResult = selectedOption === null ? null : activeDivision.miniLab.options[selectedOption];
  const isActiveModuleDone = Boolean(completed[activeModule.id]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  return (
    <main className="flex-1" id="main-content">
      <section className="surface-ink relative overflow-hidden pb-14 pt-32 sm:pb-18 sm:pt-38">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-20 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.14),transparent_64%)] blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <div className="kicker kicker-on-ink">Learning Platform</div>
              <h1 className="headline mt-5 max-w-[12ch] text-[clamp(3.5rem,9vw,7rem)] text-[var(--cream)]">
                AROC <span className="headline-italic-on-ink">Lab.</span>
              </h1>
              <p className="mt-6 max-w-[44rem] text-[1.04rem] leading-[1.85] text-[rgba(248,247,240,0.74)]">
                Pusat materi belajar anggota aktif AROC_PL. Pilih divisi, buka modul, baca materi, lalu tandai progress latihan langsung dari browser.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[rgba(255,228,92,0.18)] bg-[rgba(248,247,240,0.06)] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[0.6rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.55)]">
                    Total progress
                  </div>
                  <div className="mt-2 font-display text-[2.8rem] font-black leading-none text-[var(--yellow)]">
                    {totalProgress}%
                  </div>
                </div>
                <ShieldIcon className="size-10 text-[var(--yellow)]" />
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(248,247,240,0.12)]">
                <div
                  className="h-full rounded-full bg-[var(--yellow)] transition-all duration-500"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {stats.map((stat) => (
                  <div className="rounded-xl bg-[rgba(3,6,16,0.34)] p-3" key={stat.label}>
                    <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.48)]">
                      {stat.label}
                    </div>
                    <div className="mt-2 font-display text-[1.45rem] font-black leading-none text-[var(--cream)]">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-paper-warm relative overflow-hidden py-12 sm:py-16">
        <div className="dot-grid-paper absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="kicker">Course Dashboard</div>
              <h2 className="headline mt-4 text-[clamp(2.6rem,6vw,4.6rem)] text-[var(--navy-deep)]">
                Modul pembelajaran.
              </h2>
            </div>
            <p className="max-w-[38rem] text-[0.98rem] leading-[1.78] text-[var(--muted-dark)]">
              Layout ini dibuat seperti platform belajar konvensional: daftar modul tetap terlihat, sedangkan area utama fokus untuk membaca materi panjang.
            </p>
          </div>

          <div className="mb-5 flex gap-2 overflow-x-auto rounded-[1.3rem] border border-[var(--rule)] bg-white/70 p-2 shadow-[0_18px_60px_-48px_rgba(7,12,34,0.7)]">
            {divisions.map((division) => {
              const isActive = division.id === activeDivision.id;
              const done = division.modules.filter((module) => completed[module.id]).length;

              return (
                <button
                  className={[
                    "flex min-w-[15rem] items-center gap-3 rounded-[1rem] px-4 py-3 text-left transition",
                    isActive
                      ? "bg-[var(--navy-deep)] text-[var(--cream)] shadow-[0_18px_46px_-34px_rgba(7,12,34,0.9)]"
                      : "text-[var(--navy-deep)] hover:bg-[var(--cream-soft)]",
                  ].join(" ")}
                  key={division.id}
                  onClick={() => {
                    setActiveId(division.id);
                    setActiveModuleId(division.modules[0].id);
                    setSelectedOption(null);
                  }}
                  type="button"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: isActive ? division.accent : `rgba(${division.accentRgb}, 0.16)`,
                      color: isActive ? "var(--navy-deep)" : division.accent,
                    }}
                  >
                    <DivisionIcon className="size-5" icon={division.icon} />
                  </span>
                  <span>
                    <span className="block text-[0.88rem] font-black leading-tight">{division.shortTitle}</span>
                    <span className="mt-1 block font-mono text-[0.55rem] font-black uppercase tracking-[0.13em] opacity-65">
                      {done}/{division.modules.length} modul selesai
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-5 lg:grid-cols-[21rem_1fr] lg:items-start">
            <aside className="grid gap-5 lg:sticky lg:top-28">
              <section className="rounded-[1.6rem] border border-[var(--rule)] bg-white/82 p-5 shadow-[0_24px_70px_-56px_rgba(7,12,34,0.75)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.17em] text-[var(--gold-deep)]">
                      {activeDivision.eyebrow}
                    </div>
                    <h3 className="mt-2 text-[1.25rem] font-black leading-tight text-[var(--navy-deep)]">
                      {activeDivision.title}
                    </h3>
                  </div>
                  <span className="font-display text-[2rem] font-black leading-none text-[var(--gold-deep)]">
                    {divisionProgress}%
                  </span>
                </div>
                <p className="mt-4 text-[0.9rem] leading-[1.68] text-[var(--muted-dark)]">
                  {activeDivision.description}
                </p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(7,12,34,0.09)]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ background: activeDivision.accent, width: `${divisionProgress}%` }}
                  />
                </div>
              </section>

              <nav className="rounded-[1.6rem] border border-[var(--rule)] bg-white/86 p-3 shadow-[0_24px_70px_-56px_rgba(7,12,34,0.75)]" aria-label="Daftar modul Lab">
                {activeDivision.modules.map((module, index) => {
                  const isActive = module.id === activeModule.id;
                  const isDone = completed[module.id];

                  return (
                    <button
                      className={[
                        "mb-2 flex w-full gap-3 rounded-[1.05rem] p-3 text-left transition last:mb-0",
                        isActive
                          ? "bg-[var(--navy-deep)] text-[var(--cream)]"
                          : "text-[var(--navy-deep)] hover:bg-[var(--cream-soft)]",
                      ].join(" ")}
                      key={module.id}
                      onClick={() => {
                        setActiveModuleId(module.id);
                        setSelectedOption(null);
                      }}
                      type="button"
                    >
                      <span
                        className={[
                          "flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-[0.62rem] font-black",
                          isDone
                            ? "bg-[var(--yellow)] text-[var(--navy-deep)]"
                            : isActive
                              ? "bg-[rgba(248,247,240,0.14)] text-[var(--yellow)]"
                              : "bg-[rgba(7,12,34,0.07)] text-[var(--muted-dark)]",
                        ].join(" ")}
                      >
                        {isDone ? "✓" : String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.88rem] font-black leading-snug">{module.title}</span>
                        <span className="mt-1 block font-mono text-[0.54rem] font-black uppercase tracking-[0.12em] opacity-60">
                          {module.level} / {module.duration}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="grid gap-5">
              <article className="rounded-[1.8rem] border border-[var(--rule)] bg-white/92 p-5 shadow-[0_32px_90px_-62px_rgba(7,12,34,0.78)] sm:p-8 lg:p-10">
                <div className="mx-auto max-w-[780px]">
                  <div className="mb-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[var(--yellow)] px-3 py-1 font-mono text-[0.58rem] font-black uppercase tracking-[0.14em] text-[var(--navy-deep)]">
                      {activeModule.level}
                    </span>
                    <span className="rounded-full border border-[rgba(7,12,34,0.12)] bg-[var(--cream-soft)] px-3 py-1 font-mono text-[0.58rem] font-black uppercase tracking-[0.14em] text-[var(--muted-dark)]">
                      {activeModule.duration}
                    </span>
                    <span className="rounded-full border border-[rgba(7,12,34,0.12)] bg-[var(--cream-soft)] px-3 py-1 font-mono text-[0.58rem] font-black uppercase tracking-[0.14em] text-[var(--muted-dark)]">
                      {activeDivision.shortTitle}
                    </span>
                  </div>

                  <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black leading-[0.98] tracking-[-0.055em] text-[var(--navy-deep)]">
                    {activeModule.title}
                  </h2>
                  <p className="mt-5 border-b border-[rgba(7,12,34,0.1)] pb-7 text-[1.08rem] leading-[1.9] text-[var(--muted-dark)]">
                    {activeModule.description}
                  </p>

                  <div className="mt-8 space-y-8">
                    {readableContent.map((section) => (
                      <section key={section.heading}>
                        <h3 className="text-[1.35rem] font-black tracking-[-0.02em] text-[var(--navy-deep)]">
                          {section.heading}
                        </h3>
                        <div className="mt-3 space-y-4 text-[1rem] leading-[1.92] text-[var(--muted-dark)]">
                          {section.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>

                  <section className="mt-9 rounded-[1.3rem] border border-[rgba(7,12,34,0.09)] bg-[var(--cream-soft)] p-5">
                    <h3 className="text-[1rem] font-black text-[var(--navy-deep)]">Output yang harus dikuasai</h3>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3">
                      {activeModule.outcomes.map((outcome) => (
                        <div
                          className="rounded-xl border border-[rgba(7,12,34,0.08)] bg-white/70 p-3 text-[0.9rem] font-bold leading-snug text-[var(--navy-deep)]"
                          key={outcome}
                        >
                          {outcome}
                        </div>
                      ))}
                    </div>
                  </section>

                  {activeModule.interactive?.length ? (
                    <section className="mt-9 border-t border-[rgba(7,12,34,0.1)] pt-8">
                      <div className="mb-5">
                        <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                          Practice Playground
                        </div>
                        <h3 className="mt-2 text-[1.55rem] font-black leading-tight text-[var(--navy-deep)]">
                          Coba konsepnya langsung
                        </h3>
                        <p className="mt-2 text-[0.95rem] leading-[1.72] text-[var(--muted-dark)]">
                          Latihan ini berjalan di browser dan tidak menjalankan kode robot asli. Tujuannya membantu membaca struktur logic sebelum masuk ke repo OP3.
                        </p>
                      </div>
                      <div className="grid gap-5">
                        {activeModule.interactive.map((exercise) => {
                          if (exercise.type === "vision-playground") {
                            return <VisionPlayground exercise={exercise} key={exercise.id} />;
                          }

                          return <Ros2CodeChecker exercise={exercise} key={exercise.id} />;
                        })}
                      </div>
                    </section>
                  ) : null}

                  <div className="mt-8 flex flex-col gap-3 border-t border-[rgba(7,12,34,0.1)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[0.9rem] leading-[1.65] text-[var(--muted-dark)]">
                      Tandai selesai kalau materi sudah dibaca dan dipraktikkan saat latihan.
                    </p>
                    <button
                      className={[
                        "inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-5 font-mono text-[0.66rem] font-black uppercase tracking-[0.14em] transition",
                        isActiveModuleDone
                          ? "bg-[var(--navy-deep)] text-[var(--cream)]"
                          : "bg-[var(--yellow)] text-[var(--navy-deep)] hover:-translate-y-0.5",
                      ].join(" ")}
                      onClick={() => {
                        setCompleted((current) => ({
                          ...current,
                          [activeModule.id]: !current[activeModule.id],
                        }));
                      }}
                      type="button"
                    >
                      {isActiveModuleDone ? "Sudah selesai" : "Tandai selesai"}
                    </button>
                  </div>
                </div>
              </article>

              <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
                <section className="rounded-[1.6rem] border border-[var(--rule)] bg-white/86 p-5 shadow-[0_24px_70px_-56px_rgba(7,12,34,0.75)] sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.17em] text-[var(--gold-deep)]">
                        Latihan singkat
                      </div>
                      <h3 className="mt-2 text-[1.35rem] font-black text-[var(--navy-deep)]">
                        {activeDivision.miniLab.title}
                      </h3>
                    </div>
                    <ArrowRightIcon className="size-6 text-[var(--gold-deep)]" />
                  </div>
                  <p className="mt-4 text-[0.95rem] leading-[1.78] text-[var(--muted-dark)]">
                    {activeDivision.miniLab.prompt}
                  </p>
                  <div className="mt-5 grid gap-2">
                    {activeDivision.miniLab.options.map((option, index) => {
                      const isSelected = selectedOption === index;

                      return (
                        <button
                          className={[
                            "rounded-xl border px-4 py-3 text-left text-[0.92rem] font-bold leading-snug transition",
                            isSelected
                              ? "border-[var(--navy-deep)] bg-[var(--navy-deep)] text-[var(--cream)]"
                              : "border-[rgba(7,12,34,0.1)] bg-[var(--cream-soft)] text-[var(--navy-deep)] hover:border-[rgba(7,12,34,0.35)]",
                          ].join(" ")}
                          key={option.label}
                          onClick={() => setSelectedOption(index)}
                          type="button"
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  {selectedResult ? (
                    <div
                      className={[
                        "mt-4 rounded-xl border p-4 text-[0.92rem] leading-[1.7]",
                        selectedResult.correct
                          ? "border-[rgba(199,152,32,0.28)] bg-[rgba(255,228,92,0.34)] text-[var(--navy-deep)]"
                          : "border-[rgba(7,12,34,0.12)] bg-white/70 text-[var(--muted-dark)]",
                      ].join(" ")}
                    >
                      {selectedResult.result}
                    </div>
                  ) : null}
                </section>

                <section className="rounded-[1.6rem] border border-[var(--rule)] bg-[var(--navy-deep)] p-5 text-[var(--cream)] shadow-[0_24px_70px_-56px_rgba(7,12,34,0.9)] sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.17em] text-[var(--yellow)]">
                        Referensi & skill
                      </div>
                      <h3 className="mt-2 text-[1.35rem] font-black">Pendukung materi</h3>
                    </div>
                    <CodeIcon className="size-7 text-[var(--yellow)]" />
                  </div>

                  <div className="mt-5 grid gap-4">
                    {activeDivision.skills.map((skill) => (
                      <div key={skill.label}>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[0.9rem] font-bold">{skill.label}</span>
                          <span className="font-mono text-[0.62rem] font-black text-[var(--yellow)]">
                            {skill.mastery}%
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[rgba(248,247,240,0.12)]">
                          <div
                            className="h-full rounded-full"
                            style={{ background: activeDivision.accent, width: `${skill.mastery}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-2">
                    {activeDivision.resources.map((resource) => (
                      <div
                        className="rounded-xl border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] px-4 py-3 text-[0.9rem] font-bold"
                        key={resource}
                      >
                        {resource}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
