"use client";

import Image from "next/image";
import {
  useCallback,
  useRef,
  useState,
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
  colorRgb: string;
  icon: string;
  members: DivisionMember[];
}

const DIVISIONS: Division[] = [
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
    color: "#c8ccd8",
    colorRgb: "200,204,216",
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
   3D CARD POSITION COMPUTATION
   offset = cardIndex - activeIndex
   0  = active/front center
   ±1 = near, slightly behind
   ±2 = far,  deeper behind
═══════════════════════════════════════════════ */
function computeCarouselStyle(offset: number): CSSProperties {
  const abs = Math.abs(offset);

  if (abs > 2) {
    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      opacity: 0,
      pointerEvents: "none",
      zIndex: 0,
      transform: "translateX(-50%) translateY(-50%) scale(0.5)",
      transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
    };
  }

  const sign = offset > 0 ? 1 : offset < 0 ? -1 : 0;

  // Per-depth configuration
  const cfg = [
    // abs=0 — active center
    { x: 0,          zDepth: 0,    rotY: 0,           scale: 1,    opacity: 1,    zi: 30, filter: "none" },
    // abs=1 — near side cards
    { x: sign * 192, zDepth: -70,  rotY: sign * -14,  scale: 0.80, opacity: 0.68, zi: 20, filter: "none" },
    // abs=2 — far side cards
    { x: sign * 320, zDepth: -160, rotY: sign * -25,  scale: 0.62, opacity: 0.36, zi: 10, filter: "blur(1.5px)" },
  ][abs];

  return {
    position: "absolute",
    left: "50%",
    top: "50%",
    opacity: cfg.opacity,
    zIndex: cfg.zi,
    pointerEvents: "auto",
    cursor: abs === 0 ? "default" : "pointer",
    filter: cfg.filter,
    transform: `translateX(calc(-50% + ${cfg.x}px)) translateY(-50%) translateZ(${cfg.zDepth}px) rotateY(${cfg.rotY}deg) scale(${cfg.scale})`,
    transition: "all 0.72s cubic-bezier(0.22,1,0.36,1)",
    willChange: "transform, opacity",
  };
}

