"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { priceToCents } from "@/lib/money";
import { ProductCard } from "./ProductCard";
import { ProductFilters, type ProductFilter } from "./ProductFilters";

type ProductGridProps = {
  products: Product[];
  initialFilter?: ProductFilter;
};

const filterTags: Record<Exclude<ProductFilter, "All">, string> = {
  Runners: "Runner",
  Court: "Court",
  "High Top": "High Top",
  Restocks: "Restocks",
};

export function ProductGrid({ products, initialFilter = "All" }: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProductFilter>(initialFilter);
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [priceBand, setPriceBand] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const sizes = useMemo(() => [...new Set(products.flatMap((product) => product.variants.map((variant) => variant.size)))].sort(), [products]);
  const colors = useMemo(() => [...new Set(products.flatMap((product) => product.variants.map((variant) => variant.colorway)))].sort(), [products]);
  const activeAdvancedFilters = [selectedSize, selectedColor, priceBand, stockFilter].filter((value) => value !== "All").length;
  const visibleProducts = useMemo(() => {
    let filtered =
      activeFilter === "All"
        ? products
        : products.filter((product) =>
            product.tags.includes(filterTags[activeFilter]),
          );

    if (selectedSize !== "All") {
      filtered = filtered.filter((product) => product.variants.some((variant) => variant.size === selectedSize && variant.availableForSale));
    }

    if (selectedColor !== "All") {
      filtered = filtered.filter((product) => product.variants.some((variant) => variant.colorway === selectedColor));
    }

    if (priceBand !== "All") {
      filtered = filtered.filter((product) => {
        const price = priceToCents(product.price) / 100;
        if (priceBand === "under-3000") return price < 3000;
        if (priceBand === "3000-3600") return price >= 3000 && price <= 3600;
        return price > 3600;
      });
    }

    if (stockFilter === "In stock") {
      filtered = filtered.filter((product) => product.variants.some((variant) => variant.availableForSale));
    }

    if (stockFilter === "Sale") {
      filtered = filtered.filter((product) => Boolean(product.compareAtPrice));
    }

    if (sort === "price-low") {
      return [...filtered].sort((a, b) => priceToCents(a.price) - priceToCents(b.price));
    }

    if (sort === "price-high") {
      return [...filtered].sort((a, b) => priceToCents(b.price) - priceToCents(a.price));
    }

    return filtered;
  }, [activeFilter, priceBand, products, selectedColor, selectedSize, sort, stockFilter]);

  function clearFilters() {
    setActiveFilter("All");
    setSelectedSize("All");
    setSelectedColor("All");
    setPriceBand("All");
    setStockFilter("All");
  }

  return (
    <>
      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <ProductFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="flex items-center gap-2 self-end xl:self-auto">
          <button type="button" onClick={() => setShowFilters((current) => !current)} className="flex h-10 items-center gap-2 rounded-md border border-brand-ink/15 bg-white px-3 text-sm font-semibold uppercase text-brand-ink hover:border-brand-ink" aria-expanded={showFilters}>
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Filters{activeAdvancedFilters ? ` (${activeAdvancedFilters})` : ""}
          </button>
          <label className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-brand-ink/60">
            <span className="hidden sm:inline">Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 rounded-md border border-brand-ink/15 bg-white px-3 text-sm font-semibold uppercase text-brand-ink outline-none focus:border-brand-ink">
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {showFilters ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="mb-6 grid gap-4 border-y border-brand-ink/10 bg-white px-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
              <label className="grid gap-2 text-xs font-bold uppercase text-brand-ink/55">Available size<select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)} className="h-11 rounded-md border border-brand-ink/15 bg-background px-3 text-sm font-semibold text-brand-ink outline-none focus:border-brand-ink"><option>All</option>{sizes.map((size) => <option key={size}>{size}</option>)}</select></label>
              <label className="grid gap-2 text-xs font-bold uppercase text-brand-ink/55">Colour<select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)} className="h-11 rounded-md border border-brand-ink/15 bg-background px-3 text-sm font-semibold text-brand-ink outline-none focus:border-brand-ink"><option>All</option>{colors.map((color) => <option key={color}>{color}</option>)}</select></label>
              <label className="grid gap-2 text-xs font-bold uppercase text-brand-ink/55">Price<select value={priceBand} onChange={(event) => setPriceBand(event.target.value)} className="h-11 rounded-md border border-brand-ink/15 bg-background px-3 text-sm font-semibold text-brand-ink outline-none focus:border-brand-ink"><option value="All">All prices</option><option value="under-3000">Under R 3 000</option><option value="3000-3600">R 3 000 - R 3 600</option><option value="over-3600">Over R 3 600</option></select></label>
              <label className="grid gap-2 text-xs font-bold uppercase text-brand-ink/55">Status<select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)} className="h-11 rounded-md border border-brand-ink/15 bg-background px-3 text-sm font-semibold text-brand-ink outline-none focus:border-brand-ink"><option>All</option><option>In stock</option><option>Sale</option></select></label>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="mb-5 flex items-center justify-between gap-4 text-sm text-brand-ink/55">
        <p>{visibleProducts.length} {visibleProducts.length === 1 ? "style" : "styles"}</p>
        {(activeFilter !== "All" || activeAdvancedFilters > 0) ? <button type="button" onClick={clearFilters} className="flex items-center gap-1 font-bold uppercase text-brand-ink"><X className="h-4 w-4" aria-hidden="true" /> Clear filters</button> : null}
      </div>
      {visibleProducts.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border-y border-brand-ink/10 py-20 text-center">
          <p className="font-display text-3xl font-bold uppercase text-brand-ink">
            No pairs in this drop yet
          </p>
          <button
            type="button"
            className="mt-4 text-sm font-bold uppercase text-brand-red"
            onClick={clearFilters}
          >
            View all sneakers
          </button>
        </div>
      )}
    </>
  );
}
