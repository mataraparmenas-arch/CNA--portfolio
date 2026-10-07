import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-clinical-950/50 py-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="font-display text-lg font-semibold text-clinical">
              {profile.name}
            </div>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-mint-400">
              {profile.title}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 font-mono text-[10px] uppercase tracking-[0.25em] text-dim sm:items-end">
            <span>{profile.tagline}</span>
            <span>© {new Date().getFullYear()} — DIGITAL HEALTHCARE PORTFOLIO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
