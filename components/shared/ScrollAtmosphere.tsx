"use client";

import { useEffect, useState } from "react";

export function ScrollAtmosphere() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
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
    <div aria-hidden="true" className="scroll-atmosphere">
      <div
        className="scroll-atmosphere-orb scroll-atmosphere-orb-a"
        style={{ transform: `translate3d(${progress * 7}vw, ${progress * 18}vh, 0)` }}
      />
      <div
        className="scroll-atmosphere-orb scroll-atmosphere-orb-b"
        style={{ transform: `translate3d(${-progress * 9}vw, ${progress * 12}vh, 0)` }}
      />
      <div
        className="scroll-atmosphere-line"
        style={{ transform: `translateY(${progress * 34}vh) rotate(-8deg)` }}
      />
    </div>
  );
}
