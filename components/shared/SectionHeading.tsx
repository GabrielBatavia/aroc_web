import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  centered?: boolean;
  onInk?: boolean;
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  action,
  centered = false,
  onInk = false,
  className = "",
}: SectionHeadingProps) {
  const titleColor = onInk ? "text-[var(--paper)]" : "text-[var(--ink)]";
  const descriptionColor = onInk ? "text-[rgba(245,241,232,0.68)]" : "text-[var(--muted)]";
  const kickerClass = onInk ? "kicker kicker-on-ink" : "kicker";

  return (
    <div
      className={[
        "flex flex-col gap-5",
        centered
          ? "mx-auto max-w-3xl items-center text-center"
          : "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      ].join(" ")}
    >
      <div className={centered ? "max-w-3xl" : "max-w-[38rem]"}>
        <div className={[kickerClass, centered ? "kicker-centered" : ""].join(" ")}>
          {label}
        </div>
        <h2
          className={`headline mt-5 text-[clamp(2.4rem,5vw,4rem)] ${titleColor}`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-5 text-[1.02rem] leading-[1.75] ${descriptionColor} sm:text-[1.08rem]`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className={centered ? "mt-4" : "md:pb-2"}>{action}</div> : null}
    </div>
  );
}
