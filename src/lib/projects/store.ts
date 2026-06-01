import "server-only";
import { list, put, del } from "@vercel/blob";
import type { Project } from "@/types";
import { SEED_PROJECTS } from "@/lib/data/projects";

/**
 * Fuente de verdad de los proyectos: un único `projects.json` en Vercel Blob.
 * Las fotos viven en el mismo store bajo `projects/<id>/...`.
 *
 * Si no hay token de Blob configurado (o todavía no se guardó nunca), se cae
 * al seed local para que el sitio siga funcionando.
 */

const MANIFEST_PATH = "data/projects.json";

function token(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

export function isBlobConfigured(): boolean {
  return Boolean(token());
}

async function findManifestUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: MANIFEST_PATH, token: token() });
  const match = blobs.find((b) => b.pathname === MANIFEST_PATH) ?? blobs[0];
  return match?.url ?? null;
}

/** Lee todos los proyectos. Nunca lanza: ante cualquier error devuelve el seed. */
export async function getProjects(): Promise<Project[]> {
  if (!isBlobConfigured()) return SEED_PROJECTS;
  try {
    const url = await findManifestUrl();
    if (!url) return SEED_PROJECTS;
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return SEED_PROJECTS;
    const data = (await res.json()) as Project[];
    return Array.isArray(data) ? data : SEED_PROJECTS;
  } catch {
    return SEED_PROJECTS;
  }
}

export async function getProject(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id) ?? null;
}

/** Reescribe el manifest completo. */
export async function saveProjects(projects: Project[]): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(projects, null, 2), {
    access: "public",
    token: token(),
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

/** Borra una o varias fotos del store. Ignora errores (foto ya inexistente). */
export async function deleteProjectImages(
  pathnames: string[],
): Promise<void> {
  if (pathnames.length === 0) return;
  try {
    await del(pathnames, { token: token() });
  } catch {
    // noop: si ya no existe, no es un problema
  }
}
