import { useEffect, useRef, useState, type RefObject } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";

type Props = {
  pointer: RefObject<{ x: number; y: number }>;
  parallax: boolean;
};

/**
 * Glorious's actual photograph, integrated into a circular glass instrument frame.
 * The image is never regenerated or altered — only cropped/positioned with CSS.
 *
 * If /images/glorious-portrait.jpg is missing, a quiet monogram placeholder is
 * shown so the layout never breaks. Drop the real photo in /public/images to replace it.
 */
export function Portrait({ pointer, parallax }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const imgLayer = useRef<HTMLDivElement>(null);
  const chipsLayer = useRef<HTMLDivElement>(null);
  const contourLayer = useRef<SVGSVGElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!parallax) return;
    let raf = 0;
    const tick = () => {
      const p = pointer.current ?? { x: 0, y: 0 };
      if (imgLayer.current)
        imgLayer.current.style.transform = `translate3d(${p.x * 7}px, ${p.y * 6}px, 0) rotateY(${p.x * 2.2}deg) rotateX(${-p.y * 2.2}deg)`;
      if (chipsLayer.current) chipsLayer.current.style.transform = `translate3d(${p.x * 16}px, ${p.y * 12}px, 0)`;
      if (contourLayer.current) contourLayer.current.style.transform = `translate3d(${p.x * -5}px, ${p.y * -4}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pointer, parallax]);

  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-[min(78vw,340px)] sm:w-[380px] lg:w-[440px]" style={{ perspective: 1200 }}>
      {/* Contour lines — anatomical/topographic, very quiet */}
      <svg
        ref={contourLayer}
        viewBox="0 0 440 440"
        className="absolute -inset-10 h-[calc(100%+80px)] w-[calc(100%+80px)] text-navy-700 will-change-transform"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden
      >
        <ellipse cx="220" cy="220" rx="214" ry="206" opacity="0.1" />
        <ellipse cx="226" cy="214" rx="196" ry="190" opacity="0.09" transform="rotate(-8 220 220)" />
        <ellipse cx="214" cy="226" rx="182" ry="176" opacity="0.08" transform="rotate(12 220 220)" />
        <path d="M30 300c60-30 90 40 160 10s120-70 220-20" opacity="0.14" strokeDasharray="2 6" />
        <path d="M20 130c70 20 120-40 200-10s110 60 200 30" opacity="0.1" strokeDasharray="2 6" />
      </svg>

      {/* Outer glass ring */}
      <div
        className="glass absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), rgba(255,255,255,0.35))" }}
      />
      <div className="absolute inset-[6%] rounded-full border border-navy-900/8" aria-hidden />

      {/* Ring tick marks — the "instrument dial" */}
      <svg viewBox="0 0 100 100" className="absolute inset-[2.5%] h-[95%] w-[95%] text-navy-900/25" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="1.2"
            x2="50"
            y2={i % 5 === 0 ? "3.4" : "2.2"}
            stroke="currentColor"
            strokeWidth={i % 5 === 0 ? 0.5 : 0.3}
            transform={`rotate(${i * 6} 50 50)`}
          />
        ))}
        {/* Mint arc — a quiet accent, like a progress indicator at rest */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="#3fbfa8"
          strokeWidth="0.9"
          strokeDasharray="38 302"
          strokeLinecap="round"
          transform="rotate(-120 50 50)"
          className="text-mint-500"
        />
      </svg>

      {/* Photograph */}
      <div
        ref={imgLayer}
        className="absolute inset-[11%] overflow-hidden rounded-full shadow-[0_30px_60px_-30px_rgba(11,27,43,0.5)] ring-1 ring-white/70 will-change-transform [transform-style:preserve-3d]"
      >
        {!failed ? (
          <img
            src={profile.portrait}
            alt={profile.portraitAlt}
            width={880}
            height={880}
            fetchPriority="high"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full scale-[1.04] object-cover object-[50%_18%]"
          />
        ) : (
          <PortraitFallback />
        )}
        {/* Soft inner light */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.22), transparent 45%), linear-gradient(to top, rgba(11,27,43,0.18), transparent 40%)",
          }}
          aria-hidden
        />
      </div>

      {/* Floating interface chips — depth layer that moves faster than the portrait */}
      <div ref={chipsLayer} className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden>
        <Chip className="left-[-6%] top-[18%] sm:left-[-12%]" label="Patient care" value="Person-centred" />
        <Chip className="right-[-4%] top-[52%] sm:right-[-14%]" label="Movement" value="Mobility · Function" accent />
        <Chip className="bottom-[2%] left-[6%]" label="Rehabilitation" value="Progressive recovery" />
      </div>
    </div>
  );
}

function Chip({ label, value, className, accent }: { label: string; value: string; className?: string; accent?: boolean }) {
  return (
    <div className={cn("glass absolute flex items-center gap-2.5 rounded-xl py-2 pl-2.5 pr-3.5", className)}>
      <span className={cn("relative flex h-2 w-2", accent ? "text-mint-500" : "text-clinical-500")}>
        <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-30" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
      </span>
      <span className="leading-tight">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">{label}</span>
        <span className="block font-heading text-[12px] font-semibold text-navy-900">{value}</span>
      </span>
    </div>
  );
}

function PortraitFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[linear-gradient(160deg,#10263b,#0b1b2b)] text-mist-50">
      <span className="font-heading text-[64px] font-bold tracking-tight">GM</span>
      <span className="mt-1 max-w-[70%] text-center text-[11px] leading-snug text-mist-300">
        Add the portrait at <code className="text-mint-300">public/images/glorious-portrait.jpg</code>
      </span>
    </div>
  );
}
