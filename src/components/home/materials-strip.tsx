import Image from "next/image";
import { MATERIALS } from "@/lib/data/materials";

/** Tira horizontal con scroll-snap sobre fondo ink. */
export function MaterialsStrip() {
  return (
    <section className="bg-arq-ink py-[clamp(80px,11vw,160px)] text-arq-bone">
      <div className="wrap mb-[clamp(40px,5vw,72px)] flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-[18px]">
          <span className="label text-arq-stone-light">03 — Materiales</span>
          <h2 className="title-section">Materiales y terminaciones</h2>
        </div>
        <p className="max-w-[360px] text-pretty text-[15px] leading-[1.6] text-arq-stone-light">
          Elegimos cada material con vos, según el uso, el espacio y el
          presupuesto.
        </p>
      </div>

      <ul
        tabIndex={0}
        aria-label="Materiales y terminaciones"
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-[clamp(20px,4vw,56px)] gap-[clamp(12px,1.6vw,24px)] overflow-x-auto px-[clamp(20px,4vw,56px)] pb-2"
      >
        {MATERIALS.map((material, i) => (
          <li
            key={material.id}
            className="flex flex-[0_0_clamp(240px,24vw,340px)] snap-start flex-col gap-[18px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#2A2723]">
              {material.image && (
                <Image
                  src={material.image}
                  alt={`Muestra de ${material.name.toLowerCase()}`}
                  fill
                  sizes="(min-width: 1420px) 340px, (min-width: 1000px) 24vw, 240px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-[14px]">
                <span className="text-[11px] tracking-[0.14em] text-arq-stone-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-[26px]">{material.name}</h3>
              </div>
              <p className="text-pretty text-[14px] leading-[1.55] text-arq-stone-light">
                {material.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
