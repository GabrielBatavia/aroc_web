import type { AboutHeroStat } from "@/data/about";

type AboutHeroProps = {
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  description: string;
  stats: AboutHeroStat[];
};

const statToneClass = {
  cyan: "text-[var(--cyan)]",
  blue: "text-[#51a2ff]",
  gold: "text-[var(--gold)]",
  orange: "text-[var(--orange)]",
  emerald: "text-[var(--green)]",
};

export function AboutHero({
  eyebrow,
  titlePrefix,
  titleAccent,
  description,
  stats,
}: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[rgba(0,184,219,0.16)] pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[20rem] bg-[radial-gradient(circle_at_top,rgba(16,78,100,0.24),transparent_68%)]" />

      <div className="relative text-center">
        <div className="eyebrow">{eyebrow}</div>

        <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,5rem)] font-black leading-[0.92] tracking-[-0.05em] text-white">
          <span>{titlePrefix} </span>
          <span className="heading-gradient-cyan">{titleAccent}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[42rem] text-[1rem] leading-8 text-[var(--muted)] sm:text-[1.125rem]">
          {description}
        </p>

        <div className="mt-10 flex flex-wrap items-start justify-center gap-x-10 gap-y-5 sm:gap-x-14">
          {stats.map((stat) => (
            <div className="min-w-[6.25rem]" key={stat.label}>
              <div
                className={`font-display text-[2rem] font-black leading-none tracking-[-0.04em] sm:text-[2.35rem] ${statToneClass[stat.tone]}`}
              >
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-[#6a7282] sm:text-[0.95rem]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
