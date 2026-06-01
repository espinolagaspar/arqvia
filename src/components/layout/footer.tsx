import Link from "next/link";
import { Camera, Mail, Phone } from "lucide-react";

const footerLinks = {
  navegacion: [
    { href: "/", label: "Inicio" },
    { href: "/catalogo", label: "Catálogo" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/cotizacion", label: "Cotización" },
    { href: "/contacto", label: "Contacto" },
  ],
  categorias: [
    { href: "/catalogo?cat=dormitorio", label: "Dormitorio" },
    { href: "/catalogo?cat=living", label: "Living" },
    { href: "/catalogo?cat=oficina", label: "Oficina" },
    { href: "/catalogo?cat=gamer", label: "Setup" },
    { href: "/catalogo?cat=cocina", label: "Cocina" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-ef-border bg-[#0D0D0D]">
      <div className="container-ef py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-1.5 mb-5">
              <span className="text-xl font-semibold tracking-tight text-ef-white">
                ef
              </span>
              <span className="text-xl font-light tracking-tight text-ef-dim">
                studio
              </span>
            </Link>
            <p className="text-ef-dim text-sm leading-relaxed max-w-xs mb-6 font-light">
              Muebles contemporáneos con tecnología integrada. Diseño minimalista
              y fabricación premium para transformar tus espacios.
            </p>
            <div className="flex gap-2">
              <a
                href="https://instagram.com/efstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-sm text-ef-dim hover:text-ef-white hover:border-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Camera size={15} />
              </a>
              <a
                href="mailto:efstudio.service@gmail.com"
                className="p-2.5 glass rounded-sm text-ef-dim hover:text-ef-white hover:border-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
              <a
                href="https://wa.me/5491132368891"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-sm text-ef-dim hover:text-ef-white hover:border-white/10 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={15} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-ef-dim/50 mb-5">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.navegacion.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ef-dim hover:text-ef-white transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-ef-dim/50 mb-5">
              Categorías
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.categorias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ef-dim hover:text-ef-white transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="rule mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ef-dim/50 font-light">
            © {new Date().getFullYear()} efstudio. Todos los derechos reservados.
          </p>
          <p className="text-xs text-ef-dim/50 font-light">
            Fabricado en Argentina con melamina premium.
          </p>
        </div>
      </div>
    </footer>
  );
}
