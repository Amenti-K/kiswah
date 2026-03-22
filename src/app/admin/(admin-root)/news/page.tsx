"use client";

import { motion } from "motion/react";
import {
  useFetchNews,
  useCreateNews,
  useUpdateNews,
  useDeleteNews,
} from "@/apis/news.api";
import NewsArticleCard from "@/components/sections/news/NewsArticleCard";
import NewsDetailModal from "@/components/sections/news/NewsDetailModal";
import { useState } from "react";
import { INews } from "@/components/interface/news.interface";
import { Button } from "@/components/ui/button";
import { Newspaper, Loader2, PenTool, Plus } from "lucide-react";
import NewsForm from "@/components/forms/News.form";
import { NewsType } from "@/components/schema/news.schema";

export default function NewsPage() {
  const [limit] = useState(10);
  const [selectedNews, setSelectedNews] = useState<INews | null>(null);
  const [editingNews, setEditingNews] = useState<INews | undefined>(undefined);

  const {
    data: fetchResponse,
    isPending: isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchNews({ limit });

  const newsList: INews[] =
    fetchResponse?.pages?.flatMap((page) => page.data) || [];

  const { mutate: createNews, isPending: isCreating } = useCreateNews();
  const { mutate: updateNews, isPending: isUpdating } = useUpdateNews();
  const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

  const handleSubmit = (formData: NewsType) => {
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    if (formData.published !== undefined) {
      dataToSend.append("published", String(formData.published));
    }

    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((file) => {
        if (file instanceof File) {
          dataToSend.append("images", file);
        }
      });
    }

    if (editingNews?.id) {
      dataToSend.append("id", editingNews.id);
      updateNews(dataToSend, {
        onSuccess: () => {
          setEditingNews(undefined);
        },
      });
    } else {
      createNews(dataToSend, {
        onSuccess: () => {
          // Success
        },
      });
    }
  };

  const handleEdit = (item: INews) => {
    setEditingNews(item);
    // Scroll to form or show indicator
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this news update?")) {
      deleteNews(id);
    }
  };

  const cancelEdit = () => {
    setEditingNews(undefined);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Section: Timeline Content (8 columns approx) */}
        <div className="flex-1 space-y-12 lg:pr-10">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">
              Live Feed
            </span>
            <h1 className="text-5xl font-black tracking-tighter text-foreground">
              News <span className="text-primary italic">Timeline</span>
            </h1>
          </div>

          <div className="relative border-l border-primary/10 ml-4 pl-8 space-y-16">
            {isFetching && !isFetchingNextPage ? (
              <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="font-bold tracking-widest text-xs uppercase">
                  Gathering Articles...
                </p>
              </div>
            ) : (
              <>
                {newsList.length === 0 ? (
                  <div className="py-24 text-center border-2 border-dashed border-primary/10 rounded-[3rem] text-muted-foreground bg-card/10 backdrop-blur-sm">
                    <Newspaper className="h-16 w-16 mx-auto mb-4 opacity-10" />
                    <p className="text-xl font-bold italic tracking-tight underline underline-offset-8 decoration-primary/20">
                      Empty News Archive
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {newsList.map((itemValue) => (
                      <NewsArticleCard
                        key={itemValue.id}
                        news={itemValue}
                        onClick={setSelectedNews}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isDeleting={isDeleting}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {hasNextPage && (
                  <div className="flex justify-center pt-8">
                    <Button
                      variant="outline"
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="rounded-full px-12 h-14 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all font-black text-xs uppercase tracking-widest group shadow-xl hover:shadow-primary/20"
                    >
                      {isFetchingNextPage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Discover Older Stories"
                      )}
                    </Button>
                  </div>
                )}

                {!hasNextPage && newsList.length > 0 && (
                  <div className="text-center pt-12 text-xs font-black text-muted-foreground/30 tracking-[0.3em] uppercase">
                    You've reached the origin of our story
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Section: Sidebar Form (Fixed width approx 400px) */}
        <div className="w-full lg:w-[350px] sticky top-24">
          <div className="p-8 rounded-[3rem] bg-card border border-primary/10 shadow-3xl shadow-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-2xl ${editingNews ? "bg-yellow-500/10 text-yellow-500" : "bg-primary/10 text-primary"}`}
                >
                  {editingNews ? (
                    <PenTool className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {editingNews ? "Refine Article" : "Compose News"}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-0.5">
                    {editingNews
                      ? "Updating existing content"
                      : "Add to the timeline"}
                  </p>
                </div>
              </div>
              {editingNews && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className="text-xs font-bold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
              )}
            </div>

            <div className="relative z-10">
              <NewsForm
                defaultValues={editingNews}
                onSubmit={handleSubmit}
                isPending={isCreating || isUpdating}
              />
            </div>
          </div>

          <div className="mt-6 p-6 rounded-[2rem] bg-primary/5 border border-primary/10 text-center">
            <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">
              Global Status
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  System Ready
                </span>
              </div>
              <div className="w-px h-3 bg-primary/20" />
              <div className="text-[10px] font-black uppercase tracking-tighter">
                {newsList.length} Articles Live
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Article Modal */}
      <NewsDetailModal
        news={selectedNews}
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </div>
  );
}
