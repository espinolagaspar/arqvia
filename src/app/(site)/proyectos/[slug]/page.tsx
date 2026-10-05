import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppMessage } from "@/components/layout/site-context";
import { ProjectDetail } from "@/components/proyectos/project-detail";
import { ContactCTA } from "@/components/shared/contact-cta";
import { getProjects, projectCover } from "@/lib/projects/store";

interface Props {
  params: Promise<{ slug: string }>;
}

// Igual que el resto del sitio: los proyectos se leen del Blob en cada request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return { title: "Proyecto no encontrado" };

  const cover = projectCover(project);
  const description = project.summary || undefined;

  return {
    title: project.title,
    description,
    openGraph: {
      title: `${project.title} | ARQVIA`,
      description,
      ...(cover && { images: [{ url: cover.url, alt: project.title }] }),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next =
    projects.length > 1 ? projects[(index + 1) % projects.length] : null;

  return (
    <>
      <WhatsAppMessage projectName={project.title} />
      <ProjectDetail
        project={project}
        number={String(index + 1).padStart(2, "0")}
        next={next}
      />
      <ContactCTA projectName={project.title} />
    </>
  );
}
