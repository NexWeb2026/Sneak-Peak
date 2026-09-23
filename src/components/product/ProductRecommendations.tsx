"use client";

import { useEffect, useMemo } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { useSneakPeakStore } from "@/lib/store";
import type { Product } from "@/types/product";

type ProductRecommendationsProps = {
  product: Product;
  products: Product[];
};

export function ProductRecommendations({ product, products }: ProductRecommendationsProps) {
  const recentlyViewed = useSneakPeakStore((state) => state.recentlyViewed);
  const addRecentlyViewed = useSneakPeakStore((state) => state.addRecentlyViewed);

  useEffect(() => {
    addRecentlyViewed(product.handle);
  }, [addRecentlyViewed, product.handle]);

  const recentProducts = useMemo(
    () => recentlyViewed
      .filter((handle) => handle !== product.handle)
      .map((handle) => products.find((item) => item.handle === handle))
      .filter((item): item is Product => Boolean(item))
      .slice(0, 4),
    [product.handle, products, recentlyViewed],
  );

  const relatedProducts = useMemo(
    () => products
      .filter((item) => item.handle !== product.handle && item.tags.some((tag) => product.tags.includes(tag)))
      .slice(0, 4),
    [product, products],
  );

  const displayedProducts = recentProducts.length ? recentProducts : relatedProducts;

  if (!displayedProducts.length) return null;

  return (
    <section className="mx-auto mt-24 max-w-7xl border-t border-brand-ink/10 pt-10">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Keep exploring</p>
      <div className="mt-2 flex items-end justify-between gap-4">
        <h2 className="font-display text-4xl font-bold uppercase leading-none text-brand-ink md:text-5xl">{recentProducts.length ? "Recently viewed" : "You may also like"}</h2>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayedProducts.map((item) => <ProductCard key={item.id} product={item} />)}
      </div>
    </section>
  );
}
