import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  action,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={[
        "flex flex-col gap-4",
        centered
          ? "mx-auto max-w-3xl items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className,
      ].join(" ")}
    >
      <div className={centered ? "max-w-3xl" : "max-w-2xl"}>
        <div className="eyebrow">{label}</div>
        <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4.3rem)] font-black uppercase leading-[0.95] text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-[0.98rem] leading-8 text-[var(--muted)] sm:text-[1.05rem]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className={centered ? "mt-2" : "md:pb-2"}>{action}</div> : null}
    </div>
  );
}
