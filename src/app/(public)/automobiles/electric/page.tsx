import { VehicleCard } from "@/components/sections/automobiles/VehicleCard";

const vehicles = [
  {
    name: "BYD Tang L",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762504337/tang_cizd39.jpg",
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592626/tang2_a3wmgy.jpg",
    ],
    description: `The Tang L is a premium 7-seat mid-to-large SUV blending high performance with advanced electric technologies.`,
  },
  {
    name: "BYD Yuan Up",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762504336/yuan_x13bz8.jpg",
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592628/yuan2_jnl5em.jpg",
    ],
    description: `A compact electric SUV ideal for city use, with 401 km of range and smart EV performance.`,
  },
  {
    name: "Toyota bZ3X (2025)",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762504336/bz3x_xtan8f.jpg",
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592631/bz3x2_lzcqah.jpg",
    ],
    description: `Toyota’s 2025 electric SUV offering 430–620 km range, cutting-edge design, and global reliability.`,
  },
  {
    name: "GAC Trumpchi S7 (2025)",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592641/gac1_crnenh.jpg",
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592643/gac2_nvqddj.jpg",
    ],
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
