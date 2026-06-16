import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Differentials } from "@/components/home/differentials";
import { Gallery } from "@/components/home/gallery";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { CTAFinal } from "@/components/home/cta-final";
import { getProducts } from "@/lib/products/store";
import { getProjects } from "@/lib/projects/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ARQVIA — Muebles Modernos Tecnológicos",
  description:
    "Muebles modernos de melamina premium con LED, USB y carga inalámbrica. Diseño minimalista y fabricación premium en Argentina.",
};

export default async function HomePage() {
  const [products, projects] = await Promise.all([
    getProducts(),
    getProjects(),
  ]);
  return (
    <>
      <Hero />
      <FeaturedProducts products={products.slice(0, 5)} />
      <Differentials />
      <Gallery projects={projects} />
      <ProcessTimeline />
      <CTAFinal />
    </>
  );
}
