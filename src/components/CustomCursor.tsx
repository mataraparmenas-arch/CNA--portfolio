import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [touchDevice, setTouchDevice] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      setTouchDevice(true);
      return;
    }
    setTouchDevice(false);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setHover(!!target.closest("a, button, [data-cursor='hover']"));
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (touchDevice) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden transition-opacity duration-200 md:block"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
          opacity: hidden ? 0 : 1,
        }}
      >
        <div className="h-2 w-2 rounded-full bg-mint-400" style={{ boxShadow: "0 0 12px #5eead4" }} />
      </div>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden transition-all duration-300 md:block"
        style={{
          transform: `translate3d(${pos.x - (hover ? 24 : 16)}px, ${pos.y - (hover ? 24 : 16)}px, 0)`,
          width: hover ? 48 : 32,
          height: hover ? 48 : 32,
          opacity: hidden ? 0 : 0.6,
        }}
      >
        <div
          className={`h-full w-full rounded-full border ${
            hover ? "border-mint-400" : "border-cyan-glow/60"
          }`}
        />
      </div>
    </>
  );
}
