import { useRef } from "react";
import { profile } from "@/data/profile";
import { useRevealObserver } from "@/hooks/useMotion";

export function About() {
  const root = useRef<HTMLElement>(null);
  useRevealObserver(root);
  const { about } = profile;

  return (
    <section id="about" ref={root} className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Headline column */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="reveal mb-5 flex items-center gap-3 font-heading text-[12px] font-semibold uppercase tracking-[0.22em] text-mint-600">
            <span className="h-px w-6 bg-mint-500/70" aria-hidden />
            About {profile.firstName}
          </p>
          <h2
            id="about-title"
            className="reveal font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.06] text-navy-900"
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            {about.headline[0]}
            <br />
            <span className="text-navy-500">{about.headline[1]}</span>
          </h2>

          {/* A small movement glyph — human figure as a continuous line */}
          <svg
            viewBox="0 0 160 90"
            className="reveal mt-10 hidden w-40 text-navy-900 lg:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            style={{ ["--reveal-delay" as string]: "200ms" }}
          >
            <path d="M6 70 C 40 70, 48 30, 76 30 S 112 66, 154 50" opacity="0.25" />
            <path d="M6 76 C 44 76, 50 36, 78 36 S 116 72, 154 56" className="text-mint-500" />
            <circle cx="78" cy="36" r="2.4" fill="currentColor" className="text-mint-500" stroke="none" />
            <circle cx="6" cy="76" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="154" cy="56" r="1.8" fill="currentColor" stroke="none" />
          </svg>
        </div>

        {/* Narrative column */}
        <div>
          <div className="space-y-6 text-[17px] leading-[1.8] text-navy-700">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                {i === 0 ? (
                  <>
                    <span className="font-heading text-[1.35em] font-bold leading-none text-navy-900">{p.slice(0, 1)}</span>
                    {p.slice(1)}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>

          <ul className="mt-12 divide-y divide-navy-900/8 border-y border-navy-900/8">
            {about.principles.map((pr, i) => (
              <li
                key={pr.title}
                className="reveal grid grid-cols-[2.5rem_1fr] gap-4 py-5 sm:grid-cols-[3rem_11rem_1fr]"
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <span className="font-heading text-[13px] font-semibold text-mint-600">0{i + 1}</span>
                <span className="font-heading text-[16px] font-bold text-navy-900">{pr.title}</span>
                <span className="col-span-2 text-[15px] leading-relaxed text-mist-600 sm:col-span-1">{pr.text}</span>
              </li>
            ))}
          </ul>

          <p className="reveal mt-8 text-[13px] text-mist-500">
            Credentials and details are presented as supplied; nothing here is embellished.
          </p>
        </div>
      </div>
    </section>
  );
}
