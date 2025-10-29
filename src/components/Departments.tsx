"use client";
import { getPublicDepartments } from "@/apis/departments.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Department } from "@/lib/types";
import { iconForLabel } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Building, Zap, Cog } from "lucide-react";

const Departments = () => {
  const {
    isPending,
    error,
    data: departments,
  } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: getPublicDepartments,
  });

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading departments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Error loading departments</div>
      </div>
    );
  }

  if (!departments || departments.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">No departments available.</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Departments</h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Our specialized departments work together to deliver comprehensive
          solutions across construction, electrical, and manufacturing sectors.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const Icon = iconForLabel(dept.name) || Building;
            return (
              <Card key={dept.name} className="h-full">
                <CardHeader className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle>{dept.name}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Services:</h4>
                  <ul className="space-y-2">
                    {dept.responsibilities.map((service) => (
                      <li
                        key={service}
                        className="text-sm text-muted-foreground flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Departments;
