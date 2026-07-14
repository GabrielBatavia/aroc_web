"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageChoreography() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const targets = sections
      .map((section) => {
        if (section.querySelector(".reveal-base")) return null;

        const content =
          section.querySelector<HTMLElement>(":scope > .relative.z-10") ??
          section.querySelector<HTMLElement>(":scope > div:not([aria-hidden='true'])");

        if (!content) return null;
        content.classList.add("page-motion-content");
        return content;
      })
      .filter((target): target is HTMLElement => target !== null);

    if (prefersReducedMotion) {
      targets.forEach((target) => target.classList.add("is-in-view"));
      return () => {
        targets.forEach((target) => target.classList.remove("page-motion-content", "is-in-view"));
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      targets.forEach((target) => target.classList.remove("page-motion-content", "is-in-view"));
    };
  }, [pathname]);

  return null;
}
