import { useEffect, useRef, type RefObject } from "react";

type Vec = { x: number; y: number; z: number };
type Props = {
  pointer: RefObject<{ x: number; y: number }>;
  reduced: boolean;
  className?: string;
};

/**
 * A deliberately lightweight "3D" healthcare scene: no WebGL, no Three.js.
 * Points are rotated in 3D and perspective-projected onto a 2D canvas.
 *
 * Elements:
 *  • two thin orbital rings — a gimbal-like medical interface around the portrait
 *  • an abstract spine: a column of joint discs with a travelling light pulse
 *  • a handful of depth particles
 *
 * Costs a few hundred line segments per frame; pauses when offscreen or hidden.
 * Under reduced motion a single static frame is drawn.
 */
export function Healthcare3D({ pointer, reduced, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    const start = performance.now();

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 22;

    // --- geometry ---------------------------------------------------------
    const ringPts = (n: number) =>
      Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        return { x: Math.cos(a), y: 0, z: Math.sin(a) };
      });
    const ringA = ringPts(84);
    const ringB = ringPts(84);

    const spineCount = 13;
    const spineX = isMobile ? -1.12 : -1.3;
    const spine: Vec[] = Array.from({ length: spineCount }, (_, i) => {
      const t = i / (spineCount - 1); // 0..1 top→bottom
      return { x: Math.sin(t * Math.PI) * 0.12 + spineX, y: (t - 0.5) * 1.7, z: Math.cos(t * Math.PI * 1.2) * 0.08 };
    });

    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const particles: Vec[] = Array.from({ length: particleCount }, () => {
      const r = 1.1 + rnd() * 0.5;
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      return { x: r * Math.sin(ph) * Math.cos(th), y: r * Math.cos(ph) * 0.8, z: r * Math.sin(ph) * Math.sin(th) };
    });

    // --- math -------------------------------------------------------------
    const rot = (p: Vec, ax: number, ay: number, az: number): Vec => {
      // rotate X
      let y = p.y * Math.cos(ax) - p.z * Math.sin(ax);
      let z = p.y * Math.sin(ax) + p.z * Math.cos(ax);
      let x = p.x;
      // rotate Y
      const x2 = x * Math.cos(ay) + z * Math.sin(ay);
      z = -x * Math.sin(ay) + z * Math.cos(ay);
      x = x2;
      // rotate Z
      const x3 = x * Math.cos(az) - y * Math.sin(az);
      y = x * Math.sin(az) + y * Math.cos(az);
      return { x: x3, y, z };
    };

    const project = (p: Vec, R: number, cx: number, cy: number) => {
      const f = 3.2 / (3.2 + p.z);
      return { sx: cx + p.x * R * f, sy: cy + p.y * R * f, f, z: p.z };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // --- drawing ----------------------------------------------------------
    const drawRing = (
      pts: Vec[],
      R: number,
      cx: number,
      cy: number,
      ax: number,
      ay: number,
      az: number,
      scale: number,
      rgb: string,
      baseAlpha: number,
    ) => {
      const proj = pts.map((p) => project(rot({ x: p.x * scale, y: p.y * scale, z: p.z * scale }, ax, ay, az), R, cx, cy));
      for (let i = 0; i < proj.length; i++) {
        const a = proj[i];
        const b = proj[(i + 1) % proj.length];
        const depth = (1 - (a.z + 1.3) / 2.6) * 0.75 + 0.25; // nearer = brighter
        ctx.strokeStyle = `rgba(${rgb},${(baseAlpha * depth).toFixed(3)})`;
        ctx.lineWidth = 0.6 + depth * 0.9;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }
      // a small bright marker on the ring, like an instrument indicator
      const m = proj[0];
      ctx.fillStyle = `rgba(63,191,168,${(0.9 * ((1 - (m.z + 1.3) / 2.6) * 0.7 + 0.3)).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(m.sx, m.sy, 2.2 * m.f, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (now: number) => {
      const t = reduced ? 0 : (now - start) / 1000;
      const px = pointer.current?.x ?? 0;
      const py = pointer.current?.y ?? 0;

      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.36;
      const cx = w * 0.5;
      const cy = h * 0.5;

      // background geometry shifts slower than the foreground — parallax by depth
      const slowX = px * 0.18;
      const slowY = py * 0.12;

      // Rings
      drawRing(ringA, R, cx, cy, 1.25 + slowY * 0.6, t * 0.12 + slowX, 0.35, 1.08, "43,79,110", 0.55);
      drawRing(ringB, R, cx, cy, -1.15 + slowY * 0.4, -t * 0.09 + slowX * 0.8, -0.5, 1.26, "63,191,168", 0.42);

      // Spine — column of joint discs with connective line and a travelling pulse
      const spAx = 0.18 + slowY * 0.5;
      const spAy = Math.sin(t * 0.25) * 0.35 + slowX * 1.4;
      const sp = spine.map((p) => project(rot(p, spAx, spAy, 0.04), R, cx, cy));
      ctx.lineCap = "round";
      for (let i = 0; i < sp.length - 1; i++) {
        const a = sp[i];
        const b = sp[i + 1];
        ctx.strokeStyle = "rgba(43,79,110,0.28)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }
      const pulsePos = reduced ? 0.42 : (Math.sin(t * 0.6) * 0.5 + 0.5) * (spineCount - 1);
      sp.forEach((p, i) => {
        const near = Math.max(0, 1 - Math.abs(i - pulsePos) / 1.6);
        const rx = (6 + near * 2.5) * p.f;
        const ry = (2.4 + near) * p.f;
        ctx.beginPath();
        ctx.ellipse(p.sx, p.sy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(246,248,250,${0.9})`;
        ctx.fill();
        ctx.strokeStyle = near > 0.05 ? `rgba(63,191,168,${(0.35 + near * 0.6).toFixed(3)})` : "rgba(43,79,110,0.45)";
        ctx.lineWidth = 1;
        ctx.stroke();
        if (near > 0.2) {
          const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, 18 * p.f);
          g.addColorStop(0, `rgba(63,191,168,${(near * 0.35).toFixed(3)})`);
          g.addColorStop(1, "rgba(63,191,168,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 18 * p.f, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Particles — drift slowly, respond gently to the pointer
      particles.forEach((p, i) => {
        const q = rot(
          { x: p.x, y: p.y + Math.sin(t * 0.4 + i) * 0.03, z: p.z },
          0.2 + slowY * 0.8,
          t * 0.05 + slowX * 1.6 + i * 0.01,
          0,
        );
        const s = project(q, R, cx, cy);
        const depth = (1 - (s.z + 1.6) / 3.2) * 0.8 + 0.2;
        ctx.fillStyle = `rgba(${i % 3 === 0 ? "63,191,168" : "43,79,110"},${(0.5 * depth).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.sx, s.sy, 1.4 * s.f, 0, Math.PI * 2);
        ctx.fill();
      });

      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    const startLoop = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    frame(performance.now());

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) frame(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) startLoop();
      else stopLoop();
    });
    io.observe(canvas);

    const onVis = () => (document.hidden || !visible ? stopLoop() : startLoop());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pointer, reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
