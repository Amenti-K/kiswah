import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Edit, Trash2, Factory } from "lucide-react";
import type { FacilityResource } from "@/lib/types/resources.types";
import {
  createFacilityResource,
  updateFacilityResource,
  deleteFacilityResource,
} from "@/apis/resources.api";
import { Input } from "./ui/input";

const FacilityResource = ({
  data,
}: {
  data: { facilities: FacilityResource[] };
}) => {
  const queryClient = useQueryClient();
  const [showFacilityForm, setShowFacilityForm] = useState(false);
  const [editingFacility, setEditingFacility] =
    useState<FacilityResource | null>(null);
  const [facilityForm, setFacilityForm] = useState<FacilityResource>({
    name: "",
    size: "",
    description: "",
    capabilities: [],
  });

  const createFacility = useMutation({
    mutationFn: (data: FacilityResource) => createFacilityResource(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminResources"] });
      setShowFacilityForm(false);
      setFacilityForm({
        name: "",
        size: "",
        description: "",
        capabilities: [],
      });
    },
  });

  const updateFacility = useMutation({
    mutationFn: ({ id, ...rest }: FacilityResource) =>
      updateFacilityResource(id!, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminResources"] });
      setShowFacilityForm(false);
      setEditingFacility(null);
      setFacilityForm({
        name: "",
        size: "",
        description: "",
        capabilities: [],
      });
    },
  });

  const deleteFacility = useMutation({
    mutationFn: deleteFacilityResource,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminResources"] }),
  });

  // Capabilities input management
  const handleCapabilityChange = (idx: number, value: string) => {
    const newCaps = [...(facilityForm.capabilities || [])];
    newCaps[idx] = value;
    setFacilityForm({ ...facilityForm, capabilities: newCaps });
  };

  const addCapability = () => {
    setFacilityForm({
      ...facilityForm,
      capabilities: [...(facilityForm.capabilities || []), ""],
    });
  };

  const removeCapability = (idx: number) => {
    const newCaps = [...(facilityForm.capabilities || [])];
    newCaps.splice(idx, 1);
    setFacilityForm({ ...facilityForm, capabilities: newCaps });
  };

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Factory className="w-6 h-6 text-primary mr-2" />
          Facilities
        </h2>
        <Button
          onClick={() => {
            setShowFacilityForm(true);
            setEditingFacility(null);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Facility
        </Button>
      </div>
      {showFacilityForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              {editingFacility ? "Edit Facility" : "Add Facility"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingFacility) {
                  updateFacility.mutate({
                    ...facilityForm,
                    id: editingFacility.id,
                  });
                } else {
                  createFacility.mutate(facilityForm);
                }
              }}
              className="space-y-4"
            >
              <Input
                className="input"
                placeholder="Name"
                value={facilityForm.name}
                onChange={(e) =>
                  setFacilityForm({ ...facilityForm, name: e.target.value })
                }
                required
              />
              <Input
                className="input"
                placeholder="Size"
                value={facilityForm.size}
                onChange={(e) =>
                  setFacilityForm({ ...facilityForm, size: e.target.value })
                }
                required
              />
              <textarea
                className="input"
                placeholder="Description"
                value={facilityForm.description}
                onChange={(e) =>
                  setFacilityForm({
                    ...facilityForm,
                    description: e.target.value,
                  })
                }
                required
              />
              <div>
                <label className="block font-medium mb-1">Capabilities</label>
                {(facilityForm.capabilities || []).map((cap, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <Input
                      className="input flex-1"
                      placeholder={`Capability #${idx + 1}`}
                      value={cap}
                      onChange={(e) =>
                        handleCapabilityChange(idx, e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeCapability(idx)}
                      disabled={(facilityForm.capabilities || []).length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addCapability}
                >
                  Add Capability
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={
                    createFacility.isPending || updateFacility.isPending
                  }
                >
                  {editingFacility
                    ? updateFacility.isPending
                      ? "Updating..."
                      : "Update"
                    : createFacility.isPending
                    ? "Adding..."
                    : "Add"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowFacilityForm(false);
                    setEditingFacility(null);
                    setFacilityForm({
                      name: "",
                      size: "",
                      description: "",
                      capabilities: [],
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {data?.facilities.map((facility: FacilityResource) => (
          <Card key={facility.id || facility.name}>
            <CardHeader>
              <CardTitle>{facility.name}</CardTitle>
              <CardDescription className="font-semibold text-primary">
                {facility.size}
              </CardDescription>
              <CardDescription>{facility.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-3">Capabilities:</h4>
              <ul className="space-y-1">
                {facility?.capabilities?.length ? (
                  facility.capabilities.map((capability, idx) => (
                    <li
                      key={capability}
                      className="text-sm text-muted-foreground flex items-center"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {capability}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground">
                    No capabilities listed.
                  </li>
                )}
              </ul>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingFacility(facility);
                    setFacilityForm({
                      name: facility.name,
                      size: facility.size,
                      description: facility.description,
                      capabilities: facility.capabilities || [],
                      id: facility.id,
                    });
                    setShowFacilityForm(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    facility.id && deleteFacility.mutate(facility.id)
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

export default FacilityResource;
