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
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminStaffs,
  createStaff,
  updateStaff,
  deleteStaff,
} from "@/apis/staff.api";
import { Staff } from "@/lib/types";

const AdminStaff = () => {
  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    data: staff,
  } = useQuery<Staff[]>({
    queryKey: ["staffs"],
    queryFn: getAdminStaffs,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createStaff,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staffs"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateStaff(id.toString(), data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staffs"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteStaff(id.toString()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staffs"] }),
  });

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    departmentId: "",
    bio: "",
  });

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const payload = {
      ...formData,
      departmentId: formData.departmentId
        ? Number(formData.departmentId)
        : undefined,
    };

    if (editingStaff) {
      updateMutation.mutate(
        { id: editingStaff.id, data: payload },
        {
          onSuccess: () => {
            setShowForm(false);
            setEditingStaff(null);
            setFormData({
              name: "",
              title: "",
              departmentId: "",
              bio: "",
            });
          },
          onError: (err: any) =>
            setFormError(err?.response?.data?.message || "Update failed."),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setShowForm(false);
          setFormData({
            name: "",
            title: "",
            departmentId: "",
            bio: "",
          });
        },
        onError: (err: any) =>
          setFormError(err?.response?.data?.message || "Creation failed."),
      });
    }
  };

  const handleEdit = (member: Staff) => {
    setEditingStaff(member);
    setFormData({
      name: member.name || "",
      title: member.title || "",
      departmentId: member.departmentId?.toString() || "",
      bio: member.bio || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Staff</h1>
          <p className="text-muted-foreground">
            Create, update, and manage staff profiles
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingStaff(null);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Loading/Error/Empty States */}
      {isPending && <div>Loading staff...</div>}
      {error && <div className="text-red-500">Failed to load staff.</div>}

      {/* Form Modal */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
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
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departmentId">Department ID</Label>
                  <Input
                    id="departmentId"
                    type="number"
                    value={formData.departmentId}
                    onChange={(e) =>
                      setFormData({ ...formData, departmentId: e.target.value })
                    }
                    placeholder="Department ID"
                  />
                </div>
                {/* <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div> */}
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Brief professional biography..."
                />
              </div>

              {/* <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div> */}

              <div className="flex gap-2 items-center">
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {editingStaff
                    ? updateMutation.isPending
                      ? "Updating..."
                      : "Update Staff Member"
                    : createMutation.isPending
                    ? "Adding..."
                    : "Add Staff Member"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingStaff(null);
                    setFormData({
                      name: "",
                      title: "",
                      departmentId: "",
                      bio: "",
                      // email: "",
                      // phone: "",
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

      {/* Staff List */}
      {!isPending && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {staff && staff.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No staff found.
            </div>
          )}
          {staff &&
            staff.map((member) => (
              <Card key={member.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.title}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(member.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        {member.department?.name || "No Department"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                    {/* <div className="text-sm space-y-1">
                      {member.email && (
                        <p>
                          <strong>Email:</strong> {member.email}
                        </p>
                      )}
                      {member.phone && (
                        <p>
                          <strong>Phone:</strong> {member.phone}
                        </p>
                      )}
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminStaff;
