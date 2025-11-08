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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kiswah-two.vercel.app/"
  ),
  title: {
    default: "Kiswah Trading",
    template: "%s | Kiswah Trading",
  },
  description:
    "Kiswah Trading and Logistics is a leading Ethiopian trading company, providing import-export and general trade services with excellence and integrity.",
  keywords: [
    "Kiswah Trading and Logistics",
    "Trading Company",
    "Logistics Company",
    "Import-Export",
    "General Trade",
    "Ethiopia",
  ],
  authors: [
    {
      name: "Kiswah Trading and Logistics",
      url: "https://kiswahtradingandlogistics.com/",
    },
  ],
  creator: "Kiswah Trading and Logistics",
  publisher: "Kiswah Trading and Logistics",
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
  referrer: "origin-when-cross-origin",
  // themeColor: "#ffffff",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kiswahtradingandlogistics.com/",
    siteName: "Kiswah Trading and Logistics",
    title: "Kiswah Trading and Logistics",
    description:
      "Kiswah Trading and Logistics is a leading Ethiopian trading company, providing import-export and general trade services with excellence and integrity.",
    images: [
      {
        url: "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
        width: 1200,
        height: 630,
        alt: "Kiswah Trading and Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiswah Trading and Logistics",
    description:
      "Kiswah Trading and Logistics is a leading Ethiopian trading company, providing import-export and general trade services with excellence and integrity.",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
