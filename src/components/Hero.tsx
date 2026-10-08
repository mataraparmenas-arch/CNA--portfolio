import { useRef } from "react";
import { profile } from "@/data/profile";
import { useDeferredMount, useFinePointer, useReducedMotion, useRevealObserver, useSmoothPointer } from "@/hooks/useMotion";
import { Healthcare3D } from "./Healthcare3D";
import { Portrait } from "./Portrait";
import { Button } from "./ui/Button";
import { ArrowDownIcon, DownloadIcon, PhoneIcon } from "./ui/Icons";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const interactive = fine && !reduced;
  const pointer = useSmoothPointer(interactive, 0.07);
  const sceneReady = useDeferredMount(400); // 3D only after the page is usable
  useRevealObserver(root);

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-24"
      aria-labelledby="hero-title"
    >
      {/* Fine clinical grid + soft light wash */}
      <div className="clinical-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(63,191,168,0.16), transparent 65%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[460px] w-[460px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(47,111,237,0.10), transparent 65%)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <p className="reveal flex items-center gap-3 font-heading text-[12px] font-semibold uppercase tracking-[0.24em] text-mist-600">
            <svg width="44" height="14" viewBox="0 0 44 14" fill="none" aria-hidden className="text-mint-500">
              <path
                className="pulse-line"
                d="M0 7h10l3-5 4 10 3-7 3 2h21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {profile.label}
          </p>

          <h1
            id="hero-title"
            className="reveal mt-6 font-heading text-[clamp(2.75rem,8vw,5.25rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-navy-900"
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            Glorious
            <br />
            Moraa
          </h1>

          <p
            className="reveal mt-5 font-heading text-[clamp(1.1rem,2.4vw,1.45rem)] font-semibold text-navy-600"
            style={{ ["--reveal-delay" as string]: "160ms" }}
          >
            {profile.title}
          </p>

          <p
            className="reveal mt-6 max-w-[52ch] text-[16px] leading-[1.75] text-mist-600 sm:text-[17px]"
            style={{ ["--reveal-delay" as string]: "240ms" }}
          >
            {profile.heroStatement}
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ ["--reveal-delay" as string]: "320ms" }}>
            <Button href={profile.cvPath} download={profile.cvFileName}>
              Download CV
              <DownloadIcon className="transition-transform duration-500 group-hover:translate-y-0.5" />
            </Button>
            <Button href={profile.phoneHref} variant="glass">
              <PhoneIcon />
              Call {profile.firstName}
            </Button>
          </div>

          <div
            className="reveal mt-10 flex items-center gap-6 text-[13px] text-mist-500"
            style={{ ["--reveal-delay" as string]: "400ms" }}
          >
            <a href={profile.emailHref} className="link-line text-navy-700">
              {profile.email}
            </a>
            <span className="hidden h-3 w-px bg-mist-300 sm:block" aria-hidden />
            <a href={profile.phoneHref} className="link-line hidden text-navy-700 sm:inline">
              {profile.phone}
            </a>
          </div>
        </div>

        {/* Portrait + 3D */}
        <div className="relative order-1 lg:order-2">
          <div className="pointer-events-none absolute -inset-x-16 -inset-y-20 lg:-inset-x-24 lg:-inset-y-28" aria-hidden>
            {sceneReady ? (
              <Healthcare3D pointer={pointer} reduced={reduced} className="h-full w-full" />
            ) : (
              <StaticRings />
            )}
          </div>
          <div className="reveal relative" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <Portrait pointer={pointer} parallax={interactive} />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[12px] font-medium tracking-wide text-mist-500 transition-colors hover:text-navy-900 md:flex"
        aria-label="Scroll to About"
      >
        <ArrowDownIcon width={14} height={14} />
        Explore
      </a>
    </section>
  );
}

/** Instant, zero-JS placeholder shown until the 3D scene mounts — and the WebGL-free fallback. */
function StaticRings() {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" fill="none" aria-hidden>
      <ellipse cx="300" cy="300" rx="236" ry="78" stroke="rgba(43,79,110,0.28)" strokeWidth="1" transform="rotate(-18 300 300)" />
      <ellipse cx="300" cy="300" rx="276" ry="96" stroke="rgba(63,191,168,0.26)" strokeWidth="1" transform="rotate(22 300 300)" />
    </svg>
  );
}
