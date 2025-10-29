"use client";
import { useQuery } from "@tanstack/react-query";
import { getAdminResources } from "@/apis/resources.api";
import PersonnelResource from "@/components/PersonnelResource";
import FacilityResource from "@/components/FacilityResource";
import EquipmentResource from "@/components/EquipmentResource";
import CertificationResource from "@/components/CertificationResource";

export default function AdminResourcesClient() {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminResources"],
    queryFn: getAdminResources,
  });

  if (isPending) return <div>Loading resources...</div>;
  if (error)
    return <div className="text-red-500">Failed to load resources.</div>;
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <PersonnelResource personnel={data.personnel} />
      <FacilityResource data={{ facilities: data.facilities }} />
      <EquipmentResource data={{ equipments: data.equipments }} />
      <CertificationResource data={{ certifications: data.certifications }} />
    </div>
  );
}
