"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

const slides = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1661879449050-069f67e200bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // ship photo
    position: "items-start text-left",
    subtitle: "Connecting Global Trade Efficiently.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // container ship photo
    position: "items-center text-center",
    subtitle: "Better Deals, Smarter Logistics.",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1661963312443-e6f80b64ace6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // trucks photo
    position: "items-end text-right",
    subtitle: "Your Trusted Partner in Global Commerce.",
  },
];

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      10000 // 6 seconds per slide
    );
    return () => clearInterval(interval);
  }, []);

  const { image, position, subtitle } = slides[current];

  return (
    <section
      className="relative h-[85vh] overflow-hidden flex flex-col justify-center transition-all duration-1000"
      aria-label="Hero section showing company highlights"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={subtitle}
        fill
        priority
        className="object-cover brightness-75 transition-opacity duration-1000"
      />

      {/* Overlay */}
      <div
        className={clsx(
          "absolute inset-0 flex px-8 md:px-20 py-10 text-white transition-all duration-1000",
          position
        )}
      >
        <div className="max-w-2xl animate-fade-in space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
            Your Trusted <span className="text-primary">Trading Partner</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-md">
            {subtitle}
          </p>
          {/* <Link
            href="/contact"
            className="inline-block mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300"
          >
            Get Started
          </Link> */}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={clsx(
              "w-3 h-3 rounded-full transition-all",
              idx === current ? "bg-primary scale-125" : "bg-gray-400"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
