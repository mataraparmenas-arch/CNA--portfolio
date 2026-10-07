import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data/profile";
import GlassPanel from "./medical/GlassPanel";

const stages = [
  { code: "01", label: "CNA", detail: "Bedside care" },
  { code: "02", label: "PATIENT CARE", detail: "Human understanding" },
  { code: "03", label: "MOVEMENT", detail: "Function restored" },
  { code: "04", label: "PHYSIOTHERAPY", detail: "Recovery supported" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-glow/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400"
        >
          <span>02</span>
          <div className="h-px w-12 bg-mint-400/50" />
          <span>ABOUT</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Headline */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-clinical sm:text-5xl lg:text-6xl"
            >
              CARE BEGINS
              <br />
              <span className="bg-gradient-to-r from-mint-400 to-cyan-glow bg-clip-text text-transparent">
                WITH THE PERSON.
              </span>
            </motion.h2>

            <div className="mt-10 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {profile.biography.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Care pillars */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "ATTENTIVE", code: "A1" },
                { label: "DIGNIFIED", code: "A2" },
                { label: "PRESENT", code: "A3" },
                { label: "CONSIDERED", code: "A4" },
              ].map((p, i) => (
                <motion.div
                  key={p.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <GlassPanel variant="soft" className="p-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan">
                      {p.code}
                    </div>
                    <div className="mt-1 font-display text-sm font-semibold text-clinical">
                      {p.label}
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Journey pathway */}
          <div className="lg:col-span-5">
            <GlassPanel className="p-6" cornerBrackets>
              <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-cyan">CARE PATHWAY</span>
                <span className="text-mint-400">CONNECTED</span>
              </div>

              <h3 className="mb-8 font-display text-xl font-semibold text-clinical">
                The connection between care and movement.
              </h3>

              <div className="relative">
                {/* Vertical scanning line */}
                <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-white/10">
                  <motion.div
                    style={{ height: lineHeight }}
                    className="w-full bg-gradient-to-b from-mint-400 via-cyan-glow to-mint-400/0"
                  />
                </div>

                <div className="space-y-6">
                  {stages.map((s, i) => (
                    <motion.div
                      key={s.code}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0.15 * i, duration: 0.5 }}
                      className="relative flex items-start gap-4 pl-2"
                    >
                      <div className="relative z-10 mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-mint-400/40 bg-clinical-950">
                        <span className="font-mono text-[10px] text-mint-400">
                          {s.code}
                        </span>
                        <span className="absolute inset-0 rounded-full border border-mint-400/20" />
                      </div>
                      <div className="flex-1">
                        <div className="font-display text-base font-semibold text-clinical">
                          {s.label}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                          {s.detail}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassPanel>

            {/* Stat readout */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { v: "01", l: "FOCUS" },
                { v: "∞", l: "CARE" },
                { v: "01", l: "MISSION" },
              ].map((s) => (
                <GlassPanel key={s.l} variant="soft" className="p-4 text-center">
                  <div className="font-display text-2xl font-bold text-mint-400">
                    {s.v}
                  </div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-dim">
                    {s.l}
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
