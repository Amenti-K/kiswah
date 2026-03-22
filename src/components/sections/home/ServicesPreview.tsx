"use client";

import { CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { motion } from "motion/react";

export const ServicesPreview = () => {
  const { data } = useAppSelector((state) => state.bootstrap);
  const trandingServices = data?.services?.slice(0, 3);

  return (
    <section id="services" className="container mx-auto px-4 py-24 bg-muted/20">
      <div className="text-center mb-16 space-y-4">
        <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
          Our Expertise
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-foreground">
          Premium <span className="text-gradient-golden">Trading Services</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We specialize in global commodity trading, logistics, and supply chain
          solutions designed to help partners grow sustainably.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {trandingServices?.map((service, index) => {
          const Icon = getIcon(service?.iconName || "");
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <div className="h-full group p-8 rounded-[2rem] bg-background border border-border/60 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="p-0 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center mt-16 font-bold uppercase tracking-widest">
        <Link
          href="/services"
          className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-white hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
        >
          Explore All Services{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};
