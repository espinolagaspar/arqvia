import "server-only";
import { list, put, del } from "@vercel/blob";
import type { Project } from "@/types";
import { SEED_PROJECTS } from "@/lib/data/projects";

/**
 * Fuente de verdad de los proyectos: un manifest JSON en Vercel Blob.
 * Las fotos viven en el mismo store bajo `projects/<id>/...`.
 *
 * Importante sobre cache: el CDN de Blob cachea el contenido por URL e ignora
 * el query string, así que sobrescribir un mismo pathname devuelve versiones
 * viejas en cache (rompía el flujo crear → editar). Por eso cada guardado crea
 * un manifest con **nombre único** (`data/projects-<ts>-<rand>.json`) y la
 * lectura toma siempre el más reciente vía `list()` (la API es consistente al
 * instante). Como la URL es nueva, nunca está cacheada → siempre fresco.
 * Los manifests viejos se borran tras cada guardado.
 *
 * Si no hay token de Blob configurado (o nunca se guardó), se usa el seed local.
 */

const MANIFEST_PREFIX = "data/projects";

function token(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

export function isBlobConfigured(): boolean {
  return Boolean(token());
}

type ManifestBlob = { url: string; pathname: string; uploadedAt: Date };

/** Lista los manifests existentes, del más nuevo al más viejo. */
async function listManifests(): Promise<ManifestBlob[]> {
  const { blobs } = await list({ prefix: MANIFEST_PREFIX, token: token() });
  return blobs
    .map((b) => ({ url: b.url, pathname: b.pathname, uploadedAt: b.uploadedAt }))
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}

/** Lee todos los proyectos. Nunca lanza: ante cualquier error devuelve el seed. */
export async function getProjects(): Promise<Project[]> {
  if (!isBlobConfigured()) return SEED_PROJECTS;
  try {
    const manifests = await listManifests();
    if (manifests.length === 0) return SEED_PROJECTS;
    const res = await fetch(manifests[0].url, { cache: "no-store" });
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

/** Escribe un manifest nuevo (URL única) y limpia los anteriores. */
export async function saveProjects(projects: Project[]): Promise<void> {
  await put(
    `${MANIFEST_PREFIX}-${Date.now()}.json`,
    JSON.stringify(projects, null, 2),
    {
      access: "public",
      token: token(),
      addRandomSuffix: true,
      contentType: "application/json",
    },
  );

  // Borra los manifests viejos, dejando solo el recién creado.
  try {
    const manifests = await listManifests();
    const stale = manifests.slice(1).map((m) => m.url);
    if (stale.length > 0) await del(stale, { token: token() });
  } catch {
    // noop: la limpieza no es crítica
  }
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
