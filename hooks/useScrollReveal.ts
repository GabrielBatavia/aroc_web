"use client";

import { useEffect, useRef, useState } from "react";

type UseScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
};

/**
 * Scroll-reveal hook using IntersectionObserver.
 * Returns { ref, isVisible } — attach ref to the target element.
 * Respects prefers-reduced-motion by initializing as visible.
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  // Check reduced motion preference at module level — safe because
  // this is only used client-side and the value is read once.
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(prefersReduced);

  useEffect(() => {
    // If reduced motion is preferred, already initialized as visible
    if (prefersReduced) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, prefersReduced]);

  return { ref, isVisible };
}
