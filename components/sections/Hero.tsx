"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { HeroData } from "@/data/aroc";
import { CountNumber } from "@/components/shared/CountNumber";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { SponsorMarquee } from "@/components/shared/SponsorMarquee";
import { ArrowRightIcon, TrophyIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type HeroProps = {
  data: HeroData;
};

const supportWords = [
  "POLITEKNIK NEGERI MALANG",
  "KRSBI HUMANOID",
  "KRI 2024 CHAMPION",
  "ROBOSOCCER INDONESIA",
  "YOUR LOGO HERE",
  "POLINEMA ROBOTICS",
];

export function Hero({ data }: HeroProps) {
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal({
    threshold: 0.1,
  });
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal({
    threshold: 0.1,
  });

  // Mouse parallax on robot
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;
    const onMove = (e: MouseEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / rect.width;
      const ny = (e.clientY - cy) / rect.height;
      setTilt({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Headline character-by-character reveal
  const line1 = "Kami bangun robot";
  const line2Words = [
    { text: "yang", italic: false },
    { text: "menang.", italic: true },
  ];

  return (
    <section className="surface-ink relative overflow-hidden" id="top">
      {/* Ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%, rgba(201,162,75,0.18), transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(165,42,42,0.08), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(245,241,232,1) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28 lg:pt-24">
        {/* Left: headline + proof + CTA */}
        <div
          ref={leftRef}
          className={`reveal-base reveal-up relative z-10 ${leftVisible ? "revealed" : ""}`}
        >
          <div className="champ-badge">
            <TrophyIcon className="size-4" />
            <span>Juara Nasional &middot; KRI 2024</span>
          </div>

          <h1 className="headline mt-8 text-[clamp(2.8rem,7.5vw,5.4rem)] text-[var(--paper)]">
            <span className="block">
              {line1.split(" ").map((word, wi) => (
                <span
                  key={wi}
                  className="mr-[0.28em] inline-block"
                  aria-hidden={false}
                >
                  {word.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className={`inline-block ${leftVisible ? "animate-[letterRise_0.7s_cubic-bezier(0.22,1,0.36,1)_both]" : "opacity-0"}`}
                      style={{
                        animationDelay: `${(wi * 4 + ci) * 0.03}s`,
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </span>
            <span className="block">
              {line2Words.map((w, i) => (
                <span
                  key={i}
                  className={`mr-[0.28em] inline-block ${w.italic ? "headline-italic-on-ink" : ""}`}
                >
                  {w.text.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className={`inline-block ${leftVisible ? "animate-[letterRise_0.7s_cubic-bezier(0.22,1,0.36,1)_both]" : "opacity-0"}`}
                      style={{
                        animationDelay: `${(line1.length + i * 8 + ci) * 0.03 + 0.1}s`,
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-7 max-w-[34rem] text-[1.05rem] leading-[1.8] text-[rgba(245,241,232,0.78)] sm:text-[1.12rem]">
            AROC_PL adalah tim robotik humanoid{" "}
            <span className="text-[var(--paper)]">
              Politeknik Negeri Malang
            </span>
            . Tiga angkatan, satu lab, dan koleksi piala sebagai bukti kerja —
            merakit masa depan sepak bola robot dengan presisi hardware,
            kecerdasan di lapangan, dan kerja tim tanpa henti.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#team" className="btn-gold">
              Kenali Tim Kami
              <ArrowRightIcon className="size-5" />
            </MagneticButton>
            <Link className="btn-ghost-paper" href="#sponsor">
              Jadi Sponsor Kami
            </Link>
          </div>

          {/* Animated proof strip */}
          <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-[rgba(245,241,232,0.14)] pt-8">
            <div>
              <div className="numeral text-[2.4rem] leading-none text-[var(--gold-bright)]">
                <CountNumber end={11} suffix="+" />
              </div>
              <div className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[rgba(245,241,232,0.62)]">
                Engineer Aktif
              </div>
            </div>
            <div>
              <div className="numeral text-[2.4rem] leading-none text-[var(--gold-bright)]">
                <CountNumber end={3} />
              </div>
              <div className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[rgba(245,241,232,0.62)]">
                Robot Bertanding
              </div>
            </div>
            <div>
              <div className="numeral text-[2.4rem] leading-none text-[var(--gold-bright)]">
                <CountNumber end={4} suffix="x" />
              </div>
              <div className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[rgba(245,241,232,0.62)]">
                Podium Nasional
              </div>
            </div>
          </div>
        </div>

        {/* Right: robot portrait with parallax */}
        <div
          ref={rightRef}
          className={`reveal-base reveal-right relative mx-auto w-full max-w-[540px] ${rightVisible ? "revealed" : ""}`}
        >
          <div
            ref={stageRef}
            className="relative"
            style={{ perspective: "1200px" }}
          >
            <div
              aria-hidden
              className="absolute inset-x-[8%] top-[14%] h-[58%] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.26),rgba(201,162,75,0.08)_38%,transparent_70%)] blur-3xl transition-transform duration-300"
              style={{
                transform: `translate3d(${tilt.x * 20}px, ${tilt.y * 14}px, 0)`,
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-24 top-6 rounded-[0.5rem] border border-[rgba(201,162,75,0.18)] transition-transform duration-300"
              style={{
                transform: `rotateX(${tilt.y * -4}deg) rotateY(${tilt.x * 4}deg)`,
              }}
            />
            <Image
              alt={`${data.systemCard.title} — robot humanoid AROC_PL`}
              className="relative z-10 mx-auto h-auto w-full max-w-[540px] drop-shadow-[0_30px_80px_rgba(0,0,0,0.55)] transition-transform duration-300"
              height={980}
              priority
              sizes="(max-width: 1024px) 90vw, 540px"
              src={data.robotImage}
              width={640}
              style={{
                transform: `translate3d(${tilt.x * -14}px, ${tilt.y * -8}px, 0) rotateY(${tilt.x * 4}deg) rotateX(${tilt.y * -3}deg)`,
              }}
            />
          </div>

          <div className="relative z-10 mx-auto mt-2 max-w-[26rem] border-t border-[rgba(201,162,75,0.35)] pt-4 text-center">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--gold-bright)]">
              Spesimen Armada &middot; {data.systemCard.title}
            </div>
            <div className="mt-2 font-serif text-[1.05rem] italic text-[rgba(245,241,232,0.82)]">
              &ldquo;Kecerdasan fisik seorang juara.&rdquo;
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling sponsor marquee */}
      <div className="relative border-y border-[rgba(245,241,232,0.12)] bg-[var(--ink-deep)]/60 py-6">
        <SponsorMarquee items={supportWords} />
      </div>

      <style>{`
        @keyframes letterRise {
          from { opacity: 0; transform: translateY(0.5em); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
