"use client";

import { Heart } from "lucide-react";
import { clsx } from "clsx";
import { useSneakPeakStore } from "@/lib/store";

type WishlistButtonProps = {
  handle: string;
  label: string;
  className?: string;
  showLabel?: boolean;
};

export function WishlistButton({ handle, label, className, showLabel = false }: WishlistButtonProps) {
  const wishlist = useSneakPeakStore((state) => state.wishlist);
  const toggleWishlist = useSneakPeakStore((state) => state.toggleWishlist);
  const isSaved = wishlist.includes(handle);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(handle);
      }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full border border-brand-ink/15 bg-background/90 text-brand-ink shadow-sm backdrop-blur transition-colors hover:border-brand-ink",
        showLabel ? "h-12 px-5 text-sm font-bold uppercase" : "h-10 w-10",
        className,
      )}
      aria-pressed={isSaved}
      aria-label={`${isSaved ? "Remove" : "Save"} ${label}`}
      title={`${isSaved ? "Remove from" : "Add to"} saved items`}
    >
      <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
      {showLabel ? (isSaved ? "Saved" : "Save pair") : null}
    </button>
  );
}
