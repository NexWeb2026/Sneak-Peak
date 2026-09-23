"use client";

import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import { formatPrice, priceToCents } from "@/lib/money";
import { useSneakPeakStore } from "@/lib/store";

export default function CartPage() {
  const cartLines = useSneakPeakStore((state) => state.cartLines);
  const subtotal = cartLines.reduce(
    (total, line) => total + priceToCents(line.product.price) * line.quantity,
    0,
  );

  return (
    <main className="min-h-[75vh] bg-background px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
          Your selection
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none text-brand-ink md:text-7xl">
          Shopping cart
        </h1>

        {cartLines.length ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="border-t border-brand-ink/10">
              {cartLines.map((line) => (
                <CartItem key={line.id} line={line} />
              ))}
            </div>
            <aside className="rounded-md border border-brand-ink/10 bg-white p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-3xl font-bold uppercase text-brand-ink">
                Order summary
              </h2>
              <div className="mt-6 grid gap-3 text-sm">
                <div className="flex justify-between text-brand-ink/65">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-ink/65">
                  <span>Delivery</span>
                  <span className="font-semibold text-brand-ink">Free</span>
                </div>
                <div className="flex justify-between border-t border-brand-ink/10 pt-4 text-lg font-bold text-brand-ink">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <Button href="/checkout" className="mt-6 w-full">
                Continue to checkout
              </Button>
              <p className="mt-4 text-center text-xs leading-5 text-brand-ink/50">
                Prices are in South African rand. VAT is included where applicable.
                Free delivery within South Africa.
              </p>
            </aside>
          </div>
        ) : (
          <div className="mt-10 border-y border-brand-ink/10 py-20 text-center">
            <h2 className="font-display text-4xl font-bold uppercase text-brand-ink">
              Your cart is empty
            </h2>
            <p className="mx-auto mt-4 max-w-md text-brand-ink/60">
              Browse the latest releases and add a pair to start your order.
            </p>
            <Button href="/shop" className="mt-7">
              Explore the shop
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
