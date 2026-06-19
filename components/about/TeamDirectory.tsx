"use client";

import Image from "next/image";
import { useState } from "react";

import { AboutSectionTitle } from "@/components/about/AboutSectionTitle";
import { ChevronDownIcon, InstagramIcon, PhoneIcon, UsersIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { TeamYear } from "@/data/aroc";

type TeamDirectoryProps = {
  cohorts: TeamYear[];
};

export function TeamDirectory({ cohorts }: TeamDirectoryProps) {
  const [openYear, setOpenYear] = useState(cohorts[0]?.year ?? "");
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`surface-paper relative overflow-hidden pb-24 pt-20 sm:pt-24 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <AboutSectionTitle icon={<UsersIcon className="size-6" />} kicker="Semua Anggota" title="Direktori Anggota Tim" />

        <div className="mt-12 space-y-5">
          {cohorts.map((cohort) => {
            const isOpen = cohort.year === openYear;
            const panelId = `team-cohort-${cohort.year}`;
            return (
              <div className="luxury-surface overflow-hidden rounded-[2rem] border border-[var(--rule)] bg-white/[0.76] shadow-[0_22px_55px_-42px_rgba(7,12,34,0.55)] transition" key={cohort.year}>
                <button aria-controls={panelId} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7" onClick={() => setOpenYear(isOpen ? "" : cohort.year)} type="button">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <span className="numeral text-[2.6rem] leading-none text-[var(--gold-deep)]">{cohort.year}</span>
                    <span className="font-display text-[1.7rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)]">{cohort.label}</span>
                    <span className="font-mono text-[0.7rem] font-black uppercase tracking-[0.16em] text-[var(--muted-dark)]">{cohort.members.length} anggota</span>
                  </div>
                  <ChevronDownIcon className={["size-6 shrink-0 text-[var(--navy-deep)] transition-transform duration-300", isOpen ? "rotate-180" : ""].join(" ")} />
                </button>

                <div className={["grid transition-[grid-template-rows] duration-500", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"].join(" ")} id={panelId}>
                  <div className="overflow-hidden">
                    <div className="border-t border-[var(--rule)] bg-[var(--cream-soft)] px-5 pb-7 pt-7 sm:px-7">
                      <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
                      {cohort.members.map((member, index) => (
                        <article className="group luxury-surface rounded-[1.35rem]" key={`${cohort.year}-${member.name}`}>
                          <div className="luxury-image-frame relative aspect-[3/4] overflow-hidden rounded-[1.35rem] bg-[var(--navy-deep)] shadow-[0_26px_62px_-44px_rgba(7,12,34,0.8)]">
                            <Image
                              alt={`${member.name} portrait`}
                              className="luxury-image object-cover"
                              fill
                              sizes="(max-width: 1279px) 50vw, 240px"
                              src={member.image}
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,34,0.05)_30%,rgba(7,12,34,0.88))]" />
                            <div className="numeral absolute left-3 top-3 text-[2.5rem] leading-none text-[var(--yellow)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="font-display text-[1.45rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)]">{member.name}</h3>
                            <div className="mt-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--gold-deep)]">{member.role}</div>
                            <p className="mt-2 text-[0.82rem] text-[var(--muted-dark)]">NIM {member.nim}</p>

                            <div className="mt-4 flex flex-col gap-2">
                              <a className="luxury-chip inline-flex max-w-fit items-center gap-2 text-[0.82rem] text-[var(--muted-dark)] transition hover:text-[var(--navy-deep)]" href={`https://instagram.com/${member.handle.replace("@", "").replace(/_+$/g, "")}`} rel="noreferrer" target="_blank">
                                <InstagramIcon className="size-4" />
                                <span>{member.handle}</span>
                              </a>
                              <a className="luxury-chip inline-flex max-w-fit items-center gap-2 text-[0.82rem] text-[var(--muted-dark)] transition hover:text-[var(--navy-deep)]" href={`tel:${member.phone}`}>
                                <PhoneIcon className="size-4" />
                                <span>{member.phone}</span>
                              </a>
                            </div>
                          </div>
                        </article>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
