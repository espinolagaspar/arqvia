"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { LEDBadge } from "@/components/shared/led-badge";
import { CTAFinal } from "@/components/home/cta-final";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-ef-black">
      {/* Hero */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-ef-blue/5 blur-[100px] rounded-full" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-ef-red/3 blur-[80px] rounded-full" />
        </div>
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
      <div className="container-ef pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Visual */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105",
                    project.gradient
                  )}
                />
                {/* LED glow */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-20 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity",
                    project.accentColor === "blue" ? "bg-ef-blue" : "bg-ef-red"
                  )}
                />
                {/* Architectural lines */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 left-8 right-8 h-px bg-white" />
                  <div className="absolute top-8 left-8 bottom-8 w-px bg-white" />
                </div>
                {/* Year badge */}
                <div className="absolute top-4 right-4">
                  <span className="glass px-2 py-1 rounded-md text-xs text-ef-dim font-medium">
                    {project.year}
                  </span>
                </div>
                {/* Hover arrow */}
                <div className="absolute bottom-4 right-4 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight size={14} className="text-ef-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <LEDBadge label={project.category} color={project.accentColor} />
                </div>
                <h3 className="text-lg font-semibold text-ef-white mb-1 group-hover:text-ef-blue transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-ef-dim mb-3">
                  <MapPin size={11} />
                  {project.location}
                </div>
                <p className="text-sm text-ef-dim leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-ef-border">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md bg-ef-surface text-ef-dim"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-16 border-t border-ef-border"
        >
          {[
            { value: "500+", label: "Proyectos realizados" },
            { value: "5", label: "Años de experiencia" },
            { value: "CABA + GBA", label: "Zona de cobertura" },
            { value: "100%", label: "Fabricación propia" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center glass rounded-2xl p-6"
            >
              <div className="text-3xl font-semibold text-gradient-blue mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-ef-dim">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <CTAFinal />
    </div>
  );
}
