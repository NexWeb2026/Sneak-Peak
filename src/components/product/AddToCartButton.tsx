"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { addToCart, createCart } from "@/lib/shopify";
import { useSneakPeakStore } from "@/lib/store";
import type { Product, ProductVariant } from "@/types/product";
import { ProductOptions } from "./ProductOptions";
import { WishlistButton } from "./WishlistButton";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0],
  );
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { cartId, setCartId, addLocalCartItem } = useSneakPeakStore();
  const lineId = useMemo(
    () => `${product.id}-${selectedVariant.id}`,
    [product.id, selectedVariant.id],
  );

  useEffect(
    () => () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    },
    [],
  );

  async function handleAddToCart() {
    if (isAdding) {
      return;
    }

    setIsAdding(true);
    setIsAdded(false);

    try {
      const activeCartId = cartId ?? (await createCart()).id;
      setCartId(activeCartId);
      await Promise.all([
        addToCart(activeCartId, selectedVariant.id, 1),
        new Promise((resolve) => setTimeout(resolve, 1650)),
      ]);
      addLocalCartItem({
        id: lineId,
        product,
        variantId: selectedVariant.id,
        size: selectedVariant.size,
        colorway: selectedVariant.colorway,
        quantity: 1,
      });
      setIsAdded(true);
      resetTimerRef.current = setTimeout(() => setIsAdded(false), 1400);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="grid gap-5">
      <ProductOptions
        variants={product.variants}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
        fitNote={product.fitNote}
      />
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <Button
          type="button"
          variant="accent"
          className="h-14 w-full overflow-hidden text-base"
          onClick={handleAddToCart}
          disabled={!selectedVariant.availableForSale}
          aria-busy={isAdding}
        >
          <span className="flex min-w-44 items-center justify-center" aria-live="polite">
            {isAdding ? (
              <span className="flex items-center justify-center">
                <span className="cart-button-animation" aria-hidden="true">
                  <span className="cart-button-box" />
                  <span className="cart-button-cart">
                    <span className="cart-button-handle" />
                    <span className="cart-button-basket" />
                    <span className="cart-button-wheel cart-button-wheel-left" />
                    <span className="cart-button-wheel cart-button-wheel-right" />
                  </span>
                </span>
                <span className="sr-only">Adding to cart</span>
              </span>
            ) : isAdded ? (
              "Added to cart"
            ) : (
              "Add to cart"
            )}
          </span>
        </Button>
        <WishlistButton handle={product.handle} label={product.title} className="h-14 w-14" />
      </div>
    </div>
  );
}
