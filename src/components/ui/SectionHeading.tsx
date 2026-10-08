import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, lead, dark, align = "left", className }: Props) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "reveal mb-4 flex items-center gap-3 font-heading text-[12px] font-semibold uppercase tracking-[0.22em]",
          align === "center" && "justify-center",
          dark ? "text-mint-400" : "text-mint-600",
        )}
      >
        <span className={cn("h-px w-6", dark ? "bg-mint-400/70" : "bg-mint-500/70")} aria-hidden />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "reveal font-heading text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08]",
          dark ? "text-mist-50" : "text-navy-900",
        )}
        style={{ ["--reveal-delay" as string]: "80ms" }}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn("reveal mt-5 text-[17px] leading-relaxed", dark ? "text-mist-300" : "text-mist-600")}
          style={{ ["--reveal-delay" as string]: "160ms" }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
