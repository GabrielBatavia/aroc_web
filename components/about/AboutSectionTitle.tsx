import type { ReactNode } from "react";

type AboutSectionTitleProps = {
  title: string;
  icon: ReactNode;
  tone?: "cyan" | "orange";
};

export function AboutSectionTitle({
  title,
  icon,
  tone = "cyan",
}: AboutSectionTitleProps) {
  const accentClass =
    tone === "orange" ? "text-[var(--orange)]" : "text-[var(--cyan)]";

  return (
    <div className="flex items-center gap-3">
      <div className={`shrink-0 ${accentClass}`}>{icon}</div>
      <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.35rem)] font-black tracking-[-0.02em] text-white">
        {title}
      </h2>
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(30,41,57,0.95),rgba(30,41,57,0.12))]" />
    </div>
  );
}
