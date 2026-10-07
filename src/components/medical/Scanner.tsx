import { motion, useScroll, useTransform } from "framer-motion";

interface ScannerProps {
  className?: string;
  variant?: "vertical" | "horizontal";
  color?: string;
}

export default function Scanner({
  className = "",
  variant = "vertical",
  color = "rgba(94, 234, 212, 0.6)",
}: ScannerProps) {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (variant === "horizontal") {
    return (
      <motion.div
        className={`pointer-events-none absolute inset-y-0 w-[40%] ${className}`}
        style={{
          left: x,
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
      />
    );
  }

  return (
    <motion.div
      className={`pointer-events-none absolute inset-x-0 h-[35%] ${className}`}
      style={{
        top: y,
        background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`,
        filter: "blur(30px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
