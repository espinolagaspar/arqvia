import type { Project } from "@/types";

const MOCK_BODY =
  "Proyecto de ejemplo. Acá va el relato del proyecto: qué pedía el espacio, qué decisiones de diseño se tomaron y cómo se resolvió la fabricación y la instalación.";

/** Campos viejos del modelo, vacíos: se conservan solo por compatibilidad. */
const LEGACY: Pick<
  Project,
  "location" | "category" | "description" | "tags" | "year" | "accentColor"
> = {
  location: "",
  category: "",
  description: "",
  tags: [],
  year: "",
  accentColor: "blue",
};

/**
 * Datos iniciales de proyectos. Se usan como fallback cuando todavía no hay
 * un manifest cargado en Vercel Blob (ej: en desarrollo sin token configurado).
 * Una vez que el admin guarda por primera vez, la fuente de verdad pasa a ser
 * el manifest del Blob. Ver `src/lib/projects/store.ts`.
 *
 * Las imágenes apuntan a archivos locales en /public/images (pathname vacío =
 * no viven en Blob, así que el admin no intenta borrarlas del store).
 */
export const SEED_PROJECTS: Project[] = [
  // MOCK
  {
    ...LEGACY,
    id: "1",
    slug: "cocina-negra",
    title: "Cocina Negra",
    type: "Cocina integral",
    summary:
      "Frentes negro mate, columnas hasta el techo y luz lineal bajo alacena.",
    body: MOCK_BODY,
    materials: ["Laqueado mate", "Herrajes europeos", "Apertura con gola"],
    scope: ["Diseño", "Fabricación", "Instalación"],
    featured: true,
    order: 1,
    images: [{ url: "/images/proyectos/cocina-negra.jpg", pathname: "" }],
    coverIndex: 0,
  },
  // MOCK
  {
    ...LEGACY,
    id: "2",
    slug: "vestidor-vidrio",
    title: "Vestidor Vidrio",
    type: "Vestidor",
    summary:
      "Puertas de vidrio con perfilería negra, interior iluminado y cajoneras a medida.",
    body: MOCK_BODY,
    materials: ["Melamina", "Perfilería de aluminio", "Puertas corredizas"],
    scope: ["Diseño", "Fabricación", "Instalación"],
    featured: true,
    order: 2,
    images: [{ url: "/images/proyectos/vestidor-vidrio.jpg", pathname: "" }],
    coverIndex: 0,
  },
  // MOCK
  {
    ...LEGACY,
    id: "3",
    slug: "living-flotante",
    title: "Living Flotante",
    type: "Mueble de living",
    summary:
      "Rack suspendido de lado a lado, panel ranurado y cajones con apertura push.",
    body: MOCK_BODY,
    materials: ["Enchapado", "Melamina", "Apertura push"],
    scope: ["Diseño", "Fabricación", "Instalación"],
    featured: true,
    order: 3,
    images: [{ url: "/images/proyectos/living-flotante.jpg", pathname: "" }],
    coverIndex: 0,
  },
];
