import Image from "next/image";

import type { GalleryItem } from "@/data/aroc";
import { SectionHeading } from "@/components/shared/SectionHeading";

type GalleryProps = {
  items: GalleryItem[];
};

const layoutMap = {
  "large-left": "lg:col-span-6 lg:row-span-2",
  "small-top": "lg:col-span-3",
  "small-top-right": "lg:col-span-3",
  "wide-bottom": "lg:col-span-6",
};

export function Gallery({ items }: GalleryProps) {
  return (
    <section className="section-divider scroll-mt-24 py-16 sm:py-20" id="gallery">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-white/6 bg-[rgba(8,12,20,0.9)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:p-8">
          <SectionHeading
            action={
              <button
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-[rgba(148,163,184,0.22)] bg-[rgba(9,13,22,0.82)] px-5 text-sm font-semibold text-white transition duration-200 hover:border-[rgba(0,184,219,0.28)] hover:bg-[rgba(12,18,28,1)]"
                type="button"
              >
                View All Media
              </button>
            }
            label="Media & Gallery"
            title={
              <>
                Moments of <span className="heading-gradient-cyan">Action</span>
              </>
            }
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:grid-rows-[240px_240px]">
            {items.map((item) => (
              <figure
                className={[
                  "group relative overflow-hidden rounded-[1.6rem] border border-white/6 bg-black/40",
                  item.layout === "large-left" ? "aspect-[4/5] lg:aspect-auto" : "",
                  item.layout !== "large-left" ? "aspect-[16/11] lg:aspect-auto" : "",
                  layoutMap[item.layout],
                ].join(" ")}
                key={item.src}
              >
                <Image
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  fill
                  sizes={
                    item.layout === "large-left"
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 1024px) 100vw, 25vw"
                  }
                  src={item.src}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(3,5,10,0.3))]" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
