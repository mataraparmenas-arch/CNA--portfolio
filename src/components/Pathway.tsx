import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";
import { useReducedMotion, useRevealObserver } from "@/hooks/useMotion";
import { SectionHeading } from "./ui/SectionHeading";

/* Desktop node positions in a 1000×320 coordinate space (percentages for HTML) */
const NODES = [
  { x: 60, y: 200 },
  { x: 280, y: 110 },
  { x: 500, y: 200 },
  { x: 720, y: 110 },
  { x: 940, y: 200 },
];
const DESKTOP_PATH =
  `M ${NODES[0].x} ${NODES[0].y} ` +
  NODES.slice(1)
    .map((n, i) => {
      const p = NODES[i];
      const cx = (p.x + n.x) / 2;
      return `C ${cx} ${p.y}, ${cx} ${n.y}, ${n.x} ${n.y}`;
    })
    .join(" ");

export function Pathway() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const glowD = useRef<SVGPathElement>(null);
  const glowM = useRef<SVGLineElement>(null);
  const reduced = useReducedMotion();
  useRevealObserver(root);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const pathD = glowD.current;
    const lineM = glowM.current;
    const lenD = pathD?.getTotalLength() ?? 1;
    const lenM = 1000;
    if (pathD) pathD.style.strokeDasharray = `${lenD}`;
    if (lineM) lineM.style.strokeDasharray = `${lenM}`;

    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0..1 as the track crosses the middle 60% of the viewport
      const raw = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      const p = reduced ? 1 : Math.min(1, Math.max(0, raw));
      if (pathD) pathD.style.strokeDashoffset = `${lenD * (1 - p)}`;
      if (lineM) lineM.style.strokeDashoffset = `${lenM * (1 - p)}`;
      el.querySelectorAll<HTMLElement>(".stage").forEach((s) => {
        const i = Number(s.dataset.index ?? 0);
        const threshold = (i + 0.35) / NODES.length;
        s.classList.toggle("is-on", p >= threshold);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section ref={root} className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="pathway-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="From care to movement"
          title={
            <span id="pathway-title">
              One profession, <span className="text-navy-500">two connected paths.</span>
            </span>
          }
          lead="Nursing assistance taught the person; physiotherapy teaches the movement. Together they form a single care pathway — from presence at the bedside to confident, independent motion."
        />

        <div ref={track} className="relative mt-16 sm:mt-20">
          {/* ---------- Desktop: curved route ---------- */}
          <div className="relative hidden h-[420px] lg:block">
            <svg
              viewBox="0 0 1000 320"
              preserveAspectRatio="none"
              className="absolute inset-x-0 top-0 h-[320px] w-full overflow-visible"
              aria-hidden
            >
              <path d={DESKTOP_PATH} fill="none" stroke="rgba(11,27,43,0.12)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path
                ref={glowD}
                d={DESKTOP_PATH}
                fill="none"
                stroke="url(#pathGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ filter: "drop-shadow(0 0 6px rgba(63,191,168,0.55))" }}
              />
              <defs>
                <linearGradient id="pathGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#2f6fed" />
                  <stop offset="1" stopColor="#3fbfa8" />
                </linearGradient>
              </defs>
            </svg>

            <ol className="absolute inset-0 m-0 list-none p-0">
              {profile.pathway.map((s, i) => {
                const n = NODES[i];
                const above = n.y < 160;
                return (
                  <li
                    key={s.step}
                    data-index={i}
                    className="stage group absolute w-[200px] -translate-x-1/2"
                    style={{ left: `${n.x / 10}%`, top: `${(n.y / 320) * 320}px` }}
                  >
                    {/* node */}
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <span className="stage-ring absolute inset-[-10px] rounded-full border border-mint-500/0 transition-all duration-700" />
                      <span className="stage-dot block h-3.5 w-3.5 rounded-full border-2 border-mist-50 bg-mist-300 shadow-[0_0_0_4px_rgba(246,248,250,1)] transition-all duration-700" />
                    </span>
                    {/* label */}
                    <div
                      className={`stage-body absolute left-1/2 w-[200px] -translate-x-1/2 text-center transition-all duration-700 ${
                        above ? "bottom-7" : "top-7"
                      }`}
                    >
                      <span className="block font-heading text-[11px] font-semibold tracking-[0.2em] text-mint-600">{s.step}</span>
                      <span className="mt-1 block font-heading text-[16px] font-bold text-navy-900">{s.title}</span>
                      <span className="mt-1.5 block text-[13px] leading-snug text-mist-600">{s.text}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ---------- Mobile / tablet: vertical route ---------- */}
          <div className="relative lg:hidden">
            <svg className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-[3px] overflow-visible" viewBox="0 0 3 1000" preserveAspectRatio="none" aria-hidden>
              <line x1="1.5" y1="0" x2="1.5" y2="1000" stroke="rgba(11,27,43,0.12)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <line
                ref={glowM}
                x1="1.5"
                y1="0"
                x2="1.5"
                y2="1000"
                stroke="#3fbfa8"
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ filter: "drop-shadow(0 0 6px rgba(63,191,168,0.55))" }}
              />
            </svg>
            <ol className="m-0 list-none space-y-9 p-0">
              {profile.pathway.map((s, i) => (
                <li key={s.step} data-index={i} className="stage relative pl-12">
                  <span className="absolute left-[5px] top-1">
                    <span className="stage-dot block h-3.5 w-3.5 rounded-full border-2 border-mist-50 bg-mist-300 shadow-[0_0_0_4px_rgba(246,248,250,1)] transition-all duration-700" />
                  </span>
                  <div className="stage-body transition-all duration-700">
                    <span className="font-heading text-[11px] font-semibold tracking-[0.2em] text-mint-600">{s.step}</span>
                    <h3 className="mt-1 font-heading text-[18px] font-bold text-navy-900">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-mist-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <style>{`
        .stage .stage-body { opacity: .38; transform: translateY(6px); }
        .stage.is-on .stage-body { opacity: 1; transform: translateY(0); }
        .stage.is-on .stage-dot { background: #3fbfa8; box-shadow: 0 0 0 4px #f6f8fa, 0 0 18px rgba(63,191,168,.6); }
        .stage.is-on .stage-ring { border-color: rgba(63,191,168,.35); }
        @media (prefers-reduced-motion: reduce) {
          .stage .stage-body { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
