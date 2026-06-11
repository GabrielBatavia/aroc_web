"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Data ─── */
interface DivisionMember {
  name: string;
  role: string;
  image: string;
}

interface Division {
  id: string;
  label: string;
  color: string;
  members: DivisionMember[];
}

const divisions: Division[] = [
  {
    id: "ketua",
    label: "Ketua Tim",
    color: "#ffe45c",
    members: [
      {
        name: "Fasha Rafi Islamey",
        role: "Ketua Tim",
        image: "/images/KRSBI-H/1. Ketua Tim/Fasha Rafi Islamey_Ketua Tim.JPG",
      },
    ],
  },
  {
    id: "manager",
    label: "Divisi Manager",
    color: "#f2c94c",
    members: [
      {
        name: "Hannunah Qiblatin",
        role: "Divisi Manager",
        image: "/images/KRSBI-H/2. Divisi Manager/Hannunah Qiblatin_Divisi Manager.JPG",
      },
      {
        name: "Naomi Phoan Alodia Edgina",
        role: "Divisi Manager",
        image: "/images/KRSBI-H/2. Divisi Manager/Naomi Phoan Alodia Edgina_Divisi Manager.JPG",
      },
    ],
  },
  {
    id: "image-processing",
    label: "Divisi Image Processing",
    color: "#c79820",
    members: [
      {
        name: "Aprillo Firos Nugroho",
        role: "Divisi Image Processing",
        image: "/images/KRSBI-H/3. Divisi Image Processing/Aprillo Firos Nugroho_ Divisi Image Processing.jpeg",
      },
      {
        name: "Gabriel Batavia Xaverius",
        role: "Divisi Image Processing",
        image: "/images/KRSBI-H/3. Divisi Image Processing/Gabriel Batavia Xaverius_Divisi Image Processing.JPG",
      },
      {
        name: "Muh. Fatih Assayuti",
        role: "Divisi Image Processing",
        image: "/images/KRSBI-H/3. Divisi Image Processing/Muh. Fatih Assayuti_Divisi Image Processing.JPG",
      },
      {
        name: "Noor Ishmata Choirun Eilmi",
        role: "Divisi Image Processing",
        image: "/images/KRSBI-H/3. Divisi Image Processing/Noor Ishmata Choirun Eilmi_Divisi image processing.jpg",
      },
    ],
  },
  {
    id: "communication",
    label: "Divisi Communication",
    color: "#2a3d82",
    members: [
      {
        name: "Alfarel Putra Ridho",
        role: "Divisi Communication",
        image: "/images/KRSBI-H/4.  Divisi Communication/Alfarel Putra Ridho _ Divisi Communication.JPG",
      },
      {
        name: "Fiqi Raihan Hubbi M.",
        role: "Divisi Communication",
        image: "/images/KRSBI-H/4.  Divisi Communication/Fiqi Raihan Hubbi M._Divisi Communication.JPG",
      },
      {
        name: "Muhammad Afifi",
        role: "Divisi Communication",
        image: "/images/KRSBI-H/4.  Divisi Communication/Muhammad Afifi_Divisi Communication.JPG",
      },
      {
        name: "Rio Zefa Artasena",
        role: "Divisi Communication",
        image: "/images/KRSBI-H/4.  Divisi Communication/Rio Zefa Artasena_Divisi Communication.JPG",
      },
    ],
  },
  {
    id: "maneuvering",
    label: "Divisi Maneuvering",
    color: "#d9dde8",
    members: [
      {
        name: "Adetin Dewi Cantika",
        role: "Divisi Maneuvering",
        image: "/images/KRSBI-H/5. Divisi Maneuvering/Adetin Dewi Cantika_Divisi Maneuvering.jpeg",
      },
      {
        name: "Ahmad Habibullah",
        role: "Divisi Maneuvering",
        image: "/images/KRSBI-H/5. Divisi Maneuvering/Ahmad Habibullah_Divisi Maneuvering.JPG",
      },
      {
        name: "Bayu Kurniawan",
        role: "Divisi Maneuvering",
        image: "/images/KRSBI-H/5. Divisi Maneuvering/Bayu Kurniawan_Divisi Maneuvering.jpg",
      },
      {
        name: "Gavra Ahmad Zidan",
        role: "Divisi Maneuvering",
        image: "/images/KRSBI-H/5. Divisi Maneuvering/Gavra Ahmad Zidan_Divisi Maneuvering.jpeg",
      },
      {
        name: "M. Lufyn Aulia Rahman",
        role: "Divisi Maneuvering",
        image: "/images/KRSBI-H/5. Divisi Maneuvering/M. Lufyn Aulia Rahman_Divisi Maneuvering.JPG",
      },
      {
        name: "M. Rizal Al Akbar",
        role: "Divisi Maneuvering",
        image: "/images/KRSBI-H/5. Divisi Maneuvering/M. Rizal Al Akbar_Divisi Maneuvering.JPG",
      },
      {
        name: "M. Ryan Hidayat",
        role: "Divisi Maneuvering",
        image: "/images/KRSBI-H/5. Divisi Maneuvering/M. Ryan Hidayat_Divisi Maneuvering.JPG",
      },
      {
        name: "M. Wisnu Hardiantoro",
        role: "Divisi Maneuvering",
        image: "/images/KRSBI-H/5. Divisi Maneuvering/M. Wisnu Hardiantoro_Divisi Maneuvering.JPG",
      },
      {
        name: "Rendy Eko Pastyo",
        role: "Divisi Maneuvering",
        image: "/images/KRSBI-H/5. Divisi Maneuvering/Rendy Eko Pastyo_Divisi Maneuvering.JPG",
      },
    ],
  },
];

