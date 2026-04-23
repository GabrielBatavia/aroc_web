"use client";

import type { AboutHeroStat } from "@/data/about";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type AboutHeroProps = {
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  description: string;
  stats: AboutHeroStat[];
};

export function AboutHero({
  eyebrow,
  titlePrefix,
  titleAccent,
  description,
  stats,
}: AboutHeroProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="surface-ink relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,162,75,0.14), transparent 55%)",
        }}
      />

      <div
        ref={ref}
        className={`relative mx-auto max-w-[1200px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <div>
            <div className="kicker kicker-on-ink">{eyebrow}</div>
            <h1 className="headline mt-6 text-[clamp(2.8rem,6.5vw,5rem)] text-[var(--paper)]">
              {titlePrefix}{" "}
              <span className="headline-italic-on-ink">{titleAccent}</span>
            </h1>
            <p className="mt-7 max-w-[36rem] text-[1.08rem] leading-[1.85] text-[rgba(245,241,232,0.72)]">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 border-l-0 md:gap-10 md:border-l md:border-[rgba(245,241,232,0.12)] md:pl-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="numeral text-[2.4rem] leading-none text-[var(--gold-bright)]">
                  {stat.value}
                </div>
                <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[rgba(245,241,232,0.5)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