/* ═══════════════════════════════════════════════
   DECK CARD  — cinematic + 3D micro-tilt
═══════════════════════════════════════════════ */
function DeckCard({
  member,
  division,
  offset,
  memberIndex,
  onClickToFocus,
}: {
  member: DivisionMember;
  division: Division;
  offset: number;
  memberIndex: number;
  onClickToFocus: () => void;
}) {
  const isActive = offset === 0;
  const innerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isActive) return;
    const rect = innerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const num = String(memberIndex + 1).padStart(2, "0");

  return (
    <div
      style={computeCarouselStyle(offset)}
      onClick={() => { if (!isActive) onClickToFocus(); }}
      aria-hidden={!isActive}
    >
      {/* ── Inner card shell (micro-tilt) ── */}
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        style={{
          width: "clamp(270px, 30vw, 320px)",
          height: "clamp(370px, 45vw, 450px)",
          borderRadius: "2rem",
          overflow: "hidden",
          position: "relative",
          transform:
            isActive && hovered
              ? `rotateX(${-tilt.y * 10}deg) rotateY(${tilt.x * 10}deg)`
              : "rotateX(0) rotateY(0)",
          transition:
            isActive && hovered
              ? "transform 0.12s ease-out, box-shadow 0.4s ease"
              : "transform 0.65s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease",
          boxShadow: isActive
            ? `0 48px 96px -24px rgba(0,0,0,0.95), 0 0 0 1px rgba(${division.colorRgb},0.5), 0 0 60px -12px rgba(${division.colorRgb},0.3)`
            : `0 16px 44px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(${division.colorRgb},0.1)`,
        }}
      >
        {/* ── L1: Photo ── */}
        <Image
          alt={member.name}
          src={encodeURI(member.image)}
          fill
          priority={isActive}
          sizes="(max-width:768px) 90vw, 320px"
          className="object-cover object-top"
          style={{
            transform:
              isActive && hovered
                ? `scale(1.08) translate(${tilt.x * -7}px, ${tilt.y * -5}px)`
                : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* ── L2: Dark cinematic gradient ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(3,6,16,0.06) 0%, rgba(3,6,16,0.2) 38%, rgba(3,6,16,0.88) 68%, rgba(3,6,16,0.98) 100%)",
          }}
        />

        {/* ── L3: Color bloom from bottom ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 90% 58% at 50% 115%, rgba(${division.colorRgb},0.5), transparent 66%)`,
            opacity: isActive ? 0.9 : 0.4,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* ── L4: Mouse-follow shimmer (active + hovered only) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${50 + tilt.x * 35}% ${25 + tilt.y * 25}%, rgba(${division.colorRgb},0.15), transparent 52%)`,
            opacity: isActive && hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* ── L5: Accent top bar + glow ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: isActive ? "3px" : "1.5px",
            background: division.color,
            boxShadow: isActive
              ? `0 0 22px 5px rgba(${division.colorRgb},0.65)`
              : "none",
            transition: "height 0.4s ease, box-shadow 0.4s ease",
          }}
        />

        {/* ── L6: Subtle tech grid ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(${division.colorRgb},0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(${division.colorRgb},0.06) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
            maskImage:
              "linear-gradient(to bottom, transparent 25%, black 58%)",
            opacity: isActive ? 0.45 : 0.15,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* ── L7: Corner glow (bottom-right ambient) ── */}
        <div
          style={{
            position: "absolute",
            bottom: -24,
            right: -24,
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: `rgba(${division.colorRgb},0.18)`,
            filter: "blur(36px)",
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
        />

        {/* ── TOP UI ── */}
        <div
          style={{
            position: "absolute",
            top: "1.1rem",
            left: "1.2rem",
            right: "1.2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Large member number */}
          <span
            style={{
              fontFamily:
                "var(--font-display), Impact, 'Arial Narrow', sans-serif",
              fontSize: "3.6rem",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.07em",
              color: `rgba(${division.colorRgb},${isActive ? 0.9 : 0.28})`,
              textShadow: isActive
                ? `0 0 28px rgba(${division.colorRgb},0.55)`
                : "none",
              transition: "all 0.45s ease",
            }}
          >
            {num}
          </span>

          {/* Role chip */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.3rem 0.7rem",
              borderRadius: "999px",
              background: "rgba(3,6,16,0.75)",
              border: `1px solid rgba(${division.colorRgb},${isActive ? 0.38 : 0.14})`,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.51rem",
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: division.color,
              transition: "border-color 0.4s ease",
            }}
          >
            <span style={{ opacity: 0.7 }}>{division.icon}</span>
            {division.shortLabel}
          </div>
        </div>

        {/* ── BOTTOM NAMEPLATE (glassmorphism) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 1.2rem 1.2rem",
            transform:
              isActive && hovered ? "translateY(0)" : "translateY(6px)",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            style={{
              borderRadius: "1.25rem",
              border: `1px solid rgba(${division.colorRgb},${isActive ? 0.32 : 0.1})`,
              background: "rgba(3,6,16,0.6)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              padding: "1rem 1.1rem",
              transition: "border-color 0.4s ease",
            }}
          >
            <h4
              style={{
                fontFamily:
                  "var(--font-display), Impact, 'Arial Narrow', sans-serif",
                fontSize: "clamp(1.1rem, 2.4vw, 1.45rem)",
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

            <div
              style={{
                marginTop: "0.45rem",
                height: "1px",
                background: `linear-gradient(to right, rgba(${division.colorRgb},${isActive ? 0.7 : 0.3}), transparent)`,
                transition: "background 0.4s ease",
              }}
            />

            <div
              style={{
                marginTop: "0.45rem",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.57rem",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: division.color,
                opacity: isActive ? 1 : 0.55,
                transition: "opacity 0.4s ease",
              }}
            >
              {member.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DIVISION STAGE — 3D stacked deck carousel
═══════════════════════════════════════════════ */
function DivisionStage({ division }: { division: Division }) {
  const [activeCard, setActiveCard] = useState({ divisionId: division.id, index: 0 });
  const dragStartX = useRef(0);
  const totalCards = division.members.length;
  const activeCardIdx = activeCard.divisionId === division.id ? activeCard.index : 0;

  const goPrev = useCallback(() => {
    setActiveCard((card) => {
      const current = card.divisionId === division.id ? card.index : 0;
      return { divisionId: division.id, index: (current - 1 + totalCards) % totalCards };
    });
  }, [division.id, totalCards]);

  const goNext = useCallback(() => {
    setActiveCard((card) => {
      const current = card.divisionId === division.id ? card.index : 0;
      return { divisionId: division.id, index: (current + 1) % totalCards };
    });
  }, [division.id, totalCards]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 55) {
        if (dx < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  // Normalized circular offset
  const getOffset = (i: number) => {
    let off = i - activeCardIdx;
    if (off > Math.floor(totalCards / 2)) off -= totalCards;
    if (off < -Math.ceil(totalCards / 2)) off += totalCards;
    return off;
  };

  return (
    <div>
      {/* 3D Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{
          position: "relative",
          height: "clamp(430px, 54vw, 530px)",
          perspective: "1100px",
          perspectiveOrigin: "50% 50%",
          userSelect: "none",
          touchAction: "pan-y",
          cursor: totalCards > 1 ? "grab" : "default",
        }}
      >
        {division.members.map((member, i) => (
          <DeckCard
            key={member.name}
            member={member}
            division={division}
            offset={getOffset(i)}
            memberIndex={i}
            onClickToFocus={() => setActiveCard({ divisionId: division.id, index: i })}
          />
        ))}
      </div>

      {/* Pagination dots */}
      {totalCards > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1.75rem",
          }}
        >
          {division.members.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Anggota ${i + 1}`}
              onClick={() => setActiveCard({ divisionId: division.id, index: i })}
              style={{
                width: activeCardIdx === i ? "2rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "999px",
                background:
                  activeCardIdx === i
                    ? division.color
                    : `rgba(${division.colorRgb},0.22)`,
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                boxShadow:
                  activeCardIdx === i
                    ? `0 0 10px 2px rgba(${division.colorRgb},0.45)`
                    : "none",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export function DivisionGallery() {
  const [activeDivisionIdx, setActiveDivisionIdx] = useState(0);
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.06 });
  const activeDivision = DIVISIONS[activeDivisionIdx];

  const prevDiv = useCallback(() => {
    setActiveDivisionIdx((i) => (i - 1 + DIVISIONS.length) % DIVISIONS.length);
  }, []);

  const nextDiv = useCallback(() => {
    setActiveDivisionIdx((i) => (i + 1) % DIVISIONS.length);
  }, []);

  const totalMembers = DIVISIONS.reduce((a, d) => a + d.members.length, 0);

  return (
    <section
      id="division-gallery"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--navy-deep)",
        paddingTop: "5rem",
        paddingBottom: "7rem",
      }}
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

      {/* ── BG: ambient color orbs ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 50% 35% at 85% 12%, rgba(255,228,92,0.1), transparent 60%),
            radial-gradient(ellipse 40% 55% at 10% 78%, rgba(42,61,130,0.25), transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(${activeDivision.colorRgb},0.04), transparent 70%)
          `,
          transition: "background 0.8s ease",
        }}
      />

      {/* ── BG: ghost text ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "5%",
          right: "-2%",
          pointerEvents: "none",
          userSelect: "none",
          fontFamily:
            "var(--font-display), Impact, 'Arial Narrow', sans-serif",
          fontSize: "clamp(7rem, 24vw, 20rem)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.06em",
          lineHeight: 1,
          color: "rgba(248,247,240,0.02)",
        }}
      >
        KRSBI
      </div>

      {/* ══════ HEADER ══════ */}
      <div
        ref={sectionRef}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 5vw, 2rem)",
          marginBottom: "3.5rem",
          textAlign: "center",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(36px)",
          transition:
            "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Kicker */}
        <div className="kicker kicker-on-ink" style={{ margin: "0 auto 1rem", display: "inline-block" }}>
          Galeri Divisi KRSBI-H
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily:
              "var(--font-display), Impact, 'Arial Narrow', sans-serif",
            fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            lineHeight: 0.92,
            color: "var(--cream)",
            margin: 0,
          }}
        >
          Orang-orang di{" "}
          <span
            style={{
              color: "var(--yellow)",
              textShadow: "0.04em 0.05em 0 var(--navy-black)",
            }}
          >
            balik
          </span>{" "}
          robot.
        </h2>

        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "0.95rem",
            lineHeight: 1.9,
            color: "rgba(248,247,240,0.48)",
          }}
        >
          {totalMembers} anggota terbagi dalam {DIVISIONS.length} divisi.{" "}
          Geser atau klik kartu untuk menjelajahi.
        </p>
      </div>

      {/* ══════ DIVISION NAV BAR ══════ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "0 clamp(1rem, 5vw, 2rem)",
          marginBottom: "0.5rem",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition:
            "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s",
        }}
      >
        {/* Prev Division Arrow */}
        <button
          type="button"
          aria-label="Divisi sebelumnya"
          onClick={prevDiv}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            border: `1px solid rgba(${activeDivision.colorRgb},0.35)`,
            background: `rgba(${activeDivision.colorRgb},0.08)`,
            color: activeDivision.color,
            cursor: "pointer",
            transition: "all 0.35s ease",
          }}
        >
          <svg fill="none" viewBox="0 0 20 20" width="18">
            <path
              d="M12 15l-5-5 5-5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
            />
          </svg>
        </button>

        {/* Division Name (center) */}
        <div style={{ textAlign: "center", minWidth: "clamp(200px, 40vw, 360px)" }}>
          <div
            key={activeDivision.id + "-label"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              animation: "fadeSlideIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <span
              style={{
                fontSize: "1.4rem",
                color: activeDivision.color,
                filter: `drop-shadow(0 0 8px rgba(${activeDivision.colorRgb},0.6))`,
                transition: "filter 0.5s ease",
              }}
            >
              {activeDivision.icon}
            </span>
            <h3
              style={{
                fontFamily:
                  "var(--font-display), Impact, 'Arial Narrow', sans-serif",
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "var(--cream)",
                margin: 0,
              }}
            >
              {activeDivision.label}
            </h3>
          </div>

          {/* Member count + index */}
          <div
            style={{
              marginTop: "0.4rem",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.6rem",
              fontWeight: 900,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: activeDivision.color,
              opacity: 0.7,
            }}
          >
            {activeDivisionIdx + 1} / {DIVISIONS.length}
            {"  ·  "}
            {activeDivision.members.length} anggota
          </div>

          {/* Colored underline */}
          <div
            style={{
              margin: "0.6rem auto 0",
              height: "2px",
              width: "4rem",
              borderRadius: "999px",
              background: activeDivision.color,
              boxShadow: `0 0 12px 3px rgba(${activeDivision.colorRgb},0.5)`,
              transition: "background 0.5s ease, box-shadow 0.5s ease",
            }}
          />
        </div>

        {/* Next Division Arrow */}
        <button
          type="button"
          aria-label="Divisi berikutnya"
          onClick={nextDiv}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            border: `1px solid rgba(${activeDivision.colorRgb},0.35)`,
            background: `rgba(${activeDivision.colorRgb},0.08)`,
            color: activeDivision.color,
            cursor: "pointer",
            transition: "all 0.35s ease",
          }}
        >
          <svg fill="none" viewBox="0 0 20 20" width="18">
            <path
              d="M8 5l5 5-5 5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
            />
          </svg>
        </button>
      </div>

      {/* Division pill indicators */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          gap: "0.45rem",
          flexWrap: "wrap",
          padding: "0 1rem",
          marginBottom: "2.5rem",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.9s ease 0.15s",
        }}
      >
        {DIVISIONS.map((div, i) => (
          <button
            key={div.id}
            type="button"
            aria-label={`Pilih divisi ${div.label}`}
            onClick={() => setActiveDivisionIdx(i)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.28rem 0.75rem",
              borderRadius: "999px",
              border: `1px solid rgba(${div.colorRgb},${i === activeDivisionIdx ? 0.55 : 0.18})`,
              background: `rgba(${div.colorRgb},${i === activeDivisionIdx ? 0.14 : 0.04})`,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.56rem",
              fontWeight: 900,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: i === activeDivisionIdx ? div.color : "rgba(248,247,240,0.38)",
              cursor: "pointer",
              transition: "all 0.35s ease",
              boxShadow:
                i === activeDivisionIdx
                  ? `0 0 14px 2px rgba(${div.colorRgb},0.2)`
                  : "none",
            }}
          >
            <span style={{ opacity: 0.7 }}>{div.icon}</span>
            {div.shortLabel}
          </button>
        ))}
      </div>

      {/* ══════ 3D CARD STAGE ══════ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}
      >
        <DivisionStage division={activeDivision} />
      </div>

      {/* ── Inline CSS for fade-slide animation ── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
