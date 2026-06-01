"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, MessageCircle, Zap, Wifi, Usb, Layers } from "lucide-react";
import { LEDBadge } from "@/components/shared/led-badge";
import { formatWhatsAppUrl } from "@/lib/utils";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(product.coverIndex || 0);

  const images = product.images;
  const current = images[activeImage] ?? images[0] ?? null;

  const whatsappMsg = `Hola efstudio! Me interesa el producto "${product.name}". ¿Pueden darme más información?`;

  return (
    <div className="min-h-screen bg-ef-black pt-20">
      {/* Breadcrumb */}
      <div className="container-ef py-6">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-ef-dim hover:text-ef-white transition-colors"
        >
          <ArrowLeft size={14} />
          Volver al catálogo
        </Link>
      </div>

      <div className="container-ef pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[450px] lg:h-[540px] rounded-xl overflow-hidden">
              {current ? (
                <Image
                  key={current.pathname || current.url}
                  src={current.url}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    product.gradient ?? "from-[#111] to-[#0a0a0a]",
                  )}
                />
              )}

              {/* Overlay sutil para legibilidad de badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

              {/* Badges */}
              <div className="absolute top-5 left-5">
                <LEDBadge label={product.category} color={product.accentColor} />
              </div>
              {product.isFloating && (
                <div className="absolute top-5 right-5">
                  <LEDBadge label="Flotante" />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {images.map((img, i) => (
                  <button
                    key={img.pathname || img.url}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative w-20 h-20 rounded-lg overflow-hidden border transition-colors",
                      i === activeImage
                        ? "border-white/40"
                        : "border-ef-border hover:border-white/20",
                    )}
                  >
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <LEDBadge label={product.category} color={product.accentColor} />
              <h1 className="text-3xl lg:text-4xl font-semibold text-ef-white mt-3 mb-2">
                {product.name}
              </h1>
              <p className="text-ef-dim leading-relaxed">{product.description}</p>
            </div>

            {/* Tech icons */}
            <div className="flex flex-wrap gap-3">
              {product.hasLED && (
                <div className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-sm">
                  <Zap size={14} className={product.accentColor === "blue" ? "text-ef-blue" : "text-ef-red"} />
                  <span className="text-ef-white text-xs">LED RGB</span>
                </div>
              )}
              {product.hasUSB && (
                <div className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-sm">
                  <Usb size={14} className="text-ef-blue" />
                  <span className="text-ef-white text-xs">USB-A / USB-C</span>
                </div>
              )}
              {product.hasWirelessCharging && (
                <div className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-sm">
                  <Wifi size={14} className="text-ef-blue" />
                  <span className="text-ef-white text-xs">Carga Qi</span>
                </div>
              )}
              {product.isFloating && (
                <div className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-sm">
                  <Layers size={14} className="text-ef-blue" />
                  <span className="text-ef-white text-xs">Flotante</span>
                </div>
              )}
            </div>

            {/* Color selection */}
            {product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-ef-dim uppercase tracking-wider">
                    Color
                  </span>
                  <span className="text-xs text-ef-white">
                    {selectedColor?.name}
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "relative w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor?.hex === color.hex
                          ? product.accentColor === "blue"
                            ? "border-ef-blue scale-110"
                            : "border-ef-red scale-110"
                          : "border-transparent hover:scale-105",
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor?.hex === color.hex && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check
                            size={14}
                            className={
                              color.hex === "#FFFFFF" ||
                              color.hex === "#F0F0F0" ||
                              color.hex === "#FAFAFA"
                                ? "text-black"
                                : "text-white"
                            }
                          />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div>
              <span className="text-xs font-medium text-ef-dim uppercase tracking-wider block mb-3">
                Incluye
              </span>
              <ul className="space-y-2.5">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-ef-white">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                        product.accentColor === "blue"
                          ? "bg-ef-blue/15"
                          : "bg-ef-red/15"
                      )}
                    >
                      <Check
                        size={10}
                        className={
                          product.accentColor === "blue" ? "text-ef-blue" : "text-ef-red"
                        }
                      />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 pt-4 border-t border-ef-border">
              <a
                href={formatWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center gap-2 py-4 text-base"
              >
                <MessageCircle size={18} />
                Consultar por WhatsApp
              </a>
              <Link href="/cotizacion" className="btn-secondary justify-center">
                Solicitar cotización detallada
              </Link>
            </div>

            <p className="text-xs text-ef-dim text-center">
              Diseño 3D gratis · Fabricación a medida · Instalación incluida
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
