import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import type { PersonnelResource } from "@/lib/types/resources.types";
import {
  createPersonnelResource,
  updatePersonnelResource,
  deletePersonnelResource,
} from "@/apis/resources.api";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const PersonnelResource = ({
  personnel,
}: {
  personnel: PersonnelResource[];
}) => {
  const queryClient = useQueryClient();
  const [showPersonnelForm, setShowPersonnelForm] = useState(false);
  const [editingPersonnel, setEditingPersonnel] =
    useState<PersonnelResource | null>(null);
  const [personnelForm, setPersonnelForm] = useState<PersonnelResource>({
    category: "",
    count: 0,
    description: "",
  });

  const createPersonnel = useMutation({
    mutationFn: createPersonnelResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminResources"] });
      setShowPersonnelForm(false);
      setPersonnelForm({ category: "", count: 0, description: "" });
    },
  });

  const updatePersonnel = useMutation({
    mutationFn: ({ id, ...rest }: PersonnelResource) =>
      updatePersonnelResource(id!, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminResources"] });
      setShowPersonnelForm(false);
      setEditingPersonnel(null);
      setPersonnelForm({ category: "", count: 0, description: "" });
    },
  });

  const deletePersonnel = useMutation({
    mutationFn: deletePersonnelResource,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminResources"] }),
  });

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Users className="w-6 h-6 text-primary mr-2" />
          Personnel
        </h2>
        <Button
          onClick={() => {
            setShowPersonnelForm(true);
            setEditingPersonnel(null);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Personnel
        </Button>
      </div>
      {showPersonnelForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              {editingPersonnel ? "Edit Personnel" : "Add Personnel"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingPersonnel) {
                  updatePersonnel.mutate({
                    ...personnelForm,
                    id: editingPersonnel.id,
                  });
                } else {
                  createPersonnel.mutate(personnelForm);
                }
              }}
              className="flex flex-col space-y-4"
            >
              <div className="flex gap-2">
                <Input
                  // className="input"
                  placeholder="Category"
                  value={personnelForm.category}
                  onChange={(e) =>
                    setPersonnelForm({
                      ...personnelForm,
                      category: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  type="number"
                  placeholder="Count"
                  value={personnelForm.count}
                  onChange={(e) =>
                    setPersonnelForm({
                      ...personnelForm,
                      count: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <Textarea
                placeholder="Description"
                value={personnelForm.description}
                onChange={(e) =>
                  setPersonnelForm({
                    ...personnelForm,
                    description: e.target.value,
                  })
                }
                required
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={
                    createPersonnel.isPending || updatePersonnel.isPending
                  }
                >
                  {editingPersonnel
                    ? updatePersonnel.isPending
                      ? "Updating..."
                      : "Update"
                    : createPersonnel.isPending
                    ? "Adding..."
                    : "Add"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowPersonnelForm(false);
                    setEditingPersonnel(null);
                    setPersonnelForm({
                      category: "",
                      count: 0,
                      description: "",
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personnel?.map((p: PersonnelResource) => (
          <Card key={p.id || p.category}>
            <CardHeader>
              <CardTitle>{p.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">Count: {p.count}</div>
              <div className="mb-2">{p.description}</div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingPersonnel(p);
                    setPersonnelForm(p);
                    setShowPersonnelForm(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => p.id && deletePersonnel.mutate(p.id)}
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

export default PersonnelResource;
