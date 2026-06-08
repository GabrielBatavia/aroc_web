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
    title: "Gerak humanoid yang dikunci oleh kontrol embedded.",
    body: "Motor, sensor, daya, dan komputasi onboard disatukan agar robot tetap stabil saat mengejar bola.",
    icon: RadioIcon,
  },
  {
    kicker: "04 / Strategy",
    title: "Satu lineup, tiga peran, keputusan cepat.",
    body: "Penyerang, kiper, dan bek menjalankan perilaku berbeda agar pertandingan terasa seperti sepak bola, bukan sekadar robot bergerak.",
    icon: CodeIcon,
  },
];

const benefitClaims = [
  {
    title: "Autonomous Vision",
    body: "Deteksi bola, gawang, dan lapangan sebagai dasar keputusan match-ready.",
    icon: EyeIcon,
  },
  {
    title: "Stable Locomotion",
    body: "Kontrol gerak humanoid untuk stance, recovery, dan transisi saat bertanding.",
    icon: BoltIcon,
  },
  {
    title: "Embedded Control",
    body: "Koordinasi sensor, aktuator, motor driver, dan power system onboard.",
    icon: CpuIcon,
  },
  {
    title: "Match Strategy",
    body: "Perilaku role-based untuk menyerang, bertahan, menjaga area, dan kembali ke posisi.",
    icon: ShieldIcon,
  },
];

const comparisonRows = [
  ["KRI-tested system", "YES", "NO"],
  ["Humanoid soccer role", "YES", "LIMITED"],
  ["Vision pipeline", "YES", "OPTIONAL"],
  ["Hardware and software integration", "YES", "FRAGILE"],
  ["Iteration under match pressure", "YES", "RARE"],
  ["Sponsor-ready story", "YES", "NO"],
];

const videoSlots = [
  "Match day recap",
  "Lab sprint behind the scenes",
  "Robot test session",
];

