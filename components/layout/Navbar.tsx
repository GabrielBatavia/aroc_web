"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ArocGeneratedMark } from "@/components/shared/BrandAssets";
import { CloseIcon, InstagramIcon, MailIcon, MenuIcon } from "@/components/shared/Icons";
import type { NavLink } from "@/data/aroc";

type NavbarProps = {
  links: NavLink[];
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/aroc_pl",
    icon: InstagramIcon,
  },
  {
    label: "Email",
    href: "mailto:hello@arocpl.com",
    icon: MailIcon,
  },
];

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
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 sm:px-5 sm:pt-5",
        scrolled ? "translate-y-0" : "",
      ].join(" ")}
    >
      <nav
        className={[
          "mx-auto grid max-w-[1240px] grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-full border px-3 py-2 shadow-[0_22px_60px_-44px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-300 sm:px-4",
          scrolled
            ? "border-[rgba(255,228,92,0.3)] bg-[rgba(5,8,22,0.88)]"
            : "border-[rgba(248,247,240,0.14)] bg-[rgba(5,8,22,0.62)]",
        ].join(" ")}
      >
        <div className="hidden items-center gap-2 lg:flex">
          {socialLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                aria-label={item.label}
                className="group flex size-10 items-center justify-center rounded-full border border-[rgba(248,247,240,0.15)] bg-[rgba(248,247,240,0.06)] text-[var(--cream)] transition hover:-translate-y-1 hover:rotate-[-4deg] hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
                href={item.href}
                key={item.label}
                rel={index === 0 ? "noreferrer" : undefined}
                target={index === 0 ? "_blank" : undefined}
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>

        <Link
          aria-label="AROC_PL beranda"
          className="group col-start-1 flex min-w-0 items-center gap-2 lg:col-start-2"
          href="/"
        >
          <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--yellow)] p-1 shadow-[0_0_0_4px_rgba(255,228,92,0.12)] transition group-hover:rotate-[-4deg] group-hover:scale-95">
            <ArocGeneratedMark className="size-full" />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-[1.2rem] font-black uppercase tracking-[0.1em] text-[var(--cream)]">
              AROC_PL
            </span>
            <span className="block font-mono text-[0.54rem] font-bold uppercase tracking-[0.22em] text-[var(--yellow)]">
              Humanoid Team
            </span>
          </span>
        </Link>

        <div className="hidden items-center justify-center gap-1 xl:flex">
          {links.map((link, index) => (
            <Link
              className={[
                "group rounded-full px-4 py-2 text-[0.8rem] font-black uppercase tracking-[0.13em] transition",
                isActive(link)
                  ? "bg-[var(--yellow)] text-[var(--navy-deep)]"
                  : "text-[rgba(248,247,240,0.78)] hover:bg-[rgba(248,247,240,0.08)] hover:text-[var(--yellow)]",
              ].join(" ")}
              href={link.href}
              key={`${link.href}-${index}`}
            >
              <span className="inline-block transition group-hover:-translate-y-0.5 group-hover:rotate-[-2deg]">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="col-start-3 flex items-center justify-end gap-2">
          <Link className="hidden btn-gold min-h-11 px-5 text-[0.72rem] md:inline-flex" href="/#sponsor">
            Jadi Sponsor
          </Link>
          <button
            aria-expanded={open}
            aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="flex size-11 items-center justify-center rounded-full border border-[rgba(255,228,92,0.36)] bg-[rgba(255,228,92,0.09)] text-[var(--yellow)] transition hover:bg-[rgba(255,228,92,0.16)] xl:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-[1.6rem] border border-[rgba(255,228,92,0.22)] bg-[rgba(5,8,22,0.95)] shadow-[0_32px_80px_-46px_rgba(0,0,0,0.95)] backdrop-blur-2xl xl:hidden">
          <div className="grid gap-2 p-4">
            {links.map((link) => (
              <Link
                className={[
                  "rounded-2xl px-4 py-3 text-[0.95rem] font-black uppercase tracking-[0.12em] transition",
                  isActive(link)
                    ? "bg-[var(--yellow)] text-[var(--navy-deep)]"
                    : "text-[var(--cream)] hover:bg-[rgba(248,247,240,0.08)] hover:text-[var(--yellow)]",
                ].join(" ")}
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="btn-gold mt-2"
              href="/#sponsor"
              onClick={() => setOpen(false)}
            >
              Jadi Sponsor
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
