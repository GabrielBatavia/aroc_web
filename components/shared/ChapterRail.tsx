"use client";

import { useEffect, useState } from "react";

type Chapter = {
  id: string;
  label: string;
};

type ChapterRailProps = {
  chapters: Chapter[];
};

export function ChapterRail({ chapters }: ChapterRailProps) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const targets = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean) as HTMLElement[];

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { threshold: [0.22, 0.4, 0.6], rootMargin: "-20% 0px -52% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Section chapters" className="chapter-rail">
      {chapters.map((chapter, index) => {
        const isActive = chapter.id === activeId;
        return (
          <a className={isActive ? "is-active" : ""} href={`#${chapter.id}`} key={chapter.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{chapter.label}</strong>
          </a>
        );
      })}
    </nav>
  );
}
