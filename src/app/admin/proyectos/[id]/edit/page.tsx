import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProject } from "@/lib/projects/store";
import { ProjectForm } from "@/components/admin/project-form";
import { ImageUploader } from "@/components/admin/image-uploader";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div className="container-ef py-12 max-w-3xl">
      <Link
        href="/admin/proyectos"
        className="inline-flex items-center gap-2 text-sm text-ef-dim hover:text-ef-white transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        Volver a proyectos
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight mb-8">
        {project.title}
      </h1>

      {/* Fotos */}
      <section className="mb-12">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ef-dim/50 mb-4">
          Fotos del carrusel
        </h2>
        <ImageUploader
          id={project.id}
          images={project.images}
          coverIndex={project.coverIndex}
        />
      </section>

      {/* Datos */}
      <section>
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ef-dim/50 mb-4">
          Datos del proyecto
        </h2>
        <ProjectForm project={project} />
      </section>
    </div>
  );
}
