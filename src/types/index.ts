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
  | "gamer"
  | "cocina";

export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: "blue" | "red";
  year: string;
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
