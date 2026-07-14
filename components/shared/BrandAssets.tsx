import Image from "next/image";
import type { SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement>;

export function ArocGeneratedMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`relative ${className || ""}`}>
      <Image
        src="/images/logoAROC.jpg"
        alt="AROC Logo"
        fill
        sizes="(max-width: 768px) 150px, 300px"
        className="object-contain mix-blend-multiply"
        priority={priority}
      />
    </div>
  );
}

export function DoodleArrow({ className, ...props }: SvgProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 140 110"
      {...props}
    >
      <path
        d="M9 20c26 2 41 11 51 25 12 17 4 33-13 30-14-2-18-17-8-27 17-17 56-4 78 31"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <path
        d="M101 78c11 2 20 1 29-6-4 12-4 20 0 29"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />
    </svg>
  );
}

export function DoodleUnderline({ className, ...props }: SvgProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 210 36"
      {...props}
    >
      <path
        d="M8 21c28-13 64-14 103-10 31 3 59 7 94-2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="7"
      />
      <path
        d="M14 29c34-11 73-9 112-5 25 3 47 4 72-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeOpacity="0.45"
        strokeWidth="5"
      />
    </svg>
  );
}

export function SensorCone({ className, ...props }: SvgProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 180 130"
      {...props}
    >
      <path
        d="M22 92C44 44 77 20 143 10"
        stroke="currentColor"
        strokeDasharray="8 10"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M22 92c46-12 86-9 137 22"
        stroke="currentColor"
        strokeDasharray="8 10"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path d="M22 92h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="12" />
      <circle cx="145" cy="10" r="6" fill="currentColor" />
      <circle cx="159" cy="114" r="6" fill="currentColor" />
    </svg>
  );
}

export function CircuitPath({ className, ...props }: SvgProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 320 160"
      {...props}
    >
      <path
        d="M20 116h58c16 0 22-8 22-22V48c0-14 8-22 22-22h38c13 0 22 9 22 22v20c0 14 8 22 22 22h88"
        stroke="currentColor"
        strokeDasharray="11 12"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <circle cx="20" cy="116" r="10" fill="currentColor" />
      <circle cx="160" cy="26" r="10" fill="currentColor" />
      <circle cx="292" cy="90" r="10" fill="currentColor" />
      <path d="M78 116v30M122 26V6M204 90v38" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

export function SoccerPath({ className, ...props }: SvgProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 420 160"
      {...props}
    >
      <path
        d="M18 118c55-82 99-12 151-65 45-46 79-28 112 9 32 35 61 42 101 5"
        stroke="currentColor"
        strokeDasharray="10 12"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <path d="M361 67h36v48h-36z" stroke="currentColor" strokeWidth="5" />
      <circle cx="18" cy="118" r="10" fill="currentColor" />
      <circle cx="167" cy="53" r="9" fill="currentColor" />
      <circle cx="281" cy="62" r="9" fill="currentColor" />
    </svg>
  );
}
