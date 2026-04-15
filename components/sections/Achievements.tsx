import type { Achievement } from "@/data/aroc";
import { MedalIcon, StarIcon, TrophyIcon } from "@/components/shared/Icons";
import { SectionHeading } from "@/components/shared/SectionHeading";

type AchievementsProps = {
  items: Achievement[];
};

const iconMap = {
  trophy: TrophyIcon,
  spark: StarIcon,
  medal: MedalIcon,
};

const toneClass = {
  cyan: "text-[var(--cyan)]",
  blue: "text-[#51a2ff]",
  gold: "text-[var(--gold)]",
  orange: "text-[var(--orange)]",
  emerald: "text-[var(--green)]",
};

export function Achievements({ items }: AchievementsProps) {
  return (
    <section className="section-divider scroll-mt-24 py-16 sm:py-20" id="achievements">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <SectionHeading
          centered
          label="Track Record"
          title={
            <>
              Our <span className="heading-gradient-gold">Achievements</span>
            </>
          }
        />

        <div className="relative mt-14">
          <div className="absolute bottom-0 left-4 top-2 w-px bg-[linear-gradient(180deg,rgba(16,78,100,1),rgba(0,184,219,0.2),rgba(0,0,0,0))] md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-12">
            {items.map((item, index) => {
              const Icon = iconMap[item.icon];
              const onRight = index % 2 === 0;

              return (
                <div className="relative md:grid md:grid-cols-2 md:gap-16" key={`${item.year}-${item.title}`}>
                  <div className={onRight ? "md:col-start-2" : "md:col-start-1"}>
                    <article className="neon-panel relative ml-10 rounded-[1.65rem] p-6 md:ml-0">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex rounded-xl border border-white/8 bg-black/50 p-3">
                          <Icon className={`size-6 ${toneClass[item.tone]}`} />
                        </div>
                        <div className={`font-display text-[1.45rem] font-bold uppercase ${toneClass[item.tone]}`}>
                          {item.year}
                        </div>
                      </div>
                      <h3 className="mt-5 font-display text-[1.8rem] font-bold uppercase leading-[1.1] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.98rem] text-[var(--muted)]">{item.subtitle}</p>
                    </article>
                  </div>

                  <div className="absolute left-4 top-9 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[var(--cyan-deep)] bg-black shadow-[0_0_18px_rgba(0,184,219,0.36)] md:left-1/2">
                    <div className="size-2 rounded-full bg-[var(--cyan)]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
