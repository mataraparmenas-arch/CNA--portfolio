import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, navigation } from "../data/profile";
import { cn } from "../utils/cn";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = navigation.map((n) => document.getElementById(n.id));
      const offset = window.innerHeight * 0.4;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.getBoundingClientRect().top < offset) {
          setActive(navigation[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500",
          "w-[min(94%,1100px)]",
        )}
      >
        <div
          className={cn(
            "glass rounded-full px-2 py-2 transition-all duration-500",
            scrolled && "shadow-2xl shadow-black/40",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a
              href="#home"
              className="group flex items-center gap-3 px-4 py-1.5"
            >
              <div className="relative h-7 w-7">
                <svg viewBox="0 0 32 32" className="h-full w-full">
                  <defs>
                    <linearGradient id="logo-g" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stopColor="#5eead4" />
                      <stop offset="1" stopColor="#67e8f9" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="none"
                    stroke="rgba(94,234,212,0.3)"
                    strokeWidth="1"
                  />
                  <path
                    d="M6 18 L11 18 L13 11 L17 24 L20 15 L26 15"
                    fill="none"
                    stroke="url(#logo-g)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="hidden flex-col leading-tight sm:flex">
                <span className="font-display text-sm font-semibold tracking-wide text-clinical">
                  {profile.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-mint-400">
                  DIGITAL HEALTHCARE
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "group relative rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all",
                    active === item.id
                      ? "text-clinical"
                      : "text-muted hover:text-clinical",
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.06]"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  {active === item.id && (
                    <span className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-mint-400" />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              ))}
            </nav>

            {/* Status indicator + mobile toggle */}
            <div className="flex items-center gap-3 px-2">
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400 md:flex">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-400" />
                ONLINE
              </div>
              <button
                onClick={() => setOpen(!open)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5">
                  <span
                    className={cn(
                      "h-px w-4 bg-clinical transition-all",
                      open && "translate-y-[3px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "h-px w-4 bg-clinical transition-all",
                      open && "-translate-y-[3px] -rotate-45",
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed left-1/2 top-20 z-50 w-[min(94%,1100px)] -translate-x-1/2 lg:hidden"
          >
            <div className="glass-strong rounded-2xl p-3">
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] transition-all",
                      active === item.id
                        ? "bg-mint-400/10 text-mint-400"
                        : "text-muted hover:bg-white/5 hover:text-clinical",
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
