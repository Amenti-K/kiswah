"use client";

import { useFetchCategories } from "@/apis/automobiles.api";
import AutoCategory from "@/components/sections/automobiles/AutoCategory";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AutomobilesList() {
  const { data: response, isLoading } = useFetchCategories();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const categories = response?.data || [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {categories.map((category, index) => (
        <AutoCategory
          key={category.id}
          title={category.name}
          description={category.description}
          features={category.characteristics}
          image={category.imageUrl}
          link={`/automobiles/${category.id}/${category.name}`}
          reversed={index % 2 !== 0}
        />
      ))}
    </motion.div>
  );
}
