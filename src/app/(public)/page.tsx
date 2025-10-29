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

  if (status === "loading") {
    return (
      <div>
        {/* Hero Skeleton */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 text-center space-y-6">
            <Skeleton className="h-10 w-2/3 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-20 w-3/4 mx-auto" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-32 rounded-lg" />
              <Skeleton className="h-12 w-32 rounded-lg" />
            </div>
          </div>
        </section>

        {/* Quick Links Skeleton */}
        <section className="py-16">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        </section>
      </div>
    );
  }
  const companyInfo = status === "failed" ? companyInfoDefault : data;
  if (!companyInfo) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Company info not available.</p>
      </div>
    );
  }
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
