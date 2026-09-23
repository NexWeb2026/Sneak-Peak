"use client";

import { MapPin, Truck } from "lucide-react";
import { useState, type FormEvent } from "react";

export function DeliveryEstimator() {
  const [postalCode, setPostalCode] = useState("");
  const [estimate, setEstimate] = useState<string | null>(null);

  function checkDelivery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{4}$/.test(postalCode)) return;
    const metroRange = /^[012]/.test(postalCode) ? "2-4" : "3-7";
    setEstimate(`${metroRange} business days to ${postalCode}`);
  }

  return (
    <div className="mt-6 rounded-md border border-brand-ink/10 bg-white p-4">
      <div className="flex items-center gap-2 text-sm font-bold uppercase text-brand-ink"><Truck className="h-4 w-4" aria-hidden="true" /> Delivery estimate</div>
      <form onSubmit={checkDelivery} className="mt-3 flex gap-2">
        <div className="relative min-w-0 flex-1">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink/40" aria-hidden="true" />
          <input value={postalCode} onChange={(event) => { setPostalCode(event.target.value.replace(/\D/g, "").slice(0, 4)); setEstimate(null); }} inputMode="numeric" pattern="[0-9]{4}" required placeholder="SA postal code" aria-label="South African postal code" className="h-11 w-full rounded-md border border-brand-ink/15 pl-10 pr-3 text-sm outline-none focus:border-brand-ink" />
        </div>
        <button type="submit" className="h-11 rounded-md border border-brand-ink px-4 text-xs font-bold uppercase text-brand-ink transition-colors hover:bg-brand-ink hover:text-brand-bone">Check</button>
      </form>
      <p className="mt-3 min-h-5 text-sm text-brand-ink/60" aria-live="polite">{estimate ?? "Free standard delivery throughout South Africa."}</p>
    </div>
  );
}
