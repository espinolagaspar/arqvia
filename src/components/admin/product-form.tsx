"use client";

import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";
import { updateProductAction } from "@/app/admin/products-actions";
import type { Product } from "@/types";

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
  "mt-2 w-full rounded-sm bg-white/[0.04] border border-ef-border px-3 py-2.5 text-sm text-ef-white outline-none focus:border-white/20";
const labelClass = "text-[10px] uppercase tracking-[0.15em] text-ef-dim/60";

const CATEGORIES = [
  { value: "dormitorio", label: "Dormitorio" },
  { value: "living", label: "Living" },
  { value: "oficina", label: "Oficina" },
  { value: "cocina", label: "Cocina" },
];

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ef-white cursor-pointer">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="w-4 h-4 accent-white"
      />
      {label}
    </label>
  );
}

export function ProductForm({ product }: { product: Product }) {
  const action = updateProductAction.bind(null, product.id);

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nombre
          </label>
          <input id="name" name="name" defaultValue={product.name} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug (URL) — vacío = se genera del nombre
          </label>
          <input id="slug" name="slug" defaultValue={product.slug} className={fieldClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="category" className={labelClass}>
            Categoría
          </label>
          <select
            id="category"
            name="category"
            defaultValue={product.category}
            className={fieldClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priceRange" className={labelClass}>
            Precio / rango
          </label>
          <input
            id="priceRange"
            name="priceRange"
            defaultValue={product.priceRange}
            placeholder="Consultar"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="accentColor" className={labelClass}>
            Color de acento
          </label>
          <select
            id="accentColor"
            name="accentColor"
            defaultValue={product.accentColor}
            className={fieldClass}
          >
            <option value="blue">Azul</option>
            <option value="red">Rojo</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={product.description}
          rows={3}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="features" className={labelClass}>
            Características (una por línea)
          </label>
          <textarea
            id="features"
            name="features"
            defaultValue={product.features.join("\n")}
            rows={6}
            placeholder={"Tira LED RGB\nCarga inalámbrica Qi\nMelamina premium"}
            className={`${fieldClass} resize-y`}
          />
        </div>
        <div>
          <label htmlFor="colors" className={labelClass}>
            Colores (uno por línea: Nombre #HEX)
          </label>
          <textarea
            id="colors"
            name="colors"
            defaultValue={product.colors
              .map((c) => `${c.name} ${c.hex}`)
              .join("\n")}
            rows={6}
            placeholder={"Negro Mate #1A1A1A\nBlanco Arctic #F0F0F0"}
            className={`${fieldClass} resize-y`}
          />
        </div>
      </div>

      <div>
        <span className={labelClass}>Tecnología</span>
        <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
          <Checkbox name="hasLED" label="LED" defaultChecked={product.hasLED} />
          <Checkbox name="hasUSB" label="USB" defaultChecked={product.hasUSB} />
          <Checkbox
            name="hasWirelessCharging"
            label="Carga inalámbrica (Qi)"
            defaultChecked={product.hasWirelessCharging}
          />
          <Checkbox
            name="isFloating"
            label="Flotante"
            defaultChecked={product.isFloating}
          />
        </div>
      </div>

      <div>
        <SaveButton />
      </div>
    </form>
  );
}
