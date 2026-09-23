import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { placeholderProducts } from "@/lib/products";

export function FeaturedProduct() {
  const product = placeholderProducts[0];

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
        <div className="group relative aspect-square overflow-hidden rounded-md bg-brand-smoke">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover transition-all duration-500 ${
              product.images[1]
                ? "group-hover:opacity-0"
                : "group-hover:scale-[1.03]"
            }`}
          />
          {product.images[1] ? (
            <Image
              src={product.images[1].src}
              alt={product.images[1].alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : null}
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
            Featured release
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none text-brand-ink md:text-7xl">
            {product.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-brand-ink/70">
            Layered suede, breathable mesh, and an easy neutral palette make
            this limited runner the pair that works seven days a week.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button href={`/shop/${product.handle}`}>View product</Button>
            <span className="text-lg font-bold text-brand-ink">{product.price}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
