import type { Material } from "@/types";

/**
 * Materiales y terminaciones de la home. Cuando estén las fotos, subirlas a
 * /public/images/materiales/<id>.webp y completar `image` en cada ítem; sin
 * `image` se muestra el placeholder de color.
 */
export const MATERIALS: Material[] = [
  {
    id: "melamina",
    name: "Melamina",
    description: "Lisos y texturas madera, para uso diario intenso.",
  },
  {
    id: "enchapados",
    name: "Enchapados",
    description: "Chapa de madera natural sobre tablero.",
  },
  {
    id: "laqueados",
    name: "Laqueados",
    description:
      "Superficies continuas, mate o brillantes, en el color que elijas.",
  },
  {
    id: "madera",
    name: "Madera",
    description: "Madera maciza para piezas y detalles.",
  },
  {
    id: "herrajes",
    name: "Herrajes",
    description: "Bisagras, correderas y guías europeas.",
  },
  {
    id: "aperturas",
    name: "Sistemas de apertura",
    description: "Push, gola, tirador integrado o puertas corredizas.",
  },
];
