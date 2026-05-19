"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

const galleryItems = [
  { tone: "from-[#111] via-[#0e0e0e] to-[#0a0a0a]", label: "Mesa de luz", span: "col-span-2 row-span-2" },
  { tone: "from-[#0f0f0f] via-[#0d0d0d] to-[#0a0a0a]", label: "Placard a medida", span: "col-span-1 row-span-1" },
  { tone: "from-[#120d0d] via-[#0f0f0f] to-[#0a0a0a]", label: "Escritorio premium", span: "col-span-1 row-span-1" },
  { tone: "from-[#0d0d0f] via-[#0f0f0f] to-[#0a0a0a]", label: "Home office", span: "col-span-1 row-span-2" },
  { tone: "from-[#0f0f0f] via-[#0e0e0e] to-[#0a0a0a]", label: "Living room", span: "col-span-2 row-span-1" },
  { tone: "from-[#11100a] via-[#0f0f0f] to-[#0a0a0a]", label: "Cocina moderna", span: "col-span-1 row-span-1" },
  { tone: "from-[#0f0f0f] via-[#0d0d0d] to-[#0a0a0a]", label: "Dormitorio", span: "col-span-1 row-span-1" },
];

function GalleryCard({ item, index }: { item: (typeof galleryItems)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("group relative rounded-lg overflow-hidden cursor-pointer", item.span)}
      style={{ minHeight: "160px" }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-[1.03]",
          item.tone
        )}
      />

      {/* Architectural grid lines — very subtle */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-6 left-6 right-6 h-px bg-white/[0.06]" />
        <div className="absolute top-6 left-6 bottom-6 w-px bg-white/[0.06]" />
      </div>

      {/* Label — appears on hover, editorial style */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-light text-ef-white/80 tracking-wide">{item.label}</span>
      </div>
    </motion.div>
  );
}

export function Gallery() {
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
          {galleryItems.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Mobile: simple 2-col */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {galleryItems.map((item, i) => (
            <motion.div
              key={`mob-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                "group relative h-36 rounded-lg overflow-hidden",
                i === 0 ? "col-span-2" : ""
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br", item.tone)} />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-xs text-ef-white/70 font-light">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
