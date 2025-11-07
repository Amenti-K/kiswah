"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { aboutData } from "@/data/about";

const About = () => {
  const { ethiopiaTeam, chinaTeam } = aboutData.leadership;

  const renderTeam = (title: string, team: any[]) => (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-12"
    >
      {/* Section Title */}
      <h3 className="text-3xl font-bold text-center">{title}</h3>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
        {team.map((member: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[340px] rounded-xl overflow-hidden shadow-lg border border-border group"
          >
            {/* Image */}
            <div className="relative w-full h-[420px]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/70" />
            </div>

            {/* Text overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 transition-all duration-500 group-hover:translate-y-[-10px]">
              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-300 mt-1">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );

  return (
    <main className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">Our Leadership</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the teams leading our operations in Ethiopia and China —
            driving excellence, innovation, and cross-border collaboration.
          </p>
        </motion.div>

        {/* Two Teams */}
        <div className="space-y-28">
          {renderTeam("Ethiopia Team", ethiopiaTeam)}
          {renderTeam("China Team", chinaTeam)}
        </div>
      </div>
    </main>
  );
};

export default About;
