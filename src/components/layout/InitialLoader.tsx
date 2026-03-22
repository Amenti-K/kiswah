"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface InitialLoaderProps {
  companyName?: string;
  logoUrl?: string;
  onComplete?: () => void;
}

const InitialLoader = ({
  companyName,
  logoUrl,
  onComplete,
}: InitialLoaderProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Connecting Ethiopia & China",
    "Reliable Trading Solutions",
    "Global Logistics Excellence",
    "Integrity & Efficiency",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -20,
        transition: { duration: 0.8, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 blur-[100px] rounded-full"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          <Image
            src={
              logoUrl ||
              "https://res.cloudinary.com/dr3kjsjej/image/upload/v1774210699/kiswah/company/wevugjzek6ntasbq5b79.jpg"
            }
            alt="Logo"
            width={150}
            height={150}
            className="relative object-contain rounded-2xl border-2 border-primary/20 shadow-2xl shadow-primary/10"
          />
        </motion.div>

        {/* Company Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-bold tracking-tighter text-foreground mb-4"
        >
          {companyName || "KISWAH"}
        </motion.h1>

        {/* Dynamic Text */}
        <div className="h-6 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-medium tracking-widest uppercase text-xs"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Loading Bar */}
        <div className="mt-12 w-48 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default InitialLoader;
