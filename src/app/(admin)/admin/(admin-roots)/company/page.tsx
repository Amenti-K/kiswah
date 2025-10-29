"use client";
import { useState, useEffect } from "react";
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
import { useAppSelector } from "@/store/hooks";
import { editCompanyInfo } from "@/apis/admin-company.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CompanyInfoInterface } from "@/lib/types";
import CompanyInfoRender from "@/components/CompanyInfo";

const emptySocialLinks: Record<string, string> = {};

const Admin = () => {
  const { data: companyInfo } = useAppSelector((state) => state.companyInfo);

  const safeData: CompanyInfoInterface = {
    name: companyInfo?.name || "",
    tagline: companyInfo?.tagline || "",
    description: companyInfo?.description || "",
    founded: companyInfo?.founded || "",
    vision: companyInfo?.vision || "",
    mission: companyInfo?.mission || "",
    values: companyInfo?.values || "",
    employeeCount: companyInfo?.employeeCount ?? 0,
    contactEmail: companyInfo?.contactEmail || "",
    contactPhone: companyInfo?.contactPhone || "",
    address: companyInfo?.address || "",
    socialLinks: companyInfo?.socialLinks || emptySocialLinks,
  };

  const [formData, setFormData] = useState<CompanyInfoInterface>(safeData);
  const [isEditing, setIsEditing] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Social links editing
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>(
    safeData.socialLinks || {}
  );
  const [newSocialKey, setNewSocialKey] = useState("");
  const [newSocialValue, setNewSocialValue] = useState("");

  useEffect(() => {
    if (!isEditing) {
      setFormData(safeData);
      setSocialLinks(safeData.socialLinks || {});
      setLogoFile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyInfo, isEditing]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      data,
      logoFile,
    }: {
      data: CompanyInfoInterface;
      logoFile?: File;
    }) => {
      return editCompanyInfo(data, logoFile);
    },
    onSuccess: () => {
      setIsEditing(false);
      setFormError(null);
      setLogoFile(null);
      queryClient.invalidateQueries({ queryKey: ["companyInfo"] });
    },
    onError: (err: any) => {
      setFormError(err?.response?.data?.message || "Update failed.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    mutation.mutate({
      data: { ...formData, socialLinks },
      logoFile: logoFile || undefined,
    });
  };

  const handleCancel = () => {
    setFormData(safeData);
    setSocialLinks(safeData.socialLinks || {});
    setLogoFile(null);
    setIsEditing(false);
    setFormError(null);
  };

  // Social links handlers
  const handleSocialChange = (key: string, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [key]: value }));
  };
  const handleRemoveSocial = (key: string) => {
    setSocialLinks((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };
  const handleAddSocial = () => {
    if (newSocialKey && newSocialValue) {
      setSocialLinks((prev) => ({
        ...prev,
        [newSocialKey]: newSocialValue,
      }));
      setNewSocialKey("");
      setNewSocialValue("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Company Details</h1>
          <p className="text-muted-foreground">
            Manage your company information and contact details
          </p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Company Info</Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Update your company details that appear throughout the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Logo */}
              <div>
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                />
                {companyInfo?.logo && !logoFile && (
                  <div className="mt-2">
                    <img
                      src={companyInfo.logo}
                      alt="Current Logo"
                      className="h-12"
                    />
                  </div>
                )}
                {logoFile && (
                  <div className="mt-2">
                    <span className="text-xs text-muted-foreground">
                      Selected: {logoFile.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Company Name</Label>
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
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              {/* Vision, Mission, Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="vision">Vision</Label>
                  <Textarea
                    id="vision"
                    value={formData.vision || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, vision: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="mission">Mission</Label>
                  <Textarea
                    id="mission"
                    value={formData.mission || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, mission: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="values">Values</Label>
                  <Textarea
                    id="values"
                    value={formData.values || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, values: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contactEmail || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, contactEmail: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.contactPhone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="founded">Founded Year</Label>
                  <Input
                    id="founded"
                    value={formData.founded || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, founded: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input
                    id="employees"
                    type="number"
                    value={formData.employeeCount ?? 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employeeCount: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* Social Links */}
              <div>
                <Label>Social Links</Label>
                <div className="space-y-2 mt-2">
                  {Object.entries(socialLinks).map(([platform, url]) => (
                    <div key={platform} className="flex gap-2 items-center">
                      <Input
                        className="w-32"
                        value={platform}
                        disabled
                        readOnly
                      />
                      <Input
                        value={url}
                        onChange={(e) =>
                          handleSocialChange(platform, e.target.value)
                        }
                        placeholder="URL"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveSocial(platform)}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2 items-center">
                    <Input
                      className="w-32"
                      placeholder="Platform"
                      value={newSocialKey}
                      onChange={(e) => setNewSocialKey(e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={newSocialValue}
                      onChange={(e) => setNewSocialValue(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAddSocial}
                      disabled={!newSocialKey || !newSocialValue}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={mutation.isPending}
                >
                  Cancel
                </Button>
                {formError && (
                  <span className="text-red-500 text-sm ml-4">{formError}</span>
                )}
              </div>
            </form>
          ) : (
            <CompanyInfoRender formData={formData} companyInfo={companyInfo} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
