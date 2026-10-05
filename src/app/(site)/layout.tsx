import type { ReactNode } from "react";
import { SiteProvider } from "@/components/layout/site-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SiteProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </SiteProvider>
  );
}
