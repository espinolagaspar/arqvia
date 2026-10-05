"use client";

import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";
import { updateProjectAction } from "@/app/admin/actions";
import type { Project } from "@/types";

const SCOPE_OPTIONS = ["Diseño", "Fabricación", "Instalación"];

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
const hintClass = "mt-1.5 text-[11px] text-arq-dim/60 font-light";

function Checkbox({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value?: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-arq-white cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="accent-white"
      />
      {label}
    </label>
  );
}

export function ProjectForm({ project }: { project: Project }) {
  const action = updateProjectAction.bind(null, project.id);
  const scope = project.scope ?? SCOPE_OPTIONS;

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
          <label htmlFor="slug" className={labelClass}>
            Slug (URL)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={project.slug}
            placeholder="cocina-negra"
            className={fieldClass}
          />
          <p className={hintClass}>
            /proyectos/{project.slug}. Vacío = se genera desde el título.
          </p>
        </div>
        <div>
          <label htmlFor="type" className={labelClass}>
            Tipo
          </label>
          <input
            id="type"
            name="type"
            defaultValue={project.type}
            placeholder="Ej: Cocina integral"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Resumen (una línea)
        </label>
        <input
          id="summary"
          name="summary"
          defaultValue={project.summary}
          placeholder="Frentes negro mate, columnas hasta el techo…"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="body" className={labelClass}>
          Cuerpo (texto del detalle)
        </label>
        <textarea
          id="body"
          name="body"
          defaultValue={project.body ?? ""}
          rows={5}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="materials" className={labelClass}>
          Materiales (separados por coma)
        </label>
        <input
          id="materials"
          name="materials"
          defaultValue={(project.materials ?? []).join(", ")}
          placeholder="Laqueado mate, Herrajes europeos"
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <fieldset className="sm:col-span-2">
          <legend className={labelClass}>Alcance</legend>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {SCOPE_OPTIONS.map((option) => (
              <Checkbox
                key={option}
                name="scope"
                value={option}
                label={option}
                defaultChecked={scope.includes(option)}
              />
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="order" className={labelClass}>
            Orden
          </label>
          <input
            id="order"
            name="order"
            type="number"
            min={0}
            defaultValue={project.order ?? ""}
            placeholder="1"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <Checkbox
          name="featured"
          label="Destacado (aparece en la home)"
          defaultChecked={Boolean(project.featured)}
        />
        <p className={hintClass}>
          La home muestra hasta 3 destacados; el primero es la foto del hero.
        </p>
      </div>

      <div>
        <SaveButton />
      </div>
    </form>
  );
}
