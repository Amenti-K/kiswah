"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  useFetchCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/apis/automobiles.api";
import { IVehicleCategory } from "@/components/interface/vehicle.interface";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Layers } from "lucide-react";
import CategoryForm from "@/components/forms/Category.form";
import { CategoryType } from "@/components/schema/vehicle.schema";
import { objectToFormData } from "@/lib/formDataHelper";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function AdminCategorySection() {
  const { data, isPending: isFetching } = useFetchCategories();
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    IVehicleCategory | undefined
  >(undefined);

  const categories: IVehicleCategory[] = data?.data || [];

  const handleSubmit = (formData: CategoryType) => {
    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof CategoryType];
      if (value !== undefined && value !== null) {
        objectToFormData(dataToSend, key, value);
      }
    });

    if (editingCategory?.id) {
      dataToSend.append("id", editingCategory.id);
      updateCategory(dataToSend, {
        onSuccess: () => {
          setIsOpen(false);
          setEditingCategory(undefined);
        },
      });
    } else {
      createCategory(dataToSend, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    }
  };

  const handleEdit = (item: IVehicleCategory) => {
    setEditingCategory(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this category? All vehicles in it will be deleted!",
      )
    ) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md p-6 rounded-3xl border border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Vehicle Categories
            </h2>
            <p className="text-sm text-muted-foreground">
              Group your fleet by operational types
            </p>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-xl px-6"
              onClick={() => {
                setEditingCategory(undefined);
                setIsOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              defaultValues={editingCategory}
              onSubmit={handleSubmit}
              isPending={isCreating || isUpdating}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-video rounded-3xl bg-card/50 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-primary/10 rounded-3xl text-muted-foreground bg-card/20 backdrop-blur-sm">
          <Layers className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg">No categories found.</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div variants={item} key={category.id}>
              <div className="overflow-hidden group glass-card hover:border-primary/40 transition-all duration-300 rounded-3xl shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden bg-muted/20">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-2xl h-12 w-12 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white hover:text-black transition-all"
                        onClick={() => handleEdit(category)}
                      >
                        <Pencil className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="rounded-2xl h-12 w-12 bg-destructive/80 hover:bg-destructive transition-all"
                        onClick={() => handleDelete(category.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-none rounded-lg"
                      >
                        Order {category.order}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {category.description}
                    </p>

                    {category.characteristics &&
                      category.characteristics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {category.characteristics.map((char, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-[10px] bg-white/5 border-white/10 rounded-md font-normal"
                            >
                              {char}
                            </Badge>
                          ))}
                        </div>
                      )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-muted-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        <span>{category._count?.vehicles || 0} Vehicles</span>
                      </div>
                      <span className="opacity-40">{category.slug}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
