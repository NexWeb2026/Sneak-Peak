import Image from "next/image";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="grid gap-4">
      {product.images.map((image) => (
        <div
          key={image.src}
          className="relative aspect-square overflow-hidden rounded-md bg-brand-smoke"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={image.src === product.images[0]?.src}
          />
        </div>
      ))}
    </div>
  );
}
