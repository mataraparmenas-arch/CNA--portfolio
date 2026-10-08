import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "glass" | "ghost" | "mint";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-heading font-semibold text-[15px] " +
  "min-h-12 px-6 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] " +
  "select-none focus-visible:outline-2 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-mist-50 shadow-[0_12px_28px_-12px_rgba(11,27,43,0.55)] " +
    "hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-[0_18px_34px_-14px_rgba(11,27,43,0.6)]",
  mint:
    "bg-mint-500 text-navy-950 shadow-[0_12px_28px_-12px_rgba(63,191,168,0.6)] " +
    "hover:-translate-y-0.5 hover:bg-mint-400",
  glass:
    "glass text-navy-900 hover:-translate-y-0.5 hover:border-mint-300 " +
    "hover:shadow-[0_18px_34px_-16px_rgba(11,27,43,0.3)]",
  ghost: "text-navy-900 hover:bg-navy-900/5",
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant; children: ReactNode };
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; variant?: Variant; children: ReactNode };

export function Button(props: AnchorProps | BtnProps) {
  const { variant = "primary", className, children } = props;
  const cls = cn(base, variants[variant], className);
  if ("href" in props && props.href) {
    const { variant: _v, className: _c, children: _ch, ...rest } = props as AnchorProps;
    return (
      <a className={cls} {...rest}>
        {children}
      </a>
    );
  }
  const { variant: _v, className: _c, children: _ch, ...rest } = props as BtnProps;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
