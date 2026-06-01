"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-ef-black"
    >
      {/* Background — subtle depth, no cyber */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0A0A0A] to-[#0A0A0A]" />

        {/* Very subtle warm glow — like ambient light on a surface */}
        <div className="absolute -top-60 left-1/4 w-[700px] h-[700px] rounded-full bg-white/[0.012] blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-white/[0.008] blur-[120px]" />
      </div>

      {/* Architectural composition — right panel */}
      <motion.div
        style={{ y, opacity }}
        className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:flex items-center justify-end pointer-events-none"
      >
        {/* Geometric panel — suggests a furniture surface */}
        <div className="relative w-full h-full">
          {/* Main surface */}
          <div className="absolute right-0 top-[15%] bottom-[15%] w-[70%] bg-gradient-to-l from-[#111111] to-transparent border-l border-white/[0.04]" />
          {/* Horizontal shelf line */}
          <div className="absolute right-0 top-[52%] w-[65%] h-px bg-white/[0.06]" />
          {/* Vertical proportion line */}
          <div className="absolute right-[30%] top-[20%] bottom-[20%] w-px bg-white/[0.04]" />
          {/* Small accent detail */}
          <div className="absolute right-[28%] top-1/2 -translate-y-1/2 w-6 h-6 border border-white/[0.08] rounded-sm" />
          {/* Bottom surface glow — very subtle, like material reflection */}
          <div className="absolute bottom-[12%] right-0 w-[60%] h-32 bg-gradient-to-t from-white/[0.015] to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="container-ef relative z-10 pt-20"
      >
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-6 h-px bg-ef-dim/40" />
            <span className="text-xs font-normal tracking-[0.18em] uppercase text-ef-dim">
              Diseño · Fabricación · Tecnología integrada
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-light tracking-[-0.03em] text-ef-white leading-[1.05] mb-7"
          >
            Muebles que
            <br />
            <span className="font-semibold">elevan</span> tu espacio.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base sm:text-lg text-ef-dim leading-relaxed mb-12 max-w-lg font-light"
          >
            Melamina premium, tecnología integrada y fabricación de precisión.
            Cada pieza diseñada para transformar cómo vivís tu espacio.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link href="/catalogo" className="btn-primary group">
              Ver catálogo
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link href="/cotizacion" className="btn-secondary">
              Solicitar propuesta
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex gap-10 mt-16 pt-8 border-t border-white/[0.06]"
          >
            {[
              { value: "100+", label: "Proyectos realizados" },
              { value: "5 años", label: "De experiencia" },
              { value: "100%", label: "Fabricación propia" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl font-semibold text-ef-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-ef-dim mt-1 font-light">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-ef-dim/50 tracking-[0.2em] uppercase font-light">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-ef-dim/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
