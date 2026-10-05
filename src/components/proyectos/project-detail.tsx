import Link from "next/link";
import { CoverImage } from "@/components/shared/cover-image";
import { SectionLabel } from "@/components/shared/section-label";
import { projectCover } from "@/lib/projects/store";
import type { Project, ProjectImage } from "@/types";
import { cn } from "@/lib/utils";

const DEFAULT_SCOPE = "Diseño, fabricación e instalación";

/** "Diseño", "Fabricación", "Instalación" → "Diseño, fabricación e instalación" */
function formatScope(scope: string[] | undefined) {
  if (!scope || scope.length === 0) return DEFAULT_SCOPE;
  const items = scope.map((s, i) => (i === 0 ? s : s.toLowerCase()));
  if (items.length === 1) return items[0];
  const last = items[items.length - 1];
  const joiner = /^h?i/i.test(last) ? "e" : "y";
  return `${items.slice(0, -1).join(", ")} ${joiner} ${last}`;
}

function Spec({
  term,
  children,
  last = false,
}: {
  term: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[6px] border-t border-arq-line py-4",
        last && "border-b",
      )}
    >
      <dt className="label">{term}</dt>
      <dd className="text-[15px]">{children}</dd>
    </div>
  );
}

/** Galería asimétrica: pares 5/7 (4:5 y 7:6) que se repiten. */
function Gallery({ images, title }: { images: ProjectImage[]; title: string }) {
  if (images.length === 0) return null;

  return (
    <div className="wrap flex flex-wrap gap-[clamp(12px,1.6vw,24px)]">
      {images.map((image, i) => {
        const alone = i === images.length - 1 && i % 2 === 0;
        const narrow = i % 2 === 0;
        return (
          <div
            key={image.pathname || image.url}
            className={cn(
              "relative overflow-hidden bg-arq-sand",
              alone
                ? "aspect-[16/9] flex-[1_1_100%]"
                : narrow
                  ? "aspect-[4/5] flex-[5_1_320px]"
                  : "aspect-[7/6] flex-[7_1_420px]",
            )}
          >
            <CoverImage
              image={image}
              alt={`${title}, detalle ${i + 1}`}
              sizes={
                alone
                  ? "(min-width: 1440px) 1328px, 92vw"
                  : "(min-width: 820px) 55vw, 92vw"
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export function ProjectDetail({
  project,
  number,
  next,
}: {
  project: Project;
  /** Posición en el listado: "01", "02", ... */
  number: string;
  next: Project | null;
}) {
  const cover = projectCover(project);
  const gallery = project.images.filter((image) => image !== cover);

  return (
    <>
      <section className="pb-[clamp(40px,5vw,64px)] pt-[calc(64px+clamp(40px,6vw,88px))]">
        <div className="wrap flex flex-col gap-[clamp(28px,4vw,48px)]">
          <Link
            href="/proyectos"
            className="link flex h-11 items-center self-start text-[14px] text-arq-stone"
          >
            ← Proyectos
          </Link>
          <div className="flex flex-col gap-[18px]">
            <SectionLabel>
              {number}
              {project.type && ` · ${project.type}`}
            </SectionLabel>
            <h1 className="font-serif text-[clamp(52px,9vw,140px)] font-light leading-[0.95] tracking-[-0.025em]">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="relative h-[clamp(360px,56vw,860px)] overflow-hidden bg-arq-sand">
          <CoverImage
            image={cover}
            alt={`${project.title} — ${project.type}`}
            sizes="(min-width: 1440px) 1328px, 92vw"
            preload
          />
        </div>
      </div>

      <section className="py-[clamp(56px,7vw,112px)]">
        <div className="wrap flex flex-wrap gap-x-[clamp(40px,6vw,120px)] gap-y-12">
          <dl className="flex flex-[1_1_280px] flex-col">
            {project.type && <Spec term="Tipo">{project.type}</Spec>}
            <Spec term="Alcance" last={!project.materials?.length}>
              {formatScope(project.scope)}
            </Spec>
            {project.materials && project.materials.length > 0 && (
              <Spec term="Materiales" last>
                {project.materials.join(" · ")}
              </Spec>
            )}
          </dl>
          <div className="flex max-w-[760px] flex-[2_1_420px] flex-col gap-6">
            <p className="text-pretty font-serif text-[clamp(26px,2.6vw,38px)] font-light leading-[1.22]">
              {project.summary}
            </p>
            {project.body && (
              <p className="whitespace-pre-line text-pretty text-[16px] leading-[1.7] text-arq-stone">
                {project.body}
              </p>
            )}
          </div>
        </div>
      </section>

      <Gallery images={gallery} title={project.title} />

      {next && (
        <section className="pt-[clamp(72px,9vw,140px)]">
          <div className="wrap">
            <Link
              href={`/proyectos/${next.slug}`}
              className="link flex flex-wrap items-baseline justify-between gap-3 border-b border-t border-b-arq-line border-t-arq-ink py-8"
            >
              <SectionLabel>Siguiente proyecto</SectionLabel>
              <span className="font-serif text-[clamp(34px,4.4vw,64px)] font-light leading-none tracking-[-0.02em]">
                {next.title} →
              </span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
