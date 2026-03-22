"use client";

import { INews } from "@/components/interface/news.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface NewsDetailModalProps {
  news: INews | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsDetailModal({
  news,
  isOpen,
  onClose,
}: NewsDetailModalProps) {
  if (!news) return null;

  const dateStr = news.publishedAt
    ? new Date(news.publishedAt).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Draft Article";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[300px] max-h-[90vh] overflow-y-auto p-0 border-none bg-background/80 backdrop-blur-2xl">
        <div className="relative">
          {/* Header Image Gallery */}
          {news.imageUrls && news.imageUrls.length > 0 && (
            <div
              className={`grid gap-2 p-2 ${
                news.imageUrls.length === 1
                  ? "grid-cols-1"
                  : news.imageUrls.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 md:grid-cols-3"
              }`}
            >
              {news.imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-2xl overflow-hidden bg-muted ${
                    idx === 0 && news.imageUrls.length >= 3
                      ? "md:col-span-2 md:row-span-2"
                      : ""
                  }`}
                >
                  <img
                    src={url}
                    alt={`Image ${idx + 1}`}
                    className="w-full h-full object-cover min-h-[250px] max-h-[500px]"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Content Wrapper */}
          <div className="p-8 md:p-12 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-widest text-primary">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {dateStr}
                </div>
                {!news.published && (
                  <Badge
                    variant="outline"
                    className="text-yellow-500 border-yellow-500/20 bg-yellow-500/5"
                  >
                    Draft Announcement
                  </Badge>
                )}
                {news.updatedAt && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Updated {new Date(news.updatedAt).toLocaleTimeString()}
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                {news.title}
              </h1>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl leading-relaxed text-muted-foreground whitespace-pre-line">
                {news.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
