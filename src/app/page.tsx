import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Differentials } from "@/components/home/differentials";
import { Gallery } from "@/components/home/gallery";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { CTAFinal } from "@/components/home/cta-final";

export const metadata: Metadata = {
  title: "efstudio — Muebles Modernos Tecnológicos",
  description:
    "Muebles modernos de melamina premium con LED, USB y carga inalámbrica. Diseño minimalista y fabricación premium en Argentina.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Differentials />
      <Gallery />
      <ProcessTimeline />
      <CTAFinal />
    </>
  );
}
