import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Kiswah Trading",
  description:
    "Explore Kiswah Trading’s full range of import, export, and logistics services — designed to help your business move faster and grow globally.",
  keywords: [
    "Trading Services",
    "Logistics Services",
    "Import Services Ethiopia",
    "Export Solutions",
    "Freight Forwarding Ethiopia",
    "Customs Clearing",
  ],
  openGraph: {
    title: "Trading & Logistics Services — Kiswah Trading",
    description:
      "We provide professional import, export, and logistics services for businesses across Ethiopia and China.",
    url: "https://kiswahtradingandlogistics.com/services",
    images: [
      {
        url: "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
        width: 1200,
        height: 630,
        alt: "Kiswah services showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services — Kiswah Trading",
    description:
      "Kiswah offers trading and logistics services designed to simplify import, export, and freight operations for Ethiopian businesses.",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
    ],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
