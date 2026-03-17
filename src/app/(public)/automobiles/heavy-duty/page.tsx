import dumpTruck1 from "@/../public/assets/DumbTruck1.jpg";
import dumpTruck2 from "@/../public/assets/DumbTruck2.jpg";
import excavator1 from "@/../public/assets/excavotors1.jpg";
import excavator2 from "@/../public/assets/excavotors2.jpg";
import loader1 from "@/../public/assets/loaders1.jpg";
import loader2 from "@/../public/assets/loaders2.jpg";
import concreteMixer1 from "@/../public/assets/concreteMixers1.jpg";
import concreteMixer2 from "@/../public/assets/concreteMixers2.jpg";
import bulldozer1 from "@/../public/assets/dozers1.jpg";
import bulldozer2 from "@/../public/assets/dozers2.jpg";
import { VehicleCard } from "@/components/sections/automobiles/VehicleCard";

const vehicles = [
  {
    name: "Dump Trucks",
    images: [dumpTruck1, dumpTruck2],
    description: `high-quality dump trucks suitable for construction, mining, and road projects across Ethiopia. Our trucks are sourced from trusted manufacturers such as HOWO, Sinotruk, Shacman, FAW, and Dongfeng, ensuring power, reliability, and long operational life.`,
  },
  {
    name: "Excavators",
    images: [excavator1, excavator2],
    description: `Our imported excavators combine power, precision, and efficiency for all kinds of construction, mining, and infrastructure projects. We import both new and used models from leading brands like Caterpillar, SANY, XCMG, Komatsu, and LiuGong.`,
  },
  {
    name: "Loaders",
    images: [loader1, loader2],
    description: `We supply wheel loaders and backhoe loaders designed for heavy lifting, loading, and material transport on job sites. Kiswah’s network ensures dependable machines with strong after-sales support and spare part availability.`,
  },
  {
    name: "Concrete Mixers",
    images: [concreteMixer1, concreteMixer2],
    description: `We import concrete mixer trucks and stationary mixers tailored for Ethiopia’s construction and real estate development sectors. Our mixers are designed for high durability and efficient concrete transport.`,
  },
  {
    name: "Dozers (Bulldozers)",
    images: [bulldozer1, bulldozer2],
    description: `Kiswah imports crawler and wheeled bulldozers ideal for heavy earthmoving, land clearing, and construction foundation work. Our range includes powerful models from Shantui, HBXG, Komatsu, and Caterpillar.`,
  },
];

export default function HeavyDutyPage() {
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
