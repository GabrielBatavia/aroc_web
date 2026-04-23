"use client";

import type { Achievement } from "@/data/aroc";
import { MedalIcon, StarIcon, TrophyIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

  return (
    <section
      className="surface-paper relative scroll-mt-24 py-20 sm:py-28"
      id="achievements"
    >
      <div className="paper-grain mx-auto max-w-[1200px] px-4 sm:px-8">
        <div
          ref={headingRef}
          className={`reveal-base reveal-up ${headingVisible ? "revealed" : ""}`}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-[38rem]">
              <div className="kicker">Ruang Piala</div>
              <h2 className="headline mt-5 text-[clamp(2.4rem,5vw,4rem)] text-[var(--ink)]">
                Empat tahun,
                <br />
                <span className="headline-italic">di atas podium.</span>
              </h2>
            </div>
            <p className="max-w-[28rem] text-[1rem] leading-[1.8] text-[var(--muted)] md:pb-2">
              Kami datang untuk bertanding. Ini momen-momen saat engineering
              dan koordinasi kami berbicara di panggung nasional.
            </p>
          </div>
        </div>

        <div
          ref={wallRef}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isHero = index === 0;

            return (
              <article
                key={`${item.year}-${item.title}`}
                className={[
                  "card-hover-lift group relative flex flex-col justify-between overflow-hidden p-7 transition-transform duration-500",
                  "reveal-base reveal-up",
                  wallVisible ? `revealed reveal-delay-${index + 1}` : "",
                  isHero
                    ? "card-ink min-h-[16rem] lg:row-span-1 lg:min-h-[20rem]"
                    : "card-paper min-h-[16rem]",
                ].join(" ")}
              >
                {/* Corner ornament */}
                <div
                  aria-hidden
                  className={[
                    "absolute right-5 top-5 flex size-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110",
                    isHero
                      ? "bg-[rgba(201,162,75,0.2)] text-[var(--gold-bright)]"
                      : "bg-[var(--paper-soft)] text-[var(--gold-deep)]",
                  ].join(" ")}
                >
                  <Icon className="size-5" />
                </div>

                <div>
                  <div
                    className={[
                      "numeral text-[3rem] leading-none transition-colors",
                      isHero
                        ? "text-[var(--gold-bright)]"
                        : "text-[var(--ink)] group-hover:text-[var(--gold-deep)]",
                    ].join(" ")}
                  >
                    {item.year}
                  </div>
                  <div
                    className={[
                      "mt-3 h-px w-10 transition-all duration-500 group-hover:w-16",
                      isHero ? "bg-[var(--gold-bright)]/60" : "bg-[var(--gold)]",
                    ].join(" ")}
                  />
                </div>

                <div className="mt-10">
                  <h3
                    className={[
                      "font-serif text-[1.25rem] font-semibold leading-[1.25]",
                      isHero ? "text-[var(--paper)]" : "text-[var(--ink)]",
                    ].join(" ")}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={[
                      "mt-2 text-[0.82rem] font-medium uppercase tracking-[0.16em]",
                      isHero
                        ? "text-[rgba(245,241,232,0.6)]"
                        : "text-[var(--muted)]",
                    ].join(" ")}
                  >
                    {item.subtitle}
                  </p>
                </div>

                {isHero && (
                  <div className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[var(--gold-bright)]">
                    <span className="inline-block size-1.5 animate-pulse rounded-full bg-[var(--gold-bright)]" />
                    Juara Bertahan
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
