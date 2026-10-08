import type { SVGProps } from "react";

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const MailIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const DownloadIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 4v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4.5 19.5h15" />
  </svg>
);

export const EyeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.75" />
  </svg>
);

export const ArrowDownIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </svg>
);

export const ArrowRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const SendIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M20 4 4 10.5l7 2.5 2.5 7L20 4Z" />
    <path d="M11 13l9-9" />
  </svg>
);

export const FileIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h6" />
  </svg>
);

/* ---- Expertise glyphs: thin-line, anatomical/movement-inspired, not generic medical icons ---- */

export const CareGlyph = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width={28} height={28} strokeWidth={1.5} {...p}>
    <path d="M4 13.5c0 3 3 5.5 8 5.5 2.5 0 4-1 4-2.5 0-1.2-1-2-2.5-2H10" />
    <path d="M4 13.5V9.5c0-1 1-2 2-2h3l3 2 5-3c1-.6 2.3-.2 2.6.9.3.9-.1 1.7-.9 2.2L15 12" />
  </svg>
);

export const MobilityGlyph = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width={28} height={28} strokeWidth={1.5} {...p}>
    <circle cx="13" cy="4.5" r="1.75" />
    <path d="M9 21l2.5-6.5 3-1.5 1.5 4 3 1" />
    <path d="M11.5 14.5 10 11l3-3.5 3 1.5 3 3" />
    <path d="M6 12l4-1" />
    <path d="M3.5 21h4" strokeOpacity="0.5" />
  </svg>
);

export const RehabGlyph = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width={28} height={28} strokeWidth={1.5} {...p}>
    <path d="M4 17c3-6 5-6 8-3s5 3 8-3" />
    <path d="M4 12c3-6 5-6 8-3s5 3 8-3" strokeOpacity="0.4" />
    <circle cx="12" cy="14" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="20" cy="11" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="4" cy="17" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

export const PhysioGlyph = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width={28} height={28} strokeWidth={1.5} {...p}>
    <path d="M12 3v3M12 8v3M12 13v3M12 18v3" />
    <path d="M8.5 6.5h7M8 11.5h8M8.5 16.5h7" />
    <path d="M6 9c-1.5 1-1.5 5 0 6M18 9c1.5 1 1.5 5 0 6" strokeOpacity="0.5" />
  </svg>
);
