import { useRef, type ComponentType, type SVGProps } from "react";
import { profile } from "@/data/profile";
import { useRevealObserver } from "@/hooks/useMotion";
import { GlassCard } from "./ui/GlassCard";
import { SectionHeading } from "./ui/SectionHeading";
import { CareGlyph, MobilityGlyph, PhysioGlyph, RehabGlyph } from "./ui/Icons";

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  care: CareGlyph,
  mobility: MobilityGlyph,
  rehab: RehabGlyph,
  physio: PhysioGlyph,
};

export function Expertise() {
  const root = useRef<HTMLElement>(null);
  useRevealObserver(root);

  return (
    <section id="expertise" ref={root} className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="expertise-title">
      {/* Soft band to separate the section without a hard edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_bottom,transparent,rgba(225,231,236,0.45)_20%,rgba(225,231,236,0.45)_80%,transparent)]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Expertise"
            title={<span id="expertise-title">Areas of Professional Focus</span>}
            lead="Four areas supported by Glorious's background. Each one is grounded in the same principle: care for the person, then help them move."
          />
          <p className="reveal max-w-xs text-[13px] leading-relaxed text-mist-500 lg:text-right">
            Specific physiotherapy specialties will be listed here as they are confirmed from the CV.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {profile.expertise.map((e, i) => {
            const Glyph = GLYPHS[e.key];
            return (
              <GlassCard
                key={e.key}
                as="li"
                className="reveal group relative flex min-h-[280px] flex-col justify-between p-6 lg:p-7"
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-navy-900/8 bg-white/70 text-navy-700 transition-colors duration-500 group-hover:text-mint-600">
                    {Glyph && <Glyph />}
                  </span>
                  <span className="font-heading text-[12px] font-semibold text-mist-400">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-heading text-[20px] font-bold text-navy-900">{e.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-mist-600">{e.text}</p>
                </div>
                {/* Fine baseline that lights on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-mint-500/70 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
              </GlassCard>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
