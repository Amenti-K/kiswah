import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CompanyInfoProviders from "./providers";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import QueryProvider from "./query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kiswah Trading",
    template: "%s | Kiswah Trading",
  },
  description:
    "Kiswah Trading is a leading Ethiopian trading company, providing import-export and general trade services with excellence and integrity.",
  keywords: [
    "Kiswah Trading",
    "Trading Company",
    "Import-Export",
    "Import",
    "Export",
    "General Trade",
    "Trading Services",
    "Logestic Services",
    "Ethiopia",
  ],
  authors: [
    { name: "Kiswah Trading", url: "https://kiswah-trading.vercel.app/" },
  ],
  creator: "Kiswah Trading",
  publisher: "Kiswah Trading",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "Kiswah Trading",
  referrer: "origin-when-cross-origin",
  // themeColor: "#ffffff",
  openGraph: {
    title: "Kiswah Trading",
    description:
      "Delivering innovative software and IT solutions. Building the future with innovation since 2015.",
    url: "https://kiswah-trading.vercel.app/",
    siteName: "Kiswah Trading",
    images: [
      {
        url: "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1756636957/company/fis4jfffdgyjd5j7hsji.png",
        width: 1200,
        height: 630,
        alt: "Kiswah Trading Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiswah Trading",
    description:
      "Kiswah Trading is a leading Ethiopian trading company, providing import-export and general trade services with excellence and integrity.",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1756636957/company/fis4jfffdgyjd5j7hsji.png",
    ],
    // creator: "@...",
  },
  icons: {
    icon: [
      {
        url: "../../public/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "../../public/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/../../publicapple-touch-icon.png",
    shortcut: "../../public/favicon.ico",
  },
  manifest: "../../public/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../../public/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../../public/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../../public/favicon-16x16.png"
        />
        <link rel="manifest" href="../../public/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen font-[var(--font-geist-sans)] bg-[var(--color-bg)] text-[var(--color-text)] transition-colors`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <CompanyInfoProviders>
              <main className="flex-1">{children}</main>
            </CompanyInfoProviders>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
