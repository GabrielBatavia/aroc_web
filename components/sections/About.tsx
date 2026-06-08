"use client";

import { DoodleArrow, SensorCone } from "@/components/shared/BrandAssets";
import { ShieldIcon, TargetIcon, TrophyIcon, UsersIcon, StarIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { AboutCard, ValueCard } from "@/data/aroc";

type AboutProps = {
  cards: AboutCard[];
  values: ValueCard[];
};

const aboutIconMap = {
  users: UsersIcon,
  target: TargetIcon,
  shield: ShieldIcon,
};

const valueIconMap = {
  spark: StarIcon,
  shield: ShieldIcon,
  users: UsersIcon,
  trophy: TrophyIcon,
};

export function About({ cards, values }: AboutProps) {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal();

  return (
    <section className="surface-ink relative scroll-mt-24 overflow-hidden py-20 sm:py-28" id="about">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_25%,rgba(255,228,92,0.14),transparent_28rem),radial-gradient(circle_at_80%_70%,rgba(38,55,122,0.5),transparent_32rem)]" />
      <SensorCone className="absolute right-[-2rem] top-20 hidden w-72 rotate-6 text-[rgba(255,228,92,0.22)] lg:block" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <div ref={headingRef} className={`grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end reveal-base reveal-up ${headingVisible ? "revealed" : ""}`}>
          <div className="relative">
            <div className="kicker kicker-on-ink">Tentang Tim</div>
            <h2 className="headline mt-5 max-w-[10ch] text-[clamp(3.2rem,8vw,6.8rem)] text-[var(--cream)]">
              Robotika dari Malang.
            </h2>
            <DoodleArrow className="absolute -bottom-9 left-[12rem] hidden w-36 rotate-[10deg] text-[var(--yellow)] md:block" />
          </div>

          <div className="rounded-[2rem] border border-[rgba(255,228,92,0.2)] bg-[rgba(248,247,240,0.06)] p-6 backdrop-blur-xl sm:p-8">
            <p className="text-[1.08rem] leading-[1.85] text-[rgba(248,247,240,0.84)]">
              Kami adalah engineer, programmer, dan fabrikator dari <strong className="text-[var(--yellow)]">Politeknik Negeri Malang</strong>. Satu lab, satu lapangan uji, dan robot humanoid yang dipaksa bekerja di bawah tekanan kompetisi.
            </p>
            <p className="mt-5 text-[0.98rem] leading-[1.8] text-[rgba(248,247,240,0.62)]">
              Bagi sponsor, AROC_PL adalah akses ke talenta robotika yang sudah terbiasa merancang, menguji, memperbaiki, dan bertanding dengan deadline nyata.
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = aboutIconMap[card.icon];
            return (
              <article
                className={`tech-card group rounded-[1.7rem] p-6 sm:p-7 reveal-base reveal-up ${cardsVisible ? `revealed reveal-delay-${index + 1}` : ""}`}
                key={card.title}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-5">
                    <div className="numeral text-[3rem] leading-none text-[var(--yellow)]">0{index + 1}</div>
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--yellow)] text-[var(--navy-deep)] transition group-hover:rotate-[-6deg] group-hover:scale-95">
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <h3 className="font-display mt-8 text-[2rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--cream)]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[0.97rem] leading-[1.8] text-[rgba(248,247,240,0.68)]">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div ref={valuesRef} className="mt-16 rounded-[2rem] bg-[var(--yellow)] p-5 text-[var(--navy-deep)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-mono text-[0.72rem] font-black uppercase tracking-[0.22em]">Yang Kami Pegang</div>
              <h3 className="headline mt-3 text-[clamp(2.5rem,6vw,5rem)] text-[var(--navy-deep)]">
                Empat nilai. Nol kompromi.
              </h3>
            </div>
            <p className="max-w-[28rem] text-[0.98rem] leading-[1.75] text-[rgba(7,12,34,0.72)]">
              Prinsip kerja yang menjaga tim tetap cepat, disiplin, dan relevan ketika robot gagal di lapangan.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = valueIconMap[value.icon];
              return (
                <article
                  className={`rounded-[1.25rem] border border-[rgba(7,12,34,0.16)] bg-[rgba(248,247,240,0.45)] p-5 reveal-base reveal-up ${valuesVisible ? `revealed reveal-delay-${index + 1}` : ""}`}
                  key={value.title}
                >
                  <Icon className="size-6" />
                  <h4 className="font-display mt-5 text-[1.65rem] font-black uppercase leading-none tracking-[-0.03em]">
                    {value.title}
                  </h4>
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-[rgba(7,12,34,0.72)]">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
