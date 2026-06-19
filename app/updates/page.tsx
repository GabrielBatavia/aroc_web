import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { footerData, footerNavigation, navLinks } from "@/data/aroc";
import { featuredUpdate, updateCategories, updateHero, updates } from "@/data/updates";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const metadata: Metadata = {
  title: "News & Updates | AROC_PL",
  description:
    "Log kegiatan AROC_PL: testing robot, kompetisi, workshop internal, milestone pengembangan, dan dokumentasi robot humanoid Polinema.",
  openGraph: {
    title: "News & Updates | AROC_PL",
    description: "Testing, kompetisi, workshop, dan milestone pengembangan robot humanoid AROC_PL.",
    images: ["/images/hero-integrated.png"],
  },
};

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

function categorySlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function UpdatesPage() {
  const timelineUpdates = updates.filter((item) => item !== featuredUpdate);

  return (
    <>
      <Navbar links={navLinks} />

      <main className="flex-1" id="main-content">
        <section className="surface-ink campaign-shell relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <div className="kicker kicker-on-ink">{updateHero.eyebrow}</div>
                <h1 className="headline mt-6 max-w-[10ch] text-[clamp(4rem,11vw,8.6rem)] text-[var(--cream)]">
                  Update dari lab menuju <span className="headline-italic-on-ink">arena.</span>
                </h1>
              </div>
              <div className="lg:pb-4">
                <p className="max-w-[38rem] text-[1.08rem] leading-[1.9] text-[rgba(248,247,240,0.72)]">
                  {updateHero.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {updateCategories.map((category) => (
                    <a className="luxury-chip rounded-full border border-[rgba(255,228,92,0.28)] bg-[rgba(255,228,92,0.08)] px-4 py-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-[var(--yellow)]" href={`#updates-${categorySlug(category.label)}`} key={category.label}>
                      {category.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-paper relative overflow-hidden py-20 sm:py-28">
          <div className="dot-grid-paper absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <article className="luxury-surface overflow-hidden rounded-[2.6rem] border border-[var(--rule)] bg-white/80 shadow-[0_40px_100px_-68px_rgba(7,12,34,0.7)] lg:grid lg:grid-cols-[1.06fr_0.94fr]">
              <div className="luxury-image-frame relative min-h-[22rem] bg-[var(--navy-deep)] lg:min-h-[34rem]">
                <Image alt={featuredUpdate.title} className="luxury-image object-cover" fill priority sizes="(max-width: 1024px) 100vw, 54vw" src={featuredUpdate.image} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(3,6,16,0.78))]" />
                <div className="absolute bottom-5 left-5 rounded-full bg-[var(--yellow)] px-4 py-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--navy-deep)]">
                  Sorotan / {featuredUpdate.category}
                </div>
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="font-mono text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--gold-deep)]">
                  {formatDate(featuredUpdate.date)}
                </div>
                <h2 className="font-display mt-5 text-[clamp(3rem,6vw,5.6rem)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[var(--navy-deep)]">
                  {featuredUpdate.title}
                </h2>
                <p className="mt-6 text-[1rem] leading-[1.85] text-[var(--muted-dark)]">{featuredUpdate.excerpt}</p>
                {featuredUpdate.result ? (
                  <div className="mt-6 rounded-[1.2rem] border border-[rgba(7,12,34,0.12)] bg-[var(--cream-soft)] p-4">
                    <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--gold-deep)]">Hasil</div>
                    <p className="mt-2 text-[0.94rem] leading-[1.7] text-[var(--navy-deep)]">{featuredUpdate.result}</p>
                  </div>
                ) : null}
                <div className="mt-7 flex flex-wrap gap-2">
                  {featuredUpdate.tags.map((tag) => (
                    <span className="rounded-full border border-[var(--rule)] bg-white/70 px-3 py-1.5 font-mono text-[0.58rem] font-black uppercase tracking-[0.14em] text-[var(--muted-dark)]" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="surface-ink relative overflow-hidden py-20 sm:py-28">
          <div className="campaign-shell absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <div className="kicker kicker-on-ink">Linimasa Aktivitas</div>
                <h2 className="headline mt-5 text-[clamp(3rem,8vw,6.4rem)] text-[var(--cream)]">Catatan sprint dan lapangan.</h2>
              </div>
              <p className="max-w-[34rem] text-[1rem] leading-[1.85] text-[rgba(248,247,240,0.68)] lg:justify-self-end">
                Update diurutkan dari aktivitas terbaru, dengan kategori yang bisa dipakai sebagai struktur CMS-light untuk konten berikutnya.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {timelineUpdates.map((item, index) => (
                <article className="luxury-surface overflow-hidden rounded-[2rem] border border-[rgba(255,228,92,0.16)] bg-[rgba(248,247,240,0.06)]" id={index === timelineUpdates.findIndex((entry) => entry.category === item.category) ? `updates-${categorySlug(item.category)}` : undefined} key={`${item.date}-${item.title}`}>
                  <div className="grid min-h-full gap-0 sm:grid-cols-[14rem_1fr]">
                    <div className="luxury-image-frame relative min-h-[14rem] bg-[rgba(5,8,22,0.7)]">
                      <Image alt={item.title} className="luxury-image object-cover" fill sizes="(max-width: 1024px) 100vw, 224px" src={item.image} />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">{item.category}</div>
                        <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.42)]">0{index + 2}</div>
                      </div>
                      <h3 className="font-display mt-4 text-[2.3rem] font-black uppercase leading-[0.88] tracking-[-0.04em] text-[var(--cream)]">{item.title}</h3>
                      <div className="mt-3 font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.48)]">{formatDate(item.date)}</div>
                      <p className="mt-4 text-[0.94rem] leading-[1.75] text-[rgba(248,247,240,0.68)]">{item.excerpt}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span className="rounded-full border border-[rgba(255,228,92,0.18)] bg-[rgba(255,228,92,0.06)] px-3 py-1 font-mono text-[0.55rem] font-black uppercase tracking-[0.12em] text-[var(--yellow)]" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-paper-warm relative overflow-hidden py-20 sm:py-24">
          <div className="dot-grid-paper absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {updateCategories.map((category) => (
                <article className="luxury-surface rounded-[1.6rem] border border-[var(--rule)] bg-white/70 p-5" key={category.label}>
                  <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--gold-deep)]">Kategori</div>
                  <h3 className="font-display mt-4 text-[2rem] font-black uppercase leading-none tracking-[-0.04em] text-[var(--navy-deep)]">{category.label}</h3>
                  <p className="mt-4 text-[0.92rem] leading-[1.7] text-[var(--muted-dark)]">{category.description}</p>
                </article>
              ))}
            </div>
            <div className="luxury-surface mt-8 rounded-[2rem] bg-[var(--yellow)] p-6 text-[var(--navy-deep)] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="font-mono text-[0.68rem] font-black uppercase tracking-[0.18em]">Kirim update baru</div>
                  <h2 className="font-display mt-3 text-[clamp(2.6rem,6vw,4.6rem)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
                    Punya milestone terbaru dari lab?
                  </h2>
                </div>
                <Link className="btn-ghost-ink luxury-shimmer" href="mailto:hello@arocpl.com?subject=Update%20Kegiatan%20AROC_PL">
                  Kirim Draft Update
                </Link>
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
