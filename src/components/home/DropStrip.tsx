"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { placeholderProducts } from "@/lib/products";

const approachOffsets = [
  [-0.55, -0.22, -5],
  [0.48, 0.26, 4],
  [-0.38, 0.34, -3],
  [0.58, -0.18, 5],
  [-0.46, -0.32, -4],
  [0.34, 0.2, 3],
  [-0.28, 0.28, -2],
  [0.42, -0.24, 4],
] as const;

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function DropStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;

      if (!section) {
        return;
      }

      const items = Array.from(
        section.querySelectorAll<HTMLElement>("[data-depth-item]"),
      );
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        items.forEach((item, index) => {
          item.style.opacity = index === 0 ? "1" : "0";
          item.style.transform =
            "translate(-50%, -50%) translate3d(0, 0, 0) rotate(0deg)";
        });
        return;
      }

      const overlap = 0.72;
      const timelineLength = (items.length - 1) * overlap + 1;

      const renderScene = (progress: number) => {
        const timelinePosition = progress * timelineLength;

        if (heading) {
          heading.style.opacity = `${clamp(1 - progress * 16)}`;
          heading.style.transform = `translateY(${-clamp(progress * 12) * 24}px)`;
        }

        items.forEach((item, index) => {
          const phase = clamp(timelinePosition - index * overlap);
          const approach = clamp(phase / 0.68);
          const easedApproach = Math.pow(approach, 1.45);
          const departure = clamp((phase - 0.82) / 0.18);
          const [offsetX, offsetY, rotation] =
            approachOffsets[index % approachOffsets.length];
          const x = offsetX * window.innerWidth * 0.32 * (1 - easedApproach);
          const y = offsetY * window.innerHeight * 0.28 * (1 - easedApproach);
          const z = -1900 + easedApproach * 1820 + departure * 430;
          const fadeIn = clamp(phase / 0.16);
          const fadeOut = 1 - departure;
          const opacity = Math.min(fadeIn, fadeOut);

          item.style.opacity = `${opacity}`;
          item.style.pointerEvents = phase > 0.3 && phase < 0.78 ? "auto" : "none";
          item.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotate(${rotation * (1 - easedApproach)}deg)`;
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * items.length * 0.72}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        refreshPriority: 20,
        invalidateOnRefresh: true,
        onRefresh: (self) => renderScene(self.progress),
        onUpdate: (self) => renderScene(self.progress),
      });

      renderScene(trigger.progress);

      return () => trigger.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[620px] overflow-hidden bg-brand-ink text-brand-bone [perspective:1000px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.07),transparent_48%)]" />

      <div
        ref={headingRef}
        className="pointer-events-none absolute inset-x-4 top-24 z-20 text-center will-change-transform sm:inset-x-6"
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
          Seasonal edit
        </p>
        <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-none md:text-7xl">
          Move through the rotation
        </h2>
      </div>

      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {placeholderProducts.map((product, index) => (
          <Link
            key={product.id}
            href={`/shop/${product.handle}`}
            aria-label={`View ${product.title}`}
            data-depth-item
            className="group absolute left-1/2 top-1/2 h-[48vh] min-h-[330px] max-h-[620px] w-[78vw] max-w-[760px] opacity-0 will-change-[transform,opacity] md:h-[62vh] md:w-[52vw]"
          >
            <Image
              src={`/gallery-cutouts/normalized/${product.handle}.png`}
              alt={product.images[0].alt}
              fill
              priority={index === 0}
              sizes="(min-width: 768px) 52vw, 78vw"
              className="object-contain drop-shadow-[0_28px_38px_rgba(0,0,0,0.5)] transition-[filter] duration-700 group-hover:brightness-110"
            />
          </Link>
        ))}
      </div>

      <p className="pointer-events-none absolute bottom-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] text-brand-bone/45">
        Scroll to move through
      </p>
    </section>
  );
}
