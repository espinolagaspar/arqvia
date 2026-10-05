import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/utils";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const TITLE = "ARQVIA — Diseño, fabricación e instalación de muebles a medida";
const DESCRIPTION =
  "Diseñamos, fabricamos e instalamos mobiliario a medida: cocinas, vestidores, placares, living, dormitorios y oficinas. CABA y GBA.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | ARQVIA",
  },
  description: DESCRIPTION,
  keywords: [
    "muebles a medida",
    "cocinas a medida",
    "vestidores",
    "placares",
    "mobiliario integral",
    "Buenos Aires",
  ],
  authors: [{ name: "ARQVIA" }],
  creator: "ARQVIA",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "ARQVIA",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
    <html lang="es-AR" className={`${geist.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-arq-bone text-arq-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
