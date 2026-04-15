"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { NavLink } from "@/data/aroc";
import { CloseIcon, MenuIcon } from "@/components/shared/Icons";

type NavbarProps = {
  links: NavLink[];
};

export function Navbar({ links }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (link: NavLink) => {
    if (!link.matchPath) {
      return false;
    }

    return pathname === link.matchPath;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,184,219,0.16)] bg-[rgba(0,0,0,0.78)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-4 sm:px-6">
        <Link
          aria-label="AROC_PL home"
          className="font-display text-[1.7rem] font-black uppercase tracking-[0.14em] text-white sm:text-[1.9rem]"
          href="/"
        >
          AROC<span className="text-[var(--cyan)]">_</span>PL
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              className={[
                "text-sm font-medium text-[#d1d5dc] transition-colors duration-200 hover:text-[var(--cyan)]",
                isActive(link) ? "text-[var(--cyan)]" : "",
              ].join(" ")}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--cyan-deep)] bg-[rgba(0,184,219,0.08)] px-5 text-sm font-semibold text-[var(--cyan)] transition duration-200 hover:-translate-y-0.5 hover:bg-[rgba(0,184,219,0.14)]"
            href="#contact"
          >
            Contact
          </Link>
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex size-11 items-center justify-center rounded-full border border-[rgba(0,184,219,0.2)] bg-[rgba(6,18,31,0.85)] text-[var(--cyan)] transition hover:border-[rgba(0,211,243,0.42)] hover:bg-[rgba(6,18,31,1)] md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </nav>

      <div
        className={[
          "overflow-hidden border-t border-[rgba(0,184,219,0.12)] bg-[rgba(2,5,7,0.94)] transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-[1120px] flex-col gap-2 px-4 py-4 sm:px-6">
          {links.map((link) => (
            <Link
              className={[
                "rounded-2xl border px-4 py-3 text-sm font-medium transition",
                isActive(link)
                  ? "border-[rgba(0,184,219,0.22)] bg-[rgba(0,184,219,0.08)] text-[var(--cyan)]"
                  : "border-transparent text-[#d1d5dc] hover:border-[rgba(0,184,219,0.18)] hover:bg-[rgba(0,184,219,0.06)] hover:text-[var(--cyan)]",
              ].join(" ")}
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="mt-2 inline-flex h-11 items-center justify-center rounded-full border border-[var(--cyan-deep)] bg-[rgba(0,184,219,0.08)] px-5 text-sm font-semibold text-[var(--cyan)]"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
