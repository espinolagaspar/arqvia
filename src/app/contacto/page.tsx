"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Camera, MapPin, Clock } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/utils";

const contactChannels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+54 9 11 3236-8891",
    description: "",
    action: formatWhatsAppUrl("Hola ARQVIA! Quiero hacer una consulta."),
    isGreen: true,
  },
  {
    icon: Camera,
    label: "Instagram",
    value: "@arqvia",
    description: "Seguinos para ver proyectos y novedades",
    action: "https://instagram.com/arqvia",
    isGreen: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "arqvia.service@gmail.com",
    description: "Para consultas formales o presupuestos detallados",
    action: "mailto:arqvia.service@gmail.com",
    isGreen: false,
  },
];

const info = [
  {
    icon: MapPin,
    label: "Zona de trabajo",
    value: "CABA y Gran Buenos Aires",
  },
  {
    icon: Clock,
    label: "Horarios de atención",
    value: "Lun–Vie 9:00–19:00 · Sáb 9:00–13:00",
  },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-arq-black">
      {/* Hero */}
      <div className="relative pt-36 pb-16 overflow-hidden border-b border-arq-border">
        <div className="container-arq relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-5 h-px bg-arq-dim/30" />
              <span className="text-xs font-normal tracking-[0.16em] uppercase text-arq-dim/60">
                Contacto
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-[-0.03em] text-arq-white mb-4 leading-[1.05]">
              Hablemos de
              <br />
              <span className="font-semibold">tu proyecto</span>
            </h1>
            <p className="text-lg text-arq-dim leading-relaxed max-w-lg font-light">
              Cada proyecto empieza con una conversación. Contanos qué tenés en mente
              y te asesoramos sin compromiso.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-arq py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact channels */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-[10px] font-semibold text-arq-dim/50 uppercase tracking-[0.15em] mb-6">
              Canales de contacto
            </h2>
            {contactChannels.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={channel.label}
                  href={channel.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group flex items-center gap-5 glass glass-hover rounded-lg p-6 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-sm flex items-center justify-center bg-white/[0.04] transition-colors group-hover:bg-white/[0.07]">
                    <Icon size={18} className={channel.isGreen ? "text-green-500" : "text-arq-dim group-hover:text-arq-white"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-arq-dim/50 mb-0.5 tracking-wide uppercase">{channel.label}</div>
                    <div className="text-sm font-medium text-arq-white leading-snug">
                      {channel.value}
                    </div>
                    {channel.description && (
                      <div className="text-xs text-arq-dim mt-0.5 font-light">
                        {channel.description}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-5 h-5 rounded-sm border border-arq-border flex items-center justify-center">
                      <span className="text-arq-dim text-xs">→</span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <h2 className="text-[10px] font-semibold text-arq-dim/50 uppercase tracking-[0.15em] mb-6">
              Información
            </h2>
            <div className="glass rounded-lg p-6 space-y-6">
              {info.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-white/[0.04] flex items-center justify-center">
                      <Icon size={14} className="text-arq-dim" />
                    </div>
                    <div>
                      <div className="text-[10px] text-arq-dim/50 mb-0.5 uppercase tracking-wide font-light">{item.label}</div>
                      <div className="text-sm text-arq-white font-light leading-snug">{item.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Direct WhatsApp CTA */}
            <motion.a
              href={formatWhatsAppUrl("Hola ARQVIA! Quiero hacer una consulta sobre sus muebles.")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-sm bg-green-600 hover:bg-green-500 text-white font-medium transition-colors text-sm"
            >
              <MessageCircle size={16} />
              Escribinos ahora
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
