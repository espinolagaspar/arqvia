import type { Metadata } from "next";
import { CatalogClient } from "./catalog-client";
import { getProducts } from "@/lib/products/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explorá el catálogo completo de muebles modernos de ARQVIA. Dormitorio, living, oficina y cocina con LED, USB y carga inalámbrica.",
};

export default async function CatalogoPage() {
  const products = await getProducts();
  return <CatalogClient products={products} />;
}
