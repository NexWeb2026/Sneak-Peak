"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { WishlistButton } from "@/components/product/WishlistButton";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [primaryImage, secondaryImage] = product.images;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-md border border-brand-ink/10 bg-white"
    >
      <Link href={`/shop/${product.handle}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-smoke">
          {product.badge ? (
            <span className="absolute left-3 top-3 z-10 rounded-md bg-brand-ink px-3 py-1 text-xs font-bold uppercase text-brand-bone">
              {product.badge}
            </span>
          ) : null}
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-all duration-500 ${
              secondaryImage
                ? "group-hover:opacity-0"
                : "group-hover:scale-[1.04]"
            }`}
          />
          {secondaryImage ? (
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : null}
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold uppercase text-brand-ink/50">
            {product.vendor}
          </p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="font-semibold text-brand-ink">{product.title}</h3>
            <p className="font-bold text-brand-ink">{product.price}</p>
          </div>
        </div>
      </Link>
      <WishlistButton handle={product.handle} label={product.title} className="absolute right-3 top-3 z-20" />
    </motion.article>
  );
}
