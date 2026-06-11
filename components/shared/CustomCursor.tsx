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
    // Disable custom cursor on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    // Also disable on devices that don't support hover (e.g. some tablets)
    const hasHover = window.matchMedia("(hover: hover)").matches;

    if (isTouchDevice || !hasHover) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const updateMousePosition = (e: MouseEvent) => {
      if (isHidden) setIsHidden(false);
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over an interactive element
      const isClickable = target.closest(
        'a, button, input, textarea, select, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'
      );
      setIsHovering(!!isClickable);
      
      // Also if user hovers over text, we might want a different cursor, but for now we just handle interactive elements
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId: number;
    let isFirstRender = true;

    const render = () => {
      // Lerp for the outer ring (0.15 is the smoothness factor)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      // Instantly move the ring on the very first render so it doesn't fly in from the corner
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
  }, [isHidden]);

  // We hide entirely on touch devices by default without rendering logic
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0 || !window.matchMedia("(hover: hover)").matches)) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: isHidden ? 0 : 1, transition: "opacity 0.3s ease" }}
    >
      {/* Outer Ring with Lerp effect */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border border-white/50 transition-all duration-300 ease-out will-change-transform ${
          isHovering
            ? "h-12 w-12 bg-white/10 backdrop-blur-md border-white/80"
            : "h-8 w-8"
        }`}
      />
      {/* Inner Dot exact follow */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full bg-white transition-all duration-300 will-change-transform ${
          isHovering ? "h-0 w-0 opacity-0" : "h-1.5 w-1.5 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        }`}
      />
    </div>
  );
}
