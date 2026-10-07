import { motion } from "framer-motion";
import { useState } from "react";
import GlassPanel from "./medical/GlassPanel";
import { profile } from "../data/profile";

export default function CVVault() {
  const [scanning, setScanning] = useState(false);

  const handleDownload = () => {
    setScanning(true);
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = profile.cvPath;
      a.download = "Glorious-Moraa-CV.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 800);
    setTimeout(() => setScanning(false), 2400);
  };

  return (
    <section
      id="cv"
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-400/[0.04] blur-[140px]" />
        <div className="grid-bg absolute inset-0 opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400"
        >
          <span>08</span>
          <div className="h-px w-12 bg-mint-400/50" />
          <span>DIGITAL PROFESSIONAL RECORD</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Info side */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-clinical sm:text-5xl"
            >
              CV
              <span className="bg-gradient-to-r from-mint-400 to-cyan-glow bg-clip-text text-transparent">
                {" "}
                VAULT.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            >
              A digital professional record — clean, available, and ready for
              download at any time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 space-y-3"
            >
              {[
                { l: "FORMAT", v: "PDF" },
                { l: "STATUS", v: "AVAILABLE" },
                { l: "UPDATED", v: "ONGOING" },
                { l: "SIZE", v: "COMPACT" },
              ].map((row) => (
                <div
                  key={row.l}
                  className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-xs uppercase tracking-[0.2em]"
                >
                  <span className="text-cyan">{row.l}</span>
                  <span className="text-mint-400">{row.v}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Document panel */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <GlassPanel className="relative overflow-hidden p-6 sm:p-8" cornerBrackets>
                {/* Scanning line */}
                {scanning && (
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-x-0 z-20 h-1/3 bg-gradient-to-b from-transparent via-mint-400/30 to-transparent"
                  />
                )}

                <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-cyan">DOCUMENT PREVIEW</span>
                  <span className="flex items-center gap-1.5 text-mint-400">
                    <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                    SECURE
                  </span>
                </div>

                {/* Document visualization */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                  <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-mint-400 via-cyan-glow to-mint-400" />

                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-mint-400/30 bg-mint-400/5">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-7 w-7 text-mint-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M9 13h6" />
                        <path d="M9 17h6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
                        PROFESSIONAL RECORD
                      </div>
                      <h3 className="mt-1 font-display text-2xl font-bold text-clinical">
                        {profile.name}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mint-400">
                        {profile.title}
                      </p>
                    </div>
                  </div>

                  {/* Content blocks */}
                  <div className="mt-6 space-y-3">
                    <div>
                      <div className="h-px w-full bg-white/10" />
                      <div className="mt-3 h-2 w-3/4 rounded bg-white/10" />
                      <div className="mt-2 h-2 w-1/2 rounded bg-white/5" />
                    </div>
                    <div>
                      <div className="h-px w-full bg-white/10" />
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="h-2 rounded bg-white/10" />
                        <div className="h-2 rounded bg-white/5" />
                        <div className="h-2 rounded bg-white/5" />
                        <div className="h-2 rounded bg-white/10" />
                      </div>
                    </div>
                    <div>
                      <div className="h-px w-full bg-white/10" />
                      <div className="mt-3 h-2 w-2/3 rounded bg-white/10" />
                    </div>
                  </div>

                  {/* Footer signature */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-dim">
                      GLORIOUS-MORAA-CV.PDF
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-mint-400">
                      VERIFIED
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={profile.cvPath}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full border border-mint-400/40 bg-mint-400/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mint-400 transition-all hover:bg-mint-400/20"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    VIEW CV
                  </a>
                  <button
                    onClick={handleDownload}
                    disabled={scanning}
                    className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-mint-400 to-cyan-glow px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-clinical-950 transition-all hover:shadow-lg hover:shadow-mint-400/30 disabled:opacity-60"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {scanning ? "PREPARING..." : "DOWNLOAD PDF"}
                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
                  </button>
                </div>

                <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-dim">
                  REPLACE {profile.cvPath} TO UPDATE
                </p>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
