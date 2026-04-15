import Link from "next/link";

import type { FooterContact, NavLink } from "@/data/aroc";
import { InstagramIcon, LinkedinIcon, MailIcon, MapPinIcon } from "@/components/shared/Icons";

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

export function Footer({ description, sponsors, navigation, contact }: FooterProps) {
  return (
    <footer className="section-divider border-t border-white/5 bg-black py-16" id="contact">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.8fr_1fr]">
          <div>
            <Link
              aria-label="AROC_PL home"
              className="font-display text-[2rem] font-black uppercase tracking-[0.14em] text-white"
              href="#top"
            >
              AROC<span className="text-[var(--cyan)]">_</span>PL
            </Link>
            <p className="mt-6 max-w-[24rem] text-[1rem] leading-8 text-[var(--muted)]">
              {description}
            </p>

            <div className="mt-8">
              <div className="eyebrow !justify-start">Supported By</div>
              <div className="mt-4 flex flex-wrap gap-6 text-[1.55rem] font-bold uppercase tracking-[0.04em] text-[rgba(255,255,255,0.42)]">
                {sponsors.map((sponsor) => (
                  <span key={sponsor}>{sponsor}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-[1.2rem] font-bold uppercase tracking-[0.08em] text-white">
              Navigation
            </h3>
            <div className="mt-6 flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  className="text-[1rem] text-[var(--muted)] transition hover:text-[var(--cyan)]"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-[1.2rem] font-bold uppercase tracking-[0.08em] text-white">
              Contact Us
            </h3>
            <div className="mt-6 space-y-4">
              {contact.map((item) => {
                const Icon = iconMap[item.icon];
                const content = (
                  <div className="flex items-start gap-3 text-[var(--muted)] transition group-hover:text-white">
                    <Icon className="mt-0.5 size-5 text-[rgba(255,255,255,0.55)]" />
                    <div>
                      <div className="text-[0.76rem] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.35)]">
                        {item.label}
                      </div>
                      <div className="mt-1 text-[1rem] leading-7">{item.value}</div>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a className="group block" href={item.href} key={item.label} rel="noreferrer" target="_blank">
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

        <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(255,255,255,0.06)] pt-6 text-sm text-[rgba(255,255,255,0.3)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 AROC_PL. All rights reserved.</p>
          <p>
            Designed with <span className="text-[#fb2c36]">&hearts;</span> for Robotics
          </p>
        </div>
      </div>
    </footer>
  );
}
