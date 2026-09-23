import type { ReactNode } from "react";

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function PolicyPage({ eyebrow, title, children }: PolicyPageProps) {
  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold uppercase leading-none text-brand-ink md:text-7xl">
          {title}
        </h1>
        <p className="mt-5 text-sm text-brand-ink/55">Last updated: 23 September 2026</p>
        <div className="mt-10 space-y-10 text-base leading-7 text-brand-ink/70 [&_a]:font-semibold [&_a]:text-brand-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:leading-none [&_h2]:text-brand-ink [&_li]:pl-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </article>
    </main>
  );
}
