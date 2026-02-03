import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteTitle = "Leet-Cheat";
const siteDescription =
  "Interview-ready coding, systems design, and applied AI lessons that move from notebooks to production.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: { default: siteTitle, template: "%s | Leet-Cheat" },
  description: siteDescription,
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName: "Leet-Cheat",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} min-h-full bg-[color:var(--color-background)] text-[color:var(--color-foreground)] antialiased`}
      >
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,92,255,0.22),_transparent_45%)]" />
            <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[rgba(66,211,255,0.15)] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[rgba(255,184,107,0.12)] blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(9,12,18,0.92)_0%,_rgba(9,12,18,0.96)_60%,_rgba(9,12,18,1)_100%)]" />
          </div>
          <SiteNav />
          <main className="relative">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
