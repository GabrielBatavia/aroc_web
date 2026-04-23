"use client";

import type { DivisionCard } from "@/data/aroc";
import {
  BoltIcon,
  CircuitIcon,
  CodeIcon,
  CpuIcon,
  EyeIcon,
  RadioIcon,
} from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

export function Technology({ divisions }: TechnologyProps) {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  return (
    <section
      className="surface-paper-soft scroll-mt-24 py-20 sm:py-28"
      id="technology"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <div
          ref={headingRef}
          className={`reveal-base reveal-up ${headingVisible ? "revealed" : ""}`}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-[38rem]">
              <div className="kicker">Cara Kami Membangun</div>
              <h2 className="headline mt-5 text-[clamp(2.4rem,5vw,4rem)] text-[var(--ink)]">
                Dua divisi,
                <br />
                <span className="headline-italic">satu lab.</span>
              </h2>
            </div>
            <p className="max-w-[26rem] text-[1rem] leading-[1.8] text-[var(--muted)] md:pb-2">
              Dari motor dan rangkaian sampai visi dan strategi &mdash;
              kapabilitas yang mengubah mekanik mentah jadi mesin juara.
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-6 lg:grid-cols-2">
          {divisions.map((division, index) => (
            <article
              key={division.title}
              className={`card-paper card-hover-lift group rounded-sm p-8 sm:p-10 reveal-base reveal-up ${cardsVisible ? `revealed reveal-delay-${index + 1}` : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="numeral text-[2.2rem] leading-none text-[var(--gold-deep)] transition-transform duration-500 group-hover:-translate-y-1">
                    0{index + 1}
                  </div>
                  <h3 className="font-serif mt-4 text-[2rem] font-semibold text-[var(--ink)]">
                    {division.title}
                  </h3>
                </div>
                <div className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-deep)]">
                  Divisi
                </div>
              </div>

              <p className="mt-5 max-w-[30rem] text-[1rem] leading-[1.85] text-[var(--muted)]">
                {division.description}
              </p>

              <div className="mt-9 space-y-5">
                {division.items.map((item) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <div
                      key={item.title}
                      className="flex gap-5 border-t border-[var(--rule)] pt-5 transition-all duration-300 hover:gap-6"
                    >
                      <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-sm border border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] transition-colors group-hover:text-[var(--gold-deep)]">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-[1.1rem] font-semibold text-[var(--ink)]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-[0.92rem] leading-[1.75] text-[var(--muted)]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
