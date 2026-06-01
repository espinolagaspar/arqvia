"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProductAction } from "@/app/admin/products-actions";

export function DeleteProductButton({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending || disabled}
      title={disabled ? "Configurá Vercel Blob para poder editar" : undefined}
      onClick={() => {
        if (
          confirm(
            "¿Eliminar este producto y todas sus fotos? Esta acción no se puede deshacer.",
          )
        ) {
          startTransition(() => deleteProductAction(id));
        }
      }}
      className="flex items-center gap-1.5 text-xs text-ef-dim hover:text-red-400 transition-colors disabled:opacity-50"
    >
      <Trash2 size={13} />
      {pending ? "Eliminando…" : "Eliminar"}
    </button>
  );
}
