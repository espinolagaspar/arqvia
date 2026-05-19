"use client";

import { motion } from "framer-motion";
import { Ruler, Box, Settings, CheckCircle } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const steps = [
  {
    number: "01",
    icon: Ruler,
    title: "Medición",
    description:
      "Visitamos tu espacio, tomamos medidas precisas y evaluamos condiciones estructurales, luz natural y flujos de tráfico.",
    detail: "Sin cargo · CABA y GBA",
  },
  {
    number: "02",
    icon: Box,
    title: "Diseño 3D",
    description:
      "Creamos renders fotorrealistas de tu proyecto para que veas exactamente cómo quedará antes de fabricar una sola pieza.",
    detail: "Render en 48–72hs",
  },
  {
    number: "03",
    icon: Settings,
    title: "Fabricación",
    description:
      "Fabricamos en nuestro taller con melamina premium, herrajes europeos y cableado LED certificado.",
    detail: "Plazo según proyecto",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Instalación",
    description:
      "Nuestro equipo instala, programa el LED, conecta la carga inalámbrica y deja todo funcionando.",
    detail: "Instalación incluida",
  },
];

export function ProcessTimeline() {
  return (
    <section className="section-padding bg-[#0D0D0D]">
      {/* Top rule */}
      <div className="rule" />

      <div className="container-ef">
        <SectionHeader
          eyebrow="Proceso"
          title="Del concepto"
          titleAccent="a tu espacio"
          description="Cuatro pasos que garantizan que el resultado supere tus expectativas."
        />

        <div className="relative">
          {/* Connecting rule (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/[0.06]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative flex flex-col"
                >
                  {/* Step icon */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-sm glass flex items-center justify-center border border-white/[0.06]">
                        <Icon size={24} className="text-ef-dim" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-sm bg-ef-black border border-ef-border flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-ef-dim">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-base font-medium text-ef-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-ef-dim leading-relaxed mb-4 font-light">
                      {step.description}
                    </p>
                    <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs bg-white/[0.04] text-ef-dim border border-white/[0.06] font-light">
                      {step.detail}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rule mt-0" />
    </section>
  );
}
