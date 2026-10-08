import { useRef } from "react";
import { profile } from "@/data/profile";
import { useRevealObserver } from "@/hooks/useMotion";
import { Button } from "./ui/Button";
import { DownloadIcon, EyeIcon, FileIcon } from "./ui/Icons";

/**
 * CV is a stable, replaceable asset:  public/cv/glorious-moraa-cv.pdf
 * Replace the file (same name) and the site serves the new document — no rebuild.
 */
export function CVSection() {
  const root = useRef<HTMLElement>(null);
  useRevealObserver(root);

  return (
    <section id="cv" ref={root} className="relative scroll-mt-24 py-20 sm:py-28" aria-labelledby="cv-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="glass relative overflow-hidden rounded-[28px] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          {/* quiet contour decoration */}
          <svg
            className="pointer-events-none absolute -right-20 -top-24 h-[420px] w-[420px] text-navy-900"
            viewBox="0 0 400 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            aria-hidden
          >
            <circle cx="200" cy="200" r="190" opacity="0.06" />
            <circle cx="200" cy="200" r="150" opacity="0.06" />
            <circle cx="200" cy="200" r="110" opacity="0.06" />
            <path d="M20 260c60-40 100 20 180-10s120-60 190-20" opacity="0.12" className="text-mint-600" />
          </svg>

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="reveal mb-4 flex items-center gap-3 font-heading text-[12px] font-semibold uppercase tracking-[0.22em] text-mint-600">
                <span className="h-px w-6 bg-mint-500/70" aria-hidden />
                Curriculum Vitae
              </p>
              <h2
                id="cv-title"
                className="reveal font-heading text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] text-navy-900"
                style={{ ["--reveal-delay" as string]: "80ms" }}
              >
                Professional CV
              </h2>
              <p className="reveal mt-4 max-w-[48ch] text-[16px] leading-relaxed text-mist-600" style={{ ["--reveal-delay" as string]: "160ms" }}>
                Qualifications, experience and professional development in one document. Download starts immediately —
                no sign-up, no forms.
              </p>

              <div className="reveal mt-8 flex flex-wrap gap-3" style={{ ["--reveal-delay" as string]: "240ms" }}>
                <Button href={profile.cvPath} download={profile.cvFileName} className="min-h-[52px] px-7">
                  Download CV
                  <DownloadIcon className="transition-transform duration-500 group-hover:translate-y-0.5" />
                </Button>
                <Button href={profile.cvPath} target="_blank" rel="noopener" variant="glass" className="min-h-[52px]">
                  <EyeIcon />
                  Preview CV
                </Button>
              </div>

              <p className="reveal mt-5 text-[13px] text-mist-500" style={{ ["--reveal-delay" as string]: "320ms" }}>
                PDF · {profile.cvFileName}
              </p>
            </div>

            {/* Document card */}
            <a
              href={profile.cvPath}
              download={profile.cvFileName}
              aria-label="Download CV PDF"
              className="reveal group relative mx-auto block w-full max-w-[300px] rotate-[-1.5deg] rounded-2xl border border-white bg-white p-6 shadow-[0_30px_60px_-30px_rgba(11,27,43,0.35)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:rotate-0 hover:-translate-y-1 hover:shadow-[0_40px_70px_-30px_rgba(11,27,43,0.4)]"
              style={{ ["--reveal-delay" as string]: "200ms" }}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 text-mist-50">
                  <FileIcon width={18} height={18} />
                </span>
                <span className="rounded-full bg-mist-100 px-2.5 py-1 text-[11px] font-semibold text-mist-600">PDF</span>
              </div>
              <div className="mt-6 space-y-2.5" aria-hidden>
                <div className="h-3 w-3/4 rounded bg-navy-900/85" />
                <div className="h-2 w-1/2 rounded bg-mist-300" />
                <div className="mt-5 h-2 w-full rounded bg-mist-200" />
                <div className="h-2 w-11/12 rounded bg-mist-200" />
                <div className="h-2 w-4/5 rounded bg-mist-200" />
                <div className="mt-5 h-2 w-2/5 rounded bg-mint-500/60" />
                <div className="h-2 w-full rounded bg-mist-200" />
                <div className="h-2 w-10/12 rounded bg-mist-200" />
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-mist-200 pt-4">
                <span className="font-heading text-[13px] font-semibold text-navy-900">{profile.name}</span>
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-mint-600">
                  Download <DownloadIcon width={14} height={14} className="transition-transform duration-500 group-hover:translate-y-0.5" />
                </span>
              </div>
            </a>
          </div>

          {/* Owner note — how to replace the CV */}
          <p className="relative mt-10 border-t border-navy-900/8 pt-5 text-[12.5px] leading-relaxed text-mist-500">
            <span className="font-semibold text-navy-700">Updating the CV:</span> replace{" "}
            <code className="rounded bg-navy-900/5 px-1.5 py-0.5 text-navy-800">public/cv/glorious-moraa-cv.pdf</code> with the
            new version using the same filename. No code change or redeploy of the design is needed.
          </p>
        </div>
      </div>
    </section>
  );
}
