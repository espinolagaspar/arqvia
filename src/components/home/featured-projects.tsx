import Link from "next/link";
import { CoverImage } from "@/components/shared/cover-image";
import { Reveal } from "@/components/shared/reveal";
import { SectionLabel } from "@/components/shared/section-label";
import { projectCover } from "@/lib/projects/store";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

function ProjectCaption({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <h3 className="font-serif text-[clamp(28px,3vw,40px)] font-light tracking-[-0.01em]">
          {project.title}
        </h3>
        <SectionLabel>{project.type}</SectionLabel>
      </div>
      <p className="max-w-[460px] text-pretty text-[15px] leading-[1.55] text-arq-stone">
        {project.summary}
      </p>
    </>
  );
}

function ProjectPhoto({
  project,
  sizes,
  className,
}: {
  project: Project;
  sizes: string;
  className: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-arq-sand", className)}>
      <CoverImage
        image={projectCover(project)}
        alt={`${project.title} — ${project.type}`}
        sizes={sizes}
        className="transition-transform duration-700 group-hover:scale-[1.03]"
      />
    </div>
  );
}

/** Grilla editorial con los proyectos destacados (hasta 3). */
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [first, second, third] = projects;

  return (
    <section
      id="proyectos"
      className="pb-[clamp(64px,8vw,120px)] pt-[clamp(80px,11vw,160px)]"
    >
      <div className="wrap">
        <div className="mb-[clamp(36px,5vw,72px)] flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-[18px]">
            <SectionLabel>01 — Proyectos</SectionLabel>
            <h2 className="title-section">Proyectos seleccionados</h2>
          </div>
          <p className="max-w-[340px] text-pretty text-[15px] leading-[1.6] text-arq-stone">
            Cada proyecto se diseña para un espacio y una forma de usarlo.
          </p>
        </div>

        <div className="flex flex-col gap-[clamp(56px,7vw,112px)]">
          {first && (
            <Reveal>
              <Link
                href={`/proyectos/${first.slug}`}
                className="group flex flex-col gap-5"
              >
                <ProjectPhoto
                  project={first}
                  sizes="(min-width: 1440px) 1328px, 92vw"
                  className="h-[clamp(380px,52vw,800px)]"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-[10px]">
                  <ProjectCaption project={first} />
                </div>
              </Link>
            </Reveal>
          )}

          {second && (
            <div className="flex flex-wrap items-start gap-x-[clamp(20px,4vw,64px)] gap-y-[clamp(56px,6vw,96px)]">
              <Reveal className="flex-[7_1_420px]">
                <Link
                  href={`/proyectos/${second.slug}`}
                  className="group flex flex-col gap-5"
                >
                  <ProjectPhoto
                    project={second}
                    sizes="(min-width: 900px) 55vw, 92vw"
                    className="h-[clamp(420px,46vw,740px)]"
                  />
                  <div className="flex flex-col gap-[10px]">
                    <ProjectCaption project={second} />
                  </div>
                </Link>
              </Reveal>

              {third && (
                <Reveal
                  delay={0.1}
                  className="flex-[5_1_320px] pt-[clamp(0px,9vw,160px)]"
                >
                  <Link
                    href={`/proyectos/${third.slug}`}
                    className="group flex flex-col gap-5"
                  >
                    <ProjectPhoto
                      project={third}
                      sizes="(min-width: 900px) 40vw, 92vw"
                      className="h-[clamp(380px,36vw,560px)]"
                    />
                    <div className="flex flex-col gap-[10px]">
                      <ProjectCaption project={third} />
                    </div>
                  </Link>
                </Reveal>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
