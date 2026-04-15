import Image from "next/image";

import type { AboutMentor } from "@/data/about";
import { AboutSectionTitle } from "@/components/about/AboutSectionTitle";
import {
  GraduationCapIcon,
  InstagramIcon,
  MailIcon,
} from "@/components/shared/Icons";

type MentorsProps = {
  mentors: AboutMentor[];
};

export function Mentors({ mentors }: MentorsProps) {
  return (
    <section className="pt-14 sm:pt-16">
      <AboutSectionTitle
        icon={<GraduationCapIcon className="size-6" />}
        title="Dosen Pembimbing"
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {mentors.map((mentor) => (
          <article
            className="relative overflow-hidden rounded-[1rem] border border-[rgba(0,184,219,0.28)] bg-[rgba(16,24,40,0.6)] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-8"
            key={mentor.name}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--cyan),var(--blue))]" />

            <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="relative mx-auto w-fit sm:mx-0">
                <div className="overflow-hidden rounded-full border-2 border-[rgba(0,184,219,0.45)] p-1.5">
                  <Image
                    alt={`${mentor.name} portrait`}
                    className="size-[7rem] rounded-full object-cover"
                    height={112}
                    src={mentor.image}
                    width={112}
                  />
                </div>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--blue))] px-3 py-1 font-display text-[0.72rem] font-bold tracking-[0.08em] text-[#02141c]">
                  {mentor.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display text-[1.45rem] font-black tracking-[-0.03em] text-white sm:text-[1.65rem]">
                  {mentor.name}
                </h3>
                <p className="mt-2 text-[1rem] text-[var(--cyan)]">{mentor.role}</p>
                <p className="mt-2 text-sm text-[#6a7282]">NIDN: {mentor.nidn}</p>
                <p className="mt-3 text-[1rem] text-[#d1d5dc]">{mentor.specialization}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(148,163,184,0.16)] bg-[rgba(31,41,55,0.55)] px-4 py-2 text-sm text-[#aeb8c4] transition hover:border-[rgba(0,184,219,0.24)] hover:text-white"
                    href={`mailto:${mentor.email}`}
                  >
                    <MailIcon className="size-4" />
                    <span>{mentor.email}</span>
                  </a>
                  <a
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(148,163,184,0.16)] bg-[rgba(31,41,55,0.55)] px-4 py-2 text-sm text-[#aeb8c4] transition hover:border-[rgba(0,184,219,0.24)] hover:text-white"
                    href={`https://instagram.com/${mentor.instagram.replace("@", "")}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <InstagramIcon className="size-4" />
                    <span>{mentor.instagram}</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
