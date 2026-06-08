"use client";

import Link from "next/link";

import { ArocGeneratedMark, DoodleArrow, DoodleUnderline } from "@/components/shared/BrandAssets";
import { ArrowRightIcon, TrophyIcon } from "@/components/shared/Icons";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const sponsorPerks = [
  {
    title: "Visibilitas nasional",
    description: "Logo partner tampil di kit tim, publikasi, dokumentasi, dan momen kompetisi KRI.",
  },
  {
    title: "Jalur talenta engineering",
    description: "Akses ke mahasiswa robotika yang sudah terbiasa membangun sistem nyata lintas hardware dan software.",
  },
  {
    title: "Dampak yang terukur",
    description: "Kemitraan bisa dilaporkan lewat aktivitas, progres robot, publikasi, dan pencapaian kompetisi.",
  },
];

export function SponsorCta() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="surface-ink campaign-shell relative scroll-mt-24 py-20 sm:py-28" id="sponsor">
      <div ref={ref} className={`relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgba(255,228,92,0.24)] bg-[rgba(17,26,61,0.72)] p-5 shadow-[0_44px_120px_-76px_rgba(0,0,0,1)] sm:p-8 lg:p-12">
          <DoodleArrow className="absolute right-6 top-8 hidden w-40 rotate-[-8deg] text-[var(--yellow)] opacity-70 lg:block" />
          <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div>
              <div className="champ-badge-outline">
                <TrophyIcon className="size-4" />
                Kemitraan 2026
              </div>
              <div className="relative mt-7">
                <h2 className="headline max-w-[10ch] text-[clamp(3.3rem,9vw,7.7rem)] text-[var(--cream)]">
                  Taruh brand kamu di podium.
                </h2>
                <DoodleUnderline className="absolute -bottom-5 left-2 w-72 text-[var(--yellow)]" />
              </div>
              <p className="mt-11 max-w-[36rem] text-[1.05rem] leading-[1.85] text-[rgba(248,247,240,0.76)]">
                AROC_PL sedang mencari partner yang percaya pada engineering Indonesia. Kita bisa merancang kemitraan untuk brand visibility, recruitment pipeline, riset, atau dukungan kompetisi.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <MagneticButton className="btn-gold" href="mailto:hello@arocpl.com?subject=Permintaan%20Kemitraan%20AROC_PL">
                  Hubungi Tim Kami
                  <ArrowRightIcon className="size-5" />
                </MagneticButton>
                <Link className="btn-ghost-paper" href="mailto:hello@arocpl.com">
                  hello@arocpl.com
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto flex aspect-square max-w-[24rem] items-center justify-center rounded-full bg-[var(--yellow)] p-8 text-[var(--navy-deep)] shadow-[0_0_0_1rem_rgba(255,228,92,0.08),0_40px_100px_-62px_rgba(255,228,92,0.9)]">
                <ArocGeneratedMark className="h-full w-full max-w-[16rem]" />
              </div>
              <div className="mt-7 grid gap-4">
                {sponsorPerks.map((perk, index) => (
                  <article className="rounded-[1.35rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-[rgba(255,228,92,0.38)]" key={perk.title}>
                    <div className="numeral text-[1.65rem] leading-none text-[var(--yellow)]">0{index + 1}</div>
                    <h3 className="font-display mt-3 text-[1.65rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--cream)]">
                      {perk.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.75] text-[rgba(248,247,240,0.66)]">
                      {perk.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
