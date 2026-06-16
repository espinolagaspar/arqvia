import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata = {
  title: "Admin · ARQVIA",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const store = await cookies();
  const authed = await verifySession(store.get(SESSION_COOKIE)?.value);

  return (
    <div className="min-h-screen bg-arq-black text-arq-white">
      {authed && <AdminHeader />}
      {children}
    </div>
  );
}
