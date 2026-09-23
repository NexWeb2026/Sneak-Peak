"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/shop/ProductCard";
import { placeholderProducts } from "@/lib/products";
import { useSneakPeakStore } from "@/lib/store";

export function SavedProducts() {
  const wishlist = useSneakPeakStore((state) => state.wishlist);
  const products = placeholderProducts.filter((product) => wishlist.includes(product.handle));

  if (!products.length) {
    return (
      <div className="border-y border-brand-ink/10 py-20 text-center">
        <Heart className="mx-auto h-8 w-8 text-brand-ink/35" aria-hidden="true" />
        <h2 className="mt-5 font-display text-4xl font-bold uppercase text-brand-ink">Nothing saved yet</h2>
        <p className="mx-auto mt-3 max-w-md text-brand-ink/60">Use the heart on any sneaker to keep your shortlist in one place.</p>
        <Button href="/shop" className="mt-7">Explore sneakers</Button>
      </div>
    );
  }

  return (
    <>
      <p className="mb-5 text-sm text-brand-ink/55">{products.length} saved {products.length === 1 ? "pair" : "pairs"}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </>
  );
}
