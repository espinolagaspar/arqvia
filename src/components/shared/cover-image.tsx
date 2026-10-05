import Image from "next/image";
import type { ProjectImage } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Foto a sangre dentro de un contenedor `relative` con alto definido. Sin
 * imagen no renderiza nada: queda a la vista el color de fondo del contenedor.
 */
export function CoverImage({
  image,
  alt,
  sizes,
  preload = false,
  className,
}: {
  image: ProjectImage | null | undefined;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  if (!image) return null;
  return (
    <Image
      src={image.url}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      className={cn("object-cover", className)}
    />
  );
}
