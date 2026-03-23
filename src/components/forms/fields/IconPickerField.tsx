"use client";
import * as LucideIcons from "lucide-react";
import { useState, useMemo } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
// ── Only these popular ones shown initially ──
const POPULAR_ICONS = [
  "Anchor",
  "BarChart",
  "Bell",
  "Building",
  "Box",
  "Boxes",
  "Check",
  "Clipboard",
  "CreditCard",
  "Download",
  "Edit",
  "Factory",
  "File",
  "FileCheck",
  "FileText",
  "Folder",
  "Globe",
  "Handshake",
  "Heart",
  "Home",
  "Image",
  "LayoutDashboard",
  "Mail",
  "MapPin",
  "Minus",
  "Music",
  "Package",
  "PackageSearch",
  "Phone",
  "PieChart",
  "Plus",
  "ReceiptText",
  "Settings",
  "Scale",
  "Shield",
  "Ship",
  "ShoppingCart",
  "Star",
  "Store",
  "Trash",
  "TrendingUp",
  "Truck",
  "Upload",
  "User",
  "Users",
  "Video",
  "X",
  "Zap",
] as const;

const allIconNames = Object.keys(LucideIcons).filter(
  (key) =>
    typeof LucideIcons[key as keyof typeof LucideIcons] === "function" &&
    key !== "Icon",
);
interface IconPickerFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  className?: string;
}
export default function IconPickerField({
  name,
  control,
  label,
  className,
}: IconPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredIcons = useMemo(() => {
    if (!search.trim()) return POPULAR_ICONS;
    return allIconNames
      .filter((n) => n.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 400); // safety limit
  }, [search]);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const SelectedIcon = value
          ? (LucideIcons[value as keyof typeof LucideIcons] as any)
          : null;
        return (
          <div className={cn("space-y-2", className)}>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTitle>
                {label && <Label className="w-full text-left">{label}</Label>}
              </DialogTitle>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full h-28 flex flex-col items-center justify-center gap-2 border-2 border-dashed hover:border-primary",
                    error && "border-destructive",
                  )}
                >
                  {SelectedIcon ? (
                    <>
                      <SelectedIcon className="h-10 w-10 text-primary" />
                      <span className="font-mono text-xs text-muted-foreground">
                        {value}
                      </span>
                    </>
                  ) : (
                    <>
                      <Search className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Select Icon
                      </span>
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl sm:max-w-3xl p-0">
                <div className="p-4 border-b">
                  <Input
                    placeholder="Search icons (e.g. home, user, zap)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <ScrollArea className="h-[420px] px-4 pb-4">
                  {!search && (
                    <p className="text-xs text-muted-foreground py-2 px-1">
                      Popular icons — type to see all
                    </p>
                  )}
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {filteredIcons.map((iconName) => {
                      const IconComp = LucideIcons[
                        iconName as keyof typeof LucideIcons
                      ] as any;
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => {
                            onChange(iconName);
                            setOpen(false);
                            setSearch("");
                          }}
                          className={cn(
                            "flex flex-col items-center gap-1 p-3 hover:bg-accent rounded-lg transition-colors",
                            value === iconName &&
                              "bg-primary/10 border-primary border",
                          )}
                        >
                          <IconComp className="h-6 w-6" />
                          <span className="text-[10px] font-mono text-muted-foreground truncate max-w-full text-center">
                            {iconName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            {error && (
              <p className="text-xs text-destructive">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
