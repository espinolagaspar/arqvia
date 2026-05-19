import type { Metadata } from "next";
import { CatalogClient } from "./catalog-client";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explorá el catálogo completo de muebles modernos de efstudio. Dormitorio, living, oficina, gamer y más con LED, USB y carga inalámbrica.",
};

export default function CatalogoPage() {
  return <CatalogClient />;
}
