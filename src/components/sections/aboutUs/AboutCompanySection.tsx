"use client";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "motion/react";

export const AboutCompanySection = () => {
  const { data } = useAppSelector((state) => state.bootstrap);
  const company = data?.company;

  return (
    <section className="py-16 container mx-auto px-4 flex flex-col md:flex-row gap-10 items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <span className="text-sm font-medium tracking-wider uppercase text-primary/70 mb-2 block">
          about us
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          {company?.companyName || "Kiswah Trading"}
        </h2>
        <div className="flex flex-col gap-y-4">
          {company?.about &&
            company.about.split("\n").map((para, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                {para}
              </p>
            ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-start w-full md:w-1/2 items-end"
      >
        <div className="relative h-[400px] md:h-[500px] w-full md:w-[450px] rounded-2xl overflow-hidden shadow-2xl border border-border/50">
          <Image
            src={
              // company?.logoUrl ||
              "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=800"
            }
            alt={company?.companyName || "Kiswah Trading operations"}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};
