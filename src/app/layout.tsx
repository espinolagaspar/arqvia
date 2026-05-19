import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "efstudio — Muebles Modernos Tecnológicos",
    template: "%s | efstudio",
  },
  description:
    "Muebles modernos de melamina premium con diseño minimalista, iluminación LED, carga USB e inalámbrica. Fabricación premium para dormitorios, oficinas y setups gamer en Argentina.",
  keywords: [
    "muebles modernos",
    "muebles melamina premium",
    "mesas de luz modernas",
    "muebles LED",
    "escritorios gamer",
    "muebles minimalistas",
    "muebles premium Argentina",
    "muebles tecnológicos",
    "muebles con USB",
    "setup home office",
    "muebles flotantes",
    "efstudio",
  ],
  authors: [{ name: "efstudio" }],
  creator: "efstudio",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "efstudio",
    title: "efstudio — Muebles Modernos Tecnológicos",
    description:
      "Diseño minimalista, tecnología integrada y fabricación premium.",
  },
  twitter: {
    card: "summary_large_image",
    title: "efstudio — Muebles Modernos Tecnológicos",
    description:
      "Diseño minimalista, tecnología integrada y fabricación premium.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${geist.variable} dark`}>
      <body className="min-h-screen bg-ef-black text-ef-white font-geist antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
