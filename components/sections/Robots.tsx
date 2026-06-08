"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { DoodleArrow, SoccerPath } from "@/components/shared/BrandAssets";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { RobotCard } from "@/data/aroc";

type RobotsProps = {
  robots: RobotCard[];
};

function StatBar({ label, value, trigger, delay = 0 }: { label: string; value: number; trigger: boolean; delay?: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const timer = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(timer);
  }, [trigger, value, delay]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 font-mono text-[0.64rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.56)]">
        <span>{label}</span>
        <span className="text-[var(--yellow)]">{width}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[rgba(248,247,240,0.08)]">
        <div className="h-full rounded-full bg-[var(--yellow)] transition-[width] duration-[1400ms] ease-out" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function RobotArticle({ robot, index, visible }: { robot: RobotCard; index: number; visible: boolean }) {
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
      { threshold: 0.28 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={(el) => {
        ref.current = el;
      }}
      className={`group relative overflow-hidden rounded-[2rem] border border-[rgba(255,228,92,0.2)] bg-[rgba(17,26,61,0.7)] shadow-[0_40px_100px_-68px_rgba(0,0,0,0.95)] transition duration-500 hover:-translate-y-2 hover:rotate-[-0.6deg] hover:border-[rgba(255,228,92,0.55)] reveal-base reveal-up ${visible ? `revealed reveal-delay-${index + 1}` : ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,228,92,0.16),transparent_18rem)]" />
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          alt={`${robot.name} - ${robot.role}`}
          className="object-cover transition duration-[1000ms] group-hover:scale-[1.06]"
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          src={robot.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,22,0.1),rgba(5,8,22,0.92))]" />
        <div className="absolute left-5 top-5 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.64rem] font-black uppercase tracking-[0.18em] text-[var(--navy-deep)]">
          Unit {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="relative z-10 p-6 sm:p-7">
        <div className="font-mono text-[0.7rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">{robot.role}</div>
        <h3 className="font-display mt-3 text-[clamp(2.5rem,5vw,4.4rem)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[var(--cream)]">
          {robot.name}
        </h3>
        <p className="mt-5 min-h-[5rem] text-[0.96rem] leading-[1.75] text-[rgba(248,247,240,0.7)]">
          {robot.description}
        </p>
        <div className="mt-7 space-y-4">
          {robot.stats.map((stat, statIndex) => (
            <StatBar delay={statIndex * 110} key={stat.label} label={stat.label} trigger={triggered} value={stat.value} />
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
    <section className="surface-ink campaign-shell relative scroll-mt-24 py-20 sm:py-28" id="robots">
      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
        <div ref={headingRef} className={`reveal-base reveal-up ${headingVisible ? "revealed" : ""}`}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="relative">
              <div className="kicker kicker-on-ink">Armada Kami</div>
              <h2 className="headline mt-5 max-w-[11ch] text-[clamp(3.2rem,8vw,6.6rem)] text-[var(--cream)]">
                Tiga robot. Satu lineup.
              </h2>
              <DoodleArrow className="absolute -right-10 top-12 hidden w-36 rotate-[18deg] text-[var(--yellow)] lg:block" />
            </div>
            <div>
              <p className="max-w-[33rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.72)]">
                Setiap unit punya role spesifik seperti pemain bola: penyerang, kiper, dan bek. Perbedaan perilaku dibuat dari kombinasi mekanik, kontrol, dan strategi software.
              </p>
              <SoccerPath className="mt-5 w-full max-w-[25rem] text-[rgba(255,228,92,0.5)]" />
            </div>
          </div>
        </div>

        <div ref={gridRef} className="mt-14 grid gap-6 lg:grid-cols-3">
          {robots.map((robot, index) => (
            <RobotArticle index={index} key={robot.name} robot={robot} visible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
