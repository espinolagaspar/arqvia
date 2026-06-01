"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Zap, Wifi, Usb, SlidersHorizontal } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { LEDBadge } from "@/components/shared/led-badge";
import { products } from "@/lib/data/products";
import type { ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

type FilterCategory = ProductCategory | "todos";

const categories: { value: FilterCategory; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "dormitorio", label: "Dormitorio" },
  { value: "living", label: "Living" },
  { value: "oficina", label: "Oficina" },
  { value: "cocina", label: "Cocina" },
];

const productTones: Record<string, string> = {
  dormitorio: "from-[#111] to-[#0a0a0a]",
  living:     "from-[#0a0a10] to-[#0a0a0a]",
  oficina:    "from-[#0f0f0f] to-[#0a0a0a]",
  cocina:     "from-[#10100e] to-[#0a0a0a]",
};

export function CatalogClient() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("todos");
  const [showLEDOnly, setShowLEDOnly] = useState(false);

  const filtered = products.filter((p) => {
    const catMatch = activeCategory === "todos" || p.category === activeCategory;
    const ledMatch = !showLEDOnly || p.hasLED;
    return catMatch && ledMatch;
  });

  return (
    <div className="min-h-screen bg-ef-black pt-24">
      {/* Hero */}
      <div className="container-ef py-12 border-b border-ef-border">
        <SectionHeader
          eyebrow="efstudio"
          title="Catálogo"
          titleAccent="completo"
          description="Cada mueble diseñado para transformar tu espacio. Seleccioná la categoría que te interesa."
          align="left"
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-sm text-xs font-light tracking-wide transition-all duration-200",
                  activeCategory === cat.value
                    ? "bg-ef-white text-ef-black font-medium"
                    : "glass text-ef-dim hover:text-ef-white hover:border-white/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowLEDOnly(!showLEDOnly)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-light tracking-wide transition-all duration-200",
              showLEDOnly
                ? "bg-white/10 text-ef-white border border-white/20"
                : "glass text-ef-dim hover:text-ef-white"
            )}
          >
            <Zap size={12} />
            Solo con LED
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="container-ef py-12">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-ef-dim font-light">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
          </span>
          <button className="flex items-center gap-2 text-xs text-ef-dim hover:text-ef-white transition-colors font-light">
            <SlidersHorizontal size={13} />
            Ordenar
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href={`/catalogo/${product.slug}`}
                  className="group block glass rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
                >
                  {/* Visual */}
                  <div className="relative h-44 overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-[1.03]",
                          productTones[product.category] ?? "from-[#111] to-[#0a0a0a]"
                        )}
                      />
                    )}
                    {/* Architectural lines on non-image cards */}
                    {!product.image && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                        <div className="absolute top-5 left-5 right-5 h-px bg-white/[0.05]" />
                        <div className="absolute top-5 left-5 bottom-5 w-px bg-white/[0.05]" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 p-1.5 rounded-sm glass opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                      <ArrowUpRight size={11} className="text-ef-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <LEDBadge label={product.category} color={product.accentColor} />
                    </div>
                    <h3 className="text-xs font-medium text-ef-white mb-1 group-hover:text-ef-white/90 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-ef-dim leading-relaxed mb-3 line-clamp-2 font-light">
                      {product.description}
                    </p>

                    {/* Icons row */}
                    <div className="flex items-center gap-2.5 pt-3 border-t border-ef-border">
                      {product.hasLED && <Zap size={11} className="text-ef-dim/60" />}
                      {product.hasUSB && <Usb size={11} className="text-ef-dim/60" />}
                      {product.hasWirelessCharging && <Wifi size={11} className="text-ef-dim/60" />}
                      <div className="ml-auto flex gap-1">
                        {product.colors.slice(0, 3).map((c) => (
                          <div
                            key={c.hex}
                            className="w-2.5 h-2.5 rounded-full border border-white/10"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-ef-dim mb-4 font-light text-sm">No hay productos para este filtro.</p>
            <button
              onClick={() => { setActiveCategory("todos"); setShowLEDOnly(false); }}
              className="btn-secondary text-xs"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
