"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function BrandStory() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      gsap.fromTo(
        section.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-background px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p
          data-reveal
          className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red"
        >
          Built for launch energy
        </p>
        <h2
          data-reveal
          className="mt-5 font-display text-5xl font-bold uppercase leading-none text-brand-ink md:text-7xl"
        >
          Curated drops, precise detail pages, and a cart flow ready for real
          Shopify data.
        </h2>
        <p data-reveal className="mt-6 max-w-2xl text-lg leading-8 text-brand-ink/70">
          Sneak-Peak is scaffolded as a premium sneaker commerce foundation: a
          clean App Router structure, animation isolated to swappable components,
          and placeholder content that can be replaced without rethinking the
          architecture.
        </p>
      </div>
    </section>
  );
}
