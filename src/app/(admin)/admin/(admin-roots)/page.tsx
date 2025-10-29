"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings, Plus } from "lucide-react";
import { getCompanyStats } from "@/apis/stats.api";
import { iconForLabel } from "@/lib/utils";

const Dashboard = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["stats"],
    queryFn: getCompanyStats,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading stats.</div>;
  }
  const stats = data || [];
  const quickActions = [
    {
      title: "Add New Project",
      description: "Create a new project entry",
      href: "/admin/projects/new",
      icon: Plus,
    },
    {
      title: "Manage Staff",
      description: "Update staff profiles and information",
      href: "/admin/staff",
      icon: Users,
    },
    {
      title: "Company Settings",
      description: "Edit company details and information",
      href: "/admin/company",
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your company profile, projects, and staff information.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: { label: string; value: string }) => {
          const Icon = iconForLabel(stat.label);
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.title}>
                <CardHeader>
                  <Icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={action.href}>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Recent activity will be displayed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
