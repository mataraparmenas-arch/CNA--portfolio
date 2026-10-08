import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useMotion";

const STOPS = [
  { id: "home", label: "Care" },
  { id: "about", label: "Mobility" },
  { id: "expertise", label: "Rehabilitation" },
  { id: "journey", label: "Physiotherapy" },
  { id: "contact", label: "Connection" },
];

/**
 * The site's signature: "The Human Movement Line".
 * A fixed, hair-thin luminous track on the left edge (desktop only). A single
 * point of light travels along it as the visitor scrolls, passing through the
 * five stages of the story. At each stage the line briefly forms a joint ring.
 */
export function MovementLine() {
  const reduced = useReducedMotion();
  const fill = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    let smooth = 0;
    let target = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? window.scrollY / max : 0;
      // which stage are we closest to?
      const mid = window.innerHeight * 0.45;
      let idx = 0;
      STOPS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive((a) => (a === idx ? a : idx));
    };
    const tick = () => {
      smooth += (target - smooth) * (reduced ? 1 : 0.1);
      if (fill.current) fill.current.style.transform = `scaleY(${smooth})`;
      if (dot.current) dot.current.style.top = `${smooth * 100}%`;
      raf = requestAnimationFrame(tick);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-30 hidden h-[52vh] -translate-y-1/2 xl:block" aria-hidden>
      {/* track */}
      <div className="absolute left-[7px] top-0 h-full w-px bg-navy-900/10" />
      <div ref={fill} className="absolute left-[7px] top-0 h-full w-px origin-top bg-[linear-gradient(to_bottom,#2f6fed,#3fbfa8)]" style={{ transform: "scaleY(0)" }} />
      {/* travelling light */}
      <div ref={dot} className="absolute left-[7px] -translate-x-1/2 -translate-y-1/2" style={{ top: 0 }}>
        <span className="block h-2 w-2 rounded-full bg-mint-500 shadow-[0_0_14px_3px_rgba(63,191,168,0.45)]" />
      </div>
      {/* stage markers */}
      <ul className="absolute inset-0 m-0 list-none p-0">
        {STOPS.map((s, i) => {
          const on = i <= active;
          const current = i === active;
          return (
            <li key={s.id} className="absolute left-0 flex -translate-y-1/2 items-center gap-3" style={{ top: `${(i / (STOPS.length - 1)) * 100}%` }}>
              <span
                className={`relative flex h-[15px] w-[15px] items-center justify-center rounded-full border transition-all duration-700 ${
                  current ? "border-mint-500 bg-mist-50" : on ? "border-mint-500/60 bg-mist-50" : "border-navy-900/15 bg-mist-50"
                }`}
              >
                <span className={`h-[5px] w-[5px] rounded-full transition-colors duration-700 ${on ? "bg-mint-500" : "bg-navy-900/15"}`} />
              </span>
              <span
                className={`font-heading text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-700 ${
                  current ? "translate-x-0 text-navy-800 opacity-100" : "-translate-x-1 text-mist-500 opacity-0"
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
