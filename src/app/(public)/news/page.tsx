"use client";

import { motion } from "motion/react";
import { PageHeader } from "@/components/sections/PageHeader";
import { useFetchNews } from "@/apis/news.api";
import NewsCard from "@/components/sections/news/NewsCard";
import NewsDetailModal from "@/components/sections/news/NewsDetailModal";
import { Button } from "@/components/ui/button";
import { INews } from "@/components/interface/news.interface";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function NewsPage() {
  const [limit] = useState(6);
  const [selectedNews, setSelectedNews] = useState<INews | null>(null);

  const {
    data: fetchResponse,
    isPending: isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchNews({ limit });

  // Flatten pages and filter for published news for the public view
  const allNewsItems: INews[] =
    fetchResponse?.pages?.flatMap((page) => page.data) || [];
  const publishedNews = allNewsItems.filter((item) => item.published);

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="News & Updates"
        image="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=60&w=1200"
      />

      <div className="max-w-3xl mx-auto px-4 mt-10 mb-20">
        <div className="flex flex-col space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-primary/60">
              COMMUNICATION HUB
            </span>
            <h2 className="text-5xl font-black text-foreground tracking-tighter">
              Latest <span className="text-primary italic">Updates</span>
            </h2>
            <div className="h-1.5 w-20 bg-primary/20 mx-auto rounded-full" />
          </div>

          {/* News Stream */}
          <div className="space-y-12">
            {isFetching && !isFetchingNextPage ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="font-bold tracking-widest text-xs uppercase">
                  Curating Stories...
                </p>
              </div>
            ) : (
              <>
                {publishedNews.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-24 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border/50"
                  >
                    <p className="text-xl font-bold text-foreground">
                      Our archive is currently empty.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      We're preparing new announcements. Stay tuned.
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 gap-12">
                    {publishedNews.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <NewsCard news={item} onView={setSelectedNews} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {hasNextPage && (
                  <div className="flex justify-center pt-12">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="rounded-full px-12 h-14 border-2 border-primary/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/5"
                    >
                      {isFetchingNextPage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Unfolding more...
                        </>
                      ) : (
                        "Load More Chronicles"
                      )}
                    </Button>
                  </div>
                )}

                {!hasNextPage && publishedNews.length > 0 && (
                  <div className="text-center pt-16 text-[10px] font-black text-muted-foreground/30 tracking-[0.4em] uppercase">
                    You've reached the end of our current stream
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <NewsDetailModal
        news={selectedNews}
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </div>
  );
}
