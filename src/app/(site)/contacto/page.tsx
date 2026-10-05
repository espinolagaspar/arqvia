import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/section-label";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  formatWhatsAppUrl,
  whatsAppMessage,
} from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Hablemos de tu proyecto de mobiliario a medida. WhatsApp, email e Instagram de ARQVIA. Trabajamos en CABA y GBA.",
};

const channels = [
  {
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: formatWhatsAppUrl(whatsAppMessage()),
    external: true,
  },
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
  {
    label: "Instagram",
    value: "@arqvia",
    href: INSTAGRAM_URL,
    external: true,
  },
];

export default function ContactoPage() {
  return (
    <section className="pb-[clamp(80px,11vw,160px)] pt-[calc(64px+clamp(40px,6vw,88px))]">
      <div className="wrap flex flex-col gap-[clamp(40px,5vw,72px)]">
        <div className="flex flex-col gap-[18px]">
          <SectionLabel>Contacto</SectionLabel>
          <h1 className="max-w-[1100px] text-balance font-serif text-[clamp(46px,7.6vw,120px)] font-light leading-[0.98] tracking-[-0.025em]">
            Hablemos de tu proyecto.
          </h1>
          <p className="max-w-[480px] text-pretty text-[15px] leading-[1.6] text-arq-stone">
            Contanos qué necesitás y cómo usás el espacio. Trabajamos en CABA y
            GBA.
          </p>
        </div>

        <ul className="flex flex-col border-t border-arq-ink">
          {channels.map((channel) => (
            <li key={channel.label} className="border-b border-arq-line">
              <a
                href={channel.href}
                {...(channel.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="link flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 py-7"
              >
                <SectionLabel>{channel.label}</SectionLabel>
                <span className="break-all font-serif text-[clamp(26px,3.4vw,48px)] font-light leading-[1.1] tracking-[-0.01em]">
                  {channel.value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
          <a
            href={formatWhatsAppUrl(whatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink"
          >
            Hablar por WhatsApp <span aria-hidden>→</span>
          </a>
          <Link href="/cotizacion" className="link-line h-[52px] text-[15px]">
            Pedir una cotización
          </Link>
          <span className="text-[14px] text-arq-stone">
            Diseño 3D sin cargo · Render en 48–72 hs · Instalación incluida
          </span>
        </div>
      </div>
    </section>
  );
}
