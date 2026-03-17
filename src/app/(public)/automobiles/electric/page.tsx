import tangL1 from "@/../public/assets/tang1.jpg";
import tangL2 from "@/../public/assets/tang2.jpg";
import yuanUp1 from "@/../public/assets/yuan.jpg";
import yuanUp2 from "@/../public/assets/yuan1.jpg";
import yuanUp3 from "@/../public/assets/yuan2.jpg";
import bZ3X1 from "@/../public/assets/bz3x.jpg";
import bZ3X2 from "@/../public/assets/bz3x1.jpg";
import bZ3X3 from "@/../public/assets/bz3x2.jpg";
import trumpchi1 from "@/../public/assets/gac.jpg";
import trumpchi2 from "@/../public/assets/gac1.jpg";
import trumpchi3 from "@/../public/assets/gac2.jpg";
import { VehicleCard } from "@/components/sections/automobiles/VehicleCard";

const vehicles = [
  {
    name: "BYD Tang L",
    images: [tangL1, tangL2],
    description: `The Tang L is a premium 7-seat mid-to-large SUV blending high performance with advanced electric technologies.`,
  },
  {
    name: "BYD Yuan Up",
    images: [yuanUp1, yuanUp2, yuanUp3],
    description: `A compact electric SUV ideal for city use, with 401 km of range and smart EV performance.`,
  },
  {
    name: "Toyota bZ3X (2025)",
    images: [bZ3X1, bZ3X2, bZ3X3],
    description: `Toyota’s 2025 electric SUV offering 430–620 km range, cutting-edge design, and global reliability.`,
  },
  {
    name: "GAC Trumpchi S7 (2025)",
    images: [trumpchi1, trumpchi2, trumpchi3],
    description: `A sporty hybrid SUV with LiDAR tech, advanced driver assist, and premium comfort.`,
  },
];

export default function ElectricVehiclesPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Trending Electric Vehicles
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of modern electric vehicles imported from
          trusted global manufacturers. Combining performance, innovation, and
          sustainability for Ethiopia’s growing EV market.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle, index) => (
          <VehicleCard key={index} vehicle={vehicle} index={index} />
        ))}
      </section>
    </main>
  );
}
