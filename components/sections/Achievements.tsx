"use client";

import { CircuitPath } from "@/components/shared/BrandAssets";
import { MedalIcon, StarIcon, TrophyIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Achievement } from "@/data/aroc";

type AchievementsProps = {
  items: Achievement[];
};

const iconMap = {
  trophy: TrophyIcon,
  spark: StarIcon,
  medal: MedalIcon,
};

export function Achievements({ items }: AchievementsProps) {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: wallRef, isVisible: wallVisible } = useScrollReveal();
  const heroItem = items[0];
  const otherItems = items.slice(1);

  return (
    <section className="surface-paper relative scroll-mt-24 overflow-hidden py-20 sm:py-28" id="achievements">
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <CircuitPath className="absolute right-[-3rem] top-10 hidden w-[28rem] rotate-[-8deg] text-[rgba(7,12,34,0.12)] lg:block" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <div ref={headingRef} className={`reveal-base reveal-up ${headingVisible ? "revealed" : ""}`}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <div className="kicker">Ruang Piala</div>
              <h2 className="headline mt-5 max-w-[11ch] text-[clamp(3.2rem,8vw,6.4rem)] text-[var(--navy-deep)]">
                Empat tahun di podium.
              </h2>
            </div>
            <p className="max-w-[34rem] text-[1.05rem] leading-[1.85] text-[var(--muted-dark)] lg:pb-4">
              Prestasi bukan dekorasi. Ini bukti bahwa robot, strategi, dan koordinasi tim bisa bertahan di arena nasional.
            </p>
          </div>
        </div>

        <div ref={wallRef} className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {heroItem ? (
            <article className={`card-ink card-hover-lift relative min-h-[28rem] overflow-hidden rounded-[2rem] p-7 sm:p-10 reveal-base reveal-left ${wallVisible ? "revealed" : ""}`}>
              <div className="absolute -right-10 -top-10 size-56 rounded-full bg-[rgba(255,228,92,0.16)] blur-3xl" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="champ-badge-outline">Juara Bertahan</div>
                    <div className="numeral mt-8 text-[clamp(5rem,12vw,9rem)] leading-none text-[var(--yellow)]">
                      {heroItem.year}
                    </div>
                  </div>
                  <TrophyIcon className="size-16 text-[var(--yellow)]" />
                </div>

                <div>
                  <h3 className="font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[var(--cream)]">
                    {heroItem.title}
                  </h3>
                  <p className="mt-4 font-mono text-[0.8rem] font-black uppercase tracking-[0.2em] text-[rgba(248,247,240,0.55)]">
                    {heroItem.subtitle}
                  </p>
                </div>
              </div>
            </article>
          ) : null}

          <div className="grid gap-5">
            {otherItems.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <article
                  className={`card-paper card-hover-lift group relative overflow-hidden rounded-[1.5rem] p-6 reveal-base reveal-right ${wallVisible ? `revealed reveal-delay-${index + 1}` : ""}`}
                  key={`${item.year}-${item.title}`}
                >
                  <div className="flex items-center gap-5">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--navy-deep)] text-[var(--yellow)] transition group-hover:rotate-[-5deg] group-hover:scale-95">
                      <Icon className="size-7" />
                    </div>
                    <div className="min-w-0">
                      <div className="numeral text-[2.4rem] leading-none text-[var(--navy-deep)]">{item.year}</div>
                      <h3 className="mt-2 font-display text-[1.7rem] font-black uppercase leading-[0.95] tracking-[-0.03em] text-[var(--navy-deep)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
