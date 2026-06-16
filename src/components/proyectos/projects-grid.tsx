"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { LEDBadge } from "@/components/shared/led-badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const DEFAULT_GRADIENT = "from-[#111] to-[#0a0a0a]";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  const active = projects.find((p) => p.id === activeId) ?? null;
  const hasGallery = active ? active.images.length > 0 : false;

  const open = useCallback((project: Project) => {
    if (project.images.length === 0) return;
    setActiveId(project.id);
    setIndex(project.coverIndex || 0);
  }, []);

  const close = useCallback(() => setActiveId(null), []);

  const step = useCallback(
    (dir: -1 | 1) => {
      if (!active) return;
      const n = active.images.length;
      setIndex((i) => (i + dir + n) % n);
    },
    [active],
  );

  // Navegación por teclado en el lightbox
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => {
          const cover =
            project.images[project.coverIndex] ?? project.images[0] ?? null;
          const clickable = project.images.length > 0;
          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => open(project)}
              className={cn(
                "group relative glass glass-hover rounded-lg overflow-hidden transition-all duration-400 hover:-translate-y-1",
                clickable && "cursor-pointer",
              )}
            >
              {/* Visual */}
              <div className="relative h-56 overflow-hidden">
                {cover ? (
                  <Image
                    src={cover.url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-[1.03]",
                      project.gradient ?? DEFAULT_GRADIENT,
                    )}
                  />
                )}
                {project.year && (
                  <div className="absolute top-4 right-4">
                    <span className="glass px-2 py-1 rounded-sm text-xs text-arq-dim/80 font-light">
                      {project.year}
                    </span>
                  </div>
                )}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-4">
                    <span className="glass px-2 py-1 rounded-sm text-[10px] text-arq-white/80 font-light">
                      {project.images.length} fotos
                    </span>
                  </div>
                )}
                {clickable && (
                  <div className="absolute bottom-4 right-4 p-1.5 rounded-sm glass opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight size={13} className="text-arq-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {project.category && (
                  <div className="flex items-center gap-2 mb-3">
                    <LEDBadge label={project.category} color={project.accentColor} />
                  </div>
                )}
                <h3 className="text-sm font-medium text-arq-white mb-1 leading-snug">
                  {project.title}
                </h3>
                {project.location && (
                  <div className="flex items-center gap-1 text-xs text-arq-dim/60 mb-3 font-light">
                    <MapPin size={10} />
                    {project.location}
                  </div>
                )}
                {project.description && (
                  <p className="text-xs text-arq-dim leading-relaxed mb-4 line-clamp-3 font-light">
                    {project.description}
                  </p>
                )}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-arq-border">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-sm bg-white/[0.04] text-arq-dim/70 font-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && hasGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-5 right-5 p-2 rounded-sm text-arq-dim hover:text-arq-white transition-colors"
            >
              <X size={22} />
            </button>

            <div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#0a0a0a]">
                <Image
                  key={active.images[index].pathname}
                  src={active.images[index].url}
                  alt={active.title}
                  fill
                  priority
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {active.images.length > 1 && (
                <>
                  <button
                    onClick={() => step(-1)}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-arq-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => step(1)}
                    aria-label="Siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-arq-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium text-arq-white">
                    {active.title}
                  </h3>
                  {active.location && (
                    <p className="text-xs text-arq-dim font-light">
                      {active.location}
                    </p>
                  )}
                </div>
                <span className="text-xs text-arq-dim/60 font-light flex-shrink-0">
                  {index + 1} / {active.images.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
