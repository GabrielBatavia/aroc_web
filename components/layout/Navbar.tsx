"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { NavLink } from "@/data/aroc";
import { CloseIcon, MenuIcon } from "@/components/shared/Icons";

type NavbarProps = {
  links: NavLink[];
};

export function Navbar({ links }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (link: NavLink) => {
    if (!link.matchPath) return false;
    return pathname === link.matchPath;
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-[rgba(201,162,75,0.25)] bg-[var(--ink-deep)]/98 backdrop-blur-2xl shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
          : "border-[rgba(245,241,232,0.1)] bg-[var(--ink)]/98 backdrop-blur-xl",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
        <Link
          aria-label="AROC_PL beranda"
          className="group flex items-center gap-3"
          href="/"
        >
          <span className="flex size-10 items-center justify-center rounded-sm border border-[rgba(201,162,75,0.55)] bg-[linear-gradient(135deg,rgba(201,162,75,0.2),rgba(201,162,75,0.08))] font-serif text-[1.15rem] font-bold text-[var(--gold-bright)] transition group-hover:border-[var(--gold-bright)] group-hover:bg-[rgba(201,162,75,0.2)]">
            A
          </span>
          <span className="font-serif text-[1.2rem] font-semibold tracking-[0.18em] text-[var(--paper)]">
            AROC_PL
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              className={[
                "relative px-4 py-2 text-[0.92rem] font-semibold tracking-[0.04em] transition-colors duration-200",
                isActive(link)
                  ? "text-[var(--gold-bright)]"
                  : "text-[var(--paper)] hover:text-[var(--gold-bright)]",
                "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:bg-[var(--gold-bright)] after:transition-all after:duration-300",
                isActive(link) ? "after:w-6" : "after:w-0 hover:after:w-6",
              ].join(" ")}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="ml-4 inline-flex h-10 items-center justify-center rounded-sm bg-[linear-gradient(135deg,var(--gold-bright),var(--gold))] px-5 text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[var(--ink)] shadow-[0_6px_18px_-6px_rgba(201,162,75,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-6px_rgba(201,162,75,0.75)]"
            href="#sponsor"
          >
            Jadi Sponsor
          </Link>
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          className="inline-flex size-11 items-center justify-center rounded-sm border border-[rgba(201,162,75,0.4)] bg-[rgba(201,162,75,0.08)] text-[var(--gold-bright)] transition hover:border-[var(--gold-bright)] hover:bg-[rgba(201,162,75,0.16)] md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </nav>

      <div
        className={[
          "overflow-hidden border-t border-[rgba(201,162,75,0.18)] bg-[var(--ink-deep)] transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-4 py-5 sm:px-8">
          {links.map((link) => (
            <Link
              className={[
                "rounded-sm px-4 py-3 text-[0.95rem] font-semibold tracking-[0.03em] transition",
                isActive(link)
                  ? "bg-[rgba(201,162,75,0.14)] text-[var(--gold-bright)]"
                  : "text-[var(--paper)] hover:bg-[rgba(245,241,232,0.06)] hover:text-[var(--gold-bright)]",
              ].join(" ")}
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="mt-3 inline-flex h-12 items-center justify-center rounded-sm bg-[linear-gradient(135deg,var(--gold-bright),var(--gold))] text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[var(--ink)] shadow-[0_6px_18px_-6px_rgba(201,162,75,0.6)]"
            href="#sponsor"
            onClick={() => setOpen(false)}
          >
            Jadi Sponsor
          </Link>
        </div>
      </div>
    </header>
  );
}
