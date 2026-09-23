"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { placeholderProducts } from "@/lib/products";
import { useSneakPeakStore } from "@/lib/store";

export function SearchDialog() {
  const isOpen = useSneakPeakStore((state) => state.isSearchOpen);
  const closeSearch = useSneakPeakStore((state) => state.closeSearch);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return placeholderProducts.slice(0, 4);
    }

    return placeholderProducts.filter((product) =>
      [product.title, product.vendor, product.description, ...product.tags]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeSearch, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] bg-brand-ink/45 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) closeSearch();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="mx-auto max-h-[calc(100vh-1.5rem)] max-w-4xl overflow-y-auto rounded-lg bg-background shadow-2xl sm:max-h-[calc(100vh-3rem)]"
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-brand-ink/10 bg-background px-4 py-4 sm:px-6">
              <Search className="h-5 w-5 shrink-0 text-brand-ink/45" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-lg font-semibold text-brand-ink outline-none placeholder:text-brand-ink/35"
                type="search"
                placeholder="Search sneakers, collections, or styles"
                aria-label="Search the catalogue"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="flex h-10 w-10 items-center justify-center rounded-full text-brand-ink transition-colors hover:bg-brand-ink/5"
                aria-label="Close search"
                title="Close search"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
                    {query ? "Search results" : "Popular right now"}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold uppercase text-brand-ink">
                    {query ? `${results.length} matching pairs` : "Start with the standouts"}
                  </h2>
                </div>
                <Link
                  href="/shop"
                  onClick={closeSearch}
                  className="hidden items-center gap-2 text-sm font-bold uppercase text-brand-ink sm:flex"
                >
                  Shop all <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {results.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.handle}`}
                      onClick={closeSearch}
                      className="group grid grid-cols-[88px_1fr_auto] items-center gap-4 rounded-md border border-brand-ink/10 bg-white p-2 transition-colors hover:border-brand-ink/35"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-md bg-brand-smoke">
                        <Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="88px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-brand-ink">{product.title}</p>
                        <p className="mt-1 text-xs font-semibold uppercase text-brand-ink/45">{product.tags[0]}</p>
                        <p className="mt-2 text-sm font-bold text-brand-ink">{product.price}</p>
                      </div>
                      <ArrowRight className="mr-2 h-4 w-4 text-brand-ink/35 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-8 border-y border-brand-ink/10 py-16 text-center">
                  <p className="font-display text-3xl font-bold uppercase text-brand-ink">No pair found</p>
                  <p className="mt-2 text-sm text-brand-ink/55">Try a style such as runner, court, knit, or trainer.</p>
                </div>
              )}
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
