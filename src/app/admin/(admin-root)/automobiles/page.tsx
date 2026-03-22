"use client";

import AdminCategorySection from "@/components/sections/automobiles/AdminCategorySection";
import AdminVehicleSection from "@/components/sections/automobiles/AdminVehicleSection";
import { motion } from "motion/react";

export default function AutomobilesAdminPage() {
  return (
    <div className="flex flex-col space-y-10 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1.5">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-black uppercase tracking-[0.4em] text-primary"
          >
            Inventory Management
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            Fleet & <span className="text-primary italic">Category</span> Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            Organize your vehicle categories and manage the individual vehicles
            within your fleet.
          </motion.p>
        </div>
      </div>

      <AdminCategorySection />

      <AdminVehicleSection />
    </div>
  );
}
