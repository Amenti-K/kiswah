import { VehicleCard } from "@/components/sections/automobiles/VehicleCard";

const vehicles = [
  {
    name: "Dump Trucks",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592635/DumbTruck1_zpmhll.jpg",
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592636/DumbTruck2_ttjebq.jpg",
    ],
    description: `high-quality dump trucks suitable for construction, mining, and road projects across Ethiopia. Our trucks are sourced from trusted manufacturers such as HOWO, Sinotruk, Shacman, FAW, and Dongfeng, ensuring power, reliability, and long operational life.`,
  },
  {
    name: "Excavators",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592639/excavotors1_jgf9kj.jpg",
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592640/excavotors2_vcblko.jpg",
    ],
    description: `Our imported excavators combine power, precision, and efficiency for all kinds of construction, mining, and infrastructure projects. We import both new and used models from leading brands like Caterpillar, SANY, XCMG, Komatsu, and LiuGong.`,
  },
  {
    name: "Loaders",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592645/loaders1_fqnhjl.jpg",
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592647/loaders2_flu5ip.jpg",
    ],
    description: `We supply wheel loaders and backhoe loaders designed for heavy lifting, loading, and material transport on job sites. Kiswah’s network ensures dependable machines with strong after-sales support and spare part availability.`,
  },
  {
    name: "Concrete Mixers",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592632/concreteMixers2_oggqhf.jpg",
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592632/concreteMixers1_inh1xb.jpg",
    ],
    description: `We import concrete mixer trucks and stationary mixers tailored for Ethiopia’s construction and real estate development sectors. Our mixers are designed for high durability and efficient concrete transport.`,
  },
  {
    name: "Dozers (Bulldozers)",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592635/dozers1_w8awhx.jpg",
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762592635/dozers2_beyjyo.jpg",
    ],
    description: `Kiswah imports crawler and wheeled bulldozers ideal for heavy earthmoving, land clearing, and construction foundation work. Our range includes powerful models from Shantui, HBXG, Komatsu, and Caterpillar.`,
  },
];

export default function ElectricVehiclesPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Heavy Duty & Construction Equipment
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          In addition to passenger vehicles, we also source and import
          heavy-duty vehicles and construction equipment — including dump
          trucks, excavators, and dozers.
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
