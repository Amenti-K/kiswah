"use client";

import { useFetchVehicles } from "@/apis/automobiles.api";
import { VehicleCard } from "@/components/sections/automobiles/VehicleCard";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function CategoryPage() {
  const { id, name } = useParams();
  const { data: response, isLoading, error } = useFetchVehicles(id as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !response?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4"
        >
          Vehicles Not Found
        </motion.h1>
        <p className="text-muted-foreground">
          Sorry, we couldn't fetch the vehicles for this category.
        </p>
      </div>
    );
  }

  const vehicles = response.data;
  const decodedName = decodeURIComponent(name as string);

  return (
    <main className="container mx-auto px-6 py-12 min-h-screen">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative"
      >
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
          Collection
        </span>
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-foreground tracking-tighter uppercase italic">
          {decodedName}
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-golden to-primary mx-auto mb-8 rounded-full shadow-lg shadow-primary/20" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
          Discover our premium selection of {decodedName} — built for
          performance, reliability, and style.
        </p>

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </motion.section>

      <AnimatePresence>
        {vehicles.length > 0 ? (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12"
          >
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </motion.section>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-muted/20 rounded-[3rem] border-2 border-dashed border-muted/50 max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <p className="text-muted-foreground text-xl font-bold">
              No vehicles found in this category yet.
            </p>
            <p className="text-muted-foreground mt-2">
              Please check back soon for our latest arrivals.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
