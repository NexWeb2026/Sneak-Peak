import Link from "next/link";

const collections = [
  { title: "Runners", copy: "Lightweight daily rotation", color: "bg-brand-volt" },
  { title: "Court", copy: "Low profiles and clean leather", color: "bg-brand-smoke" },
  { title: "Restocks", copy: "Second chances and archive pairs", color: "bg-brand-red text-white" },
];

export function CollectionTiles() {
  return (
    <section className="bg-brand-ink px-4 py-20 text-brand-bone sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {collections.map((collection) => (
          <Link
            href={`/shop?category=${encodeURIComponent(collection.title)}`}
            key={collection.title}
            className={`${collection.color} min-h-64 rounded-md p-6 text-brand-ink transition-transform hover:-translate-y-1`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">
              Collection
            </p>
            <h3 className="mt-16 font-display text-5xl font-bold uppercase leading-none">
              {collection.title}
            </h3>
            <p className="mt-4 text-sm font-semibold uppercase opacity-70">
              {collection.copy}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
