"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifyPassword,
} from "@/lib/auth";
import { requireAuth } from "@/lib/admin/guard";
import {
  getProjects,
  saveProjects,
  deleteProjectImages,
  uniqueSlug,
} from "@/lib/projects/store";
import { slugify } from "@/lib/utils";
import type { Project, ProjectImage } from "@/types";

function revalidateAll(): void {
  revalidatePath("/");
  revalidatePath("/proyectos");
  revalidatePath("/proyectos/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/proyectos");
}

/** Lee un campo de lista separada por comas ("a, b, c"). */
function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Lee el manifest, muta un proyecto por id y vuelve a guardar. */
async function mutateProject(
  id: string,
  fn: (project: Project) => Project,
): Promise<void> {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Proyecto no encontrado");
  projects[index] = fn(projects[index]);
  await saveProjects(projects);
  revalidateAll();
}

// ── Auth ────────────────────────────────────────────────────────────────────

export async function loginAction(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/proyectos");

  if (!process.env.ADMIN_PASSWORD) {
    return { error: "Falta configurar ADMIN_PASSWORD en el servidor." };
  }
  if (!verifyPassword(password)) {
    return { error: "Contraseña incorrecta." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, await signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(next.startsWith("/admin") ? next : "/admin/proyectos");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ── Proyectos ─────────────────────────────────────────────────────────────────

export async function createProjectAction(): Promise<void> {
  await requireAuth();
  const projects = await getProjects();
  const project: Project = {
    id: crypto.randomUUID(),
    title: "Nuevo proyecto",
    slug: uniqueSlug(
      "nuevo-proyecto",
      projects.map((p) => p.slug),
    ),
    type: "",
    summary: "",
    scope: ["Diseño", "Fabricación", "Instalación"],
    featured: false,
    location: "",
    category: "",
    description: "",
    tags: [],
    year: String(new Date().getFullYear()),
    images: [],
    coverIndex: 0,
    accentColor: "blue",
  };
  await saveProjects([project, ...projects]);
  revalidateAll();
  redirect(`/admin/proyectos/${project.id}/edit`);
}

export async function updateProjectAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAuth();
  const title = String(formData.get("title") ?? "").trim() || "Sin título";
  const order = Number.parseInt(String(formData.get("order") ?? ""), 10);

  // El slug tiene que ser único entre todos los proyectos.
  const others = (await getProjects()).filter((p) => p.id !== id);
  const slug = uniqueSlug(
    slugify(String(formData.get("slug") ?? "")) || slugify(title),
    others.map((p) => p.slug),
  );

  // Los campos deprecados (location, year, tags, ...) se conservan tal cual.
  await mutateProject(id, (p) => ({
    ...p,
    title,
    slug,
    type: String(formData.get("type") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim() || undefined,
    materials: parseList(formData.get("materials")),
    scope: formData.getAll("scope").map(String),
    featured: formData.get("featured") === "on",
    order: Number.isNaN(order) ? undefined : order,
  }));

  redirect("/admin/proyectos");
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireAuth();
  const projects = await getProjects();
  const target = projects.find((p) => p.id === id);
  if (target) {
    await deleteProjectImages(target.images.map((im) => im.pathname));
  }
  await saveProjects(projects.filter((p) => p.id !== id));
  revalidateAll();
  redirect("/admin/proyectos");
}

// ── Fotos ─────────────────────────────────────────────────────────────────────

/**
 * Registra en el manifest fotos que ya fueron subidas al Blob desde el cliente
 * (client upload). No sube nada: solo agrega las referencias {url, pathname}.
 */
export async function attachImagesAction(
  id: string,
  images: ProjectImage[],
): Promise<void> {
  await requireAuth();
  const clean = images.filter(
    (im) =>
      im &&
      typeof im.url === "string" &&
      typeof im.pathname === "string" &&
      im.pathname.startsWith(`projects/${id}/`),
  );
  if (clean.length === 0) return;
  await mutateProject(id, (p) => ({
    ...p,
    images: [...p.images, ...clean],
  }));
}

export async function removeImageAction(
  id: string,
  pathname: string,
): Promise<void> {
  await requireAuth();
  await deleteProjectImages([pathname]);
  await mutateProject(id, (p) => {
    const coverPath = p.images[p.coverIndex]?.pathname;
    const images = p.images.filter((im) => im.pathname !== pathname);
    const coverIndex = Math.max(
      0,
      images.findIndex((im) => im.pathname === coverPath),
    );
    return { ...p, images, coverIndex };
  });
}

export async function setCoverAction(
  id: string,
  index: number,
): Promise<void> {
  await requireAuth();
  await mutateProject(id, (p) => ({
    ...p,
    coverIndex: index >= 0 && index < p.images.length ? index : p.coverIndex,
  }));
}

export async function reorderImagesAction(
  id: string,
  pathnamesInOrder: string[],
): Promise<void> {
  await requireAuth();
  await mutateProject(id, (p) => {
    const coverPath = p.images[p.coverIndex]?.pathname;
    const byPath = new Map(p.images.map((im) => [im.pathname, im]));
    const images = pathnamesInOrder
      .map((path) => byPath.get(path))
      .filter((im): im is NonNullable<typeof im> => Boolean(im));
    // por si quedó alguna que no vino en el orden, la agrego al final
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
