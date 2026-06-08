"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  ArocGeneratedMark,
  CircuitPath,
  DoodleArrow,
  DoodleUnderline,
  SensorCone,
  SoccerPath,
} from "@/components/shared/BrandAssets";
import {
  ArrowRightIcon,
  BoltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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
import { RobotModelViewer } from "@/components/shared/RobotModelViewer";
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
    title: "Rangka yang siap jatuh, bangun, lalu jalan lagi.",
    body: "Hardware AROC_PL dibangun untuk realita pertandingan: benturan, recovery, servis cepat, dan iterasi tiap sesi uji.",
    icon: CpuIcon,
  },
  {
    kicker: "02 / Vision",
    title: "Kamera membaca bola, garis, dan gawang.",
    body: "Pipeline persepsi memberi robot konteks lapangan supaya keputusan tidak hanya terlihat pintar di demo, tapi berguna di arena.",
    icon: EyeIcon,
  },
  {
    kicker: "03 / Control",
    title: "Gerak humanoid dikunci oleh kontrol embedded.",
    body: "Motor, sensor, daya, dan komputasi onboard disatukan agar robot tetap stabil saat mengejar bola.",
    icon: RadioIcon,
  },
  {
    kicker: "04 / Strategy",
    title: "Satu lineup, tiga peran, keputusan cepat.",
    body: "Penyerang, kiper, dan bek menjalankan perilaku berbeda agar pertandingan terasa seperti sepak bola.",
    icon: CodeIcon,
  },
  {
    kicker: "05 / Match Ready",
    title: "Bukan demo. Sistem tanding.",
    body: "KRI, testing, tekanan kompetisi — setiap sistem diuji di arena nyata, bukan hanya di video presentasi.",
    icon: TrophyIcon,
  },
];

const benefitClaims = [
  { title: "Autonomous Vision", body: "Deteksi bola, gawang, dan lapangan sebagai dasar keputusan match-ready.", icon: EyeIcon },
  { title: "Stable Locomotion", body: "Kontrol gerak humanoid untuk stance, recovery, dan transisi saat bertanding.", icon: BoltIcon },
  { title: "Embedded Control", body: "Koordinasi sensor, aktuator, motor driver, dan power system onboard.", icon: CpuIcon },
  { title: "Match Strategy", body: "Perilaku role-based untuk menyerang, bertahan, menjaga area, dan kembali ke posisi.", icon: ShieldIcon },
];

type ComparisonStatus = true | false | "partial";

const comparisonRows: { capability: string; aroc: ComparisonStatus; generic: ComparisonStatus }[] = [
  { capability: "KRI-tested system", aroc: true, generic: false },
  { capability: "Humanoid soccer role", aroc: true, generic: "partial" },
  { capability: "Vision pipeline", aroc: true, generic: "partial" },
  { capability: "Hardware & software integration", aroc: true, generic: false },
  { capability: "Iteration under match pressure", aroc: true, generic: false },
  { capability: "Sponsor-ready story", aroc: true, generic: false },
];

