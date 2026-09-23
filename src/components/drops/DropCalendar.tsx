import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DropReminderButton } from "./DropReminderButton";
import { upcomingDrops } from "@/lib/drops";

export function DropCalendar({ compact = false }: { compact?: boolean }) {
  const drops = compact ? upcomingDrops.slice(0, 3) : upcomingDrops;

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {drops.map((drop, index) => (
        <article key={drop.id} className="overflow-hidden rounded-md border border-brand-ink/10 bg-white">
          <Link href={`/shop/${drop.handle}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-smoke">
              <Image src={drop.image} alt={drop.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-md bg-brand-ink px-3 py-2 text-xs font-bold uppercase text-brand-bone">Drop {String(index + 1).padStart(2, "0")}</span>
            </div>
          </Link>
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-red">{drop.displayDate} / {drop.time}</p><h3 className="mt-2 font-display text-3xl font-bold uppercase leading-none text-brand-ink">{drop.name}</h3><p className="mt-2 text-sm text-brand-ink/55">{drop.colourway}</p></div>
              <Link href={`/shop/${drop.handle}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-ink/15 text-brand-ink hover:border-brand-ink" aria-label={`View ${drop.name}`} title={`View ${drop.name}`}><ArrowUpRight className="h-5 w-5" aria-hidden="true" /></Link>
            </div>
            <div className="mt-5"><DropReminderButton dropId={drop.id} /></div>
          </div>
        </article>
      ))}
    </div>
  );
}
