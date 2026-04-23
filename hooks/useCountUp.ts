"use client";

import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  threshold?: number;
  triggerOnce?: boolean;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useCountUp({
  end,
  duration = 1600,
  start = 0,
  decimals = 0,
  threshold = 0.3,
  triggerOnce = true,
}: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(start);
  const startedRef = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(end);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            setValue(start + (end - start) * eased);
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);

          if (triggerOnce) observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [end, duration, start, threshold, triggerOnce]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return { ref, value, formatted };
}
