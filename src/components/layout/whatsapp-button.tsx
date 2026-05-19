"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { formatWhatsAppUrl, WHATSAPP_DEFAULT_MSG } from "@/lib/utils";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 6 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-lg p-4 w-60 shadow-2xl border border-white/[0.06]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-ef-dim hover:text-ef-white transition-colors"
            >
              <X size={12} />
            </button>
            <p className="text-xs text-ef-dim mb-1 font-light">efstudio</p>
            <p className="text-sm text-ef-white font-medium mb-3 leading-snug">
              Hola! ¿Querés cotizar tu mueble ideal?
            </p>
            <a
              href={formatWhatsAppUrl(WHATSAPP_DEFAULT_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-sm bg-green-600 text-white text-sm font-medium hover:bg-green-500 transition-colors"
            >
              <MessageCircle size={13} />
              Escribinos
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 220, damping: 22 }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="relative w-13 h-13 w-[52px] h-[52px] rounded-full bg-green-600 hover:bg-green-500 text-white shadow-lg flex items-center justify-center transition-colors"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={22} className="relative z-10" />
      </motion.button>
    </div>
  );
}
