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

type TeamDirectoryProps = {
  cohorts: TeamYear[];
  notePath: string;
};

export function TeamDirectory({ cohorts, notePath }: TeamDirectoryProps) {
  const [openYear, setOpenYear] = useState(cohorts[0]?.year ?? "");

  return (
    <section className="pt-14 sm:pt-16">
      <AboutSectionTitle
        icon={<UsersIcon className="size-6" />}
        title="Anggota Tim"
        tone="orange"
      />

      <div className="mt-8 space-y-6">
        {cohorts.map((cohort) => {
          const isOpen = cohort.year === openYear;

          return (
            <div
              className="overflow-hidden rounded-[1rem] border border-[#1e2939] bg-[rgba(16,24,40,0.58)]"
              key={cohort.year}
            >
              <button
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-5 py-5 text-left sm:px-6"
                onClick={() => setOpenYear(cohort.year)}
                type="button"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span className="rounded-full border border-[rgba(0,184,219,0.3)] bg-[linear-gradient(90deg,rgba(0,184,219,0.2),rgba(43,127,255,0.2))] px-4 py-2 font-display text-[0.9rem] font-bold tracking-[-0.02em] text-[var(--cyan)]">
                    {cohort.label}
                  </span>
                  <span className="text-sm text-[var(--muted)] sm:text-[0.95rem]">
                    {cohort.members.length} anggota
                  </span>
                </div>

                <ChevronDownIcon
                  className={[
                    "size-5 text-[#98a2b3] transition-transform duration-200",
                    isOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {isOpen ? (
                <div className="border-t border-[rgba(255,255,255,0.05)] px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {cohort.members.map((member) => (
                      <article
                        className="overflow-hidden rounded-[1rem] border border-[#1e2939] bg-[rgba(11,18,31,0.96)] shadow-[0_16px_30px_rgba(0,0,0,0.28)]"
                        key={`${cohort.year}-${member.name}`}
                      >
                        <div className="relative h-[190px] overflow-hidden">
                          <Image
                            alt={`${member.name} portrait`}
                            className="h-full w-full object-cover"
                            height={190}
                            sizes="(max-width: 1279px) 50vw, 220px"
                            src={member.image}
                            width={220}
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(7,12,22,0.82))]" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="inline-flex rounded-full border border-[rgba(0,184,219,0.22)] bg-[rgba(0,184,219,0.08)] px-3 py-1 text-[0.68rem] font-semibold tracking-[0.08em] text-[var(--cyan)]">
                              {member.role}
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-display text-[1.35rem] font-black tracking-[-0.03em] text-white">
                            {member.name}
                          </h3>
                          <p className="mt-1 text-sm text-[#667085]">NIM: {member.nim}</p>

                          <div className="mt-4 flex flex-col gap-3">
                            <a
                              className="inline-flex max-w-fit items-center gap-2 rounded-full border border-[rgba(148,163,184,0.16)] bg-[rgba(31,41,55,0.55)] px-4 py-2 text-sm text-[#aeb8c4] transition hover:border-[rgba(0,184,219,0.24)] hover:text-white"
                              href={`https://instagram.com/${member.handle.replace("@", "").replace(/_+$/g, "")}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <InstagramIcon className="size-4" />
                              <span>{member.handle}</span>
                            </a>
                            <a
                              className="inline-flex max-w-fit items-center gap-2 rounded-full border border-[rgba(148,163,184,0.16)] bg-[rgba(31,41,55,0.55)] px-4 py-2 text-sm text-[#aeb8c4] transition hover:border-[rgba(0,184,219,0.24)] hover:text-white"
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

      <div className="mt-8 rounded-[14px] border border-dashed border-[#364153] px-5 py-6 text-center sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#6a7282]">
          <span>Data di atas adalah contoh. Ganti dengan data asli di</span>
          <code className="rounded bg-[#101828] px-2 py-1 font-mono text-[var(--cyan)]">
            {notePath}
          </code>
        </div>
      </div>
    </section>
  );
}
