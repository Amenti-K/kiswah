"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { useAppSelector } from "@/redux/hooks";

const slides = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dr3kjsjej/image/upload/v1774212548/ship_hero_ejfqio.avif", // ship photo
    // "https://plus.unsplash.com/premium_photo-1661879449050-069f67e200bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // ship photo
    position: "items-start text-left",
    subtitle: "Connecting Global Trade Efficiently.",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dr3kjsjej/image/upload/v1774212548/ship_container_r3jzeb.avif", // container ship photo
    // "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // container ship photo
    position: "items-center text-center",
    subtitle: "Better Deals, Smarter Logistics.",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dr3kjsjej/image/upload/v1774212549/page_header_img_p0qg16.avif",
    // "https://plus.unsplash.com/premium_photo-1661963312443-e6f80b64ace6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    position: "items-end text-right",
    subtitle: "Your Trusted Partner in Global Commerce.",
  },
];

export const HeroSection = () => {
  const { data } = useAppSelector((state) => state.bootstrap);
  const companyName = data?.company.companyName;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      8000, // 8 seconds per slide
    );
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="relative h-[85vh] overflow-hidden flex flex-col justify-center"
      aria-label="Hero section showing company highlights"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0"
        >
          {/* Background Image Container with subtle zoom */}
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.subtitle}
              fill
              priority
              className="object-cover"
            />
            {/* Professional Overlay - Not too dark, just enough for text readability */}
            <div className="absolute inset-0 bg-neutral-900/40 backdrop-brightness-[0.85]" />
          </motion.div>

          {/* Content */}
          <div
            className={clsx(
              "absolute inset-0 flex px-8 md:px-20 py-10 text-white",
              slide.position,
            )}
          >
            <div className="max-w-3xl space-y-6 flex flex-col justify-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <span className="inline-block px-4 py-1 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
                  {companyName}
                </span>
                <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-white drop-shadow-lg">
                  Your Trusted <br />
                  <span className="text-gradient-golden">Trading Partner</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg md:text-xl text-neutral-100 max-w-xl font-medium leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="relative h-1 w-12 bg-white/20 rounded-full overflow-hidden transition-all hover:bg-white/40"
            aria-label={`Go to slide ${idx + 1}`}
          >
            {idx === current && (
              <motion.div
                layoutId="indicator"
                className="absolute inset-0 bg-primary"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 8, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
