"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export const AboutPreview = () => (
  <section
    id="about"
    className="container mx-auto px-4 py-24 md:py-32"
    aria-labelledby="about-preview-heading"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Text column (left on md+) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="order-2 lg:order-1"
      >
        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            Our Story
          </span>
          <h2
            id="about-preview-heading"
            className="text-4xl md:text-5xl font-black text-foreground leading-tight"
          >
            Kiswah Trading <br />{" "}
            <span className="text-gradient-golden">& Logistics</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Kiswah specializes in logistics, import/export and trade
            facilitation across East Africa. We design secure supply chain
            solutions, manage customs clearance, and connect local producers
            with global markets using reliable and scalable processes.
          </p>

          <ul className="space-y-4 mb-8">
            {[
              "End-to-end freight & customs management",
              "International procurement & vendor coordination",
              "Customs compliance, documentation & tracking",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-3 text-foreground/80 font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
            >
              Explore Solutions{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Image column (right on md+) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="order-1 lg:order-2 flex justify-center lg:justify-end"
      >
        <div className="relative w-full max-w-2xl h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
          <Image
            src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1200"
            alt="Kiswah Trading operations"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  </section>
);
