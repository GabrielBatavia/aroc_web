"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { DoodleArrow } from "@/components/shared/BrandAssets";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, PlayIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { GalleryItem } from "@/data/aroc";
import { teamYouTubeVideos } from "@/data/aroc";

type GalleryProps = {
  items: GalleryItem[];
};

const layoutMap = {
  "large-left": "lg:col-span-7 lg:row-span-2",
  "small-top": "lg:col-span-5",
  "small-top-right": "lg:col-span-5",
  "wide-bottom": "lg:col-span-12",
};

const videoSlots = ["Match day recap", "Lab sprint BTS"];

export function Gallery({ items }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { ref, isVisible } = useScrollReveal();
  const activeItem = activeIndex === null ? null : items[activeIndex];

  const openLightbox = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  }, []);

  const goLightbox = useCallback((direction: number) => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) return current;
      return (current + direction + items.length) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goLightbox(-1);
      if (event.key === "ArrowRight") goLightbox(1);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, closeLightbox, goLightbox]);

  useEffect(() => {
    if (activeIndex !== null) closeButtonRef.current?.focus();
    document.body.style.overflow = activeIndex === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <>
      <section className="surface-paper relative scroll-mt-24 overflow-hidden py-20 sm:py-28" id="gallery">
        <div className="paper-grain absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
          <div ref={ref} className={`reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div className="relative">
                <div className="kicker">Di Dalam Lab</div>
                <h2 className="headline mt-5 max-w-[11ch] text-[clamp(3.2rem,8vw,6.4rem)] text-[var(--navy-deep)]">
                  Bukti kerja, bukan stock photo.
                </h2>
                <DoodleArrow className="absolute -right-10 top-20 hidden w-40 rotate-[10deg] text-[var(--gold-deep)] lg:block" />
              </div>
              <p className="max-w-[32rem] text-[1.05rem] leading-[1.85] text-[var(--muted-dark)] lg:pb-5">
                Malam panjang, wiring berantakan, diskusi strategi, dan momen robot akhirnya bergerak sesuai rencana. Inilah ruang kerja AROC_PL.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:grid-rows-[310px_310px]">
            {items.map((item, index) => (
              <figure
                className={[
                  "group relative cursor-pointer overflow-hidden rounded-[1.6rem] bg-[var(--navy-deep)] shadow-[0_30px_70px_-48px_rgba(7,12,34,0.85)]",
                  item.layout === "large-left" ? "aspect-[4/5] lg:aspect-auto" : "aspect-[16/11] lg:aspect-auto",
                  layoutMap[item.layout],
                  `reveal-base reveal-scale ${isVisible ? `revealed reveal-delay-${index + 1}` : ""}`,
                ].join(" ")}
                key={item.src}
                onClick={() => openLightbox(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openLightbox(index);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <Image
                  alt={item.alt}
                  className="object-cover transition duration-[900ms] group-hover:scale-[1.06]"
                  fill
                  loading="lazy"
                  sizes={item.layout === "large-left" ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}
                  src={item.src}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(5,8,22,0.92))] opacity-80" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="font-mono text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">Frame 0{index + 1}</div>
                  <p className="mt-2 max-w-[34rem] text-[0.95rem] leading-[1.6] text-[var(--cream)]">{item.alt}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {teamYouTubeVideos.slice(0, 2).map((vid, index) => (
              <div
                className={`group relative min-h-[16rem] cursor-pointer overflow-hidden rounded-[1.6rem] border border-[rgba(7,12,34,0.18)] bg-[var(--navy-deep)] p-6 shadow-lg transition duration-500 hover:-translate-y-1 hover:border-[var(--gold-deep)] reveal-base reveal-up ${isVisible ? `revealed reveal-delay-${index + 5}` : ""}`}
                key={vid.id}
                onClick={() => {
                  const modal = document.createElement("div");
                  modal.className = "lightbox-overlay flex items-center justify-center p-4 z-[110]";
                  modal.onclick = () => document.body.removeChild(modal);
                  modal.innerHTML = `
                    <div class="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[rgba(255,228,92,0.3)] bg-[rgba(5,8,22,0.96)] p-5 shadow-2xl backdrop-blur-2xl" onclick="event.stopPropagation()">
                      <div class="flex items-center justify-between mb-4">
                        <div>
                          <span class="font-mono text-[0.62rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">${vid.category}</span>
                          <h3 class="font-display text-xl font-black uppercase text-[var(--cream)] mt-1">${vid.title}</h3>
                        </div>
                      </div>
                      <div class="relative aspect-video w-full overflow-hidden rounded-[1.4rem] bg-black">
                        <iframe src="https://www.youtube.com/embed/${vid.id}?autoplay=1&rel=0" title="${vid.title}" class="absolute inset-0 h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                      <p class="mt-4 text-sm text-[rgba(248,247,240,0.75)]">${vid.description}</p>
                    </div>
                  `;
                  document.body.appendChild(modal);
                }}
              >
                <Image
                  src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                  alt={vid.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,22,0.5),rgba(5,8,22,0.92))]" />
                <div className="relative z-10 flex h-full min-h-[13rem] flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--navy-deep)] shadow-lg transition group-hover:scale-110">
                      <PlayIcon className="size-6" />
                    </div>
                    <span className="rounded-full border border-[rgba(255,228,92,0.3)] bg-[rgba(5,8,22,0.7)] px-3 py-1 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--yellow)]">
                      {vid.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display mt-3 text-[2.2rem] font-black uppercase leading-[0.88] tracking-[-0.04em] text-[var(--cream)] group-hover:text-[var(--yellow)] transition">
                      {vid.title}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-[1.65] text-[rgba(248,247,240,0.7)]">
                      {vid.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeItem ? (
        <div aria-label="Pratinjau gambar" aria-modal="true" className="lightbox-overlay" onClick={closeLightbox} role="dialog">
          <button ref={closeButtonRef} aria-label="Tutup pratinjau" className="luxury-chip absolute right-4 top-4 z-[101] flex size-12 items-center justify-center rounded-full border border-[rgba(248,247,240,0.2)] bg-[rgba(5,8,22,0.7)] text-[var(--cream)] backdrop-blur-sm transition hover:border-[rgba(255,228,92,0.45)] hover:bg-[rgba(5,8,22,0.9)] hover:text-[var(--yellow)]" onClick={closeLightbox} type="button">
            <CloseIcon className="size-6" />
          </button>
          <button aria-label="Gambar sebelumnya" className="lightbox-control lightbox-control-left" onClick={(event) => { event.stopPropagation(); goLightbox(-1); }} type="button">
            <ChevronLeftIcon className="size-5" />
          </button>
          <button aria-label="Gambar berikutnya" className="lightbox-control lightbox-control-right" onClick={(event) => { event.stopPropagation(); goLightbox(1); }} type="button">
            <ChevronRightIcon className="size-5" />
          </button>
          <div className="lightbox-filmstrip" onClick={(event) => event.stopPropagation()}>
            {items.map((item, index) => (
              <button
                aria-label={`Buka frame ${index + 1}`}
                className={`lightbox-thumb ${index === activeIndex ? "is-active" : ""}`}
                key={item.src}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <Image alt="" className="object-cover" fill sizes="64px" src={item.src} />
              </button>
            ))}
          </div>
          <div className="lightbox-stage" onClick={(event) => event.stopPropagation()}>
            <Image
              alt={activeItem.alt}
              className="max-h-[82vh] max-w-[90vw] object-contain"
              height={1080}
              key={activeItem.src}
              src={activeItem.src}
              width={1920}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="lightbox-caption-panel">
            <div className="font-mono text-[0.58rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">
              Frame {String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </div>
            <p className="mt-2 text-sm leading-[1.6]">{activeItem.alt}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
