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
    { href: "/catalogo?cat=gamer", label: "Gamer" },
    { href: "/catalogo?cat=cocina", label: "Cocina" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-ef-border bg-ef-graphite">
      <div className="container-ef py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight text-ef-white">
                ef
              </span>
              <span className="text-2xl font-bold tracking-tight text-ef-blue">
                studio
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-ef-blue animate-led-pulse" />
            </Link>
            <p className="text-ef-dim text-sm leading-relaxed max-w-xs mb-6">
              Muebles modernos tecnológicos. Diseño minimalista, tecnología integrada
              y fabricación premium para transformar tus espacios.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/efstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-lg text-ef-dim hover:text-ef-blue hover:border-ef-blue/20 transition-colors"
                aria-label="Instagram"
              >
                <Camera size={16} />
              </a>
              <a
                href="mailto:hola@efstudio.com.ar"
                className="p-2.5 glass rounded-lg text-ef-dim hover:text-ef-blue hover:border-ef-blue/20 transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-lg text-ef-dim hover:text-ef-blue hover:border-ef-blue/20 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-ef-dim mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.navegacion.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ef-dim hover:text-ef-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-ef-dim mb-4">
              Categorías
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.categorias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ef-dim hover:text-ef-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="led-line mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ef-dim">
            © {new Date().getFullYear()} efstudio. Todos los derechos reservados.
          </p>
          <p className="text-xs text-ef-dim">
            Fabricado en Argentina con melamina premium.
          </p>
        </div>
      </div>
    </footer>
  );
}
