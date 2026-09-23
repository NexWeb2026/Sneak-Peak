import { SectionHeading } from "@/components/ui/SectionHeading";

export default function AboutPage() {
  return (
    <div className="bg-background px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="About"
          title="Good pairs deserve a closer look"
          copy="Sneak-Peak brings standout releases, trusted classics, and considered service together for collectors and everyday wearers."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            "Curated product drops",
            "Details worth slowing down for",
            "Service without the runaround",
          ].map((item) => (
            <div
              key={item}
              className="rounded-md border border-brand-ink/10 bg-white p-6"
            >
              <h2 className="font-display text-3xl font-bold uppercase text-brand-ink">
                {item}
              </h2>
              <p className="mt-4 text-sm leading-6 text-brand-ink/65">
                Every release is selected with wearability, construction, and
                long-term rotation value in mind.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
