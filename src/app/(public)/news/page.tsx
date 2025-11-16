"use client";

import { motion } from "motion/react";
import { PageHeader } from "@/components/sections/PageHeader";
import { NEWS_LIST } from "@/apis/news.api";
import NewsCard from "@/components/sections/news/NewsCard";

export default function NewsPage() {
  return (
    <div className="pb-24">
      {/* Page Header */}
      <PageHeader
        title="News"
        image="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=60&w=1200"
      />

      {/* Intro */}
      <div className="max-w-5xl mx-auto px-4 mt-10">
        <span className="text-sm text-[var(--color-muted-foreground)]">
          News Updates
        </span>

        <h2 className="text-3xl font-bold text-primary mb-10">
          Latest Company News
        </h2>

        {/* Empty State */}
        {NEWS_LIST.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 text-muted-foreground"
          >
            <p className="text-lg font-medium">
              There are no news updates yet.
            </p>
            <p className="text-sm mt-2">
              Please check back soon for announcements.
            </p>
          </motion.div>
        )}

        {/* News List */}
        {NEWS_LIST.length > 0 && (
          <div className="space-y-12">
            {NEWS_LIST.map((item) => (
              <NewsCard
                key={item.id}
                image={item.image}
                title={item.title}
                date={item.date}
                description={item.description}
                id={item.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
