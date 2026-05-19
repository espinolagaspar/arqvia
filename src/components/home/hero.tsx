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
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = ["transforman", "elevan", "definen", "inspiran"];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-ef-black"
    >
      {/* Background: cinematic LED environment */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#090912] to-black" />

        {/* Blue LED glow top-right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-ef-blue/5 blur-[120px]" />
        {/* Red accent bottom-left */}
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-ef-red/4 blur-[100px]" />
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-ef-blue/3 blur-[150px]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30,144,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30,144,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating LED strip lines */}
        <motion.div
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          className="absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-transparent via-ef-blue to-transparent opacity-60"
        />
        <motion.div
          animate={{ x: ["110%", "-10%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 2, delay: 2 }}
          className="absolute top-2/3 left-0 w-48 h-px bg-gradient-to-r from-transparent via-ef-red to-transparent opacity-40"
        />
      </div>

      {/* Visual furniture silhouette (right side) */}
      <motion.div
        style={{ y, opacity }}
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center pointer-events-none"
      >
        {/* Stylized mesa de luz */}
        <div className="relative w-80 h-80">
          {/* Main body */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-28 rounded-xl bg-gradient-to-br from-ef-surface to-ef-graphite border border-white/5 shadow-2xl" />
          {/* LED strip glow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-44 h-0.5 bg-ef-blue blur-sm animate-led-pulse" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-44 h-0.5 bg-ef-blue glow-blue" />
          {/* Wall mount */}
          <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-ef-border to-transparent" />
          {/* Surface glow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-60 h-8 bg-ef-blue/5 blur-xl rounded-full" />
          {/* Detail squares */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-3 h-3 rounded-sm bg-ef-blue/40" />
            <div className="w-3 h-3 rounded-sm bg-ef-blue/20" />
            <div className="w-3 h-3 rounded-sm bg-ef-blue/40" />
          </div>
          {/* Large ambient glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-ef-blue/6 blur-[60px] rounded-full" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="container-ef relative z-10 pt-20"
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-ef-blue" />
            <span className="text-xs font-medium tracking-widest uppercase text-ef-blue">
              Diseño · Tecnología · Fabricación
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-ef-white leading-[1.05] mb-6"
          >
            Muebles modernos
            <br />
            que{" "}
            <motion.span
              className="text-gradient-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              transforman
            </motion.span>
            <br />
            espacios.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-ef-dim leading-relaxed mb-10 max-w-xl"
          >
            Diseño minimalista, tecnología integrada y fabricación premium.
            Melamina de alta gama con LED, USB y carga inalámbrica.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/catalogo" className="btn-primary group">
              Ver catálogo
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link href="/cotizacion" className="btn-secondary">
              Cotizar ahora
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-8 mt-14 pt-8 border-t border-ef-border"
          >
            {[
              { value: "500+", label: "Proyectos realizados" },
              { value: "5 años", label: "De experiencia" },
              { value: "100%", label: "Fabricación propia" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-semibold text-ef-white">
                  {stat.value}
                </div>
                <div className="text-xs text-ef-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-ef-dim tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-ef-dim" />
        </motion.div>
      </motion.div>
    </section>
  );
}
