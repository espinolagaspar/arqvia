import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

/**
 * Verifica que haya una sesión de admin válida y que Vercel Blob esté
 * configurado. Se usa al inicio de cada Server Action que escribe datos.
 */
export async function requireAuth(): Promise<void> {
  const store = await cookies();
  const ok = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!ok) throw new Error("No autorizado");
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Vercel Blob no está configurado (falta BLOB_READ_WRITE_TOKEN). No se puede guardar.",
    );
  }
}
