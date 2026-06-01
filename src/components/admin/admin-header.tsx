import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

export function AdminHeader() {
  return (
    <header className="border-b border-ef-border sticky top-0 z-40 bg-ef-black/90 backdrop-blur-sm">
      <div className="container-ef flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-1.5">
            <span className="text-lg font-semibold tracking-tight text-ef-white">
              ef
            </span>
            <span className="text-lg font-light tracking-tight text-ef-dim">
              studio
            </span>
            <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-ef-dim/50">
              admin
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-4">
            <Link
              href="/admin/proyectos"
              className="text-xs text-ef-dim hover:text-ef-white transition-colors"
            >
              Proyectos
            </Link>
            <Link
              href="/admin/productos"
              className="text-xs text-ef-dim hover:text-ef-white transition-colors"
            >
              Catálogo
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/proyectos"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-ef-dim hover:text-ef-white transition-colors"
          >
            <ExternalLink size={13} />
            Ver sitio
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs text-ef-dim hover:text-ef-white transition-colors"
            >
              <LogOut size={13} />
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
