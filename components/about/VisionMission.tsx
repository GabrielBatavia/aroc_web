"use client";

import { AboutSectionTitle } from "@/components/about/AboutSectionTitle";
import { EyeIcon, MedalIcon, ShieldIcon, StarIcon, UsersIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { AboutValue } from "@/data/about";

type VisionMissionProps = {
  vision: { title: string; description: string };
  mission: { title: string; items: string[] };
  values: AboutValue[];
};

const valueIconMap = {
  star: StarIcon,
  shield: ShieldIcon,
  users: UsersIcon,
  medal: MedalIcon,
};

export function VisionMission({ vision, mission, values }: VisionMissionProps) {
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal();

  return (
    <section className="surface-paper relative overflow-hidden py-20 sm:py-24">
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <AboutSectionTitle icon={<EyeIcon className="size-6" />} kicker="Arah Kami" title="Visi & Misi" />

        <div ref={cardsRef} className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className={`card-paper card-hover-lift rounded-[2rem] p-6 sm:p-8 reveal-base reveal-left ${cardsVisible ? "revealed" : ""}`}>
            <div className="numeral text-[3rem] leading-none text-[var(--gold-deep)]">01</div>
            <h3 className="font-display mt-5 text-[clamp(3rem,6vw,5rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-[var(--navy-deep)]">
              {vision.title}
            </h3>
            <p className="mt-6 max-w-[34rem] text-[1.02rem] leading-[1.9] text-[var(--muted-dark)]">
              {vision.description}
            </p>
          </article>

          <article className={`card-ink card-hover-lift rounded-[2rem] p-6 sm:p-8 reveal-base reveal-right ${cardsVisible ? "revealed reveal-delay-1" : ""}`}>
            <div className="numeral text-[3rem] leading-none text-[var(--yellow)]">02</div>
            <h3 className="font-display mt-5 text-[clamp(3rem,6vw,5rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-[var(--cream)]">
              {mission.title}
            </h3>
            <ul className="mt-7 space-y-4">
              {mission.items.map((item, index) => (
                <li className="grid grid-cols-[auto_1fr] gap-4 border-t border-[rgba(248,247,240,0.1)] pt-4 first:border-t-0 first:pt-0" key={item}>
                  <span className="numeral text-[1.2rem] leading-none text-[var(--yellow)]">0{index + 1}</span>
                  <span className="text-[0.98rem] leading-[1.75] text-[rgba(248,247,240,0.78)]">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div ref={valuesRef} className="mt-16 rounded-[2rem] bg-[var(--yellow)] p-5 text-[var(--navy-deep)] sm:p-8">
          <div className="font-mono text-[0.72rem] font-black uppercase tracking-[0.22em]">Nilai Inti</div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = valueIconMap[value.icon];
              return (
                <article className={`rounded-[1.25rem] border border-[rgba(7,12,34,0.16)] bg-[rgba(248,247,240,0.45)] p-5 reveal-base reveal-up ${valuesVisible ? `revealed reveal-delay-${index + 1}` : ""}`} key={value.title}>
                  <Icon className="size-6" />
                  <h4 className="font-display mt-5 text-[1.7rem] font-black uppercase leading-none tracking-[-0.03em]">{value.title}</h4>
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-[rgba(7,12,34,0.72)]">{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
