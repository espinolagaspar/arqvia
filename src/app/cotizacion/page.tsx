"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, CheckCircle } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/utils";

const ambientes = [
  "Dormitorio principal",
  "Dormitorio juvenil",
  "Living / Sala",
  "Oficina / Estudio",
  "Gaming room",
  "Cocina",
  "Otro",
];

const estilos = [
  "Minimalista oscuro",
  "Minimalista claro",
  "Industrial moderno",
  "Setup tecnológico",
  "Nórdico",
  "Otro",
];

const presupuestos = [
  "Menos de $500.000",
  "$500.000 – $1.000.000",
  "$1.000.000 – $2.000.000",
  "Más de $2.000.000",
  "No tengo definido",
];

const inputClass =
  "w-full bg-arq-surface-2 rounded-sm px-4 py-3 text-sm text-arq-white placeholder:text-arq-dim/40 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all border border-arq-border font-light";

export default function CotizacionPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    whatsapp: "",
    ambiente: "",
    medidas: "",
    estilo: "",
    presupuesto: "",
    descripcion: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hola ARQVIA! Quiero cotizar:\n
Nombre: ${formData.nombre}
WhatsApp: ${formData.whatsapp}
Ambiente: ${formData.ambiente}
Medidas: ${formData.medidas}
Estilo: ${formData.estilo}
Presupuesto: ${formData.presupuesto}
Detalle: ${formData.descripcion}`;
    window.open(formatWhatsAppUrl(msg), "_blank");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-arq-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-16 h-16 rounded-sm bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-light tracking-tight text-arq-white mb-3">
            ¡Mensaje enviado!
          </h2>
          <p className="text-arq-dim leading-relaxed mb-8 font-light text-sm">
            Te redirigimos a WhatsApp. En menos de 24hs te respondemos con una
            propuesta personalizada.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-secondary text-sm"
          >
            Enviar otra consulta
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-arq-black">
      {/* Hero */}
      <div className="relative pt-36 pb-12 overflow-hidden border-b border-arq-border">
        <div className="container-arq relative max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-5 h-px bg-arq-dim/30" />
              <span className="text-xs font-normal tracking-[0.16em] uppercase text-arq-dim/60">
                Cotización
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-arq-white mb-4 leading-[1.05]">
              Diseñemos tu{" "}
              <span className="font-semibold">espacio</span>
            </h1>
            <p className="text-arq-dim text-base leading-relaxed font-light">
              Completá el formulario y en menos de 24hs te enviamos una propuesta
              con diseño 3D incluido. Sin costo.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="container-arq py-16 max-w-2xl">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Nombre + WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-medium text-arq-dim/50 mb-2 uppercase tracking-[0.14em]">
                Nombre *
              </label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-arq-dim/50 mb-2 uppercase tracking-[0.14em]">
                WhatsApp *
              </label>
              <input
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                placeholder="+54 9 11 ..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Ambiente */}
          <div>
            <label className="block text-[10px] font-medium text-arq-dim/50 mb-2 uppercase tracking-[0.14em]">
              Ambiente *
            </label>
            <select
              name="ambiente"
              value={formData.ambiente}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="" disabled>
                Seleccioná el ambiente
              </option>
              {ambientes.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Medidas */}
          <div>
            <label className="block text-[10px] font-medium text-arq-dim/50 mb-2 uppercase tracking-[0.14em]">
              Medidas aproximadas
            </label>
            <input
              name="medidas"
              value={formData.medidas}
              onChange={handleChange}
              placeholder="Ej: 3.5m × 4m, pared de 2.5m de alto"
              className={inputClass}
            />
          </div>

          {/* Estilo */}
          <div>
            <label className="block text-[10px] font-medium text-arq-dim/50 mb-3 uppercase tracking-[0.14em]">
              Estilo preferido
            </label>
            <div className="flex flex-wrap gap-2">
              {estilos.map((estilo) => (
                <button
                  key={estilo}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, estilo }))}
                  className={`px-4 py-2 rounded-sm text-xs font-light tracking-wide transition-all duration-200 ${
                    formData.estilo === estilo
                      ? "bg-arq-white text-arq-black font-medium"
                      : "glass text-arq-dim hover:text-arq-white"
                  }`}
                >
                  {estilo}
                </button>
              ))}
            </div>
          </div>

          {/* Presupuesto */}
          <div>
            <label className="block text-[10px] font-medium text-arq-dim/50 mb-3 uppercase tracking-[0.14em]">
              Presupuesto orientativo
            </label>
            <div className="flex flex-wrap gap-2">
              {presupuestos.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, presupuesto: p }))}
                  className={`px-4 py-2 rounded-sm text-xs font-light tracking-wide transition-all duration-200 ${
                    formData.presupuesto === p
                      ? "bg-arq-white text-arq-black font-medium"
                      : "glass text-arq-dim hover:text-arq-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-[10px] font-medium text-arq-dim/50 mb-2 uppercase tracking-[0.14em]">
              Contanos más
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="¿Qué tenés en mente? Colores, referencias, funcionalidades específicas..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Upload note */}
          <div className="glass rounded-sm p-4 border border-arq-border flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-arq-dim/30 mt-1.5 flex-shrink-0" />
            <p className="text-xs text-arq-dim font-light leading-relaxed">
              Podés enviarnos fotos del espacio por WhatsApp una vez que te
              contactemos. Nos ayuda mucho a preparar tu propuesta.
            </p>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="btn-primary flex-1 justify-center gap-2"
            >
              <Send size={14} />
              Enviar cotización por WhatsApp
            </button>
            <a
              href={formatWhatsAppUrl("Hola! Quiero cotizar un mueble con ARQVIA.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} />
              Chat directo
            </a>
          </div>

          <p className="text-[11px] text-arq-dim/50 text-center font-light">
            Al enviar el formulario se abrirá WhatsApp con el resumen de tu
            consulta. Respondemos en menos de 24hs.
          </p>
        </motion.form>
      </div>
    </div>
  );
}
