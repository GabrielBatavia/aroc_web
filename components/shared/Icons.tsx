import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ className, children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 7 9 5-9 5z" />
    </IconBase>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M13 2 5 14h5l-1 8 8-12h-5l1-8Z" />
    </IconBase>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 2.8 5.68 6.27.91-4.54 4.43 1.07 6.24L12 17.3l-5.6 2.96 1.07-6.24L2.93 9.59l6.27-.91L12 3Z" />
    </IconBase>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3c2.5 2 5.5 2.67 8 3v5c0 5-3.1 8.7-8 10-4.9-1.3-8-5-8-10V6c2.5-.33 5.5-1 8-3Z" />
      <path d="M12 7v8" />
    </IconBase>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
      <circle cx="10" cy="8" r="3" />
      <path d="M20 19v-1a4 4 0 0 0-3-3.87" />
      <path d="M15 5.13a3 3 0 0 1 0 5.75" />
    </IconBase>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.5" />
    </IconBase>
  );
}

export function CpuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 1v4" />
      <path d="M15 1v4" />
      <path d="M9 19v4" />
      <path d="M15 19v4" />
      <path d="M1 9h4" />
      <path d="M1 15h4" />
      <path d="M19 9h4" />
      <path d="M19 15h4" />
    </IconBase>
  );
}

export function CircuitIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2.5" />
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <circle cx="12" cy="12" r="2.2" />
    </IconBase>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </IconBase>
  );
}

export function RadioIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="1.5" />
      <path d="M8.5 8.5a5 5 0 0 1 7 0" />
      <path d="M5.5 5.5a9 9 0 0 1 13 0" />
      <path d="M8.5 15.5a5 5 0 0 0 7 0" />
    </IconBase>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5a2 2 0 0 0 2 2" />
      <path d="M16 6h3a2 2 0 0 1-2 2" />
      <path d="M12 11v4" />
      <path d="M9 19h6" />
      <path d="M8 22h8" />
    </IconBase>
  );
}

export function MedalIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m8 3 4 6 4-6" />
      <circle cx="12" cy="16" r="4" />
      <path d="m10.5 16 1 1 2-2" />
    </IconBase>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </IconBase>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.5 6.5h.01" />
    </IconBase>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 8v9" />
      <path d="M7 5.5h.01" />
      <path d="M12 17V8" />
      <path d="M17 17v-5a2.5 2.5 0 0 0-5 0" />
    </IconBase>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </IconBase>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

export function GraduationCapIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m2 9 10-5 10 5-10 5-10-5Z" />
      <path d="M6 11.5v4.5c0 1.3 2.7 3 6 3s6-1.7 6-3v-4.5" />
      <path d="M22 10v6" />
      <path d="M22 16c0 .9-.7 1.5-1.5 1.5S19 16.9 19 16s.7-1.5 1.5-1.5S22 15.1 22 16Z" />
    </IconBase>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.4 19.4 0 0 1 5.2 12.8 19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.3 10a16 16 0 0 0 6.7 6.7l1.5-1.7a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z" />
    </IconBase>
  );
}
