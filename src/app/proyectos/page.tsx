import { SectionHeader } from "@/components/shared/section-header";
import { CTAFinal } from "@/components/home/cta-final";
import { ProjectsGrid } from "@/components/proyectos/projects-grid";
import { getProjects } from "@/lib/projects/store";

export const dynamic = "force-dynamic";

const stats = [
  { value: "100+", label: "Proyectos realizados" },
  { value: "5", label: "Años de experiencia" },
  { value: "CABA + GBA", label: "Zona de cobertura" },
  { value: "100%", label: "Fabricación propia" },
];

export default async function ProyectosPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-arq-black">
      {/* Hero */}
      <div className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px rule" />
        <div className="container-arq relative">
          <SectionHeader
            eyebrow="Portfolio"
            title="Proyectos"
            titleAccent="realizados"
            description="Cada espacio es un lienzo. Mirá cómo transformamos ambientes reales en experiencias de diseño."
            align="left"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container-arq pb-24">
        <ProjectsGrid projects={projects} />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-20 pt-16 border-t border-arq-border">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center glass rounded-lg p-6">
              <div className="text-2xl font-semibold text-arq-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-arq-dim font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <CTAFinal />
    </div>
  );
}
