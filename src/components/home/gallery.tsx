"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const DEFAULT_GRADIENT = "from-[#111] to-[#0a0a0a]";

// Patrón masonry para hasta 7 items.
const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

function cover(project: Project) {
  return project.images[project.coverIndex] ?? project.images[0] ?? null;
}

export function Gallery({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 7);
  if (items.length === 0) return null;

  return (
    <section className="section-padding bg-ef-black">
      <div className="container-ef">
        <SectionHeader
          eyebrow="Portfolio"
          title="Espacios que"
          titleAccent="inspiran"
          description="Cada proyecto es único. Mirá cómo transformamos espacios reales en experiencias visuales extraordinarias."
        />

        {/* Desktop masonry grid */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, 160px)",
          }}
        >
          {items.map((project, i) => {
            const img = cover(project);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                className={cn(SPANS[i] ?? "col-span-1 row-span-1")}
              >
                <Link
                  href="/proyectos"
                  className="group relative block w-full h-full rounded-lg overflow-hidden"
                >
                  {img ? (
                    <Image
                      src={img.url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-[1.03]",
                        project.gradient ?? DEFAULT_GRADIENT,
                      )}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-light text-ef-white/90 tracking-wide">
                      {project.title}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: simple 2-col */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {items.map((project, i) => {
            const img = cover(project);
            return (
              <motion.div
                key={`mob-${project.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={cn(i === 0 ? "col-span-2" : "")}
              >
                <Link
                  href="/proyectos"
                  className="group relative block h-36 rounded-lg overflow-hidden"
                >
                  {img ? (
                    <Image
                      src={img.url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br",
                        project.gradient ?? DEFAULT_GRADIENT,
                      )}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-xs text-ef-white/80 font-light">
                      {project.title}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
