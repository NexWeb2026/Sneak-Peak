import { SavedProducts } from "@/components/saved/SavedProducts";

export default function SavedPage() {
  return (
    <main className="min-h-[75vh] bg-background px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Your shortlist</p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-none text-brand-ink sm:text-5xl md:text-7xl">Saved pairs</h1>
        <p className="mb-10 mt-5 max-w-2xl text-base leading-7 text-brand-ink/70">Keep the contenders close while you decide what earns the next spot in your rotation.</p>
        <SavedProducts />
      </div>
    </main>
  );
}
