"use client";

import { INews } from "@/components/interface/news.interface";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar, Eye } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  news: INews;
  onView?: (news: INews) => void;
  onEdit?: (news: INews) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export default function NewsCard({
  news,
  onView,
  onEdit,
  onDelete,
  isDeleting = false,
}: NewsCardProps) {
  const { imageUrls, title, publishedAt, description } = news;
  const [expanded, setExpanded] = useState(false);

  const mainImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : null;
  const dateStr = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Draft";

  const shortDesc =
    description.length > 120
      ? description.substring(0, 120) + "..."
      : description;

  return (
    <div className="overflow-hidden group flex flex-col glass-card hover:border-primary/40 transition-all duration-300 rounded-[2rem] shadow-lg bg-card/30 backdrop-blur-md border border-primary/5 h-full">
      {/* Top Image Collage */}
      <div className="aspect-[16/9] relative bg-muted/20 overflow-hidden">
        {imageUrls && imageUrls.length > 0 ? (
          <div className={`grid h-full w-full gap-0.5 ${
            imageUrls.length === 1 ? "grid-cols-1" : 
            imageUrls.length === 2 ? "grid-cols-2" : 
            "grid-cols-3"
          }`}>
            {imageUrls.slice(0, 3).map((url, idx) => (
              <div key={idx} className="relative h-full w-full overflow-hidden">
                <img
                  src={url}
                  alt={`${title} ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {idx === 2 && imageUrls.length > 3 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="text-white font-black text-xl">+{imageUrls.length - 3}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground/40 bg-primary/5">
            <Eye className="h-12 w-12 opacity-20" />
          </div>
        )}

        <div className="absolute top-4 left-4 flex gap-2">
          {!news.published && (
            <Badge className="bg-yellow-500/80 text-white border-none backdrop-blur-md font-bold text-[9px] uppercase tracking-wider">
              Draft
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-6">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight flex-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-1 rounded-md">
            <Calendar className="h-3 w-3" />
            {dateStr}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between pt-5 border-t border-primary/5">
           <button 
             className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline transition-all"
             onClick={() => onView ? onView(news) : setExpanded(!expanded)}
           >
             Details
           </button>

           {(onEdit || onDelete) && (
              <div className="flex items-center gap-2">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all border border-primary/5"
                    onClick={() => onEdit(news)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all border border-destructive/5"
                    onClick={() => onDelete(news.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
