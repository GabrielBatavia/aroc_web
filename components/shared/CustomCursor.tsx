"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const ringPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || !hasHover || prefersReducedMotion) return;

    document.documentElement.style.cursor = "none";

    const updateMousePosition = (e: MouseEvent) => {
      setIsHidden((hidden) => (hidden ? false : hidden));
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest(
        'a, button, input, textarea, select, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'
      );
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId: number;
    let isFirstRender = true;

    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (isFirstRender && mousePos.current.x !== 0 && mousePos.current.y !== 0) {
        ringPos.current.x = mousePos.current.x;
        ringPos.current.y = mousePos.current.y;
        isFirstRender = false;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: isHidden ? 0 : 1, transition: "opacity 0.3s ease" }}
    >
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border border-white/50 transition-all duration-300 ease-out will-change-transform ${
          isHovering
            ? "h-12 w-12 bg-white/10 backdrop-blur-md border-white/80"
            : "h-8 w-8"
        }`}
      />
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full bg-white transition-all duration-300 will-change-transform ${
          isHovering ? "h-0 w-0 opacity-0" : "h-1.5 w-1.5 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        }`}
      />
    </div>
  );
}
