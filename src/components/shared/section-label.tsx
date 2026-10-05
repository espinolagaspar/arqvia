import { cn } from "@/lib/utils";

/** Etiqueta de sección: "01 — Proyectos". */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("label", className)}>{children}</span>;
}
