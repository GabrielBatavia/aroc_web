"use client";

import { ArocGeneratedMark, DoodleArrow, DoodleUnderline } from "@/components/shared/BrandAssets";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { AboutHeroStat } from "@/data/about";

type AboutHeroProps = {
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  description: string;
  stats: AboutHeroStat[];
};

export function AboutHero({ eyebrow, titlePrefix, titleAccent, description, stats }: AboutHeroProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="surface-ink campaign-shell relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div ref={ref} className={`relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="relative">
            <div className="kicker kicker-on-ink">{eyebrow}</div>
            <h1 className="headline mt-6 max-w-[10ch] text-[clamp(4rem,12vw,9rem)] text-[var(--cream)]">
              {titlePrefix} <span className="headline-italic-on-ink">{titleAccent}</span>
            </h1>
            <DoodleUnderline className="absolute -bottom-8 left-2 w-72 text-[var(--yellow)]" />
            <p className="mt-12 max-w-[38rem] text-[1.08rem] leading-[1.85] text-[rgba(248,247,240,0.72)]">
              {description}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[28rem]">
            <DoodleArrow className="absolute -left-10 top-0 w-36 rotate-[-12deg] text-[var(--yellow)]" />
            <div className="flex aspect-square items-center justify-center rounded-full bg-[var(--yellow)] p-10 shadow-[0_0_0_1rem_rgba(255,228,92,0.08),0_40px_100px_-60px_rgba(255,228,92,0.9)]">
              <ArocGeneratedMark className="h-full w-full" />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div className="rounded-[1.5rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] p-5 backdrop-blur" key={stat.label}>
              <div className="numeral text-[3.6rem] leading-none text-[var(--yellow)]">{stat.value}</div>
              <p className="mt-2 font-mono text-[0.7rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.52)]">
                {String(index + 1).padStart(2, "0")} / {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
