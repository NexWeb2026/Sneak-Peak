import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-ink/10 bg-brand-ink text-brand-bone">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-3xl font-bold uppercase">Sneak-Peak</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-brand-bone/70">
            Premium sneaker drops, curated classics, and future-facing footwear,
            delivered across South Africa.
          </p>
        </div>
        <div className="grid gap-3 text-sm">
          <p className="font-semibold uppercase text-brand-bone">Explore</p>
          <Link href="/shop" className="text-brand-bone/70 hover:text-brand-bone">
            Shop
          </Link>
          <Link href="/about" className="text-brand-bone/70 hover:text-brand-bone">
            About
          </Link>
          <Link href="/drops" className="text-brand-bone/70 hover:text-brand-bone">
            Drop calendar
          </Link>
          <Link href="/cart" className="text-brand-bone/70 hover:text-brand-bone">
            Cart
          </Link>
        </div>
        <div className="grid gap-3 text-sm">
          <p className="font-semibold uppercase text-brand-bone">Drop Desk</p>
          <span className="text-brand-bone/70">Early access</span>
          <span className="text-brand-bone/70">Size guide</span>
          <Link href="/policies/returns" className="text-brand-bone/70 hover:text-brand-bone">
            Returns
          </Link>
        </div>
        <div className="grid gap-3 text-sm">
          <p className="font-semibold uppercase text-brand-bone">Legal</p>
          <Link href="/policies/terms" className="text-brand-bone/70 hover:text-brand-bone">
            Terms and conditions
          </Link>
          <Link href="/policies/privacy" className="text-brand-bone/70 hover:text-brand-bone">
            Privacy notice
          </Link>
          <Link href="/policies/shipping" className="text-brand-bone/70 hover:text-brand-bone">
            Shipping policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
