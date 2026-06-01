"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/admin/guard";
import {
  getProducts,
  saveProducts,
  deleteProductImages,
} from "@/lib/products/store";
import type { Product, ProductCategory, ProjectImage } from "@/types";

const CATEGORIES: ProductCategory[] = [
  "dormitorio",
  "living",
  "oficina",
  "cocina",
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function parseColors(raw: string): { name: string; hex: string }[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const hexMatch = line.match(/#([0-9a-fA-F]{3,8})/);
      const hex = hexMatch ? hexMatch[0] : "#1A1A1A";
      const name = line.replace(/#([0-9a-fA-F]{3,8})/, "").replace(/[,|]/g, "").trim();
      return { name: name || "Color", hex };
    });
}

function revalidateAll(): void {
  revalidatePath("/catalogo");
  revalidatePath("/");
  revalidatePath("/admin/productos");
}

async function mutateProduct(
  id: string,
  fn: (product: Product) => Product,
): Promise<void> {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Producto no encontrado");
  products[index] = fn(products[index]);
  await saveProducts(products);
  revalidateAll();
}

// ── CRUD ──────────────────────────────────────────────────────────────────────

export async function createProductAction(): Promise<void> {
  await requireAuth();
  const products = await getProducts();
  const product: Product = {
    id: crypto.randomUUID(),
    name: "Nuevo producto",
    slug: `producto-${Date.now()}`,
    category: "dormitorio",
    description: "",
    features: [],
    colors: [],
    hasLED: false,
    hasUSB: false,
    hasWirelessCharging: false,
    isFloating: false,
    priceRange: "Consultar",
    accentColor: "blue",
    images: [],
    coverIndex: 0,
    gradient: "from-zinc-900 via-neutral-900 to-black",
  };
  await saveProducts([product, ...products]);
  revalidateAll();
  redirect(`/admin/productos/${product.id}/edit`);
}

export async function updateProductAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAuth();

  const name = String(formData.get("name") ?? "").trim() || "Sin nombre";
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || name) || `producto-${id.slice(0, 8)}`;
  const categoryInput = String(formData.get("category") ?? "");
  const category = CATEGORIES.includes(categoryInput as ProductCategory)
    ? (categoryInput as ProductCategory)
    : "dormitorio";
  const features = String(formData.get("features") ?? "")
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
  const colors = parseColors(String(formData.get("colors") ?? ""));
  const accent = String(formData.get("accentColor") ?? "blue");

  await mutateProduct(id, (p) => ({
    ...p,
    name,
    slug,
    category,
    description: String(formData.get("description") ?? "").trim(),
    priceRange: String(formData.get("priceRange") ?? "").trim() || "Consultar",
    features,
    colors,
    hasLED: formData.get("hasLED") === "on",
    hasUSB: formData.get("hasUSB") === "on",
    hasWirelessCharging: formData.get("hasWirelessCharging") === "on",
    isFloating: formData.get("isFloating") === "on",
    accentColor: accent === "red" ? "red" : "blue",
  }));

  redirect("/admin/productos");
}

export async function deleteProductAction(id: string): Promise<void> {
  await requireAuth();
  const products = await getProducts();
  const target = products.find((p) => p.id === id);
  if (target) {
    await deleteProductImages(target.images.map((im) => im.pathname));
  }
  await saveProducts(products.filter((p) => p.id !== id));
  revalidateAll();
  redirect("/admin/productos");
}

// ── Fotos ─────────────────────────────────────────────────────────────────────

export async function attachProductImagesAction(
  id: string,
  images: ProjectImage[],
): Promise<void> {
  await requireAuth();
  const clean = images.filter(
    (im) =>
      im &&
      typeof im.url === "string" &&
      typeof im.pathname === "string" &&
      im.pathname.startsWith(`products/${id}/`),
  );
  if (clean.length === 0) return;
  await mutateProduct(id, (p) => ({ ...p, images: [...p.images, ...clean] }));
}

export async function removeProductImageAction(
  id: string,
  pathname: string,
): Promise<void> {
  await requireAuth();
  await deleteProductImages([pathname]);
  await mutateProduct(id, (p) => {
    const coverPath = p.images[p.coverIndex]?.pathname;
    const images = p.images.filter((im) => im.pathname !== pathname);
    const coverIndex = Math.max(
      0,
      images.findIndex((im) => im.pathname === coverPath),
    );
    return { ...p, images, coverIndex };
  });
}

export async function setProductCoverAction(
  id: string,
  index: number,
): Promise<void> {
  await requireAuth();
  await mutateProduct(id, (p) => ({
    ...p,
    coverIndex: index >= 0 && index < p.images.length ? index : p.coverIndex,
  }));
}

export async function reorderProductImagesAction(
  id: string,
  pathnamesInOrder: string[],
): Promise<void> {
  await requireAuth();
  await mutateProduct(id, (p) => {
    const coverPath = p.images[p.coverIndex]?.pathname;
    const byPath = new Map(p.images.map((im) => [im.pathname, im]));
    const images = pathnamesInOrder
      .map((path) => byPath.get(path))
      .filter((im): im is NonNullable<typeof im> => Boolean(im));
    for (const im of p.images) {
      if (!pathnamesInOrder.includes(im.pathname)) images.push(im);
    }
    const coverIndex = Math.max(
      0,
      images.findIndex((im) => im.pathname === coverPath),
    );
    return { ...p, images, coverIndex };
  });
}
