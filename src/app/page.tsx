import { BrandStory } from "@/components/home/BrandStory";
import { CollectionTiles } from "@/components/home/CollectionTiles";
import { DropStrip } from "@/components/home/DropStrip";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { Hero } from "@/components/home/Hero";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { TerrexShowcase } from "@/components/home/TerrexShowcase";
import { UpcomingDrops } from "@/components/home/UpcomingDrops";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <DropStrip />
      <FeaturedProduct />
      <TerrexShowcase />
      <UpcomingDrops />
      <CollectionTiles />
      <BrandStory />
    </>
  );
}
