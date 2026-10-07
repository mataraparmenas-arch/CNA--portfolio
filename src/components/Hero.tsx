import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import MedicalWaveform from "./medical/MedicalWaveform";
import FloatingDashboard from "./medical/FloatingDashboard";
import GlassPanel from "./medical/GlassPanel";

const AnatomyModel = lazy(() => import("./medical/AnatomyModel"));

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActivated(true), 150);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Layered backgrounds */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg-sm opacity-30" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 volumetric-light" />
        <div className="absolute inset-0 cinematic-vignette" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-400/[0.04] blur-[120px]" />
      </div>

      {/* Top status bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 pt-24 font-mono text-[10px] uppercase tracking-[0.25em] text-dim sm:px-10"
      >
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-mint-400 pulse-dot" />
          <span>SYSTEM ONLINE</span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <span>ENV: DIGITAL HEALTHCARE</span>
          <span>PROFILE: VERIFIED</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-mint-400">▸ ENTER</span>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-100px)] max-w-7xl grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-12 lg:gap-6">
        {/* Left text */}
        <div className="relative z-30 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint-400/30 bg-mint-400/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-mint-400"
          >
            <span className="h-1 w-1 rounded-full bg-mint-400" />
            CARING • MOVING • RECOVERING
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-clinical"
            >
              GLORIOUS
              <br />
              <span className="bg-gradient-to-br from-clinical via-mint-400 to-cyan-glow bg-clip-text text-transparent">
                MORAA
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <div className="h-px w-12 bg-mint-400" />
            <div>
              <p className="font-display text-lg font-medium text-clinical sm:text-xl">
                {profile.title}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
                {profile.tagline}
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-8 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
          >
            A digital healthcare environment — where compassionate patient care
            meets the science of human movement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#movement"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-mint-400/40 bg-mint-400/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mint-400 transition-all hover:bg-mint-400/20"
            >
              <span className="relative z-10">EXPLORE MOVEMENT LAB</span>
              <svg
                viewBox="0 0 24 24"
                className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-mint-400/0 via-mint-400/20 to-mint-400/0 transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-clinical"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan pulse-dot" />
              CONNECT
            </a>
          </motion.div>

          {/* Waveform panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-12 max-w-md"
          >
            <GlassPanel className="p-4" cornerBrackets>
              <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-cyan">LIFE • MOVEMENT • CARE</span>
                <span className="flex items-center gap-1.5 text-mint-400">
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                  ACTIVE
                </span>
              </div>
              <MedicalWaveform height={56} variant="ecg" />
              <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-dim">
                <span>VISUAL INTERFACE</span>
                <span>CONTINUOUS</span>
              </div>
            </GlassPanel>
          </motion.div>
        </div>

        {/* Right: 3D scene + portrait */}
        <div className="relative h-[480px] lg:col-span-5 lg:h-[640px]">
          {/* 3D anatomy */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activated ? 1 : 0 }}
          >
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <div className="h-32 w-32 animate-pulse rounded-full border border-mint-400/30" />
                </div>
              }
            >
              <AnatomyModel scrollY={scrollY} className="h-full w-full" />
            </Suspense>
          </div>

          {/* Floating portrait in glass panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="absolute right-2 top-16 z-10 w-32 sm:right-4 sm:top-20 sm:w-40"
          >
            <div className="glass-strong relative overflow-hidden rounded-2xl p-1.5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <img
                  src={profile.portrait}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-clinical-950/60 to-transparent" />
                <div className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-mint-400/80" />
                <div className="absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-mint-400/80" />
                <div className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-mint-400/80" />
                <div className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-mint-400/80" />
              </div>
            </div>
          </motion.div>

          {/* Floating dashboard overlay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute -left-2 top-4 w-60 sm:left-0 lg:w-64"
          >
            <FloatingDashboard />
          </motion.div>

          {/* System indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center gap-3"
          >
            {["MOBILITY", "MOVEMENT", "RECOVERY"].map((label) => (
              <div
                key={label}
                className="glass-soft rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan"
              >
                <span className="mr-1.5 inline-block h-1 w-1 rounded-full bg-mint-400 pulse-dot" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
          <span>SCROLL TO EXPLORE</span>
          <div className="h-8 w-px bg-gradient-to-b from-mint-400 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
