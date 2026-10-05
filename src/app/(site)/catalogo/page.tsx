import type { Metadata } from "next";
import { CatalogClient } from "./catalog-client";
import { getProducts } from "@/lib/products/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Piezas",
  description:
    "Piezas de mobiliario a medida de ARQVIA para dormitorio, living, oficina y cocina. Fabricación propia e instalación incluida en CABA y GBA.",
};

export default async function CatalogoPage() {
  const products = await getProducts();
  return <CatalogClient products={products} />;
}
