import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import GlassPanel from "./medical/GlassPanel";
import { profile } from "../data/profile";

const labels = ["CARE", "MOVEMENT", "REHABILITATION", "PHYSIOTHERAPY"];

export default function ProfileScanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-mint-400/[0.05] blur-[120px]" />
        <div className="grid-bg absolute inset-0 opacity-10" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-12">
        {/* Portrait */}
        <motion.div
          style={{ y }}
          className="relative lg:col-span-5"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl">
            <GlassPanel className="h-full w-full" variant="strong" cornerBrackets>
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src={profile.portrait}
                  alt={`${profile.name} - ${profile.title}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Color overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-clinical-950 via-clinical-950/30 to-transparent" />
                <div className="absolute inset-0 bg-mint-400/5 mix-blend-overlay" />

                {/* Grid overlay */}
                <div className="pointer-events-none absolute inset-0 grid-bg-sm opacity-30" />

                {/* Scanning line on hover */}
                {hovered && (
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-x-0 z-20 h-1/3 bg-gradient-to-b from-transparent via-mint-400/40 to-transparent"
                  />
                )}

                {/* Corner markers */}
                {[
                  "top-3 left-3 border-t border-l",
                  "top-3 right-3 border-t border-r",
                  "bottom-3 left-3 border-b border-l",
                  "bottom-3 right-3 border-b border-r",
                ].map((c, i) => (
                  <div
                    key={i}
                    className={`absolute h-5 w-5 border-mint-400/70 ${c}`}
                  />
                ))}

                {/* Profile label */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="glass-strong rounded-xl p-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan">
                      PROFILE
                    </div>
                    <div className="mt-1 font-display text-base font-semibold text-clinical">
                      {profile.name}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400">
                      CNA · PHYSIOTHERAPY
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan">
                      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                      STATUS: PROFESSIONAL
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </motion.div>

        {/* Activation labels */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400"
          >
            PROFESSIONAL IDENTITY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-clinical sm:text-5xl lg:text-6xl"
          >
            Where care
            <br />
            <span className="bg-gradient-to-r from-mint-400 to-cyan-glow bg-clip-text text-transparent">
              meets motion.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            A practitioner whose work sits at the intersection of compassionate
            patient support and the science of human movement.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {labels.map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group"
              >
                <GlassPanel
                  variant="soft"
                  className="flex items-center justify-between p-4 transition-all group-hover:border-mint-400/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-mint-400/30">
                      <span className="font-mono text-[10px] text-mint-400">
                        0{i + 1}
                      </span>
                    </div>
                    <span className="font-display text-sm font-semibold tracking-wide text-clinical">
                      {l}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400">
                    ACTIVE
                  </span>
                </GlassPanel>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-dim"
          >
            <span className="h-px w-12 bg-mint-400/50" />
            HOVER PORTRAIT TO ACTIVATE SCAN
          </motion.div>
        </div>
      </div>
    </section>
  );
}
