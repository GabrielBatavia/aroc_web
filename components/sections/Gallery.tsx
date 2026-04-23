"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import type { GalleryItem } from "@/data/aroc";
import { CloseIcon } from "@/components/shared/Icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type GalleryProps = {
  items: GalleryItem[];
};

const layoutMap = {
  "large-left": "lg:col-span-7 lg:row-span-2",
  "small-top": "lg:col-span-5",
  "small-top-right": "lg:col-span-5",
  "wide-bottom": "lg:col-span-12",
};

export function Gallery({ items }: GalleryProps) {
  const [lightboxSrc, setLightboxSrc] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const { ref, isVisible } = useScrollReveal();

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxSrc, closeLightbox]);

  useEffect(() => {
    if (lightboxSrc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxSrc]);

  return (
    <>
      <section
        className="surface-paper scroll-mt-24 py-20 sm:py-28"
        id="gallery"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <div
            ref={ref}
            className={`reveal-base reveal-up ${isVisible ? "revealed" : ""}`}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
              <div className="max-w-[38rem]">
                <div className="kicker">Di Dalam Lab</div>
                <h2 className="headline mt-5 text-[clamp(2.4rem,5vw,4rem)] text-[var(--ink)]">
                  Catatan lapangan,
                  <br />
                  <span className="headline-italic">dalam aksi.</span>
                </h2>
              </div>
              <p className="max-w-[26rem] text-[1rem] leading-[1.8] text-[var(--muted)] md:pb-2">
                Malam-malam panjang, iterasi tanpa henti, dan sesekali momen
                mengangkat piala. Inilah wajah pekerjaan kami.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-[280px_280px]">
            {items.map((item, index) => (
              <figure
                key={item.src}
                className={[
                  "group relative cursor-pointer overflow-hidden rounded-sm bg-[var(--paper-soft)]",
                  item.layout === "large-left"
                    ? "aspect-[4/5] lg:aspect-auto"
                    : "",
                  item.layout !== "large-left"
                    ? "aspect-[16/11] lg:aspect-auto"
                    : "",
                  layoutMap[item.layout],
                  `reveal-base reveal-scale ${isVisible ? `revealed reveal-delay-${index + 1}` : ""}`,
                ].join(" ")}
                onClick={() =>
                  setLightboxSrc({ src: item.src, alt: item.alt })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxSrc({ src: item.src, alt: item.alt });
                  }
                }}
              >
                <Image
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.06]"
                  fill
                  loading="lazy"
                  sizes={
                    item.layout === "large-left"
                      ? "(max-width: 1024px) 100vw, 58vw"
                      : "(max-width: 1024px) 100vw, 42vw"
                  }
                  src={item.src}
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-[linear-gradient(180deg,transparent,rgba(15,27,44,0.92))] p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--gold-bright)]">
                    Gambar 0{index + 1}
                  </div>
                  <p className="mt-1 font-serif text-[0.95rem] italic leading-tight text-[var(--paper)]">
                    {item.alt}
                  </p>
                </div>
                {/* Zoom indicator */}
                <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-[rgba(245,241,232,0.3)] bg-[rgba(15,27,44,0.5)] text-[var(--paper)] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {lightboxSrc && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Pratinjau gambar"
        >
          <button
            aria-label="Tutup pratinjau"
            className="absolute right-4 top-4 z-[101] flex size-12 items-center justify-center rounded-sm border border-[rgba(245,241,232,0.2)] bg-[rgba(15,27,44,0.6)] text-[var(--paper)] backdrop-blur-sm transition hover:bg-[rgba(15,27,44,0.85)]"
            onClick={closeLightbox}
            type="button"
          >
            <CloseIcon className="size-6" />
          </button>
          <Image
            alt={lightboxSrc.alt}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            height={1080}
            onClick={(e) => e.stopPropagation()}
            src={lightboxSrc.src}
            width={1920}
            style={{ width: "auto", height: "auto" }}
          />
          <p className="absolute bottom-6 left-1/2 max-w-[80vw] -translate-x-1/2 text-center font-serif text-sm italic text-[rgba(245,241,232,0.7)]">
            {lightboxSrc.alt}
          </p>
        </div>
      )}
    </>
  );
}
