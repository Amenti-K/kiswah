"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface Vehicle {
  name: string;
  images: string[];
  description: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export const VehicleCard = ({ vehicle, index = 0 }: VehicleCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-xl overflow-hidden shadow-lg border border-border bg-card group"
    >
      {/* Image Section */}
      <div className="relative w-full h-72">
        <Image
          src={vehicle.images[currentImage]}
          alt={vehicle.name}
          fill
          className="object-cover transition-all duration-700"
        />

        {/* Navigation Arrows (visible on hover / mobile hint) */}
        <div
          className="
            absolute inset-0 flex items-center justify-between
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            sm:opacity-0 sm:group-hover:opacity-100
          "
        >
          <button
            onClick={handlePrev}
            className="ml-2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="mr-2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Image Indicator Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
          {vehicle.images.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentImage ? "bg-primary" : "bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="absolute bottom-2 right-2 text-[10px] bg-black/50 text-white px-2 py-0.5 rounded-md sm:hidden">
          Swipe →
        </div>
      </div>

      {/* Card Bottom */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {vehicle.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {vehicle.description}
        </p>
      </div>
    </motion.div>
  );
};
