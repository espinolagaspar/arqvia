"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import {
  Upload,
  Star,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import type { ProjectImage } from "@/types";

function sanitizeName(name: string): string {
  return (name || "foto.jpg")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export type ImageUploaderActions = {
  attach: (id: string, images: ProjectImage[]) => Promise<void>;
  remove: (id: string, pathname: string) => Promise<void>;
  setCover: (id: string, index: number) => Promise<void>;
  reorder: (id: string, pathnamesInOrder: string[]) => Promise<void>;
};

export function ImageUploader({
  id,
  images,
  coverIndex,
  pathPrefix,
  actions,
}: {
  id: string;
  images: ProjectImage[];
  coverIndex: number;
  /** Carpeta en el Blob: "projects" o "products". */
  pathPrefix: string;
  actions: ImageUploaderActions;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const busy = uploading || pending;

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    setError(null);
    setUploading(true);
    setProgress({ done: 0, total: files.length });

    const uploaded: ProjectImage[] = [];
    const failed: string[] = [];

    for (const file of files) {
      try {
        const blob = await upload(
          `${pathPrefix}/${id}/${crypto.randomUUID()}-${sanitizeName(file.name)}`,
          file,
          {
            access: "public",
            handleUploadUrl: "/api/admin/upload",
            clientPayload: id,
            contentType: file.type || undefined,
            multipart: file.size > 8 * 1024 * 1024,
          },
        );
        uploaded.push({ url: blob.url, pathname: blob.pathname });
      } catch (e) {
        console.error("Error subiendo", file.name, e);
        failed.push(file.name);
      } finally {
        setProgress((p) => (p ? { ...p, done: p.done + 1 } : p));
      }
    }

    if (uploaded.length > 0) {
      await actions.attach(id, uploaded);
      router.refresh();
    }
    if (failed.length > 0) {
      setError(`No se pudieron subir: ${failed.join(", ")}`);
    }

    setUploading(false);
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= images.length) return;
    const order = images.map((im) => im.pathname);
    [order[index], order[target]] = [order[target], order[index]];
    startTransition(async () => {
      await actions.reorder(id, order);
      router.refresh();
    });
  }

  return (
    <div>
      {/* Dropzone / botón */}
      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (!busy) handleFiles(e.dataTransfer.files);
        }}
        className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-arq-border bg-white/[0.02] py-10 cursor-pointer hover:border-white/20 transition-colors"
      >
        {busy ? (
          <Loader2 size={20} className="text-arq-dim animate-spin" />
        ) : (
          <Upload size={20} className="text-arq-dim" />
        )}
        <span className="text-sm text-arq-dim font-light">
          {uploading && progress
            ? `Subiendo ${progress.done}/${progress.total}…`
            : busy
              ? "Procesando…"
              : "Arrastrá fotos acá o hacé click para elegir"}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={busy}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      {/* Grid de fotos */}
      {images.length > 0 && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => {
            const isCover = i === coverIndex;
            return (
              <div
                key={img.pathname}
                className="group relative rounded-lg overflow-hidden border border-arq-border"
              >
                <div className="relative aspect-[4/3] bg-white/[0.04]">
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>

                {isCover && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 rounded-sm bg-arq-white text-arq-black text-[10px] font-medium px-2 py-0.5">
                    <Star size={10} className="fill-current" />
                    Portada
                  </span>
                )}

                {/* Controles */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      title="Mover izquierda"
                      disabled={busy || i === 0}
                      onClick={() => move(i, -1)}
                      className="p-1 rounded-sm bg-white/10 text-arq-white hover:bg-white/20 disabled:opacity-30"
                    >
                      <ArrowLeft size={12} />
                    </button>
                    <button
                      type="button"
                      title="Mover derecha"
                      disabled={busy || i === images.length - 1}
                      onClick={() => move(i, 1)}
                      className="p-1 rounded-sm bg-white/10 text-arq-white hover:bg-white/20 disabled:opacity-30"
                    >
                      <ArrowRight size={12} />
                    </button>
                  </div>
                  <div className="flex gap-1">
                    {!isCover && (
                      <button
                        type="button"
                        title="Marcar como portada"
                        disabled={busy}
                        onClick={() =>
                          startTransition(async () => {
                            await actions.setCover(id, i);
                            router.refresh();
                          })
                        }
                        className="p-1 rounded-sm bg-white/10 text-arq-white hover:bg-white/20 disabled:opacity-30"
                      >
                        <Star size={12} />
                      </button>
                    )}
                    <button
                      type="button"
                      title="Eliminar foto"
                      disabled={busy}
                      onClick={() =>
                        startTransition(async () => {
                          await actions.remove(id, img.pathname);
                          router.refresh();
                        })
                      }
                      className="p-1 rounded-sm bg-white/10 text-arq-white hover:bg-red-500/80 disabled:opacity-30"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
