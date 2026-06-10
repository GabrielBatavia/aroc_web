"use client";

import Link from "next/link";

import { ArocGeneratedMark } from "@/components/shared/BrandAssets";
import {
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { FooterContact, NavLink } from "@/data/aroc";

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

export function Footer({ sponsors, navigation, contact }: FooterProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <footer ref={ref} className="surface-ink-deep campaign-shell border-t border-[rgba(248,247,240,0.08)]" id="contact">
      <div className={`relative z-10 mx-auto max-w-[1240px] px-4 py-16 sm:px-8 lg:py-20 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        <div className="border-y border-[rgba(248,247,240,0.1)] py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="kicker kicker-on-ink">Dukungan Saat Ini</div>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {sponsors.map((sponsor) => (
                <span className="font-display text-[1.55rem] font-black uppercase tracking-[0.12em] text-[rgba(248,247,240,0.82)]" key={sponsor}>
                  {sponsor}
                </span>
              ))}
              <Link className="font-mono text-[0.72rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)] underline-offset-4 hover:underline" href="/#sponsor">
                + logo mitra di sini
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.15fr_0.75fr_1fr]">
          <div>
            <Link aria-label="AROC_PL beranda" className="inline-flex items-center gap-3" href="/">
              <span className="flex size-14 items-center justify-center rounded-full bg-[var(--yellow)] p-1.5 shadow-[0_0_0_5px_rgba(255,228,92,0.12)]">
                <ArocGeneratedMark className="size-full" />
              </span>
              <span>
                <span className="block font-display text-[1.65rem] font-black uppercase tracking-[0.14em] text-[var(--cream)]">
                  AROC_PL
                </span>
                <span className="block font-mono text-[0.64rem] font-black uppercase tracking-[0.24em] text-[var(--yellow)]">
                  Humanoid Robotics Soccer Team
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-[26rem] text-[0.98rem] leading-[1.85] text-[rgba(248,247,240,0.62)]">
              Advance Robosoccer Polinema. Development Team robot humanoid Politeknik Negeri Malang untuk riset, pengembangan, dan kompetisi.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[0.72rem] font-black uppercase tracking-[0.24em] text-[var(--yellow)]">Navigasi</h3>
            <div className="mt-6 flex flex-col gap-3.5">
              {navigation.map((item) => (
                <Link className="group inline-flex items-center gap-3 text-[0.98rem] text-[rgba(248,247,240,0.76)] transition hover:text-[var(--yellow)]" href={item.href} key={item.href}>
                  <span className="h-px w-0 bg-[var(--yellow)] transition-all duration-300 group-hover:w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[0.72rem] font-black uppercase tracking-[0.24em] text-[var(--yellow)]">Hubungi Kami</h3>
            <div className="mt-6 space-y-5">
              {contact.map((item) => {
                const Icon = iconMap[item.icon];
                const isExternal = item.href?.startsWith("http");
                const content = (
                  <div className="flex items-start gap-4">
                    <Icon className="mt-1 size-4 shrink-0 text-[var(--yellow)]" />
                    <div>
                      <div className="font-mono text-[0.66rem] font-black uppercase tracking-[0.2em] text-[rgba(248,247,240,0.42)]">{item.label}</div>
                      <div className="mt-1 text-[0.94rem] leading-[1.6] text-[rgba(248,247,240,0.82)] transition group-hover:text-[var(--yellow)]">{item.value}</div>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a className="group block" href={item.href} key={item.label} rel={isExternal ? "noreferrer" : undefined} target={isExternal ? "_blank" : undefined}>
                    {content}
                  </a>
                ) : (
                  <div className="group block" key={item.label}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[rgba(248,247,240,0.1)] pt-6 text-[0.82rem] text-[rgba(248,247,240,0.48)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 AROC_PL / Politeknik Negeri Malang</p>
          <p className="font-mono uppercase tracking-[0.18em]">Development Team robot humanoid Polinema.</p>
        </div>
      </div>
    </footer>
  );
}
