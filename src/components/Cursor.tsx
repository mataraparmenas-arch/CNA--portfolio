import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/useMotion";

/**
 * Subtle healthcare cursor: a small dot with a soft ring that eases behind it
 * and expands over interactive elements. Desktop (fine pointer) only.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-enabled");
    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let down = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest("a, button, input, textarea, select, label, [role='button']");
    };
    const onDown = () => (down = true);
    const onUp = () => (down = false);
    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%,-50%) scale(${down ? 0.6 : 1})`;
      if (ring.current) {
        const s = hovering ? 1.9 : down ? 0.8 : 1;
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%) scale(${s})`;
        ring.current.style.borderColor = hovering ? "rgba(63,191,168,0.9)" : "rgba(11,27,43,0.45)";
        ring.current.style.backgroundColor = hovering ? "rgba(63,191,168,0.08)" : "transparent";
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove("cursor-enabled");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[6px] w-[6px] rounded-full bg-navy-900 mix-blend-multiply"
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border transition-[border-color,background-color] duration-300"
        style={{ borderColor: "rgba(11,27,43,0.45)" }}
      />
    </>
  );
}
