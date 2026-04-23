"use client";

import Link from "next/link";

import type { FooterContact, NavLink } from "@/data/aroc";
import {
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type FooterProps = {
  description: string;
  sponsors: string[];
  navigation: NavLink[];
  contact: FooterContact[];
};

const iconMap = {
  mail: MailIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  map: MapPinIcon,
};

export function Footer({
  description,
  sponsors,
  navigation,
  contact,
}: FooterProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <footer
      ref={ref}
      className="surface-ink-deep border-t border-[rgba(245,241,232,0.08)]"
      id="contact"
    >
      <div
        className={`mx-auto max-w-[1200px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        {/* Sponsor strip */}
        <div className="border-b border-[rgba(245,241,232,0.08)] py-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="kicker kicker-on-ink">Didukung Oleh</div>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
              {sponsors.map((sponsor) => (
                <span
                  key={sponsor}
                  className="font-serif text-[1.15rem] font-semibold tracking-[0.14em] text-[rgba(245,241,232,0.72)] transition hover:text-[var(--gold-bright)]"
                >
                  {sponsor}
                </span>
              ))}
              <Link
                href="#sponsor"
                className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[var(--gold-bright)] underline-offset-4 hover:underline"
              >
                + Logo Anda di sini
              </Link>
            </div>
          </div>
        </div>

        {/* Main body */}
        <div className="grid gap-14 py-16 lg:grid-cols-[1.4fr_0.8fr_1.1fr]">
          <div>
            <Link
              aria-label="AROC_PL beranda"
              className="inline-flex items-center gap-3"
              href="/"
            >
              <span className="flex size-10 items-center justify-center rounded-sm border border-[rgba(201,162,75,0.5)] bg-[rgba(201,162,75,0.12)] font-serif text-[1.15rem] font-bold text-[var(--gold-bright)]">
                A
              </span>
              <span className="font-serif text-[1.3rem] font-semibold tracking-[0.14em] text-[var(--paper)]">
                AROC_PL
              </span>
            </Link>
            <p className="mt-6 max-w-[24rem] text-[0.98rem] leading-[1.85] text-[rgba(245,241,232,0.68)]">
              {description}
            </p>

            <div className="mt-8 flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[var(--gold-bright)]">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-[var(--gold-bright)]" />
              Juara Bertahan KRI Humanoid
            </div>
          </div>

          <div>
            <h3 className="text-[0.74rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-bright)]">
              Navigasi
            </h3>
            <div className="mt-6 flex flex-col gap-3.5">
              {navigation.map((item) => (
                <Link
                  className="group inline-flex items-center gap-2 text-[0.98rem] text-[rgba(245,241,232,0.78)] transition hover:text-[var(--gold-bright)]"
                  href={item.href}
                  key={item.href}
                >
                  <span className="inline-block w-0 overflow-hidden bg-[var(--gold-bright)] transition-all duration-300 group-hover:w-3">
                    <span className="block h-[1px] w-3 bg-[var(--gold-bright)]" />
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[0.74rem] font-bold uppercase tracking-[0.24em] text-[var(--gold-bright)]">
              Hubungi Kami
            </h3>
            <div className="mt-6 space-y-5">
              {contact.map((item) => {
                const Icon = iconMap[item.icon];
                const content = (
                  <div className="flex items-start gap-4">
                    <Icon className="mt-0.5 size-4 flex-shrink-0 text-[var(--gold-bright)]" />
                    <div>
                      <div className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[rgba(245,241,232,0.48)]">
                        {item.label}
                      </div>
                      <div className="mt-1 text-[0.95rem] leading-[1.6] text-[rgba(245,241,232,0.86)] transition group-hover:text-[var(--gold-bright)]">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    className="group block"
                    href={item.href}
                    key={item.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="group block" key={item.label}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[rgba(245,241,232,0.08)] py-6 text-[0.82rem] text-[rgba(245,241,232,0.48)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 AROC_PL &middot; Politeknik Negeri Malang</p>
          <p className="font-serif italic">
            Dibuat oleh engineer, untuk engineer.
          </p>
        </div>
      </div>
    </footer>
  );
}
