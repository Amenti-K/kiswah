import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { ServicesPreview } from "@/components/sections/home/ServicesPreview";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ContactPreview } from "@/components/sections/home/ContactPreview";

const Home = () => {
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
