type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const repeatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-brand-ink/10 bg-brand-ink text-brand-bone">
      <div className="flex w-max animate-[marquee_24s_linear_infinite] gap-10 py-4">
        {repeatedItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap font-display text-2xl font-bold uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
