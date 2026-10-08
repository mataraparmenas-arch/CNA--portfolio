import { useEffect, useRef } from "react";
import { useReducedMotion, useRevealObserver } from "@/hooks/useMotion";

/**
 * "Movement is Medicine"
 * A sticky, scroll-driven visualisation. Scroll progress p (0→1) moves the scene
 * from stiffness to mobility:
 *   • an abstract jointed figure walks in place — quantised/jerky at p=0, fluid at p=1
 *   • background flow lines go from broken segments to continuous waves
 *   • motion trails emerge as movement becomes smooth
 * Purely symbolic — not clinical data.
 */
export function MovementExperience() {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useRevealObserver(root);

  useEffect(() => {
    const section = root.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let p = reduced ? 1 : 0;
    const t0 = performance.now();
    const trails: { x: number; y: number }[][] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const readProgress = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      const raw = total > 0 ? -r.top / total : 1;
      p = reduced ? 1 : Math.min(1, Math.max(0, raw));
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.02, eased)})`;
      if (labelRef.current) labelRef.current.textContent = eased < 0.33 ? "Restricted" : eased < 0.72 ? "Guided" : "Fluid";
      if (pctRef.current) pctRef.current.textContent = `${Math.round(eased * 100)}`;
      return eased;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const quant = (v: number, steps: number) => Math.round(v * steps) / steps;

    const draw = (now: number) => {
      const e = readProgress();
      const time = reduced ? 1.2 : (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      const H = Math.min(h * 0.62, 440);
      const cx = w * (w < 768 ? 0.5 : 0.58);
      const cy = h * 0.52;

      /* ---- flow lines ---- */
      const lines = w < 768 ? 4 : 6;
      for (let i = 0; i < lines; i++) {
        const yBase = cy - H * 0.45 + (i / (lines - 1)) * H * 0.9;
        const amp = lerp(2, 14, e);
        const seg = Math.round(lerp(10, 110, e));
        ctx.beginPath();
        for (let s = 0; s <= seg; s++) {
          const x = (s / seg) * w;
          const phase = time * lerp(0.2, 0.9, e) + i * 0.7;
          let y = yBase + Math.sin(x * 0.012 + phase) * amp;
          if (e < 0.6) y += (Math.sin(x * 0.37 + i * 9.1) * (1 - e / 0.6)) * 4; // jitter when stiff
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = lerp(0.07, 0.16, e);
        ctx.strokeStyle = `rgba(${e > 0.5 ? "63,191,168" : "162,177,189"},${alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.setLineDash(e < 0.5 ? [lerp(2, 40, e * 2), lerp(10, 0, e * 2)] : []);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      /* ---- jointed figure ---- */
      const amp = lerp(0.3, 1, e);
      const phiRaw = time * 2.1;
      const phi = lerp(quant(phiRaw, 1.6), phiRaw, Math.min(1, e * 1.3));
      const sway = Math.sin(phi * 2) * H * 0.012 * amp;

      const head = { x: cx + sway, y: cy - H * 0.5 };
      const neck = { x: cx + sway, y: cy - H * 0.37 };
      const hip = { x: cx, y: cy + H * 0.02 };

      const limb = (origin: { x: number; y: number }, ang1: number, len1: number, ang2: number, len2: number) => {
        const mid = { x: origin.x + Math.sin(ang1) * len1, y: origin.y + Math.cos(ang1) * len1 };
        const end = { x: mid.x + Math.sin(ang1 + ang2) * len2, y: mid.y + Math.cos(ang1 + ang2) * len2 };
        return [origin, mid, end];
      };

      const swing = Math.sin(phi) * 0.55 * amp;
      const shoulderL = { x: neck.x - H * 0.09, y: neck.y + H * 0.02 };
      const shoulderR = { x: neck.x + H * 0.09, y: neck.y + H * 0.02 };
      const armL = limb(shoulderL, swing, H * 0.19, -0.35 - Math.max(0, swing) * 0.6, H * 0.17);
      const armR = limb(shoulderR, -swing, H * 0.19, -0.35 - Math.max(0, -swing) * 0.6, H * 0.17);

      const stride = Math.sin(phi) * 0.5 * amp;
      const hipL = { x: hip.x - H * 0.05, y: hip.y };
      const hipR = { x: hip.x + H * 0.05, y: hip.y };
      const legL = limb(hipL, -stride, H * 0.24, Math.max(0, Math.sin(phi + Math.PI)) * 0.9 * amp, H * 0.24);
      const legR = limb(hipR, stride, H * 0.24, Math.max(0, Math.sin(phi)) * 0.9 * amp, H * 0.24);

      const chains = [
        [head, neck, hip],
        [shoulderL, neck, shoulderR],
        [hipL, hip, hipR],
        armL,
        armR,
        legL,
        legR,
      ];

      // trails
      if (!reduced) {
        trails.push([armL[2], armR[2], legL[2], legR[2]]);
        if (trails.length > 26) trails.shift();
        const trailAlpha = Math.max(0, e - 0.35) / 0.65;
        if (trailAlpha > 0) {
          for (let k = 0; k < 4; k++) {
            ctx.beginPath();
            trails.forEach((f, i) => (i === 0 ? ctx.moveTo(f[k].x, f[k].y) : ctx.lineTo(f[k].x, f[k].y)));
            ctx.strokeStyle = `rgba(63,191,168,${(0.28 * trailAlpha).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // ground
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath();
      ctx.moveTo(cx - H * 0.6, cy + H * 0.5);
      ctx.lineTo(cx + H * 0.6, cy + H * 0.5);
      ctx.stroke();

      // bones
      const boneRGB = e > 0.5 ? "246,248,250" : "201,211,219";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      chains.forEach((c) => {
        ctx.beginPath();
        c.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
        ctx.strokeStyle = `rgba(${boneRGB},${lerp(0.45, 0.9, e).toFixed(3)})`;
        ctx.lineWidth = lerp(1.2, 2, e);
        ctx.stroke();
      });

      // joints
      const joints = [neck, hip, shoulderL, shoulderR, armL[1], armR[1], armL[2], armR[2], hipL, hipR, legL[1], legR[1], legL[2], legR[2]];
      joints.forEach((j) => {
        ctx.beginPath();
        ctx.arc(j.x, j.y, lerp(2.2, 3.4, e), 0, Math.PI * 2);
        ctx.fillStyle = e > 0.5 ? "#3fbfa8" : "rgba(201,211,219,0.9)";
        ctx.fill();
        if (e > 0.6) {
          const g = ctx.createRadialGradient(j.x, j.y, 0, j.x, j.y, 14);
          g.addColorStop(0, `rgba(63,191,168,${(0.25 * (e - 0.6) / 0.4).toFixed(3)})`);
          g.addColorStop(1, "rgba(63,191,168,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(j.x, j.y, 14, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      // head
      ctx.beginPath();
      ctx.arc(head.x, head.y - H * 0.03, H * 0.045, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${boneRGB},${lerp(0.5, 0.95, e).toFixed(3)})`;
      ctx.lineWidth = lerp(1.2, 2, e);
      ctx.stroke();

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (reduced) draw(performance.now());
      else raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(performance.now());
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { rootMargin: "10%" });
    io.observe(section);
    const onScroll = () => {
      if (reduced) {
        readProgress();
        draw(performance.now());
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative h-[170svh] bg-navy-900 text-mist-50 sm:h-[190svh]"
      aria-labelledby="movement-title"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden">
        {/* subtle vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 60% 50%, rgba(63,191,168,0.08), transparent 70%), linear-gradient(to bottom, #0b1b2b, #0a1826 60%, #071320)",
          }}
          aria-hidden
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 content-between gap-6 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div>
            <p className="reveal mb-4 flex items-center gap-3 font-heading text-[12px] font-semibold uppercase tracking-[0.22em] text-mint-400">
              <span className="h-px w-6 bg-mint-400/70" aria-hidden />
              Interactive
            </p>
            <h2
              id="movement-title"
              className="reveal font-heading text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02]"
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              Movement
              <br />
              is <span className="text-mint-400">Medicine.</span>
            </h2>
            <p className="reveal mt-6 max-w-[42ch] text-[16px] leading-relaxed text-mist-300" style={{ ["--reveal-delay" as string]: "160ms" }}>
              Recovery rarely happens all at once. It is built step by step — from guarded, restricted motion towards
              strength, confidence and freedom of movement. Scroll to follow the transition.
            </p>
          </div>

          {/* Readout */}
          <div className="glass-dark self-end justify-self-start rounded-2xl p-5 sm:p-6 lg:justify-self-end lg:self-end">
            <div className="flex items-baseline justify-between gap-10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-400">Mobility</span>
              <span className="font-heading text-[13px] font-semibold text-mint-400">
                <span ref={labelRef}>Restricted</span>
              </span>
            </div>
            <div className="mt-3 h-1 w-56 overflow-hidden rounded-full bg-white/10 sm:w-64">
              <span ref={barRef} className="block h-full origin-left rounded-full bg-mint-400 transition-transform duration-200 ease-out" style={{ transform: "scaleX(0.02)" }} />
            </div>
            <div className="mt-3 flex items-baseline gap-1 font-heading">
              <span ref={pctRef} className="text-[28px] font-bold leading-none">
                0
              </span>
              <span className="text-[13px] text-mist-400">% range of motion — symbolic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
