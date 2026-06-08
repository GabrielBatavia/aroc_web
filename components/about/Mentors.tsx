"use client";

import Image from "next/image";

import { AboutSectionTitle } from "@/components/about/AboutSectionTitle";
import { GraduationCapIcon, InstagramIcon, MailIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { AboutMentor } from "@/data/about";

type MentorsProps = {
  mentors: AboutMentor[];
};

export function Mentors({ mentors }: MentorsProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`surface-paper-soft relative overflow-hidden py-20 sm:py-24 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <AboutSectionTitle icon={<GraduationCapIcon className="size-6" />} kicker="Bimbingan" title="Dosen Pembimbing" />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {mentors.map((mentor, index) => (
            <article className={`card-paper card-hover-lift relative overflow-hidden rounded-[2rem] p-5 sm:p-6 reveal-base reveal-up ${isVisible ? `revealed reveal-delay-${index + 1}` : ""}`} key={mentor.name}>
              <div className="grid gap-6 sm:grid-cols-[11rem_1fr] sm:items-stretch">
                <div className="group relative min-h-[14rem] overflow-hidden rounded-[1.4rem] bg-[var(--navy-deep)] sm:min-h-0">
                  <Image
                    alt={`${mentor.name} portrait`}
                    className="object-cover transition duration-[800ms] group-hover:scale-[1.06]"
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    src={mentor.image}
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-[var(--yellow)] px-3 py-1.5 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--navy-deep)]">
                    {mentor.badge}
                  </div>
                </div>

                <div className="py-2">
                  <div className="font-mono text-[0.66rem] font-black uppercase tracking-[0.2em] text-[var(--gold-deep)]">{mentor.role}</div>
                  <h3 className="font-display mt-3 text-[2.2rem] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[var(--navy-deep)]">
                    {mentor.name}
                  </h3>
                  <p className="mt-2 text-[0.84rem] text-[var(--muted-dark)]">NIDN {mentor.nidn}</p>
                  <p className="mt-4 text-[0.98rem] leading-[1.75] text-[var(--navy-deep)]">{mentor.specialization}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <a className="inline-flex items-center gap-2 rounded-full border border-[var(--rule)] bg-white/70 px-3 py-2 text-[0.82rem] text-[var(--muted-dark)] transition hover:border-[var(--navy-deep)] hover:text-[var(--navy-deep)]" href={`mailto:${mentor.email}`}>
                      <MailIcon className="size-4" />
                      <span>{mentor.email}</span>
                    </a>
                    <a className="inline-flex items-center gap-2 rounded-full border border-[var(--rule)] bg-white/70 px-3 py-2 text-[0.82rem] text-[var(--muted-dark)] transition hover:border-[var(--navy-deep)] hover:text-[var(--navy-deep)]" href={`https://instagram.com/${mentor.instagram.replace("@", "")}`} rel="noreferrer" target="_blank">
                      <InstagramIcon className="size-4" />
                      <span>{mentor.instagram}</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
