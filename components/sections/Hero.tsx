"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  DoodleArrow,
  DoodleUnderline,
  SensorCone,
  SoccerPath,
} from "@/components/shared/BrandAssets";
import { ArrowRightIcon, TrophyIcon } from "@/components/shared/Icons";
import { CountNumber } from "@/components/shared/CountNumber";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { RobotModelViewer } from "@/components/shared/RobotModelViewer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { HeroData } from "@/data/aroc";

type HeroProps = {
  data: HeroData;
};

const marqueeWords = [
  "AROC_PL",
  "HUMANOID SOCCER",
  "KRI 2024 CHAMPION",
  "POLINEMA ROBOTICS",
  "ROBOT THAT PLAYS TO WIN",
];

const facts = [
  { value: 11, suffix: "+", label: "Engineer aktif" },
  { value: 3, suffix: "", label: "Robot lineup" },
  { value: 4, suffix: "x", label: "Podium nasional" },
];

export function Hero({ data }: HeroProps) {
  const { ref: copyRef, isVisible: copyVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: visualRef, isVisible: visualVisible } = useScrollReveal({ threshold: 0.1 });
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanMove(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section className="surface-ink campaign-shell relative min-h-screen overflow-hidden pb-0 pt-28 sm:pt-32 lg:pt-36" id="top">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-28 z-[1] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.2),transparent_65%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-[1240px] gap-12 px-4 pb-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-8 lg:pb-20">
        <div
          ref={copyRef}
          className={`relative z-20 reveal-base reveal-up ${copyVisible ? "revealed" : ""}`}
        >
          <div className="champ-badge">
            <TrophyIcon className="size-4" />
            <span>Juara Nasional / KRI Humanoid 2024</span>
          </div>

          <div className="relative mt-8">
            <h1 className="headline max-w-[9ch] text-[clamp(4rem,13vw,9.8rem)] text-[var(--cream)]">
              Humanoid <span className="headline-italic-on-ink">robot</span> soccer team.
            </h1>
            <DoodleUnderline className="absolute -bottom-5 left-2 w-52 rotate-[-2deg] text-[var(--yellow)] sm:w-72" />
          </div>

          <p className="mt-10 max-w-[34rem] text-[1.04rem] leading-[1.85] text-[rgba(248,247,240,0.74)] sm:text-[1.12rem]">
            {data.description} Tiga angkatan, satu lab, dan satu misi: membuat robot humanoid yang benar-benar bermain untuk menang.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton className="btn-gold" href={data.primaryCta.href}>
              {data.primaryCta.label}
              <ArrowRightIcon className="size-5" />
            </MagneticButton>
            <Link className="btn-ghost-paper" href={data.secondaryCta.href}>
              {data.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-11 grid max-w-xl grid-cols-3 gap-3 sm:gap-5">
            {facts.map((fact, index) => (
              <div
                className="rounded-[1.25rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] p-4 backdrop-blur"
                key={fact.label}
              >
                <div className="numeral text-[2.6rem] leading-none text-[var(--yellow)]">
                  <CountNumber end={fact.value} suffix={fact.suffix} />
                </div>
                <div className="mt-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.5)]">
                  {fact.label}
                </div>
                <div className="mt-3 h-1 rounded-full bg-[rgba(248,247,240,0.1)]">
                  <div
                    className="h-full rounded-full bg-[var(--yellow)]"
                    style={{ width: `${index === 0 ? 88 : index === 1 ? 72 : 96}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={visualRef}
          className={`relative z-10 mx-auto w-full max-w-[680px] reveal-base reveal-right ${visualVisible ? "revealed" : ""}`}
        >
          <DoodleArrow className="absolute -left-8 top-5 z-20 hidden w-36 rotate-[-14deg] text-[var(--yellow)] opacity-80 md:block" />
          <SensorCone className="absolute right-0 top-16 z-0 hidden w-48 text-[rgba(255,228,92,0.36)] md:block" />
          <SoccerPath className="absolute -bottom-8 left-1/2 z-0 w-[90%] -translate-x-1/2 text-[rgba(255,228,92,0.42)]" />

          <div
            ref={stageRef}
            className="relative min-h-[520px] overflow-visible rounded-[2rem] border border-[rgba(255,228,92,0.2)] bg-[linear-gradient(180deg,rgba(26,36,85,0.55),rgba(5,8,22,0.1))] px-3 pt-6 shadow-[0_40px_110px_-70px_rgba(0,0,0,1)] sm:min-h-[620px]"
            onPointerMove={(event) => {
              if (!canMove) return;
              const rect = stageRef.current?.getBoundingClientRect();
              if (!rect) return;
              const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
              const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
              setTilt({ x, y });
            }}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            style={{ perspective: "1200px" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] top-[12%] h-[58%] rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.24),rgba(255,228,92,0.05)_46%,transparent_70%)] blur-3xl transition-transform duration-300"
              style={{ transform: `translate3d(${tilt.x * 26}px, ${tilt.y * 18}px, 0)` }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-5 rounded-[1.55rem] border border-[rgba(248,247,240,0.08)] transition-transform duration-300"
              style={{ transform: `rotateX(${tilt.y * -4}deg) rotateY(${tilt.x * 4}deg)` }}
            />
            <div aria-hidden="true" className="absolute inset-x-0 top-16 h-20 overflow-hidden opacity-40">
              <div className="h-full w-[60%] bg-[linear-gradient(90deg,transparent,rgba(255,228,92,0.16),transparent)] animate-[scan_3.6s_linear_infinite]" />
            </div>

            <RobotModelViewer
              alt={`${data.systemCard.title} - robot humanoid AROC_PL`}
              className="relative z-10 mx-auto max-w-[600px] drop-shadow-[0_34px_90px_rgba(0,0,0,0.72)] transition-transform duration-300"
              modelSrc={data.robotModel}
              posterSrc={data.robotImage}
              priority
              style={{
                transform: `translate3d(${tilt.x * -16}px, ${tilt.y * -10}px, 0) rotateY(${tilt.x * 5}deg) rotateX(${tilt.y * -3}deg)`,
              }}
            />

            <div className="absolute left-4 top-4 z-20 rounded-2xl border border-[rgba(255,228,92,0.28)] bg-[rgba(5,8,22,0.68)] p-4 backdrop-blur-xl sm:left-6 sm:top-6">
              <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">
                {data.statusLabel}
              </div>
              <div className="mt-1 font-display text-[1.65rem] font-black uppercase leading-none text-[var(--cream)]">
                {data.statusValue}
              </div>
            </div>

            <div className="absolute bottom-5 right-4 z-20 w-[13rem] rounded-2xl border border-[rgba(248,247,240,0.14)] bg-[rgba(5,8,22,0.72)] p-4 backdrop-blur-xl sm:bottom-8 sm:right-7">
              <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">
                {data.systemCard.label}
              </div>
              <div className="mt-1 font-display text-[1.45rem] font-black uppercase leading-none text-[var(--cream)]">
                {data.systemCard.title}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {data.systemCard.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="numeral text-[1.25rem] leading-none text-[var(--yellow)]">{metric.value}</div>
                    <div className="mt-1 font-mono text-[0.52rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.52)]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 overflow-hidden border-y border-[rgba(248,247,240,0.12)] bg-[var(--yellow)] py-5 text-[var(--navy-deep)]">
        <div className="flex w-[200%] animate-[marquee_24s_linear_infinite] gap-8 whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, index) => (
            <span className="font-display text-[clamp(2.6rem,7vw,5rem)] font-black uppercase leading-none tracking-[-0.04em]" key={`${word}-${index}`}>
              {word} /
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
