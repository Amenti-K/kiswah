"use client";
import { useAppSelector } from "@/store/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { companyInfoDefault } from "@/lib/data";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { ServicesPreview } from "@/components/sections/home/ServicesPreview";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ContactPreview } from "@/components/sections/home/ContactPreview";

const Home = () => {
  const { data, status } = useAppSelector((state) => state.companyInfo);

  return (
    <div>
      <HeroSection />
      <AboutPreview />
      <ServicesPreview />
      <ContactPreview />
    </div>
  );
};

export default Home;
