"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building,
  Users,
  Settings,
  Home,
  FolderOpen,
  Handshake,
  FolderTree,
  Briefcase,
  LogOut,
  Shield,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hooks";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen },
  { name: "Departments", href: "/admin/departments", icon: FolderTree },
  { name: "Resources", href: "/admin/resources", icon: Briefcase },
  { name: "Partners", href: "/admin/partners", icon: Handshake },
  { name: "Staff", href: "/admin/staff", icon: Users },
  { name: "Company Details", href: "/admin/company", icon: Settings },
];

export const AdminSidebar = ({ onLogout }: { onLogout: () => void }) => {
  const admin = useAppSelector((state) => state.auth.admin);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return <div className="h-12 bg-[var(--surface)] animate-pulse" />; // skeleton
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="w-5 h-5 mr-2" />
          Admin Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                asChild
                variant="ghost"
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
          {admin?.role === "SUPER" && (
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/sign-up">
                <Plus className="w-4 h-4 mr-2" />
                Register Admin
              </Link>
            </Button>
          )}
        </nav>

        {/* Admin Info + Logout */}
        {admin && (
          <div className="pt-6 border-t mt-6">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">
                {admin.firstName} {admin.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{admin.email}</p>
              <Badge
                variant={admin.role === "SUPER" ? "destructive" : "secondary"}
                className="mt-1 w-fit"
              >
                <Shield className="w-3 h-3 mr-1" />
                {admin.role} Admin
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 w-full justify-start text-red-500"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
