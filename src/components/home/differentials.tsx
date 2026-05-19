"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Cpu,
  Layers,
  Zap,
  Wifi,
  Wrench,
  Ruler,
  Shield,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

const differentials = [
  {
    icon: Layers,
    title: "Melamina premium",
    description:
      "Tableros de alta densidad con acabados que resisten el paso del tiempo. Sin deformaciones ni desprendimientos.",
    accentColor: "blue" as const,
  },
  {
    icon: Lightbulb,
    title: "Iluminación LED",
    description:
      "Tiras LED RGB integradas con control inteligente. Ambiental, funcional y cinematográfico.",
    accentColor: "blue" as const,
  },
  {
    icon: Cpu,
    title: "Tecnología integrada",
    description:
      "Cada mueble diseñado para integrar la tecnología que usás. Sin cables expuestos, sin adaptadores.",
    accentColor: "red" as const,
  },
  {
    icon: Wifi,
    title: "Carga inalámbrica",
    description:
      "Superficies con Qi integrado. Apoyás el celular y carga. Sin cables, sin desorden.",
    accentColor: "blue" as const,
  },
  {
    icon: Zap,
    title: "USB & conectividad",
    description:
      "Puertos USB-A y USB-C integrados. Diseñados para tu setup, no como agregado.",
    accentColor: "red" as const,
  },
  {
    icon: Ruler,
    title: "Diseño a medida",
    description:
      "Cada mueble diseñado específicamente para tu espacio. Medición, diseño 3D y fabricación custom.",
    accentColor: "blue" as const,
  },
  {
    icon: Wrench,
    title: "Instalación profesional",
    description:
      "Nuestro equipo instala y deja todo funcionando. No entregamos cajas, instalamos experiencias.",
    accentColor: "red" as const,
  },
  {
    icon: Shield,
    title: "Garantía de calidad",
    description:
      "Respaldamos cada trabajo con garantía. Fabricamos para que dure décadas.",
    accentColor: "blue" as const,
  },
];

export function Differentials() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0D0D14 50%, #0A0A0A 100%)" }}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-ef-blue/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-ef relative">
        <SectionHeader
          eyebrow="Por qué efstudio"
          title="Diseñamos el"
          titleAccent="futuro de tu espacio"
          description="No fabricamos muebles. Fabricamos la experiencia de vivir en un espacio que te representa."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {differentials.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group glass glass-hover rounded-2xl p-6 transition-all duration-300"
              >
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 transition-colors",
                    item.accentColor === "blue"
                      ? "bg-ef-blue/10 text-ef-blue group-hover:bg-ef-blue/20"
                      : "bg-ef-red/10 text-ef-red group-hover:bg-ef-red/20"
                  )}
                >
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-ef-white text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-ef-dim leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
