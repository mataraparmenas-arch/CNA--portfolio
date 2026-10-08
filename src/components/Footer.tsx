import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-navy-900/8 bg-mist-100/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-[20px] font-bold tracking-tight text-navy-900">{profile.name}</p>
          <p className="mt-1 text-[14px] text-mist-600">CNA • Physiotherapy</p>
          <svg width="120" height="22" viewBox="0 0 120 22" fill="none" aria-hidden className="mt-5 text-mint-500">
            <path d="M0 14h30l5-9 6 15 5-11 4 5h70" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          </svg>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-500">Contact</p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            <li>
              <a href={profile.phoneHref} className="link-line font-medium text-navy-800">
                {profile.phone}
              </a>
            </li>
            <li>
              <a href={profile.emailHref} className="link-line break-all font-medium text-navy-800">
                {profile.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-500">Navigate</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px]">
            {profile.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-line text-navy-800">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-navy-900/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-[12.5px] text-mist-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p>Care · Movement · Recovery</p>
        </div>
      </div>
    </footer>
  );
}
