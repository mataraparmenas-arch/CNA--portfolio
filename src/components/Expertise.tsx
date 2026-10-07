import { motion } from "framer-motion";
import GlassPanel from "./medical/GlassPanel";
import { expertise } from "../data/profile";

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-glow/[0.04] blur-[120px]" />
        <div className="grid-bg absolute inset-0 opacity-10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400"
        >
          <span>06</span>
          <div className="h-px w-12 bg-mint-400/50" />
          <span>EXPERTISE MODULES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-3xl font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-clinical sm:text-5xl"
        >
          Areas of
          <span className="bg-gradient-to-r from-mint-400 to-cyan-glow bg-clip-text text-transparent">
            {" "}
            professional focus.
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((m, i) => (
            <motion.div
              key={m.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <ExpertiseModule
                code={m.code}
                title={m.title}
                summary={m.summary}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseModule({
  code,
  title,
  summary,
  index,
}: {
  code: string;
  title: string;
  summary: string;
  index: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <GlassPanel className="relative h-full overflow-hidden p-6" cornerBrackets>
        {/* Hover light sweep */}
        <span className="pointer-events-none absolute inset-y-0 -left-[120%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-mint-400/10 to-transparent transition-all duration-700 group-hover:left-[120%]" />

        <div className="mb-6 flex items-start justify-between">
          <div className="font-mono text-xs tracking-[0.25em] text-cyan">
            {code}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-mint-400">
            <span className="h-1 w-1 rounded-full bg-mint-400 pulse-dot" />
            MODULE
          </div>
        </div>

        <h3 className="font-display text-2xl font-semibold leading-tight text-clinical">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted">{summary}</p>

        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-dim">
            STATUS
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-mint-400">
            {["ACTIVE", "READY", "ONLINE", "TRACKING", "FOCUSED"][index % 5]}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
