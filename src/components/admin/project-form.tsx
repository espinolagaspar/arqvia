"use client";

import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";
import { updateProjectAction } from "@/app/admin/actions";
import type { Project } from "@/types";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
    >
      <Save size={15} />
      {pending ? "Guardando…" : "Guardar datos"}
    </button>
  );
}

const fieldClass =
  "mt-2 w-full rounded-sm bg-white/[0.04] border border-arq-border px-3 py-2.5 text-sm text-arq-white outline-none focus:border-white/20";
const labelClass =
  "text-[10px] uppercase tracking-[0.15em] text-arq-dim/60";

export function ProjectForm({ project }: { project: Project }) {
  const action = updateProjectAction.bind(null, project.id);

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <label htmlFor="title" className={labelClass}>
          Título
        </label>
        <input id="title" name="title" defaultValue={project.title} className={fieldClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="category" className={labelClass}>
            Categoría
          </label>
          <input
            id="category"
            name="category"
            defaultValue={project.category}
            placeholder="Ej: Dormitorio Premium"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Ubicación
          </label>
          <input
            id="location"
            name="location"
            defaultValue={project.location}
            placeholder="Ej: Palermo, Buenos Aires"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={project.description}
          rows={4}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="year" className={labelClass}>
            Año
          </label>
          <input id="year" name="year" defaultValue={project.year} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="tags" className={labelClass}>
            Tags (separados por coma)
          </label>
          <input
            id="tags"
            name="tags"
            defaultValue={project.tags.join(", ")}
            placeholder="LED, Flotante, Premium"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="accentColor" className={labelClass}>
          Color de acento
        </label>
        <select
          id="accentColor"
          name="accentColor"
          defaultValue={project.accentColor}
          className={fieldClass}
        >
          <option value="blue">Azul</option>
          <option value="red">Rojo</option>
        </select>
      </div>

      <div>
        <SaveButton />
      </div>
    </form>
  );
}
