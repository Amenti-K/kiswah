"use client";

// import type { Metadata } from "next";
import AutoHero from "@/components/sections/automobiles/AutoHero";
import AutoIntro from "@/components/sections/automobiles/AutoIntro";
import AutomobilesList from "@/components/sections/automobiles/AutomobilesList";

// export const metadata: Metadata = {
//   title: "Automobile Import | Kiswah Trading",
//   description:
//     "Kiswah Trading specializes in sourcing and importing quality vehicles from China to Ethiopia — ensuring reliability and affordability for our clients.",
//   keywords: [
//     "Automobile Import Ethiopia",
//     "Car Import from China",
//     "Vehicle Trade Ethiopia",
//     "Auto Sourcing Ethiopia",
//     "Car Logistics",
//     "Kiswah Trading Cars",
//   ],
//   openGraph: {
//     title: "Automobile Import Services — Kiswah Trading",
//     description:
//       "We help clients import high-quality vehicles from China to Ethiopia with trusted sourcing, inspection, and delivery services.",
//     url: "https://kiswahtradingandlogistics.com/automobile",
//     images: [
//       {
//         url: "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Automobile imports Kiswah Trading",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Automobile Import — Kiswah Trading",
//     description:
//       "Import quality vehicles from China to Ethiopia with Kiswah Trading’s reliable sourcing and delivery solutions.",
//     images: [
//       "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
//     ],
//   },
// };

export default function AutomobilesPage() {
  return (
    <main className="flex flex-col">
      <AutoHero />
      <AutoIntro />
      <AutomobilesList />
    </main>
  );
}