/* ─── Single Member Card ─── */
function MemberCard({ member, accentColor }: { member: DivisionMember; accentColor: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative shrink-0 cursor-pointer select-none"
      style={{ width: "220px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card shell */}
      <div
        className="relative overflow-hidden rounded-[1.6rem] transition-all duration-500"
        style={{
          height: "300px",
          boxShadow: hovered
            ? `0 28px 60px -20px rgba(0,0,0,0.8), 0 0 0 1px ${accentColor}55`
            : "0 12px 40px -20px rgba(0,0,0,0.55)",
          transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease",
        }}
      >
        {/* Photo */}
        <Image
          alt={member.name}
          className="object-cover object-top"
          fill
          sizes="220px"
          src={member.image}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(180deg, transparent 35%, rgba(3,6,16,0.97) 100%)`,
            opacity: hovered ? 1 : 0.85,
          }}
        />

        {/* Accent glow on hover */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${accentColor}22, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Accent top stripe */}
        <div
          className="absolute inset-x-0 top-0 h-1 transition-all duration-500"
          style={{
            background: accentColor,
            opacity: hovered ? 1 : 0.4,
            boxShadow: hovered ? `0 0 16px 2px ${accentColor}88` : "none",
          }}
        />

        {/* Name / Role */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h4
            className="font-display font-black uppercase leading-none tracking-[-0.03em] text-[var(--cream)] transition-all duration-300"
            style={{
              fontSize: "1.3rem",
              transform: hovered ? "translateY(0)" : "translateY(2px)",
            }}
          >
            {member.name}
          </h4>
          <div
            className="mt-2 font-mono text-[0.6rem] font-black uppercase tracking-[0.18em] transition-all duration-300"
            style={{
              color: accentColor,
              opacity: hovered ? 1 : 0.7,
            }}
          >
            {member.role}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Division Carousel Row ─── */
function DivisionRow({ division, index }: { division: Division; index: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { ref: rowRef, isVisible } = useScrollReveal();

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  /* ── Drag to scroll ── */
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollLeft.current - dx;
    }
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={rowRef}
      className={`reveal-base ${isVisible ? "revealed" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Division header */}
      <div className={`mb-6 flex items-center justify-between px-4 sm:px-8 ${isEven ? "" : "flex-row-reverse"}`}>
        <div className={`flex items-center gap-4 ${isEven ? "" : "flex-row-reverse"}`}>
          {/* Accent dot + label */}
          <div
            className="flex size-3 shrink-0 rounded-full"
            style={{ background: division.color, boxShadow: `0 0 10px 2px ${division.color}66` }}
          />
          <h3
            className="font-display font-black uppercase tracking-[-0.03em] text-[var(--cream)]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
          >
            {division.label}
          </h3>
          <span
            className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em]"
            style={{ color: division.color }}
          >
            {division.members.length} {division.members.length === 1 ? "anggota" : "anggota"}
          </span>
        </div>

        {/* Nav arrows */}
        {division.members.length > 1 && (
          <div className="flex gap-2">
            <button
              aria-label="Geser kiri"
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(248,247,240,0.14)] bg-[rgba(248,247,240,0.05)] text-[var(--cream)] transition hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(255,228,92,0.08)] hover:text-[var(--yellow)] disabled:opacity-25"
              disabled={!canScrollLeft}
              onClick={() => scroll(-1)}
              type="button"
            >
              <svg fill="none" viewBox="0 0 20 20" width="18">
                <path d="M12 15l-5-5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
            <button
              aria-label="Geser kanan"
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(248,247,240,0.14)] bg-[rgba(248,247,240,0.05)] text-[var(--cream)] transition hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(255,228,92,0.08)] hover:text-[var(--yellow)] disabled:opacity-25"
              disabled={!canScrollRight}
              onClick={() => scroll(1)}
              type="button"
            >
              <svg fill="none" viewBox="0 0 20 20" width="18">
                <path d="M8 5l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Scrollable card track */}
      <div className="relative">
        {/* Left fade mask */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to right, var(--navy-deep), transparent)",
            opacity: canScrollLeft ? 1 : 0,
          }}
        />
        {/* Right fade mask */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to left, var(--navy-deep), transparent)",
            opacity: canScrollRight && division.members.length > 1 ? 1 : 0,
          }}
        />

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto px-4 pb-6 sm:px-8"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: isDragging.current ? "grabbing" : "grab",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {division.members.map((member) => (
            <div key={member.name} style={{ scrollSnapAlign: "start" }}>
              <MemberCard member={member} accentColor={division.color} />
            </div>
          ))}

          {/* Spacer at end */}
          <div className="w-4 shrink-0" />
        </div>
      </div>

      {/* Divider line */}
      <div
        className="mx-4 mt-4 sm:mx-8"
        style={{
          height: "1px",
          background: `linear-gradient(to right, ${division.color}33, rgba(248,247,240,0.06), transparent)`,
        }}
      />
    </div>
  );
}

