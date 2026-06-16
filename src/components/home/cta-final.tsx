"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatWhatsAppUrl } from "@/lib/utils";

export function CTAFinal() {
  const whatsappMsg =
    "Hola ARQVIA! Quiero diseñar mi próximo espacio. ¿Pueden ayudarme?";

  return (
    <section className="section-padding relative overflow-hidden bg-[#0D0D0D]">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 rule" />

      <div className="container-arq relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-5 h-px bg-arq-dim/30" />
            <span className="text-xs font-normal tracking-[0.16em] uppercase text-arq-dim/60">
              Empezá hoy
            </span>
            <div className="w-5 h-px bg-arq-dim/30" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-[-0.025em] text-arq-white mb-5 max-w-3xl mx-auto">
            Diseñemos tu{" "}
            <span className="font-semibold">próximo espacio</span>
          </h2>

          <p className="text-base text-arq-dim max-w-lg mx-auto mb-12 leading-relaxed font-light">
            Contanos tu proyecto. En menos de 24hs te enviamos una propuesta
            personalizada con diseño 3D incluido.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href={formatWhatsAppUrl(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-green-600 hover:bg-green-500 text-white font-medium text-base transition-colors"
            >
              <MessageCircle size={18} />
              Escribinos por WhatsApp
            </motion.a>

            <Link
              href="/cotizacion"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm border border-arq-border hover:border-white/20 text-arq-dim hover:text-arq-white font-light text-base transition-all duration-300 group"
            >
              Formulario de cotización
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-arq-border"
          >
            {[
              "Diseño 3D gratis",
              "Instalación incluida",
              "Garantía de calidad",
              "CABA y GBA",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-arq-dim font-light">
                <div className="w-1 h-1 rounded-full bg-arq-dim/40" />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 rule" />
    </section>
  );
}
