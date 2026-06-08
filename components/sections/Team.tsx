"use client";

import Image from "next/image";
import { startTransition, useState } from "react";

import { DoodleUnderline } from "@/components/shared/BrandAssets";
import {
  CpuIcon,
  InstagramIcon,
  PhoneIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { TeamLead, TeamStat, TeamYear } from "@/data/aroc";

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
  const activeYear = years.find((year) => year.year === selectedYear) ?? years[0];
  const activeYearKey = activeYear?.year ?? "team";
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: leadRef, isVisible: leadVisible } = useScrollReveal();
  const { ref: membersRef, isVisible: membersVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();

  return (
    <section className="surface-paper relative scroll-mt-24 overflow-hidden py-20 sm:py-28" id="team">
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <div ref={headerRef} className={`reveal-base reveal-up ${headerVisible ? "revealed" : ""}`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div className="relative">
              <div className="kicker">Formasi Lengkap</div>
              <h2 className="headline mt-5 max-w-[11ch] text-[clamp(3.2rem,8vw,6.5rem)] text-[var(--navy-deep)]">
                Orang di balik robot.
              </h2>
              <DoodleUnderline className="absolute -bottom-4 left-1 w-60 text-[var(--gold-deep)]" />
            </div>
            <p className="max-w-[32rem] text-[1.05rem] leading-[1.85] text-[var(--muted-dark)] lg:pb-5">
              Tiga angkatan, sebelas spesialis, dan satu ritual harian: build, test, break, repair, repeat sampai robot siap turun lapangan.
            </p>
          </div>
        </div>

        <div ref={leadRef} className={`mt-16 grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch reveal-base reveal-up ${leadVisible ? "revealed" : ""}`}>
          <div className="group relative min-h-[32rem] overflow-hidden rounded-[2rem] bg-[var(--navy-deep)]">
            <Image
              alt={`${lead.name} portrait`}
              className="object-cover transition duration-[900ms] group-hover:scale-[1.05]"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 460px"
              src={lead.image}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(5,8,22,0.96))]" />
            <div className="absolute left-5 top-5 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.66rem] font-black uppercase tracking-[0.2em] text-[var(--navy-deep)]">
              Kapten / {lead.badge}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="font-display text-[2.8rem] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[var(--cream)]">
                {lead.name}
              </h3>
              <p className="mt-2 font-mono text-[0.72rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">
                {lead.role}
              </p>
            </div>
          </div>

          <div className="card-ink relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-[rgba(255,228,92,0.12)] blur-3xl" />
            <div className="relative z-10">
              <div className="kicker kicker-on-ink">Dalam Kata-Katanya</div>
              <blockquote className="mt-8 font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-[var(--cream)]">
                {lead.intro}
              </blockquote>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {lead.facts.map((fact) => {
                  const Icon = factIconMap[fact.icon];
                  return (
                    <div className="rounded-[1.25rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] p-4" key={fact.label}>
                      <Icon className="size-5 text-[var(--yellow)]" />
                      <div className="font-display mt-4 text-[1.55rem] font-black uppercase leading-none text-[var(--cream)]">
                        {fact.value}
                      </div>
                      <div className="mt-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.48)]">
                        {fact.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="kicker">Skuad Lengkap</div>
            <h3 className="headline mt-4 text-[clamp(2.5rem,6vw,4.6rem)] text-[var(--navy-deep)]">
              Roster per angkatan.
            </h3>
          </div>
          <div role="tablist" className="flex flex-wrap gap-2 rounded-full border border-[var(--rule)] bg-white/70 p-1.5 shadow-[0_16px_38px_-32px_rgba(7,12,34,0.8)]">
            {years.map((year) => {
              const active = selectedYear === year.year;
              return (
                <button
                  aria-selected={active}
                  className={[
                    "rounded-full px-4 py-2.5 font-mono text-[0.7rem] font-black uppercase tracking-[0.16em] transition",
                    active ? "bg-[var(--navy-deep)] text-[var(--yellow)]" : "text-[var(--muted-dark)] hover:text-[var(--navy-deep)]",
                  ].join(" ")}
                  key={year.year}
                  onClick={() => startTransition(() => setSelectedYear(year.year))}
                  role="tab"
                  type="button"
                >
                  {year.year}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={membersRef} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activeYear?.members.map((member, index) => (
            <article className={`group reveal-base reveal-up ${membersVisible ? `revealed reveal-delay-${index + 1}` : ""}`} key={`${activeYearKey}-${member.name}`}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem] bg-[var(--navy-deep)] shadow-[0_30px_70px_-46px_rgba(7,12,34,0.88)]">
                <Image
                  alt={`${member.name} - ${member.role}`}
                  className="object-cover transition duration-[900ms] group-hover:scale-[1.06]"
                  fill
                  sizes="(max-width: 1024px) 50vw, 280px"
                  src={member.image}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,34,0.06)_20%,rgba(7,12,34,0.92))] opacity-80" />
                <div className="numeral absolute left-4 top-4 text-[3rem] leading-none text-[var(--yellow)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="flex flex-wrap gap-2">
                    <a className="inline-flex items-center gap-2 rounded-full bg-[rgba(248,247,240,0.12)] px-3 py-2 text-[0.75rem] text-[var(--cream)] backdrop-blur transition hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)]" href={`https://instagram.com/${member.handle.replace("@", "").replace(/_+$/g, "")}`} rel="noreferrer" target="_blank">
                      <InstagramIcon className="size-3.5" />
                      {member.handle}
                    </a>
                    <a aria-label={`Telepon ${member.name}`} className="inline-flex items-center gap-2 rounded-full bg-[rgba(248,247,240,0.12)] px-3 py-2 text-[0.75rem] text-[var(--cream)] backdrop-blur transition hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)]" href={`tel:${member.phone}`}>
                      <PhoneIcon className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h4 className="font-display text-[1.6rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)] transition group-hover:text-[var(--gold-deep)]">
                  {member.name}
                </h4>
                <div className="mt-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.16em] text-[var(--gold-deep)]">
                  {member.role}
                </div>
                <p className="mt-2 text-[0.86rem] text-[var(--muted-dark)]">NIM {member.nim}</p>
              </div>
            </article>
          ))}
        </div>

        <div ref={statsRef} className={`mt-16 grid gap-4 rounded-[2rem] bg-[var(--navy-deep)] p-5 text-[var(--cream)] sm:grid-cols-2 lg:grid-cols-4 sm:p-7 reveal-base reveal-up ${statsVisible ? "revealed" : ""}`}>
          {stats.map((stat) => (
            <div className="rounded-[1.25rem] border border-[rgba(248,247,240,0.1)] bg-[rgba(248,247,240,0.05)] p-5" key={stat.label}>
              <div className="numeral text-[3.2rem] leading-none text-[var(--yellow)]">{stat.value}</div>
              <div className="mt-2 font-mono text-[0.7rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.56)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