/* ─── Main export ─── */
export function DivisionGallery() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section
      id="division-gallery"
      className="relative overflow-hidden bg-[var(--navy-deep)] py-20 sm:py-28"
    >
      {/* Background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, rgba(255,228,92,0.04) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(255,228,92,0.07), transparent 55%), radial-gradient(ellipse 50% 60% at 10% 80%, rgba(42,61,130,0.2), transparent)",
        }}
      />

      {/* Giant background text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[5%] top-[2%] select-none font-display font-black uppercase leading-none text-[var(--cream)] opacity-[0.025]"
        style={{ fontSize: "clamp(6rem, 22vw, 18rem)", letterSpacing: "-0.06em" }}
      >
        KRSBI
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className={`relative z-10 mx-auto mb-16 max-w-[1280px] px-4 sm:px-8 reveal-base reveal-up ${headerVisible ? "revealed" : ""}`}
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="kicker kicker-on-ink">Galeri Divisi</div>
            <h2
              className="headline mt-5 text-[var(--cream)]"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              Orang-orang di balik{" "}
              <span style={{ color: "var(--yellow)" }}>setiap divisi.</span>
            </h2>
          </div>
          <p className="max-w-[30rem] pb-2 text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.55)] lg:text-right">
            {divisions.reduce((acc, d) => acc + d.members.length, 0)} anggota terbagi dalam{" "}
            {divisions.length} divisi. Geser kartu untuk melihat seluruh tim.
          </p>
        </div>

        {/* Division tab pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {divisions.map((div) => (
            <a
              href={`#div-${div.id}`}
              key={div.id}
              className="rounded-full border px-4 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: `${div.color}44`,
                background: `${div.color}0d`,
                color: div.color,
              }}
            >
              {div.label}
            </a>
          ))}
        </div>
      </div>

      {/* Division rows */}
      <div className="relative z-10 flex flex-col gap-12">
        {divisions.map((div, i) => (
          <div id={`div-${div.id}`} key={div.id}>
            <DivisionRow division={div} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
