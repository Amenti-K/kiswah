"use client";
import { PageHeader } from "@/components/sections/PageHeader";
import { AboutCompanySection } from "@/components/sections/aboutUs/AboutCompanySection";
import { VisionMissionSection } from "@/components/sections/aboutUs/VisionMissionSection";
import { AchievementsSection } from "@/components/sections/aboutUs/AchievementsSection";
import Leadership from "@/components/sections/aboutUs/Leadership";
import { PhilosophyCultureSection } from "@/components/sections/aboutUs/PhilosophyCultureSection";

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
