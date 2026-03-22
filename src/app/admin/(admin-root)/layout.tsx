"use client";

import React, { useEffect } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion, AnimatePresence } from "motion/react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    const isLoginPage = pathname?.includes("/signin");
    if (!accessToken && !isLoginPage) {
      router.replace("/admin/signin");
    }
  }, [accessToken, router, pathname]);

  if (!accessToken && !pathname?.includes("/signin")) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-white/5 glass shadow-md">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-primary hover:bg-primary/10 transition-colors" />
            <Separator
              orientation="vertical"
              className="mr-4 h-6 bg-primary/100"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {pathname
                  ?.split("/")
                  .filter(Boolean)
                  .map((segment, index, array) => {
                    const isLast = index === array.length - 1;
                    const href = `/${array.slice(0, index + 1).join("/")}`;
                    const title =
                      segment.charAt(0).toUpperCase() +
                      segment.slice(1).replace(/-/g, " ");

                    return (
                      <React.Fragment key={href}>
                        <BreadcrumbItem className="hidden md:block">
                          {isLast ? (
                            <BreadcrumbPage className="text-primary font-semibold">
                              {title}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href={href}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {title}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && (
                          <BreadcrumbSeparator className="hidden md:block text-muted-foreground/50" />
                        )}
                      </React.Fragment>
                    );
                  })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              System Live
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
