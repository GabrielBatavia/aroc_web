"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

import {
  ArocGeneratedMark,
  CircuitPath,
  DoodleArrow,
  SensorCone,
  SoccerPath,
} from "@/components/shared/BrandAssets";
import { ChapterRail } from "@/components/shared/ChapterRail";
import {
  ArrowRightIcon,
  BoltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CodeIcon,
  CpuIcon,
  EyeIcon,
  PlayIcon,
  RadioIcon,
  ShieldIcon,
  StarIcon,
  TrophyIcon,
} from "@/components/shared/Icons";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { DivisionGallery } from "@/components/sections/DivisionGallery";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type {
  AboutCard,
  Achievement,
  DivisionCard,
  GalleryItem,
  HeroData,
  RobotCard,
  TeamLead,
  TeamStat,
  TeamYear,
  ValueCard,
} from "@/data/aroc";

/* ===================================================================
   Types
   =================================================================== */

type HomeCampaignProps = {
  hero: HeroData;
  achievements: Achievement[];
  aboutCards: AboutCard[];
  values: ValueCard[];
  divisions: DivisionCard[];
  robots: RobotCard[];
  gallery: GalleryItem[];
  teamLead: TeamLead;
  teamStats: TeamStat[];
  teamYears: TeamYear[];
};

/* ===================================================================
   Static campaign data
   =================================================================== */

const storySteps = [
  {
    kicker: "01 / Frame",
    title: "Rangka humanoid yang dirancang untuk pengujian berulang.",
    body: "Hardware AROC_PL dikembangkan untuk kebutuhan pertandingan: ketahanan struktur, pemulihan gerak, servis cepat, dan iterasi di setiap sesi uji.",
    icon: CpuIcon,
    accentColor: "rgba(255, 228, 92, 0.9)",
  },
  {
    kicker: "02 / Vision",
    title: "Kamera membaca bola, garis, dan gawang.",
    body: "Pipeline persepsi memberi robot konteks lapangan agar keputusan dapat digunakan secara konsisten di arena.",
    icon: EyeIcon,
    accentColor: "rgba(255, 228, 92, 0.9)",
  },
  {
    kicker: "03 / Control",
    title: "Gerak humanoid dikunci oleh kontrol embedded.",
    body: "Motor, sensor, daya, dan komputasi onboard disatukan agar robot tetap stabil saat mengejar bola.",
    icon: RadioIcon,
    accentColor: "rgba(255, 228, 92, 0.9)",
  },
  {
    kicker: "04 / Strategy",
    title: "Satu sistem, tiga peran, keputusan terarah.",
    body: "Penyerang, kiper, dan bek menjalankan perilaku berbeda sesuai strategi pertandingan robot humanoid.",
    icon: CodeIcon,
    accentColor: "rgba(255, 228, 92, 0.9)",
  },
  {
    kicker: "05 / Competition",
    title: "Dikembangkan dan dipertandingkan di ajang bergengsi.",
    body: "Setiap sistem diuji melalui sesi pengembangan, evaluasi teknis, dan kompetisi robot humanoid.",
    icon: TrophyIcon,
    accentColor: "rgba(255, 228, 92, 0.9)",
  },
];

const benefitClaims = [
  { title: "Vision Otonom", body: "Deteksi bola, gawang, dan lapangan sebagai dasar pengambilan keputusan robot.", icon: EyeIcon },
  { title: "Lokomosi Stabil", body: "Kontrol gerak humanoid untuk posisi berdiri, pemulihan, dan transisi saat bertanding.", icon: BoltIcon },
  { title: "Kontrol Embedded", body: "Koordinasi sensor, aktuator, motor driver, dan sistem daya onboard.", icon: CpuIcon },
  { title: "Strategi Pertandingan", body: "Perilaku berbasis peran untuk menyerang, bertahan, menjaga area, dan kembali ke posisi.", icon: ShieldIcon },
];

type ComparisonStatus = true | false | "partial";

const comparisonRows: { capability: string; aroc: ComparisonStatus; generic: ComparisonStatus }[] = [
  { capability: "Sistem teruji KRI", aroc: true, generic: false },
  { capability: "Peran sepak bola humanoid", aroc: true, generic: "partial" },
  { capability: "Pipeline vision", aroc: true, generic: "partial" },
  { capability: "Integrasi hardware dan software", aroc: true, generic: false },
  { capability: "Iterasi dalam tekanan kompetisi", aroc: true, generic: false },
  { capability: "Materi kemitraan yang terukur", aroc: true, generic: false },
];

const videoSlots = [
  "Dokumentasi pertandingan",
  "Proses pengembangan di lab",
  "Sesi pengujian robot",
];

const campaignChapters = [
  { id: "top", label: "Hero" },
  { id: "about", label: "About" },
  { id: "story", label: "Story" },
  { id: "technology", label: "Tech" },
  { id: "robots", label: "Robots" },
  { id: "team", label: "Proof" },
  { id: "gallery", label: "Gallery" },
  { id: "sponsor", label: "Sponsor" },
];

/* ===================================================================
   Tiny mark components for the comparison table
   =================================================================== */

