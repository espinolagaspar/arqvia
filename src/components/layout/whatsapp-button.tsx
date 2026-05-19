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
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            className="glass rounded-xl p-4 w-64 shadow-2xl border border-green-500/20"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-ef-dim hover:text-ef-white"
            >
              <X size={12} />
            </button>
            <p className="text-xs text-ef-dim mb-1">efstudio</p>
            <p className="text-sm text-ef-white font-medium mb-3">
              Hola! ¿Querés cotizar tu mueble ideal?
            </p>
            <a
              href={formatWhatsAppUrl(WHATSAPP_DEFAULT_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-400 transition-colors"
            >
              <MessageCircle size={14} />
              Escribinos
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-xl flex items-center justify-center transition-colors group"
        aria-label="Contactar por WhatsApp"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-green-500/30"
        />
        <MessageCircle size={24} className="relative z-10" />
      </motion.button>
    </div>
  );
}
