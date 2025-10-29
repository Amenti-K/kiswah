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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/apis/projects.api";
import { Project } from "@/lib/types";

const AdminProjects = () => {
  const queryClient = useQueryClient();
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
    client: "",
    location: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch projects
  const {
    isPending,
    error,
    data: projects,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getAdminProjects,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      setShowForm(false);
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        status: "",
        client: "",
        location: "",
      });
      setFormError(null);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: any) => {
      setFormError(
        err?.response?.data?.message ||
          "Failed to create project. Please try again."
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateProject(id, data),
    onSuccess: () => {
      setShowForm(false);
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        status: "",
        client: "",
        location: "",
      });
      setFormError(null);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: any) => {
      setFormError(
        err?.response?.data?.message ||
          "Failed to update project. Please try again."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  // Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateMutation.mutate({
        id: editingProject.id,
        data: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      client: project.client,
      location: project.location,
    });
    setShowForm(true);
    setFormError(null);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // UI
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <p className="text-muted-foreground">
            Create, update, and delete project entries
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Loading/Error/Empty States */}
      {isPending && <div>Loading projects...</div>}
      {error && <div className="text-red-500">Error loading projects.</div>}

      {/* Form Modal */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProject ? "Edit Project" : "Add New Project"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CONSTRUCTION">Construction</SelectItem>
                      <SelectItem value="ELECTRICAL">Electrical</SelectItem>
                      <SelectItem value="MANUFACTURING">
                        Manufacturing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PLANNED">Planned</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="ON_HOLD">On Hold</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {editingProject
                    ? updateMutation.isPending
                      ? "Updating..."
                      : "Update Project"
                    : createMutation.isPending
                    ? "Adding..."
                    : "Add Project"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProject(null);
                    setFormData({
                      title: "",
                      description: "",
                      category: "",
                      status: "",
                      client: "",
                      location: "",
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
                  <span className="text-red-500 text-sm ml-2">{formError}</span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      {!isPending && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects && projects.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No projects found.
            </div>
          )}
          {projects &&
            projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.client}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(project.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">{project.category}</Badge>
                    <Badge
                      variant={
                        project.status === "Completed" ? "default" : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Location:</strong> {project.location}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
