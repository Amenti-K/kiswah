import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Award } from "lucide-react";
import type { CertificationResource } from "@/lib/types/resources.types";
import {
  createCertificationResource,
  updateCertificationResource,
  deleteCertificationResource,
} from "@/apis/resources.api";

const CertificationResource = ({
  data,
}: {
  data: { certifications: CertificationResource[] };
}) => {
  const queryClient = useQueryClient();
  const [showCertForm, setShowCertForm] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationResource | null>(
    null
  );
  const [certForm, setCertForm] = useState<CertificationResource>({
    name: "",
    id: undefined,
  });

  const createCert = useMutation({
    mutationFn: createCertificationResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminResources"] });
      setShowCertForm(false);
      setCertForm({ name: "", id: undefined });
    },
  });

  const updateCert = useMutation({
    mutationFn: ({ id, ...rest }: CertificationResource) =>
      updateCertificationResource(id!, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminResources"] });
      setShowCertForm(false);
      setEditingCert(null);
      setCertForm({ name: "", id: undefined });
    },
  });

  const deleteCert = useMutation({
    mutationFn: deleteCertificationResource,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminResources"] }),
  });

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Award className="w-6 h-6 text-primary mr-2" />
          Certifications & Standards
        </h2>
        <Button
          onClick={() => {
            setShowCertForm(true);
            setEditingCert(null);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Certification
        </Button>
      </div>
      {showCertForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              {editingCert ? "Edit Certification" : "Add Certification"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingCert) {
                  updateCert.mutate({
                    ...certForm,
                    id: editingCert.id,
                  });
                } else {
                  createCert.mutate(certForm);
                }
              }}
              className="space-y-4"
            >
              <Input
                placeholder="Certification Name"
                value={certForm.name}
                onChange={(e) =>
                  setCertForm({ ...certForm, name: e.target.value })
                }
                required
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createCert.isPending || updateCert.isPending}
                >
                  {editingCert
                    ? updateCert.isPending
                      ? "Updating..."
                      : "Update"
                    : createCert.isPending
                    ? "Adding..."
                    : "Add"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCertForm(false);
                    setEditingCert(null);
                    setCertForm({ name: "", id: undefined });
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
        {data?.certifications.map((cert: CertificationResource) => (
          <Card key={cert.id || cert.name}>
            <CardHeader>
              <CardTitle>{cert.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingCert(cert);
                    setCertForm({
                      name: cert.name,
                      id: cert.id,
                    });
                    setShowCertForm(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => cert.id && deleteCert.mutate(cert.id)}
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

export default CertificationResource;
