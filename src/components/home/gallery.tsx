"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

const galleryItems = [
  { gradient: "from-blue-950 via-slate-900 to-indigo-950", label: "Mesa de luz LED", span: "col-span-2 row-span-2", accentColor: "blue" as const },
  { gradient: "from-zinc-800 via-zinc-900 to-black", label: "Placard minimalista", span: "col-span-1 row-span-1", accentColor: "blue" as const },
  { gradient: "from-red-950 via-slate-900 to-black", label: "Setup Gamer", span: "col-span-1 row-span-1", accentColor: "red" as const },
  { gradient: "from-slate-800 via-slate-900 to-black", label: "Escritorio premium", span: "col-span-1 row-span-2", accentColor: "blue" as const },
  { gradient: "from-indigo-950 via-blue-950 to-black", label: "Living LED", span: "col-span-2 row-span-1", accentColor: "blue" as const },
  { gradient: "from-red-950 via-rose-950 to-black", label: "Cama tapizada", span: "col-span-1 row-span-1", accentColor: "red" as const },
  { gradient: "from-zinc-700 via-zinc-800 to-black", label: "Home Office", span: "col-span-1 row-span-1", accentColor: "blue" as const },
];

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={cn("group relative rounded-2xl overflow-hidden cursor-pointer", item.span)}
      style={{ minHeight: "160px" }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
          item.gradient
        )}
      />
      {/* LED line at bottom */}
      <div
        className={cn(
          "absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          item.accentColor === "blue" ? "led-line" : "led-line-red"
        )}
      />
      {/* Glow */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl",
          item.accentColor === "blue" ? "bg-ef-blue" : "bg-ef-red"
        )}
      />
      {/* Interior detail */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-1/2 h-1/2 border border-white/10 rounded-lg" />
      </div>
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-medium text-ef-white">{item.label}</span>
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

        {/* Masonry-style grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, 160px)",
          }}
        >
          {galleryItems.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Mobile: simple grid */}
        <div className="grid grid-cols-2 gap-4 md:hidden mt-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={`mob-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={cn(
                "group relative h-36 rounded-xl overflow-hidden",
                i === 0 ? "col-span-2" : ""
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br", item.gradient)} />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-xs text-ef-white font-medium">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
