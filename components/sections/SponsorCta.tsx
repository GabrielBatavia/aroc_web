"use client";

import Link from "next/link";

import { MagneticButton } from "@/components/shared/MagneticButton";
import { ArrowRightIcon, TrophyIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const sponsorPerks = [
  {
    title: "Visibilitas nasional",
    description:
      "Logo Anda di kit tim, live stream pertandingan, dan di setiap momen press dari panggung KRI dan seterusnya.",
  },
  {
    title: "Jalur talenta engineering",
    description:
      "Akses langsung ke lulusan robotika terbaik Polinema — kandidat yang sudah biasa men-ship sistem produksi.",
  },
  {
    title: "Dampak yang terukur",
    description:
      "Laporan kuartalan tentang jangkauan, podium, dan hasil pembinaan talenta. Anda melihat tepat apa yang dibangun oleh kemitraan ini.",
  },
];

export function SponsorCta() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      className="surface-ink relative scroll-mt-24 py-20 sm:py-28"
      id="sponsor"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(201,162,75,0.18), transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(165,42,42,0.08), transparent 55%)",
        }}
      />

      <div
        ref={ref}
        className={`relative mx-auto max-w-[1200px] px-4 sm:px-8 reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
      >
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
          <div>
            <div className="champ-badge-outline">
              <TrophyIcon className="size-4" />
              <span>Kemitraan 2026</span>
            </div>

            <h2 className="headline mt-8 text-[clamp(2.4rem,5vw,4.2rem)] text-[var(--paper)]">
              Taruh brand Anda
              <br />
              di{" "}
              <span className="headline-italic-on-ink">podium.</span>
            </h2>

            <p className="mt-7 max-w-[32rem] text-[1.05rem] leading-[1.85] text-[rgba(245,241,232,0.8)]">
              AROC_PL sedang mencari partner yang percaya pada engineering
              Indonesia. Apakah Anda membangun brand recognition, merekrut
              talenta robotika, atau berinvestasi pada pendidikan &mdash; kami
              bisa merancang kemitraan yang memberi hasil untuk kedua belah
              pihak.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton
                href="mailto:hello@arocpl.com?subject=Permintaan%20Kemitraan%20AROC_PL"
                className="btn-gold"
              >
                Hubungi Tim Kami
                <ArrowRightIcon className="size-5" />
              </MagneticButton>
              <Link className="btn-ghost-paper" href="mailto:hello@arocpl.com">
                hello@arocpl.com
              </Link>
            </div>

            <div className="mt-10 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[rgba(245,241,232,0.5)]">
              Proposal kemitraan tersedia &middot; Respon dalam 48 jam
            </div>
          </div>

          <div className="space-y-7">
            {sponsorPerks.map((perk, index) => (
              <div
                key={perk.title}
                className="group border-l-2 border-[var(--gold)] pl-6 transition-all duration-300 hover:border-[var(--gold-bright)] hover:pl-7"
              >
                <div className="numeral text-[1.5rem] leading-none text-[var(--gold-bright)]">
                  0{index + 1}
                </div>
                <h3 className="font-serif mt-3 text-[1.35rem] font-semibold text-[var(--paper)]">
                  {perk.title}
                </h3>
                <p className="mt-2 text-[0.98rem] leading-[1.8] text-[rgba(245,241,232,0.72)]">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
