import type { ReactNode } from "react";

type AboutSectionTitleProps = {
  title: string;
  icon: ReactNode;
  kicker?: string;
  tone?: "cyan" | "orange";
};

export function AboutSectionTitle({ title, icon, kicker }: AboutSectionTitleProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {kicker ? <div className="kicker">{kicker}</div> : null}
        <div className="mt-5 flex items-start gap-4">
          <div className="luxury-surface flex size-[3.25rem] items-center justify-center rounded-2xl bg-[var(--yellow)] text-[var(--navy-deep)] shadow-[0_12px_30px_-20px_rgba(255,228,92,0.8)]">
            {icon}
          </div>
          <h2 className="headline max-w-[12ch] text-[clamp(2.8rem,6vw,5rem)] text-[var(--navy-deep)]">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
