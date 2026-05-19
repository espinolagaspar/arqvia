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
    detail: "Sin cargo — en CABA y GBA",
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
      "Nuestro equipo instala, programa el LED, conecta la carga inalámbrica y deja todo prolijo y funcionando.",
    detail: "Instalación incluida",
  },
];

export function ProcessTimeline() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0D1117 50%, #0A0A0A 100%)" }}
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-px led-line opacity-30" />

      <div className="container-ef relative">
        <SectionHeader
          eyebrow="Proceso"
          title="Del concepto"
          titleAccent="a tu espacio"
          description="Cuatro pasos que garantizan que el resultado supere tus expectativas."
          accentColor="red"
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-ef-border via-ef-blue/30 to-ef-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex flex-col"
                >
                  {/* Step number + icon */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border border-ef-blue/20 glow-blue-sm">
                        <Icon size={28} className="text-ef-blue" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-ef-black border border-ef-blue/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-ef-blue">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-ef-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-ef-dim leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-ef-blue/10 text-ef-blue border border-ef-blue/20">
                      {step.detail}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px led-line opacity-30" />
    </section>
  );
}
