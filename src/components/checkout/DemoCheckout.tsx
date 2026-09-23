"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { formatPrice, priceToCents } from "@/lib/money";
import { useSneakPeakStore } from "@/lib/store";

const fieldClass =
  "h-12 w-full rounded-md border border-brand-ink/15 bg-white px-4 text-sm text-brand-ink outline-none transition-colors placeholder:text-brand-ink/35 focus:border-brand-ink";

const provinces = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

export function DemoCheckout() {
  const [isComplete, setIsComplete] = useState(false);
  const { cartLines, clearLocalCart } = useSneakPeakStore();
  const subtotal = cartLines.reduce(
    (total, line) => total + priceToCents(line.product.price) * line.quantity,
    0,
  );

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsComplete(true);
    clearLocalCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (isComplete) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-ink text-2xl text-brand-bone">
          &#10003;
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
          Demo order confirmed
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none text-brand-ink md:text-7xl">
          Your pair is reserved
        </h1>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-brand-ink/65">
          This completes the storefront demo. A live Shopify connection would
          now create the order and send the customer their confirmation email.
        </p>
        <Button href="/shop" className="mt-8">
          Continue shopping
        </Button>
      </div>
    );
  }

  if (!cartLines.length) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <h1 className="font-display text-5xl font-bold uppercase text-brand-ink">
          Nothing to check out yet
        </h1>
        <p className="mt-4 text-brand-ink/60">Add a sneaker before continuing.</p>
        <Button href="/shop" className="mt-7">
          Shop the collection
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
      <form onSubmit={submitOrder} className="grid gap-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
            Demo checkout
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none text-brand-ink md:text-7xl">
            Delivery details
          </h1>
        </div>
        <fieldset className="grid gap-4">
          <legend className="mb-4 font-display text-2xl font-bold uppercase text-brand-ink">
            Contact
          </legend>
          <input className={fieldClass} type="email" name="email" autoComplete="email" placeholder="Email address" required />
          <input className={fieldClass} type="tel" name="phone" autoComplete="tel" placeholder="Mobile number" required />
        </fieldset>
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-4 font-display text-2xl font-bold uppercase text-brand-ink sm:col-span-2">
            Shipping address
          </legend>
          <input className={fieldClass} name="firstName" autoComplete="given-name" placeholder="First name" required />
          <input className={fieldClass} name="lastName" autoComplete="family-name" placeholder="Last name" required />
          <input className={`${fieldClass} sm:col-span-2`} name="address" autoComplete="street-address" placeholder="Street address" required />
          <input className={fieldClass} name="suburb" autoComplete="address-level3" placeholder="Suburb" required />
          <input className={fieldClass} name="city" autoComplete="address-level2" placeholder="City or town" required />
          <select className={fieldClass} name="province" autoComplete="address-level1" defaultValue="" required>
            <option value="" disabled>Select province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          <input className={fieldClass} name="postalCode" autoComplete="postal-code" inputMode="numeric" placeholder="Postal code" required />
          <input className={`${fieldClass} sm:col-span-2`} name="country" value="South Africa" readOnly aria-label="Country" />
        </fieldset>
        <div className="rounded-md border border-brand-ink/10 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-ink/50">Payment</p>
          <p className="mt-2 text-sm leading-6 text-brand-ink/65">
            This is a presentation checkout. No payment details are collected
            and no charge will be made.
          </p>
        </div>
        <label className="flex items-start gap-3 text-sm leading-6 text-brand-ink/65">
          <input type="checkbox" name="legalConsent" className="mt-1 h-4 w-4 accent-brand-ink" required />
          <span>
            I agree to the <Link href="/policies/terms" className="font-semibold text-brand-ink underline underline-offset-2">Terms and Conditions</Link> and acknowledge the <Link href="/policies/privacy" className="font-semibold text-brand-ink underline underline-offset-2">Privacy Notice</Link>.
          </span>
        </label>
        <Button type="submit" className="w-full sm:w-auto sm:justify-self-start">
          Place demo order
        </Button>
      </form>

      <aside className="rounded-md border border-brand-ink/10 bg-white p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-3xl font-bold uppercase text-brand-ink">Your order</h2>
        <div className="mt-5 grid gap-4">
          {cartLines.map((line) => (
            <div key={line.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
              <div className="relative aspect-square overflow-hidden rounded-md bg-brand-smoke">
                <Image src={line.product.images[0].src} alt={line.product.images[0].alt} fill sizes="64px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-ink">{line.product.title}</p>
                <p className="mt-1 text-xs text-brand-ink/50">{line.size} / Qty {line.quantity}</p>
              </div>
              <p className="text-sm font-bold text-brand-ink">
                {formatPrice(priceToCents(line.product.price) * line.quantity)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between border-t border-brand-ink/10 pt-5 text-lg font-bold text-brand-ink">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-3 text-xs leading-5 text-brand-ink/50">
          Prices are in South African rand. VAT is included where applicable.
        </p>
      </aside>
    </div>
  );
}
