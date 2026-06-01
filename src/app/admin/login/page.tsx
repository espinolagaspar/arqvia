import { LoginForm } from "@/components/admin/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <span className="text-2xl font-semibold tracking-tight text-ef-white">
              ef
            </span>
            <span className="text-2xl font-light tracking-tight text-ef-dim">
              studio
            </span>
          </div>
          <p className="text-xs text-ef-dim/60 tracking-wide uppercase">
            Panel de administración
          </p>
        </div>
        <div className="glass rounded-lg p-8">
          <LoginForm next={next ?? "/admin/proyectos"} />
        </div>
      </div>
    </div>
  );
}
