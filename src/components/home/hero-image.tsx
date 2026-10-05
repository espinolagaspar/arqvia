import Link from "next/link";
import { CoverImage } from "@/components/shared/cover-image";
import { formatWhatsAppUrl, whatsAppMessage } from "@/lib/utils";
import type { Project, ProjectImage } from "@/types";

/** Hero a sangre. La foto y el caption salen del primer proyecto destacado. */
export function HeroImage({
  project,
  cover,
}: {
  project?: Project;
  cover: ProjectImage | null;
}) {
  return (
    <section className="pt-16">
      <div className="relative h-[calc(100svh-64px)] max-h-[1000px] min-h-[560px] overflow-hidden bg-[#2A2723]">
        <CoverImage
          image={cover}
          alt={project ? `${project.title} — ${project.type}` : ""}
          sizes="100vw"
          preload
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,17,0)_40%,rgba(20,19,17,0.62)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 text-[#F6F3EE]">
          <div className="wrap flex flex-wrap items-end justify-between gap-7 pb-[clamp(28px,5vw,64px)]">
            <div className="flex max-w-[900px] flex-col gap-[clamp(18px,2.4vw,28px)]">
              <h1 className="text-balance font-serif text-[clamp(46px,8.2vw,124px)] font-light leading-[0.98] tracking-[-0.02em]">
                Muebles que transforman espacios.
              </h1>
              <p className="max-w-[480px] text-pretty text-[clamp(15px,1.3vw,17px)] font-light leading-[1.55]">
                Diseñamos, fabricamos e instalamos mobiliario a medida para
                cocinas, vestidores, livings y espacios de trabajo.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                <Link href="/#proyectos" className="btn btn-bone">
                  Ver proyectos <span aria-hidden>→</span>
                </Link>
                <a
                  href={formatWhatsAppUrl(whatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[52px] items-center border-b border-[rgba(246,243,238,0.7)] text-[15px] transition-colors hover:border-white hover:text-white"
                >
                  Hablemos de tu proyecto
                </a>
              </div>
            </div>
            {project && cover && (
              <span className="text-[12px] uppercase tracking-[0.14em]">
                {project.title} — {project.type}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
