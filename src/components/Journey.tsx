import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GlassPanel from "./medical/GlassPanel";
import { journey } from "../data/profile";

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={ref}
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-mint-400/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400"
        >
          <span>07</span>
          <div className="h-px w-12 bg-mint-400/50" />
          <span>PROFESSIONAL JOURNEY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-clinical sm:text-5xl"
        >
          A clinical record of
          <span className="bg-gradient-to-r from-mint-400 to-cyan-glow bg-clip-text text-transparent">
            {" "}
            growth.
          </span>
        </motion.h2>

        <div className="relative">
          {/* Vertical scanning line */}
          <div className="absolute left-6 top-0 h-full w-px bg-white/10 sm:left-8">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-mint-400 via-cyan-glow to-mint-400/0"
            />
          </div>

          <div className="space-y-8">
            {journey.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="relative flex items-start gap-6 pl-2 sm:gap-10"
              >
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-mint-400/40 bg-clinical-950 sm:h-16 sm:w-16">
                  <span className="font-mono text-xs text-mint-400 sm:text-sm">
                    {s.step}
                  </span>
                  <motion.span
                    className="absolute inset-0 rounded-full border border-mint-400/30"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  />
                </div>

                <GlassPanel className="flex-1 p-5 sm:p-6" cornerBrackets>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex-1">
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
                        STAGE {s.step}
                      </div>
                      <h3 className="mt-1 font-display text-xl font-semibold text-clinical sm:text-2xl">
                        {s.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                        {s.detail}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-start font-mono text-[9px] uppercase tracking-[0.25em] text-mint-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint-400 pulse-dot" />
                      {i === journey.length - 1 ? "CURRENT" : "ARCHIVED"}
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
