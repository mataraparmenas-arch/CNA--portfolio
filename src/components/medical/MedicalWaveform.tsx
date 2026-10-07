import { useEffect, useRef } from "react";

interface MedicalWaveformProps {
  className?: string;
  color?: string;
  height?: number;
  speed?: number;
  variant?: "ecg" | "respiratory" | "motion";
}

export default function MedicalWaveform({
  className = "",
  color = "#5eead4",
  height = 60,
  speed = 1,
  variant = "ecg",
}: MedicalWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 0.016 * speed;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Mid line
      ctx.strokeStyle = `${color}15`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Main waveform
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5 * dpr;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();

      for (let x = 0; x < w; x += 2) {
        const norm = x / w;
        let y = h / 2;

        if (variant === "ecg") {
          // ECG-like pattern: flat, p-wave, qrs, t-wave, flat
          const period = 0.18;
          const phase = (norm * 1.0 + t * 0.05) % period;
          if (phase < 0.04) {
            y = h / 2;
          } else if (phase < 0.06) {
            y = h / 2 - (phase - 0.04) * 200;
          } else if (phase < 0.07) {
            y = h / 2 + 80;
          } else if (phase < 0.09) {
            y = h / 2 - 600;
          } else if (phase < 0.11) {
            y = h / 2 + 200;
          } else if (phase < 0.14) {
            y = h / 2 - 100;
          } else {
            y = h / 2;
          }
        } else if (variant === "respiratory") {
          y =
            h / 2 +
            Math.sin(norm * Math.PI * 4 + t * 0.8) * (h * 0.25) +
            Math.sin(norm * 8 + t) * 4;
        } else {
          // motion - layered sines
          y =
            h / 2 +
            Math.sin(norm * Math.PI * 6 + t) * 25 +
            Math.sin(norm * Math.PI * 14 + t * 1.3) * 10 +
            Math.sin(norm * Math.PI * 28 + t * 0.5) * 4;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Glow overlay
      ctx.strokeStyle = `${color}40`;
      ctx.lineWidth = 4 * dpr;
      ctx.beginPath();
      for (let x = 0; x < w; x += 2) {
        const norm = x / w;
        let y = h / 2;
        if (variant === "ecg") {
          const period = 0.18;
          const phase = (norm * 1.0 + t * 0.05) % period;
          if (phase < 0.04) y = h / 2;
          else if (phase < 0.06) y = h / 2 - (phase - 0.04) * 200;
          else if (phase < 0.07) y = h / 2 + 80;
          else if (phase < 0.09) y = h / 2 - 600;
          else if (phase < 0.11) y = h / 2 + 200;
          else if (phase < 0.14) y = h / 2 - 100;
          else y = h / 2;
        } else if (variant === "respiratory") {
          y = h / 2 + Math.sin(norm * Math.PI * 4 + t * 0.8) * (h * 0.25);
        } else {
          y = h / 2 + Math.sin(norm * Math.PI * 6 + t) * 25;
        }
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [color, speed, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: `${height}px` }}
    />
  );
}
