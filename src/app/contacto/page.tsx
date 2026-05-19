"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Camera, MapPin, Clock, Phone } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/utils";

const contactChannels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+54 9 11 0000-0000",
    description: "Respuesta inmediata en horario hábil",
    action: formatWhatsAppUrl("Hola efstudio! Quiero hacer una consulta."),
    accentColor: "green" as const,
  },
  {
    icon: Camera,
    label: "Instagram",
    value: "@efstudio",
    description: "Seguinos para ver proyectos y novedades",
    action: "https://instagram.com/efstudio",
    accentColor: "blue" as const,
  },
  {
    icon: Mail,
    label: "Email",
    value: "hola@efstudio.com.ar",
    description: "Para consultas formales o presupuestos detallados",
    action: "mailto:hola@efstudio.com.ar",
    accentColor: "blue" as const,
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
    value: "Lun–Vie 9:00 – 19:00 / Sáb 9:00 – 13:00",
  },
  {
    icon: Phone,
    label: "Visitas al taller",
    value: "Con turno previo",
  },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-ef-black">
      {/* Hero */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b border-ef-border">
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-ef-blue/4 blur-[100px] rounded-full pointer-events-none" />
        <div className="container-ef relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-ef-blue" />
              <span className="text-xs font-medium tracking-widest uppercase text-ef-blue">
                Contacto
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ef-white mb-4">
              Hablemos de
              <br />
              <span className="text-gradient-blue">tu proyecto</span>
            </h1>
            <p className="text-xl text-ef-dim leading-relaxed max-w-lg">
              Cada proyecto empieza con una conversación. Contanos qué tenés en mente y te asesoramos sin compromiso.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-ef py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact channels */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-sm font-medium text-ef-dim uppercase tracking-widest mb-6">
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
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex items-center gap-5 glass glass-hover rounded-2xl p-6 transition-all duration-300"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      channel.accentColor === "green"
                        ? "bg-green-500/10 text-green-400 group-hover:bg-green-500/20"
                        : "bg-ef-blue/10 text-ef-blue group-hover:bg-ef-blue/20"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-ef-dim mb-0.5">{channel.label}</div>
                    <div className="text-base font-semibold text-ef-white group-hover:text-ef-blue transition-colors">
                      {channel.value}
                    </div>
                    <div className="text-xs text-ef-dim mt-0.5">
                      {channel.description}
                    </div>
                  </div>
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-full border border-ef-blue/30 flex items-center justify-center">
                      <span className="text-ef-blue text-xs">→</span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-medium text-ef-dim uppercase tracking-widest mb-6">
              Información
            </h2>
            <div className="glass rounded-2xl p-6 space-y-6">
              {info.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-ef-blue/10 flex items-center justify-center">
                      <Icon size={15} className="text-ef-blue" />
                    </div>
                    <div>
                      <div className="text-xs text-ef-dim mb-0.5">{item.label}</div>
                      <div className="text-sm text-ef-white font-medium">{item.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Direct WhatsApp CTA */}
            <motion.a
              href={formatWhatsAppUrl("Hola efstudio! Quiero hacer una consulta sobre sus muebles.")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green-500 hover:bg-green-400 text-white font-semibold transition-colors"
              style={{ boxShadow: "0 0 20px rgba(34,197,94,0.2)" }}
            >
              <MessageCircle size={18} />
              Escribinos ahora
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
