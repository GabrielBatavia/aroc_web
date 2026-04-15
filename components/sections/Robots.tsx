import Image from "next/image";

import type { RobotCard } from "@/data/aroc";
import { ArrowRightIcon } from "@/components/shared/Icons";
import { SectionHeading } from "@/components/shared/SectionHeading";

type RobotsProps = {
  robots: RobotCard[];
};

const toneMap = {
  cyan: {
    pill: "bg-[linear-gradient(90deg,var(--cyan),var(--blue))] text-[#02141c]",
    bar: "bg-[linear-gradient(90deg,var(--cyan),var(--blue))]",
  },
  gold: {
    pill: "bg-[linear-gradient(90deg,var(--orange),var(--gold))] text-[#1d1400]",
    bar: "bg-[linear-gradient(90deg,var(--orange),var(--gold))]",
  },
  emerald: {
    pill: "bg-[linear-gradient(90deg,var(--green),var(--cyan))] text-[#04140f]",
    bar: "bg-[linear-gradient(90deg,var(--green),var(--cyan))]",
  },
  orange: {
    pill: "bg-[linear-gradient(90deg,var(--orange),var(--gold))] text-[#1d1400]",
    bar: "bg-[linear-gradient(90deg,var(--orange),var(--gold))]",
  },
  blue: {
    pill: "bg-[linear-gradient(90deg,#51a2ff,var(--blue))] text-[#02141c]",
    bar: "bg-[linear-gradient(90deg,#51a2ff,var(--blue))]",
  },
};

export function Robots({ robots }: RobotsProps) {
  return (
    <section className="section-divider scroll-mt-24 py-16 sm:py-20" id="robots">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <SectionHeading
          centered
          description="Each robot is purpose-built for a specific role on the field, from aggressive attacking to defensive stability and smart positioning."
          label="The Squad"
          title={
            <>
              Meet Our <span className="heading-gradient-cyan">Robots</span>
            </>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {robots.map((robot) => {
            const tone = toneMap[robot.tone];

            return (
              <article
                className="neon-panel group overflow-hidden rounded-[1.8rem] transition duration-300 hover:-translate-y-1"
                key={robot.name}
              >
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    alt={`${robot.name} robot visual`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    height={252}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    src={robot.image}
                    width={334}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15),rgba(5,9,18,0.78))]" />
                  <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${tone.pill}`}>
                    {robot.role}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-[2rem] font-bold uppercase text-white">
                    {robot.name}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">
                    {robot.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {robot.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="flex items-center justify-between text-[0.92rem] text-[#c3cbd8]">
                          <span>{stat.label}</span>
                          <span className="font-display text-[0.98rem] uppercase tracking-[0.08em] text-[var(--cyan)]">
                            {stat.value}
                          </span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full ${tone.bar}`}
                            style={{ width: `${stat.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="mt-6 inline-flex h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-[rgba(148,163,184,0.08)] px-5 text-[0.98rem] font-semibold text-white transition duration-200 hover:border-[rgba(0,184,219,0.18)] hover:bg-[rgba(148,163,184,0.12)]"
                    type="button"
                  >
                    View Details
                    <ArrowRightIcon className="size-5 text-[rgba(255,255,255,0.45)]" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
