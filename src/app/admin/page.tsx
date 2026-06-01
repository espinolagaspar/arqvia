import Link from "next/link";
import { FolderOpen, LayoutGrid } from "lucide-react";

export const dynamic = "force-dynamic";

const sections = [
  {
    href: "/admin/proyectos",
    icon: FolderOpen,
    title: "Proyectos",
    description: "Portfolio: proyectos realizados con fotos y carrusel.",
  },
  {
    href: "/admin/productos",
    icon: LayoutGrid,
    title: "Catálogo",
    description: "Productos del catálogo con fotos, colores y specs.",
  },
];

export default function AdminHome() {
  return (
    <div className="container-ef py-12">
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="glass glass-hover rounded-lg p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm mb-5 bg-white/[0.04]">
                <Icon size={18} className="text-ef-dim" />
              </div>
              <h2 className="text-base font-medium text-ef-white mb-2">
                {s.title}
              </h2>
              <p className="text-sm text-ef-dim font-light leading-relaxed">
                {s.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
