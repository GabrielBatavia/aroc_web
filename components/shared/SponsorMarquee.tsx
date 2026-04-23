"use client";

type SponsorMarqueeProps = {
  items: string[];
  speed?: number;
};

export function SponsorMarquee({ items, speed = 45 }: SponsorMarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
      }}
    >
      <div
        className="flex min-w-max gap-12 whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {loop.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-4 px-2 py-2"
          >
            <span className="inline-block size-1.5 rounded-full bg-[var(--gold-bright)] opacity-60" />
            <span className="font-serif text-[1.1rem] font-semibold tracking-[0.12em] text-[rgba(245,241,232,0.72)]">
              {item}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
