"use client";

import { useEffect, useRef } from "react";

export function ScrollAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        const root = rootRef.current;

        if (!root) return;
        root.style.setProperty("--atmosphere-a-x", `${progress * 5}vw`);
        root.style.setProperty("--atmosphere-a-y", `${progress * 12}vh`);
        root.style.setProperty("--atmosphere-b-x", `${progress * -6}vw`);
        root.style.setProperty("--atmosphere-b-y", `${progress * 9}vh`);
        root.style.setProperty("--atmosphere-line-y", `${progress * 24}vh`);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden="true" className="scroll-atmosphere" ref={rootRef}>
      <div className="scroll-atmosphere-orb scroll-atmosphere-orb-a" />
      <div className="scroll-atmosphere-orb scroll-atmosphere-orb-b" />
      <div className="scroll-atmosphere-line" />
    </div>
  );
}
