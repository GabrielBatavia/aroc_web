import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { RobotHotspotViewer } from "@/components/robot-experience/RobotHotspotViewer";
import {
  footerData,
  footerNavigation,
  navLinks,
} from "@/data/aroc";
import {
  robotExperienceHero,
  robotHotspots,
  robotKitItems,
  robotOverviewStats,
  robotSafetyNotes,
  robotUpgradeCards,
} from "@/data/robotExperience";

export const metadata: Metadata = {
  title: "Robot 3D Experience | AROC_PL",
  description:
    "Interactive 3D robot explorer AROC_PL: putar model humanoid, klik hotspot OP3, dan pelajari vision, compute core, DYNAMIXEL, IMU, OpenCR, serta power system.",
  openGraph: {
    title: "Robot 3D Experience | AROC_PL",
    description:
      "Bedah platform humanoid OP3 lewat model 3D interaktif dan hotspot spesifikasi.",
    images: ["/images/hero-integrated.png"],
  },
};

export default function Robot3DPage() {
  return (
    <>
      <Navbar links={navLinks} />

      <main className="flex-1" id="main-content">
        <section className="surface-ink campaign-shell relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-28 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.17),transparent_66%)] blur-3xl"
          />
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <div className="kicker kicker-on-ink">
                  {robotExperienceHero.eyebrow}
                </div>
                <h1 className="headline mt-6 max-w-[11ch] text-[clamp(4rem,11vw,8.6rem)] text-[var(--cream)]">
                  Robot 3D <span className="headline-italic-on-ink">experience.</span>
                </h1>
              </div>

              <div className="lg:pb-4">
                <p className="max-w-[39rem] text-[1.08rem] leading-[1.9] text-[rgba(248,247,240,0.74)]">
                  {robotExperienceHero.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="btn-gold luxury-shimmer"
                    href="#interactive-robot"
                  >
                    Mulai bedah robot
                  </a>
                  <Link className="btn-ghost-paper" href="/">
                    Kembali ke beranda
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {robotOverviewStats.map((stat) => (
                <div
                  className="rounded-[1.25rem] border border-[rgba(255,228,92,0.16)] bg-[rgba(248,247,240,0.055)] p-4 backdrop-blur"
                  key={stat.label}
                >
                  <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.5)]">
                    {stat.label}
                  </div>
                  <div className="mt-3 font-display text-[2rem] font-black uppercase leading-none tracking-[-0.04em] text-[var(--yellow)]">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="surface-ink relative overflow-hidden pb-20 sm:pb-28"
          id="interactive-robot"
        >
          <div className="campaign-shell absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-8">
            <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <div className="kicker kicker-on-ink">Interactive Model</div>
                <h2 className="headline mt-5 max-w-[12ch] text-[clamp(3rem,8vw,6.4rem)] text-[var(--cream)]">
                  Klik hotspot. Fokus ke sistem.
                </h2>
              </div>
              <a
                className="luxury-chip inline-flex w-fit rounded-full border border-[rgba(255,228,92,0.28)] bg-[rgba(255,228,92,0.08)] px-4 py-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-[var(--yellow)]"
                href="https://emanual.robotis.com/docs/en/platform/op3/introduction/"
                rel="noreferrer"
                target="_blank"
              >
                {robotExperienceHero.sourceLabel}
              </a>
            </div>

            <RobotHotspotViewer
              alt="Interactive 3D humanoid robot model with OP3 specification hotspots"
              hotspots={robotHotspots}
              modelSrc={robotExperienceHero.modelSrc}
              posterSrc={robotExperienceHero.posterSrc}
            />
          </div>
        </section>

        <section className="section-paper relative overflow-hidden py-20 sm:py-28">
          <div className="dot-grid-paper absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="mb-11 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <div className="kicker">Platform Upgrade</div>
                <h2 className="headline mt-5 text-[clamp(3.2rem,8vw,6.2rem)] text-[var(--navy-deep)]">
                  Kenapa OP3 terasa lebih siap riset.
                </h2>
              </div>
              <p className="max-w-[36rem] text-[1rem] leading-[1.85] text-[var(--muted-dark)] lg:justify-self-end">
                ROBOTIS OP3 membawa peningkatan besar dari OP2: aktuator lebih kuat, compute lebih modern, storage lebih lega, networking lebih siap, dan workflow development berbasis ROS2.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {robotUpgradeCards.map((upgrade) => (
                <article
                  className="luxury-surface rounded-[2rem] border border-[var(--rule)] bg-white/75 p-6 shadow-[0_30px_80px_-62px_rgba(7,12,34,0.7)]"
                  key={upgrade.label}
                >
                  <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                    {upgrade.label}
                  </div>
                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl border border-[rgba(7,12,34,0.09)] bg-[var(--cream-soft)] p-4">
                      <div className="font-mono text-[0.52rem] font-black uppercase tracking-[0.15em] text-[var(--muted-dark)]">
                        Before
                      </div>
                      <div className="mt-2 font-display text-[2rem] font-black uppercase leading-none text-[var(--navy-deep)]">
                        {upgrade.before}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[var(--yellow)] p-4 text-[var(--navy-deep)]">
                      <div className="font-mono text-[0.52rem] font-black uppercase tracking-[0.15em] opacity-70">
                        OP3
                      </div>
                      <div className="mt-2 font-display text-[2rem] font-black uppercase leading-none">
                        {upgrade.after}
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-[0.92rem] leading-[1.72] text-[var(--muted-dark)]">
                    {upgrade.note}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-ink campaign-shell relative overflow-hidden py-20 sm:py-28">
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="lg:sticky lg:top-32">
                <div className="kicker kicker-on-ink">Field Kit</div>
                <h2 className="headline mt-5 max-w-[10ch] text-[clamp(3.2rem,8vw,6.4rem)] text-[var(--cream)]">
                  Bukan cuma robot, tapi satu ekosistem testing.
                </h2>
                <p className="mt-7 max-w-[33rem] text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.7)]">
                  Paket OP3 disusun untuk langsung masuk siklus development: power, tools, spare part, recovery, hard case, sampai bola untuk validasi behavior soccer.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {robotKitItems.map((kit, index) => (
                  <article
                    className="rounded-[1.7rem] border border-[rgba(255,228,92,0.16)] bg-[rgba(248,247,240,0.06)] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[rgba(255,228,92,0.42)]"
                    key={kit.item}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">
                        Kit {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="rounded-full bg-[var(--yellow)] px-3 py-1 font-mono text-[0.55rem] font-black uppercase tracking-[0.13em] text-[var(--navy-deep)]">
                        x{kit.quantity}
                      </div>
                    </div>
                    <h3 className="font-display mt-5 text-[2rem] font-black uppercase leading-none tracking-[-0.04em] text-[var(--cream)]">
                      {kit.item}
                    </h3>
                    <p className="mt-4 text-[0.92rem] leading-[1.72] text-[rgba(248,247,240,0.66)]">
                      {kit.note}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-paper-warm relative overflow-hidden py-20 sm:py-24">
          <div className="dot-grid-paper absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="luxury-surface overflow-hidden rounded-[2.4rem] border border-[var(--rule)] bg-white/78 shadow-[0_40px_100px_-68px_rgba(7,12,34,0.7)] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-[var(--yellow)] p-7 text-[var(--navy-deep)] sm:p-10">
                <div className="font-mono text-[0.68rem] font-black uppercase tracking-[0.2em]">
                  Safety Layer
                </div>
                <h2 className="font-display mt-5 text-[clamp(3rem,7vw,5.6rem)] font-black uppercase leading-[0.82] tracking-[-0.055em]">
                  Robot dinamis perlu disiplin operasi.
                </h2>
                <p className="mt-6 max-w-[34rem] text-[1rem] leading-[1.8] opacity-78">
                  OP3 adalah platform humanoid bertenaga servo, baterai LiPo, dan motion aktif. Experience 3D ini juga menampilkan konteks safety agar pengguna tidak hanya melihat spesifikasi, tapi memahami cara memperlakukan robot riset.
                </p>
              </div>

              <div className="grid gap-3 p-5 sm:p-7">
                {robotSafetyNotes.map((note, index) => (
                  <div
                    className="flex gap-4 rounded-[1.3rem] border border-[rgba(7,12,34,0.1)] bg-[var(--cream-soft)] p-4"
                    key={note}
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--navy-deep)] font-mono text-[0.62rem] font-black text-[var(--yellow)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-[0.95rem] leading-[1.7] text-[var(--muted-dark)]">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        contact={footerData.contact}
        description={footerData.description}
        navigation={footerNavigation}
        sponsors={footerData.sponsors}
      />
    </>
  );
}
