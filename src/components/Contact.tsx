import { useRef, useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { useRevealObserver } from "@/hooks/useMotion";
import { Button } from "./ui/Button";
import { GlassCard } from "./ui/GlassCard";
import { MailIcon, PhoneIcon, SendIcon } from "./ui/Icons";

type Status = "idle" | "sending" | "sent" | "error";

const clean = (v: string) => v.replace(/[<>]/g, "").trim().slice(0, 2000);

/**
 * Contact form architecture:
 *  • If `profile.formEndpoint` is set (e.g. Formspree), the form POSTs JSON there.
 *  • Otherwise it opens a pre-filled email draft — no fake backend, no silent drop.
 */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  useRevealObserver(root);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = clean(String(data.get("name") ?? ""));
    const email = clean(String(data.get("email") ?? ""));
    const message = clean(String(data.get("message") ?? ""));
    if (String(data.get("company") ?? "")) return; // honeypot
    if (!name || !email || !message) return;

    if (!profile.formEndpoint) {
      const subject = encodeURIComponent(`Message from ${name} via your website`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `${profile.emailHref}?subject=${subject}&body=${body}`;
      setStatus("sent");
      form.reset();
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-xl border border-navy-900/10 bg-white/70 px-4 py-3 text-[15px] text-navy-900 placeholder:text-mist-400 " +
    "transition-all duration-300 focus:border-mint-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-mint-500/15";

  return (
    <section id="contact" ref={root} className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_bottom,transparent,rgba(225,231,236,0.5))]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="reveal mb-4 flex items-center gap-3 font-heading text-[12px] font-semibold uppercase tracking-[0.22em] text-mint-600">
            <span className="h-px w-6 bg-mint-500/70" aria-hidden />
            Contact
          </p>
          <h2
            id="contact-title"
            className="reveal font-heading text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] text-navy-900"
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            Let's Connect
          </h2>
          <p className="reveal mt-5 max-w-[44ch] text-[16px] leading-relaxed text-mist-600" style={{ ["--reveal-delay" as string]: "160ms" }}>
            For professional enquiries, opportunities or collaboration, reach out directly — a call or an email is all it takes.
          </p>

          <dl className="mt-10 space-y-3">
            <div className="reveal" style={{ ["--reveal-delay" as string]: "220ms" }}>
              <a
                href={profile.phoneHref}
                className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-mint-300"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-mist-50">
                  <PhoneIcon />
                </span>
                <span>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist-500">Phone</dt>
                  <dd className="font-heading text-[18px] font-bold text-navy-900">{profile.phone}</dd>
                </span>
              </a>
            </div>
            <div className="reveal" style={{ ["--reveal-delay" as string]: "300ms" }}>
              <a
                href={profile.emailHref}
                className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-mint-300"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-500 text-navy-950">
                  <MailIcon />
                </span>
                <span className="min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist-500">Email</dt>
                  <dd className="truncate font-heading text-[17px] font-bold text-navy-900 sm:text-[18px]">{profile.email}</dd>
                </span>
              </a>
            </div>
          </dl>

          <div className="reveal mt-8 flex flex-wrap gap-3" style={{ ["--reveal-delay" as string]: "380ms" }}>
            <Button href={profile.phoneHref}>
              <PhoneIcon />
              Call {profile.firstName}
            </Button>
            <Button href={profile.emailHref} variant="mint">
              <MailIcon />
              Email {profile.firstName}
            </Button>
          </div>
        </div>

        <GlassCard tilt={false} className="reveal p-6 sm:p-8" style={{ ["--reveal-delay" as string]: "200ms" }}>
          <form onSubmit={onSubmit} noValidate={false} className="space-y-5">
            <h3 className="font-heading text-[20px] font-bold text-navy-900">Send a message</h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[13px] font-semibold text-navy-700">Name</span>
                <input name="name" type="text" required autoComplete="name" maxLength={120} className={field} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[13px] font-semibold text-navy-700">Email</span>
                <input name="email" type="email" required autoComplete="email" maxLength={160} className={field} placeholder="you@example.com" />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-navy-700">Message</span>
              <textarea name="message" required rows={5} maxLength={2000} className={`${field} resize-y`} placeholder="How can Glorious help?" />
            </label>

            {/* Honeypot — hidden from humans */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label>
                Company <input name="company" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <Button type="submit" disabled={status === "sending"} className="disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send Message"}
                <SendIcon className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <p className="text-[12.5px] text-mist-500" role="status" aria-live="polite">
                {status === "sent" && (profile.formEndpoint ? "Thank you — your message has been sent." : "Your email app should open with the message ready to send.")}
                {status === "error" && "Something went wrong. Please email directly instead."}
                {status === "idle" && !profile.formEndpoint && "Opens your email app — no data is stored on this site."}
              </p>
            </div>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
