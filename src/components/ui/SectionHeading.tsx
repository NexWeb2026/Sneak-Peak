type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold uppercase leading-none text-brand-ink md:text-6xl">
        {title}
      </h2>
      {copy ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-brand-ink/70">
          {copy}
        </p>
      ) : null}
    </div>
  );
}
