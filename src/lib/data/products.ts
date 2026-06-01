import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "mesa-luz-led-flotante",
    name: "Mesa de Luz LED Flotante",
    category: "dormitorio",
    description:
      "Mesa de luz con iluminación LED RGB integrada, diseño flotante de melamina premium. Tira LED retroiluminada, compartimento oculto y carga inalámbrica integrada.",
    features: [
      "Tira LED RGB retroiluminada",
      "Diseño flotante",
      "Carga inalámbrica Qi",
      "Puerto USB-A + USB-C",
      "Compartimento con tapa magnética",
      "Melamina premium 18mm",
    ],
    colors: [
      { name: "Negro Mate", hex: "#1A1A1A" },
      { name: "Blanco Arctic", hex: "#F0F0F0" },
      { name: "Grafito", hex: "#2D2D2D" },
    ],
    hasLED: true,
    hasUSB: true,
    hasWirelessCharging: true,
    isFloating: true,
    priceRange: "Consultar",
    gradient: "from-blue-950 via-slate-900 to-black",
    accentColor: "blue",
    image: "/images/mesa-luz-led-flotante.png",
  },
  {
    id: "3",
    slug: "placard-moderno-led",
    name: "Placard Moderno con LED",
    category: "dormitorio",
    description:
      "Placard de melamina premium con iluminación LED interior automática, puertas batientes o corredizas y organización inteligente del espacio.",
    features: [
      "Iluminación LED automática por sensor",
      "Puertas de vidrio ahumado",
      "Cajoneras con guías full extension",
      "Espejo LED integrado opcional",
      "Melamina importada premium",
    ],
    colors: [
      { name: "Negro Mate", hex: "#1A1A1A" },
      { name: "Blanco Brillante", hex: "#FAFAFA" },
      { name: "Madera Natural", hex: "#A0785A" },
    ],
    hasLED: true,
    hasUSB: false,
    hasWirelessCharging: false,
    isFloating: false,
    priceRange: "Consultar",
    gradient: "from-slate-900 via-zinc-900 to-black",
    accentColor: "blue",
    image: "/images/placard-moderno-led.png",
  },
  {
    id: "4",
    slug: "mueble-tv-flotante",
    name: "Rack TV Flotante LED",
    category: "living",
    description:
      "Rack para TV de diseño arquitectónico flotante con retroiluminación LED ambiance, paneles texturizados y gestión de cables oculta.",
    features: [
      "LED ambiance retroiluminado",
      "Diseño flotante",
      "Paneles texturizados 3D",
      "Gestión de cables oculta",
      "Cajones con soft-close",
      "Compatible hasta 85\"",
    ],
    colors: [
      { name: "Negro Grafito", hex: "#141414" },
      { name: "Blanco Premium", hex: "#F5F5F5" },
    ],
    hasLED: true,
    hasUSB: true,
    hasWirelessCharging: false,
    isFloating: true,
    priceRange: "Consultar",
    gradient: "from-blue-950 via-indigo-950 to-black",
    accentColor: "blue",
  },
  {
    id: "5",
    slug: "escritorio-home-office",
    name: "Escritorio Home Office Premium",
    category: "oficina",
    description:
      "Escritorio minimalista para home office con diseño ergonómico, compartimentos organizadores, hub USB integrado y estética premium.",
    features: [
      "Hub USB-C + HDMI",
      "Organizador de cables magnético",
      "Cajonera con cerradura",
      "Superficie amplia 160cm",
      "Patas ajustables",
    ],
    colors: [
      { name: "Blanco Hueso", hex: "#F2F0EB" },
      { name: "Negro Mate", hex: "#1C1C1C" },
      { name: "Roble Natural", hex: "#C4956A" },
    ],
    hasLED: false,
    hasUSB: true,
    hasWirelessCharging: true,
    isFloating: false,
    priceRange: "Consultar",
    gradient: "from-zinc-900 via-neutral-900 to-black",
    accentColor: "blue",
    image: "/images/escritorio-home-office.png",
  },
  {
    id: "6",
    slug: "cama-tapizada-led",
    name: "Cama Tapizada con LED",
    category: "dormitorio",
    description:
      "Sommier tapizado de diseño moderno con cabecera con iluminación LED retroiluminada y mesitas de luz integradas con carga inalámbrica.",
    features: [
      "LED backlight en cabecera",
      "Mesitas integradas",
      "Carga inalámbrica bilateral",
      "Tapizado en polipiel premium",
      "Cajón baúl con gas hidráulico",
    ],
    colors: [
      { name: "Negro Premium", hex: "#0F0F0F" },
      { name: "Gris Perla", hex: "#C5C5C5" },
      { name: "Blanco Roto", hex: "#E8E4DC" },
    ],
    hasLED: true,
    hasUSB: false,
    hasWirelessCharging: true,
    isFloating: false,
    priceRange: "Consultar",
    gradient: "from-red-950 via-rose-950 to-black",
    accentColor: "red",
    image: "/images/cama-tapizada-led.png",
  },
  {
    id: "7",
    slug: "biblioteca-modular",
    name: "Biblioteca Modular Arquitectónica",
    category: "living",
    description:
      "Biblioteca modular de diseño arquitectónico con retroiluminación LED por estante, puertas de vidrio y configuración personalizable.",
    features: [
      "LED por estante independiente",
      "Puertas de vidrio con perfil negro",
      "Configuración modular",
      "Estantes a medida",
      "Fondo de espejo opcional",
    ],
    colors: [
      { name: "Negro Grafito", hex: "#1A1A1A" },
      { name: "Blanco Puro", hex: "#FFFFFF" },
      { name: "Roble oscuro", hex: "#5C4033" },
    ],
    hasLED: true,
    hasUSB: false,
    hasWirelessCharging: false,
    isFloating: false,
    priceRange: "Consultar",
    gradient: "from-slate-900 via-gray-900 to-black",
    accentColor: "blue",
    image: "/images/biblioteca-modular.png",
  },
];

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const featuredProducts = products.slice(0, 5);
