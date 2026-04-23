"use client";

import type { AboutCard, ValueCard } from "@/data/aroc";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type AboutProps = {
  cards: AboutCard[];
  values: ValueCard[];
};

export function About({ cards, values }: AboutProps) {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal();

  return (
    <section
      className="surface-paper-soft relative scroll-mt-24 py-20 sm:py-28"
      id="about"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <div
          ref={headingRef}
          className={`grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:gap-16 reveal-base reveal-up ${headingVisible ? "revealed" : ""}`}
        >
          <div>
            <div className="kicker">Tentang Tim</div>
            <h2 className="headline mt-5 text-[clamp(2.4rem,5vw,4.2rem)] text-[var(--ink)]">
              Tim robotika
              <br />
              <span className="headline-italic">dari Malang.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-[1.08rem] leading-[1.85] text-[var(--ink)]">
              Kami adalah engineer, programmer, dan fabrikator dari{" "}
              <strong className="font-semibold">
                Politeknik Negeri Malang
              </strong>
              . Satu lab yang sama, satu piala yang diburu, dan robot yang
              benar-benar main sepak bola &mdash; andal, di bawah tekanan, dan
              melawan tim-tim terbaik di Indonesia.
            </p>
            <p className="mt-5 text-[1rem] leading-[1.85] text-[var(--muted)]">
              Berikut kami &mdash; siapa kami, cara kami bekerja, dan kenapa
              perusahaan yang berinvestasi di AROC_PL sedang berinvestasi pada
              generasi berikutnya talenta robotika Indonesia.
            </p>
          </div>
        </div>

        <div className="hairline mt-16" />

        <div
          ref={cardsRef}
          className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12"
        >
          {cards.map((card, index) => (
            <article
              key={card.title}
              className={`group reveal-base reveal-up ${cardsVisible ? `revealed reveal-delay-${index + 1}` : ""}`}
            >
              <div className="numeral text-[2.5rem] leading-none text-[var(--gold-deep)] transition-transform duration-500 group-hover:-translate-y-1">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif mt-4 text-[1.55rem] font-semibold text-[var(--ink)]">
                {card.title}
              </h3>
              <div className="mt-3 h-px w-10 bg-[var(--gold)] transition-all duration-500 group-hover:w-20" />
              <p className="mt-5 text-[0.98rem] leading-[1.85] text-[var(--muted)]">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="hairline mt-20" />

        <div
          ref={valuesRef}
          className="mt-16"
        >
          <div className="kicker">Yang Kami Pegang</div>
          <h3 className="headline mt-4 text-[clamp(1.8rem,3.5vw,2.6rem)] text-[var(--ink)]">
            Empat nilai, tanpa kompromi.
          </h3>

          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <article
                key={value.title}
                className={`group reveal-base reveal-up ${valuesVisible ? `revealed reveal-delay-${index + 1}` : ""}`}
              >
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-deep)]">
                  &mdash; 0{index + 1}
                </div>
                <h4 className="font-serif mt-3 text-[1.35rem] font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--gold-deep)]">
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
