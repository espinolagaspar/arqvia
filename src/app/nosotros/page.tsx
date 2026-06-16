"use client";

import { motion } from "framer-motion";
import { Compass, Layers, Wrench, Heart } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { CTAFinal } from "@/components/home/cta-final";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Compass,
    title: "Diseño con propósito",
    description:
      "Cada línea, cada medida, cada detalle tiene una razón de ser. No diseñamos para llenar espacio, diseñamos para mejorar tu vida.",
  },
  {
    icon: Layers,
    title: "Materiales nobles",
    description:
      "Melamina importada, herrajes europeos, superficies mate. La calidad del material define la calidad del resultado.",
  },
  {
    icon: Wrench,
    title: "Fabricación obsesiva",
    description:
      "No abaratamos procesos. Cada corte, cada ensamble, cada detalle pasa por el mismo estándar que aplicaríamos a nuestro propio hogar.",
  },
  {
    icon: Heart,
    title: "Cero compromiso",
    description:
      "Si no nos gusta el resultado, no lo entregamos. Nuestro estándar es el que nosotros mismos querríamos en casa.",
  },
];

function ValueCard({ item, i }: { item: (typeof values)[0]; i: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass glass-hover rounded-lg p-8 group transition-all duration-300"
    >
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm mb-6 bg-white/[0.04] transition-colors group-hover:bg-white/[0.07]">
        <Icon size={18} className="text-arq-dim group-hover:text-arq-white transition-colors" />
      </div>
      <h3 className="text-base font-medium text-arq-white mb-3 leading-snug">{item.title}</h3>
      <p className="text-sm text-arq-dim leading-relaxed font-light">{item.description}</p>
    </motion.div>
  );
}

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-arq-black">
      {/* Hero */}
      <div className="relative pt-36 pb-24 overflow-hidden">
        {/* Subtle depth */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px rule" />
          <div className="absolute top-0 right-0 w-1/2 bottom-0 bg-gradient-to-l from-white/[0.012] to-transparent" />
        </div>

        <div className="container-arq relative max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-5 h-px bg-arq-dim/30" />
              <span className="text-xs font-normal tracking-[0.16em] uppercase text-arq-dim/60">
                Nuestra historia
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-arq-white mb-8 leading-[1.05]">
              Diseño +<br />
              <span className="font-semibold">Tecnología.</span>
            </h1>
            <p className="text-lg text-arq-dim leading-relaxed max-w-2xl font-light">
              Nació de una obsesión compartida: un arquitecto y un ingeniero de
              software que no encontraban muebles a la altura de sus espacios.
              Así que los fabricamos nosotros.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <div className="container-arq pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Visual — architectural composition */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative h-80 rounded-lg overflow-hidden glass">
              <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#0a0a0a]" />
              {/* Architectural line composition */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-52 h-52">
                  <div className="absolute inset-0 border border-white/[0.06] rounded-sm" />
                  <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/[0.04] rounded-sm" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.05]" />
                  <div className="absolute top-0 left-1/2 bottom-0 w-px bg-white/[0.05]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-sm border border-white/20" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-arq-white mb-6 leading-snug">
              El problema que<br /><span className="font-semibold">decidimos resolver</span>
            </h2>
            <div className="space-y-4 text-arq-dim leading-relaxed font-light text-sm sm:text-base">
              <p>
                Los muebles modernos que existían se veían bien en foto pero eran
                genéricos, sin atención al detalle, sin pensar en cómo vivimos
                realmente con la tecnología.
              </p>
              <p>
                Los cables siempre quedaban expuestos. Los cargadores siempre
                estorbaban. La iluminación siempre era un accesorio, nunca parte
                del diseño.
              </p>
              <p>
                Decidimos que podíamos hacerlo mejor. Unimos arquitectura con
                tecnología, y ARQVIA nació como la respuesta a esa brecha.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <SectionHeader
          eyebrow="Nuestros valores"
          title="Cómo"
          titleAccent="trabajamos"
          description="Cuatro principios que guían cada decisión que tomamos."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-24">
          {values.map((val, i) => (
            <ValueCard key={val.title} item={val} i={i} />
          ))}
        </div>

        {/* Team */}
        <div className="rule mb-24" />
        <SectionHeader
          eyebrow="El equipo"
          title="Quiénes"
          titleAccent="somos"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              letter: "A",
              role: "Arquitecto · Director de Diseño",
              description:
                "Formación en arquitectura con especialización en diseño de interiores y mobiliario. Obsesionado con las proporciones, los materiales y la luz.",
            },
            {
              letter: "T",
              role: "Software Engineering · Tech",
              description:
                "Background en desarrollo de software y sistemas embebidos. Responsable de integrar la tecnología dentro del mobiliario de forma invisible y elegante.",
            },
          ].map((member, i) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass rounded-lg p-8"
            >
              <div className="w-14 h-14 rounded-sm mb-6 flex items-center justify-center text-2xl font-semibold bg-white/[0.04] text-arq-white/30 border border-white/[0.06]">
                {member.letter}
              </div>
              <h3 className="text-sm font-medium text-arq-white mb-3 leading-snug">
                {member.role}
              </h3>
              <p className="text-sm text-arq-dim leading-relaxed font-light">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <CTAFinal />
    </div>
  );
}
