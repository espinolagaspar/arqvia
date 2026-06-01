import "server-only";
import { list, put, del } from "@vercel/blob";
import type { Product } from "@/types";
import { SEED_PRODUCTS } from "@/lib/data/products";

/**
 * Fuente de verdad del catálogo: un manifest JSON en Vercel Blob.
 * Mismo patrón que proyectos (ver `src/lib/projects/store.ts`): cada guardado
 * crea un manifest con nombre único y se lee siempre el más reciente vía
 * `list()`, para esquivar el cache del CDN. Fotos bajo `products/<id>/...`.
 */

const MANIFEST_PREFIX = "data/products";

function token(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

export function isBlobConfigured(): boolean {
  return Boolean(token());
}

type ManifestBlob = { url: string; uploadedAt: Date };

async function listManifests(): Promise<ManifestBlob[]> {
  const { blobs } = await list({ prefix: MANIFEST_PREFIX, token: token() });
  return blobs
    .map((b) => ({ url: b.url, uploadedAt: b.uploadedAt }))
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}

/** Lee todos los productos. Nunca lanza: ante error devuelve el seed. */
export async function getProducts(): Promise<Product[]> {
  if (!isBlobConfigured()) return SEED_PRODUCTS;
  try {
    const manifests = await listManifests();
    if (manifests.length === 0) return SEED_PRODUCTS;
    const res = await fetch(manifests[0].url, { cache: "no-store" });
    if (!res.ok) return SEED_PRODUCTS;
    const data = (await res.json()) as Product[];
    return Array.isArray(data) ? data : SEED_PRODUCTS;
  } catch {
    return SEED_PRODUCTS;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

/** Escribe un manifest nuevo (URL única) y limpia los anteriores. */
export async function saveProducts(products: Product[]): Promise<void> {
  await put(
    `${MANIFEST_PREFIX}-${Date.now()}.json`,
    JSON.stringify(products, null, 2),
    {
      access: "public",
      token: token(),
      addRandomSuffix: true,
      contentType: "application/json",
    },
  );
  try {
    const manifests = await listManifests();
    const stale = manifests.slice(1).map((m) => m.url);
    if (stale.length > 0) await del(stale, { token: token() });
  } catch {
    // noop
  }
}

/** Borra fotos del store. Ignora pathnames vacíos (imágenes del seed) y errores. */
export async function deleteProductImages(
  pathnames: string[],
): Promise<void> {
  const real = pathnames.filter(Boolean);
  if (real.length === 0) return;
  try {
    await del(real, { token: token() });
  } catch {
    // noop
  }
}
