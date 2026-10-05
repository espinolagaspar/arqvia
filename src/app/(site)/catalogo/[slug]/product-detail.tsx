"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/section-label";
import { cn, formatWhatsAppUrl } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types";

const categoryLabels: Record<ProductCategory, string> = {
  dormitorio: "Dormitorio",
  living: "Living",
  oficina: "Oficina",
  cocina: "Cocina",
};

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.coverIndex || 0);

  const images = product.images;
  const current = images[activeImage] ?? images[0] ?? null;

  const whatsappMsg = `Hola ArqVia, me interesa la pieza "${product.name}" y quiero más información.`;

  return (
    <section className="pb-[clamp(80px,11vw,160px)] pt-[calc(64px+clamp(24px,4vw,56px))]">
      <div className="wrap flex flex-col gap-[clamp(20px,3vw,40px)]">
        <Link
          href="/catalogo"
          className="link flex h-11 items-center self-start text-[14px] text-arq-stone"
        >
          ← Piezas
        </Link>

        <div className="flex flex-wrap items-start gap-x-[clamp(40px,6vw,96px)] gap-y-10">
          <div className="flex flex-[1_1_360px] flex-col gap-3">
            <div className="relative aspect-[4/5] max-h-[760px] w-full overflow-hidden bg-arq-sand">
              {current && (
                <Image
                  key={current.pathname || current.url}
                  src={current.url}
                  alt={product.name}
                  fill
                  preload
                  sizes="(min-width: 900px) 45vw, 92vw"
                  className="object-cover"
                />
              )}
            </div>

            {images.length > 1 && (
              <div className="flex flex-wrap gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.pathname || img.url}
                    type="button"
                    aria-label={`Ver foto ${i + 1}`}
                    aria-pressed={i === activeImage}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative size-20 cursor-pointer overflow-hidden border bg-arq-sand transition-colors",
                      i === activeImage
                        ? "border-arq-ink"
                        : "border-transparent hover:border-arq-line",
                    )}
                  >
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex max-w-[600px] flex-[1_1_360px] flex-col gap-8">
            <div className="flex flex-col gap-[18px]">
              <SectionLabel>{categoryLabels[product.category]}</SectionLabel>
              <h1 className="font-serif text-[clamp(38px,5vw,72px)] font-light leading-none tracking-[-0.02em]">
                {product.name}
              </h1>
              <p className="text-pretty text-[16px] leading-[1.7] text-arq-stone">
                {product.description}
              </p>
            </div>

            <dl className="flex flex-col">
              {product.features.length > 0 && (
                <div className="flex flex-col gap-[6px] border-t border-arq-line py-4">
                  <dt className="label">Incluye</dt>
                  <dd className="text-[15px] leading-[1.6]">
                    {product.features.join(" · ")}
                  </dd>
                </div>
              )}
              {product.colors.length > 0 && (
                <div className="flex flex-col gap-[10px] border-b border-t border-arq-line py-4">
                  <dt className="label">Terminaciones</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
                    {product.colors.map((color) => (
                      <span
                        key={color.hex}
                        className="inline-flex items-center gap-2"
                      >
                        <span
                          className="size-3 rounded-full border border-arq-line"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.name}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <a
                href={formatWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink"
              >
                Consultar por WhatsApp <span aria-hidden>→</span>
              </a>
              <Link
                href="/cotizacion"
                className="link-line h-[52px] text-[15px]"
              >
                Pedir una cotización
              </Link>
            </div>

            <p className="text-[14px] text-arq-stone">
              Diseño 3D sin cargo · Render en 48–72 hs · Instalación incluida
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
