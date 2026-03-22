"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useState } from "react";

export interface Vehicle {
  name: string;
  imageUrls: string[];
  description: string;
}

interface VehicleCardProps {
  vehicle: any; // Allow IVehicle or local Vehicle interface
  index?: number;
}

export const VehicleCard = ({ vehicle, index = 0 }: VehicleCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = vehicle.imageUrls || vehicle.images || [];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-[2rem] overflow-hidden border border-border/50 bg-background/50 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative w-full h-72 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage]}
              alt={vehicle.name}
              fill
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        {/* Floating Badge */}
        <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                Premium
            </span>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-primary hover:border-primary transition-all shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-primary hover:border-primary transition-all shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Image Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_: any, i: number) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentImage ? "bg-primary w-6" : "bg-white/30 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-8 flex flex-col flex-grow space-y-4">
        <div className="space-y-2">
            <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
            {vehicle.name}
            </h3>
            <div className="h-0.5 w-10 bg-primary/30 group-hover:w-full transition-all duration-500" />
        </div>
        
        <p className="text-muted-foreground leading-relaxed flex-grow text-sm">
          {vehicle.description}
        </p>

        <div className="pt-4 flex items-center justify-between">
             <div className="flex items-center gap-2 text-xs font-bold text-primary">
                 <Info className="w-4 h-4" />
                 <span>Import Available</span>
             </div>
             {/* <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                 <ArrowUpRight className="w-5 h-5" />
             </button> */}
        </div>
      </div>
    </motion.div>
  );
};
