"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProjectAction } from "@/app/admin/actions";

export function DeleteProjectButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          confirm(
            "¿Eliminar este proyecto y todas sus fotos? Esta acción no se puede deshacer.",
          )
        ) {
          startTransition(() => deleteProjectAction(id));
        }
      }}
      className="flex items-center gap-1.5 text-xs text-ef-dim hover:text-red-400 transition-colors disabled:opacity-50"
    >
      <Trash2 size={13} />
      {pending ? "Eliminando…" : "Eliminar"}
    </button>
  );
}
