"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { formatWhatsAppUrl, whatsAppMessage } from "@/lib/utils";

interface SiteState {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  /** URL de WhatsApp con el mensaje de la página actual. */
  waUrl: string;
  setWaMessage: (message: string) => void;
}

const SiteContext = createContext<SiteState | null>(null);

/** Estado compartido entre el header, el botón flotante y las páginas. */
export function SiteProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [waMessage, setWaMessage] = useState(whatsAppMessage());

  const value = useMemo(
    () => ({
      menuOpen,
      setMenuOpen,
      waUrl: formatWhatsAppUrl(waMessage),
      setWaMessage,
    }),
    [menuOpen, waMessage],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteState {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite debe usarse dentro de <SiteProvider>");
  return ctx;
}

/**
 * Cambia el mensaje de WhatsApp del header y del botón flotante mientras la
 * página que lo renderiza está montada (ej: el detalle de un proyecto).
 */
export function WhatsAppMessage({ projectName }: { projectName: string }) {
  const { setWaMessage } = useSite();

  useEffect(() => {
    setWaMessage(whatsAppMessage(projectName));
    return () => setWaMessage(whatsAppMessage());
  }, [projectName, setWaMessage]);

  return null;
}