const videoSlots = [
  "Match day recap",
  "Lab sprint behind the scenes",
  "Robot test session",
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
      style={{ background: "var(--navy-deep)" }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,228,92,0.1) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
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
   2. Hero stage
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

  return (
    <section className="campaign-stage relative min-h-screen overflow-hidden pt-28 sm:pt-32 lg:pt-36" id="top">
      {/* Background glows */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-[rgba(255,228,92,0.16)] blur-3xl" />
        <div className="absolute right-[4%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-[rgba(38,55,122,0.55)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] gap-8 px-4 pb-24 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pb-28">
        {/* ---- Text column ---- */}
        <div className="relative z-20">
          <div className="champ-badge">
            <TrophyIcon className="size-4" />
            KRI Humanoid Champion 2024
          </div>

          <div className="relative mt-7">
            <h1 className="campaign-title max-w-[7.4ch] text-[clamp(4.6rem,15vw,12rem)]">
              Humanoid <span>meets</span> Football.
            </h1>
            <DoodleUnderline className="absolute -bottom-4 left-2 w-[17rem] rotate-[-1deg] text-[var(--yellow)] sm:w-[24rem]" />
          </div>

          <p className="mt-10 max-w-[35rem] text-[1.04rem] leading-[1.85] text-[rgba(248,247,240,0.76)] sm:text-[1.12rem]">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton className="btn-gold" href="#story">
              Lihat Cara Kerja
              <ArrowRightIcon className="size-5" />
            </MagneticButton>
            <Link className="btn-ghost-paper" href="#sponsor">
              Jadi Sponsor
            </Link>
          </div>
        </div>

        {/* ---- Robot stage ---- */}
        <div className="relative z-10 mx-auto w-full max-w-[720px]">
          <DoodleArrow className="absolute -left-6 top-8 z-20 hidden w-36 rotate-[-15deg] text-[var(--yellow)] md:block" />
          <SensorCone className="absolute right-0 top-10 z-0 hidden w-56 text-[rgba(255,228,92,0.36)] md:block" />
          <SoccerPath className="absolute -bottom-8 left-1/2 z-20 w-[94%] -translate-x-1/2 text-[rgba(255,228,92,0.45)]" />

          <div
            ref={stageRef}
            className="relative min-h-[520px] overflow-visible rounded-[2.8rem] border border-[rgba(255,228,92,0.22)] bg-[rgba(17,26,61,0.42)] shadow-[0_48px_130px_-74px_rgba(0,0,0,1)] backdrop-blur sm:min-h-[660px]"
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            onPointerMove={(e) => {
              if (!canMove) return;
              const rect = stageRef.current?.getBoundingClientRect();
              if (!rect) return;
              setTilt({ x: (e.clientX - (rect.left + rect.width / 2)) / rect.width, y: (e.clientY - (rect.top + rect.height / 2)) / rect.height });
            }}
            style={{ perspective: "1200px" }}
          >
            <div className="absolute inset-x-[12%] top-[8%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.26),rgba(255,228,92,0.06)_48%,transparent_72%)] blur-3xl" />
            <div className="absolute inset-5 rounded-[2.2rem] border border-[rgba(248,247,240,0.08)]" />

            {/* Status + 3D badge */}
            <div className="absolute left-5 top-5 z-20 rounded-2xl border border-[rgba(255,228,92,0.28)] bg-[rgba(5,8,22,0.72)] p-4 backdrop-blur-xl">
              <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">Status</div>
              <div className="mt-1 font-display text-[1.7rem] font-black uppercase leading-none text-[var(--cream)]">Siap Tanding</div>
            </div>
            <div className="absolute right-5 top-5 z-20 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--navy-deep)]">
              Interactive 3D
            </div>

            {/* Floating doodle labels — desktop only */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 hidden md:block">
              {[
                { text: "Vision locked", top: "22%", left: "4%", r: -4, d: 0 },
                { text: "Match ready", top: "35%", right: "3%", r: 3, d: 0.5 },
                { text: "KRI 2024", bottom: "38%", left: "3%", r: -2, d: 0.25 },
                { text: "Autonomous play", bottom: "24%", right: "4%", r: 2, d: 0.7 },
              ].map((l) => (
                <div key={l.text} className="absolute" style={{ top: l.top, bottom: l.bottom, left: l.left, right: l.right, transform: `rotate(${l.r}deg)` }}>
                  <span className="float-y inline-block rounded-full border border-[rgba(255,228,92,0.3)] bg-[rgba(5,8,22,0.78)] px-3 py-1.5 font-mono text-[0.58rem] font-black uppercase tracking-[0.16em] text-[var(--yellow)] backdrop-blur-lg" style={{ animationDelay: `${l.d}s` }}>
                    {l.text}
                  </span>
                </div>
              ))}
            </div>

            {/* 3D robot model */}
            <RobotModelViewer
              alt="Robot humanoid AROC_PL"
              className="relative z-10 mx-auto max-w-[650px] drop-shadow-[0_38px_95px_rgba(0,0,0,0.76)] transition-transform duration-300"
              modelSrc={hero.robotModel}
              posterSrc={hero.robotImage}
              priority
              style={{ transform: `translate3d(${tilt.x * -18}px, ${tilt.y * -10}px, 0) rotateY(${tilt.x * 5}deg) rotateX(${tilt.y * -3}deg)` }}
            />

            {/* Bottom fact annotations */}
            <div className="absolute bottom-5 left-5 right-5 z-20 grid gap-3 sm:grid-cols-3">
              {[["11+", "Engineers"], ["3", "Robots"], ["2024", "Champion"]].map(([v, lab]) => (
                <div className="rounded-2xl border border-[rgba(248,247,240,0.12)] bg-[rgba(5,8,22,0.72)] p-4 backdrop-blur-xl" key={lab}>
                  <div className="numeral text-[2.5rem] leading-none text-[var(--yellow)]">{v}</div>
                  <div className="mt-2 font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.54)]">{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   3. Curved SVG marquee
   =================================================================== */

function CurvedMarquee() {
  return (
    <section aria-label="Marquee" className="relative overflow-hidden bg-[var(--yellow)] text-[var(--navy-deep)]">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #070c22 1px, transparent 0)", backgroundSize: "18px 18px" }} />
      <div className="relative overflow-hidden py-2">
        <div className="flex w-[200%]" style={{ animation: "marquee 40s linear infinite" }}>
          {[0, 1].map((i) => (
            <svg key={i} aria-hidden="true" className="-my-6 h-[14rem] w-1/2 shrink-0 overflow-visible sm:h-[22rem]" viewBox="0 0 1440 320">
              <path d="M-80 240C160 100 460 20 720 130S1200 270 1520 160" fill="none" id={`aroc-curve-${i}`} />
              <text className="fill-current font-display text-[7rem] font-black uppercase sm:text-[10rem]" style={{ letterSpacing: "-0.04em" }}>
                <textPath href={`#aroc-curve-${i}`}>Built to Play · Built to Win · Built in Polinema · </textPath>
              </text>
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   4. Editorial manifesto
   =================================================================== */

function EditorialManifesto({ aboutCards, values }: { aboutCards: AboutCard[]; values: ValueCard[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative bg-[var(--cream)]" id="about">
      <div aria-hidden="true" className="paper-grain absolute inset-0" />
      <div ref={ref} className={`relative z-10 mx-auto max-w-[1240px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <div className="kicker">Campaign Manifesto</div>
            <h2 className="headline mt-5 max-w-[11ch] text-[clamp(3.2rem,9vw,7.2rem)] text-[var(--navy-deep)]">
              Robot yang bukan demo. Robot yang bertanding.
            </h2>
          </div>
          <div className="rounded-[2rem] bg-[var(--navy-deep)] p-6 text-[var(--cream)] sm:p-8">
            <p className="text-[1.08rem] leading-[1.85] text-[rgba(248,247,240,0.78)]">
              AROC_PL adalah tempat hardware, software, dan strategi dipaksa menyatu. Targetnya bukan terlihat futuristik, tapi mencetak robot humanoid yang bisa bermain, gagal, diperbaiki, lalu kembali menang.
            </p>
          </div>
        </div>

        <div className="relative mt-12 grid gap-5 md:grid-cols-3">
          <DoodleArrow className="absolute -right-4 -top-10 hidden w-28 rotate-[195deg] text-[var(--gold-deep)] opacity-60 md:block" />
          {aboutCards.map((card, i) => (
            <article className="card-paper card-hover-lift rounded-[1.6rem] p-6" key={card.title}>
              <div className="numeral text-[3rem] leading-none text-[var(--gold-deep)]">0{i + 1}</div>
              <h3 className="mt-6 font-display text-[2rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)]">{card.title}</h3>
              <p className="mt-4 text-[0.96rem] leading-[1.8] text-[var(--muted-dark)]">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {values.map((v) => (
            <span className="rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.16em] text-[var(--navy-deep)]" key={v.title}>
              {v.title}
            </span>
          ))}
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

  return (
    <section className="relative bg-[var(--navy-deep)]" id="story">
      <div aria-hidden="true" className="campaign-shell absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* ---- Sticky visual — desktop ---- */}
          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-screen items-center py-10">
              <div className="relative w-full">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2.4rem] border border-[rgba(255,228,92,0.18)] bg-[rgba(17,26,61,0.45)]">
                  <Image
                    alt="AROC_PL robot"
                    className="object-contain drop-shadow-[0_34px_80px_rgba(0,0,0,0.7)]"
                    fill
                    sizes="520px"
                    src={hero.robotImage}
                  />
                  {/* Dynamic overlays per step */}
                  {storySteps.map((_, i) => (
                    <div className={`absolute inset-0 transition-opacity duration-500 ${i === activeStep ? "opacity-100" : "opacity-0"}`} key={i}>
                      {overlays[i] ?? null}
                    </div>
                  ))}
                  {/* Champion glow for step 5 */}
                  {activeStep === 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[rgba(5,8,22,0.4)]">
                      <div className="rounded-full bg-[var(--yellow)] p-6 shadow-[0_0_0_14px_rgba(255,228,92,0.12)]">
                        <TrophyIcon className="size-12 text-[var(--navy-deep)]" />
                      </div>
                    </div>
                  )}
                  {/* Active kicker label */}
                  <div className="absolute bottom-5 left-5 z-10 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--navy-deep)] transition-all duration-300">
                    {storySteps[activeStep]?.kicker ?? ""}
                  </div>
                </div>
                {/* Step indicator dots */}
                <div className="absolute -right-10 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
                  {storySteps.map((_, i) => (
                    <button
                      aria-label={`Step ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${i === activeStep ? "h-8 w-3 bg-[var(--yellow)]" : "size-3 bg-[rgba(248,247,240,0.2)] hover:bg-[rgba(248,247,240,0.4)]"}`}
                      key={i}
                      onClick={() => panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---- Scrolling panels ---- */}
          <div>
            <div className="pb-8 pt-20 lg:pt-[40vh]">
              <div className="kicker kicker-on-ink">Scroll Story</div>
              <h2 className="headline mt-5 max-w-[10ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--cream)]">
                From lab bench to kick off.
              </h2>
            </div>

            {/* Mobile robot image */}
            <div className="relative mb-8 aspect-[3/4] max-h-[28rem] overflow-hidden rounded-[2rem] border border-[rgba(255,228,92,0.18)] bg-[rgba(17,26,61,0.45)] lg:hidden">
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
                  <div className={`max-w-[36rem] transition-all duration-500 ${i === activeStep ? "opacity-100" : "lg:opacity-30"}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--yellow)] text-[var(--navy-deep)]">
                        <Icon className="size-6" />
                      </div>
                      <div className="font-mono text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">{step.kicker}</div>
                    </div>
                    <h3 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[var(--cream)]">
                      {step.title}
                    </h3>
                    <p className="mt-6 text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.66)]">{step.body}</p>
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
   6. Benefits / technology claims
   =================================================================== */

function BenefitsClaims({ divisions }: { divisions: DivisionCard[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative bg-[var(--cream-soft)]" id="technology">
      <div aria-hidden="true" className="paper-grain absolute inset-0" />
      <div ref={ref} className={`relative z-10 mx-auto max-w-[1240px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="kicker">Benefits</div>
            <h2 className="headline mt-5 max-w-[10ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--navy-deep)]">
              More control. Less guesswork.
            </h2>
          </div>
          <p className="max-w-[34rem] text-[1.05rem] leading-[1.85] text-[var(--muted-dark)]">
            Kapabilitas AROC_PL datang dari dua divisi besar: {divisions.map((d) => d.title).join(" dan ")}. Keduanya dibuat untuk satu tujuan: robot siap bertanding.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefitClaims.map((c, i) => {
            const Icon = c.icon;
            return (
              <article
                className="group relative overflow-hidden rounded-[2rem] border border-[var(--rule)] bg-white/80 p-5 shadow-[0_2px_0_rgba(7,12,34,0.04)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_-38px_rgba(7,12,34,0.5)] sm:p-6"
                key={c.title}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="numeral text-[2.6rem] leading-none text-[var(--gold-deep)]">0{i + 1}</div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-[var(--navy-deep)] text-[var(--yellow)]">
                    <Icon className="size-6" />
                  </div>
                </div>
                <h3 className="mt-8 font-display text-[1.8rem] font-black uppercase leading-none tracking-[-0.04em] text-[var(--navy-deep)]">{c.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-[1.75] text-[var(--muted-dark)]">{c.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   7. Robot lineup slider
   =================================================================== */

function RobotLineupSlider({ robots }: { robots: RobotCard[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = robots[activeIndex] ?? robots[0];
  const { ref, isVisible } = useScrollReveal();

  if (!active) return null;

  const go = (d: number) => setActiveIndex((c) => (c + d + robots.length) % robots.length);

  return (
    <section className="relative scroll-mt-24 bg-[var(--navy-deep)]" id="robots">
      <div aria-hidden="true" className="campaign-shell absolute inset-0" />
      <div ref={ref} className={`relative z-10 mx-auto max-w-[1240px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="kicker kicker-on-ink">Robot Lineup</div>
            <h2 className="headline mt-5 max-w-[9ch] text-[clamp(3.2rem,8vw,6.8rem)] text-[var(--cream)]">Choose your player.</h2>
          </div>
          <p className="max-w-[34rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.72)]">
            Tiga unit robot humanoid, masing-masing dengan peran spesifik: menyerang, menjaga gawang, dan bertahan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 overflow-hidden rounded-[2.6rem] border border-[rgba(255,228,92,0.24)] bg-[rgba(17,26,61,0.62)] p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          {/* Robot images — crossfade */}
          <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_14%,rgba(255,228,92,0.24),transparent_24rem)]">
            {robots.map((r, i) => (
              <Image
                key={r.name}
                alt={`${r.name} robot`}
                className={`absolute inset-0 object-cover transition-all duration-500 ${i === activeIndex ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                src={r.image}
              />
            ))}
            <div className="absolute left-5 top-5 z-10 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.64rem] font-black uppercase tracking-[0.18em] text-[var(--navy-deep)]">
              Unit {String(activeIndex + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Active robot info */}
          <div className="relative">
            <div className="font-mono text-[0.7rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">{active.role}</div>
            <h3 className="mt-4 font-display text-[clamp(4rem,10vw,8rem)] font-black uppercase leading-[0.78] tracking-[-0.06em] text-[var(--cream)]">{active.name}</h3>
            <p className="mt-6 max-w-[32rem] text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.7)]">{active.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {active.stats.map((s) => (
                <div className="rounded-2xl border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] p-4" key={s.label}>
                  <div className="numeral text-[2.3rem] leading-none text-[var(--yellow)]">{s.value}</div>
                  <div className="mt-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.52)]">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button aria-label="Robot sebelumnya" className="flex size-12 items-center justify-center rounded-full border border-[rgba(248,247,240,0.18)] bg-[rgba(248,247,240,0.06)] text-[var(--cream)] transition hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)]" onClick={() => go(-1)} type="button">
                <ChevronLeftIcon className="size-5" />
              </button>
              <button aria-label="Robot berikutnya" className="flex size-12 items-center justify-center rounded-full border border-[rgba(248,247,240,0.18)] bg-[rgba(248,247,240,0.06)] text-[var(--cream)] transition hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)]" onClick={() => go(1)} type="button">
                <ChevronRightIcon className="size-5" />
              </button>
              <div className="ml-2 flex gap-2">
                {robots.map((r, i) => (
                  <button aria-label={`Pilih ${r.name}`} className={`h-2.5 rounded-full transition-all ${i === activeIndex ? "w-8 bg-[var(--yellow)]" : "w-2.5 bg-[rgba(248,247,240,0.3)]"}`} key={r.name} onClick={() => setActiveIndex(i)} type="button" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   8. Comparison table
   =================================================================== */

function ComparisonTable() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative bg-[var(--cream)]">
      <div aria-hidden="true" className="paper-grain absolute inset-0" />
      <div ref={ref} className={`relative z-10 mx-auto max-w-[1120px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        <div className="text-center">
          <div className="kicker kicker-centered">See the Difference</div>
          <h2 className="headline mx-auto mt-5 max-w-[11ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--navy-deep)]">
            Bukan sekadar prototype.
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-[var(--rule)] bg-white/[0.82] shadow-[0_30px_80px_-58px_rgba(7,12,34,0.75)]">
          {/* Header */}
          <div className="grid grid-cols-[1fr_0.65fr_0.65fr] bg-[var(--navy-deep)] text-[var(--cream)]">
            <div className="p-4 font-mono text-[0.7rem] font-black uppercase tracking-[0.18em] sm:p-5">Capability</div>
            <div className="bg-[var(--yellow)] p-4 text-center font-display text-[1.3rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)] sm:p-5 sm:text-[1.5rem]">AROC_PL</div>
            <div className="p-4 text-center font-display text-[1.3rem] font-black uppercase leading-none tracking-[-0.03em] sm:p-5 sm:text-[1.5rem]">Prototype</div>
          </div>
          {/* Rows */}
          {comparisonRows.map((row) => (
            <div className="grid grid-cols-[1fr_0.65fr_0.65fr] border-t border-[var(--rule)]" key={row.capability}>
              <div className="p-4 text-[0.92rem] font-semibold text-[var(--navy-deep)] sm:p-5">{row.capability}</div>
              <div className="grid place-items-center bg-[rgba(255,228,92,0.15)] p-4 sm:p-5"><StatusMark status={row.aroc} /></div>
              <div className="grid place-items-center p-4 sm:p-5"><StatusMark status={row.generic} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   9. Insider proof / testimonial / video placeholders
   =================================================================== */

function InsiderProof({ achievements, teamLead, teamStats, teamYears }: { achievements: Achievement[]; teamLead: TeamLead; teamStats: TeamStat[]; teamYears: TeamYear[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative bg-[var(--navy-deep)]" id="team">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,228,92,0.12),transparent_28rem)]" />
      <div ref={ref} className={`relative z-10 mx-auto max-w-[1240px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="kicker kicker-on-ink">Insider Proof</div>
            <h2 className="headline mt-5 max-w-[10ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--cream)]">People behind the machine.</h2>
          </div>
          <p className="max-w-[34rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.72)]">
            Dipimpin oleh {teamLead.name}, tim ini berisi {teamStats[0]?.value ?? "11+"} personel aktif dari {teamYears.length} angkatan yang mengubah jam lab menjadi hasil kompetisi.
          </p>
        </div>

        {/* Captain quote + video placeholders */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-ink rounded-[2rem] p-6 sm:p-8">
            <div className="font-mono text-[0.7rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">Captain Quote</div>
            <blockquote className="mt-6 font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[var(--cream)]">
              {teamLead.intro}
            </blockquote>
            <div className="mt-8 font-mono text-[0.72rem] font-black uppercase tracking-[0.2em] text-[rgba(248,247,240,0.56)]">{teamLead.name} / {teamLead.role}</div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {videoSlots.map((slot) => (
              <article className="group relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-[rgba(248,247,240,0.14)] bg-[rgba(248,247,240,0.07)] p-5 backdrop-blur transition hover:-translate-y-2 hover:rotate-[-1deg]" key={slot}>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,228,92,0.1),transparent_45%,rgba(5,8,22,0.85))]" />
                <div aria-hidden="true" className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(248,247,240,0.08) 3px, rgba(248,247,240,0.08) 4px)", backgroundSize: "100% 4px" }} />
                <div className="relative z-10 flex h-full min-h-[21rem] flex-col justify-between">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--navy-deep)] shadow-[0_0_0_6px_rgba(255,228,92,0.12)]">
                    <PlayIcon className="size-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">Video placeholder</div>
                    <h3 className="mt-3 font-display text-[2rem] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[var(--cream)]">{slot}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8 grid gap-4 md:grid-cols-4" id="achievements">
          {achievements.map((a) => (
            <article className="group rounded-[1.5rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] p-5 transition hover:border-[rgba(255,228,92,0.3)]" key={`${a.year}-${a.title}`}>
              <StarIcon className="size-5 text-[var(--yellow)]" />
              <div className="numeral mt-5 text-[3rem] leading-none text-[var(--yellow)]">{a.year}</div>
              <h3 className="mt-3 font-display text-[1.6rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--cream)]">{a.title}</h3>
              <p className="mt-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.48)]">{a.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   10. Flowing gallery
   =================================================================== */

function CampaignGallery({ gallery }: { gallery: GalleryItem[] }) {
  const { ref, isVisible } = useScrollReveal();

  const spans = [
    "sm:col-span-7 sm:row-span-2",
    "sm:col-span-5",
    "sm:col-span-5",
    "sm:col-span-12",
  ];

  return (
    <section className="relative bg-[var(--cream)]" id="gallery">
      <div aria-hidden="true" className="paper-grain absolute inset-0" />
      <div ref={ref} className={`relative z-10 mx-auto max-w-[1240px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <div className="kicker">Lab Gallery</div>
            <h2 className="headline mt-5 max-w-[11ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--navy-deep)]">Real lab. Real iteration.</h2>
          </div>
          <p className="max-w-[32rem] text-[1.05rem] leading-[1.85] text-[var(--muted-dark)]">
            Dokumentasi kerja AROC_PL: prototipe, wiring, diskusi, dan proses iterasi di lab.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-12 sm:grid-rows-[280px_280px_240px]">
          {gallery.map((item, i) => (
            <figure
              className={`group relative min-h-[14rem] overflow-hidden rounded-[2rem] bg-[var(--navy-deep)] ${spans[i] ?? ""}`}
              key={item.src}
              style={i === 0 ? { transform: "rotate(-0.5deg)" } : i === 3 ? { transform: "rotate(0.3deg)" } : undefined}
            >
              <Image
                alt={item.alt}
                className="object-cover transition duration-[900ms] group-hover:scale-[1.06]"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                src={item.src}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,8,22,0.88))]" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[var(--cream)]">
                <div className="font-mono text-[0.64rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">Frame 0{i + 1}</div>
                <p className="mt-2 max-w-[34rem] text-[0.94rem] leading-[1.6] text-[rgba(248,247,240,0.78)]">{item.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   11. Final sponsor CTA
   =================================================================== */

function SponsorFinalCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative bg-[var(--navy-deep)]" id="sponsor">
      <div aria-hidden="true" className="campaign-shell absolute inset-0" />
      <div ref={ref} className={`relative z-10 mx-auto max-w-[1240px] px-4 py-20 sm:px-8 sm:py-28 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        <div className="relative overflow-hidden rounded-[2.8rem] border border-[rgba(255,228,92,0.24)] bg-[rgba(17,26,61,0.7)] p-6 sm:p-10 lg:p-12">
          <DoodleArrow className="absolute right-8 top-8 hidden w-40 rotate-[-10deg] text-[var(--yellow)] lg:block" />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="mx-auto flex aspect-square w-full max-w-[22rem] items-center justify-center rounded-full bg-[var(--yellow)] p-8 shadow-[0_0_0_1rem_rgba(255,228,92,0.08)]">
              <ArocGeneratedMark className="h-full w-full max-w-[15rem]" />
            </div>
            <div>
              <div className="champ-badge-outline">Sponsor Call</div>
              <h2 className="headline mt-6 max-w-[11ch] text-[clamp(3.3rem,8vw,7rem)] text-[var(--cream)]">Back the team building them.</h2>
              <p className="mt-8 max-w-[36rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.74)]">
                Jangan cuma nonton robot. Dukung tim yang membangun, menguji, dan membawa nama Polinema ke arena robot humanoid nasional.
              </p>
              {/* Partner value badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Lab Access", "Competition Exposure", "Talent Pipeline", "Brand on Podium"].map((b) => (
                  <span className="rounded-full border border-[rgba(255,228,92,0.3)] bg-[rgba(255,228,92,0.08)] px-3 py-1.5 font-mono text-[0.6rem] font-black uppercase tracking-[0.14em] text-[var(--yellow)]" key={b}>{b}</span>
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link className="btn-gold" href="mailto:hello@arocpl.com?subject=Kemitraan%20AROC_PL">Mulai Kemitraan</Link>
                <Link className="btn-ghost-paper" href="/#gallery">Lihat Dokumentasi</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   Main export — continuous campaign flow
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
    <main>
      <CampaignLoader />
      <CampaignHero hero={hero} />
      {/* Bleed: dark → yellow */}
      <div aria-hidden="true" className="h-20 bg-gradient-to-b from-[var(--navy-black)] to-[var(--yellow)]" />
      <CurvedMarquee />
      {/* Bleed: yellow → cream */}
      <div aria-hidden="true" className="h-20 bg-gradient-to-b from-[var(--yellow)] to-[var(--cream)]" />
      <EditorialManifesto aboutCards={aboutCards} values={values} />
      {/* Bleed: cream → dark */}
      <div aria-hidden="true" className="h-20 bg-gradient-to-b from-[var(--cream)] to-[var(--navy-deep)]" />
      <StickyScrollStory hero={hero} />
      {/* Bleed: dark → cream-soft */}
      <div aria-hidden="true" className="h-20 bg-gradient-to-b from-[var(--navy-deep)] to-[var(--cream-soft)]" />
      <BenefitsClaims divisions={divisions} />
      {/* Bleed: cream-soft → dark */}
      <div aria-hidden="true" className="h-20 bg-gradient-to-b from-[var(--cream-soft)] to-[var(--navy-deep)]" />
      <RobotLineupSlider robots={robots} />
      {/* Bleed: dark → cream */}
      <div aria-hidden="true" className="h-20 bg-gradient-to-b from-[var(--navy-deep)] to-[var(--cream)]" />
      <ComparisonTable />
      {/* Bleed: cream → dark */}
      <div aria-hidden="true" className="h-20 bg-gradient-to-b from-[var(--cream)] to-[var(--navy-deep)]" />
      <InsiderProof achievements={achievements} teamLead={teamLead} teamStats={teamStats} teamYears={teamYears} />
      {/* Bleed: dark → cream */}
      <div aria-hidden="true" className="h-20 bg-gradient-to-b from-[var(--navy-deep)] to-[var(--cream)]" />
      <CampaignGallery gallery={gallery} />
      {/* Bleed: cream → dark */}
      <div aria-hidden="true" className="h-20 bg-gradient-to-b from-[var(--cream)] to-[var(--navy-deep)]" />
      <SponsorFinalCTA />
    </main>
  );
}
