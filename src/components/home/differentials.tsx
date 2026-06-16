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

const differentials = [
  {
    icon: Layers,
    title: "Melamina premium",
    description:
      "Tableros de alta densidad con acabados que resisten el paso del tiempo. Sin deformaciones ni desprendimientos.",
  },
  {
    icon: Lightbulb,
    title: "Iluminación integrada",
    description:
      "Tiras LED integradas con control inteligente. Ambiental, funcional y cinematográfico, sin cables expuestos.",
  },
  {
    icon: Cpu,
    title: "Tecnología invisible",
    description:
      "Cada mueble diseñado para integrar la tecnología que usás. Sin cables visibles, sin adaptadores.",
  },
  {
    icon: Wifi,
    title: "Carga inalámbrica",
    description:
      "Superficies con Qi integrado. Apoyás el celular y carga. Sin cables, sin desorden.",
  },
  {
    icon: Zap,
    title: "USB & conectividad",
    description:
      "Puertos USB-A y USB-C integrados. Diseñados para tu setup, no como un agregado externo.",
  },
  {
    icon: Ruler,
    title: "Diseño a medida",
    description:
      "Cada mueble diseñado específicamente para tu espacio. Medición, diseño 3D y fabricación custom.",
  },
  {
    icon: Wrench,
    title: "Instalación incluida",
    description:
      "Nuestro equipo instala y deja todo funcionando. No entregamos cajas, instalamos experiencias.",
  },
  {
    icon: Shield,
    title: "Garantía de calidad",
    description:
      "Respaldamos cada trabajo con garantía. Fabricamos para que dure décadas.",
  },
];

export function Differentials() {
  return (
    <section className="section-padding bg-[#0D0D0D]">
      <div className="container-arq">
        <SectionHeader
          eyebrow="Por qué ARQVIA"
          title="Lo que nos"
          titleAccent="distingue"
          description="No fabricamos muebles. Fabricamos la experiencia de vivir en un espacio que te representa."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {differentials.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="group glass glass-hover rounded-lg p-6 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-sm mb-5 bg-white/[0.04] transition-colors group-hover:bg-white/[0.07]">
                  <Icon size={16} className="text-arq-dim group-hover:text-arq-white transition-colors" />
                </div>
                <h3 className="font-medium text-arq-white text-sm mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-arq-dim leading-relaxed font-light">
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
