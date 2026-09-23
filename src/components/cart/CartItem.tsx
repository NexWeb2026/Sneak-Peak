"use client";

import Image from "next/image";
import { useSneakPeakStore, type CartLine } from "@/lib/store";

type CartItemProps = {
  line: CartLine;
  compact?: boolean;
};

export function CartItem({ line, compact = false }: CartItemProps) {
  const { removeLocalCartItem, updateLocalCartItem } = useSneakPeakStore();
  const image = line.product.images[0];

  return (
    <div
      className={`grid gap-4 border-b border-brand-ink/10 py-4 ${
        compact ? "grid-cols-[88px_1fr]" : "grid-cols-[104px_1fr] sm:grid-cols-[128px_1fr]"
      }`}
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-brand-smoke">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="88px"
          className="object-cover"
        />
      </div>
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-brand-ink">{line.product.title}</p>
            <p className="mt-1 text-sm text-brand-ink/60">
              {line.size} / {line.colorway}
            </p>
          </div>
          <p className="font-bold text-brand-ink">{line.product.price}</p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex h-9 items-center rounded-md border border-brand-ink/15 bg-white">
            <button
              type="button"
              className="h-full w-9 text-lg text-brand-ink transition-colors hover:bg-brand-ink/5"
              onClick={() => updateLocalCartItem(line.id, line.quantity - 1)}
              aria-label={`Decrease ${line.product.title} quantity`}
            >
              &minus;
            </button>
            <span className="min-w-8 text-center text-sm font-bold" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              className="h-full w-9 text-lg text-brand-ink transition-colors hover:bg-brand-ink/5"
              onClick={() => updateLocalCartItem(line.id, line.quantity + 1)}
              aria-label={`Increase ${line.product.title} quantity`}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="text-xs font-bold uppercase text-brand-red"
            onClick={() => removeLocalCartItem(line.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
