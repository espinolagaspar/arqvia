"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifySession,
  verifyPassword,
} from "@/lib/auth";
import {
  getProjects,
  saveProjects,
  deleteProjectImages,
  isBlobConfigured,
} from "@/lib/projects/store";
import type { Project, ProjectImage } from "@/types";

async function requireAuth(): Promise<void> {
  const store = await cookies();
  const ok = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!ok) throw new Error("No autorizado");
  if (!isBlobConfigured()) {
    throw new Error(
      "Vercel Blob no está configurado (falta BLOB_READ_WRITE_TOKEN). No se puede guardar.",
    );
  }
}

function revalidateAll(): void {
  revalidatePath("/proyectos");
  revalidatePath("/admin/proyectos");
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
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const accent = String(formData.get("accentColor") ?? "blue");

  await mutateProject(id, (p) => ({
    ...p,
    title: String(formData.get("title") ?? "").trim() || "Sin título",
    location: String(formData.get("location") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim(),
    tags,
    accentColor: accent === "red" ? "red" : "blue",
  }));
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
