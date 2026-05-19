"use client";

import { motion } from "framer-motion";
import { Code2, Compass, Zap, Heart } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { CTAFinal } from "@/components/home/cta-final";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Compass,
    title: "Diseño con propósito",
    description:
      "Cada línea, cada medida, cada detalle tiene una razón de ser. No diseñamos para llenar espacio, diseñamos para mejorar tu vida.",
    accentColor: "blue" as const,
  },
  {
    icon: Code2,
    title: "Tecnología nativa",
    description:
      "Venimos del mundo tech. Entendemos cómo vivís con la tecnología y diseñamos muebles que la integran de forma natural.",
    accentColor: "blue" as const,
  },
  {
    icon: Zap,
    title: "Fabricación obsesiva",
    description:
      "Melamina importada, herrajes europeos, LED certificados. No abaratamos procesos porque sabemos que el detalle se ve.",
    accentColor: "red" as const,
  },
  {
    icon: Heart,
    title: "Cero compromiso",
    description:
      "Si no nos gusta el resultado, no lo entregamos. Nuestro estándar es el que nosotros mismos querríamos en casa.",
    accentColor: "red" as const,
  },
];

function ValueCard({ item, i }: { item: (typeof values)[0]; i: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="glass glass-hover rounded-2xl p-8 group transition-all duration-300"
    >
      <div
        className={cn(
          "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 transition-colors",
          item.accentColor === "blue"
            ? "bg-ef-blue/10 text-ef-blue group-hover:bg-ef-blue/20"
            : "bg-ef-red/10 text-ef-red group-hover:bg-ef-red/20"
        )}
      >
        <Icon size={22} />
      </div>
      <h3 className="text-lg font-semibold text-ef-white mb-3">{item.title}</h3>
      <p className="text-sm text-ef-dim leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-ef-black">
      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-ef-blue/4 blur-[120px] rounded-full" />
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-ef-red/3 blur-[80px] rounded-full" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(rgba(30,144,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30,144,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="container-ef relative max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-ef-blue" />
              <span className="text-xs font-medium tracking-widest uppercase text-ef-blue">
                Nuestra historia
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-ef-white mb-8">
              Diseño +<br />
              <span className="text-gradient-blue">Tecnología.</span>
            </h1>
            <p className="text-xl text-ef-dim leading-relaxed max-w-2xl">
              Nació de una obsesión compartida: un arquitecto y un analista de
              sistemas que no encontraban muebles a la altura de sus espacios.
              Así que los fabricamos nosotros.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <div className="container-ef pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-80 rounded-2xl overflow-hidden glass">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-black" />
              {/* Studio visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 border border-ef-blue/20 rounded-xl" />
                  <div className="absolute top-4 left-4 right-4 bottom-4 border border-ef-blue/10 rounded-lg" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ef-blue/40 to-transparent" />
                  <div className="absolute top-0 left-1/2 bottom-0 w-px bg-gradient-to-b from-transparent via-ef-blue/40 to-transparent" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-ef-blue glow-blue animate-led-pulse" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-ef-blue/10 blur-2xl" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-semibold text-ef-white mb-6">
              El problema que decidimos resolver
            </h2>
            <div className="space-y-4 text-ef-dim leading-relaxed">
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
                tecnología, y efstudio nació como la respuesta a esa brecha.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {values.map((val, i) => (
            <ValueCard key={val.title} item={val} i={i} />
          ))}
        </div>

        {/* Team */}
        <div className="led-line mb-20 opacity-30" />
        <SectionHeader
          eyebrow="El equipo"
          title="Quiénes"
          titleAccent="somos"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              role: "Arquitecto & Director de Diseño",
              description:
                "Formación en arquitectura con especialización en diseño de interiores y mobiliario. Obsesionado con las proporciones, los materiales y la luz.",
              accent: "blue" as const,
            },
            {
              role: "Analista de Sistemas & Director de Tecnología",
              description:
                "Background en desarrollo de software y sistemas embebidos. Responsable de integrar la tecnología dentro del mobiliario de forma invisible y elegante.",
              accent: "red" as const,
            },
          ].map((member, i) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-8"
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl font-bold",
                  member.accent === "blue"
                    ? "bg-ef-blue/10 text-ef-blue"
                    : "bg-ef-red/10 text-ef-red"
                )}
              >
                {i === 0 ? "A" : "T"}
              </div>
              <h3 className="text-base font-semibold text-ef-white mb-3">
                {member.role}
              </h3>
              <p className="text-sm text-ef-dim leading-relaxed">
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
