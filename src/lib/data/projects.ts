import type { Project } from "@/types";

/**
 * Datos iniciales de proyectos. Se usan como fallback cuando todavía no hay
 * un manifest cargado en Vercel Blob (ej: en desarrollo sin token configurado).
 * Una vez que el admin guarda por primera vez, la fuente de verdad pasa a ser
 * el `projects.json` del Blob. Ver `src/lib/projects/store.ts`.
 */
export const SEED_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Suite Ejecutiva CABA",
    location: "Palermo, Buenos Aires",
    category: "Dormitorio Premium",
    description:
      "Transformación completa de suite principal con placard a medida, cama tapizada con LED, mesitas flotantes con carga inalámbrica y espejo LED panorámico.",
    tags: ["LED", "Flotante", "Premium", "Carga inalámbrica"],
    year: "2024",
    images: [],
    coverIndex: 0,
    accentColor: "blue",
    gradient: "from-blue-950 via-slate-900 to-black",
  },
  {
    id: "2",
    title: "Home Office Arquitectónico",
    location: "Nordelta, Buenos Aires",
    category: "Oficina & Estudio",
    description:
      "Estudio profesional con escritorio doble en L, biblioteca modular retroiluminada, rack técnico y gestión de cables profesional integrada.",
    tags: ["Home Office", "LED", "Modular", "USB-C Hub"],
    year: "2024",
    images: [],
    coverIndex: 0,
    accentColor: "blue",
    gradient: "from-slate-900 via-zinc-900 to-black",
  },
  {
    id: "3",
    title: "Living Minimalista",
    location: "San Isidro, Buenos Aires",
    category: "Living & Comedor",
    description:
      "Living contemporáneo con rack TV flotante, biblioteca arquitectónica de doble altura y mueble de entretenimiento con retroiluminación ambiental.",
    tags: ["Flotante", "Minimalista", "LED ambiental"],
    year: "2023",
    images: [],
    coverIndex: 0,
    accentColor: "blue",
    gradient: "from-indigo-950 via-slate-900 to-black",
  },
  {
    id: "4",
    title: "Cocina Moderna Premium",
    location: "Puerto Madero, Buenos Aires",
    category: "Cocina",
    description:
      "Cocina integral de diseño europeo con iluminación LED bajo mueble, electrodomésticos integrados e isla central con carga inalámbrica.",
    tags: ["Cocina", "LED bajo mueble", "Premium", "Isla"],
    year: "2023",
    images: [],
    coverIndex: 0,
    accentColor: "blue",
    gradient: "from-zinc-900 via-neutral-900 to-black",
  },
];
