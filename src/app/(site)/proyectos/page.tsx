import type { Metadata } from "next";
import { ProjectIndex } from "@/components/proyectos/project-index";
import { ContactCTA } from "@/components/shared/contact-cta";
import { SectionLabel } from "@/components/shared/section-label";
import { getProjects } from "@/lib/projects/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de mobiliario a medida diseñados, fabricados e instalados por ARQVIA en CABA y GBA.",
};

export default async function ProyectosPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="pb-[clamp(64px,8vw,120px)] pt-[calc(64px+clamp(40px,6vw,88px))]">
        <div className="wrap">
          <div className="mb-[clamp(36px,5vw,72px)] flex flex-wrap items-end justify-between gap-5">
            <div className="flex flex-col gap-[18px]">
              <SectionLabel>Proyectos</SectionLabel>
              <h1 className="title-section">Proyectos seleccionados</h1>
            </div>
            <p className="max-w-[340px] text-pretty text-[15px] leading-[1.6] text-arq-stone">
              Cada proyecto se diseña para un espacio y una forma de usarlo.
            </p>
          </div>
          <ProjectIndex projects={projects} />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
