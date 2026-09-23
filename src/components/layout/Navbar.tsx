"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchDialog } from "@/components/search/SearchDialog";
import { useSneakPeakStore } from "@/lib/store";

const navItems = [
  { href: "/shop", label: "Shop" },
  { href: "/drops", label: "Drops" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const { cartLines, wishlist, isMenuOpen, toggleMenu, closeMenu, openCart, openSearch } =
    useSneakPeakStore();
  const cartCount = cartLines.reduce((count, line) => count + line.quantity, 0);

  useEffect(() => {
    void useSneakPeakStore.persist.rehydrate();

    const onScroll = () => {
      const nextIsScrolled = window.scrollY > 24;

      if (nextIsScrolled === isScrolledRef.current) {
        return;
      }

      isScrolledRef.current = nextIsScrolled;
      setIsScrolled(nextIsScrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <header
          className={clsx(
            "pointer-events-auto mx-auto overflow-hidden border transition-[width,max-width,margin-top,border-radius,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isScrolled
              ? "mt-3 w-[calc(100%-1rem)] max-w-5xl rounded-[36px] border-brand-ink/15 bg-background/90 shadow-[0_12px_32px_rgba(17,17,17,0.12)] backdrop-blur-xl sm:w-[calc(100%-2rem)]"
              : "mt-0 w-full max-w-[100vw] rounded-none border-x-transparent border-t-transparent border-b-brand-ink/10 bg-background/95 shadow-none",
          )}
        >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-display text-2xl font-bold uppercase text-brand-ink"
            onClick={closeMenu}
          >
            Sneak-Peak
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold uppercase text-brand-ink/70 transition-colors hover:text-brand-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-ink transition-colors hover:bg-brand-ink/5"
              onClick={openSearch}
              aria-label="Search products"
              title="Search"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              href="/saved"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full text-brand-ink transition-colors hover:bg-brand-ink/5 sm:flex"
              aria-label={`${wishlist.length} saved products`}
              title="Saved products"
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              {wishlist.length ? <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">{wishlist.length}</span> : null}
            </Link>
            <button
              type="button"
              className="relative flex h-10 items-center justify-center gap-2 rounded-full px-2 text-sm font-semibold uppercase text-brand-ink transition-colors hover:bg-brand-ink/5 sm:px-3"
              onClick={openCart}
              aria-label={`Open cart with ${cartCount} items`}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              <span className="hidden sm:inline">Cart ({cartCount})</span>
              <span className="sm:hidden">{cartCount}</span>
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-ink transition-colors hover:bg-brand-ink/5 md:hidden"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {isMenuOpen ? (
          <div className="border-t border-brand-ink/10 bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-3 text-sm font-semibold uppercase text-brand-ink hover:bg-brand-ink/5"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/saved" className="rounded-md px-3 py-3 text-sm font-semibold uppercase text-brand-ink hover:bg-brand-ink/5" onClick={closeMenu}>
                Saved ({wishlist.length})
              </Link>
            </div>
          </div>
        ) : null}
        </header>
      </div>
      <CartDrawer />
      <SearchDialog />
    </>
  );
}
