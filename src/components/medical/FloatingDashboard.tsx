import { motion } from "framer-motion";

interface FloatingDashboardProps {
  className?: string;
  title?: string;
  metrics?: { label: string; status: string; active?: boolean }[];
}

export default function FloatingDashboard({
  className = "",
  title = "MOVEMENT ANALYSIS",
  metrics = [
    { label: "MOBILITY", status: "ACTIVE" },
    { label: "RANGE", status: "TRACKING" },
    { label: "MOTION", status: "MONITORING" },
    { label: "RECOVERY", status: "READY" },
  ],
}: FloatingDashboardProps) {
  return (
    <div
      className={`glass pointer-events-none rounded-xl p-4 font-mono text-[10px] uppercase tracking-[0.2em] ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-cyan">{title}</span>
        <span className="flex items-center gap-1.5 text-mint-400">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
          LIVE
        </span>
      </div>
      <div className="space-y-2.5">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-dim">{m.label}</span>
            <div className="flex flex-1 items-center gap-2">
              <div className="relative h-px flex-1 bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-mint-400 to-cyan-glow"
                  initial={{ width: 0 }}
                  animate={{ width: ["20%", "85%", "40%", "70%"] }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span className="text-mint-400">{m.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
