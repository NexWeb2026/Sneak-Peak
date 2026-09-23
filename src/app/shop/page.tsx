import { ProductGrid } from "@/components/shop/ProductGrid";
import { productFilters, type ProductFilter } from "@/components/shop/ProductFilters";
import { getAllProducts } from "@/lib/shopify";

type ShopPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const products = await getAllProducts();
  const { category } = await searchParams;
  const initialFilter = productFilters.includes(category as ProductFilter)
    ? (category as ProductFilter)
    : "All";

  return (
    <div className="bg-background px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
            Product grid
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-none text-brand-ink sm:text-5xl md:text-7xl">
            Shop Sneak-Peak
          </h1>
          <p className="mt-5 text-base leading-7 text-brand-ink/70">
            Limited releases, everyday rotation pairs, and archive restocks,
            selected for people who notice the details.
          </p>
        </div>
        <ProductGrid products={products} initialFilter={initialFilter} />
      </div>
    </div>
  );
}
