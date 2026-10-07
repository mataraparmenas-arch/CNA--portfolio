import { motion } from "framer-motion";
import GlassPanel from "./medical/GlassPanel";
import MedicalWaveform from "./medical/MedicalWaveform";
import { useEffect, useState } from "react";

const careAttributes = [
  { label: "ATTENTIVE", status: "ON" },
  { label: "DIGNIFIED", status: "ON" },
  { label: "PRESENT", status: "ON" },
  { label: "OBSERVANT", status: "ON" },
];

export default function Care() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      id="care"
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-mint-400/[0.04] blur-[120px]" />
        <div className="grid-bg-sm absolute inset-0 opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400"
        >
          <span>03</span>
          <div className="h-px w-12 bg-mint-400/50" />
          <span>CNA / PATIENT CARE</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Headline */}
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-clinical sm:text-5xl lg:text-6xl"
            >
              PATIENT
              <br />
              <span className="bg-gradient-to-r from-mint-400 to-cyan-glow bg-clip-text text-transparent">
                CARE.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-8 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
            >
              A CNA background is the foundation: compassionate patient support,
              dignity in every interaction, attentiveness to the small details,
              and a deep understanding of the people receiving care.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-4 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
            >
              It is in this environment — patient, observant, present — that
              the perspective of physiotherapy begins to take shape.
            </motion.p>

            {/* Attribute grid */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {careAttributes.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <GlassPanel variant="soft" className="flex items-center justify-between p-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-clinical">
                      {a.label}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-mint-400">
                      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                      {a.status}
                    </span>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Clinical care interface */}
          <div className="relative lg:col-span-6">
            <GlassPanel className="relative overflow-hidden p-6" cornerBrackets>
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-cyan">BEDSIDE INTERFACE</span>
                <span className="flex items-center gap-1.5 text-mint-400">
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                  MONITORING
                </span>
              </div>

              <h3 className="mb-6 font-display text-lg font-semibold text-clinical">
                Presence • Observation • Care
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    <span>VITAL AWARENESS</span>
                    <span className="text-mint-400">ACTIVE</span>
                  </div>
                  <MedicalWaveform height={50} variant="ecg" />
                </div>

                <div>
                  <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    <span>RHYTHM OF CARE</span>
                    <span className="text-mint-400">STABLE</span>
                  </div>
                  <MedicalWaveform height={50} variant="respiratory" color="#67e8f9" />
                </div>
              </div>

              {/* Care check-in panel */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/5 pt-5">
                {[
                  { l: "COMFORT", v: "PRIORITY" },
                  { l: "DIGNITY", v: "PRIORITY" },
                  { l: "PRESENCE", v: "CONTINUOUS" },
                ].map((c) => (
                  <div key={c.l}>
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan">
                      {c.l}
                    </div>
                    <div className="mt-1 font-display text-sm font-semibold text-clinical">
                      {c.v}
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            {/* Floating status */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 hidden sm:block"
            >
              <GlassPanel variant="strong" className="px-4 py-3">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow pulse-dot" />
                  <span className="text-clinical">CARE SEQUENCE</span>
                  <span className="text-mint-400">+{tick.toString().padStart(2, "0")}</span>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
