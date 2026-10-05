import "server-only";
import { list, put, del } from "@vercel/blob";
import type { Project } from "@/types";
import { SEED_PROJECTS } from "@/lib/data/projects";
import { slugify } from "@/lib/utils";

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

/** Devuelve `base` o, si ya está tomado, `base-2`, `base-3`, ... */
export function uniqueSlug(base: string, taken: Iterable<string>): string {
  const used = new Set(taken);
  const root = base || "proyecto";
  let slug = root;
  for (let n = 2; used.has(slug); n++) slug = `${root}-${n}`;
  return slug;
}

/**
 * Completa los campos nuevos en proyectos guardados con el modelo anterior
 * (slug desde el título, tipo desde la categoría, resumen desde la
 * descripción) y ordena por `order`; los que no tienen orden van al final,
 * en el orden en que están guardados.
 */
function normalizeProjects(raw: Project[]): Project[] {
  const slugs = new Set<string>();
  const projects = raw.map((p) => {
    const description = p.description ?? "";
    const slug = uniqueSlug(slugify(p.slug || p.title || ""), slugs);
    slugs.add(slug);
    return {
      ...p,
      slug,
      type: p.type || p.category || "",
      summary:
        p.summary ||
        (description.length > 140
          ? `${description.slice(0, 139).trimEnd()}…`
          : description),
      body: p.body ?? (p.summary ? undefined : description || undefined),
      images: Array.isArray(p.images) ? p.images : [],
      coverIndex: p.coverIndex ?? 0,
    };
  });
  return projects
    .map((p, i) => ({ p, i }))
    .sort(
      (a, b) =>
        (a.p.order ?? Number.MAX_SAFE_INTEGER) -
          (b.p.order ?? Number.MAX_SAFE_INTEGER) || a.i - b.i,
    )
    .map(({ p }) => p);
}

/** Lee todos los proyectos. Nunca lanza: ante cualquier error devuelve el seed. */
export async function getProjects(): Promise<Project[]> {
  return normalizeProjects(await readProjects());
}

async function readProjects(): Promise<Project[]> {
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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

/**
 * Proyectos de la home: los destacados y, si no alcanzan, se completa con el
 * resto en orden.
 */
export function pickFeatured(projects: Project[], count = 3): Project[] {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, count);
}

/** Portada de un proyecto, o null si todavía no tiene fotos. */
export function projectCover(project: Project) {
  return project.images[project.coverIndex] ?? project.images[0] ?? null;
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

/** Borra fotos del store. Ignora pathnames vacíos (imágenes del seed) y errores. */
export async function deleteProjectImages(
  pathnames: string[],
): Promise<void> {
  const real = pathnames.filter(Boolean);
  if (real.length === 0) return;
  try {
    await del(real, { token: token() });
  } catch {
    // noop: si ya no existe, no es un problema
  }
}
