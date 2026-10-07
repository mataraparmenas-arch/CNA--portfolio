import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";

interface IntroProps {
  onComplete: () => void;
}

const stages = [
  { label: "ENTER", duration: 500 },
  { label: "SCAN", duration: 500 },
  { label: "IDENTIFY", duration: 500 },
  { label: "ANALYZE", duration: 500 },
];

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage < stages.length) {
      const t = setTimeout(() => setStage((s) => s + 1), stages[stage].duration);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => onComplete(), 1200);
      return () => clearTimeout(t);
    }
  }, [stage, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-clinical-950"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg-sm opacity-20" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-400/[0.08] blur-[120px]" />
      </div>

      {/* Scanning beam */}
      {stage < 4 && (
        <motion.div
          key={stage}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[60vh] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-mint-400 to-transparent"
        />
      )}

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        {stage < 4 ? (
          <>
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-mint-400"
            >
              STAGE 0{stage + 1} / 04
            </motion.div>
            <motion.h1
              key={`h-${stage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-3 font-display text-3xl font-bold tracking-tight text-clinical sm:text-4xl"
            >
              {stages[stage].label}
            </motion.h1>
            <motion.div
              key={`sub-${stage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan"
            >
              {stage === 0 && "INITIALIZING DIGITAL HEALTHCARE"}
              {stage === 1 && "SCANNING ENVIRONMENT"}
              {stage === 2 && "IDENTIFYING PROFILE"}
              {stage === 3 && "ANALYZING MOVEMENT DATA"}
            </motion.div>

            {/* Progress bar */}
            <div className="mt-10 h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                key={`p-${stage}`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: stages[stage].duration / 1000, ease: "linear" }}
                className="h-full bg-gradient-to-r from-mint-400 to-cyan-glow"
              />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-4 h-px w-24 bg-gradient-to-r from-transparent via-mint-400 to-transparent"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-display text-5xl font-bold tracking-tight text-clinical sm:text-6xl"
            >
              {profile.name.toUpperCase()}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-mint-400"
            >
              {profile.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan"
            >
              {profile.tagline}
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Corner indicators */}
      <div className="pointer-events-none absolute inset-6">
        <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-mint-400/40" />
        <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-mint-400/40" />
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-mint-400/40" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-mint-400/40" />
      </div>

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-6 right-6 z-30 font-mono text-[10px] uppercase tracking-[0.25em] text-dim transition-colors hover:text-mint-400"
      >
        SKIP →
      </button>
    </motion.div>
  );
}
