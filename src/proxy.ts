import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

/**
 * Protege todo /admin salvo la pantalla de login. Si no hay sesión válida,
 * redirige a /admin/login conservando el destino en ?next.
 *
 * En Next 16 el antiguo `middleware` se renombró a `proxy`. La verificación
 * de auth se repite además dentro de cada Server Action (defensa en profundidad).
 */
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySession(token)) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}
