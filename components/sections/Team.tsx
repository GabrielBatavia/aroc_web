"use client";

import Image from "next/image";
import { startTransition, useState } from "react";

import type { TeamLead, TeamStat, TeamYear } from "@/data/aroc";
import {
  CpuIcon,
  InstagramIcon,
  PhoneIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type TeamProps = {
  lead: TeamLead;
  years: TeamYear[];
  stats: TeamStat[];
};

const factIconMap = {
  trophy: TrophyIcon,
  cpu: CpuIcon,
  users: UsersIcon,
};

export function Team({ lead, years, stats }: TeamProps) {
  const [selectedYear, setSelectedYear] = useState(years[0]?.year ?? "");
  const activeYear =
    years.find((year) => year.year === selectedYear) ?? years[0];

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: leadRef, isVisible: leadVisible } = useScrollReveal();
  const { ref: membersRef, isVisible: membersVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();

  return (
    <section className="surface-paper scroll-mt-24 py-20 sm:py-28" id="team">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <div
          ref={headerRef}
          className={`reveal-base reveal-up ${headerVisible ? "revealed" : ""}`}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-[38rem]">
              <div className="kicker">Formasi Lengkap</div>
              <h2 className="headline mt-5 text-[clamp(2.4rem,5vw,4rem)] text-[var(--ink)]">
                Kenali orang-orang
                <br />
                <span className="headline-italic">di balik robot.</span>
              </h2>
            </div>
            <p className="max-w-[26rem] text-[1rem] leading-[1.8] text-[var(--muted)] md:pb-2">
              Tiga angkatan. Sebelas spesialis. Satu obsesi bersama: membangun
              robot yang bekerja saat pertandingan berlangsung.
            </p>
          </div>
        </div>

        {/* Captain spotlight */}
        <div
          ref={leadRef}
          className={`mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center reveal-base reveal-up ${leadVisible ? "revealed" : ""}`}
        >
          <div className="group relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[var(--paper-soft)]">
              <Image
                alt={`${lead.name} portrait`}
                className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                src={lead.image}
              />
              <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[var(--gold-bright)] transition-all duration-500 group-hover:left-2 group-hover:top-2" />
              <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-[var(--gold-bright)] transition-all duration-500 group-hover:right-2 group-hover:top-2" />
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[var(--gold-bright)] transition-all duration-500 group-hover:bottom-2 group-hover:left-2" />
              <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[var(--gold-bright)] transition-all duration-500 group-hover:bottom-2 group-hover:right-2" />
            </div>
            <div className="absolute -bottom-5 left-8 right-8 bg-[var(--ink)] px-6 py-4 text-[var(--paper)] shadow-[0_16px_32px_-16px_rgba(15,27,44,0.5)]">
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-[var(--gold-bright)]">
                Kapten Tim &middot; {lead.badge}
              </div>
              <div className="mt-1 font-serif text-[1.1rem] font-semibold text-[var(--paper)]">
                {lead.name}
              </div>
            </div>
          </div>

          <div>
            <div className="kicker">Dalam Kata-Katanya</div>
            <blockquote className="font-serif mt-6 text-[clamp(1.5rem,2.8vw,2.1rem)] italic leading-[1.35] text-[var(--ink)]">
              <span className="text-[var(--gold-deep)]">&ldquo;</span>
              {lead.intro}
              <span className="text-[var(--gold-deep)]">&rdquo;</span>
            </blockquote>
            <div className="mt-6 font-semibold text-[var(--ink)]">
              {lead.name}
            </div>
            <div className="text-[0.92rem] text-[var(--muted)]">{lead.role}</div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {lead.facts.map((fact) => {
                const Icon = factIconMap[fact.icon];
                return (
                  <div
                    key={fact.label}
                    className="border-l-2 border-[var(--gold)] pl-4 transition-all duration-300 hover:border-[var(--gold-deep)] hover:pl-5"
                  >
                    <div className="flex items-center gap-2 text-[var(--gold-deep)]">
                      <Icon className="size-4" />
                      <div className="text-[0.68rem] font-bold uppercase tracking-[0.2em]">
                        {fact.label}
                      </div>
                    </div>
                    <div className="font-serif mt-2 text-[1.1rem] font-semibold text-[var(--ink)]">
                      {fact.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hairline mt-24" />

        {/* Roster */}
        <div className="mt-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="kicker">Skuad Lengkap</div>
              <h3 className="headline mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)] text-[var(--ink)]">
                Roster per angkatan
              </h3>
            </div>

            <div
              role="tablist"
              className="inline-flex flex-wrap gap-1 rounded-sm border border-[var(--rule)] bg-white p-1"
            >
              {years.map((year) => {
                const active = selectedYear === year.year;
                return (
                  <button
                    key={year.year}
                    role="tab"
                    aria-selected={active}
                    className={[
                      "rounded-sm px-5 py-2.5 text-[0.78rem] font-bold uppercase tracking-[0.16em] transition",
                      active
                        ? "bg-[var(--ink)] text-[var(--paper)]"
                        : "text-[var(--muted)] hover:text-[var(--ink)]",
                    ].join(" ")}
                    onClick={() => {
                      startTransition(() => setSelectedYear(year.year));
                    }}
                    type="button"
                  >
                    Angkatan {year.year}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={membersRef}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {activeYear.members.map((member, index) => (
              <article
                key={`${activeYear.year}-${member.name}`}
                className={`group reveal-base reveal-up ${membersVisible ? `revealed reveal-delay-${index + 1}` : ""}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[var(--paper-soft)]">
                  <Image
                    alt={`${member.name} — ${member.role}`}
                    className="h-full w-full object-cover transition duration-[700ms] group-hover:scale-[1.06]"
                    fill
                    sizes="(max-width: 1024px) 50vw, 260px"
                    src={member.image}
                  />
                  {/* Jersey number */}
                  <div className="numeral absolute left-3 top-3 text-[2.2rem] leading-none text-[var(--paper)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:scale-110 group-hover:text-[var(--gold-bright)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Hover overlay: gradient + quick links slide up */}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(15,27,44,0.92))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <a
                        className="inline-flex items-center gap-2 rounded-sm border border-[rgba(245,241,232,0.25)] bg-[rgba(15,27,44,0.6)] px-3 py-2 text-[0.78rem] text-[var(--paper)] backdrop-blur-sm transition hover:border-[var(--gold-bright)] hover:text-[var(--gold-bright)]"
                        href={`https://instagram.com/${member.handle.replace("@", "").replace(/_+$/g, "")}`}
                        rel="noreferrer"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <InstagramIcon className="size-3.5" />
                        <span className="truncate max-w-[8rem]">
                          {member.handle}
                        </span>
                      </a>
                      <a
                        className="inline-flex items-center gap-2 rounded-sm border border-[rgba(245,241,232,0.25)] bg-[rgba(15,27,44,0.6)] px-3 py-2 text-[0.78rem] text-[var(--paper)] backdrop-blur-sm transition hover:border-[var(--gold-bright)] hover:text-[var(--gold-bright)]"
                        href={`tel:${member.phone}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PhoneIcon className="size-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <h4 className="font-serif text-[1.25rem] font-semibold leading-tight text-[var(--ink)] transition-colors group-hover:text-[var(--gold-deep)]">
                    {member.name}
                  </h4>
                  <div className="mt-1 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                    {member.role}
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-[0.82rem] text-[var(--muted)]">
                    <span>NIM {member.nim}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className={`mt-20 grid gap-8 border-y border-[var(--rule)] py-10 sm:grid-cols-2 lg:grid-cols-4 reveal-base reveal-up ${statsVisible ? "revealed" : ""}`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                "flex items-baseline gap-5 transition-transform duration-300 hover:-translate-y-0.5",
                index !== 0
                  ? "lg:border-l lg:border-[var(--rule)] lg:pl-8"
                  : "",
              ].join(" ")}
            >
              <div className="numeral text-[2.8rem] leading-none text-[var(--gold-deep)]">
                {stat.value}
              </div>
              <div className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
