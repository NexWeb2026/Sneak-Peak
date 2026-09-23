export const productFilters = ["All", "Runners", "Court", "High Top", "Restocks"] as const;
export type ProductFilter = (typeof productFilters)[number];

type ProductFiltersProps = {
  activeFilter: ProductFilter;
  onFilterChange: (filter: ProductFilter) => void;
};

export function ProductFilters({
  activeFilter,
  onFilterChange,
}: ProductFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {productFilters.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={activeFilter === filter}
          onClick={() => onFilterChange(filter)}
          className={`h-10 shrink-0 rounded-md border px-4 text-sm font-semibold uppercase transition-colors ${
            activeFilter === filter
              ? "border-brand-ink bg-brand-ink text-brand-bone"
              : "border-brand-ink/15 bg-white text-brand-ink hover:border-brand-ink"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
