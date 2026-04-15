"use client";

import Image from "next/image";
import { startTransition, useDeferredValue, useState } from "react";

import type { TeamLead, TeamStat, TeamYear } from "@/data/aroc";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CpuIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/shared/Icons";
import { SectionHeading } from "@/components/shared/SectionHeading";

type TeamProps = {
  lead: TeamLead;
  years: TeamYear[];
  stats: TeamStat[];
};

const statTone = {
  cyan: "text-[var(--cyan)]",
  orange: "text-[var(--orange)]",
  blue: "text-[#51a2ff]",
  gold: "text-[var(--gold)]",
  emerald: "text-[var(--green)]",
};

const factIconMap = {
  trophy: TrophyIcon,
  cpu: CpuIcon,
  users: UsersIcon,
};

export function Team({ lead, years, stats }: TeamProps) {
  const [selectedYear, setSelectedYear] = useState(years[0]?.year ?? "");
  const deferredYear = useDeferredValue(selectedYear);
  const selectedIndex = years.findIndex((year) => year.year === deferredYear);
  const activeYear = years.find((year) => year.year === deferredYear) ?? years[0];

  return (
    <section
      className="section-divider scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,rgba(4,11,22,0.84),rgba(5,9,18,0.98))] py-16 sm:py-20"
      id="team"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <SectionHeading
          centered
          description="Driven by shared ambition, every division brings a distinct technical capability into one coordinated robotics architecture."
          label="The Personnel"
          title={
            <>
              OUR <span className="heading-gradient-cyan">TEAM</span>
            </>
          }
        />

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-[rgba(0,184,219,0.18)] bg-[linear-gradient(135deg,rgba(10,22,35,0.96),rgba(10,15,28,0.92))] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-center">
            <div className="relative mx-auto w-full max-w-[220px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,184,219,0.18),transparent_68%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[999px] border-2 border-[rgba(0,211,243,0.5)] p-2">
                <Image
                  alt={`${lead.name} portrait`}
                  className="h-auto w-full rounded-[999px] object-cover"
                  height={250}
                  sizes="220px"
                  src={lead.image}
                  width={190}
                />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--blue))] px-5 py-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-[#02141c]">
                {lead.badge}
              </div>
            </div>

            <div>
              <div className="eyebrow !justify-start">System Commander</div>
              <h3 className="mt-3 font-display text-[clamp(2.3rem,5vw,4rem)] font-black uppercase leading-none text-white">
                {lead.name}
              </h3>
              <p className="mt-3 text-[1.15rem] text-[#c6d0db]">{lead.role}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {lead.facts.map((fact) => {
                  const Icon = factIconMap[fact.icon];

                  return (
                    <div
                      className="rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[rgba(5,12,22,0.85)] px-4 py-3"
                      key={fact.label}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-4 text-[var(--cyan)]" />
                        <div>
                          <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.4)]">
                            {fact.label}
                          </div>
                          <div className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">
                            {fact.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <blockquote className="mt-6 border-l-2 border-[rgba(0,184,219,0.45)] pl-5 text-[1rem] leading-8 text-[#aeb8c4]">
                &quot;{lead.intro}&quot;
              </blockquote>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-[18rem] flex-col items-center">
          <div className="h-14 w-px bg-[linear-gradient(180deg,rgba(0,211,243,0.72),rgba(0,211,243,0))]" />
          <div className="-mt-2 size-3 rounded-full border-2 border-[var(--cyan)] bg-black shadow-[0_0_16px_rgba(0,184,219,0.45)]" />
        </div>

        <div className="mx-auto mt-8 flex max-w-fit flex-wrap items-center justify-center gap-3 rounded-full border border-[rgba(240,177,0,0.2)] bg-[rgba(15,20,33,0.9)] p-2 shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
          {years.map((year) => (
            <button
              className={[
                "rounded-full px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.14em] transition duration-200",
                selectedYear === year.year
                  ? "bg-[linear-gradient(90deg,var(--cyan),var(--blue))] text-[#03141d]"
                  : "text-[#c5cfda] hover:bg-white/5 hover:text-white",
              ].join(" ")}
              key={year.year}
              onClick={() => {
                startTransition(() => setSelectedYear(year.year));
              }}
              type="button"
            >
              {year.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-4 lg:grid-cols-[48px_1fr_48px]">
          <button
            aria-label="Previous year"
            className="hidden size-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(8,14,24,0.82)] text-[rgba(255,255,255,0.4)] lg:inline-flex"
            type="button"
          >
            <ChevronLeftIcon className="size-5" />
          </button>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {activeYear.members.map((member) => (
              <article
                className="neon-panel overflow-hidden rounded-[1.6rem] transition duration-300 hover:-translate-y-1"
                key={`${activeYear.year}-${member.name}`}
              >
                <div className="relative h-[190px] overflow-hidden">
                  <Image
                    alt={`${member.name} team portrait`}
                    className="h-full w-full object-cover"
                    height={176}
                    sizes="(max-width: 1280px) 50vw, 260px"
                    src={member.image}
                    width={210}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(7,12,22,0.75))]" />
                  <div className="absolute bottom-3 left-3 rounded-full border border-[rgba(0,184,219,0.22)] bg-[rgba(0,184,219,0.09)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--cyan)]">
                    {member.role}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-display text-[1.35rem] font-bold uppercase text-white">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-sm text-[rgba(255,255,255,0.45)]">NIM: {member.nim}</p>

                  <div className="mt-4 space-y-3">
                    <div className="inline-flex rounded-full border border-[rgba(148,163,184,0.14)] bg-[rgba(148,163,184,0.08)] px-4 py-2 text-sm text-[#afb8c5]">
                      {member.handle}
                    </div>
                    <div className="inline-flex rounded-full border border-[rgba(148,163,184,0.14)] bg-[rgba(148,163,184,0.08)] px-4 py-2 text-sm text-[#afb8c5]">
                      {member.phone}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            aria-label="Next year"
            className="hidden size-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(8,14,24,0.82)] text-[rgba(255,255,255,0.4)] lg:inline-flex"
            type="button"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {years.map((year) => (
              <span
                className={[
                  "h-2.5 rounded-full transition-all duration-200",
                  deferredYear === year.year
                    ? "w-8 bg-[linear-gradient(90deg,var(--cyan),var(--blue))]"
                    : "w-2.5 bg-white/20",
                ].join(" ")}
                key={year.year}
              />
            ))}
          </div>
          <div className="text-[0.78rem] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.32)]">
            Data Page {selectedIndex + 1} / {years.length}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              className="rounded-[1.55rem] border border-white/8 bg-[rgba(9,15,27,0.82)] px-6 py-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              key={stat.label}
            >
              <div className={`font-display text-[clamp(2rem,5vw,3rem)] font-black uppercase ${statTone[stat.tone]}`}>
                {stat.value}
              </div>
              <div className="mx-auto mt-3 h-px w-8 bg-white/15" />
              <div className="mt-3 text-[0.88rem] uppercase tracking-[0.12em] text-[rgba(255,255,255,0.55)]">
                {stat.label}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
