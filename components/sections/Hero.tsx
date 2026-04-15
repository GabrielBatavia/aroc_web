import Image from "next/image";
import Link from "next/link";

import type { HeroData } from "@/data/aroc";
import { ArrowRightIcon, PlayIcon } from "@/components/shared/Icons";

type HeroProps = {
  data: HeroData;
};

export function Hero({ data }: HeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-14" id="top">
      <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative z-10">
          <div className="neon-pill inline-flex items-center rounded-full border border-[rgba(0,184,219,0.28)] bg-[rgba(0,184,219,0.08)] px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[var(--cyan)]">
            <span className="mr-2 inline-block size-2 rounded-full bg-[var(--cyan)]" />
            {data.eyebrow}
          </div>

          <h1 className="mt-6 font-display text-[clamp(3.15rem,10vw,6.4rem)] font-black uppercase leading-[0.88] tracking-[0.03em] text-white [text-shadow:0_0_26px_rgba(0,184,219,0.06)]">
            <span className="block">{data.titleLines.top}</span>
            <span className="heading-gradient-cyan block">{data.titleLines.accent}</span>
            <span className="block">{data.titleLines.middle}</span>
            <span className="block">
              {data.titleLines.bottomPrefix}{" "}
              <span className="heading-gradient-gold inline-block">
                {data.titleLines.bottomAccent}
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-[34rem] text-[1.02rem] leading-9 text-[var(--muted)] sm:text-[1.08rem]">
            {data.description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(90deg,var(--cyan),var(--blue))] px-7 text-base font-bold text-[#02141c] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,184,219,0.26)]"
              href={data.primaryCta.href}
            >
              {data.primaryCta.label}
              <ArrowRightIcon className="size-5" />
            </Link>
            <Link
              className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-[rgba(148,163,184,0.28)] bg-[rgba(8,14,25,0.8)] px-7 text-base font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,184,219,0.32)] hover:bg-[rgba(10,18,32,0.96)]"
              href={data.secondaryCta.href}
            >
              <PlayIcon className="size-5" />
              {data.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="absolute inset-x-[10%] top-[12%] h-[46%] rounded-full bg-[radial-gradient(circle,rgba(130,255,221,0.18),rgba(0,184,219,0.08)_38%,transparent_70%)] blur-3xl" />
          <div className="absolute inset-x-[15%] top-[18%] h-[56%] rounded-full border border-[rgba(240,177,0,0.26)]" />
          <div className="absolute inset-x-[10%] bottom-[7%] h-10 rounded-full border border-[rgba(255,255,255,0.22)]" />
          <div className="absolute inset-y-[28%] left-[8%] right-[8%] rounded-full border border-[rgba(43,127,255,0.18)]" />
          <div className="absolute left-[-2%] top-0 z-[11] h-24 w-[35%] rounded-[1.4rem] bg-[rgba(0,0,0,0.96)]" />
          <div className="absolute left-0 top-[43%] z-[11] h-[30%] w-[24%] bg-[linear-gradient(90deg,rgba(0,0,0,0.98),rgba(0,0,0,0.55),transparent)]" />
          <div className="absolute right-0 top-[40%] z-[11] h-[28%] w-[18%] bg-[linear-gradient(270deg,rgba(0,0,0,0.98),rgba(0,0,0,0.55),transparent)]" />
          <div className="absolute left-0 bottom-[15%] z-[11] h-[18%] w-[36%] bg-[linear-gradient(90deg,rgba(0,0,0,0.98),rgba(0,0,0,0.72),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 z-[11] h-[16%] bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(2,5,7,1))]" />

          <div className="absolute left-2 top-1 z-20 rounded-[1.35rem] border border-[rgba(148,163,184,0.2)] bg-[rgba(3,9,18,0.92)] px-4 py-3 shadow-[0_14px_36px_rgba(0,0,0,0.45)] sm:left-0 sm:top-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[rgba(0,184,219,0.12)] text-[var(--cyan)]">
                <ArrowRightIcon className="size-5" />
              </div>
              <div>
                <div className="text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.45)]">
                  {data.statusLabel}
                </div>
                <div className="font-display text-[1.3rem] font-bold uppercase tracking-[0.04em] text-white">
                  {data.statusValue}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[18%] left-0 z-20 w-[52%] rounded-[1.4rem] border border-[rgba(0,184,219,0.25)] bg-[linear-gradient(180deg,rgba(7,19,31,0.94),rgba(4,11,22,0.9))] px-4 py-4 shadow-[0_0_30px_rgba(0,184,219,0.18)]">
            <div className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--cyan)]">
              {data.systemCard.label}
            </div>
            <div className="mt-2 font-display text-[1.6rem] font-bold uppercase tracking-[0.04em] text-white">
              {data.systemCard.title}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {data.systemCard.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.4)]">
                    {metric.label}
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--gold))]"
                      style={{ width: metric.value }}
                    />
                  </div>
                  <div className="mt-1 text-right text-[0.72rem] font-semibold text-[rgba(255,255,255,0.55)]">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-[8%] left-1/2 z-20 -translate-x-1/2 rounded-full border border-[rgba(0,184,219,0.18)] bg-[rgba(0,184,219,0.12)] px-5 py-2 text-[0.8rem] uppercase tracking-[0.16em] text-[var(--cyan)]">
            {data.bottomTag}
          </div>

          <Image
            alt="AROC_PL humanoid robot hero illustration"
            className="relative z-10 mx-auto h-auto w-full max-w-[520px] drop-shadow-[0_30px_70px_rgba(0,0,0,0.72)]"
            height={980}
            priority
            sizes="(max-width: 1024px) 90vw, 520px"
            src={data.robotImage}
            width={640}
          />
        </div>
      </div>
    </section>
  );
}
