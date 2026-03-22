import {
  LayoutDashboard,
  Briefcase,
  Newspaper,
  Image as ImageIcon,
  Info,
  Car,
  Users,
  LogOut,
  Shield,
  ChevronUp,
  User2,
  UserRoundPlus,
} from "lucide-react";
import { NavLink } from "@/components/layout/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { motion } from "motion/react";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "About", url: "/admin/about", icon: Info },
  { title: "Staff & Team", url: "/admin/staff", icon: Users },
  { title: "Services", url: "/admin/services", icon: Briefcase },
  { title: "Auto mobilies", url: "/admin/automobiles", icon: Car },
  { title: "News", url: "/admin/news", icon: Newspaper },
  { title: "Gallery & Tools", url: "/admin/gallery", icon: ImageIcon },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch();
  const { admin } = useAppSelector((state) => state.adminAuth);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border"
      {...props}
    >
      <SidebarHeader
        className={`bg-sidebar px-4 py-3 ${isCollapsed ? "px-2 py-3" : "glass"} shadow-md`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={false}
            animate={{ rotate: isCollapsed ? 360 : 0 }}
            className="flex h-10 w-10 shrink-1 items-center justify-center rounded-xl bg-primary text-primary-foreground gold-glow"
          >
            <Shield className="size-6" />
          </motion.div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-0.5 leading-none"
            >
              <span className="font-bold text-lg tracking-tight text-foreground">
                KISWAH
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary/80">
                Admin Panel
              </span>
            </motion.div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-11 transition-all duration-200"
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="flex w-full items-center gap-4 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold gold-glow shadow-lg"
                    >
                      <item.icon className="size-5 shrink-0" />
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="truncate"
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {admin?.isSuper && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Register Admin"
                    className="h-11 transition-all duration-200"
                  >
                    <NavLink
                      to="/admin/register"
                      end={true}
                      className="flex w-full items-center gap-4 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold gold-glow shadow-lg"
                    >
                      <UserRoundPlus className="size-5 shrink-0" />
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="truncate"
                        >
                          Register Admin
                        </motion.span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar/50 p-3 backdrop-blur-sm">
        {admin && (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="h-14 rounded-xl transition-all hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent"
                  >
                    <div className="flex flex-1 items-center gap-3 overflow-hidden text-left">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <User2 className="size-5" />
                      </div>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="grid flex-1 text-left text-sm leading-tight"
                        >
                          <span className="truncate font-semibold text-foreground">
                            {admin.name}
                          </span>
                          <span className="truncate text-[10px] text-muted-foreground uppercase tracking-widest">
                            {admin.phoneNumber}
                          </span>
                        </motion.div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronUp className="ml-auto size-4 text-muted-foreground" />
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-primary/20 bg-card p-2 shadow-2xl backdrop-blur-xl"
                >
                  <DropdownMenuItem
                    onClick={() => dispatch(logout())}
                    className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer gap-2 rounded-lg py-2.5"
                  >
                    <LogOut className="size-4" />
                    <span className="font-medium">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
