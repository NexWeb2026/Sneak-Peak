import { create } from "zustand";
import { persist } from "zustand/middleware";
import { placeholderProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export type CartLine = {
  id: string;
  product: Pick<Product, "handle" | "title" | "price" | "images">;
  variantId: string;
  size: string;
  colorway: string;
  quantity: number;
};

type StoreState = {
  cartId: string | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  cartLines: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  dropReminders: string[];
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  toggleWishlist: (handle: string) => void;
  addRecentlyViewed: (handle: string) => void;
  toggleDropReminder: (dropId: string) => void;
  setCartId: (cartId: string) => void;
  addLocalCartItem: (line: CartLine) => void;
  updateLocalCartItem: (id: string, quantity: number) => void;
  removeLocalCartItem: (id: string) => void;
  clearLocalCart: () => void;
};

export const useSneakPeakStore = create<StoreState>()(
  persist(
    (set) => ({
      cartId: null,
      isCartOpen: false,
      isSearchOpen: false,
      isMenuOpen: false,
      cartLines: [],
      wishlist: [],
      recentlyViewed: [],
      dropReminders: [],
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      openSearch: () => set({ isSearchOpen: true, isMenuOpen: false }),
      closeSearch: () => set({ isSearchOpen: false }),
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      closeMenu: () => set({ isMenuOpen: false }),
      toggleWishlist: (handle) =>
        set((state) => ({
          wishlist: state.wishlist.includes(handle)
            ? state.wishlist.filter((item) => item !== handle)
            : [...state.wishlist, handle],
        })),
      addRecentlyViewed: (handle) =>
        set((state) => ({
          recentlyViewed: [
            handle,
            ...state.recentlyViewed.filter((item) => item !== handle),
          ].slice(0, 6),
        })),
      toggleDropReminder: (dropId) =>
        set((state) => ({
          dropReminders: state.dropReminders.includes(dropId)
            ? state.dropReminders.filter((item) => item !== dropId)
            : [...state.dropReminders, dropId],
        })),
      setCartId: (cartId) => set({ cartId }),
      addLocalCartItem: (line) =>
        set((state) => {
          const existing = state.cartLines.find((item) => item.id === line.id);

          if (existing) {
            return {
              cartLines: state.cartLines.map((item) =>
                item.id === line.id
                  ? { ...item, quantity: item.quantity + line.quantity }
                  : item,
              ),
            };
          }

          return {
            cartLines: [...state.cartLines, line],
          };
        }),
      updateLocalCartItem: (id, quantity) =>
        set((state) => ({
          cartLines:
            quantity <= 0
              ? state.cartLines.filter((item) => item.id !== id)
              : state.cartLines.map((item) =>
                  item.id === id ? { ...item, quantity } : item,
                ),
        })),
      removeLocalCartItem: (id) =>
        set((state) => ({
          cartLines: state.cartLines.filter((item) => item.id !== id),
        })),
      clearLocalCart: () => set({ cartId: null, cartLines: [] }),
    }),
    {
      name: "sneak-peak-cart",
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as Partial<
          Pick<
            StoreState,
            "cartId" | "cartLines" | "wishlist" | "recentlyViewed" | "dropReminders"
          >
        >;

        return {
          ...state,
          wishlist: state.wishlist ?? [],
          recentlyViewed: state.recentlyViewed ?? [],
          dropReminders: state.dropReminders ?? [],
          cartLines: (state.cartLines ?? []).map((line) => {
            const localProduct = placeholderProducts.find(
              (product) => product.handle === line.product.handle,
            );
            const localSize = line.size.match(/^US (\d+)$/);
            const size = localSize
              ? `UK ${Math.max(1, Number(localSize[1]) - 1)}`
              : line.size;

            return {
              ...line,
              id: line.id.replace(/^US (\d+)/, (_, value) => `UK ${Math.max(1, Number(value) - 1)}`),
              size,
              product: localProduct
                ? {
                    handle: localProduct.handle,
                    title: localProduct.title,
                    price: localProduct.price,
                    images: localProduct.images,
                  }
                : line.product,
            };
          }),
        };
      },
      partialize: (state) => ({
        cartId: state.cartId,
        cartLines: state.cartLines,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        dropReminders: state.dropReminders,
      }),
      skipHydration: true,
    },
  ),
);
