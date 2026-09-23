"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import { formatPrice, priceToCents } from "@/lib/money";
import { useSneakPeakStore } from "@/lib/store";

export function CartDrawer() {
  const { isCartOpen, closeCart, cartLines } = useSneakPeakStore();
  const subtotal = cartLines.reduce(
    (total, line) => total + priceToCents(line.product.price) * line.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-brand-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-label="Close cart"
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            <div className="flex items-center justify-between border-b border-brand-ink/10 px-5 py-4">
              <h2 className="font-display text-2xl font-bold uppercase">Cart</h2>
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm font-bold uppercase hover:bg-brand-ink/5"
                onClick={closeCart}
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              {cartLines.length ? (
                cartLines.map((line) => (
                  <CartItem key={line.id} line={line} compact />
                ))
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-semibold text-brand-ink">Your cart is empty.</p>
                  <p className="mt-2 text-sm text-brand-ink/60">
                    Your next rotation starts in the shop.
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-brand-ink/10 p-5">
              {cartLines.length ? (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase text-brand-ink/60">
                      Subtotal
                    </span>
                    <span className="text-lg font-bold text-brand-ink">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <Button href="/cart" className="w-full" onClick={closeCart}>
                    Review cart
                  </Button>
                </>
              ) : (
                <Button href="/shop" className="w-full" onClick={closeCart}>
                  Shop sneakers
                </Button>
              )}
              <Link
                href="/shop"
                className="mt-3 block text-center text-sm font-semibold uppercase text-brand-ink/60 hover:text-brand-ink"
                onClick={closeCart}
              >
                Continue shopping
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
