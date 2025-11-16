"use client";

import { INews } from "@/lib/types/news";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function NewsCard(news: INews) {
  const { image, title, date, description } = news;

  const [expanded, setExpanded] = useState(false);

  const shortDesc =
    description.length > 150
      ? description.substring(0, 150) + "..."
      : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-xl overflow-hidden shadow bg-white dark:bg-neutral-900 mx-auto max-w-3xl w-full"
    >
      {/* Image */}
      <div className="relative w-full h-80 md:h-[420px]">
        <Image
          src={image}
          alt="news image"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Text Area */}
      <div className="p-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">{date}</p>

        <p className="text-base text-muted-foreground whitespace-pre-line leading-relaxed">
          {expanded ? description : shortDesc}
        </p>

        {description.length > 350 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary text-sm mt-3 underline font-medium"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
