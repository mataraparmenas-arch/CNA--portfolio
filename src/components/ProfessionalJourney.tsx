import { useRef } from "react";
import { profile } from "@/data/profile";
import { useRevealObserver } from "@/hooks/useMotion";
import { GlassCard } from "./ui/GlassCard";
import { SectionHeading } from "./ui/SectionHeading";

export function ProfessionalJourney() {
  const root = useRef<HTMLElement>(null);
  useRevealObserver(root);

  return (
    <section id="journey" ref={root} className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="journey-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Timeline"
          title={<span id="journey-title">Professional Journey</span>}
          lead="The milestones that connect nursing assistance to physiotherapy."
        />

        <div className="relative mt-14 lg:mt-20">
          {/* spine */}
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-[linear-gradient(to_bottom,transparent,rgba(11,27,43,0.18)_8%,rgba(11,27,43,0.18)_92%,transparent)] lg:left-1/2"
            aria-hidden
          />

          <ol className="m-0 list-none space-y-10 p-0 lg:space-y-16">
            {profile.journey.map((j, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={i}
                  className={`reveal relative pl-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0 ${left ? "" : ""}`}
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  {/* node */}
                  <span className="absolute left-[9px] top-2 flex h-[13px] w-[13px] items-center justify-center lg:left-1/2 lg:-translate-x-1/2" aria-hidden>
                    <span className="absolute inset-[-7px] rounded-full bg-mist-50" />
                    <span className="relative h-[13px] w-[13px] rounded-full border-[2.5px] border-mint-500 bg-mist-50" />
                  </span>

                  {/* year on opposite side on desktop */}
                  <div className={`hidden lg:flex ${left ? "order-2 justify-start pl-4" : "order-1 justify-end pr-4"}`}>
                    <span className="font-heading text-[40px] font-extrabold leading-none tracking-tight text-mist-300">{j.year}</span>
                  </div>

                  <GlassCard className={`p-6 sm:p-7 ${left ? "order-1" : "order-2"}`}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-heading text-[13px] font-semibold text-mint-600 lg:hidden">{j.year}</span>
                      {j.placeholder && (
                        <span className="rounded-full border border-dashed border-mist-400 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-mist-500">
                          Placeholder — edit in data/profile.ts
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-heading text-[20px] font-bold text-navy-900">{j.role}</h3>
                    <p className="mt-1 text-[14px] font-medium text-navy-500">{j.org}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-mist-600">{j.text}</p>
                  </GlassCard>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
