import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct } from "@/lib/products/store";
import { ProductForm } from "@/components/admin/product-form";
import { ImageUploader } from "@/components/admin/image-uploader";
import {
  attachProductImagesAction,
  removeProductImageAction,
  setProductCoverAction,
  reorderProductImagesAction,
} from "@/app/admin/products-actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="container-ef py-12 max-w-3xl">
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-2 text-sm text-ef-dim hover:text-ef-white transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        Volver al catálogo
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight mb-8">
        {product.name}
      </h1>

      <section className="mb-12">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ef-dim/50 mb-4">
          Fotos del producto
        </h2>
        <ImageUploader
          id={product.id}
          images={product.images}
          coverIndex={product.coverIndex}
          pathPrefix="products"
          actions={{
            attach: attachProductImagesAction,
            remove: removeProductImageAction,
            setCover: setProductCoverAction,
            reorder: reorderProductImagesAction,
          }}
        />
      </section>

      <section>
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ef-dim/50 mb-4">
          Datos del producto
        </h2>
        <ProductForm product={product} />
      </section>
    </div>
  );
}
