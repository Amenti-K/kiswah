"use client";
import { galleryImgs } from "@/apis/gallery.api";
import { PageHeader } from "@/components/sections/PageHeader";
import { motion } from "motion/react";

export default function GalleryPage() {
  return (
    <div className="pb-20">
      {/* Header */}
      <PageHeader
        title="Gallery"
        image="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=60&w=1200"
      />

      {/* Intro */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="py-10">
          <span className="text-sm text-[var(--color-muted-foreground)]">
            Gallery
          </span>
          <h2 className="text-3xl font-bold text-primary mb-6">
            Our stunning gallery
          </h2>
        </div>

        {/* Empty State */}
        {galleryImgs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 text-muted-foreground"
          >
            <p className="text-lg font-medium">
              No gallery images available yet.
            </p>
            <p className="text-sm mt-2">Please check back later for updates.</p>
          </motion.div>
        )}

        {/* Gallery Grid */}
        {galleryImgs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImgs.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="overflow-hidden shadow-md"
              >
                <img
                  src={img}
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
