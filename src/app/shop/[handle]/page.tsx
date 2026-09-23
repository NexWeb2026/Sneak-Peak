import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { DeliveryEstimator } from "@/components/product/DeliveryEstimator";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductRecommendations } from "@/components/product/ProductRecommendations";
import { getAllProducts, getProductByHandle } from "@/lib/shopify";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    handle: product.handle,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const [product, products] = await Promise.all([
    getProductByHandle(handle),
    getAllProducts(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ProductGallery product={product} />
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
            {product.vendor}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-brand-ink sm:text-5xl md:text-7xl">
            {product.title}
          </h1>
          <div className="mt-5 flex items-center gap-3">
            <p className="text-2xl font-bold text-brand-ink">{product.price}</p>
            {product.compareAtPrice ? (
              <p className="text-base font-semibold text-brand-ink/40 line-through">
                {product.compareAtPrice}
              </p>
            ) : null}
          </div>
          <p className="mt-6 text-base leading-7 text-brand-ink/70">
            {product.description}
          </p>
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
          <DeliveryEstimator />
          <div className="mt-8 grid gap-3 border-y border-brand-ink/10 py-6 text-sm text-brand-ink/65 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <p><span className="block font-bold uppercase text-brand-ink">Free SA delivery</span>On every order</p>
            <p><span className="block font-bold uppercase text-brand-ink">Easy returns</span>Within 30 days</p>
            <p><span className="block font-bold uppercase text-brand-ink">Authenticated</span>Every pair checked</p>
          </div>
          <ProductDetails product={product} />
        </aside>
      </div>
      <ProductRecommendations product={product} products={products} />
    </div>
  );
}