function CheckMark() {
  return (
    <svg aria-hidden="true" className="mx-auto size-7" fill="none" viewBox="0 0 28 28">
      <circle cx="14" cy="14" fill="#FFE45C" r="13" />
      <path d="m9 14 3.5 3.5L19 11" stroke="#070C22" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

function CrossMark() {
  return (
    <svg aria-hidden="true" className="mx-auto size-7" fill="none" viewBox="0 0 28 28">
      <circle cx="14" cy="14" fill="#D9DDE8" r="13" />
      <path d="m10.5 10.5 7 7M17.5 10.5l-7 7" stroke="#9AA5BD" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function PartialMark() {
  return (
    <svg aria-hidden="true" className="mx-auto size-7" fill="none" viewBox="0 0 28 28">
      <circle cx="14" cy="14" fill="#D9DDE8" r="13" />
      <path d="M9 14h10" stroke="#9AA5BD" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function StatusMark({ status }: { status: ComparisonStatus }) {
  if (status === true) return <CheckMark />;
  if (status === "partial") return <PartialMark />;
  return <CrossMark />;
}

/* ===================================================================
   1. Loader / entry atmosphere
   =================================================================== */

function CampaignLoader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    return "visible";
  });

  useEffect(() => {
    if (phase === "done") return;
    const t1 = setTimeout(() => setPhase("fading"), 200);
    const t2 = setTimeout(() => setPhase("done"), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-700 ${phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100"}`}
      style={{ background: "var(--navy-abyss)" }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(255,228,92,0.08) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="relative flex flex-col items-center gap-6">
        <span className="flex size-20 items-center justify-center rounded-full bg-[var(--yellow)] p-2 shadow-[0_0_0_8px_rgba(255,228,92,0.12),0_0_0_20px_rgba(255,228,92,0.04)]">
          <ArocGeneratedMark className="size-full" />
        </span>
        <div className="h-0.5 w-16 overflow-hidden rounded-full bg-[rgba(255,228,92,0.2)]">
          <div className="h-full w-1/3 rounded-full bg-[var(--yellow)]" style={{ animation: "scan 1.2s ease-in-out infinite" }} />
        </div>
      </div>
    </div>
  );
}

/* ===================================================================
   2. Hero — cinematic, robot-first
   =================================================================== */

function CampaignHero({ hero }: { hero: HeroData }) {
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

  const heroFacts = [
    { value: "2024", label: "Juara KRI" },
    { value: "11+", label: "Personel" },
    { value: "3", label: "Unit Robot" },
  ];

  const hudLabels = [
    { text: "Vision Terkunci", style: { top: "28%", left: "54%"  } },
    { text: "Siap Bertanding",   style: { top: "44%", right: "3%"  } },
    { text: "KRI 2024 ★",   style: { top: "68%", left: "50%"  } },
    { text: "Otonom",    style: { top: "76%", right: "5%"  } },
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      id="top"
      ref={stageRef}
      onPointerMove={(e) => {
        if (!canMove) return;
        const rect = stageRef.current?.getBoundingClientRect();
        if (!rect) return;
        setTilt({
          x: (e.clientX - (rect.left + rect.width / 2)) / rect.width,
          y: (e.clientY - (rect.top + rect.height / 2)) / rect.height,
        });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* ── Cinematic video-like hero background ── */}

      {/* Slide A — cinematic image with Ken Burns + crossfade */}
      <div
        aria-hidden="true"
        className="hero-cinematic-slide hero-cinematic-slide--a"
        style={{
          transition: "transform 0.9s var(--ease-luxury)",
        }}
      >
        <Image
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          src="/images/hero-integrated.png"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* Slide B — second cinematic image, crossfades with A */}
      <div
        aria-hidden="true"
        className="hero-cinematic-slide hero-cinematic-slide--b"
      >
        <Image
          alt=""
          fill
          quality={92}
          sizes="100vw"
          src="/images/hero-cinematic-1.png"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* Slide C — third cinematic angle, completes the video cycle */}
      <div
        aria-hidden="true"
        className="hero-cinematic-slide hero-cinematic-slide--c"
      >
        <Image
          alt=""
          fill
          quality={92}
          sizes="100vw"
          src="/images/hero-cinematic-2.png"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* Volumetric light rays */}
      <div aria-hidden="true" className="hero-volumetric-ray" />

      {/* Film grain overlay */}
      <div aria-hidden="true" className="hero-film-grain" />

      {/* Floating particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { left: "15%", top: "30%", size: "3px", driftX: "80px", driftY: "-150px", duration: "7s", delay: "0s", color: "rgba(255,228,92,0.8)" },
          { left: "70%", top: "50%", size: "2px", driftX: "-60px", driftY: "-100px", duration: "8s", delay: "1.2s", color: "rgba(255,228,92,0.6)" },
          { left: "45%", top: "70%", size: "4px", driftX: "40px", driftY: "-180px", duration: "9s", delay: "2.5s", color: "rgba(255,228,92,0.7)" },
          { left: "80%", top: "25%", size: "2px", driftX: "-90px", driftY: "-120px", duration: "6s", delay: "0.8s", color: "rgba(248,247,240,0.5)" },
          { left: "30%", top: "60%", size: "3px", driftX: "50px", driftY: "-140px", duration: "10s", delay: "3s", color: "rgba(255,228,92,0.5)" },
          { left: "55%", top: "40%", size: "2px", driftX: "-30px", driftY: "-160px", duration: "7.5s", delay: "1.8s", color: "rgba(248,247,240,0.4)" },
          { left: "88%", top: "65%", size: "3px", driftX: "-70px", driftY: "-110px", duration: "8.5s", delay: "4s", color: "rgba(255,228,92,0.6)" },
          { left: "10%", top: "80%", size: "2px", driftX: "100px", driftY: "-90px", duration: "11s", delay: "2s", color: "rgba(255,228,92,0.4)" },
        ].map((p, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              left: p.left,
              top: p.top,
              "--size": p.size,
              "--drift-x": p.driftX,
              "--drift-y": p.driftY,
              "--duration": p.duration,
              "--delay": p.delay,
              "--color": p.color,
            } as CSSProperties}
          />
        ))}
      </div>

      {/* Breathing glow behind robot area */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: "10%",
          right: "5%",
          width: "50%",
          height: "70%",
          background: "radial-gradient(ellipse at center, rgba(255,228,92,0.12), transparent 65%)",
          animation: "heroGlowBreathe 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── Left gradient veil — keeps text readable ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(5,8,22,0.97) 0%,
              rgba(5,8,22,0.92) 22%,
              rgba(5,8,22,0.72) 38%,
              rgba(5,8,22,0.3) 52%,
              transparent 68%
            )
          `,
        }}
      />

      {/* ── Bottom vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to top, rgba(5,8,22,0.85), transparent)",
        }}
      />

      {/* ── Top vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(to bottom, rgba(5,8,22,0.7), transparent)",
        }}
      />

      {/* ── Dot-grid overlay — left third only ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(255,228,92,0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to right, black 0%, black 30%, transparent 55%)",
        }}
      />

      {/* ── Animated scan line ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-transparent via-[rgba(255,228,92,0.6)] to-transparent"
          style={{ width: "40%", animation: "scan 5s ease-in-out infinite" }}
        />
      </div>

      {/* ── HUD floating labels — right side (desktop only) ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        {hudLabels.map((l, i) => (
          <div
            key={l.text}
            className="absolute"
            style={l.style}
          >
            <span
              className="float-y-slow inline-block rounded-full border border-[rgba(255,228,92,0.35)] bg-[rgba(5,8,22,0.78)] px-3 py-1.5 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--yellow)] shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              {l.text}
            </span>
          </div>
        ))}

        {/* Scanning ring around robot — positioned right-center */}
        <div
          className="absolute rounded-full border border-dashed border-[rgba(255,228,92,0.2)]"
          style={{
            top: "15%", right: "8%",
            width: "42%", paddingTop: "42%",
            animation: "rotateSlow 28s linear infinite",
          }}
        />
        <div
          className="absolute rounded-full border border-[rgba(255,228,92,0.1)]"
          style={{
            top: "22%", right: "13%",
            width: "30%", paddingTop: "30%",
            animation: "rotateSlow 18s linear infinite reverse",
          }}
        />

        {/* Small crosshair at ball position */}
        <div
          className="absolute"
          style={{ bottom: "22%", left: "60%" }}
        >
          <svg aria-hidden="true" fill="none" viewBox="0 0 40 40" width="40">
            <circle cx="20" cy="20" r="7" stroke="rgba(255,228,92,0.5)" strokeWidth="1" />
            <line stroke="rgba(255,228,92,0.4)" strokeWidth="1" x1="20" x2="20" y1="0" y2="12" />
            <line stroke="rgba(255,228,92,0.4)" strokeWidth="1" x1="20" x2="20" y1="28" y2="40" />
            <line stroke="rgba(255,228,92,0.4)" strokeWidth="1" x1="0" x2="12" y1="20" y2="20" />
            <line stroke="rgba(255,228,92,0.4)" strokeWidth="1" x1="28" x2="40" y1="20" y2="20" />
          </svg>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex min-h-screen flex-col pt-24 sm:pt-28">

        {/* Top bar */}
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
          <div className="flex items-center justify-between">
            <div className="champ-badge hero-sequence" style={{ "--sequence-delay": "0.1s" } as CSSProperties}>
              <TrophyIcon className="size-4" />
              <span>KRI Humanoid Champion 2024</span>
            </div>
            <div className="hero-sequence hidden items-center gap-2 sm:flex" style={{ "--sequence-delay": "0.24s" } as CSSProperties}>
              <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[var(--yellow)] opacity-75" />
              <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.22em] text-[rgba(248,247,240,0.55)]">
                Sistem Aktif
              </span>
            </div>
          </div>
        </div>

        {/* Headline area — left side only */}
        <div className="mx-auto mt-8 w-full max-w-[1320px] flex-1 px-4 sm:px-8">
          <div className="flex flex-col max-w-[44rem] lg:max-w-[46%]">

            {/* Giant headline */}
            <h1
              className="hero-wordmark"
              style={{ fontSize: "clamp(4.5rem, 12vw, 10rem)" }}
            >
              <span className="hero-sequence-word block" style={{ "--sequence-delay": "0.26s" } as CSSProperties}>Humanoid</span>
              <span
                className="hero-sequence-word block"
                style={{
                  "--sequence-delay": "0.38s",
                  color: "var(--yellow)",
                   textShadow: "0.04em 0.06em 0 var(--navy-black)",
                   transform: `translate3d(${tilt.x * -6}px, 0, 0)`,
                   display: "inline-block",
                   transition: "transform 0.75s var(--ease-luxury)",
                 } as CSSProperties}
              >
                Robot
              </span>
              <span className="hero-sequence-word block" style={{ "--sequence-delay": "0.5s" } as CSSProperties}>Soccer</span>
              <span
                className="hero-sequence-word block"
                style={{ "--sequence-delay": "0.62s", fontSize: "0.52em", letterSpacing: "-0.03em", color: "rgba(248,247,240,0.45)", lineHeight: 1.1 } as CSSProperties}
              >
                Team.
              </span>
            </h1>

            {/* Rule */}
            <div className="hero-sequence mt-5 flex items-center gap-4" style={{ "--sequence-delay": "0.76s" } as CSSProperties}>
              <div className="h-px w-12 bg-gradient-to-r from-[rgba(255,228,92,0.6)] to-transparent" />
              <span className="font-mono text-[0.58rem] font-black uppercase tracking-[0.22em] text-[rgba(248,247,240,0.38)]">
                AROC_PL · Polinema
              </span>
            </div>

            {/* Description */}
            <p className="hero-sequence mt-5 max-w-[28rem] text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.68)] sm:text-[1.05rem]" style={{ "--sequence-delay": "0.86s" } as CSSProperties}>
              {hero.description}
            </p>

            {/* CTA */}
            <div className="hero-sequence mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--sequence-delay": "0.96s" } as CSSProperties}>
              <MagneticButton className="btn-gold luxury-shimmer" href="#robots">
                Lihat Robot
                <ArrowRightIcon className="size-5" />
              </MagneticButton>
              <Link className="btn-ghost-paper luxury-shimmer" href="#story">
                Cara Kerja
              </Link>
            </div>

            {/* Quick stats */}
            <div className="hero-sequence mt-10 flex items-center gap-3" style={{ "--sequence-delay": "1.08s" } as CSSProperties}>
              {heroFacts.map((fact) => (
                <div key={fact.label} className="stat-pill luxury-surface">
                  <span className="numeral text-[1.55rem] leading-none text-[var(--yellow)]">
                    {fact.value}
                  </span>
                  <span className="font-mono text-[0.53rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.44)]">
                    {fact.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[0.52rem] font-black uppercase tracking-[0.2em] text-[rgba(248,247,240,0.3)]">
            Scroll
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[rgba(248,247,240,0.16)] pt-1.5">
            <div
              className="h-2 w-0.5 rounded-full bg-[var(--yellow)]"
              style={{ animation: "floatY 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


/* ===================================================================
   3. Yellow marquee tape
   =================================================================== */

function CurvedMarquee() {
  const words = ["AROC_PL", "Humanoid Soccer", "Juara KRI 2024", "Polinema", "Robot Humanoid", "Development Team"];
  return (
    <section
      aria-label="Marquee"
      className="relative overflow-hidden bg-[var(--yellow)] py-5 text-[var(--navy-deep)]"
      style={{
        /* Top shadow makes the hard cut from dark hero feel intentional — like a stamp */
        boxShadow: "inset 0 6px 24px rgba(3,6,16,0.18)",
        borderTop: "1px solid rgba(3,6,16,0.1)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1]"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #070c22 1.2px, transparent 0)", backgroundSize: "18px 18px" }}
      />
      <div className="relative flex w-[200%] gap-0" style={{ animation: "marquee 30s linear infinite" }}>
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0 items-center gap-8 pr-8" style={{ width: "50%" }}>
            {words.map((w) => (
              <span
                key={w}
                className="shrink-0 font-display font-black uppercase"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
              >
                {w} <span className="mx-1 text-[0.7em] opacity-35">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      {/* Bottom shadow into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-4"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(240,235,210,0.3))" }}
      />
    </section>
  );
}

/* ===================================================================
   4. Editorial manifesto — full-bleed statement
   =================================================================== */

function EditorialManifesto({ aboutCards, values }: { aboutCards: AboutCard[]; values: ValueCard[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative section-paper overflow-hidden" id="about">
      <div aria-hidden="true" className="dot-grid-paper absolute inset-0" />

      {/* Giant background word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2%] top-[5%] select-none font-display font-black uppercase leading-none text-[var(--navy-deep)] opacity-[0.03]"
        style={{ fontSize: "clamp(8rem, 28vw, 22rem)", letterSpacing: "-0.06em" }}
      >
        AROC
      </div>

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-32 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        {/* Oversize statement headline */}
        <div className="kicker mb-8">Profil Pengembangan</div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:items-start">
          <div>
            <h2
              className="headline text-[var(--navy-deep)]"
              style={{ fontSize: "clamp(3.4rem, 10vw, 8rem)", lineHeight: 0.88 }}
            >
              Dikembangkan dan{" "}
              <span
                className="inline-block"
                style={{
                  color: "var(--gold-deep)",
                  WebkitTextStroke: "1px var(--gold-deep)",
                  textShadow: "none",
                }}
              >
                dipertandingkan
              </span>
              <br />
              di ajang
              <br />
              <span style={{ color: "var(--navy-bright)" }}>bergengsi.</span>
            </h2>

            {/* Value tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              {values.map((v) => (
                <span
                  className="rounded-full border border-[rgba(7,12,34,0.14)] bg-[var(--navy-deep)] px-4 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--yellow)]"
                  key={v.title}
                >
                  {v.title}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Manifesto quote block */}
            <div className="rounded-[2rem] bg-[var(--navy-deep)] p-7 text-[var(--cream)]">
              <div className="font-mono text-[0.6rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)] mb-4">
                — Misi Kami
              </div>
              <p className="text-[1.05rem] leading-[1.9] text-[rgba(248,247,240,0.78)]">
                AROC_PL adalah Development Team robot humanoid Politeknik Negeri Malang yang mengintegrasikan hardware, software, dan strategi pertandingan. Fokus kami adalah menghasilkan sistem robot yang siap diuji, dievaluasi, dan dipertandingkan pada ajang robotik bergengsi.
              </p>
            </div>

            {/* About cards stacked */}
            <div className="grid gap-4">
              {aboutCards.map((card, i) => (
                <article
                  className="card-paper card-hover-lift flex items-start gap-5 rounded-[1.4rem] p-5"
                  key={card.title}
                >
                  <div
                    className="numeral mt-0.5 shrink-0 leading-none text-[var(--gold-deep)]"
                    style={{ fontSize: "2rem" }}
                  >
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.35rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-[1.75] text-[var(--muted-dark)]">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   5. Sticky scroll robot story
   =================================================================== */

function StickyScrollStory({ hero }: { hero: HeroData }) {
  const [activeStep, setActiveStep] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = panels.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveStep(idx);
          }
        }
      },
      { threshold: 0.45, rootMargin: "-12% 0px -38% 0px" },
    );
    for (const p of panels) observer.observe(p);
    return () => observer.disconnect();
  }, []);

  const overlays: Record<number, React.ReactNode> = {
    0: <CircuitPath className="absolute inset-x-6 top-[10%] text-[rgba(255,228,92,0.25)]" />,
    1: <SensorCone className="absolute right-4 top-[8%] w-44 text-[rgba(255,228,92,0.35)]" />,
    2: <CircuitPath className="absolute inset-x-6 bottom-[15%] rotate-180 text-[rgba(255,228,92,0.2)]" />,
    3: <SoccerPath className="absolute inset-x-4 bottom-[10%] text-[rgba(255,228,92,0.3)]" />,
  };

  // Progress bar percentage
  const progress = ((activeStep + 1) / storySteps.length) * 100;

  return (
    <section className="relative bg-[var(--navy-deep)]" id="story">
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,228,92,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,228,92,0.04) 1px, transparent 1px)",
          backgroundSize: "5rem 5rem",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      {/* Progress bar — top of section */}
      <div className="sticky top-0 z-30 h-0.5 w-full bg-[rgba(255,228,92,0.1)]">
        <div
          className="h-full bg-[var(--yellow)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* ── Sticky visual ── */}
          <div className="hidden lg:block">
            <div className="sticky top-4 flex h-screen items-center py-12">
              <div className="relative w-full">
                <div className="luxury-surface soft-glow relative aspect-[3/4] overflow-hidden rounded-[2.4rem] border border-[rgba(255,228,92,0.16)] bg-[rgba(12,18,45,0.7)]">
                  <Image
                    alt="AROC_PL robot"
                    className="object-contain drop-shadow-[0_34px_80px_rgba(0,0,0,0.7)]"
                    fill
                    sizes="520px"
                    src={hero.robotImage}
                  />
                  {storySteps.map((_, i) => (
                    <div
                      className={`absolute inset-0 transition-opacity duration-600 ${i === activeStep ? "opacity-100" : "opacity-0"}`}
                      key={i}
                    >
                      {overlays[i] ?? null}
                    </div>
                  ))}
                  {activeStep === 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[rgba(5,8,22,0.4)]">
                      <div className="rounded-full bg-[var(--yellow)] p-6 shadow-[0_0_0_16px_rgba(255,228,92,0.1),0_0_0_32px_rgba(255,228,92,0.05)]">
                        <TrophyIcon className="size-12 text-[var(--navy-deep)]" />
                      </div>
                    </div>
                  )}
                  {/* Step label */}
                  <div className="absolute bottom-5 left-5 z-10 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--navy-deep)] transition-all duration-300">
                    {storySteps[activeStep]?.kicker ?? ""}
                  </div>
                </div>

                {/* Step dots — vertical */}
                <div className="absolute -right-10 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
                  {storySteps.map((_, i) => (
                    <button
                      aria-label={`Step ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${i === activeStep ? "h-8 w-3 bg-[var(--yellow)]" : "size-3 bg-[rgba(248,247,240,0.18)] hover:bg-[rgba(248,247,240,0.38)]"}`}
                      key={i}
                      onClick={() => panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Scrolling panels ── */}
          <div>
            <div className="pb-8 pt-20 lg:pt-[38vh]">
              <div className="kicker kicker-on-ink">Proses Pengembangan</div>
              <h2
                className="headline mt-5 text-[var(--cream)]"
                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
              >
                Dari lab menuju<br />arena kompetisi.
              </h2>
            </div>

            {/* Mobile robot image */}
            <div className="relative mb-8 aspect-[3/4] max-h-[28rem] overflow-hidden rounded-[2rem] border border-[rgba(255,228,92,0.16)] bg-[rgba(12,18,45,0.7)] lg:hidden">
              <Image
                alt="AROC_PL robot"
                className="object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.7)]"
                fill
                sizes="90vw"
                src={hero.robotImage}
              />
            </div>

            {storySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.kicker}
                  ref={(el) => { panelRefs.current[i] = el; }}
                  className="flex items-center py-14 lg:min-h-screen lg:py-0"
                >
                  <div
                    className={`max-w-[38rem] transition-all duration-500 ${i === activeStep ? "opacity-100 translate-x-0" : "lg:opacity-25 lg:translate-x-4"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-[var(--navy-deep)]"
                        style={{ background: i === activeStep ? "var(--yellow)" : "rgba(255,228,92,0.15)", transition: "background 0.4s ease" }}
                      >
                        <Icon className="size-6" style={{ color: i === activeStep ? "var(--navy-deep)" : "var(--yellow)" }} />
                      </div>
                      <div className="font-mono text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">
                        {step.kicker}
                      </div>
                    </div>
                    <h3
                      className="mt-6 font-display font-black uppercase leading-[0.86] tracking-[-0.04em] text-[var(--cream)]"
                      style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-6 text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.62)]">{step.body}</p>

                    {/* Step counter */}
                    <div className="mt-8 flex items-center gap-3">
                      <div className="h-px flex-none w-8 bg-[rgba(255,228,92,0.4)]" />
                      <span className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.3)]">
                        {i + 1} / {storySteps.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div aria-hidden="true" className="h-[20vh] lg:h-[30vh]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   6. Benefits — horizontal split, not card grid
   =================================================================== */

function BenefitsClaims({ divisions }: { divisions: DivisionCard[] }) {
  const { ref, isVisible } = useScrollReveal();
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="relative section-paper-warm overflow-hidden" id="technology">
      <div aria-hidden="true" className="dot-grid-paper absolute inset-0" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-32 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        {/* Section header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="kicker">Kapabilitas Inti</div>
            <h2
              className="headline mt-4 text-[var(--navy-deep)]"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              Kontrol terukur.<br />Keputusan terarah.
            </h2>
          </div>
          <p className="max-w-[26rem] pb-2 text-[1rem] leading-[1.85] text-[var(--muted-dark)] sm:text-right">
            Dua divisi, satu misi: robot siap tanding.
          </p>
        </div>

        {/* Interactive feature selector */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          {/* Left: feature list */}
          <div className="flex flex-col gap-3">
            {benefitClaims.map((c, i) => {
              const Icon = c.icon;
              const isActive = i === activeFeature;
              return (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setActiveFeature(i)}
                  className={`luxury-surface group flex items-start gap-5 rounded-[1.6rem] border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[rgba(7,12,34,0.18)] bg-[var(--navy-deep)] text-[var(--cream)] shadow-[0_24px_60px_-36px_rgba(7,12,34,0.7)]"
                      : "border-[rgba(7,12,34,0.08)] bg-white/60 text-[var(--navy-deep)] hover:border-[rgba(7,12,34,0.14)] hover:bg-white/90"
                  }`}
                >
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isActive ? "bg-[var(--yellow)] text-[var(--navy-deep)]" : "bg-[var(--navy-deep)] text-[var(--yellow)]"
                    }`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`font-display text-[1.4rem] font-black uppercase leading-none tracking-[-0.03em] transition-colors duration-300 ${
                        isActive ? "text-[var(--cream)]" : "text-[var(--navy-deep)]"
                      }`}
                    >
                      {c.title}
                    </div>
                    <p
                      className={`mt-2 text-[0.88rem] leading-[1.7] transition-colors duration-300 ${
                        isActive ? "text-[rgba(248,247,240,0.65)]" : "text-[var(--muted-dark)]"
                      }`}
                    >
                      {c.body}
                    </p>
                  </div>
                  <div className={`ml-auto mt-1 shrink-0 font-mono text-[0.58rem] font-black uppercase tracking-[0.14em] transition-colors ${isActive ? "text-[var(--yellow)]" : "text-[var(--muted)]"}`}>
                    0{i + 1}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: division details */}
          <div className="sticky top-24 flex flex-col gap-5">
            {divisions.map((div) => (
              <div
                className="tech-card luxury-surface rounded-[2rem] p-6 sm:p-8"
                key={div.title}
              >
                <div className="kicker kicker-on-ink">{div.eyebrow}</div>
                <h3
                  className="headline mt-4 text-[var(--cream)]"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
                >
                  {div.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-[1.8] text-[rgba(248,247,240,0.62)]">{div.description}</p>
                <div className="mt-6 flex flex-col gap-3">
                  {div.items.map((item) => (
                    <div className="flex items-start gap-3" key={item.title}>
                      <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--yellow)]" />
                      <div>
                        <div className="font-mono text-[0.64rem] font-black uppercase tracking-[0.16em] text-[var(--yellow)]">
                          {item.title}
                        </div>
                        <div className="mt-0.5 text-[0.85rem] leading-[1.6] text-[rgba(248,247,240,0.55)]">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   7. Robot lineup — full attention on the machines
   =================================================================== */

function RobotLineupSlider({ robots }: { robots: RobotCard[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = robots[activeIndex] ?? robots[0];
  const { ref, isVisible } = useScrollReveal();

  if (!active) return null;

  const go = (d: number) => setActiveIndex((c) => (c + d + robots.length) % robots.length);

  return (
    <section className="relative overflow-hidden scroll-mt-24 bg-[var(--navy-deep)]" id="robots">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255,228,92,0.1), transparent 60%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,228,92,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,228,92,0.04) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <div className="kicker kicker-on-ink">Unit Robot</div>
            <h2
              className="headline mt-4 text-[var(--cream)]"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              Pilih unit<br />robot.
            </h2>
          </div>
          <p className="max-w-[26rem] pb-2 text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.62)]">
            Tiga unit robot humanoid, masing-masing dengan peran spesifik.
          </p>
        </div>

        {/* Tab selector */}
        <div className="mb-8 flex gap-3">
          {robots.map((r, i) => (
            <button
              aria-label={`Pilih ${r.name}`}
              className={`luxury-chip rounded-full border px-5 py-2.5 font-mono text-[0.68rem] font-black uppercase tracking-[0.16em] transition-all duration-300 ${
                i === activeIndex
                  ? "border-[var(--yellow)] bg-[var(--yellow)] text-[var(--navy-deep)] shadow-[0_6px_0_var(--navy-black)]"
                  : "border-[rgba(248,247,240,0.18)] bg-[rgba(248,247,240,0.05)] text-[rgba(248,247,240,0.55)] hover:border-[rgba(255,228,92,0.36)] hover:text-[var(--yellow)]"
              }`}
              key={r.name}
              onClick={() => setActiveIndex(i)}
              type="button"
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Main robot display */}
        <div className="robot-cinematic-stage luxury-surface soft-glow grid gap-6 overflow-hidden rounded-[2.8rem] border border-[rgba(255,228,92,0.2)] bg-[rgba(10,15,38,0.7)] p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 z-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[rgba(255,228,92,0.16)] blur-3xl transition-[left,opacity] duration-700"
            style={{ left: `${28 + activeIndex * 18}%` }}
          />
          {/* Robot image */}
          <div className="luxury-image-frame relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(255,228,92,0.22),transparent_55%)] sm:min-h-[38rem]">
            {robots.map((r, i) => (
              <Image
                key={r.name}
                alt={`${r.name} robot`}
                className={`robot-cinematic-image luxury-image absolute inset-0 object-cover transition-all duration-600 ${i === activeIndex ? "is-active scale-100 opacity-100" : "scale-95 opacity-0"}`}
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                src={r.image}
              />
            ))}
            <div className="absolute left-4 top-4 z-10 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.64rem] font-black uppercase tracking-[0.18em] text-[var(--navy-deep)]">
              {active.role}
            </div>
          </div>

          {/* Active robot info */}
          <div className="robot-cinematic-info flex flex-col" key={active.name}>
            <div className="font-mono text-[0.68rem] font-black uppercase tracking-[0.22em] text-[rgba(255,228,92,0.5)]">
              Unit {String(activeIndex + 1).padStart(2, "0")}
            </div>
            <h3
              className="mt-2 font-display font-black uppercase leading-[0.78] tracking-[-0.06em] text-[var(--cream)]"
              style={{ fontSize: "clamp(4.5rem, 11vw, 8.5rem)" }}
            >
              {active.name}
            </h3>
            <p className="mt-5 text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.66)]">{active.description}</p>

            {/* Stats bars */}
            <div className="mt-8 grid gap-4">
              {active.stats.map((s, statIndex) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.5)]">
                      {s.label}
                    </span>
                    <span className="numeral text-[0.95rem] text-[var(--yellow)]">{s.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[rgba(248,247,240,0.08)]">
                    <div
                      className="robot-stat-fill h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${s.value}%`,
                        animationDelay: `${statIndex * 0.09}s`,
                        background: s.value > 85
                          ? "linear-gradient(90deg, var(--yellow), var(--gold))"
                          : "linear-gradient(90deg, rgba(255,228,92,0.6), rgba(255,228,92,0.3))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="mt-8 flex items-center gap-3">
              <button
                aria-label="Robot sebelumnya"
                className="luxury-chip flex size-12 items-center justify-center rounded-full border border-[rgba(248,247,240,0.16)] bg-[rgba(248,247,240,0.05)] text-[var(--cream)] transition hover:border-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)]"
                onClick={() => go(-1)}
                type="button"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                aria-label="Robot berikutnya"
                className="luxury-chip flex size-12 items-center justify-center rounded-full border border-[rgba(248,247,240,0.16)] bg-[rgba(248,247,240,0.05)] text-[var(--cream)] transition hover:border-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)]"
                onClick={() => go(1)}
                type="button"
              >
                <ChevronRightIcon className="size-5" />
              </button>
              <div className="ml-auto font-mono text-[0.58rem] font-black uppercase tracking-[0.2em] text-[rgba(248,247,240,0.3)]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(robots.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   8. Comparison — dark, dramatic, full-width
   =================================================================== */

function ComparisonTable() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative overflow-hidden bg-[var(--navy-abyss)]">
      {/* Dramatic top light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,228,92,0.5)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[60%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,228,92,0.12),transparent_70%)] blur-2xl"
      />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-[1120px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        <div className="text-center">
          <div className="kicker kicker-centered kicker-on-ink">Pembeda AROC_PL</div>
          <h2
            className="headline mx-auto mt-5 text-[var(--cream)]"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", maxWidth: "11ch" }}
          >
            Bukan sekadar prototipe.
          </h2>
        </div>

        <div
          className="mt-14 overflow-hidden rounded-[2.2rem] border border-[rgba(255,228,92,0.2)]"
          style={{ boxShadow: "0 0 0 1px rgba(255,228,92,0.06), 0 40px 100px -60px rgba(0,0,0,0.9)" }}
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_0.6fr_0.6fr] bg-[rgba(10,15,40,0.95)]">
            <div className="p-5 font-mono text-[0.7rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.4)]">
              Kapabilitas
            </div>
            <div
              className="p-5 text-center font-display font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)]"
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                background: "var(--yellow)",
                boxShadow: "0 4px 24px rgba(255,228,92,0.3)",
              }}
            >
              AROC_PL
            </div>
            <div
              className="p-5 text-center font-display font-black uppercase leading-none tracking-[-0.03em] text-[rgba(248,247,240,0.4)]"
              style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}
            >
              Prototipe Umum
            </div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, i) => (
            <div
              className="grid grid-cols-[1fr_0.6fr_0.6fr] border-t border-[rgba(255,228,92,0.08)]"
              key={row.capability}
              style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}
            >
              <div className="p-4 text-[0.92rem] font-semibold text-[rgba(248,247,240,0.7)] sm:p-5">
                {row.capability}
              </div>
              <div className="grid place-items-center bg-[rgba(255,228,92,0.06)] p-4 sm:p-5">
                <StatusMark status={row.aroc} />
              </div>
              <div className="grid place-items-center p-4 sm:p-5">
                <StatusMark status={row.generic} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,228,92,0.2)] to-transparent" />
    </section>
  );
}

/* ===================================================================
   9. Insider proof — staggered, not uniform grid
   =================================================================== */

function InsiderProof({ achievements, teamLead, teamStats, teamYears }: { achievements: Achievement[]; teamLead: TeamLead; teamStats: TeamStat[]; teamYears: TeamYear[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative bg-[var(--navy-deep)]" id="team">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 40% at 20% 10%, rgba(255,228,92,0.1), transparent 50%)" }}
      />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end mb-14">
          <div>
            <div className="kicker kicker-on-ink">Profil Tim</div>
            <h2
              className="headline mt-5 text-[var(--cream)]"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              Development Team<br />di balik robot.
            </h2>
          </div>
          <p className="max-w-[34rem] pb-2 text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.62)]">
            Dipimpin oleh {teamLead.name}, tim ini berisi {teamStats[0]?.value ?? "11+"} personel aktif dari{" "}
            {teamYears.length} angkatan yang mengubah jam lab menjadi hasil kompetisi.
          </p>
        </div>

        {/* Staggered layout: large quote + 3 video cards different sizes */}
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:grid-rows-[auto_auto]">

          {/* Captain quote — spans full height on desktop */}
          <div className="card-ink rounded-[2rem] p-6 sm:p-8 lg:row-span-2">
            <div className="font-mono text-[0.7rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">
              Pernyataan Ketua Tim
            </div>
            <blockquote
              className="mt-6 font-display font-black uppercase leading-[0.88] tracking-[-0.05em] text-[var(--cream)]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {teamLead.intro}
            </blockquote>
            <div className="mt-8 font-mono text-[0.68rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.45)]">
              {teamLead.name} / {teamLead.role}
            </div>

            {/* Team stats mini-grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {teamStats.map((stat) => (
                <div
                  className="rounded-xl border border-[rgba(255,228,92,0.12)] bg-[rgba(255,228,92,0.05)] p-3"
                  key={stat.label}
                >
                  <div className="numeral text-[1.8rem] leading-none text-[var(--yellow)]">{stat.value}</div>
                  <div className="mt-1 font-mono text-[0.55rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 video placeholders — varying height */}
          {videoSlots.map((slot, i) => (
            <article
              className="group relative overflow-hidden rounded-[2rem] border border-[rgba(248,247,240,0.1)] bg-[rgba(248,247,240,0.04)] transition hover:-translate-y-1"
              key={slot}
              style={{ minHeight: i === 0 ? "18rem" : i === 1 ? "22rem" : "14rem" }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,228,92,0.08),transparent_50%,rgba(5,8,22,0.8))]" />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(248,247,240,0.06) 3px, rgba(248,247,240,0.06) 4px)",
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between p-5">
                <div className="flex size-11 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--navy-deep)] shadow-[0_0_0_6px_rgba(255,228,92,0.1)]">
                  <PlayIcon className="size-4" />
                </div>
                <div>
                  <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">
                    Video 0{i + 1}
                  </div>
                  <h3
                    className="mt-2 font-display font-black uppercase leading-[0.88] tracking-[-0.03em] text-[var(--cream)]"
                    style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                  >
                    {slot}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Achievements strip */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4" id="achievements">
          {achievements.map((a) => (
            <article
              className="group rounded-[1.6rem] border border-[rgba(248,247,240,0.1)] bg-[rgba(248,247,240,0.04)] p-5 transition hover:border-[rgba(255,228,92,0.28)] hover:bg-[rgba(255,228,92,0.04)]"
              key={`${a.year}-${a.title}`}
            >
              <StarIcon className="size-5 text-[var(--yellow)]" />
              <div className="numeral mt-4 text-[2.6rem] leading-none text-[var(--yellow)]">{a.year}</div>
              <h3
                className="mt-3 font-display font-black uppercase leading-none tracking-[-0.03em] text-[var(--cream)]"
                style={{ fontSize: "1.4rem" }}
              >
                {a.title}
              </h3>
              <p className="mt-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.4)]">
                {a.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   10. Gallery — editorial grid
   =================================================================== */

function CampaignGallery({ gallery }: { gallery: GalleryItem[] }) {
  const { ref, isVisible } = useScrollReveal();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const activeItem = lightboxIndex === null ? null : gallery[lightboxIndex];

  const openLightbox = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  }, []);

  const goLightbox = useCallback((direction: number) => {
    setLightboxIndex((current) => {
      if (current === null || gallery.length === 0) return current;
      return (current + direction + gallery.length) % gallery.length;
    });
  }, [gallery.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goLightbox(-1);
      if (event.key === "ArrowRight") goLightbox(1);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, goLightbox]);

  useEffect(() => {
    if (lightboxIndex !== null) closeButtonRef.current?.focus();
    document.body.style.overflow = lightboxIndex === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const spans = [
    "sm:col-span-7 sm:row-span-2",
    "sm:col-span-5",
    "sm:col-span-5",
    "sm:col-span-12",
  ];

  return (
    <section className="relative section-paper overflow-hidden" id="gallery">
      <div aria-hidden="true" className="dot-grid-paper absolute inset-0" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <div className="kicker">Dokumentasi Lab</div>
            <h2
              className="headline mt-4 text-[var(--navy-deep)]"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              Proses pengembangan<br />dan evaluasi.
            </h2>
          </div>
          <p className="max-w-[28rem] pb-2 text-[1rem] leading-[1.85] text-[var(--muted-dark)]">
            Dokumentasi kerja AROC_PL: prototipe, wiring, diskusi, dan proses iterasi di lab.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-12 sm:grid-rows-[280px_280px_240px]">
          {gallery.map((item, i) => (
            <figure
              className={`luxury-surface luxury-image-frame group relative min-h-[14rem] cursor-pointer overflow-hidden rounded-[2rem] bg-[var(--navy-deep)] ${spans[i] ?? ""}`}
              key={item.src}
              onClick={() => openLightbox(i)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openLightbox(i);
                }
              }}
              role="button"
              tabIndex={0}
              style={
                i === 0
                  ? { transform: "rotate(-0.4deg)" }
                  : i === 3
                    ? { transform: "rotate(0.25deg)" }
                    : undefined
              }
            >
              <Image
                alt={item.alt}
                className="luxury-image object-cover"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                src={item.src}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(3,6,16,0.9))]" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[var(--cream)]">
                <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">
                  Frame 0{i + 1}
                </div>
                <p className="mt-1.5 max-w-[34rem] text-[0.9rem] leading-[1.6] text-[rgba(248,247,240,0.72)]">
                  {item.alt}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {activeItem ? (
        <div aria-label="Pratinjau dokumentasi" aria-modal="true" className="lightbox-overlay" onClick={closeLightbox} role="dialog">
          <button ref={closeButtonRef} aria-label="Tutup pratinjau" className="luxury-chip absolute right-4 top-4 z-[103] flex size-12 items-center justify-center rounded-full border border-[rgba(248,247,240,0.2)] bg-[rgba(5,8,22,0.7)] text-[var(--cream)] backdrop-blur-sm transition hover:border-[rgba(255,228,92,0.45)] hover:bg-[rgba(5,8,22,0.9)] hover:text-[var(--yellow)]" onClick={closeLightbox} type="button">
            <CloseIcon className="size-6" />
          </button>
          <button aria-label="Gambar sebelumnya" className="lightbox-control lightbox-control-left" onClick={(event) => { event.stopPropagation(); goLightbox(-1); }} type="button">
            <ChevronLeftIcon className="size-5" />
          </button>
          <button aria-label="Gambar berikutnya" className="lightbox-control lightbox-control-right" onClick={(event) => { event.stopPropagation(); goLightbox(1); }} type="button">
            <ChevronRightIcon className="size-5" />
          </button>
          <div className="lightbox-filmstrip" onClick={(event) => event.stopPropagation()}>
            {gallery.map((item, index) => (
              <button
                aria-label={`Buka frame ${index + 1}`}
                className={`lightbox-thumb ${index === lightboxIndex ? "is-active" : ""}`}
                key={item.src}
                onClick={() => setLightboxIndex(index)}
                type="button"
              >
                <Image alt="" className="object-cover" fill sizes="64px" src={item.src} />
              </button>
            ))}
          </div>
          <div className="lightbox-stage" onClick={(event) => event.stopPropagation()}>
            <Image
              alt={activeItem.alt}
              className="max-h-[82vh] max-w-[90vw] object-contain"
              height={1080}
              key={activeItem.src}
              src={activeItem.src}
              width={1920}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="lightbox-caption-panel">
            <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">
              Frame {String((lightboxIndex ?? 0) + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
            </div>
            <p className="mt-2 text-sm leading-[1.6]">{activeItem.alt}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ===================================================================
   11. Sponsor CTA — bold, centred, full-width feel
   =================================================================== */

function SponsorFinalCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative overflow-hidden bg-[var(--navy-abyss)]" id="sponsor">
      {/* Top accent line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,228,92,0.45)] to-transparent" />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(255,228,92,0.08)] blur-3xl"
      />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        {/* Inner container */}
        <div
          className="luxury-surface soft-glow relative overflow-hidden rounded-[3rem] border border-[rgba(255,228,92,0.22)] p-8 sm:p-12 lg:p-16"
          style={{
            background: "linear-gradient(150deg, rgba(20,28,66,0.95), rgba(5,8,22,0.98))",
            boxShadow: "0 0 0 1px rgba(255,228,92,0.06), 0 60px 120px -60px rgba(0,0,0,0.95)",
          }}
        >
          {/* Decorative doodle */}
          <DoodleArrow className="absolute right-8 top-8 hidden w-36 rotate-[-10deg] text-[var(--yellow)] opacity-60 lg:block" />

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Logo mark */}
            <div className="breathing-mark mx-auto flex aspect-square w-full max-w-[18rem] items-center justify-center rounded-full bg-[var(--yellow)] p-8 shadow-[0_0_0_1.5rem_rgba(255,228,92,0.07),0_0_0_3rem_rgba(255,228,92,0.03)]">
              <ArocGeneratedMark className="h-full w-full max-w-[12rem]" />
            </div>

            {/* Copy */}
            <div>
              <div className="champ-badge-outline">Peluang Kemitraan</div>
              <h2
                className="headline mt-6 text-[var(--cream)]"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)", maxWidth: "11ch" }}
              >
                Dukung Development Team AROC_PL.
              </h2>
              <p className="mt-8 max-w-[36rem] text-[1.05rem] leading-[1.9] text-[rgba(248,247,240,0.68)]">
                Kemitraan bersama AROC_PL mendukung pengembangan robot humanoid Polinema, dokumentasi kegiatan, dan partisipasi tim dalam kompetisi robotik bergengsi.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Akses Kegiatan Lab", "Eksposur Kompetisi", "Talent Pipeline", "Publikasi Kemitraan"].map((b) => (
                  <span
                    className="rounded-full border border-[rgba(255,228,92,0.28)] bg-[rgba(255,228,92,0.07)] px-3 py-1.5 font-mono text-[0.6rem] font-black uppercase tracking-[0.14em] text-[var(--yellow)]"
                    key={b}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link className="btn-gold luxury-shimmer" href="mailto:hello@arocpl.com?subject=Kemitraan%20AROC_PL">
                  Ajukan Kemitraan
                </Link>
                <Link className="btn-ghost-paper luxury-shimmer" href="/#gallery">
                  Lihat Dokumentasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   Main export
   =================================================================== */

export function HomeCampaign({
  hero,
  achievements,
  aboutCards,
  values,
  divisions,
  robots,
  gallery,
  teamLead,
  teamStats,
  teamYears,
}: HomeCampaignProps) {
  return (
    <main id="main-content">
      <ChapterRail chapters={campaignChapters} />
      <CampaignLoader />
      <CampaignHero hero={hero} />

      {/*
        ── Hero (dark) → Marquee (yellow) ──
        Hard cut. No bleed. Warna terlalu kontras untuk di-blend —
        any intermediate color antara navy & yellow akan jadi warna kotor.
        Hard edge justru terlihat dramatis dan intentional.
      */}
      <CurvedMarquee />

      {/* Marquee (yellow) → Manifesto (cream): short, same warm family */}
      <div
        aria-hidden="true"
        style={{ height: "3rem", background: "linear-gradient(to bottom, var(--yellow), var(--cream))" }}
      />
      <EditorialManifesto aboutCards={aboutCards} values={values} />

      {/* Manifesto (cream) → Story (dark): fade through white, drop to deep */}
      <div
        aria-hidden="true"
        style={{ height: "6rem", background: "linear-gradient(to bottom, var(--cream), var(--navy-deep))" }}
      />
      <StickyScrollStory hero={hero} />

      {/* Story (dark) → Benefits (cream-soft): rise from deep */}
      <div
        aria-hidden="true"
        style={{ height: "6rem", background: "linear-gradient(to bottom, var(--navy-deep), var(--cream-soft))" }}
      />
      <BenefitsClaims divisions={divisions} />

      {/* Benefits (cream-soft) → Robots (dark) */}
      <div
        aria-hidden="true"
        style={{ height: "6rem", background: "linear-gradient(to bottom, var(--cream-soft), var(--navy-deep))" }}
      />
      <RobotLineupSlider robots={robots} />

      {/* Robots (dark) → Comparison (abyss): same family, very subtle deepening */}
      <div
        aria-hidden="true"
        style={{ height: "3rem", background: "linear-gradient(to bottom, var(--navy-deep), var(--navy-abyss))" }}
      />
      <ComparisonTable />

      {/* Comparison (abyss) → Proof (dark): same family */}
      <div
        aria-hidden="true"
        style={{ height: "3rem", background: "linear-gradient(to bottom, var(--navy-abyss), var(--navy-deep))" }}
      />
      <InsiderProof achievements={achievements} teamLead={teamLead} teamStats={teamStats} teamYears={teamYears} />

      {/* Proof (dark) → DivisionGallery (dark): same family, seamless */}
      <div
        aria-hidden="true"
        style={{ height: "3rem", background: "linear-gradient(to bottom, var(--navy-deep), var(--navy-abyss))" }}
      />
      <DivisionGallery />

      {/* DivisionGallery (dark) → Gallery (cream) */}
      <div
        aria-hidden="true"
        style={{ height: "6rem", background: "linear-gradient(to bottom, var(--navy-deep), var(--cream))" }}
      />
      <CampaignGallery gallery={gallery} />

      {/* Gallery (cream) → Sponsor (abyss) */}
      <div
        aria-hidden="true"
        style={{ height: "6rem", background: "linear-gradient(to bottom, var(--cream), var(--navy-abyss))" }}
      />
      <SponsorFinalCTA />
    </main>
  );
}
