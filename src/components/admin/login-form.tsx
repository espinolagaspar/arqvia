"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Lock } from "lucide-react";
import { loginAction } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary justify-center w-full py-3 disabled:opacity-50"
    >
      {pending ? "Ingresando…" : "Ingresar"}
    </button>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label
          htmlFor="password"
          className="text-[10px] uppercase tracking-[0.15em] text-arq-dim/60"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          className="mt-2 w-full rounded-sm bg-white/[0.04] border border-arq-border px-4 py-3 text-sm text-arq-white outline-none focus:border-white/20"
        />
      </div>
      {state.error && (
        <p className="text-xs text-red-400">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
}
