import { Reveal } from "@/components/shared/reveal";
import { SectionLabel } from "@/components/shared/section-label";

const steps = [
  {
    title: "Idea",
    description: "Nos contás qué necesitás y cómo usás el espacio.",
  },
  {
    title: "Diseño",
    description: "Te presentamos la propuesta en 3D, sin cargo, en 48–72 hs.",
  },
  {
    title: "Relevamiento",
    description: "Medimos el espacio para fabricar a medida exacta.",
  },
  {
    title: "Fabricación",
    description: "Producimos cada pieza en nuestro taller.",
  },
  {
    title: "Instalación",
    description: "Instalamos y dejamos todo listo para usar.",
  },
];

export function ProcessSteps() {
  return (
    <section id="proceso" className="py-[clamp(80px,11vw,160px)]">
      <div className="wrap flex flex-col gap-[clamp(40px,5vw,80px)]">
        <div className="flex flex-col gap-[18px]">
          <SectionLabel>04 — Proceso</SectionLabel>
          <h2 className="title-section">De la idea a la instalación</h2>
        </div>

        <Reveal>
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-[clamp(16px,2vw,32px)]">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col gap-[14px] border-t border-[rgba(26,25,23,0.22)] pb-9 pt-[22px]"
              >
                <span className="font-serif text-[clamp(48px,5vw,72px)] font-light leading-none text-arq-wood">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] font-medium">{step.title}</h3>
                <p className="text-pretty text-[14px] leading-[1.6] text-arq-stone">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
