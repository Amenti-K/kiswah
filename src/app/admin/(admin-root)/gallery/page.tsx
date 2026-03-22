"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Trash2,
  Edit2,
  FileText,
  ImageIcon,
  Loader2,
  Images,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useFetchGallery,
  useCreateGallery,
  useDeleteGallery,
  useFetchTools,
  useCreateTool,
  useUpdateTool,
  useDeleteTool,
} from "@/apis/gallery.api";
import { IGallery, ITool } from "@/components/interface/gallery.interface";
import GalleryForm from "@/components/forms/Gallery.form";
import ToolsForm from "@/components/forms/Tools.form";
import { GalleryFormType } from "@/components/schema/gallery.schema";
import { ToolsFormType } from "@/components/schema/tools.schema";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [isToolDialogOpen, setIsToolDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<ITool | undefined>(undefined);

  // Gallery Data
  const {
    data: galleryData,
    isLoading: isGalleryLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchGallery({ limit: 12 });

  const galleryList: IGallery[] =
    galleryData?.pages?.flatMap((page: any) => page.galleryImgs) || [];

  // Tools Data
  const { data: toolsFetchResponse, isLoading: isToolsLoading } =
    useFetchTools();
  const toolsList: ITool[] = toolsFetchResponse?.data || [];

  // Mutation Hooks
  const { mutate: createGallery, isPending: isUploadingGallery } =
    useCreateGallery();
  const { mutate: deleteGallery } = useDeleteGallery();

  const { mutate: createTool, isPending: isCreatingTool } = useCreateTool();
  const { mutate: updateTool, isPending: isUpdatingTool } = useUpdateTool();
  const { mutate: deleteTool } = useDeleteTool();

  // Handlers
  const handleGallerySubmit = (data: GalleryFormType) => {
    const formData = new FormData();
    data.images.forEach((img) => formData.append("images", img));

    createGallery(formData, {
      onSuccess: () => setIsGalleryDialogOpen(false),
    });
  };

  const handleToolSubmit = (data: ToolsFormType) => {
    const payload = {
      ...data,
      ...(editingTool ? { id: editingTool.id } : {}),
    };

    if (editingTool) {
      updateTool(payload, {
        onSuccess: () => {
          setIsToolDialogOpen(false);
          setEditingTool(undefined);
        },
      });
    } else {
      createTool(payload, {
        onSuccess: () => setIsToolDialogOpen(false),
      });
    }
  };

  const handleEditTool = (tool: ITool) => {
    setEditingTool(tool);
    setIsToolDialogOpen(true);
  };

  const handleDeleteGallery = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteGallery(id);
    }
  };

  const handleDeleteTool = (id: string) => {
    if (confirm("Are you sure you want to delete this tool/document?")) {
      deleteTool(id);
    }
  };

  return (
    <div className="flex flex-col space-y-10 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1.5">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-black uppercase tracking-[0.4em] text-primary"
          >
            Media & Resources
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            Gallery & <span className="text-primary italic">Tools</span>{" "}
            Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            Manage your visual assets and external documentation links in one
            place.
          </motion.p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center bg-card/30 backdrop-blur-md p-4 rounded-3xl border border-primary/10 gap-4">
          <TabsList className="bg-background/50 p-1 rounded-2xl border border-primary/5 h-12">
            <TabsTrigger
              value="gallery"
              className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all font-bold"
            >
              <ImageIcon className="mr-2 h-4 w-4" /> Gallery
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all font-bold"
            >
              <FileText className="mr-2 h-4 w-4" /> Tools & Files
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {activeTab === "gallery" ? (
                <Dialog
                  open={isGalleryDialogOpen}
                  onOpenChange={setIsGalleryDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="rounded-xl px-6 h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                      <Plus className="mr-2 h-5 w-5" /> Upload Images
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl glass-card-dialog border-primary/20 backdrop-blur-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Upload Gallery Images
                      </DialogTitle>
                    </DialogHeader>
                    <GalleryForm
                      onSubmit={handleGallerySubmit}
                      isPending={isUploadingGallery}
                    />
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog
                  open={isToolDialogOpen}
                  onOpenChange={(open) => {
                    setIsToolDialogOpen(open);
                    if (!open) setEditingTool(undefined);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button className="rounded-xl px-6 h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                      <Plus className="mr-2 h-5 w-5" /> Add Tool/File
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl glass-card-dialog border-primary/20 backdrop-blur-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        {editingTool
                          ? "Update Tool Link"
                          : "Compose New Tool Link"}
                      </DialogTitle>
                    </DialogHeader>
                    <ToolsForm
                      defaultValues={editingTool}
                      onSubmit={handleToolSubmit}
                      isPending={isCreatingTool || isUpdatingTool}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <TabsContent
          value="gallery"
          className="mt-0 focus-visible:outline-none"
        >
          {isGalleryLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-3xl bg-card/50 animate-pulse border border-white/5"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-12 focus-visible:outline-none">
              {galleryList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 text-center border-2 border-dashed border-primary/10 rounded-3xl text-muted-foreground bg-card/20 backdrop-blur-sm"
                >
                  <Images className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-xl font-medium">
                    No images in gallery yet.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {galleryList.map((img) => (
                    <motion.div key={img.id} variants={item}>
                      <div className="overflow-hidden group glass-card hover:border-primary/40 transition-all duration-300 rounded-3xl shadow-lg aspect-square relative">
                        <img
                          src={img.imageUrl}
                          alt="Gallery item"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-2xl h-12 w-12 bg-destructive/80 hover:bg-destructive transition-all"
                            onClick={() => handleDeleteGallery(img.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {hasNextPage && (
                <div className="flex justify-center pt-12 border-t border-primary/10">
                  <Button
                    variant="outline"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="rounded-2xl px-12 h-14 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all font-bold"
                  >
                    {isFetchingNextPage ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Load More Images"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tools" className="mt-0 focus-visible:outline-none">
          {isToolsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-3xl bg-primary/50 animate-pulse border border-white/5"
                />
              ))}
            </div>
          ) : (
            <div className="focus-visible:outline-none">
              {toolsList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 text-center border-2 border-dashed border-primary/10 rounded-3xl text-muted-foreground bg-card/20 backdrop-blur-sm"
                >
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-xl font-medium">
                    No tools or documents added yet.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {toolsList.map((tool) => (
                    <motion.div key={tool.id} variants={item}>
                      <div className="overflow-hidden group glass-card hover:border-primary/40 transition-all duration-300 rounded-3xl shadow-lg">
                        <CardContent className="p-6 h-full flex flex-col relative overflow-hidden">
                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px] z-10">
                            <Button
                              variant="secondary"
                              size="icon"
                              className="rounded-2xl h-12 w-12 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white hover:text-black transition-all"
                              onClick={() => handleEditTool(tool)}
                            >
                              <Edit2 className="h-5 w-5" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="rounded-2xl h-12 w-12 bg-destructive/80 hover:bg-destructive transition-all"
                              onClick={() => handleDeleteTool(tool.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>

                          <div className="flex justify-between items-start mb-6">
                            <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                              <FileText className="h-7 w-7" />
                            </div>
                            <Badge
                              variant="outline"
                              className="border-primary/20 bg-primary/5 text-primary rounded-lg font-black uppercase tracking-tighter text-[10px]"
                            >
                              {tool.type.replace(/([A-Z])/g, " $1").trim()}
                            </Badge>
                          </div>

                          <div className="space-y-3 flex-1">
                            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                              {tool.title}
                            </h3>
                            {tool.description && (
                              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                {tool.description}
                              </p>
                            )}
                          </div>

                          <div className="mt-8">
                            <Button
                              variant="outline"
                              className="w-full rounded-xl border-primary/20 hover:bg-primary/5 group/btn"
                              asChild
                            >
                              <a
                                href={tool.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                Access Resource
                                <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
