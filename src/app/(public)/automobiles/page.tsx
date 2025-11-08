import AutoCategory from "@/components/sections/automobiles/AutoCategory";
import AutoHero from "@/components/sections/automobiles/AutoHero";
import AutoIntro from "@/components/sections/automobiles/AutoIntro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automobile Import | Kiswah Trading",
  description:
    "Kiswah Trading specializes in sourcing and importing quality vehicles from China to Ethiopia — ensuring reliability and affordability for our clients.",
  keywords: [
    "Automobile Import Ethiopia",
    "Car Import from China",
    "Vehicle Trade Ethiopia",
    "Auto Sourcing Ethiopia",
    "Car Logistics",
    "Kiswah Trading Cars",
  ],
  openGraph: {
    title: "Automobile Import Services — Kiswah Trading",
    description:
      "We help clients import high-quality vehicles from China to Ethiopia with trusted sourcing, inspection, and delivery services.",
    url: "https://kiswahtradingandlogistics.com/automobile",
    images: [
      {
        url: "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
        width: 1200,
        height: 630,
        alt: "Automobile imports Kiswah Trading",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automobile Import — Kiswah Trading",
    description:
      "Import quality vehicles from China to Ethiopia with Kiswah Trading’s reliable sourcing and delivery solutions.",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
    ],
  },
};

export default function AutomobilesPage() {
  return (
    <main className="flex flex-col">
      <AutoHero />
      <AutoIntro />

      {/* Electric Vehicles */}
      <AutoCategory
        title="Electric Vehicles"
        description="At Kiswah Trading & Logistics, we are driving Ethiopia’s transition toward clean and sustainable mobility by importing high-quality electric vehicles (EVs) from leading global brands such as BYD, Toyota, and GAC."
        features={[
          "Zero Emission",
          "Fast-Charging",
          "High Performance",
          "Low Maintenance",
        ]}
        image="https://images.unsplash.com/photo-1654246883355-d79160b61db5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
        link="/automobiles/electric"
        reversed={false}
      />

      {/* Heavy Duty */}
      <AutoCategory
        title="Heavy Duty & Construction Equipment"
        description="In addition to passenger vehicles, we also source and import heavy-duty vehicles and construction equipment. Including dump trucks, excavators, and dozers."
        features={["Trucks", "Loaders", "Excavators", "Bulldozers"]}
        image="https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592644/heavycars_johgfi.jpg"
        link="/automobiles/heavy-duty"
        reversed={true}
      />
    </main>
  );
}
