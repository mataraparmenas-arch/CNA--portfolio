import { motion } from "framer-motion";
import GlassPanel from "./medical/GlassPanel";
import MedicalWaveform from "./medical/MedicalWaveform";
import { profile } from "../data/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-400/[0.06] blur-[140px]" />
        <div className="grid-bg-sm absolute inset-0 opacity-10" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400"
        >
          <span>09</span>
          <div className="h-px w-12 bg-mint-400/50" />
          <span>CONNECT</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-balance text-5xl font-bold leading-[1.05] tracking-tight text-clinical sm:text-6xl lg:text-7xl">
            LET'S
            <br />
            <span className="bg-gradient-to-r from-mint-400 via-cyan-glow to-mint-400 bg-clip-text text-transparent">
              CONNECT.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            Whether it's a conversation about care, movement, or professional
            collaboration — a message is always welcome.
          </p>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Phone */}
          <a href={profile.phoneHref} className="group block">
            <GlassPanel className="relative overflow-hidden p-6 transition-all group-hover:border-mint-400/30" cornerBrackets>
              <span className="pointer-events-none absolute inset-y-0 -left-[120%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-mint-400/10 to-transparent transition-all duration-700 group-hover:left-[120%]" />
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                PHONE
              </div>
              <div className="font-display text-2xl font-semibold text-clinical sm:text-3xl">
                {profile.phone}
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-mint-400/30 bg-mint-400/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                CALL GLORIOUS
              </div>
            </GlassPanel>
          </a>

          {/* Email */}
          <a href={profile.emailHref} className="group block">
            <GlassPanel className="relative overflow-hidden p-6 transition-all group-hover:border-mint-400/30" cornerBrackets>
              <span className="pointer-events-none absolute inset-y-0 -left-[120%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-mint-400/10 to-transparent transition-all duration-700 group-hover:left-[120%]" />
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                EMAIL
              </div>
              <div className="break-all font-display text-xl font-semibold text-clinical sm:text-2xl">
                {profile.email}
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-glow" />
                SEND EMAIL
              </div>
            </GlassPanel>
          </a>
        </motion.div>

        {/* Final signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16"
        >
          <GlassPanel className="p-6 sm:p-8" cornerBrackets>
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-cyan">SIGNAL • CARE • MOVEMENT</span>
              <span className="flex items-center gap-1.5 text-mint-400">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                ACTIVE
              </span>
            </div>
            <MedicalWaveform height={50} variant="respiratory" color="#67e8f9" />
            <div className="mt-4 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                {profile.name.toUpperCase()} — {profile.title.toUpperCase()}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint-400">
                {profile.tagline}
              </p>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
