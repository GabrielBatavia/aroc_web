"use client";

import Link from "next/link";
import {
  type MouseEvent,
  type ReactNode,
  useRef,
} from "react";

type MagneticButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
  strength?: number;
};

export function MagneticButton({
  href,
  className = "",
  children,
  strength = 0.25,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`${className} will-change-transform transition-transform duration-200 ease-out`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
}
