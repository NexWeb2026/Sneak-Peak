import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DropCalendar } from "@/components/drops/DropCalendar";

export function UpcomingDrops() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Release radar</p><h2 className="mt-3 font-display text-5xl font-bold uppercase leading-none text-brand-ink md:text-6xl">Upcoming drops</h2></div>
          <Link href="/drops" className="hidden items-center gap-2 text-sm font-bold uppercase text-brand-ink sm:flex">Full calendar <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <DropCalendar compact />
      </div>
    </section>
  );
}
