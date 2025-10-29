import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Wrench } from "lucide-react";
import type { EquipmentResource } from "@/lib/types/resources.types";
import {
  createEquipmentResource,
  updateEquipmentResource,
  deleteEquipmentResource,
} from "@/apis/resources.api";

const EquipmentResource = ({
  data,
}: {
  data: { equipments: EquipmentResource[] };
}) => {
  const queryClient = useQueryClient();
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [editingEquipment, setEditingEquipment] =
    useState<EquipmentResource | null>(null);
  const [equipmentForm, setEquipmentForm] = useState<EquipmentResource>({
    name: "",
    id: undefined,
  });

  const createEquipment = useMutation({
    mutationFn: createEquipmentResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminResources"] });
      setShowEquipmentForm(false);
      setEquipmentForm({ name: "", id: undefined });
    },
  });

  const updateEquipment = useMutation({
    mutationFn: ({ id, ...rest }: EquipmentResource) =>
      updateEquipmentResource(id!, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminResources"] });
      setShowEquipmentForm(false);
      setEditingEquipment(null);
      setEquipmentForm({ name: "", id: undefined });
    },
  });

  const deleteEquipment = useMutation({
    mutationFn: deleteEquipmentResource,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminResources"] }),
  });

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Wrench className="w-6 h-6 text-primary mr-2" />
          Equipments
        </h2>
        <Button
          onClick={() => {
            setShowEquipmentForm(true);
            setEditingEquipment(null);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Equipment
        </Button>
      </div>
      {showEquipmentForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              {editingEquipment ? "Edit Equipment" : "Add Equipment"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingEquipment) {
                  updateEquipment.mutate({
                    ...equipmentForm,
                    id: editingEquipment.id,
                  });
                } else {
                  createEquipment.mutate(equipmentForm);
                }
              }}
              className="space-y-4"
            >
              <Input
                placeholder="Name"
                value={equipmentForm.name}
                onChange={(e) =>
                  setEquipmentForm({ ...equipmentForm, name: e.target.value })
                }
                required
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={
                    createEquipment.isPending || updateEquipment.isPending
                  }
                >
                  {editingEquipment
                    ? updateEquipment.isPending
                      ? "Updating..."
                      : "Update"
                    : createEquipment.isPending
                    ? "Adding..."
                    : "Add"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEquipmentForm(false);
                    setEditingEquipment(null);
                    setEquipmentForm({ name: "", id: undefined });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {data?.equipments.map((equipment: EquipmentResource) => (
          <Card key={equipment.id || equipment.name}>
            <CardHeader>
              <CardTitle>{equipment.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingEquipment(equipment);
                    setEquipmentForm({
                      name: equipment.name,
                      id: equipment.id,
                    });
                    setShowEquipmentForm(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    equipment.id && deleteEquipment.mutate(equipment.id)
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default EquipmentResource;
