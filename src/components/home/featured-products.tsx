"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Zap, Wifi, Usb } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { LEDBadge } from "@/components/shared/led-badge";
import { featuredProducts } from "@/lib/data/products";

const categoryTones: Record<string, string> = {
  dormitorio: "from-[#111] via-[#0f0f0f] to-[#0a0a0a]",
  gamer:      "from-[#120a0a] via-[#0f0f0f] to-[#0a0a0a]",
  living:     "from-[#0a0a10] via-[#0f0f0f] to-[#0a0a0a]",
  oficina:    "from-[#0f0f0f] via-[#111] to-[#0a0a0a]",
  cocina:     "from-[#10100e] via-[#0f0f0f] to-[#0a0a0a]",
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                href={`/catalogo/${product.slug}`}
                className="group block glass rounded-xl overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:border-white/10"
              >
                {/* Visual */}
                <div className="relative h-52 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${categoryTones[product.category] ?? "from-[#111] to-[#0a0a0a]"}`}
                  />

                  {/* Architectural furniture silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-20 rounded-sm bg-white/[0.03] border border-white/[0.06]" />
                      {/* Subtle surface line */}
                      <div className="absolute -bottom-px left-4 right-4 h-px bg-white/10" />
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-4 right-4 p-2 rounded-sm glass opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                    <ArrowUpRight size={13} className="text-ef-white" />
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <LEDBadge label={product.category} color={product.accentColor} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-medium text-ef-white text-sm mb-1.5 group-hover:text-ef-white/90 transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-ef-dim leading-relaxed mb-4 line-clamp-2 font-light">
                    {product.description}
                  </p>

                  {/* Feature icons */}
                  <div className="flex items-center gap-3 pt-3 border-t border-ef-border">
                    {product.hasLED && (
                      <div className="flex items-center gap-1 text-xs text-ef-dim">
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
                      <span className="text-xs text-ef-dim/60">
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="/catalogo"
              className="group flex flex-col items-center justify-center h-full min-h-[280px] glass rounded-xl border-dashed transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
            >
              <div className="w-10 h-10 rounded-sm border border-ef-border flex items-center justify-center mb-4 group-hover:border-white/20 transition-colors">
                <ArrowUpRight size={18} className="text-ef-dim group-hover:text-ef-white transition-colors" />
              </div>
              <span className="text-xs font-light text-ef-dim group-hover:text-ef-white transition-colors tracking-wide">
                Ver catálogo completo
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
