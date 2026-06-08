"use client";

import { CircuitPath, SensorCone } from "@/components/shared/BrandAssets";
import {
  BoltIcon,
  CircuitIcon,
  CodeIcon,
  CpuIcon,
  EyeIcon,
  RadioIcon,
  TrophyIcon,
} from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { DivisionCard } from "@/data/aroc";

type TechnologyProps = {
  divisions: DivisionCard[];
};

const iconMap = {
  cpu: CpuIcon,
  bolt: BoltIcon,
  circuit: CircuitIcon,
  code: CodeIcon,
  radio: RadioIcon,
  eye: EyeIcon,
};

const proofRows = [
  ["Perception", "Vision pipeline untuk bola, gawang, dan garis lapangan"],
  ["Locomotion", "Kontrol gerak dan stabilitas untuk match pressure"],
  ["Embedded", "Koordinasi sensor, aktuator, dan daya onboard"],
  ["Strategy", "Keputusan role-based untuk serang, jaga, dan recovery"],
];

export function Technology({ divisions }: TechnologyProps) {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  return (
    <section className="surface-paper-soft relative scroll-mt-24 overflow-hidden py-20 sm:py-28" id="technology">
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <CircuitPath className="absolute left-[-4rem] top-24 hidden w-[30rem] text-[rgba(7,12,34,0.11)] lg:block" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <div ref={headingRef} className={`reveal-base reveal-up ${headingVisible ? "revealed" : ""}`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <div className="kicker">Cara Kami Membangun</div>
              <h2 className="headline mt-5 max-w-[11ch] text-[clamp(3.2rem,8vw,6.4rem)] text-[var(--navy-deep)]">
                Hardware ketemu otak.
              </h2>
            </div>
            <p className="max-w-[32rem] text-[1.05rem] leading-[1.85] text-[var(--muted-dark)] lg:pb-5">
              Dari bracket kecil sampai keputusan lapangan, setiap bagian robot dibangun sebagai sistem: mekanik, elektronik, software, dan pengujian yang saling mengunci.
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="mt-14 grid gap-6 lg:grid-cols-2">
          {divisions.map((division, index) => (
            <article className={`card-paper card-hover-lift relative overflow-hidden rounded-[2rem] p-6 sm:p-8 reveal-base reveal-up ${cardsVisible ? `revealed reveal-delay-${index + 1}` : ""}`} key={division.title}>
              <SensorCone className="absolute right-[-2rem] top-6 w-44 text-[rgba(7,12,34,0.1)]" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-mono text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--gold-deep)]">Divisi 0{index + 1}</div>
                    <h3 className="font-display mt-4 text-[clamp(2.8rem,6vw,5rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-[var(--navy-deep)]">
                      {division.title}
                    </h3>
                  </div>
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-[var(--yellow)] text-[var(--navy-deep)]">
                    <TrophyIcon className="size-7" />
                  </div>
                </div>

                <p className="mt-6 max-w-[32rem] text-[1rem] leading-[1.85] text-[var(--muted-dark)]">
                  {division.description}
                </p>

                <div className="mt-8 grid gap-4">
                  {division.items.map((item) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <div className="grid grid-cols-[auto_1fr] gap-4 rounded-[1.25rem] border border-[var(--rule)] bg-white/60 p-4 transition hover:-translate-y-1 hover:bg-white" key={item.title}>
                        <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--navy-deep)] text-[var(--yellow)]">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <h4 className="font-display text-[1.35rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)]">
                            {item.title}
                          </h4>
                          <p className="mt-2 text-[0.92rem] leading-[1.7] text-[var(--muted-dark)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className={`card-ink rounded-[2rem] p-6 sm:p-8 reveal-base reveal-left ${cardsVisible ? "revealed reveal-delay-3" : ""}`}>
            <div className="champ-badge-outline">Match Ready Stack</div>
            <h3 className="headline mt-6 text-[clamp(2.8rem,6vw,5rem)] text-[var(--cream)]">
              Bukan demo. Ini sistem tanding.
            </h3>
          </div>
          <div className={`overflow-hidden rounded-[2rem] border border-[var(--rule)] bg-white/80 reveal-base reveal-right ${cardsVisible ? "revealed reveal-delay-4" : ""}`}>
            {proofRows.map(([title, description], index) => (
              <div className="grid gap-3 border-t border-[var(--rule)] p-5 first:border-t-0 sm:grid-cols-[12rem_1fr] sm:items-center sm:p-6" key={title}>
                <div className="font-display text-[1.55rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)]">
                  {String(index + 1).padStart(2, "0")} / {title}
                </div>
                <p className="text-[0.98rem] leading-[1.75] text-[var(--muted-dark)]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
