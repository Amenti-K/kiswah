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
              "https://res.cloudinary.com/dr3kjsjej/image/upload/v1774212549/page_header_img_p0qg16.avif"
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
