"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Upload,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
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
  "Gamer RGB",
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
    const msg = `Hola efstudio! Quiero cotizar:\n
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
      <div className="min-h-screen bg-ef-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-semibold text-ef-white mb-3">
            ¡Mensaje enviado!
          </h2>
          <p className="text-ef-dim leading-relaxed mb-8">
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
    <div className="min-h-screen bg-ef-black">
      {/* Hero */}
      <div className="relative pt-32 pb-12 overflow-hidden border-b border-ef-border">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-ef-blue/4 blur-[120px] rounded-full pointer-events-none" />
        <div className="container-ef relative max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-ef-blue" />
              <span className="text-xs font-medium tracking-widest uppercase text-ef-blue">
                Cotización
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ef-white mb-4">
              Diseñemos tu
              <span className="text-gradient-blue"> espacio</span>
            </h1>
            <p className="text-ef-dim text-lg leading-relaxed">
              Completá el formulario y en menos de 24hs te enviamos una propuesta
              con diseño 3D incluido. Sin costo.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="container-ef py-16 max-w-2xl">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Nombre + WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ef-dim mb-2 uppercase tracking-wider">
                Nombre *
              </label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className="w-full glass rounded-xl px-4 py-3 text-sm text-ef-white placeholder:text-ef-dim/50 focus:outline-none focus:border-ef-blue/50 transition-colors bg-transparent border border-ef-border"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ef-dim mb-2 uppercase tracking-wider">
                WhatsApp *
              </label>
              <input
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                placeholder="+54 9 11 ..."
                className="w-full glass rounded-xl px-4 py-3 text-sm text-ef-white placeholder:text-ef-dim/50 focus:outline-none focus:border-ef-blue/50 transition-colors bg-transparent border border-ef-border"
              />
            </div>
          </div>

          {/* Ambiente */}
          <div>
            <label className="block text-xs font-medium text-ef-dim mb-2 uppercase tracking-wider">
              Ambiente *
            </label>
            <select
              name="ambiente"
              value={formData.ambiente}
              onChange={handleChange}
              required
              className="w-full glass rounded-xl px-4 py-3 text-sm text-ef-white focus:outline-none focus:border-ef-blue/50 transition-colors bg-ef-surface border border-ef-border"
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
            <label className="block text-xs font-medium text-ef-dim mb-2 uppercase tracking-wider">
              Medidas aproximadas
            </label>
            <input
              name="medidas"
              value={formData.medidas}
              onChange={handleChange}
              placeholder="Ej: 3.5m x 4m, pared de 2.5m de alto"
              className="w-full glass rounded-xl px-4 py-3 text-sm text-ef-white placeholder:text-ef-dim/50 focus:outline-none focus:border-ef-blue/50 transition-colors bg-transparent border border-ef-border"
            />
          </div>

          {/* Estilo */}
          <div>
            <label className="block text-xs font-medium text-ef-dim mb-3 uppercase tracking-wider">
              Estilo preferido
            </label>
            <div className="flex flex-wrap gap-2">
              {estilos.map((estilo) => (
                <button
                  key={estilo}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, estilo }))
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    formData.estilo === estilo
                      ? "bg-ef-blue text-white shadow-lg"
                      : "glass text-ef-dim hover:text-ef-white"
                  }`}
                >
                  {estilo}
                </button>
              ))}
            </div>
          </div>

          {/* Presupuesto */}
          <div>
            <label className="block text-xs font-medium text-ef-dim mb-3 uppercase tracking-wider">
              Presupuesto orientativo
            </label>
            <div className="flex flex-wrap gap-2">
              {presupuestos.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, presupuesto: p }))
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    formData.presupuesto === p
                      ? "bg-ef-blue text-white shadow-lg"
                      : "glass text-ef-dim hover:text-ef-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-medium text-ef-dim mb-2 uppercase tracking-wider">
              Contanos más
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="¿Qué tenés en mente? ¿Hay referencias de estilo, colores, funcionalidades específicas?"
              className="w-full glass rounded-xl px-4 py-3 text-sm text-ef-white placeholder:text-ef-dim/50 focus:outline-none focus:border-ef-blue/50 transition-colors bg-transparent border border-ef-border resize-none"
            />
          </div>

          {/* Upload note */}
          <div className="glass rounded-xl p-4 border border-ef-border flex items-center gap-3">
            <Upload size={16} className="text-ef-blue flex-shrink-0" />
            <p className="text-xs text-ef-dim">
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
              <Send size={16} />
              Enviar cotización por WhatsApp
            </button>
            <a
              href={formatWhatsAppUrl("Hola! Quiero cotizar un mueble con efstudio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Chat directo
            </a>
          </div>

          <p className="text-xs text-ef-dim text-center">
            Al enviar el formulario se abrirá WhatsApp con el resumen de tu
            consulta. Respondemos en menos de 24hs.
          </p>
        </motion.form>
      </div>
    </div>
  );
}
