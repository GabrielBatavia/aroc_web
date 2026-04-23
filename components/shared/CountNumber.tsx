"use client";

import { useCountUp } from "@/hooks/useCountUp";

type CountNumberProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

export function CountNumber({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1600,
  className = "",
}: CountNumberProps) {
  const { ref, formatted } = useCountUp({ end, duration, decimals });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
