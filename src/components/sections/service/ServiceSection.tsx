"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  useFetchServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/apis/service.api";
import { IService } from "@/components/interface/service.interface";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";
import ServiceForm from "@/components/forms/Service.form";
import { ServiceType } from "@/components/schema/service.schema";
import { motion, AnimatePresence } from "motion/react";

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

export default function ServiceSection() {
  const { data, isLoading: isFetching } = useFetchServices();
  const { mutate: createService, isPending: isCreating } = useCreateService();
  const { mutate: updateService, isPending: isUpdating } = useUpdateService();
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();

  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | undefined>(
    undefined,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const services: IService[] = data?.data || [];

  // const filteredServices = services.filter(
  //   (service) =>
  //     service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     service.description.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  const handleSubmit = (formData: ServiceType) => {
    const payload = {
      ...formData,
      ...(editingService?.id ? { id: editingService.id } : {}),
    };

    if (editingService?.id) {
      updateService(payload, {
        onSuccess: () => {
          setIsOpen(false);
          setEditingService(undefined);
        },
      });
    } else {
      createService(payload, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    }
  };

  const handleEdit = (item: IService) => {
    setEditingService(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
    }
  };

  const handleCreate = () => {
    setEditingService(undefined);
    setIsOpen(true);
  };

  return (
    <section className="py-2 bg-background/50">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-8 border-b border-primary/10">
          <div className="space-y-2">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-primary"
            >
              Management
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-black text-foreground"
            >
              Services{" "}
              <span className="text-primary/50 text-2xl font-light italic ml-2">
                Portfolio
              </span>
            </motion.h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* <div className="relative w-full sm:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input 
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-primary/10 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div> */}
            <Button
              onClick={handleCreate}
              size="lg"
              className="h-11 px-8 rounded-xl font-bold bg-primary text-primary-foreground gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto"
            >
              <Plus className="mr-2 h-5 w-5" /> Add New Service
            </Button>
          </div>
        </div>

        {/* Form Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {/* <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-white/10 glass-card"> */}
          <DialogContent className="min-w-[300px] md:min-w-[700px] h-[500px] p-0 overflow-hidden bg-card border-white/10 glass-card">
            <DialogHeader className="p-6 border-b border-white/5 bg-primary/5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center gold-glow">
                  <LucideIcons.Settings2 className="size-6 text-primary-foreground" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    {editingService ? "Modify Service" : "Register New Service"}
                  </DialogTitle>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-semibold mt-1">
                    {editingService
                      ? "Update existing information"
                      : "Define a new expertise area"}
                  </p>
                </div>
              </div>
            </DialogHeader>
            <div className="p-6 overflow-y-scroll">
              <ServiceForm
                defaultValues={editingService}
                onSubmit={handleSubmit}
                isPending={isCreating || isUpdating}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Content Section */}
        {isFetching ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl opacity-20 bg-primary rounded-full animate-pulse" />
              <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
            </div>
            <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase animate-pulse">
              Synchronizing Services...
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {services.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-primary/10 rounded-3xl bg-card/30 backdrop-blur-sm"
              >
                <div className="p-6 rounded-full bg-primary/5 mb-6">
                  <LucideIcons.Inbox className="size-16 text-primary/20" />
                </div>
                <p className="text-muted-foreground text-xl font-medium">
                  {searchQuery
                    ? "No matching services found"
                    : "No services registered in the system"}
                </p>
                <Button
                  variant="ghost"
                  onClick={handleCreate}
                  className="mt-4 text-primary font-bold hover:bg-primary/5 rounded-full px-8"
                >
                  {searchQuery ? "Clear Search" : "Create first entry"}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {services.map((service, index) => {
                  const IconComp = (LucideIcons[
                    service.iconName as keyof typeof LucideIcons
                  ] || LucideIcons.Briefcase) as any;

                  return (
                    <motion.div variants={item} key={service.id}>
                      <Card className="group relative h-full bg-card border-primary/5 hover:border-primary/40 transition-all duration-500 rounded-2xl overflow-hidden glass-card">
                        <CardContent className="flex flex-col h-full">
                          {/* Card Header: Icon & Actions */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-row gap-4">
                              <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                                <div className="relative p-4 bg-primary/10 text-primary border border-primary/20 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground shadow-2xl transition-all duration-500 gold-glow">
                                  <IconComp className="h-8 w-8" />
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2.5 py-1 bg-primary/5 rounded-lg border border-primary/10">
                                  Rank {service.order}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-1.5 translate-y-[-4px] translate-x-[4px]">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
                                onClick={() => handleEdit(service)}
                              >
                                <Pencil className="h-4.5 w-4.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-xl text-destructive/60 hover:bg-destructive/10 hover:text-destructive transition-all active:scale-90"
                                onClick={() => handleDelete(service.id)}
                                disabled={isDeleting}
                              >
                                {isDeleting ? (
                                  <Loader2 className="animate-spin size-4" />
                                ) : (
                                  <Trash2 className="h-4.5 w-4.5" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="space-y-4 flex-1">
                            <h3 className="text-2xl font-bold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                              {service.title}
                            </h3>

                            <p className="text-muted-foreground leading-relaxed line-clamp-4 text-sm font-medium">
                              {service.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
