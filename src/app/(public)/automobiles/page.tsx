import AutoCategory from "@/components/sections/automobiles/AutoCategory";
import AutoHero from "@/components/sections/automobiles/AutoHero";
import AutoIntro from "@/components/sections/automobiles/AutoIntro";

export default function AutomobilesPage() {
  return (
    <main className="flex flex-col">
      <AutoHero />
      <AutoIntro />

      {/* Electric Vehicles */}
      <AutoCategory
        title="Electric Vehicles"
        description="We partner with BYD, one of the world’s leading EV manufacturers, to deliver affordable, eco-friendly cars perfectly suited for Ethiopia’s future mobility."
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
        description="Our heavy-duty division provides a full range of construction and transport machinery designed for reliability and endurance."
        features={["Trucks", "Loaders", "Excavators", "Mixers"]}
        image="https://images.unsplash.com/photo-1751054786365-4b02b690d301?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
        link="/automobiles/heavy-duty"
        reversed={true}
      />
    </main>
  );
}
