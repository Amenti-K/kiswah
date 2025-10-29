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
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "@/apis/partner.api";
import type { Partner, PartnerType } from "@/lib/types/partner.types";

const PARTNER_TYPES: PartnerType[] = [
  "PARTNERSHIP",
  "WORKING_RELATIONSHIP",
  "VENTURE",
  "COLLABORATION",
  "SPONSORSHIP",
];

const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  PARTNERSHIP: "Partnership",
  WORKING_RELATIONSHIP: "Working Relationship",
  VENTURE: "Venture",
  COLLABORATION: "Collaboration",
  SPONSORSHIP: "Sponsorship",
};

const initialForm = {
  name: "",
  type: "PARTNERSHIP" as PartnerType,
  description: "",
  websiteUrl: "",
  contactEmail: "",
  contactPhone: "",
  address: "",
  startDate: "",
  endDate: "",
  logo: undefined as File | undefined,
};

const AdminPartners = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({ ...initialForm });
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch partners
  const {
    isPending,
    error,
    data: partnersByType,
  } = useQuery({
    queryKey: ["adminPartners"],
    queryFn: getAdminPartners,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { logo, startDate, endDate, ...rest } = data;

      return createPartner(
        {
          ...rest,
          startDate: startDate ? new Date(startDate).toISOString() : undefined,
          endDate: endDate ? new Date(endDate).toISOString() : undefined,
        },
        logo
      );
    },
    onSuccess: () => {
      setShowForm(false);
      setEditingPartner(null);
      setFormData({ ...initialForm });
      setFormError(null);
      queryClient.invalidateQueries({ queryKey: ["adminPartners"] });
    },
    onError: (err: any) => {
      setFormError(
        err?.response?.data?.message ||
          "Failed to create partner. Please try again."
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof formData }) => {
      const { logo, ...rest } = data;
      return updatePartner(id, rest, logo);
    },
    onSuccess: () => {
      setShowForm(false);
      setEditingPartner(null);
      setFormData({ ...initialForm });
      setFormError(null);
      queryClient.invalidateQueries({ queryKey: ["adminPartners"] });
    },
    onError: (err: any) => {
      setFormError(
        err?.response?.data?.message ||
          "Failed to update partner. Please try again."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePartner(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminPartners"] }),
  });

  // Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPartner) {
      updateMutation.mutate({
        id: editingPartner.id!,
        data: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      ...initialForm,
      ...partner,
      startDate: partner.startDate
        ? new Date(partner.startDate).toISOString().slice(0, 10) // "YYYY-MM-DD"
        : "",
      endDate: partner.endDate
        ? new Date(partner.endDate).toISOString().slice(0, 10)
        : "",
      logo: undefined,
    });
    setShowForm(true);
    setFormError(null);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  // UI
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Partners</h1>
          <p className="text-muted-foreground">
            Create, update, and delete partner entries
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Loading/Error/Empty States */}
      {isPending && <div>Loading partners...</div>}
      {error && <div className="text-red-500">Error loading partners.</div>}

      {/* Form Modal */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPartner ? "Edit Partner" : "Add New Partner"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Partner Name</Label>
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
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value as PartnerType })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PARTNER_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {PARTNER_TYPE_LABELS[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="websiteUrl">Website</Label>
                  <Input
                    id="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, websiteUrl: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, contactEmail: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      logo: e.target.files?.[0],
                    })
                  }
                />
                {editingPartner?.logo?.url && (
                  <div className="mt-2">
                    <img
                      src={editingPartner.logo.url}
                      alt="Current Logo"
                      className="h-12"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 items-center">
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {editingPartner
                    ? updateMutation.isPending
                      ? "Updating..."
                      : "Update Partner"
                    : createMutation.isPending
                    ? "Adding..."
                    : "Add Partner"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPartner(null);
                    setFormData({ ...initialForm });
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

      {/* Partners List */}
      {!isPending && !error && (
        <div className="space-y-8">
          {PARTNER_TYPES.map((type) => (
            <div key={type}>
              <h2 className="text-xl font-bold mb-2">
                {PARTNER_TYPE_LABELS[type]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partnersByType?.[type]?.length === 0 && (
                  <div className="col-span-full text-center text-muted-foreground py-8">
                    No partners found.
                  </div>
                )}
                {partnersByType?.[type]?.map((partner: Partner) => (
                  <Card key={partner.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{partner.name}</CardTitle>
                          <CardDescription>
                            {partner.websiteUrl}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(partner)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              partner.id && handleDelete(partner.id)
                            }
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-2">
                        {partner.logo?.url && (
                          <img
                            src={partner.logo.url}
                            alt="Logo"
                            className="h-10 w-10 object-contain rounded"
                          />
                        )}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">
                            {PARTNER_TYPE_LABELS[partner.type]}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {partner.description}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {partner.contactEmail && (
                          <div>
                            <strong>Email:</strong> {partner.contactEmail}
                          </div>
                        )}
                        {partner.contactPhone && (
                          <div>
                            <strong>Phone:</strong> {partner.contactPhone}
                          </div>
                        )}
                        {partner.address && (
                          <div>
                            <strong>Address:</strong> {partner.address}
                          </div>
                        )}
                        {partner.startDate && (
                          <div>
                            <strong>Start:</strong> {partner.startDate}
                          </div>
                        )}
                        {partner.endDate && (
                          <div>
                            <strong>End:</strong> {partner.endDate}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPartners;
