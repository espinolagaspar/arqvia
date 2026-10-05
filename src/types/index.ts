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
  accentColor: "blue" | "red";
  /** Carrusel de fotos. Vacío = se usa el gradiente de fallback. */
  images: ProjectImage[];
  /** Índice dentro de images[] que se usa como portada. */
  coverIndex: number;
  /** Fallback visual cuando no hay fotos. */
  gradient?: string;
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
  /** Único, kebab-case. Define la URL /proyectos/[slug]. */
  slug: string;
  /** "Cocina integral", "Vestidor", ... */
  type: string;
  /** Una línea para cards. */
  summary: string;
  /** Texto largo del detalle. */
  body?: string;
  /** ["Laqueado mate", "Herrajes europeos"] */
  materials?: string[];
  /** ["Diseño", "Fabricación", "Instalación"] */
  scope?: string[];
  /** Aparece en la home. */
  featured?: boolean;
  order?: number;
  /** Carrusel de fotos. Vacío = se usa el placeholder de color. */
  images: ProjectImage[];
  /** Índice dentro de images[] que se usa como portada. */
  coverIndex: number;
  /** @deprecated ya no se muestra; se conserva por compatibilidad con el manifest. */
  location: string;
  /** @deprecated reemplazado por `type`. */
  category: string;
  /** @deprecated reemplazado por `summary` y `body`. */
  description: string;
  /** @deprecated reemplazado por `materials`. */
  tags: string[];
  /** @deprecated ya no se muestra. */
  year: string;
  /** @deprecated */
  accentColor: "blue" | "red";
  /** @deprecated */
  gradient?: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  /** Ruta en /public. Sin imagen se muestra el placeholder de color. */
  image?: string;
}
