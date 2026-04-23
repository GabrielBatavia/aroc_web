"use client";

import Image from "next/image";
import { useState } from "react";

import type { TeamYear } from "@/data/aroc";
import { AboutSectionTitle } from "@/components/about/AboutSectionTitle";
import {
  ChevronDownIcon,
  InstagramIcon,
  PhoneIcon,
  UsersIcon,
} from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type TeamDirectoryProps = {
  cohorts: TeamYear[];
};

export function TeamDirectory({ cohorts }: TeamDirectoryProps) {
  const [openYear, setOpenYear] = useState(cohorts[0]?.year ?? "");
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`surface-paper pb-24 pt-20 sm:pt-24 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <AboutSectionTitle
          icon={<UsersIcon className="size-5" />}
          title="Direktori Anggota Tim"
          kicker="Semua Anggota"
        />

        <div className="mt-14 space-y-4">
          {cohorts.map((cohort) => {
            const isOpen = cohort.year === openYear;

            return (
              <div
                className="overflow-hidden rounded-sm border border-[var(--rule)] bg-white transition-colors duration-200"
                key={cohort.year}
              >
                <button
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-6 py-5 text-left sm:px-8"
                  onClick={() => setOpenYear(isOpen ? "" : cohort.year)}
                  type="button"
                >
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="numeral text-[1.6rem] leading-none text-[var(--gold-deep)]">
                      {cohort.year}
                    </span>
                    <span className="font-serif text-[1.15rem] font-semibold text-[var(--ink)]">
                      {cohort.label}
                    </span>
                    <span className="text-[0.85rem] text-[var(--muted)]">
                      &middot; {cohort.members.length} anggota
                    </span>
                  </div>

                  <ChevronDownIcon
                    className={[
                      "size-5 text-[var(--muted)] transition-transform duration-200",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                {isOpen ? (
                  <div className="border-t border-[var(--rule)] bg-[var(--paper-soft)] px-6 pb-8 pt-8 sm:px-8">
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                      {cohort.members.map((member, index) => (
                        <article key={`${cohort.year}-${member.name}`}>
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[var(--paper-deep)]">
                            <Image
                              alt={`${member.name} portrait`}
                              className="h-full w-full object-cover"
                              fill
                              sizes="(max-width: 1279px) 50vw, 220px"
                              src={member.image}
                            />
                            <div className="numeral absolute left-3 top-3 text-[1.8rem] leading-none text-[var(--paper)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="font-serif text-[1.15rem] font-semibold leading-tight text-[var(--ink)]">
                              {member.name}
                            </h3>
                            <div className="mt-1 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[var(--gold-deep)]">
                              {member.role}
                            </div>
                            <p className="mt-2 text-[0.8rem] text-[var(--muted)]">
                              NIM {member.nim}
                            </p>

                            <div className="mt-4 flex flex-col gap-2">
                              <a
                                className="inline-flex max-w-fit items-center gap-2 text-[0.82rem] text-[var(--muted)] transition hover:text-[var(--ink)]"
                                href={`https://instagram.com/${member.handle.replace("@", "").replace(/_+$/g, "")}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <InstagramIcon className="size-4" />
                                <span>{member.handle}</span>
                              </a>
                              <a
                                className="inline-flex max-w-fit items-center gap-2 text-[0.82rem] text-[var(--muted)] transition hover:text-[var(--ink)]"
                                href={`tel:${member.phone}`}
                              >
                                <PhoneIcon className="size-4" />
                                <span>{member.phone}</span>
                              </a>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
