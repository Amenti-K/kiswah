"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { ToolFileType } from "@/components/interface/analytics.interface";

const shieldItems = [
  {
    letter: "S",
    title: "Security",
    description:
      "We protect our clients’ trade through ethical sourcing, reliable logistics, and full compliance.",
  },
  {
    letter: "H",
    title: "Honesty",
    description:
      "We operate with transparency, integrity, and truth in every deal and delivery.",
  },
  {
    letter: "I",
    title: "Innovation",
    description:
      "We continuously improve through smarter systems and modernized trade strategies.",
  },
  {
    letter: "E",
    title: "Excellence",
    description: "We deliver consistent, high-quality performance every time.",
  },
  {
    letter: "L",
    title: "Loyalty",
    description: "We build long-term partnerships, not transactions.",
  },
  {
    letter: "D",
    title: "Dependability",
    description:
      "We are a partner you can count on — in every shipment, every challenge.",
  },
];

export const PhilosophyCultureSection = () => {
  const { data } = useAppSelector((state) => state.bootstrap);
  const companyProfile = data?.tools.find(
    (tool) => tool.type === ToolFileType.companyProfile,
  );

  return (
    <section className="py-16 md:py-24 container mx-auto px-4 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE — Shield Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center relative"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 group">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
            <Image
              src="https://res.cloudinary.com/dr3kjsjej/image/upload/v1774212548/sheild_containers_oaea6t.avif"
              alt="Security Shield"
              fill
              className="object-cover drop-shadow-2xl rounded-2xl relative z-10 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* RIGHT SIDE — Culture + Button */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Corporate Culture —{" "}
              <span className="text-primary">S.H.I.E.L.D</span>
            </h2>
            <div className="space-y-4">
              {shieldItems.map((item, index) => (
                <motion.div
                  key={item.letter}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start group"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                    {item.letter}
                  </span>
                  <p className="text-base md:text-lg text-muted-foreground">
                    <strong className="text-foreground">{item.title}</strong> –{" "}
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Profile Button */}
          {companyProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Link
                href={companyProfile.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Download Company Profile
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
