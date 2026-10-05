import Link from "next/link";
import { CoverImage } from "@/components/shared/cover-image";
import { SectionLabel } from "@/components/shared/section-label";
import { projectCover } from "@/lib/projects/store";
import type { Project } from "@/types";

/** Listado de proyectos en formato índice, con líneas entre ítems. */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="border-t border-arq-line py-10 text-[15px] text-arq-stone">
        Todavía no hay proyectos publicados.
      </p>
    );
  }

  return (
    <ul className="flex flex-col border-t border-arq-line">
      {projects.map((project, i) => (
        <li key={project.id} className="border-b border-arq-line">
          <Link
            href={`/proyectos/${project.slug}`}
            className="group grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-x-[clamp(20px,4vw,64px)] gap-y-5 py-[clamp(24px,3vw,40px)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-arq-sand">
              <CoverImage
                image={projectCover(project)}
                alt={`${project.title} — ${project.type}`}
                sizes="(min-width: 700px) 46vw, 92vw"
                className="transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-[14px]">
              <SectionLabel>
                {String(i + 1).padStart(2, "0")}
                {project.type && ` · ${project.type}`}
              </SectionLabel>
              <h2 className="font-serif text-[clamp(34px,4vw,60px)] font-light leading-none tracking-[-0.02em]">
                {project.title}
              </h2>
              <p className="max-w-[440px] text-[15px] leading-[1.55] text-arq-stone">
                {project.summary}
              </p>
              <span className="text-[14px] transition-colors group-hover:text-arq-wood">
                Ver proyecto →
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
