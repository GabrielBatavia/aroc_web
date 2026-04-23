import type { ReactNode } from "react";

type AboutSectionTitleProps = {
  title: string;
  icon: ReactNode;
  kicker?: string;
  tone?: "cyan" | "orange";
};

export function AboutSectionTitle({
  title,
  icon,
  kicker,
}: AboutSectionTitleProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {kicker ? <div className="kicker">{kicker}</div> : null}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex size-11 items-center justify-center rounded-sm border border-[var(--rule)] bg-white text-[var(--gold-deep)]">
            {icon}
          </div>
          <h2 className="headline text-[clamp(1.9rem,3.5vw,2.6rem)] text-[var(--ink)]">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
