"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { cn } from "@/lib/utils";

/**
 * Botón "Ingresar" + modal de acceso para administradores.
 *
 * Reutiliza el LoginForm (server action `loginAction`), que en caso de éxito
 * redirige al panel. Solo agrega un punto de entrada desde el sitio público.
 */
export function AdminLoginModal({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "text-sm text-arq-dim hover:text-arq-white transition-colors duration-200",
          className,
        )}
      >
        Ingresar
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="absolute inset-0 bg-arq-black/80 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="admin-login-title"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative w-full max-w-sm glass rounded-lg p-8"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar"
                    className="absolute top-4 right-4 p-1 text-arq-dim hover:text-arq-white transition-colors"
                  >
                    <X size={18} />
                  </button>

                  <div className="mb-7 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm mb-4 bg-white/[0.04]">
                      <Lock size={16} className="text-arq-dim" />
                    </div>
                    <h2
                      id="admin-login-title"
                      className="text-lg font-semibold tracking-tight text-arq-white"
                    >
                      Solo Administradores
                    </h2>
                    <p className="mt-1 text-xs text-arq-dim/60 tracking-wide">
                      Ingresá la contraseña para acceder al panel.
                    </p>
                  </div>

                  <LoginForm next="/admin" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
