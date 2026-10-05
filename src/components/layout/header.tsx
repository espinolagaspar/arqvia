"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/components/layout/site-context";
import { CONTACT_EMAIL } from "@/lib/utils";

const navLinks = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const { menuOpen, setMenuOpen, waUrl } = useSite();
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Si la ventana pasa a desktop con el menú abierto, lo cierra.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 820px)");
    const onChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [setMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[rgba(26,25,23,0.10)] bg-[rgba(241,237,230,0.92)] backdrop-blur-[10px]">
        <div className="wrap flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="link flex h-11 items-center text-[14px] font-medium tracking-[0.22em]"
          >
            ARQVIA
          </Link>

          <nav
            aria-label="Principal"
            className="hidden items-center gap-9 text-[14px] nav:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link flex h-11 items-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line hidden h-11 text-[14px] nav:inline-flex"
          >
            WhatsApp <span className="text-[12px]">↗</span>
          </a>

          <div className="flex items-center gap-5 nav:hidden">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link flex h-11 items-center text-[14px]"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="flex h-11 cursor-pointer items-center pl-2 text-[14px]"
            >
              {menuOpen ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 bottom-0 top-16 z-[49] flex flex-col justify-between overflow-y-auto bg-arq-bone px-5 pb-10 pt-6 nav:hidden"
        >
          <nav aria-label="Menú" className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[rgba(26,25,23,0.12)] py-[18px] font-serif text-[44px] font-light leading-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-3 text-[14px] text-arq-stone">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink"
            >
              Hablar por WhatsApp
            </a>
            <span>CABA y GBA · {CONTACT_EMAIL}</span>
          </div>
        </div>
      )}
    </>
  );
}
