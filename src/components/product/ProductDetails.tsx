import { ChevronDown } from "lucide-react";
import type { Product } from "@/types/product";

export function ProductDetails({ product }: { product: Product }) {
  const sections = [
    { title: "Product details", content: product.features ?? [product.description] },
    { title: "Materials and care", content: product.materials ?? ["Wipe clean with a soft, damp cloth."] },
    { title: "Delivery and returns", content: ["Free standard delivery within South Africa.", "Unworn pairs may be returned within 30 days. Statutory rights remain unaffected."] },
  ];

  return (
    <div className="mt-6 divide-y divide-brand-ink/10 border-y border-brand-ink/10">
      {sections.map((section, index) => (
        <details key={section.title} className="group" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-bold uppercase text-brand-ink">
            {section.title}<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <ul className="grid gap-2 pb-5 text-sm leading-6 text-brand-ink/65">
            {section.content.map((item) => <li key={item}>{item}</li>)}
            {index === 0 && product.productCode ? <li>Product code: {product.productCode}</li> : null}
          </ul>
        </details>
      ))}
    </div>
  );
}