function CampaignHero({ hero }: { hero: HeroData }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(false);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanMove(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section className="campaign-stage surface-ink relative min-h-screen overflow-hidden pt-28 sm:pt-32 lg:pt-36" id="top">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-[rgba(255,228,92,0.16)] blur-3xl" />
        <div className="absolute right-[4%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-[rgba(38,55,122,0.55)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(5,8,22,0.95))]" />
      </div>

      <div
        ref={ref}
        className={`relative z-10 mx-auto grid max-w-[1280px] gap-8 px-4 pb-16 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pb-20 reveal-base reveal-up ${
          isVisible ? "revealed" : ""
        }`}
      >
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
            {hero.description} Kami membawa riset robot humanoid ke momen yang paling jujur: lapangan pertandingan.
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

        <div className="relative z-10 mx-auto w-full max-w-[720px]">
          <DoodleArrow className="absolute -left-6 top-8 z-20 hidden w-36 rotate-[-15deg] text-[var(--yellow)] md:block" />
          <SensorCone className="absolute right-0 top-10 z-0 hidden w-56 text-[rgba(255,228,92,0.36)] md:block" />
          <SoccerPath className="absolute -bottom-8 left-1/2 z-20 w-[94%] -translate-x-1/2 text-[rgba(255,228,92,0.45)]" />

          <div
            ref={stageRef}
            className="relative min-h-[520px] overflow-visible rounded-[2.8rem] border border-[rgba(255,228,92,0.22)] bg-[rgba(17,26,61,0.42)] shadow-[0_48px_130px_-74px_rgba(0,0,0,1)] backdrop-blur sm:min-h-[660px]"
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            onPointerMove={(event) => {
              if (!canMove) return;
              const rect = stageRef.current?.getBoundingClientRect();
              if (!rect) return;
              setTilt({
                x: (event.clientX - (rect.left + rect.width / 2)) / rect.width,
                y: (event.clientY - (rect.top + rect.height / 2)) / rect.height,
              });
            }}
            style={{ perspective: "1200px" }}
          >
            <div className="absolute inset-x-[12%] top-[8%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.26),rgba(255,228,92,0.06)_48%,transparent_72%)] blur-3xl" />
            <div className="absolute inset-5 rounded-[2.2rem] border border-[rgba(248,247,240,0.08)]" />
            <div className="absolute left-5 top-5 z-20 rounded-2xl border border-[rgba(255,228,92,0.28)] bg-[rgba(5,8,22,0.72)] p-4 backdrop-blur-xl">
              <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">Status</div>
              <div className="mt-1 font-display text-[1.7rem] font-black uppercase leading-none text-[var(--cream)]">Siap Tanding</div>
            </div>
            <div className="absolute right-5 top-5 z-20 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--navy-deep)]">
              Interactive 3D
            </div>

            <RobotModelViewer
              alt="Robot humanoid AROC_PL"
              className="relative z-10 mx-auto max-w-[650px] drop-shadow-[0_38px_95px_rgba(0,0,0,0.76)] transition-transform duration-300"
              modelSrc={hero.robotModel}
              posterSrc={hero.robotImage}
              priority
              style={{
                transform: `translate3d(${tilt.x * -18}px, ${tilt.y * -10}px, 0) rotateY(${tilt.x * 5}deg) rotateX(${tilt.y * -3}deg)`,
              }}
            />

            <div className="absolute bottom-5 left-5 right-5 z-20 grid gap-3 sm:grid-cols-3">
              {[
                ["11+", "Engineers"],
                ["3", "Robots"],
                ["2024", "Champion"],
              ].map(([value, label]) => (
                <div className="rounded-2xl border border-[rgba(248,247,240,0.12)] bg-[rgba(5,8,22,0.72)] p-4 backdrop-blur-xl" key={label}>
                  <div className="numeral text-[2.5rem] leading-none text-[var(--yellow)]">{value}</div>
                  <div className="mt-2 font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.54)]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CurvedMarquee() {
  return (
    <section className="relative overflow-hidden bg-[var(--yellow)] py-0 text-[var(--navy-deep)]">
      <div className="absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #070c22 1px, transparent 0)", backgroundSize: "18px 18px" }} />
      <svg className="relative -my-6 h-[16rem] w-[140%] -translate-x-[12%] overflow-visible sm:h-[24rem]" viewBox="0 0 1440 320" aria-hidden="true">
        <path d="M-80 255C160 125 510 15 920 62c280 32 462 130 610 226" fill="none" id="aroc-curve" />
        <text className="fill-current font-display text-[7.5rem] font-black uppercase tracking-[-0.05em] sm:text-[10.5rem]">
          <textPath href="#aroc-curve">
            Built to Play * Built to Win * Built in Polinema * Built to Play * Built to Win *
          </textPath>
        </text>
      </svg>
    </section>
  );
}

function EditorialIntro({ aboutCards, values }: { aboutCards: AboutCard[]; values: ValueCard[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="surface-paper relative overflow-hidden py-20 sm:py-28" id="about">
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className={`relative mx-auto max-w-[1240px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`} ref={ref}>
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

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {aboutCards.map((card, index) => (
            <article className="card-paper card-hover-lift rounded-[1.6rem] p-6" key={card.title}>
              <div className="numeral text-[3rem] leading-none text-[var(--gold-deep)]">0{index + 1}</div>
              <h3 className="font-display mt-6 text-[2rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)]">{card.title}</h3>
              <p className="mt-4 text-[0.96rem] leading-[1.8] text-[var(--muted-dark)]">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {values.map((value) => (
            <span className="rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.16em] text-[var(--navy-deep)]" key={value.title}>
              {value.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollStory({ hero }: { hero: HeroData }) {
  return (
    <section className="surface-ink campaign-shell relative py-20 sm:py-28" id="story">
      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="kicker kicker-on-ink">Scroll Story</div>
            <h2 className="headline mt-5 max-w-[10ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--cream)]">
              From lab bench to kick off.
            </h2>
            <div className="relative mt-8 overflow-hidden rounded-[2.4rem] border border-[rgba(255,228,92,0.22)] bg-[rgba(17,26,61,0.55)] p-4">
              <CircuitPath className="absolute inset-x-4 top-6 z-0 text-[rgba(255,228,92,0.2)]" />
              <Image alt="AROC_PL robot visual" className="relative z-10 mx-auto object-contain drop-shadow-[0_34px_80px_rgba(0,0,0,0.7)]" height={660} priority src={hero.robotImage} width={560} />
            </div>
          </div>

          <div className="grid gap-5">
            {storySteps.map((step) => {
              const Icon = step.icon;
              return (
                <article className="min-h-[18rem] rounded-[2rem] border border-[rgba(248,247,240,0.13)] bg-[rgba(248,247,240,0.06)] p-6 backdrop-blur-xl sm:p-8" key={step.title}>
                  <div className="flex items-start justify-between gap-5">
                    <div className="font-mono text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">{step.kicker}</div>
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--yellow)] text-[var(--navy-deep)]">
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <h3 className="font-display mt-8 max-w-[12ch] text-[clamp(2.6rem,6vw,5.2rem)] font-black uppercase leading-[0.86] tracking-[-0.05em] text-[var(--cream)]">
                    {step.title}
                  </h3>
                  <p className="mt-6 max-w-[34rem] text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.66)]">{step.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits({ divisions }: { divisions: DivisionCard[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="surface-paper-soft relative overflow-hidden py-20 sm:py-28" id="technology">
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className={`relative mx-auto max-w-[1240px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`} ref={ref}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="kicker">Benefits</div>
            <h2 className="headline mt-5 max-w-[10ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--navy-deep)]">
              More control. Less guesswork.
            </h2>
          </div>
          <p className="max-w-[34rem] text-[1.05rem] leading-[1.85] text-[var(--muted-dark)]">
            Kapabilitas AROC_PL datang dari dua divisi besar: {divisions.map((division) => division.title).join(" dan ")}. Keduanya dibuat untuk satu tujuan: robot siap bertanding.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefitClaims.map((claim, index) => {
            const Icon = claim.icon;
            return (
              <article className="card-paper card-hover-lift rounded-[1.6rem] p-5 sm:p-6" key={claim.title}>
                <div className="flex items-start justify-between gap-4">
                  <div className="numeral text-[2.6rem] leading-none text-[var(--gold-deep)]">0{index + 1}</div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--navy-deep)] text-[var(--yellow)]">
                    <Icon className="size-6" />
                  </div>
                </div>
                <h3 className="font-display mt-8 text-[2rem] font-black uppercase leading-none tracking-[-0.04em] text-[var(--navy-deep)]">{claim.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-[1.75] text-[var(--muted-dark)]">{claim.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RobotLineup({ robots }: { robots: RobotCard[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = robots[activeIndex] ?? robots[0];
  const { ref, isVisible } = useScrollReveal();

  if (!active) return null;

  const go = (direction: number) => {
    setActiveIndex((current) => (current + direction + robots.length) % robots.length);
  };

  return (
    <section className="surface-ink campaign-shell relative scroll-mt-24 py-20 sm:py-28" id="robots">
      <div className={`relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`} ref={ref}>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="kicker kicker-on-ink">Robot Lineup</div>
            <h2 className="headline mt-5 max-w-[9ch] text-[clamp(3.2rem,8vw,6.8rem)] text-[var(--cream)]">
              Choose your player.
            </h2>
          </div>
          <p className="max-w-[34rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.72)]">
            Seperti flavor slider di campaign product, armada AROC_PL punya varian peran: menyerang, menjaga, dan memulihkan posisi.
          </p>
        </div>

        <div className="mt-12 grid gap-6 overflow-hidden rounded-[2.6rem] border border-[rgba(255,228,92,0.24)] bg-[rgba(17,26,61,0.62)] p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_14%,rgba(255,228,92,0.24),transparent_24rem)]">
            <Image alt={`${active.name} robot`} className="object-cover transition duration-500" fill sizes="(max-width: 1024px) 100vw, 620px" src={active.image} />
            <div className="absolute left-5 top-5 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.64rem] font-black uppercase tracking-[0.18em] text-[var(--navy-deep)]">
              Unit {String(activeIndex + 1).padStart(2, "0")}
            </div>
          </div>

          <div className="relative">
            <div className="font-mono text-[0.7rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">{active.role}</div>
            <h3 className="font-display mt-4 text-[clamp(4rem,10vw,8rem)] font-black uppercase leading-[0.78] tracking-[-0.06em] text-[var(--cream)]">
              {active.name}
            </h3>
            <p className="mt-6 max-w-[32rem] text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.7)]">{active.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {active.stats.map((stat) => (
                <div className="rounded-2xl border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] p-4" key={stat.label}>
                  <div className="numeral text-[2.3rem] leading-none text-[var(--yellow)]">{stat.value}</div>
                  <div className="mt-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.52)]">{stat.label}</div>
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
                {robots.map((robot, index) => (
                  <button aria-label={`Pilih ${robot.name}`} className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-[var(--yellow)]" : "w-2.5 bg-[rgba(248,247,240,0.3)]"}`} key={robot.name} onClick={() => setActiveIndex(index)} type="button" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="surface-paper relative overflow-hidden py-20 sm:py-28">
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className={`relative mx-auto max-w-[1120px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`} ref={ref}>
        <div className="text-center">
          <div className="kicker kicker-centered">See the Difference</div>
          <h2 className="headline mx-auto mt-5 max-w-[11ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--navy-deep)]">
            More than a prototype.
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-[var(--rule)] bg-white/[0.82] shadow-[0_30px_80px_-58px_rgba(7,12,34,0.75)]">
          <div className="grid grid-cols-[1fr_0.7fr_0.7fr] bg-[var(--navy-deep)] text-[var(--cream)]">
            <div className="p-4 font-mono text-[0.7rem] font-black uppercase tracking-[0.18em] sm:p-5">Capability</div>
            <div className="bg-[var(--yellow)] p-4 text-center font-display text-[1.4rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)] sm:p-5">AROC_PL</div>
            <div className="p-4 text-center font-display text-[1.4rem] font-black uppercase leading-none tracking-[-0.03em] sm:p-5">Prototype</div>
          </div>
          {comparisonRows.map(([capability, aroc, generic]) => (
            <div className="grid grid-cols-[1fr_0.7fr_0.7fr] border-t border-[var(--rule)]" key={capability}>
              <div className="p-4 text-[0.95rem] font-semibold text-[var(--navy-deep)] sm:p-5">{capability}</div>
              <div className="grid place-items-center bg-[rgba(255,228,92,0.28)] p-4 font-mono text-[0.68rem] font-black uppercase tracking-[0.14em] text-[var(--navy-deep)] sm:p-5">{aroc}</div>
              <div className="grid place-items-center p-4 font-mono text-[0.68rem] font-black uppercase tracking-[0.14em] text-[var(--muted-dark)] sm:p-5">{generic}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsiderProof({ achievements, teamLead, teamStats, teamYears }: { achievements: Achievement[]; teamLead: TeamLead; teamStats: TeamStat[]; teamYears: TeamYear[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="surface-ink relative scroll-mt-24 overflow-hidden py-20 sm:py-28" id="team">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,228,92,0.12),transparent_28rem)]" aria-hidden="true" />
      <div className={`relative mx-auto max-w-[1240px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`} ref={ref}>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="kicker kicker-on-ink">Insider Proof</div>
            <h2 className="headline mt-5 max-w-[10ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--cream)]">
              People behind the machine.
            </h2>
          </div>
          <p className="max-w-[34rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.72)]">
            Dipimpin oleh {teamLead.name}, tim ini berisi {teamStats[0]?.value ?? "11+"} personel aktif dari {teamYears.length} angkatan yang mengubah jam lab menjadi hasil kompetisi.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-ink rounded-[2rem] p-6 sm:p-8">
            <div className="font-mono text-[0.7rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">Captain Quote</div>
            <blockquote className="font-display mt-6 text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[var(--cream)]">
              {teamLead.intro}
            </blockquote>
            <div className="mt-8 font-mono text-[0.72rem] font-black uppercase tracking-[0.2em] text-[rgba(248,247,240,0.56)]">{teamLead.name} / {teamLead.role}</div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {videoSlots.map((slot) => (
              <article className="group relative min-h-[26rem] overflow-hidden rounded-[2rem] border border-[rgba(248,247,240,0.14)] bg-[rgba(248,247,240,0.07)] p-5 backdrop-blur transition hover:-translate-y-2 hover:rotate-[-1deg]" key={slot}>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,228,92,0.12),transparent_45%,rgba(5,8,22,0.82))]" />
                <div className="relative z-10 flex h-full min-h-[23rem] flex-col justify-between">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--navy-deep)]">
                    <PlayIcon className="size-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">Video placeholder</div>
                    <h3 className="font-display mt-3 text-[2.3rem] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[var(--cream)]">{slot}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4" id="achievements">
          {achievements.map((achievement) => (
            <article className="rounded-[1.5rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] p-5" key={`${achievement.year}-${achievement.title}`}>
              <StarIcon className="size-5 text-[var(--yellow)]" />
              <div className="numeral mt-5 text-[3rem] leading-none text-[var(--yellow)]">{achievement.year}</div>
              <h3 className="font-display mt-3 text-[1.6rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--cream)]">{achievement.title}</h3>
              <p className="mt-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.48)]">{achievement.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignGallery({ gallery }: { gallery: GalleryItem[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="surface-paper relative scroll-mt-24 overflow-hidden py-20 sm:py-28" id="gallery">
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className={`relative mx-auto max-w-[1240px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`} ref={ref}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <div className="kicker">Lab Gallery</div>
            <h2 className="headline mt-5 max-w-[11ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--navy-deep)]">
              Real lab. Real iteration.
            </h2>
          </div>
          <p className="max-w-[32rem] text-[1.05rem] leading-[1.85] text-[var(--muted-dark)]">
            Visual kerja AROC_PL: prototipe, wiring, diskusi, dan dokumentasi proses yang nanti bisa ditambah video campaign.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:grid-rows-[280px_280px]">
          {gallery.map((item, index) => (
            <figure className={`${index === 0 ? "lg:col-span-7 lg:row-span-2" : index === 3 ? "lg:col-span-12" : "lg:col-span-5"} group relative min-h-[18rem] overflow-hidden rounded-[2rem] bg-[var(--navy-deep)]`} key={item.src}>
              <Image alt={item.alt} className="object-cover transition duration-[900ms] group-hover:scale-[1.06]" fill sizes="(max-width: 1024px) 100vw, 50vw" src={item.src} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,8,22,0.9))]" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[var(--cream)]">
                <div className="font-mono text-[0.64rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">Frame 0{index + 1}</div>
                <p className="mt-2 max-w-[34rem] text-[0.94rem] leading-[1.6] text-[rgba(248,247,240,0.78)]">{item.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorFinal() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="surface-ink campaign-shell relative scroll-mt-24 py-20 sm:py-28" id="sponsor">
      <div className={`relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`} ref={ref}>
        <div className="relative overflow-hidden rounded-[2.8rem] border border-[rgba(255,228,92,0.24)] bg-[rgba(17,26,61,0.7)] p-6 sm:p-10 lg:p-12">
          <DoodleArrow className="absolute right-8 top-8 hidden w-40 rotate-[-10deg] text-[var(--yellow)] lg:block" />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="mx-auto flex aspect-square w-full max-w-[25rem] items-center justify-center rounded-full bg-[var(--yellow)] p-8 shadow-[0_0_0_1rem_rgba(255,228,92,0.08)]">
              <ArocGeneratedMark className="h-full w-full max-w-[17rem]" />
            </div>
            <div>
              <div className="champ-badge-outline">Sponsor Call</div>
              <h2 className="headline mt-6 max-w-[11ch] text-[clamp(3.3rem,8vw,7rem)] text-[var(--cream)]">
                Back the team building them.
              </h2>
              <p className="mt-8 max-w-[36rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.74)]">
                Jangan cuma nonton robot. Dukung tim yang membangun, menguji, dan membawa nama Polinema ke arena robot humanoid nasional.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link className="btn-gold" href="mailto:hello@arocpl.com?subject=Kemitraan%20AROC_PL">
                  Mulai Kemitraan
                </Link>
                <Link className="btn-ghost-paper" href="/#gallery">
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
    <main className="relative">
      <CampaignHero hero={hero} />
      <CurvedMarquee />
      <EditorialIntro aboutCards={aboutCards} values={values} />
      <ScrollStory hero={hero} />
      <Benefits divisions={divisions} />
      <RobotLineup robots={robots} />
      <ComparisonTable />
      <InsiderProof achievements={achievements} teamLead={teamLead} teamStats={teamStats} teamYears={teamYears} />
      <CampaignGallery gallery={gallery} />
      <SponsorFinal />
    </main>
  );
}
