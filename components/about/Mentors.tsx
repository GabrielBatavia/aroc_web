"use client";

import Image from "next/image";

import type { AboutMentor } from "@/data/about";
import { AboutSectionTitle } from "@/components/about/AboutSectionTitle";
import {
  GraduationCapIcon,
  InstagramIcon,
  MailIcon,
} from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type MentorsProps = {
  mentors: AboutMentor[];
};

export function Mentors({ mentors }: MentorsProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`surface-paper-soft py-20 sm:py-24 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <AboutSectionTitle
          icon={<GraduationCapIcon className="size-5" />}
          title="Dosen Pembimbing"
          kicker="Bimbingan"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {mentors.map((mentor, index) => (
            <article
              className={`card-paper card-hover-lift relative overflow-hidden rounded-sm p-7 sm:p-8 reveal-base reveal-up ${isVisible ? `revealed reveal-delay-${index + 1}` : ""}`}
              key={mentor.name}
            >
              <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
                <div className="relative mx-auto w-fit sm:mx-0">
                  <div className="relative size-[7rem] overflow-hidden rounded-sm bg-[var(--paper-soft)]">
                    <Image
                      alt={`${mentor.name} portrait`}
                      className="h-full w-full object-cover"
                      fill
                      sizes="112px"
                      src={mentor.image}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                    {mentor.badge} &middot; {mentor.role}
                  </div>
                  <h3 className="font-serif mt-2 text-[1.4rem] font-semibold text-[var(--ink)]">
                    {mentor.name}
                  </h3>
                  <p className="mt-1 text-[0.82rem] text-[var(--muted)]">
                    NIDN {mentor.nidn}
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-[1.7] text-[var(--ink)]">
                    {mentor.specialization}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      className="inline-flex items-center gap-2 rounded-sm border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-[0.82rem] text-[var(--muted)] transition hover:border-[var(--ink)] hover:text-[var(--ink)]"
                      href={`mailto:${mentor.email}`}
                    >
                      <MailIcon className="size-4" />
                      <span>{mentor.email}</span>
                    </a>
                    <a
                      className="inline-flex items-center gap-2 rounded-sm border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-[0.82rem] text-[var(--muted)] transition hover:border-[var(--ink)] hover:text-[var(--ink)]"
                      href={`https://instagram.com/${mentor.instagram.replace("@", "")}`}
                      rel="noreferrer"
                      target="_blank"
                    >
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
