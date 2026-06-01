export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  features: string[];
  colors: ProductColor[];
  hasLED: boolean;
  hasUSB: boolean;
  hasWirelessCharging: boolean;
  isFloating: boolean;
  priceRange: string;
  slug: string;
  gradient: string;
  accentColor: "blue" | "red";
  image?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductCategory =
  | "dormitorio"
  | "living"
  | "oficina"
  | "cocina";

export interface ProjectImage {
  /** Public CDN URL del archivo en Vercel Blob */
  url: string;
  /** pathname dentro del blob store, necesario para borrarlo */
  pathname: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  /** Carrusel de fotos. Vacío = se usa el gradiente de fallback. */
  images: ProjectImage[];
  /** Índice dentro de images[] que se usa como portada. */
  coverIndex: number;
  accentColor: "blue" | "red";
  /** Fallback visual cuando todavía no hay fotos cargadas. */
  gradient?: string;
}

export interface Differential {
  icon: string;
  title: string;
  description: string;
  accentColor: "blue" | "red";
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
