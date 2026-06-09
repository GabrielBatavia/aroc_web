"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function HeroInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      });
    },
    [isMobile]
  );

  // Generate grid cells
  const cols = 8;
  const rows = 6;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const delay = (r * cols + c) * 0.12;
      cells.push(
        <div
          key={`${r}-${c}`}
          className="hud-grid-cell rounded-sm border border-[rgba(0,211,243,0.06)]"
          style={{
            animationDelay: `${delay}s`,
            background: `radial-gradient(circle at 50% 50%, rgba(0,184,219,0.04), transparent)`,
          }}
        />
      );
    }
  }

  // Parallax offsets based on mouse
  const offsetX = (mouse.x - 0.5) * 20;
  const offsetY = (mouse.y - 0.5) * 14;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ contain: "layout style" }}
    >
      {/* Layer 1: Grid background */}
      <div
        className="absolute inset-[-10%]"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "2px",
          transform: isMobile
            ? "none"
            : `translate3d(${offsetX * 0.3}px, ${offsetY * 0.3}px, 0)`,
          willChange: "transform",
          transition: "transform 0.15s ease-out",
        }}
      >
        {cells}
      </div>

      {/* Layer 2: Orbit rings */}
      <div
        className="absolute inset-[5%]"
        style={{
          transform: isMobile
            ? "none"
            : `translate3d(${offsetX * 0.5}px, ${offsetY * 0.5}px, 0)`,
          willChange: "transform",
          transition: "transform 0.15s ease-out",
        }}
      >
        <div className="absolute inset-[15%] rounded-full border border-[rgba(0,184,219,0.08)]" />
        <div className="absolute inset-[30%] rounded-full border border-[rgba(43,127,255,0.06)]" />
        <div className="absolute inset-[45%] rounded-full border border-[rgba(240,177,0,0.05)]" />
      </div>

      {/* Layer 3: Scanning line */}
      <div className="absolute inset-y-0 left-0 w-full overflow-hidden">
        <div
          className="hud-scan-line absolute inset-y-0 w-[40%]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,184,219,0.06), rgba(0,184,219,0.12), rgba(0,184,219,0.06), transparent)",
          }}
        />
      </div>

      {/* Layer 4: Cursor-follow glow (desktop only) */}
      {!isMobile && (
        <div
          className="pointer-events-none absolute size-[280px] rounded-full"
          style={{
            left: `${mouse.x * 100}%`,
            top: `${mouse.y * 100}%`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(0,211,243,0.14), rgba(0,184,219,0.04) 40%, transparent 70%)",
            willChange: "left, top",
            transition: "left 0.12s ease-out, top 0.12s ease-out",
          }}
        />
      )}

      {/* Corner accents */}
      <div className="absolute left-3 top-3 h-8 w-px bg-[rgba(0,211,243,0.3)]" />
      <div className="absolute left-3 top-3 h-px w-8 bg-[rgba(0,211,243,0.3)]" />
      <div className="absolute right-3 top-3 h-8 w-px bg-[rgba(0,211,243,0.3)]" />
      <div className="absolute right-3 top-3 h-px w-8 bg-[rgba(0,211,243,0.3)]" />
      <div className="absolute bottom-3 left-3 h-8 w-px bg-[rgba(0,211,243,0.3)]" />
      <div className="absolute bottom-3 left-3 h-px w-8 bg-[rgba(0,211,243,0.3)]" />
      <div className="absolute bottom-3 right-3 h-8 w-px bg-[rgba(0,211,243,0.3)]" />
      <div className="absolute bottom-3 right-3 h-px w-8 bg-[rgba(0,211,243,0.3)]" />
    </div>
  );
}
