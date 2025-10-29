"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { AdminSidebar } from "@/components/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/sign-in");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/admin/sign-in");
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-4 gap-8">
          {/* Mobile Drawer */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="w-5 h-5 mr-2" />
                  <SheetTitle className="p-4 border-b text-lg font-medium">
                    Admin Menu
                  </SheetTitle>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <AdminSidebar onLogout={handleLogout} />
              </SheetContent>
            </Sheet>
          </div>

          {/* AdminSidebar (desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <AdminSidebar onLogout={handleLogout} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
