import Link from "next/link";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  formatWhatsAppUrl,
  whatsAppMessage,
} from "@/lib/utils";

const navLinks = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/catalogo", label: "Piezas" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const linkClass = "link flex min-h-11 items-center";

export function Footer() {
  return (
    <footer className="border-t border-arq-line py-[clamp(40px,5vw,64px)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-[clamp(20px,4vw,64px)] gap-y-9">
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium tracking-[0.22em]">
            ARQVIA
          </span>
          <span className="text-[14px] leading-[1.6] text-arq-stone">
            Diseño, fabricación e instalación de mobiliario a medida. CABA y
            GBA.
          </span>
        </div>

        <nav aria-label="Pie de página" className="flex flex-col text-[14px]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col text-[14px]">
          <a
            href={formatWhatsAppUrl(whatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
            className={linkClass}
          >
            {WHATSAPP_DISPLAY}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
            {CONTACT_EMAIL}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Instagram @arqvia
          </a>
        </div>

        <span className="self-end text-[13px] text-arq-stone">© ArqVia</span>
      </div>
    </footer>
  );
}
