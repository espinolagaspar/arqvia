"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/shared/section-label";
import { cn, formatWhatsAppUrl, whatsAppMessage } from "@/lib/utils";

const ambientes = [
  "Cocina",
  "Vestidor",
  "Placard",
  "Living",
  "Dormitorio",
  "Oficina",
  "Mobiliario integral",
  "Otro",
];

const presupuestos = [
  "Menos de $500.000",
  "$500.000 – $1.000.000",
  "$1.000.000 – $2.000.000",
  "Más de $2.000.000",
  "No tengo definido",
];

const fieldLabel = "label mb-2 block";

export default function CotizacionPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    whatsapp: "",
    ambiente: "",
    medidas: "",
    presupuesto: "",
    descripcion: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hola ArqVia, quiero pedir una cotización:\n
Nombre: ${formData.nombre}
WhatsApp: ${formData.whatsapp}
Ambiente: ${formData.ambiente}
Medidas: ${formData.medidas}
Presupuesto: ${formData.presupuesto}
Detalle: ${formData.descripcion}`;
    window.open(formatWhatsAppUrl(msg), "_blank");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="pb-[clamp(80px,11vw,160px)] pt-[calc(64px+clamp(40px,6vw,88px))]">
        <div className="wrap flex flex-col items-start gap-7">
          <SectionLabel>Cotización</SectionLabel>
          <h1 className="title-section">Te llevamos a WhatsApp.</h1>
          <p className="max-w-[480px] text-pretty text-[15px] leading-[1.6] text-arq-stone">
            Se abrió WhatsApp con el resumen de tu consulta. Enviá el mensaje y
            seguimos la conversación por ahí.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="link-line h-[52px] cursor-pointer text-[15px]"
          >
            Enviar otra consulta
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-[clamp(80px,11vw,160px)] pt-[calc(64px+clamp(40px,6vw,88px))]">
      <div className="wrap flex flex-wrap gap-x-[clamp(40px,6vw,120px)] gap-y-12">
        <div className="flex max-w-[520px] flex-[1_1_320px] flex-col gap-[18px]">
          <SectionLabel>Cotización</SectionLabel>
          <h1 className="title-section">Contanos tu proyecto.</h1>
          <p className="text-pretty text-[15px] leading-[1.6] text-arq-stone">
            Completá el formulario y te presentamos el diseño en 3D, sin cargo,
            en 48–72 hs.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex max-w-[760px] flex-[2_1_420px] flex-col gap-7"
        >
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <div>
              <label htmlFor="nombre" className={fieldLabel}>
                Nombre *
              </label>
              <input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Tu nombre"
                className="field"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className={fieldLabel}>
                WhatsApp *
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                autoComplete="tel"
                placeholder="+54 9 11 ..."
                className="field"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ambiente" className={fieldLabel}>
              Ambiente *
            </label>
            <select
              id="ambiente"
              name="ambiente"
              value={formData.ambiente}
              onChange={handleChange}
              required
              className="field"
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

          <div>
            <label htmlFor="medidas" className={fieldLabel}>
              Medidas aproximadas
            </label>
            <input
              id="medidas"
              name="medidas"
              value={formData.medidas}
              onChange={handleChange}
              placeholder="Ej: pared de 3,5 m de ancho y 2,6 m de alto"
              className="field"
            />
          </div>

          <fieldset>
            <legend className={fieldLabel}>Presupuesto orientativo</legend>
            <div className="flex flex-wrap gap-2">
              {presupuestos.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={formData.presupuesto === p}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, presupuesto: p }))
                  }
                  className={cn(
                    "h-11 cursor-pointer border px-4 text-[14px] transition-colors",
                    formData.presupuesto === p
                      ? "border-arq-ink bg-arq-ink text-arq-bone"
                      : "border-arq-line text-arq-stone hover:border-arq-ink hover:text-arq-ink",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="descripcion" className={fieldLabel}>
              Contanos más
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Qué necesitás, cómo usás el espacio, materiales o referencias que te gusten."
              className="field resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-1">
            <button type="submit" className="btn btn-ink">
              Enviar por WhatsApp <span aria-hidden>→</span>
            </button>
            <a
              href={formatWhatsAppUrl(whatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line h-[52px] text-[15px]"
            >
              Prefiero escribir directo
            </a>
          </div>

          <p className="text-[13px] leading-[1.6] text-arq-stone">
            Al enviar se abre WhatsApp con el resumen de tu consulta. Después
            podés mandarnos fotos del espacio por ahí.
          </p>
        </form>
      </div>
    </section>
  );
}
