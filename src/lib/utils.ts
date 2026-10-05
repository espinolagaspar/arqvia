import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_URL = "https://arqvia.com.ar";

export const WHATSAPP_NUMBER = "5491132368891";
export const WHATSAPP_DISPLAY = "+54 9 11 3236-8891";
export const CONTACT_EMAIL = "arqvia.service@gmail.com";
export const INSTAGRAM_URL = "https://instagram.com/arqvia";

export function formatWhatsAppUrl(message: string, phone = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Mensaje de WhatsApp según la página: genérico, o el del detalle de un proyecto. */
export function whatsAppMessage(projectName?: string) {
  return projectName
    ? `Hola ArqVia, vi el proyecto ${projectName} y quiero hablar de mi espacio.`
    : "Hola ArqVia, quiero hablar de un proyecto.";
}

/** "Cocina Negra" → "cocina-negra" */
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
