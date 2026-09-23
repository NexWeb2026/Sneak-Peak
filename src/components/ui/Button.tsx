import Link from "next/link";
import { clsx } from "clsx";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

const styles = {
  primary: "bg-brand-ink text-brand-bone hover:bg-brand-red",
  secondary:
    "border border-brand-ink/20 bg-white/70 text-brand-ink hover:border-brand-ink",
  ghost: "text-brand-ink hover:bg-brand-ink/5",
  accent:
    "bg-brand-red text-white shadow-[0_8px_24px_rgba(220,63,44,0.3)] hover:bg-brand-ink hover:shadow-[0_10px_30px_rgba(17,17,17,0.24)]",
};

export function Button(props: ButtonProps | LinkProps) {
  const { children, className, variant = "primary", ...restProps } = props;
  const classes = clsx(
    "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold uppercase tracking-normal transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    styles[variant],
    className,
  );

  if ("href" in restProps && typeof restProps.href === "string") {
    return (
      <Link className={classes} {...restProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...restProps}>
      {children}
    </button>
  );
}
