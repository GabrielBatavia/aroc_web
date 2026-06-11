"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
interface DivisionMember {
  name: string;
  role: string;
  image: string;
}

interface Division {
  id: string;
  label: string;
  shortLabel: string;
  color: string;
  colorRgb: string; // "r,g,b" for rgba()
  icon: string;     // emoji or SVG label
  members: DivisionMember[];
}

const divisions: Division[] = [
  {
    id: "ketua",
    label: "Ketua Tim",
    shortLabel: "Lead",
    color: "#ffe45c",
    colorRgb: "255,228,92",
    icon: "★",
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
    shortLabel: "Manager",
    color: "#f2c94c",
    colorRgb: "242,201,76",
    icon: "◈",
    members: [
      {
        name: "Hannunah Qiblatin",
        role: "Divisi Manager",
        image:
          "/images/KRSBI-H/2. Divisi Manager/Hannunah Qiblatin_Divisi Manager.JPG",
      },
      {
        name: "Naomi Phoan Alodia Edgina",
        role: "Divisi Manager",
        image:
          "/images/KRSBI-H/2. Divisi Manager/Naomi Phoan Alodia Edgina_Divisi Manager.JPG",
      },
    ],
  },
  {
    id: "image-processing",
    label: "Divisi Image Processing",
    shortLabel: "Vision",
    color: "#e8c53a",
    colorRgb: "232,197,58",
    icon: "◉",
    members: [
      {
        name: "Aprillo Firos Nugroho",
        role: "Image Processing",
        image:
          "/images/KRSBI-H/3. Divisi Image Processing/Aprillo Firos Nugroho_ Divisi Image Processing.jpeg",
      },
      {
        name: "Gabriel Batavia Xaverius",
        role: "Image Processing",
        image:
          "/images/KRSBI-H/3. Divisi Image Processing/Gabriel Batavia Xaverius_Divisi Image Processing.JPG",
      },
      {
        name: "Muh. Fatih Assayuti",
        role: "Image Processing",
        image:
          "/images/KRSBI-H/3. Divisi Image Processing/Muh. Fatih Assayuti_Divisi Image Processing.JPG",
      },
      {
        name: "Noor Ishmata Choirun Eilmi",
        role: "Image Processing",
        image:
          "/images/KRSBI-H/3. Divisi Image Processing/Noor Ishmata Choirun Eilmi_Divisi image processing.jpg",
      },
    ],
  },
  {
    id: "communication",
    label: "Divisi Communication",
    shortLabel: "Comms",
    color: "#7b93e8",
    colorRgb: "123,147,232",
    icon: "◎",
    members: [
      {
        name: "Alfarel Putra Ridho",
        role: "Communication",
        image:
          "/images/KRSBI-H/4.  Divisi Communication/Alfarel Putra Ridho _ Divisi Communication.JPG",
      },
      {
        name: "Fiqi Raihan Hubbi M.",
        role: "Communication",
        image:
          "/images/KRSBI-H/4.  Divisi Communication/Fiqi Raihan Hubbi M._Divisi Communication.JPG",
      },
      {
        name: "Muhammad Afifi",
        role: "Communication",
        image:
          "/images/KRSBI-H/4.  Divisi Communication/Muhammad Afifi_Divisi Communication.JPG",
      },
      {
        name: "Rio Zefa Artasena",
        role: "Communication",
        image:
          "/images/KRSBI-H/4.  Divisi Communication/Rio Zefa Artasena_Divisi Communication.JPG",
      },
    ],
  },
  {
    id: "maneuvering",
    label: "Divisi Maneuvering",
    shortLabel: "Motion",
    color: "#d9dde8",
    colorRgb: "217,221,232",
    icon: "⬡",
    members: [
      {
        name: "Adetin Dewi Cantika",
        role: "Maneuvering",
        image:
          "/images/KRSBI-H/5. Divisi Maneuvering/Adetin Dewi Cantika_Divisi Maneuvering.jpeg",
      },
      {
        name: "Ahmad Habibullah",
        role: "Maneuvering",
        image:
          "/images/KRSBI-H/5. Divisi Maneuvering/Ahmad Habibullah_Divisi Maneuvering.JPG",
      },
      {
        name: "Bayu Kurniawan",
        role: "Maneuvering",
        image:
          "/images/KRSBI-H/5. Divisi Maneuvering/Bayu Kurniawan_Divisi Maneuvering.jpg",
      },
      {
        name: "Gavra Ahmad Zidan",
        role: "Maneuvering",
        image:
          "/images/KRSBI-H/5. Divisi Maneuvering/Gavra Ahmad Zidan_Divisi Maneuvering.jpeg",
      },
      {
        name: "M. Lufyn Aulia Rahman",
        role: "Maneuvering",
        image:
          "/images/KRSBI-H/5. Divisi Maneuvering/M. Lufyn Aulia Rahman_Divisi Maneuvering.JPG",
      },
      {
        name: "M. Rizal Al Akbar",
        role: "Maneuvering",
        image:
          "/images/KRSBI-H/5. Divisi Maneuvering/M. Rizal Al Akbar_Divisi Maneuvering.JPG",
      },
      {
        name: "M. Ryan Hidayat",
        role: "Maneuvering",
        image:
          "/images/KRSBI-H/5. Divisi Maneuvering/M. Ryan Hidayat_Divisi Maneuvering.JPG",
      },
      {
        name: "M. Wisnu Hardiantoro",
        role: "Maneuvering",
        image:
          "/images/KRSBI-H/5. Divisi Maneuvering/M. Wisnu Hardiantoro_Divisi Maneuvering.JPG",
      },
      {
        name: "Rendy Eko Pastyo",
        role: "Maneuvering",
        image:
          "/images/KRSBI-H/5. Divisi Maneuvering/Rendy Eko Pastyo_Divisi Maneuvering.JPG",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════
   MEMBER CARD — Cinematic 3D Tilt + Layered
═══════════════════════════════════════════════ */
function MemberCard({
  member,
  division,
  index,
  isVisible,
}: {
  member: DivisionMember;
  division: Division;
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const scanRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const onMouseEnter = () => {
    setIsHovered(true);
    // scan line animation
    let progress = 0;
    scanRef.current = setInterval(() => {
      progress += 2;
      setScanProgress(progress);
      if (progress >= 110) {
        if (scanRef.current) clearInterval(scanRef.current);
        setScanProgress(0);
      }
    }, 12);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    if (scanRef.current) clearInterval(scanRef.current);
    setScanProgress(0);
  };

  const cardNumber = String(index + 1).padStart(2, "0");

  return (
    <article
      className="shrink-0 select-none"
      style={{
        width: "clamp(260px, 28vw, 320px)",
        scrollSnapAlign: "start",
        // stagger entrance
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : "translateY(40px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
      }}
    >
      {/* ── 3D perspective wrapper ── */}
      <div
        ref={cardRef}
        style={{
          perspective: "900px",
          cursor: "pointer",
        }}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* ── Card shell (3D tilt) ── */}
        <div
          style={{
            position: "relative",
            height: "clamp(360px, 42vw, 440px)",
            borderRadius: "1.75rem",
            overflow: "hidden",
            transform: isHovered
              ? `rotateY(${tilt.x * 12}deg) rotateX(${-tilt.y * 10}deg) scale(1.04) translateZ(0)`
              : "rotateY(0deg) rotateX(0deg) scale(1) translateZ(0)",
            transition: isHovered
              ? "transform 0.12s ease-out, box-shadow 0.4s ease"
              : "transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s ease",
            boxShadow: isHovered
              ? `0 40px 80px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(${division.colorRgb},0.5), 0 0 60px -10px rgba(${division.colorRgb},0.25)`
              : `0 16px 48px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(${division.colorRgb},0.12)`,
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── LAYER 1: Photo ── */}
          <Image
            alt={member.name}
            src={encodeURI(member.image)}
            fill
            sizes="(max-width: 768px) 90vw, 320px"
            className="object-cover object-top"
            style={{
              transform: isHovered
                ? `scale(1.08) translate(${tilt.x * -6}px, ${tilt.y * -4}px)`
                : "scale(1) translate(0,0)",
              transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* ── LAYER 2: Dark gradient (bottom-heavy) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(3,6,16,0.1) 0%, rgba(3,6,16,0.2) 40%, rgba(3,6,16,0.88) 72%, rgba(3,6,16,0.97) 100%)",
            }}
          />

          {/* ── LAYER 3: Colored radial glow (bottom bloom) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 90% 55% at 50% 110%, rgba(${division.colorRgb},0.38) 0%, transparent 65%)`,
              opacity: isHovered ? 1 : 0.45,
              transition: "opacity 0.45s ease",
            }}
          />

          {/* ── LAYER 4: Top-left corner shimmer on hover ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at ${15 + tilt.x * 20}% ${15 + tilt.y * 20}%, rgba(${division.colorRgb},0.15) 0%, transparent 45%)`,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />

          {/* ── LAYER 5: Scan line sweep on hover enter ── */}
          {scanProgress > 0 && scanProgress < 105 && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${scanProgress}%`,
                height: "2px",
                background: `linear-gradient(90deg, transparent, rgba(${division.colorRgb},0.8), transparent)`,
                boxShadow: `0 0 12px 4px rgba(${division.colorRgb},0.4)`,
                pointerEvents: "none",
              }}
            />
          )}

          {/* ── LAYER 6: Accent top bar ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: isHovered ? "3px" : "2px",
              background: division.color,
              boxShadow: isHovered
                ? `0 0 20px 4px rgba(${division.colorRgb},0.7)`
                : "none",
              transition: "height 0.3s ease, box-shadow 0.3s ease",
            }}
          />

          {/* ── LAYER 7: Grid overlay (subtle tech feel) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(${division.colorRgb},0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(${division.colorRgb},0.04) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              maskImage:
                "linear-gradient(to bottom, transparent 30%, black 60%)",
              opacity: isHovered ? 0.6 : 0.25,
              transition: "opacity 0.45s ease",
            }}
          />

          {/* ── TOP UI: Number badge + role tag ── */}
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              right: "1rem",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            {/* Large number */}
            <div
              style={{
                fontFamily: "var(--font-display), Impact, sans-serif",
                fontSize: "3.5rem",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.06em",
                color: `rgba(${division.colorRgb},${isHovered ? 0.9 : 0.3})`,
                transition: "color 0.4s ease",
                textShadow: isHovered
                  ? `0 0 24px rgba(${division.colorRgb},0.6)`
                  : "none",
              }}
            >
              {cardNumber}
            </div>

            {/* Role pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.7rem",
                borderRadius: "999px",
                background: `rgba(3,6,16,0.7)`,
                border: `1px solid rgba(${division.colorRgb},${isHovered ? 0.5 : 0.2})`,
                backdropFilter: "blur(12px)",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.55rem",
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: division.color,
                transition: "border-color 0.35s ease",
              }}
            >
              <span style={{ opacity: 0.6 }}>{division.icon}</span>
              {division.shortLabel}
            </div>
          </div>

          {/* ── BOTTOM: Name plate (glass morphism) ── */}
          <div
            style={{
              position: "absolute",
              inset: "auto 0 0 0",
              padding: "0 1.4rem 1.4rem",
              transform: isHovered ? "translateY(0)" : "translateY(6px)",
              transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Glass card */}
            <div
              style={{
                borderRadius: "1.1rem",
                border: `1px solid rgba(${division.colorRgb},${isHovered ? 0.3 : 0.12})`,
                background: "rgba(3,6,16,0.55)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                padding: "1rem 1.1rem",
                transition: "border-color 0.35s ease",
              }}
            >
              <h4
                style={{
                  fontFamily:
                    "var(--font-display), Impact, 'Arial Narrow', sans-serif",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.55rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "var(--cream)",
                  margin: 0,
                }}
              >
                {member.name}
              </h4>

              {/* Accent underline */}
              <div
                style={{
                  marginTop: "0.5rem",
                  height: "1px",
                  background: `linear-gradient(to right, rgba(${division.colorRgb},${isHovered ? 0.8 : 0.35}), transparent)`,
                  transition: "background 0.4s ease",
                }}
              />

              <div
                style={{
                  marginTop: "0.5rem",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "0.6rem",
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: division.color,
                  opacity: isHovered ? 1 : 0.65,
                  transition: "opacity 0.35s ease",
                }}
              >
                {member.role}
              </div>
            </div>
          </div>

          {/* ── LAYER 8: Corner accent glow (bottom-right) ── */}
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "-20px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: `rgba(${division.colorRgb},0.15)`,
              filter: "blur(30px)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.45s ease",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════
   DIVISION ROW — Draggable Carousel
═══════════════════════════════════════════════ */
function DivisionRow({
  division,
  index,
}: {
  division: Division;
  index: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStartX = useRef(0);
  const hasDragged = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { ref: rowRef, isVisible } = useScrollReveal({ threshold: 0.08 });

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

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    scrollStartX.current = trackRef.current?.scrollLeft ?? 0;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollStartX.current - dx;
    }
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({
      left: dir * 340,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={rowRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
      }}
    >
      {/* ── Section anchor ── */}
      <div id={`div-${division.id}`} style={{ scrollMarginTop: "6rem" }} />

      {/* ── Division Header ── */}
      <div
        style={{
          padding: "0 clamp(1rem, 4vw, 2rem)",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Left: label + count */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
          {/* Icon badge */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.8rem",
              height: "2.8rem",
              borderRadius: "0.85rem",
              background: `rgba(${division.colorRgb},0.12)`,
              border: `1px solid rgba(${division.colorRgb},0.28)`,
              fontSize: "1.1rem",
              lineHeight: 1,
              color: division.color,
            }}
          >
            {division.icon}
          </div>

          <div>
            <h3
              style={{
                fontFamily:
                  "var(--font-display), Impact, 'Arial Narrow', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "var(--cream)",
                margin: 0,
              }}
            >
              {division.label}
            </h3>
            <div
              style={{
                marginTop: "0.3rem",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.6rem",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: division.color,
                opacity: 0.75,
              }}
            >
              {division.members.length}{" "}
              {division.members.length === 1 ? "anggota" : "anggota"}
            </div>
          </div>
        </div>

        {/* Right: Arrow buttons */}
        {division.members.length > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            {[
              { dir: -1, disabled: !canScrollLeft, label: "Kiri" },
              { dir: 1, disabled: !canScrollRight, label: "Kanan" },
            ].map(({ dir, disabled, label }) => (
              <button
                key={dir}
                aria-label={`Geser ${label}`}
                disabled={disabled}
                onClick={() => scroll(dir)}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.6rem",
                  height: "2.6rem",
                  borderRadius: "50%",
                  border: `1px solid rgba(${division.colorRgb},${disabled ? 0.1 : 0.3})`,
                  background: `rgba(${division.colorRgb},${disabled ? 0.03 : 0.08})`,
                  color: disabled ? "rgba(248,247,240,0.25)" : division.color,
                  cursor: disabled ? "default" : "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                <svg fill="none" viewBox="0 0 20 20" width="16">
                  {dir === -1 ? (
                    <path
                      d="M12 15l-5-5 5-5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.2"
                    />
                  ) : (
                    <path
                      d="M8 5l5 5-5 5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.2"
                    />
                  )}
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Scroll track ── */}
      <div style={{ position: "relative" }}>
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "5rem",
            zIndex: 10,
            pointerEvents: "none",
            background:
              "linear-gradient(to right, var(--navy-deep) 0%, transparent 100%)",
            opacity: canScrollLeft ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "5rem",
            zIndex: 10,
            pointerEvents: "none",
            background:
              "linear-gradient(to left, var(--navy-deep) 0%, transparent 100%)",
            opacity: canScrollRight && division.members.length > 1 ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* Scrollable track */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            display: "flex",
            gap: "1.25rem",
            overflowX: "auto",
            paddingLeft: "clamp(1rem, 4vw, 2rem)",
            paddingRight: "clamp(1rem, 4vw, 2rem)",
            paddingBottom: "1.5rem",
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            cursor: isDragging.current ? "grabbing" : "grab",
          } as CSSProperties}
        >
          {division.members.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              division={division}
              index={i}
              isVisible={isVisible}
            />
          ))}
          {/* End spacer */}
          <div style={{ width: "0.5rem", flexShrink: 0 }} />
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        style={{
          margin: "0 clamp(1rem, 4vw, 2rem)",
          marginTop: "0.5rem",
          height: "1px",
          background: `linear-gradient(to right, rgba(${division.colorRgb},0.4) 0%, rgba(${division.colorRgb},0.08) 40%, transparent 100%)`,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export function DivisionGallery() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const totalMembers = divisions.reduce(
    (acc, d) => acc + d.members.length,
    0
  );

  return (
    <section
      id="division-gallery"
      style={{ position: "relative", overflow: "hidden", background: "var(--navy-deep)", padding: "5rem 0 6rem" }}
    >
      {/* ── BG: dot grid ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, rgba(255,228,92,0.045) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* ── BG: ambient orbs ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 55% 35% at 85% 15%, rgba(255,228,92,0.09), transparent 60%), radial-gradient(ellipse 45% 55% at 12% 75%, rgba(42,61,130,0.22), transparent 60%)",
        }}
      />

      {/* ── BG: giant ghost text ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "2%",
          right: "-3%",
          pointerEvents: "none",
          userSelect: "none",
          fontFamily:
            "var(--font-display), Impact, 'Arial Narrow', sans-serif",
          fontSize: "clamp(7rem, 24vw, 20rem)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.06em",
          lineHeight: 1,
          color: "rgba(248,247,240,0.022)",
        }}
      >
        KRSBI
      </div>

      {/* ══ HEADER ══ */}
      <div
        ref={headerRef}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 2rem)",
          marginBottom: "4rem",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Top row: kicker + stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div className="kicker kicker-on-ink">Galeri Divisi KRSBI-H</div>

          {/* Stat chips */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {[
              { value: `${totalMembers}`, label: "Anggota" },
              { value: `${divisions.length}`, label: "Divisi" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,228,92,0.18)",
                  background: "rgba(255,228,92,0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-display), Impact, sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "var(--yellow)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "0.56rem",
                    fontWeight: 900,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(248,247,240,0.45)",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main headline */}
        <h2
          style={{
            fontFamily:
              "var(--font-display), Impact, 'Arial Narrow', sans-serif",
            fontSize: "clamp(3rem, 8.5vw, 7rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            color: "var(--cream)",
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          Orang-orang di balik{" "}
          <span
            style={{
              color: "var(--yellow)",
              textShadow: "0.04em 0.05em 0 var(--navy-black)",
            }}
          >
            setiap divisi.
          </span>
        </h2>

        <p
          style={{
            marginTop: "1.25rem",
            maxWidth: "36rem",
            fontSize: "1rem",
            lineHeight: 1.85,
            color: "rgba(248,247,240,0.5)",
          }}
        >
          Hover kartu untuk melihat efek 3D. Geser atau drag untuk menjelajahi
          semua anggota per divisi.
        </p>

        {/* Division jump pills */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {divisions.map((div) => (
            <a
              key={div.id}
              href={`#div-${div.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.4rem 0.9rem",
                borderRadius: "999px",
                border: `1px solid rgba(${div.colorRgb},0.3)`,
                background: `rgba(${div.colorRgb},0.07)`,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.62rem",
                fontWeight: 900,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: div.color,
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
            >
              <span style={{ opacity: 0.65, fontSize: "0.8em" }}>
                {div.icon}
              </span>
              {div.shortLabel}
            </a>
          ))}
        </div>
      </div>

      {/* ══ DIVISION ROWS ══ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        {divisions.map((div, i) => (
          <DivisionRow key={div.id} division={div} index={i} />
        ))}
      </div>
    </section>
  );
}
