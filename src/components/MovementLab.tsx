import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlassPanel from "./medical/GlassPanel";
import MedicalWaveform from "./medical/MedicalWaveform";

const trajectory = [
  { x: 0, y: 50 },
  { x: 12, y: 35 },
  { x: 24, y: 48 },
  { x: 38, y: 22 },
  { x: 52, y: 40 },
  { x: 68, y: 18 },
  { x: 82, y: 32 },
  { x: 100, y: 24 },
];

export default function MovementLab() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbX = useTransform(scrollYProgress, [0, 1], ["20%", "80%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["60%", "20%"]);

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setPhase((p) => (p + 1) % 4), 2200);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      id="movement"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-400/[0.04] blur-[140px]" />
        <div className="grid-bg-sm absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400"
        >
          <span>05</span>
          <div className="h-px w-12 bg-mint-400/50" />
          <span>MOVEMENT LAB</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Headline */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="font-display text-balance text-5xl font-bold leading-[1.0] tracking-tight text-clinical sm:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-br from-mint-400 to-cyan-glow bg-clip-text text-transparent">
                MOVEMENT
              </span>
              <br />
              LAB.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-8 max-w-md text-balance text-base leading-relaxed text-muted sm:text-lg"
            >
              An interactive visualization of how the body moves — conceptual
              representations of mobility, range, and rehabilitation paths.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 space-y-4"
            >
              {[
                { label: "MOTION", sub: "TRACKING" },
                { label: "MOBILITY", sub: "ANALYSIS" },
                { label: "MOVEMENT", sub: "PATH" },
                { label: "REHABILITATION", sub: "ACTIVE" },
              ].map((l, i) => (
                <motion.div
                  key={l.label}
                  animate={{
                    borderColor:
                      phase === i ? "rgba(94,234,212,0.5)" : "rgba(255,255,255,0.05)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-between border-l-2 pl-4"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
                      {l.sub}
                    </div>
                    <div className="font-display text-base font-semibold text-clinical">
                      {l.label}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-mint-400">
                    {phase === i ? "▸" : "·"}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Lab visualization */}
          <div className="lg:col-span-7">
            <GlassPanel className="relative h-[520px] overflow-hidden p-6" cornerBrackets>
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-cyan">TRAJECTORY ANALYSIS</span>
                <span className="flex items-center gap-1.5 text-mint-400">
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                  LIVE
                </span>
              </div>

              {/* Trajectory graph */}
              <div className="relative h-44 overflow-hidden rounded-xl border border-white/5 bg-clinical-950/50">
                <div className="grid-bg-sm absolute inset-0 opacity-30" />
                <svg
                  viewBox="0 0 100 50"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  {/* Reference line */}
                  <line
                    x1="0"
                    y1="25"
                    x2="100"
                    y2="25"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="0.2"
                    strokeDasharray="2,2"
                  />
                  <motion.polyline
                    points={trajectory.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke="#5eead4"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5 }}
                    style={{ filter: "drop-shadow(0 0 4px #5eead4)" }}
                  />
                  {trajectory.map((p, i) => (
                    <motion.circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r="1"
                      fill="#67e8f9"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15 }}
                    />
                  ))}
                </svg>
                <div className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-[0.2em] text-cyan">
                  MOVEMENT PATH
                </div>
                <div className="absolute right-2 top-2 font-mono text-[8px] uppercase tracking-[0.2em] text-mint-400">
                  T+00:42
                </div>
              </div>

              {/* Floating orb that moves with scroll */}
              <motion.div
                style={{ left: orbX, top: orbY }}
                className="pointer-events-none absolute"
              >
                <div className="relative h-3 w-3">
                  <span className="absolute inset-0 rounded-full bg-mint-400 pulse-dot" />
                  <span className="absolute -inset-2 rounded-full border border-mint-400/30" />
                </div>
              </motion.div>

              {/* Radial mobility diagram */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-clinical-950/50">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.circle
                        key={i}
                        cx="50"
                        cy="50"
                        r={15 + i * 8}
                        fill="none"
                        stroke="#5eead4"
                        strokeWidth="0.4"
                        strokeOpacity={0.2 + i * 0.1}
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 1.5 }}
                      />
                    ))}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="20"
                      fill="rgba(94,234,212,0.1)"
                      stroke="#5eead4"
                      strokeWidth="0.6"
                      animate={{ r: [20, 25, 20] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </svg>
                  <div className="relative text-center">
                    <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-cyan">
                      MOBILITY
                    </div>
                    <div className="font-display text-lg font-bold text-mint-400">
                      RADIAL
                    </div>
                  </div>
                </div>

                <div className="relative h-32 overflow-hidden rounded-xl border border-white/5 bg-clinical-950/50 p-3">
                  <div className="mb-1 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em]">
                    <span className="text-cyan">RECOVERY PATHWAY</span>
                    <span className="text-mint-400">FOLLOW</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {["CARE", "MOVEMENT", "FUNCTION"].map((s, i) => (
                      <div key={s} className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            borderColor: phase === i + 1 ? "#5eead4" : "rgba(94,234,212,0.3)",
                          }}
                          className="rounded border border-mint-400/30 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-clinical"
                        >
                          {s}
                        </motion.div>
                        {i < 2 && (
                          <svg
                            viewBox="0 0 10 10"
                            className="h-3 w-3 text-mint-400"
                          >
                            <path
                              d="M2 5 L8 5 M6 3 L8 5 L6 7"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 h-1 rounded-full bg-white/5">
                    <motion.div
                      animate={{ width: ["20%", "60%", "40%", "80%", "50%"] }}
                      transition={{ duration: 8, repeat: Infinity }}
                      className="h-full rounded-full bg-gradient-to-r from-mint-400 to-cyan-glow"
                    />
                  </div>
                  <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-dim">
                    CONCEPTUAL PROGRESSION
                  </div>
                </div>
              </div>

              {/* Live waveform */}
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  <span>MOTION SIGNAL</span>
                  <span className="text-mint-400">▸ STREAM</span>
                </div>
                <MedicalWaveform height={42} variant="motion" speed={1.4} />
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
