import { Reveal } from "@/components/shared/reveal";
import { SectionLabel } from "@/components/shared/section-label";

const services = [
  {
    title: "Diseño",
    description: "Te presentamos el mueble en 3D antes de fabricarlo. Sin cargo.",
  },
  {
    title: "Fabricación",
    description: "Producimos en taller propio, con herrajes europeos.",
  },
  {
    title: "Instalación",
    description: "Incluida en cada proyecto. Trabajamos en CABA y GBA.",
  },
];

const spaces = [
  "Cocinas",
  "Vestidores",
  "Placares",
  "Living",
  "Dormitorios",
  "Oficinas",
  "Mobiliario integral",
  "Proyectos especiales",
];

export function Services() {
  return (
    <section
      id="servicios"
      className="pb-[clamp(80px,11vw,160px)] pt-[clamp(64px,8vw,120px)]"
    >
      <div className="wrap flex flex-col gap-[clamp(40px,5vw,72px)]">
        <div className="flex flex-col gap-[18px]">
          <SectionLabel>02 — Qué hacemos</SectionLabel>
          <h2 className="max-w-[980px] text-balance font-serif text-[clamp(32px,4.2vw,60px)] font-light leading-[1.08] tracking-[-0.015em]">
            Nos ocupamos del mueble de principio a fin: lo diseñamos, lo
            fabricamos y lo instalamos.
          </h2>
        </div>

        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-[clamp(20px,4vw,64px)] gap-y-10">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-[14px] border-t border-arq-ink pt-[22px]"
            >
              <h3 className="font-serif text-[30px]">{service.title}</h3>
              <p className="text-pretty text-[15px] leading-[1.6] text-arq-stone">
                {service.description}
              </p>
            </div>
          ))}
        </Reveal>

        <ul className="flex flex-wrap gap-x-7 gap-y-[10px] pt-2 text-[14px] text-arq-stone">
          {spaces.map((space) => (
            <li key={space}>{space}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
