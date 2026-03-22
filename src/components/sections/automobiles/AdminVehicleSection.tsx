"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  useFetchVehicles,
  useCreateVehicle,
  useUpdateVehicle,
  useDeleteVehicle,
  useFetchCategories,
} from "@/apis/automobiles.api";
import { IVehicle } from "@/components/interface/vehicle.interface";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Car } from "lucide-react";
import VehicleForm from "@/components/forms/Vehicle.form";
import { VehicleType } from "@/components/schema/vehicle.schema";
import { objectToFormData } from "@/lib/formDataHelper";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

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

export default function AdminVehicleSection() {
  const { data: vehiclesData, isPending: isFetching } = useFetchVehicles();
  const { data: categoriesData } = useFetchCategories();

  const { mutate: createVehicle, isPending: isCreating } = useCreateVehicle();
  const { mutate: updateVehicle, isPending: isUpdating } = useUpdateVehicle();
  const { mutate: deleteVehicle, isPending: isDeleting } = useDeleteVehicle();

  const [isOpen, setIsOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<IVehicle | undefined>(
    undefined,
  );

  const vehicles: IVehicle[] = vehiclesData?.data || [];
  const categories = categoriesData?.data || [];

  const handleSubmit = (formData: VehicleType) => {
    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof VehicleType];
      if (value !== undefined && value !== null) {
        objectToFormData(dataToSend, key, value);
      }
    });

    if (editingVehicle?.id) {
      dataToSend.append("id", editingVehicle.id);
      updateVehicle(dataToSend, {
        onSuccess: () => {
          setIsOpen(false);
          setEditingVehicle(undefined);
        },
      });
    } else {
      createVehicle(dataToSend, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    }
  };

  const handleEdit = (item: IVehicle) => {
    setEditingVehicle(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      deleteVehicle(id);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md p-6 rounded-3xl border border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10">
            <Car className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Vehicles</h2>
            <p className="text-sm text-muted-foreground">
              Manage individual units in your inventory
            </p>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-xl px-6"
              disabled={categories.length === 0}
              onClick={() => {
                setEditingVehicle(undefined);
                setIsOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </DialogTitle>
            </DialogHeader>
            <VehicleForm
              categories={categories}
              defaultValues={editingVehicle}
              onSubmit={handleSubmit}
              isPending={isCreating || isUpdating}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-3xl bg-card/50 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : vehicles.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-primary/10 rounded-3xl text-muted-foreground bg-card/20 backdrop-blur-sm">
          <Car className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg">
            {categories.length === 0
              ? "Create a category first to add vehicles."
              : "No vehicles found."}
          </p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {vehicles.map((vehicle) => (
            <motion.div variants={item} key={vehicle.id}>
              <div className="overflow-hidden group glass-card hover:border-primary/40 transition-all duration-300 rounded-3xl shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] relative bg-muted/20 overflow-hidden">
                    <img
                      src={vehicle.imageUrls?.[0] || ""}
                      alt={vehicle.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-2xl h-12 w-12 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white hover:text-black transition-all"
                        onClick={() => handleEdit(vehicle)}
                      >
                        <Pencil className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="rounded-2xl h-12 w-12 bg-destructive/80 hover:bg-destructive transition-all"
                        onClick={() => handleDelete(vehicle.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg truncate mb-3 group-hover:text-primary transition-colors">
                      {vehicle.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-black uppercase tracking-tighter border-primary/20 bg-primary/5 text-primary rounded-lg"
                      >
                        {vehicle.category?.name || "Uncategorized"}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-medium bg-white/5 rounded-lg border-white/5"
                      >
                        Order {vehicle.order}
                      </Badge>
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
