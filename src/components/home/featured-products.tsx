"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Zap, Wifi, Usb } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { LEDBadge } from "@/components/shared/led-badge";
import { featuredProducts } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const categoryGradients: Record<string, string> = {
  dormitorio:
    "from-blue-950/80 via-slate-900/60 to-transparent",
  gamer: "from-red-950/80 via-slate-900/60 to-transparent",
  living: "from-indigo-950/80 via-slate-900/60 to-transparent",
  oficina: "from-zinc-800/80 via-zinc-900/60 to-transparent",
  cocina: "from-stone-800/80 via-zinc-900/60 to-transparent",
};

export function FeaturedProducts() {
  return (
    <section className="section-padding bg-ef-black">
      <div className="container-ef">
        <SectionHeader
          eyebrow="Catálogo"
          title="Productos"
          titleAccent="destacados"
          description="Cada pieza diseñada con propósito. Melamina premium, tecnología integrada y acabados de nivel arquitectónico."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/catalogo/${product.slug}`}
                className="group block glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual */}
                <div className="relative h-52 overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      product.gradient
                    )}
                  />
                  {/* LED glow effect */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-16 blur-xl opacity-40",
                      product.accentColor === "blue"
                        ? "bg-ef-blue"
                        : "bg-ef-red"
                    )}
                  />
                  {/* Furniture silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-28 h-16 rounded-lg bg-white/5 border border-white/10 shadow-2xl" />
                      {product.hasLED && (
                        <div
                          className={cn(
                            "absolute -bottom-1 left-2 right-2 h-0.5 blur-sm animate-led-pulse",
                            product.accentColor === "blue"
                              ? "bg-ef-blue"
                              : "bg-ef-red"
                          )}
                        />
                      )}
                    </div>
                  </div>
                  {/* Hover arrow */}
                  <div className="absolute top-4 right-4 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight size={14} className="text-ef-white" />
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <LEDBadge
                      label={product.category}
                      color={product.accentColor}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-ef-white text-base mb-1 group-hover:text-ef-blue transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-ef-dim leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Feature icons */}
                  <div className="flex items-center gap-3 pt-3 border-t border-ef-border">
                    {product.hasLED && (
                      <div
                        className={cn(
                          "flex items-center gap-1 text-xs",
                          product.accentColor === "blue"
                            ? "text-ef-blue"
                            : "text-ef-red"
                        )}
                      >
                        <Zap size={11} />
                        LED
                      </div>
                    )}
                    {product.hasUSB && (
                      <div className="flex items-center gap-1 text-xs text-ef-dim">
                        <Usb size={11} />
                        USB
                      </div>
                    )}
                    {product.hasWirelessCharging && (
                      <div className="flex items-center gap-1 text-xs text-ef-dim">
                        <Wifi size={11} />
                        Qi
                      </div>
                    )}
                    <div className="ml-auto">
                      <span className="text-xs text-ef-dim">
                        {product.colors.length} colores
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Ver todo card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/catalogo"
              className="group flex flex-col items-center justify-center h-full min-h-[280px] glass glass-hover rounded-2xl border-dashed border-ef-border transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full border border-ef-border flex items-center justify-center mb-4 group-hover:border-ef-blue group-hover:text-ef-blue transition-colors">
                <ArrowUpRight size={20} className="text-ef-dim group-hover:text-ef-blue" />
              </div>
              <span className="text-sm font-medium text-ef-dim group-hover:text-ef-white transition-colors">
                Ver catálogo completo
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
