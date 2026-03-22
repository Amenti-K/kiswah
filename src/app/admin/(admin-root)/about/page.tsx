"use client";

import AdminCompanySection from "@/components/sections/aboutUs/AdminCompanySection";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export default function AdminAboutPage() {
  return (
    <div className="flex flex-col space-y-10 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1.5">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-black uppercase tracking-[0.4em] text-primary"
          >
            Organizational Identity
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            Company <span className="text-primary italic">Profile</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            Define your company's core values, mission, and global reach for
            public display.
          </motion.p>
        </div>
      </div>

      <AdminCompanySection />
    </div>
  );
}
