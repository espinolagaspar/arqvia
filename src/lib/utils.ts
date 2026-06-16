import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsAppUrl(message: string, phone = "5491132368891") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_NUMBER = "5491132368891";
export const WHATSAPP_DEFAULT_MSG =
  "Hola! Me interesa conocer más sobre los muebles de ARQVIA.";
