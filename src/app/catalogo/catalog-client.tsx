"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
  { value: "gamer", label: "Gamer" },
  { value: "cocina", label: "Cocina" },
];

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
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === cat.value
                    ? "bg-ef-blue text-white shadow-lg"
                    : "glass text-ef-dim hover:text-ef-white hover:border-ef-blue/20"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowLEDOnly(!showLEDOnly)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              showLEDOnly
                ? "bg-ef-blue/20 text-ef-blue border border-ef-blue/30"
                : "glass text-ef-dim hover:text-ef-white"
            )}
          >
            <Zap size={14} />
            Solo con LED
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="container-ef py-12">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-ef-dim">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
          </span>
          <button className="flex items-center gap-2 text-sm text-ef-dim hover:text-ef-white transition-colors">
            <SlidersHorizontal size={14} />
            Ordenar
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/catalogo/${product.slug}`}
                  className="group block glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Visual */}
                  <div className="relative h-44 overflow-hidden">
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
                        product.gradient
                      )}
                    />
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-12 blur-lg opacity-40 group-hover:opacity-60 transition-opacity",
                        product.accentColor === "blue" ? "bg-ef-blue" : "bg-ef-red"
                      )}
                    />
                    {/* LED strip simulation */}
                    {product.hasLED && (
                      <div className="absolute bottom-4 left-6 right-6 h-px">
                        <div
                          className={cn(
                            "absolute inset-0 blur-sm animate-led-pulse",
                            product.accentColor === "blue" ? "bg-ef-blue" : "bg-ef-red"
                          )}
                        />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 p-1.5 rounded-lg glass opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                      <ArrowUpRight size={12} className="text-ef-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <LEDBadge
                        label={product.category}
                        color={product.accentColor}
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-ef-white mb-1 group-hover:text-ef-blue transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-ef-dim leading-relaxed mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Icons row */}
                    <div className="flex items-center gap-3 pt-3 border-t border-ef-border">
                      {product.hasLED && (
                        <Zap
                          size={12}
                          className={
                            product.accentColor === "blue"
                              ? "text-ef-blue"
                              : "text-ef-red"
                          }
                        />
                      )}
                      {product.hasUSB && (
                        <Usb size={12} className="text-ef-dim" />
                      )}
                      {product.hasWirelessCharging && (
                        <Wifi size={12} className="text-ef-dim" />
                      )}
                      <div className="ml-auto flex gap-1">
                        {product.colors.slice(0, 3).map((c) => (
                          <div
                            key={c.hex}
                            className="w-3 h-3 rounded-full border border-white/10"
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
            <p className="text-ef-dim mb-4">No hay productos para este filtro.</p>
            <button
              onClick={() => { setActiveCategory("todos"); setShowLEDOnly(false); }}
              className="btn-secondary text-sm"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
