"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, Ruler, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import type { ProductVariant } from "@/types/product";

type ProductOptionsProps = {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
  fitNote?: string;
};

const colorSwatches: Record<string, string> = {
  Cream: "#e8dfcf",
  Noir: "#171717",
  Stone: "#aaa59b",
  Gum: "#b98252",
  White: "#f5f5f3",
  Ember: "#bd3d26",
  "Ice Blue": "#9fc8dc",
  Natural: "#d7c9aa",
};

export function ProductOptions({
  variants,
  selectedVariant,
  onVariantChange,
  fitNote,
}: ProductOptionsProps) {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [notifyVariant, setNotifyVariant] = useState<ProductVariant | null>(null);
  const [notificationSaved, setNotificationSaved] = useState(false);
  const colorways = useMemo(
    () => [...new Set(variants.map((variant) => variant.colorway))],
    [variants],
  );
  const visibleVariants = variants.filter(
    (variant) => variant.colorway === selectedVariant.colorway,
  );

  function selectColorway(colorway: string) {
    const sameSize = variants.find(
      (variant) =>
        variant.colorway === colorway &&
        variant.size === selectedVariant.size &&
        variant.availableForSale,
    );
    const nextVariant =
      sameSize ??
      variants.find(
        (variant) =>
          variant.colorway === colorway && variant.availableForSale,
      ) ??
      variants.find((variant) => variant.colorway === colorway);

    if (nextVariant) {
      onVariantChange(nextVariant);
      setNotifyVariant(null);
    }
  }

  function saveNotification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotificationSaved(true);
  }

  return (
    <div className="grid gap-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-ink/50">Colour</p>
        <div className="mt-3 flex items-center gap-3">
          {colorways.map((colorway) => (
            <button key={colorway} type="button" onClick={() => selectColorway(colorway)} aria-pressed={selectedVariant.colorway === colorway} className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
              <span className={`h-7 w-7 rounded-full border-2 border-white ${selectedVariant.colorway === colorway ? "shadow-[0_0_0_2px_#111111]" : "shadow-[0_0_0_1px_rgba(17,17,17,0.25)]"}`} style={{ backgroundColor: colorSwatches[colorway] ?? "#cccccc" }} aria-hidden="true" />
              {colorway}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-ink/50">Select size</p>
        <button type="button" onClick={() => setIsGuideOpen(true)} className="flex items-center gap-2 text-xs font-bold uppercase text-brand-ink underline underline-offset-4">
          <Ruler className="h-4 w-4" aria-hidden="true" /> Size guide
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {visibleVariants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => {
              if (variant.availableForSale) {
                onVariantChange(variant);
                setNotifyVariant(null);
              } else {
                setNotifyVariant(variant);
                setNotificationSaved(false);
              }
            }}
            className={`h-11 rounded-md border text-sm font-semibold uppercase transition-colors ${
              selectedVariant.id === variant.id
                ? "border-brand-ink bg-brand-ink text-brand-bone"
                : variant.availableForSale
                  ? "border-brand-ink/15 bg-white text-brand-ink hover:border-brand-ink"
                  : "border-brand-ink/10 bg-brand-smoke/60 text-brand-ink/35 line-through"
            }`}
            aria-label={variant.availableForSale ? `Select ${variant.size}` : `${variant.size} unavailable, request notification`}
          >
            {variant.size}
          </button>
        ))}
      </div>
      {fitNote ? <p className="text-sm text-brand-ink/60"><span className="font-semibold text-brand-ink">Fit:</span> {fitNote}</p> : null}

      {notifyVariant ? (
        <form onSubmit={saveNotification} className="rounded-md border border-brand-ink/10 bg-white p-4">
          {notificationSaved ? (
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-ink"><Bell className="h-4 w-4" aria-hidden="true" /> We will notify you when {notifyVariant.size} returns.</p>
          ) : (
            <>
              <p className="text-sm font-semibold text-brand-ink">Get notified when {notifyVariant.size} is back.</p>
              <div className="mt-3 flex gap-2">
                <input type="email" required placeholder="Email address" aria-label="Email for restock notification" className="h-10 min-w-0 flex-1 rounded-md border border-brand-ink/15 px-3 text-sm outline-none focus:border-brand-ink" />
                <button type="submit" className="h-10 rounded-md bg-brand-ink px-4 text-xs font-bold uppercase text-brand-bone">Notify me</button>
              </div>
            </>
          )}
        </form>
      ) : null}

      <AnimatePresence>
        {isGuideOpen ? (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-ink/45 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.currentTarget === event.target) setIsGuideOpen(false); }}>
            <motion.div role="dialog" aria-modal="true" aria-label="Sneaker size guide" className="w-full max-w-xl rounded-lg bg-background p-6 shadow-2xl" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }}>
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Find your fit</p><h2 className="mt-2 font-display text-4xl font-bold uppercase text-brand-ink">Size guide</h2></div>
                <button type="button" onClick={() => setIsGuideOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-brand-ink/5" aria-label="Close size guide"><X className="h-5 w-5" aria-hidden="true" /></button>
              </div>
              <div className="mt-6 overflow-hidden rounded-md border border-brand-ink/10 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-ink text-brand-bone"><tr><th className="p-3">UK</th><th className="p-3">EU</th><th className="p-3">Foot length</th></tr></thead>
                  <tbody className="divide-y divide-brand-ink/10 text-brand-ink/70">
                    {[['6','40','25 cm'],['7','41','26 cm'],['8','42','27 cm'],['9','43','28 cm'],['10','44.5','29 cm'],['11','46','30 cm']].map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell} className="p-3">{cell}</td>)}</tr>)}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm leading-6 text-brand-ink/60">Measure heel to longest toe while standing. When between sizes, follow the fit note shown beside the product.</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
