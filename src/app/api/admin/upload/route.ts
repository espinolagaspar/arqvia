import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

/**
 * Genera el token para subir fotos directamente del navegador a Vercel Blob
 * (client upload). Esto evita el límite de body de los Server Actions (~1 MB)
 * y el de las funciones serverless de Vercel (4.5 MB).
 *
 * El proxy no cubre /api, así que la auth se valida acá leyendo la cookie.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  const store = await cookies();
  const authed = await verifySession(store.get(SESSION_COOKIE)?.value);

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!authed) throw new Error("No autorizado");
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
            "image/gif",
          ],
          maximumSizeInBytes: 25 * 1024 * 1024, // 25 MB por foto
          addRandomSuffix: false,
        };
      },
      // En prod Vercel llama esto al terminar; el registro en el manifest lo
      // hacemos igual desde el cliente (attachImagesAction) para que funcione
      // también en local, así que acá no hace falta nada.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
