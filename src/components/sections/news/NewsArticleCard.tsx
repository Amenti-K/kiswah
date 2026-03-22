"use client";

import { INews } from "@/components/interface/news.interface";
import { motion } from "motion/react";
import { Calendar, ChevronRight, Pencil, Trash2, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NewsArticleCardProps {
  news: INews;
  onClick: (news: INews) => void;
  onEdit: (news: INews) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function NewsArticleCard({
  news,
  onClick,
  onEdit,
  onDelete,
  isDeleting,
}: NewsArticleCardProps) {
  const { imageUrls, title, publishedAt, description } = news;

  const dateStr = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Draft Article";

  const mainImage = imageUrls?.[0];
  const hasMultipleImages = imageUrls && imageUrls.length > 1;

  return (
    <div className="relative pl-8 pb-16 group">
      {/* Timeline Line & Dot */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/10 group-last:bg-transparent" />
      <div className="absolute left-[-4px] top-6 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/5 group-hover:scale-125 transition-transform" />

      <motion.div 
        className="flex flex-col gap-6 bg-card/40 border border-primary/5 rounded-[2.5rem] overflow-hidden hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
        onClick={() => onClick(news)}
      >
        {/* Top Image Collage */}
        <div className="w-full h-80 relative bg-muted/30 overflow-hidden">
          {imageUrls && imageUrls.length > 0 ? (
            <div className={`grid h-full w-full gap-1 ${
              imageUrls.length === 1 ? "grid-cols-1" : 
              imageUrls.length === 2 ? "grid-cols-2" : 
              "grid-cols-3"
            }`}>
              {imageUrls.slice(0, 3).map((url, idx) => (
                <div key={idx} className="relative h-full w-full overflow-hidden">
                  <img
                    src={url}
                    alt={`${title} - ${idx}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay for +X on the 3rd image */}
                  {idx === 2 && imageUrls.length > 3 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="text-white font-black text-2xl tracking-tighter">
                        +{imageUrls.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <LayoutGrid className="w-12 h-12 text-primary/10" />
            </div>
          )}

          {!news.published && (
            <Badge className="absolute top-6 left-6 bg-yellow-500/90 text-white backdrop-blur-md font-black uppercase tracking-widest text-[9px] py-1 px-3 border-none">
              Draft
            </Badge>
          )}
        </div>

        {/* Info Section */}
        <div className="px-8 pb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight tracking-tight flex-1">
              {title}
            </h2>
            <div className="flex items-center gap-2 text-primary/60 font-bold text-[10px] uppercase tracking-[0.25em] bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
              {dateStr}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed line-clamp-3 text-base">
            {description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-primary/5">
             <div className="group/link flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-primary/80 hover:text-primary transition-colors">
                Full Article <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
             </div>

             {/* Admin Controls */}
             <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
               <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-xl hover:bg-primary/10 hover:text-primary transition-all h-9 w-9 border border-primary/5"
                  onClick={() => onEdit(news)}
               >
                  <Pencil className="w-4 h-4" />
               </Button>
               <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all h-9 w-9 border border-destructive/5"
                  onClick={() => onDelete(news.id)}
                  disabled={isDeleting}
               >
                  <Trash2 className="w-4 h-4" />
               </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
