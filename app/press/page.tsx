import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ArocGeneratedMark } from "@/components/shared/BrandAssets";
import { footerData, footerNavigation, navLinks } from "@/data/aroc";
import {
  brandColors,
  brandGuidelines,
  pressAssets,
  pressContacts,
  pressDownloads,
  pressHero,
} from "@/data/press";

export const metadata: Metadata = {
  title: "Media & Press Kit | AROC_PL",
  description:
    "Asset resmi AROC_PL: logo, foto robot, dokumentasi lab, brand guide singkat, dan kontak media untuk publikasi serta kemitraan.",
  openGraph: {
    title: "Media & Press Kit | AROC_PL",
    description: "Logo, foto robot, dokumentasi lab, dan kontak media resmi AROC_PL.",
    images: ["/images/hero-integrated.png"],
  },
};

export default function PressPage() {
  return (
    <>
      <Navbar links={navLinks} />

      <main className="flex-1" id="main-content">
        <section className="surface-ink campaign-shell relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
              <div>
                <div className="kicker kicker-on-ink">{pressHero.eyebrow}</div>
                <h1 className="headline mt-6 max-w-[11ch] text-[clamp(4rem,11vw,8.8rem)] text-[var(--cream)]">
                  Press kit resmi untuk publikasi <span className="headline-italic-on-ink">AROC_PL.</span>
                </h1>
                <p className="mt-8 max-w-[42rem] text-[1.08rem] leading-[1.9] text-[rgba(248,247,240,0.72)]">
                  {pressHero.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link className="btn-gold luxury-shimmer" href="#assets">
                    Lihat Asset
                  </Link>
                  <Link className="btn-ghost-paper luxury-shimmer" href="mailto:hello@arocpl.com?subject=Media%20Inquiry%20AROC_PL">
                    Hubungi Media Team
                  </Link>
                </div>
              </div>

              <div className="luxury-surface soft-glow relative overflow-hidden rounded-[2.4rem] border border-[rgba(255,228,92,0.2)] bg-[rgba(248,247,240,0.06)] p-7 backdrop-blur">
                <div className="mx-auto flex aspect-square max-w-[18rem] items-center justify-center rounded-full bg-[var(--yellow)] p-8 shadow-[0_0_0_1.4rem_rgba(255,228,92,0.07)]">
                  <ArocGeneratedMark className="h-full w-full" />
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[rgba(248,247,240,0.12)] bg-[rgba(5,8,22,0.45)] p-4">
                    <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">Updated</div>
                    <div className="numeral mt-2 text-[2.5rem] leading-none text-[var(--cream)]">{pressHero.updatedAt}</div>
                  </div>
                  <div className="rounded-2xl border border-[rgba(248,247,240,0.12)] bg-[rgba(5,8,22,0.45)] p-4">
                    <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">Asset</div>
                    <div className="numeral mt-2 text-[2.5rem] leading-none text-[var(--cream)]">{pressAssets.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-paper relative overflow-hidden py-20 sm:py-28" id="brand">
          <div className="dot-grid-paper absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="kicker">Brand Guide</div>
                <h2 className="headline mt-5 max-w-[10ch] text-[clamp(3rem,8vw,6rem)] text-[var(--navy-deep)]">
                  Satu visual, satu identitas.
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {brandColors.map((color) => (
                  <article className="luxury-surface rounded-[1.5rem] border border-[var(--rule)] bg-white/70 p-5" key={color.value}>
                    <div className="h-24 rounded-[1rem] border border-[rgba(7,12,34,0.08)]" style={{ background: color.value }} />
                    <h3 className="font-display mt-5 text-[2rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--navy-deep)]">{color.name}</h3>
                    <div className="mt-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.18em] text-[var(--gold-deep)]">{color.value}</div>
                    <p className="mt-3 text-[0.92rem] leading-[1.7] text-[var(--muted-dark)]">{color.usage}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-[2rem] bg-[var(--yellow)] p-6 text-[var(--navy-deep)] sm:p-8">
              <div className="font-mono text-[0.72rem] font-black uppercase tracking-[0.2em]">Usage Notes</div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {brandGuidelines.map((guide, index) => (
                  <div className="grid grid-cols-[auto_1fr] gap-4 rounded-[1.25rem] bg-[rgba(248,247,240,0.4)] p-4" key={guide}>
                    <span className="numeral text-[1.4rem] leading-none">0{index + 1}</span>
                    <p className="text-[0.95rem] leading-[1.7]">{guide}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="surface-ink relative overflow-hidden py-20 sm:py-28" id="assets">
          <div className="campaign-shell absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="kicker kicker-on-ink">Asset Library</div>
                <h2 className="headline mt-5 text-[clamp(3rem,8vw,6.2rem)] text-[var(--cream)]">Logo, robot, dan dokumentasi.</h2>
              </div>
              <p className="max-w-[30rem] text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.68)]">
                Asset gambar sudah mengarah ke file nyata di web. Untuk kebutuhan resolusi khusus, hubungi media contact.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pressAssets.map((asset) => (
                <article className="luxury-surface overflow-hidden rounded-[2rem] border border-[rgba(255,228,92,0.16)] bg-[rgba(248,247,240,0.06)]" key={asset.src}>
                  <div className="luxury-image-frame relative aspect-[4/3] bg-[rgba(5,8,22,0.7)]">
                    <Image alt={asset.title} className="luxury-image object-cover" fill sizes="(max-width: 1024px) 100vw, 33vw" src={asset.src} />
                  </div>
                  <div className="p-5">
                    <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">{asset.kind}</div>
                    <h3 className="font-display mt-3 text-[2.2rem] font-black uppercase leading-none tracking-[-0.04em] text-[var(--cream)]">{asset.title}</h3>
                    <p className="mt-3 min-h-[4rem] text-[0.94rem] leading-[1.7] text-[rgba(248,247,240,0.68)]">{asset.description}</p>
                    <a className="btn-ghost-paper luxury-shimmer mt-5 min-h-[2.65rem] text-[0.72rem]" download href={asset.src}>
                      {asset.downloadLabel}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-paper-warm relative overflow-hidden py-20 sm:py-28" id="downloads">
          <div className="dot-grid-paper absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="kicker">Download Pack</div>
                <h2 className="headline mt-5 text-[clamp(3rem,8vw,6rem)] text-[var(--navy-deep)]">Slot siap untuk proposal dan sponsor kit.</h2>
              </div>
              <div className="grid gap-4">
                {pressDownloads.map((item) => (
                  <article className="luxury-surface rounded-[1.6rem] border border-[var(--rule)] bg-white/70 p-5 sm:p-6" key={item.title}>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                          {item.status === "ready" ? "Ready" : "Request Access"}
                        </div>
                        <h3 className="font-display mt-2 text-[2.2rem] font-black uppercase leading-none tracking-[-0.04em] text-[var(--navy-deep)]">{item.title}</h3>
                        <p className="mt-3 max-w-[34rem] text-[0.95rem] leading-[1.7] text-[var(--muted-dark)]">{item.description}</p>
                      </div>
                      <a className="btn-ghost-ink luxury-shimmer shrink-0" href={item.href}>
                        {item.label}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="surface-ink-deep relative overflow-hidden py-20 sm:py-24" id="media-contact">
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="luxury-surface soft-glow rounded-[2.5rem] border border-[rgba(255,228,92,0.2)] bg-[rgba(248,247,240,0.05)] p-7 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="champ-badge-outline">Media Contact</div>
                  <h2 className="headline mt-6 text-[clamp(3rem,8vw,6.4rem)] text-[var(--cream)]">Butuh format khusus?</h2>
                  <p className="mt-5 max-w-[34rem] text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.68)]">
                    Untuk resolusi tinggi, kebutuhan publikasi resmi, atau paket sponsor, kirim request melalui kontak berikut.
                  </p>
                </div>
                <div className="grid gap-3">
                  {pressContacts.map((contact) => (
                    <a className="luxury-chip rounded-[1.2rem] border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.06)] p-4 transition hover:border-[rgba(255,228,92,0.35)]" href={contact.href} key={contact.label} rel={contact.href.startsWith("http") ? "noreferrer" : undefined} target={contact.href.startsWith("http") ? "_blank" : undefined}>
                      <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">{contact.label}</div>
                      <div className="mt-1 text-[1rem] text-[rgba(248,247,240,0.84)]">{contact.value}</div>
                    </a>
                  ))}
                </div>
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
