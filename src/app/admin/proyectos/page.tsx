import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ImageOff, LogOut } from "lucide-react";
import { getProjects, isBlobConfigured } from "@/lib/projects/store";
import { createProjectAction, logoutAction } from "@/app/admin/actions";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";

export const dynamic = "force-dynamic";

export default async function AdminProyectosPage() {
  const projects = await getProjects();

  return (
    <div className="container-ef py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold tracking-tight">Proyectos</h1>
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
      <p className="text-sm text-ef-dim font-light mb-8">
        {projects.length} proyecto{projects.length !== 1 ? "s" : ""} · se ven en{" "}
        <Link href="/proyectos" className="underline hover:text-ef-white">
          /proyectos
        </Link>
      </p>

      {!isBlobConfigured() && (
        <div className="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/[0.06] p-4 text-xs text-yellow-200/80 font-light">
          Vercel Blob todavía no está configurado (falta{" "}
          <code className="text-yellow-100">BLOB_READ_WRITE_TOKEN</code>). Estás
          viendo los datos de ejemplo y los cambios no se van a guardar.
        </div>
      )}

      {/* New project */}
      <form action={createProjectAction} className="mb-6">
        <button
          type="submit"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={16} />
          Nuevo proyecto
        </button>
      </form>

      {/* List */}
      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => {
          const cover = project.images[project.coverIndex] ?? project.images[0];
          return (
            <div
              key={project.id}
              className="glass rounded-lg p-4 flex items-center gap-4"
            >
              <div className="relative w-20 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-white/[0.04]">
                {cover ? (
                  <Image
                    src={cover.url}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ef-dim/40">
                    <ImageOff size={18} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-ef-white truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-ef-dim font-light truncate">
                  {[project.category, project.location, project.year]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p className="text-[11px] text-ef-dim/60 mt-0.5">
                  {project.images.length} foto
                  {project.images.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <Link
                  href={`/admin/proyectos/${project.id}/edit`}
                  className="flex items-center gap-1.5 text-xs text-ef-dim hover:text-ef-white transition-colors"
                >
                  <Pencil size={13} />
                  Editar
                </Link>
                <DeleteProjectButton id={project.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
