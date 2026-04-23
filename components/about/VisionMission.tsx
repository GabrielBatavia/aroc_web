"use client";

import type { AboutValue } from "@/data/about";
import { AboutSectionTitle } from "@/components/about/AboutSectionTitle";
import { EyeIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type VisionMissionProps = {
  vision: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    items: string[];
  };
  values: AboutValue[];
};

export function VisionMission({
  vision,
  mission,
  values,
}: VisionMissionProps) {
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal();

  return (
    <section className="surface-paper py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <AboutSectionTitle
          icon={<EyeIcon className="size-5" />}
          title="Visi & Misi"
          kicker="Arah Kami"
        />

        <div
          ref={cardsRef}
          className="mt-14 grid gap-6 lg:grid-cols-2"
        >
          <article
            className={`card-paper card-hover-lift rounded-sm p-8 sm:p-10 reveal-base reveal-left ${cardsVisible ? "revealed" : ""}`}
          >
            <div className="numeral text-[2rem] leading-none text-[var(--gold-deep)]">
              01
            </div>
            <h3 className="font-serif mt-4 text-[1.85rem] font-semibold text-[var(--ink)]">
              {vision.title}
            </h3>
            <div className="mt-3 h-px w-10 bg-[var(--gold)]" />
            <p className="mt-5 max-w-[30rem] text-[1rem] leading-[1.9] text-[var(--muted)]">
              {vision.description}
            </p>
          </article>

          <article
            className={`card-ink card-hover-lift rounded-sm p-8 sm:p-10 reveal-base reveal-right ${cardsVisible ? "revealed reveal-delay-1" : ""}`}
          >
            <div className="numeral text-[2rem] leading-none text-[var(--gold-bright)]">
              02
            </div>
            <h3 className="font-serif mt-4 text-[1.85rem] font-semibold text-[var(--paper)]">
              {mission.title}
            </h3>
            <div className="mt-3 h-px w-10 bg-[var(--gold-bright)]" />
            <ul className="mt-6 space-y-4">
              {mission.items.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 border-t border-[rgba(245,241,232,0.08)] pt-4 first:border-t-0 first:pt-0"
                >
                  <span className="numeral text-[0.9rem] font-bold text-[var(--gold-bright)]">
                    0{index + 1}
                  </span>
                  <span className="text-[0.98rem] leading-[1.75] text-[rgba(245,241,232,0.8)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div
          ref={valuesRef}
          className="mt-16"
        >
          <div className="kicker">Nilai Inti</div>
          <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <article
                key={value.title}
                className={`reveal-base reveal-up ${valuesVisible ? `revealed reveal-delay-${index + 1}` : ""}`}
              >
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-deep)]">
                  &mdash; 0{index + 1}
                </div>
                <h4 className="font-serif mt-3 text-[1.25rem] font-semibold text-[var(--ink)]">
                  {value.title}
                </h4>
                <p className="mt-3 text-[0.95rem] leading-[1.8] text-[var(--muted)]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
