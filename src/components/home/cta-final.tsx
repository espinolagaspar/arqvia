"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatWhatsAppUrl } from "@/lib/utils";

export function CTAFinal() {
  const whatsappMsg =
    "Hola efstudio! Quiero diseñar mi próximo espacio. ¿Pueden ayudarme?";

  return (
    <section className="section-padding relative overflow-hidden bg-ef-graphite">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-ef-blue/6 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-ef-red/4 blur-[80px] rounded-full" />
      </div>

      {/* Top LED line */}
      <div className="absolute top-0 left-0 right-0 h-px led-line" />

      <div className="container-ef relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-ef-blue" />
            <span className="text-xs font-medium tracking-widest uppercase text-ef-blue">
              Empezá hoy
            </span>
            <div className="w-8 h-px bg-ef-blue" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ef-white mb-4 max-w-3xl mx-auto">
            Diseñemos tu
            <span className="text-gradient-blue"> próximo espacio</span>
          </h2>

          <p className="text-lg text-ef-dim max-w-xl mx-auto mb-10 leading-relaxed">
            Contanos tu proyecto. En menos de 24hs te enviamos una propuesta
            personalizada con diseño 3D incluido.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={formatWhatsAppUrl(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-green-500 hover:bg-green-400 text-white font-semibold text-lg transition-colors shadow-xl"
              style={{ boxShadow: "0 0 30px rgba(34,197,94,0.3)" }}
            >
              <MessageCircle size={22} />
              Escribinos por WhatsApp
            </motion.a>

            <Link
              href="/cotizacion"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-ef-border hover:border-ef-blue/30 text-ef-white hover:text-ef-blue font-medium text-lg transition-all duration-200 group"
            >
              Formulario de cotización
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-10 border-t border-ef-border"
          >
            {[
              "Diseño 3D gratis",
              "Instalación incluida",
              "Garantía de calidad",
              "CABA y GBA",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-ef-dim">
                <div className="w-1.5 h-1.5 rounded-full bg-ef-blue" />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom LED line */}
      <div className="absolute bottom-0 left-0 right-0 h-px led-line opacity-50" />
    </section>
  );
}
