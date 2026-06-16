/**
 * Auth mínima para un único admin (el dueño).
 *
 * No usamos un proveedor de identidad: la sesión es un token firmado con HMAC
 * (Web Crypto, funciona en cualquier runtime) guardado en una cookie httpOnly.
 * El login compara contra ADMIN_PASSWORD. Sin estado en el servidor.
 *
 * Este módulo es "puro" (no importa next/headers) para poder usarse también
 * desde `src/proxy.ts`. La lectura/escritura de la cookie se hace en los
 * Server Actions / componentes con `cookies()` de next/headers.
 */

export const SESSION_COOKIE = "ef_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

function getSecret(): string {
  return (
    process.env.SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "arqvia-dev-secret-cambiar-en-produccion"
  );
}

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  return new Uint8Array(Buffer.from(base64, "base64"));
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toBase64Url(new Uint8Array(sig));
}

/** Comparación en tiempo constante para evitar timing attacks. */
function safeEqual(a: string, b: string): boolean {
  const ab = fromBase64Url(a);
  const bb = fromBase64Url(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

/** Genera un token de sesión firmado válido por `ttl` segundos. */
export async function signSession(ttl = SESSION_MAX_AGE): Promise<string> {
  const payload = toBase64Url(
    encoder.encode(JSON.stringify({ exp: Date.now() + ttl * 1000 })),
  );
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

/** Verifica firma y expiración de un token. */
export async function verifySession(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = await hmac(payload);
  if (!safeEqual(sig, expected)) return false;
  try {
    const { exp } = JSON.parse(
      Buffer.from(fromBase64Url(payload)).toString("utf8"),
    );
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

/** Compara la contraseña ingresada contra ADMIN_PASSWORD. */
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++)
    diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
