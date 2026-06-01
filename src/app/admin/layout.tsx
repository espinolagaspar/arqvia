import type { ReactNode } from "react";

export const metadata = {
  title: "Admin · efstudio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-ef-black text-ef-white">{children}</div>;
}
