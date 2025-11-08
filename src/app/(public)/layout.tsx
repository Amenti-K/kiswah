import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Home | Kiswah Trading",
  description:
    "Your trusted partner in trading and logistics between Ethiopia and China. Kiswah Trading offers import, export, and freight solutions with reliability and excellence.",
  keywords: [
    "Kiswah Trading",
    "Ethiopia Trading Company",
    "Import Export Ethiopia",
    "Logistics Ethiopia",
    "Freight Forwarding",
    "China Ethiopia Trade",
  ],
  openGraph: {
    title: "Kiswah Trading — Your Trusted Trade Partner",
    description:
      "Connecting Ethiopia with China through reliable trading and logistics services. Discover Kiswah’s import, export, and general trade solutions.",
    url: "https://kiswahtradingandlogistics.com/",
    images: [
      {
        url: "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
        width: 1200,
        height: 630,
        alt: "Kiswah Trading homepage banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiswah Trading — Reliable Trade Partner",
    description:
      "Kiswah Trading connects Ethiopia with the world through trusted trading and logistics services.",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
