"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ArocGeneratedMark } from "@/components/shared/BrandAssets";
import { CloseIcon, MenuIcon } from "@/components/shared/Icons";
import type { NavLink } from "@/data/aroc";

type NavbarProps = {
  links: NavLink[];
};

export function Navbar({ links }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 18);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (link: NavLink) => {
    if (!link.matchPath) return false;
    return pathname === link.matchPath;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* ── Main nav pill ── */}
      <nav
        aria-label="Main navigation"
        className={[
          "mx-auto flex max-w-[1280px] items-center gap-3 rounded-full border px-3 py-2 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-300 sm:px-4",
          scrolled
            ? "border-[rgba(255,228,92,0.28)] bg-[rgba(5,8,22,0.92)]"
            : "border-[rgba(248,247,240,0.12)] bg-[rgba(5,8,22,0.6)]",
        ].join(" ")}
      >
        {/* ── Left: Logo ── */}
        <Link
          aria-label="AROC_PL beranda"
          className="group flex shrink-0 items-center gap-2.5"
          href="/"
        >
          <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--yellow)] p-1 shadow-[0_0_0_3px_rgba(255,228,92,0.14)] transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-95 sm:size-11">
            <ArocGeneratedMark className="size-full" />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-[1.1rem] font-black uppercase tracking-[0.1em] text-[var(--cream)]">
              AROC_PL
            </span>
            <span className="block font-mono text-[0.5rem] font-bold uppercase tracking-[0.22em] text-[var(--yellow)]">
              Humanoid Team
            </span>
          </span>
        </Link>

        {/* ── Center: Nav links (desktop) — flex-1 to fill space ── */}
        <div className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {links.map((link, index) => (
            <Link
              className={[
                "group rounded-full px-3.5 py-2 text-[0.76rem] font-black uppercase tracking-[0.13em] transition-all duration-200",
                isActive(link)
                  ? "bg-[var(--yellow)] text-[var(--navy-deep)]"
                  : "text-[rgba(248,247,240,0.72)] hover:bg-[rgba(248,247,240,0.08)] hover:text-[var(--yellow)]",
              ].join(" ")}
              href={link.href}
              key={`${link.href}-${index}`}
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-y-px">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* ── Right: CTA + mobile hamburger ── */}
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <Link
            className="btn-gold hidden min-h-[2.4rem] px-4 text-[0.72rem] sm:inline-flex"
            href="/#sponsor"
          >
            Kemitraan
          </Link>
          {/* Hamburger — hidden on lg */}
          <button
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="flex size-10 items-center justify-center rounded-full border border-[rgba(255,228,92,0.32)] bg-[rgba(255,228,92,0.08)] text-[var(--yellow)] transition hover:bg-[rgba(255,228,92,0.18)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            {open ? <CloseIcon className="size-4.5" /> : <MenuIcon className="size-4.5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div className="mx-auto mt-2 max-w-[1280px] overflow-hidden rounded-[1.6rem] border border-[rgba(255,228,92,0.2)] bg-[rgba(5,8,22,0.97)] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl lg:hidden">
          <div className="grid gap-1.5 p-4">
            {links.map((link) => (
              <Link
                className={[
                  "rounded-xl px-4 py-3 text-[0.9rem] font-black uppercase tracking-[0.12em] transition-colors duration-150",
                  isActive(link)
                    ? "bg-[var(--yellow)] text-[var(--navy-deep)]"
                    : "text-[var(--cream)] hover:bg-[rgba(248,247,240,0.07)] hover:text-[var(--yellow)]",
                ].join(" ")}
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-1 border-t border-[rgba(248,247,240,0.08)] pt-3">
              <Link
                className="btn-gold w-full"
                href="/#sponsor"
                onClick={() => setOpen(false)}
              >
                Kemitraan
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
