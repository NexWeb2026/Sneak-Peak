import { DropCalendar } from "@/components/drops/DropCalendar";

export default function DropsPage() {
  return (
    <main className="min-h-[75vh] bg-background px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Release radar</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold uppercase leading-none text-brand-ink sm:text-5xl md:text-7xl">The next pairs worth watching</h1>
        <p className="mb-10 mt-5 max-w-2xl text-base leading-7 text-brand-ink/70">Set a reminder for upcoming Sneak-Peak releases. Your selections stay saved on this device for the demo.</p>
        <DropCalendar />
      </div>
    </main>
  );
}
