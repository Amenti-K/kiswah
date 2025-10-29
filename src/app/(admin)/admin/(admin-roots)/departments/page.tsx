"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/apis/departments.api";
import { DepartmentAdmin } from "@/lib/types";

const AdminDepartments = () => {
  const queryClient = useQueryClient();

  // Fetch departments
  const {
    isPending,
    error,
    data: departments,
  } = useQuery<DepartmentAdmin[]>({
    queryKey: ["departments"],
    queryFn: getAdminDepartments,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["departments"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateDepartment(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["departments"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["departments"] }),
  });

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<DepartmentAdmin | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    responsibilities: [""],
  });

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Remove empty responsibilities
    const responsibilities = formData.responsibilities
      .map((r) => r.trim())
      .filter((r) => r);

    const payload = {
      name: formData.name,
      description: formData.description,
      responsibilities,
    };

    if (editingDepartment) {
      updateMutation.mutate(
        { id: editingDepartment.id.toString(), data: payload },
        {
          onSuccess: () => {
            setShowForm(false);
            setEditingDepartment(null);
            setFormData({ name: "", description: "", responsibilities: [""] });
          },
          onError: (err: any) =>
            setFormError(err?.response?.data?.message || "Update failed."),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setShowForm(false);
          setFormData({ name: "", description: "", responsibilities: [""] });
        },
        onError: (err: any) =>
          setFormError(err?.response?.data?.message || "Creation failed."),
      });
    }
  };

  const handleEdit = (dept: DepartmentAdmin) => {
    setEditingDepartment(dept);
    setFormData({
      name: dept.name || "",
      description: dept.description || "",
      responsibilities:
        dept.Responsibilities && dept.Responsibilities.length > 0
          ? dept.Responsibilities.map((r) => r.text)
          : [""],
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id.toString());
  };

  // UI
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Departments</h1>
          <p className="text-muted-foreground">
            Create, update, and delete departments and their responsibilities
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingDepartment(null);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Loading/Error/Empty States */}
      {isPending && <div>Loading departments...</div>}
      {error && <div className="text-red-500">Failed to load departments.</div>}

      {/* Form Modal */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingDepartment ? "Edit Department" : "Add New Department"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Department Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Responsibilities</Label>
                {formData.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <Input
                      value={resp}
                      onChange={(e) => {
                        const newResps = [...formData.responsibilities];
                        newResps[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          responsibilities: newResps,
                        });
                      }}
                      placeholder={`Responsibility #${idx + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          responsibilities: formData.responsibilities.filter(
                            (_, i) => i !== idx
                          ),
                        });
                      }}
                      disabled={formData.responsibilities.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      responsibilities: [...formData.responsibilities, ""],
                    })
                  }
                >
                  Add Responsibility
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {editingDepartment
                    ? updateMutation.isPending
                      ? "Updating..."
                      : "Update Department"
                    : createMutation.isPending
                    ? "Adding..."
                    : "Add Department"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingDepartment(null);
                    setFormData({
                      name: "",
                      description: "",
                      responsibilities: [""],
                    });
                    setFormError(null);
                  }}
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  Cancel
                </Button>
                {formError && (
                  <span className="text-red-500 text-sm ml-4">{formError}</span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Departments List */}
      {!isPending && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {departments && departments.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No departments found.
            </div>
          )}
          {departments &&
            departments.map((dept) => (
              <Card key={dept.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{dept.name}</CardTitle>
                      <CardDescription>{dept.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(dept)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(dept.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Responsibilities:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {dept.Responsibilities &&
                    dept.Responsibilities.length > 0 ? (
                      dept.Responsibilities.map((r, i) => (
                        <li key={i}>{r.text}</li>
                      ))
                    ) : (
                      <li>No responsibilities listed.</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminDepartments;
