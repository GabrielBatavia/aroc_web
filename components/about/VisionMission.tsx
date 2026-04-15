import type { AboutValue } from "@/data/about";
import { AboutSectionTitle } from "@/components/about/AboutSectionTitle";
import {
  BoltIcon,
  EyeIcon,
  MedalIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
} from "@/components/shared/Icons";

type VisionMissionProps = {
  vision: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    items: string[];
  };
  values: AboutValue[];
};

const valueIconMap = {
  star: StarIcon,
  shield: ShieldIcon,
  users: UsersIcon,
  medal: MedalIcon,
};

const valueToneClass = {
  cyan: "border-[rgba(0,184,219,0.2)] bg-[rgba(0,184,219,0.1)] text-[var(--cyan)]",
  blue: "border-[rgba(43,127,255,0.2)] bg-[rgba(43,127,255,0.1)] text-[#51a2ff]",
  gold: "border-[rgba(240,177,0,0.2)] bg-[rgba(240,177,0,0.1)] text-[#fdc700]",
  orange: "border-[rgba(255,137,4,0.2)] bg-[rgba(255,137,4,0.1)] text-[var(--orange)]",
  emerald: "border-[rgba(0,212,146,0.2)] bg-[rgba(0,212,146,0.1)] text-[var(--green)]",
};

export function VisionMission({
  vision,
  mission,
  values,
}: VisionMissionProps) {
  return (
    <section className="pt-12 sm:pt-16">
      <AboutSectionTitle
        icon={<EyeIcon className="size-6" />}
        title="Visi & Misi"
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="relative overflow-hidden rounded-[1rem] border border-[rgba(0,184,219,0.3)] bg-[rgba(16,24,40,0.6)] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--cyan),var(--blue))]" />
          <div className="absolute right-[-1.5rem] top-[-1.5rem] size-24 rounded-full bg-[rgba(0,184,219,0.05)]" />

          <div className="flex items-center gap-4">
            <div className="rounded-[14px] border border-[rgba(0,184,219,0.3)] bg-[rgba(0,184,219,0.1)] p-3 text-[var(--cyan)]">
              <EyeIcon className="size-5" />
            </div>
            <h3 className="font-display text-[1.55rem] font-black tracking-[-0.03em] text-[var(--cyan)]">
              {vision.title}
            </h3>
          </div>

          <p className="mt-8 max-w-[24rem] text-[1rem] leading-[1.9] text-[#d1d5dc]">
            {vision.description}
          </p>
        </article>

        <article className="relative overflow-hidden rounded-[1rem] border border-[rgba(255,137,4,0.24)] bg-[rgba(16,24,40,0.6)] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--orange),var(--gold))]" />
          <div className="absolute right-[-1.5rem] top-[-1.5rem] size-24 rounded-full bg-[rgba(255,137,4,0.05)]" />

          <div className="flex items-center gap-4">
            <div className="rounded-[14px] border border-[rgba(255,137,4,0.3)] bg-[rgba(255,137,4,0.1)] p-3 text-[var(--orange)]">
              <BoltIcon className="size-5" />
            </div>
            <h3 className="font-display text-[1.55rem] font-black tracking-[-0.03em] text-[var(--orange)]">
              {mission.title}
            </h3>
          </div>

          <ul className="mt-8 space-y-4">
            {mission.items.map((item) => (
              <li className="flex gap-4" key={item}>
                <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-[var(--orange)]" />
                <span className="text-[1rem] leading-[1.8] text-[#d1d5dc]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {values.map((value) => {
          const Icon = valueIconMap[value.icon];

          return (
            <article
              className={`rounded-[14px] border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] ${valueToneClass[value.tone]}`}
              key={value.title}
            >
              <Icon className="size-6" />
              <h4 className="mt-6 font-display text-[1rem] font-bold tracking-[-0.02em]">
                {value.title}
              </h4>
              <p className="mt-3 max-w-[13rem] text-sm leading-7 text-[var(--muted)]">
                {value.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
