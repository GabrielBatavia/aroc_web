"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "action" | "media" | "drag";

const cursorLabels: Record<CursorMode, string> = {
  default: "AR",
  action: "↗",
  media: "VIEW",
  drag: "DRAG",
};

export function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [isPressed, setIsPressed] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const pointerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const updatePointer = (event: PointerEvent) => {
      pointerPos.current = { x: event.clientX, y: event.clientY };
      setIsHidden(false);
    };

    const updateMode = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const explicitMode = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      const nextMode: CursorMode =
        explicitMode === "drag"
          ? "drag"
          : explicitMode === "media" || target.closest("video, figure[role='button'], model-viewer")
            ? "media"
            : target.closest(
                  'a, button, input, textarea, select, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])',
                )
              ? "action"
              : "default";

      setMode(nextMode);
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);
    const handlePointerLeave = () => setIsHidden(true);
    const handlePointerEnter = () => setIsHidden(false);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerover", updateMode, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    let animationFrameId = 0;
    let initialized = false;

    const render = () => {
      if (!initialized && pointerPos.current.x !== 0 && pointerPos.current.y !== 0) {
        ringPos.current = { ...pointerPos.current };
        initialized = true;
      }

      ringPos.current.x += (pointerPos.current.x - ringPos.current.x) * 0.17;
      ringPos.current.y += (pointerPos.current.y - ringPos.current.y) * 0.17;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointerPos.current.x}px, ${pointerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerover", updateMode);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
      window.cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`custom-cursor custom-cursor--${mode} ${isPressed ? "is-pressed" : ""} ${isHidden ? "is-hidden" : ""}`}
    >
      <div className="custom-cursor__ring" ref={ringRef}>
        <span>{cursorLabels[mode]}</span>
      </div>
      <div className="custom-cursor__dot" ref={dotRef} />
    </div>
  );
}
