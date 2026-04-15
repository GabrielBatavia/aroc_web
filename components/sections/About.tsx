import type { AboutCard, ValueCard } from "@/data/aroc";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  ShieldIcon,
  StarIcon,
  TargetIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/shared/Icons";

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

const toneClasses = {
  cyan: "border-[rgba(0,184,219,0.18)] bg-[rgba(0,184,219,0.08)] text-[var(--cyan)]",
  blue: "border-[rgba(81,162,255,0.18)] bg-[rgba(43,127,255,0.08)] text-[#51a2ff]",
  gold: "border-[rgba(240,177,0,0.18)] bg-[rgba(240,177,0,0.08)] text-[var(--gold)]",
  orange: "border-[rgba(255,137,4,0.18)] bg-[rgba(255,137,4,0.08)] text-[var(--orange)]",
  emerald: "border-[rgba(0,212,146,0.18)] bg-[rgba(0,212,146,0.08)] text-[var(--green)]",
};

export function About({ cards, values }: AboutProps) {
  return (
    <section className="section-divider scroll-mt-24 py-16 sm:py-20" id="about">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[linear-gradient(180deg,rgba(8,12,21,0.94),rgba(5,8,15,0.98))] px-5 py-12 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-8 lg:px-12">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,184,219,0.12),transparent_70%)] blur-3xl" />

          <SectionHeading
            centered
            description="AROC_PL is the pride of Politeknik Negeri Malang, focused on advanced humanoid robot soccer development. We combine mechanical precision, electronic reliability, and intelligent software."
            label="About Us"
            title={
              <>
                Engineering <span className="heading-gradient-cyan">Excellence</span>
              </>
            }
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {cards.map((card) => {
              const Icon = aboutIconMap[card.icon];

              return (
                <article
                  className="neon-panel group relative overflow-hidden rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1"
                  key={card.title}
                >
                  <div className="absolute right-0 top-0 size-24 rounded-full bg-[radial-gradient(circle,rgba(0,184,219,0.12),transparent_68%)]" />
                  <div className="inline-flex rounded-2xl border border-[rgba(0,184,219,0.18)] bg-[rgba(0,184,219,0.08)] p-3 text-[var(--cyan)]">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 font-display text-[1.55rem] font-bold uppercase tracking-[0.04em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-8 text-[var(--muted)]">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => {
              const Icon = valueIconMap[value.icon];

              return (
                <article
                  className="relative overflow-hidden rounded-[1.35rem] border border-white/6 bg-[rgba(10,14,23,0.82)] p-5 transition duration-300 hover:-translate-y-1"
                  key={value.title}
                >
                  <div className={`inline-flex rounded-2xl border p-3 ${toneClasses[value.tone]}`}>
                    <Icon className="size-5" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold uppercase text-white">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
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
