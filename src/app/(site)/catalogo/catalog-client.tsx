"use client";

import { useState } from "react";
import Link from "next/link";
import { CoverImage } from "@/components/shared/cover-image";
import { SectionLabel } from "@/components/shared/section-label";
import type { Product, ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

type FilterCategory = ProductCategory | "todos";

const categories: { value: FilterCategory; label: string }[] = [
  { value: "todos", label: "Todas" },
  { value: "dormitorio", label: "Dormitorio" },
  { value: "living", label: "Living" },
  { value: "oficina", label: "Oficina" },
  { value: "cocina", label: "Cocina" },
];

const categoryLabels: Record<ProductCategory, string> = {
  dormitorio: "Dormitorio",
  living: "Living",
  oficina: "Oficina",
  cocina: "Cocina",
};

export function CatalogClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("todos");

  const filtered = products.filter(
    (p) => activeCategory === "todos" || p.category === activeCategory,
  );

  return (
    <section className="pb-[clamp(80px,11vw,160px)] pt-[calc(64px+clamp(40px,6vw,88px))]">
      <div className="wrap">
        <div className="mb-[clamp(36px,5vw,72px)] flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-[18px]">
            <SectionLabel>Piezas</SectionLabel>
            <h1 className="title-section">Piezas</h1>
          </div>
          <p className="max-w-[340px] text-pretty text-[15px] leading-[1.6] text-arq-stone">
            Muebles que fabricamos a medida. Cada pieza se adapta a tu espacio.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filtrar por ambiente"
          className="flex flex-wrap gap-x-7 border-t border-arq-ink pt-2 text-[14px]"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              aria-pressed={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "flex h-11 cursor-pointer items-center border-b transition-colors",
                activeCategory === cat.value
                  ? "border-arq-ink text-arq-ink"
                  : "border-transparent text-arq-stone hover:text-arq-wood",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <ul className="mt-[clamp(28px,4vw,48px)] grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-x-[clamp(12px,1.6vw,24px)] gap-y-[clamp(40px,5vw,64px)]">
            {filtered.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/catalogo/${product.slug}`}
                  className="group flex flex-col gap-[18px]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-arq-sand">
                    <CoverImage
                      image={
                        product.images[product.coverIndex] ?? product.images[0]
                      }
                      alt={product.name}
                      sizes="(min-width: 1200px) 25vw, (min-width: 640px) 46vw, 92vw"
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <SectionLabel>{categoryLabels[product.category]}</SectionLabel>
                    <h2 className="font-serif text-[26px] leading-[1.1]">
                      {product.name}
                    </h2>
                    <p className="line-clamp-2 text-pretty text-[14px] leading-[1.55] text-arq-stone">
                      {product.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-3 py-16">
            <p className="text-[15px] text-arq-stone">
              No hay piezas para este ambiente.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("todos")}
              className="link-line h-11 cursor-pointer text-[14px]"
            >
              Ver todas
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
