"use client";
import { motion } from "motion/react";
import Image from "next/image";

const vehicles = [
  {
    name: "BYD Tang L",
    image:
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762504337/tang_cizd39.jpg",
    description: `The Tang L is a premium 7-seat mid-to-large SUV that blends high performance with advanced electric technologies. With a length of about 5,040 mm, it offers luxury interiors, a digital cockpit, and plenty of power — perfect for families or executives in Ethiopia.`,
  },
  {
    name: "BYD Yuan Up",
    image:
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762504336/yuan_x13bz8.jpg",
    description: `A compact electric SUV ideal for city use and smaller import budgets. It provides up to 401 km of range, smart infotainment, and efficient EV performance — perfect for modern, eco-conscious drivers.`,
  },
  {
    name: "Toyota bZ3X (2025)",
    image:
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762504336/bz3x_xtan8f.jpg",
    description: `The 2025 bZ3X is Toyota’s new 5-door, 5-seat electric SUV with a 430–620 km range, offering global reliability and cutting-edge design — a premium yet practical EV for Ethiopian roads.`,
  },
  {
    name: "GAC Trumpchi S7 (2025)",
    image:
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762504336/yuan_x13bz8.jpg",
    description: `A sporty and versatile SUV featuring hybrid and PHEV options, advanced driver-assist, and LiDAR technology — combining power, comfort, and innovation at great value.`,
  },
];

export default function ElectricVehiclesPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Electric Vehicles
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of modern electric vehicles imported from
          trusted global manufacturers — combining performance, innovation, and
          sustainability for Ethiopia’s growing EV market.
        </p>
      </motion.section>

      {/* Vehicle Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 border border-border group"
          >
            {/* Car Image */}
            <div className="relative w-full h-80">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Sliding Overlay (bottom sheet style) */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[35%] group-hover:h-full transition-all duration-700 ease-out
              bg-gradient-to-t from-black/90 via-black/70 to-transparent flex flex-col justify-end p-6 text-white"
            >
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: -100 }}
                transition={{ duration: 0.3 }}
                className="transition-all duration-500 group-hover:translate-y-0"
              >
                <h3 className="text-2xl font-semibold mb-2">{vehicle.name}</h3>
                <p
                  className="text-sm text-gray-200 leading-relaxed opacity-0 translate-y-4 
                  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
                >
                  {vehicle.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
