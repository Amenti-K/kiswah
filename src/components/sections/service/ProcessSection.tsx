"use client";

import {
  useFetchProcess,
  useCreateProcess,
  useUpdateProcess,
  useDeleteProcess,
} from "@/apis/service.api";
import { IProcess } from "@/components/interface/service.interface";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2, Settings2 } from "lucide-react";
import ProcessForm from "@/components/forms/Process.form";
import { ProcessType } from "@/components/schema/service.schema";
import { motion, AnimatePresence } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

export default function ProcessSection() {
  const { data, isLoading: isFetching } = useFetchProcess();
  const { mutate: createProcess, isPending: isCreating } = useCreateProcess();
  const { mutate: updateProcess, isPending: isUpdating } = useUpdateProcess();
  const { mutate: deleteProcess, isPending: isDeleting } = useDeleteProcess();

  const [isOpen, setIsOpen] = useState(false);
  const [editingProcess, setEditingProcess] = useState<IProcess | undefined>(
    undefined,
  );

  const processes: IProcess[] = data?.data || [];
  const sortedProcesses = [...processes].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );

  const handleSubmit = (data: ProcessType) => {
    if (editingProcess?.id) {
      updateProcess(
        { ...data, id: editingProcess.id as string },
        {
          onSuccess: () => {
            setIsOpen(false);
            setEditingProcess(undefined);
          },
        },
      );
    } else {
      createProcess(data, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    }
  };

  const handleEdit = (item: IProcess) => {
    setEditingProcess(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this process step?")) {
      deleteServiceStep(id);
    }
  };

  // NOTE: There was a typo in the original file, it should be deleteProcess
  const deleteServiceStep = (id: string) => {
    deleteProcess(id);
  };

  const handleCreate = () => {
    setEditingProcess(undefined);
    setIsOpen(true);
  };

  return (
    <section className="py-24 bg-card/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
            <div className="space-y-3">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-black uppercase tracking-[0.4em] text-primary"
              >
                Workflow Optimization
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold tracking-tight text-foreground"
              >
                Operational <span className="text-primary italic">Process</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-lg max-w-xl"
              >
                Refine the steps involved in delivering your services for
                maximum efficiency.
              </motion.p>
            </div>

            <Button
              onClick={handleCreate}
              className="h-12 px-8 rounded-2xl font-bold bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all gold-glow"
            >
              <Plus className="mr-2 h-5 w-5" /> Add Process Step
            </Button>
          </div>

          {/* Process Form Dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="min-w-[300px] md:min-w-[700px] h-[500px] bg-card border-white/10 glass-card p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-white/5 bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary rounded-xl gold-glow">
                    <Settings2 className="size-6 text-primary-foreground" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold">
                      {editingProcess ? "Modify Step" : "New Process Step"}
                    </DialogTitle>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">
                      Configure architectural flow
                    </p>
                  </div>
                </div>
              </DialogHeader>
              <div className="p-8 pt-2 overflow-y-scroll">
                <ProcessForm
                  defaultValues={editingProcess}
                  onSubmit={handleSubmit}
                  isPending={isCreating || isUpdating}
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* Process Steps List */}
          <div className="relative">
            {/* Connecting Line (Vertical) */}
            <div className="absolute left-[2.25rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/10 to-transparent hidden md:block" />

            <div className="space-y-8">
              {isFetching ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
                    Retrieving Sequence...
                  </p>
                </div>
              ) : (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-6"
                >
                  <AnimatePresence mode="popLayout">
                    {sortedProcesses.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 rounded-3xl border-2 border-dashed border-primary/5 bg-primary/2"
                      >
                        <p className="text-muted-foreground">
                          No process steps defined yet.
                        </p>
                      </motion.div>
                    ) : (
                      sortedProcesses.map((item, index) => (
                        <motion.div
                          key={item.id || index}
                          variants={itemVariants}
                          className="group relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-start p-6 sm:p-10 rounded-[2.5rem] bg-card/30 lg:bg-transparent lg:hover:bg-card/50 border border-primary/5 lg:border-transparent lg:hover:border-primary/10 transition-all duration-500 min-h-[160px] sm:min-h-0"
                        >
                          {/* Step Number Bubble */}
                          <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-card border-4 border-background flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                            <span className="text-2xl font-black text-gradient-golden">
                              {item.order}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 space-y-3">
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                              {item.description}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-all lg:translate-x-4 lg:group-hover:translate-x-0 w-full sm:w-auto justify-end sm:justify-start pt-4 sm:pt-0 border-t sm:border-t-0 border-primary/5 sm:border-none">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-11 w-11 rounded-xl hover:bg-primary/10 hover:text-primary transition-all bg-primary/5 lg:bg-transparent"
                              onClick={() => handleEdit(item)}
                            >
                              <Pencil className="h-5 w-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-11 w-11 rounded-xl text-destructive/60 hover:bg-destructive/10 hover:text-destructive transition-all bg-destructive/5 lg:bg-transparent"
                              onClick={() => item.id && handleDelete(item.id)}
                              disabled={isDeleting}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
