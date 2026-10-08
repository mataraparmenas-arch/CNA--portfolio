import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";
import { DownloadIcon } from "./ui/Icons";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the section currently in view
  useEffect(() => {
    const ids = profile.nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-5">
      <nav
        aria-label="Primary"
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500",
          "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          scrolled || open ? "glass" : "border border-transparent bg-transparent",
        )}
      >
        <a href="#home" className="flex items-center gap-3" aria-label="Glorious Moraa — home">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-mist-50">
            <svg viewBox="0 0 64 64" className="h-5 w-5" aria-hidden>
              <path
                d="M12 40c8 0 10-18 18-18s10 18 22 10"
                fill="none"
                stroke="#3fbfa8"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx="52" cy="32" r="4.5" fill="#f6f8fa" />
            </svg>
          </span>
          <span className="font-heading text-[15px] font-bold tracking-tight text-navy-900">Glorious Moraa</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {profile.nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                aria-current={active === n.href ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-300",
                  active === n.href ? "text-navy-900" : "text-mist-600 hover:text-navy-900",
                )}
              >
                {n.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-mint-500 transition-all duration-500",
                    active === n.href ? "opacity-100" : "scale-0 opacity-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.cvPath}
            download={profile.cvFileName}
            className="hidden items-center gap-2 rounded-full bg-navy-900 py-2.5 pl-4 pr-3.5 text-[13px] font-semibold text-mist-50 transition-all duration-500 hover:-translate-y-px hover:bg-navy-800 sm:inline-flex"
          >
            Download CV
            <DownloadIcon width={16} height={16} />
          </a>

          {/* Mobile toggle — two lines that fold into a close mark */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-navy-900 md:hidden"
          >
            <span
              className={cn(
                "absolute h-[1.5px] w-5 rounded bg-current transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                open ? "rotate-45" : "-translate-y-[3.5px]",
              )}
            />
            <span
              className={cn(
                "absolute h-[1.5px] w-5 rounded bg-current transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                open ? "-rotate-45" : "translate-y-[3.5px] w-3.5 translate-x-[3px]",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-4 top-[72px] z-40 origin-top rounded-3xl p-3 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] md:hidden glass",
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-[0.98] opacity-0 -translate-y-2",
        )}
      >
        <ul className="flex flex-col">
          {profile.nav.map((n, i) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-heading text-[17px] font-semibold text-navy-900 transition-colors hover:bg-navy-900/5"
              >
                {n.label}
                <span className="font-body text-[12px] font-medium text-mist-400">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-navy-900/8 pt-3">
          <a
            href={profile.phoneHref}
            className="flex min-h-12 items-center justify-center rounded-2xl bg-navy-900/5 text-[14px] font-semibold text-navy-900"
          >
            Call
          </a>
          <a
            href={profile.cvPath}
            download={profile.cvFileName}
            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-navy-900 text-[14px] font-semibold text-mist-50"
          >
            Download CV <DownloadIcon width={16} height={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
