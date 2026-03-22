"use client";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "motion/react";

export const VisionMissionSection = () => {
  const { data } = useAppSelector((state) => state.bootstrap);
  const company = data?.company;

  const values = [
    {
      title: "Our Mission",
      description: company?.mission,
      icon: "Target",
      accent: "bg-primary/10 text-primary",
    },
    {
      title: "Our Vision",
      description: company?.vision,
      icon: "Lightbulb",
      accent: "bg-golden/10 text-golden-600",
    },
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {values.map((value, index) => {
            const Icon = getIcon(value.icon);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="h-full p-6 md:p-10 rounded-[2rem] bg-background border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 group flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 25 }}
                    className="w-16 h-16 mb-8 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white text-primary shadow-sm"
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-foreground tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed font-medium max-w-md">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
