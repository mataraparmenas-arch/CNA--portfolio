import { useRef, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/utils/cn";
import { useFinePointer, useReducedMotion } from "@/hooks/useMotion";

type Props = HTMLAttributes<HTMLDivElement> & {
  dark?: boolean;
  tilt?: boolean;
  as?: "div" | "article" | "li";
};

/**
 * Premium glass surface. On desktop it tilts a few degrees towards the cursor
 * and a soft light highlight follows the pointer — like the face of a
 * well-made medical instrument, not a floating UI gimmick.
 */
export function GlassCard({ className, dark, tilt = true, as = "div", children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const interactive = tilt && fine && !reduced;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !interactive) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--ry", `${(px - 0.5) * 5}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 5}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "rounded-2xl",
        dark ? "glass-dark" : "glass glass-highlight",
        interactive && "tilt hover:shadow-[0_24px_50px_-24px_rgba(11,27,43,0.28)] hover:border-mint-300/70",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
