import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ImageOff } from "lucide-react";
import { getProducts, isBlobConfigured } from "@/lib/products/store";
import { createProductAction } from "@/app/admin/products-actions";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export const dynamic = "force-dynamic";

export default async function AdminProductosPage() {
  const products = await getProducts();
  const configured = isBlobConfigured();

  return (
    <div className="container-ef py-12">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Catálogo</h1>
      <p className="text-sm text-ef-dim font-light mb-8">
        {products.length} producto{products.length !== 1 ? "s" : ""} · se ven en{" "}
        <Link href="/catalogo" className="underline hover:text-ef-white">
          /catalogo
        </Link>
      </p>

      {!configured && (
        <div className="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/[0.06] p-4 text-xs text-yellow-200/80 font-light">
          Vercel Blob todavía no está configurado (falta{" "}
          <code className="text-yellow-100">BLOB_READ_WRITE_TOKEN</code>). Estos
          son datos de ejemplo: <strong>no se pueden crear, editar ni
          eliminar</strong> hasta que conectes el Blob store.
        </div>
      )}

      <form action={createProductAction} className="mb-6">
        <button
          type="submit"
          disabled={!configured}
          title={configured ? undefined : "Configurá Vercel Blob para crear productos"}
          className="btn-primary inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          Nuevo producto
        </button>
      </form>

      <div className="grid grid-cols-1 gap-3">
        {products.map((product) => {
          const cover = product.images[product.coverIndex] ?? product.images[0];
          return (
            <div
              key={product.id}
              className="glass rounded-lg p-4 flex items-center gap-4"
            >
              <div className="relative w-20 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-white/[0.04]">
                {cover ? (
                  <Image
                    src={cover.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ef-dim/40">
                    <ImageOff size={18} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-ef-white truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-ef-dim font-light truncate">
                  {[product.category, product.priceRange]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p className="text-[11px] text-ef-dim/60 mt-0.5">
                  {product.images.length} foto
                  {product.images.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                {configured ? (
                  <Link
                    href={`/admin/productos/${product.id}/edit`}
                    className="flex items-center gap-1.5 text-xs text-ef-dim hover:text-ef-white transition-colors"
                  >
                    <Pencil size={13} />
                    Editar
                  </Link>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-ef-dim/30 cursor-not-allowed">
                    <Pencil size={13} />
                    Editar
                  </span>
                )}
                <DeleteProductButton id={product.id} disabled={!configured} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
