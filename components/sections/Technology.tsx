import type { DivisionCard } from "@/data/aroc";
import {
  BoltIcon,
  CircuitIcon,
  CodeIcon,
  CpuIcon,
  EyeIcon,
  RadioIcon,
} from "@/components/shared/Icons";
import { SectionHeading } from "@/components/shared/SectionHeading";

type TechnologyProps = {
  divisions: DivisionCard[];
};

const iconMap = {
  cpu: CpuIcon,
  bolt: BoltIcon,
  circuit: CircuitIcon,
  code: CodeIcon,
  radio: RadioIcon,
  eye: EyeIcon,
};

const cardTone = {
  cyan: {
    ring: "border-[rgba(0,184,219,0.18)]",
    line: "from-[rgba(0,184,219,0.9)] to-[rgba(43,127,255,0.9)]",
    icon: "border-[rgba(0,184,219,0.16)] bg-[rgba(0,184,219,0.08)] text-[var(--cyan)]",
    title: "text-[var(--cyan)]",
  },
  orange: {
    ring: "border-[rgba(255,137,4,0.18)]",
    line: "from-[rgba(255,137,4,0.9)] to-[rgba(240,177,0,0.9)]",
    icon: "border-[rgba(255,137,4,0.16)] bg-[rgba(255,137,4,0.08)] text-[var(--orange)]",
    title: "text-[var(--orange)]",
  },
  gold: {
    ring: "border-[rgba(240,177,0,0.18)]",
    line: "from-[rgba(255,137,4,0.9)] to-[rgba(240,177,0,0.9)]",
    icon: "border-[rgba(240,177,0,0.16)] bg-[rgba(240,177,0,0.08)] text-[var(--gold)]",
    title: "text-[var(--gold)]",
  },
  blue: {
    ring: "border-[rgba(81,162,255,0.18)]",
    line: "from-[rgba(81,162,255,0.9)] to-[rgba(43,127,255,0.9)]",
    icon: "border-[rgba(81,162,255,0.16)] bg-[rgba(81,162,255,0.08)] text-[#51a2ff]",
    title: "text-[#51a2ff]",
  },
  emerald: {
    ring: "border-[rgba(0,212,146,0.18)]",
    line: "from-[rgba(0,212,146,0.9)] to-[rgba(0,184,219,0.9)]",
    icon: "border-[rgba(0,212,146,0.16)] bg-[rgba(0,212,146,0.08)] text-[var(--green)]",
    title: "text-[var(--green)]",
  },
};

export function Technology({ divisions }: TechnologyProps) {
  return (
    <section className="section-divider scroll-mt-24 py-16 sm:py-20" id="technology">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <SectionHeading
          centered
          description="Structured capability blocks spanning mechanics, electronics, software intelligence, and real-time field coordination."
          label="Our Technology"
          title={
            <>
              Core <span className="heading-gradient-gold">Divisions</span>
            </>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {divisions.map((division) => {
            const styles = cardTone[division.tone];

            return (
              <article
                className={`neon-panel relative overflow-hidden rounded-[1.9rem] p-6 sm:p-8 ${styles.ring}`}
                key={division.title}
              >
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${styles.line}`} />
                <div className="max-w-[34rem]">
                  <div className="eyebrow !justify-start">{division.eyebrow}</div>
                  <h3 className={`mt-4 font-display text-[2.1rem] font-bold uppercase ${styles.title}`}>
                    {division.title}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">
                    {division.description}
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  {division.items.map((item) => {
                    const Icon = iconMap[item.icon];

                    return (
                      <div
                        className="flex items-start gap-4 rounded-[1.25rem] border border-white/6 bg-[rgba(4,8,16,0.45)] p-4"
                        key={item.title}
                      >
                        <div className={`inline-flex rounded-2xl border p-3 ${styles.icon}`}>
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <h4 className="font-display text-[1.08rem] font-bold uppercase tracking-[0.04em] text-white">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
