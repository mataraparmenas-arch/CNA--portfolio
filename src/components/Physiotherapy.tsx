import { motion } from "framer-motion";
import GlassPanel from "./medical/GlassPanel";
import MedicalWaveform from "./medical/MedicalWaveform";

const joints = [
  { name: "SHOULDER", x: 30, y: 25, status: "FOCUS" },
  { name: "ELBOW", x: 22, y: 45, status: "TRACK" },
  { name: "HIP", x: 50, y: 60, status: "MOBILITY" },
  { name: "KNEE", x: 50, y: 80, status: "RANGE" },
  { name: "ANKLE", x: 50, y: 95, status: "FUNCTION" },
];

export default function Physiotherapy() {
  return (
    <section
      id="physio"
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-mint-400/[0.05] blur-[120px]" />
        <div className="grid-bg absolute inset-0 opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400"
        >
          <span>04</span>
          <div className="h-px w-12 bg-mint-400/50" />
          <span>PHYSIOTHERAPY</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Headline */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-clinical sm:text-5xl lg:text-6xl"
            >
              MOVEMENT
              <br />
              <span className="bg-gradient-to-r from-mint-400 via-cyan-glow to-mint-400 bg-clip-text text-transparent">
                CHANGES
              </span>
              <br />
              EVERYTHING.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-8 max-w-md text-balance text-base leading-relaxed text-muted sm:text-lg"
            >
              Physiotherapy brings a movement-focused perspective to
              healthcare — supporting physical function, mobility,
              rehabilitation, and wellbeing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-8 space-y-3"
            >
              {[
                "Movement-focused perspective",
                "Mobility & range support",
                "Rehabilitation principles",
                "Function & wellbeing",
              ].map((t, i) => (
                <div
                  key={t}
                  className="flex items-center gap-3 border-b border-white/5 pb-3 font-mono text-xs uppercase tracking-[0.2em] text-clinical"
                >
                  <span className="font-mono text-[10px] text-cyan">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Joint visualization */}
          <div className="lg:col-span-7">
            <GlassPanel className="relative overflow-hidden p-6" cornerBrackets>
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-cyan">MOVEMENT MAP</span>
                <span className="flex items-center gap-1.5 text-mint-400">
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                  ANALYSIS
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                {/* Figure visualization */}
                <div className="relative col-span-2 h-80 overflow-hidden rounded-xl border border-white/5 bg-clinical-950/50">
                  <div className="grid-bg-sm absolute inset-0 opacity-30" />
                  {/* Abstract body */}
                  <svg
                    viewBox="0 0 100 200"
                    className="absolute inset-0 h-full w-full"
                  >
                    {/* Head */}
                    <motion.circle
                      cx="50"
                      cy="20"
                      r="9"
                      fill="none"
                      stroke="#5eead4"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                    />
                    {/* Spine */}
                    <motion.line
                      x1="50"
                      y1="29"
                      x2="50"
                      y2="105"
                      stroke="#67e8f9"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                    {/* Arms */}
                    <motion.path
                      d="M50 40 L30 75 L25 110"
                      fill="none"
                      stroke="#5eead4"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.4 }}
                    />
                    <motion.path
                      d="M50 40 L70 75 L75 110"
                      fill="none"
                      stroke="#5eead4"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.4 }}
                    />
                    {/* Legs */}
                    <motion.path
                      d="M50 105 L42 160 L40 195"
                      fill="none"
                      stroke="#67e8f9"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                    />
                    <motion.path
                      d="M50 105 L58 160 L60 195"
                      fill="none"
                      stroke="#67e8f9"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                    />

                    {/* Joint markers */}
                    {joints.map((j, i) => (
                      <motion.g
                        key={j.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                      >
                        <circle
                          cx={j.x}
                          cy={j.y}
                          r="3"
                          fill="#031319"
                          stroke="#5eead4"
                          strokeWidth="1"
                        />
                        <circle
                          cx={j.x}
                          cy={j.y}
                          r="5"
                          fill="none"
                          stroke="#5eead4"
                          strokeWidth="0.5"
                          opacity="0.5"
                        >
                          <animate
                            attributeName="r"
                            values="3;8;3"
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.4}s`}
                          />
                          <animate
                            attributeName="opacity"
                            values="0.6;0;0.6"
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.4}s`}
                          />
                        </circle>
                      </motion.g>
                    ))}
                  </svg>
                  <div className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-[0.2em] text-cyan">
                    BODY MAP
                  </div>
                </div>

                {/* Joint data */}
                <div className="col-span-3 space-y-3">
                  <h3 className="font-display text-base font-semibold text-clinical">
                    Joint & movement focus
                  </h3>
                  {joints.map((j, i) => (
                    <motion.div
                      key={j.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                    >
                      <GlassPanel variant="soft" className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
                            {j.name}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400">
                            {j.status}
                          </span>
                        </div>
                        <div className="mt-2 h-px bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${60 + i * 8}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2 * i }}
                            className="h-full bg-gradient-to-r from-mint-400 to-cyan-glow"
                          />
                        </div>
                      </GlassPanel>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Motion waveform */}
              <div className="mt-6">
                <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  <span>MOVEMENT FLOW</span>
                  <span className="text-mint-400">CONTINUOUS</span>
                </div>
                <MedicalWaveform height={48} variant="motion" />
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
