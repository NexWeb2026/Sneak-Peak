"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  RotatingSneaker,
  type RotatingSneakerHandle,
} from "./RotatingSneaker";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const foregroundRef = useRef<HTMLDivElement | null>(null);
  const sneakerRef = useRef<RotatingSneakerHandle | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!section || prefersReducedMotion) {
        return;
      }

      const matchMedia = gsap.matchMedia();
      matchMedia.add("(min-width: 768px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true,
          refreshPriority: 30,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const foreground = foregroundRef.current;

            sneakerRef.current?.setProgress(progress);

            if (foreground) {
              const opacity = Math.max(0, 1 - progress * 7);
              const offset = Math.min(36, progress * 140);
              foreground.style.opacity = `${opacity}`;
              foreground.style.pointerEvents = opacity > 0.25 ? "auto" : "none";
              foreground.style.transform = `translateY(-${offset}px)`;
            }
          },
        });

        return () => trigger.kill();
      });

      return () => matchMedia.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-brand-bone"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_64%_42%,rgba(220,63,44,0.18),transparent_34%)]" />
      <RotatingSneaker
        ref={sneakerRef}
        fill
        targetSize={8.15}
        verticalOffset={-0.25}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-16 z-0 opacity-95"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden text-center text-xs font-bold uppercase tracking-[0.18em] text-brand-ink/50 md:block">
        Scroll to reveal
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-16 sm:px-6 lg:px-8">
        <div
          ref={foregroundRef}
          className="pointer-events-auto mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
            Premium drops, first look
          </p>
          <h1 className="font-display text-7xl font-bold uppercase leading-[0.85] text-brand-ink sm:text-8xl lg:text-[10rem]">
            Sneak-Peak
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ink/70">
            Premium sneaker drops, hard-to-find restocks, and tomorrow&apos;s
            classics, curated in one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop">Shop the drop</Button>
            <Button href="/about" variant="secondary">
              Brand story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
