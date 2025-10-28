import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopLoader from "@/components/TopLoader";
import { APP_NAME } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sekolahku.digital"),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "SekolahKu Digital adalah template website sekolah modern dengan dashboard admin, blog, galeri, dan integrasi Supabase.",
  applicationName: APP_NAME,
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#dc2626",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_NAME,
    description:
      "SekolahKu Digital adalah template website sekolah modern dengan dashboard admin, blog, galeri, dan integrasi Supabase.",
    url: "https://sekolahku.digital",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description:
      "SekolahKu Digital adalah template website sekolah modern dengan dashboard admin, blog, galeri, dan integrasi Supabase.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
