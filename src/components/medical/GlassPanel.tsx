import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "soft";
  cornerBrackets?: boolean;
}

export default function GlassPanel({
  children,
  className = "",
  variant = "default",
  cornerBrackets = false,
}: GlassPanelProps) {
  const variantClass =
    variant === "strong" ? "glass-strong" : variant === "soft" ? "glass-soft" : "glass";

  return (
    <div className={cn("relative rounded-2xl", variantClass, className)}>
      {cornerBrackets && (
        <>
          <span className="absolute -top-px -left-px h-3 w-3 border-t border-l border-mint-400/60" />
          <span className="absolute -top-px -right-px h-3 w-3 border-t border-r border-mint-400/60" />
          <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-mint-400/60" />
          <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-mint-400/60" />
        </>
      )}
      {children}
    </div>
  );
}
