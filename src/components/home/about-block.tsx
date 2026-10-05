import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { SectionLabel } from "@/components/shared/section-label";

/** Foto del taller o del equipo. null = placeholder de color hasta tenerla. */
const WORKSHOP_IMAGE: string | null = null;

const facts = [
  { value: "5 años", label: "de trabajo" },
  { value: "Taller propio", label: "fabricación" },
  { value: "CABA y GBA", label: "zona de trabajo" },
];

export function AboutBlock() {
  return (
    <section id="nosotros" className="pb-[clamp(80px,11vw,160px)]">
      <div className="wrap flex flex-wrap items-center gap-[clamp(40px,6vw,96px)]">
        <div className="relative aspect-[4/5] max-h-[760px] flex-[1_1_360px] overflow-hidden bg-arq-sand">
          {WORKSHOP_IMAGE && (
            <Image
              src={WORKSHOP_IMAGE}
              alt="El taller de ARQVIA"
              fill
              sizes="(min-width: 900px) 45vw, 92vw"
              className="object-cover"
            />
          )}
        </div>

        <Reveal className="flex max-w-[600px] flex-[1_1_360px] flex-col gap-7">
          <SectionLabel>05 — Nosotros</SectionLabel>
          <p className="text-pretty font-serif text-[clamp(28px,3vw,42px)] font-light leading-[1.18] tracking-[-0.01em]">
            Hace cinco años que diseñamos y fabricamos muebles a medida. Hacemos
            todo el recorrido nosotros, así respondemos por el resultado de
            punta a punta.
          </p>
          {/* TODO: texto secundario (quiénes somos, cómo empezamos y cómo trabajamos). */}
          <dl className="flex flex-wrap gap-x-12 gap-y-6 border-t border-arq-line pt-6">
            {facts.map((fact) => (
              <div key={fact.value} className="flex flex-col-reverse gap-[6px]">
                <dt className="text-[13px] text-arq-stone">{fact.label}</dt>
                <dd className="font-serif text-[28px]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
