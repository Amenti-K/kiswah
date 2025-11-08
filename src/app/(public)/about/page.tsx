import { PageHeader } from "@/components/sections/PageHeader";
import { AboutCompanySection } from "@/components/sections/aboutUs/AboutCompanySection";
import { VisionMissionSection } from "@/components/sections/aboutUs/VisionMissionSection";
import Leadership from "@/components/sections/aboutUs/Leadership";
import { PhilosophyCultureSection } from "@/components/sections/aboutUs/PhilosophyCultureSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kiswah Trading",
  description:
    "Learn about Kiswah Trading’s mission, vision, and commitment to building strong trade relationships between Ethiopia and global partners.",
  keywords: [
    "About Kiswah Trading",
    "Ethiopian Trading Company",
    "Logistics Experts Ethiopia",
    "Import Export Professionals",
    "Global Trade Ethiopia",
  ],
  openGraph: {
    title: "About Kiswah Trading and Logistics",
    description:
      "Discover the story, mission, and team behind Kiswah Trading — Ethiopia’s trusted import-export and logistics partner.",
    url: "https://kiswahtradingandlogistics.com/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Kiswah Trading team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Kiswah Trading and Logistics",
    description:
      "Meet Kiswah Trading — connecting Ethiopia and global markets through trusted trade and logistics.",
    images: ["/og-about.jpg"],
  },
};

const sections = [
  AboutCompanySection,
  VisionMissionSection,
  PhilosophyCultureSection,
  Leadership,
];

const About = () => {
  return (
    <>
      <PageHeader
        title="About Us"
        image="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1200"
      />

      {sections.map((SectionComp, idx) => {
        const EvenBg = idx % 2 === 1;
        return (
          <div
            key={idx}
            className={
              EvenBg
                ? "bg-muted/6 dark:bg-muted/14 transition-colors"
                : "bg-transparent"
            }
          >
            <SectionComp />
          </div>
        );
      })}
    </>
  );
};

export default About;
