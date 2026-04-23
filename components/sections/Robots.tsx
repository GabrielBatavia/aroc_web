"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { RobotCard } from "@/data/aroc";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type RobotsProps = {
  robots: RobotCard[];
};

function StatBar({
  label,
  value,
  trigger,
  delay = 0,
}: {
  label: string;
  value: number;
  trigger: boolean;
  delay?: number;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const timer = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(timer);
  }, [trigger, value, delay]);

  return (
    <div>
      <div className="flex items-center justify-between text-[0.78rem]">
        <span className="font-medium uppercase tracking-[0.14em] text-[rgba(245,241,232,0.62)]">
          {label}
        </span>
        <span className="numeral text-[0.95rem] text-[var(--gold-bright)]">
          {width}
        </span>
      </div>
      <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-[rgba(245,241,232,0.08)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--gold),var(--gold-bright))] transition-[width] duration-[1400ms] ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function RobotCardArticle({
  robot,
  index,
  visible,
}: {
  robot: RobotCard;
  index: number;
  visible: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={(el) => {
        ref.current = el;
      }}
      className={`group relative overflow-hidden bg-[var(--ink-deep)] border border-[rgba(201,162,75,0.22)] transition-all duration-500 hover:border-[rgba(201,162,75,0.55)] hover:shadow-[0_28px_60px_-20px_rgba(201,162,75,0.25)] reveal-base reveal-up ${visible ? `revealed reveal-delay-${index + 1}` : ""}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          alt={`${robot.name} — ${robot.role}`}
          className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.05]"
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          src={robot.image}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,19,33,0.05)_0%,rgba(8,19,33,0.85)_82%,rgba(8,19,33,1)_100%)]"
        />
        <div className="absolute left-5 top-5">
          <div className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-bright)]">
            No. {String(index + 1).padStart(2, "0")}
          </div>
          <div className="mt-1 font-serif text-[0.95rem] font-semibold italic text-[var(--paper)]">
            {robot.role}
          </div>
        </div>
      </div>

      <div className="relative px-6 pb-7 pt-4">
        <div className="numeral text-[2.2rem] leading-none text-[var(--paper)] transition-colors duration-500 group-hover:text-[var(--gold-bright)]">
          {robot.name}
        </div>
        <p className="mt-4 min-h-[4.5rem] text-[0.95rem] leading-[1.75] text-[rgba(245,241,232,0.72)]">
          {robot.description}
        </p>

        <div className="mt-6 space-y-3">
          {robot.stats.map((stat, i) => (
            <StatBar
              key={stat.label}
              label={stat.label}
              value={stat.value}
              trigger={triggered}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export function Robots({ robots }: RobotsProps) {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  return (
    <section className="surface-ink scroll-mt-24 py-20 sm:py-28" id="robots">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <div
          ref={headingRef}
          className={`reveal-base reveal-up ${headingVisible ? "revealed" : ""}`}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-[38rem]">
              <div className="kicker kicker-on-ink">Armada Kami</div>
              <h2 className="headline mt-5 text-[clamp(2.4rem,5vw,4rem)] text-[var(--paper)]">
                Tiga spesialis.
                <br />
                <span className="headline-italic-on-ink">Satu lineup.</span>
              </h2>
            </div>
            <p className="max-w-[26rem] text-[1rem] leading-[1.8] text-[rgba(245,241,232,0.75)] md:pb-2">
              Setiap robot dibangun untuk peran spesifik di lapangan. Chassis
              yang sama, perilaku yang berbeda, kepribadian yang khas.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="mt-16 grid gap-6 lg:grid-cols-3">
          {robots.map((robot, index) => (
            <RobotCardArticle
              key={robot.name}
              robot={robot}
              index={index}
              visible={gridVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
