"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { LEDBadge } from "@/components/shared/led-badge";
import { CTAFinal } from "@/components/home/cta-final";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const projectTones: Record<string, string> = {
  dormitorio: "from-[#111] to-[#0a0a0a]",
  living:     "from-[#0a0a10] to-[#0a0a0a]",
  oficina:    "from-[#0f0f0f] to-[#0a0a0a]",
  gamer:      "from-[#120a0a] to-[#0a0a0a]",
  cocina:     "from-[#10100e] to-[#0a0a0a]",
};

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-ef-black">
      {/* Hero */}
      <div className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px rule" />
        <div className="container-ef relative">
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
      <div className="container-ef pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative glass glass-hover rounded-lg overflow-hidden transition-all duration-400 hover:-translate-y-1 cursor-pointer"
            >
              {/* Visual */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-[1.03]",
                    projectTones[project.category] ?? "from-[#111] to-[#0a0a0a]"
                  )}
                />
                {/* Architectural lines */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-6 left-6 right-6 h-px bg-white/[0.06]" />
                  <div className="absolute top-6 left-6 bottom-6 w-px bg-white/[0.06]" />
                </div>
                {/* Year badge */}
                <div className="absolute top-4 right-4">
                  <span className="glass px-2 py-1 rounded-sm text-xs text-ef-dim/60 font-light">
                    {project.year}
                  </span>
                </div>
                {/* Hover arrow */}
                <div className="absolute bottom-4 right-4 p-1.5 rounded-sm glass opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <ArrowUpRight size={13} className="text-ef-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <LEDBadge label={project.category} color={project.accentColor} />
                </div>
                <h3 className="text-sm font-medium text-ef-white mb-1 group-hover:text-ef-white/90 transition-colors leading-snug">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-ef-dim/60 mb-3 font-light">
                  <MapPin size={10} />
                  {project.location}
                </div>
                <p className="text-xs text-ef-dim leading-relaxed mb-4 line-clamp-3 font-light">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-ef-border">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-sm bg-white/[0.04] text-ef-dim/70 font-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-20 pt-16 border-t border-ef-border"
        >
          {[
            { value: "500+", label: "Proyectos realizados" },
            { value: "5", label: "Años de experiencia" },
            { value: "CABA + GBA", label: "Zona de cobertura" },
            { value: "100%", label: "Fabricación propia" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center glass rounded-lg p-6"
            >
              <div className="text-2xl font-semibold text-ef-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-ef-dim font-light">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <CTAFinal />
    </div>
  );
}
