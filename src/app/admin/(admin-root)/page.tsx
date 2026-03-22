"use client";

import { useAppSelector } from "@/redux/hooks";
import { motion } from "motion/react";
import {
  Briefcase,
  Users,
  Newspaper,
  Image as ImageIcon,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAnalytics } from "@/apis/company-info.api";
import { AnalyticsData } from "@/components/interface/analytics.interface";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const Dashboard = () => {
  const { admin } = useAppSelector((state) => state.adminAuth);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  const stats = [
    {
      title: "Services",
      count: analytics?.services.toString() || "0",
      icon: Briefcase,
      color: "text-blue-500",
      href: "/admin/services",
    },
    {
      title: "Team Members",
      count: analytics?.staff.toString() || "0",
      icon: Users,
      color: "text-purple-500",
      href: "/admin/staff",
    },
    {
      title: "News Articles",
      count: analytics?.news.toString() || "0",
      icon: Newspaper,
      color: "text-emerald-500",
      href: "/admin/news",
    },
    {
      title: "Gallery Photos",
      count: analytics?.gallery.toString() || "0",
      icon: ImageIcon,
      color: "text-orange-500",
      href: "/admin/gallery",
    },
  ];

  const quickActions = [
    { label: "New Service", icon: Plus, href: "/admin/services/" },
    { label: "Add Post", icon: Plus, href: "/admin/news/" },
    { label: "Add Team Member", icon: Plus, href: "/admin/staff/" },
  ];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      {/* Welcome Hero */}
      <motion.section
        variants={item}
        className="relative overflow-hidden rounded-3xl bg-card p-10 gold-glow border border-primary/10"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
              {getTimeGreeting()},{" "}
              <span className="text-primary">{admin?.name || "Admin"}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back to your dashboard. Here's what's happening with{" "}
              <span className="text-foreground font-semibold">KISWAH</span>{" "}
              today.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-background/50 backdrop-blur-md p-4 rounded-2xl border border-white/5">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="text-primary size-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                Local Time
              </p>
              <p className="text-xl font-mono text-foreground">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Link href={stat.href} key={index}>
            <Card className="group hover:border-primary/50 transition-all duration-300 glass-card cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-2xl bg-primary/5 group-hover:bg-primary/20 transition-colors`}
                  >
                    <stat.icon className="size-6 text-primary" />
                  </div>
                  <TrendingUp className="size-4 text-emerald-500 opacity-50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-foreground mt-1">
                    {stat.count}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>

      <div className="flex flex-row flex-wrap gap-8">
        {/* Quick Actions */}
        <motion.section variants={item} className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Quick Actions
          </h2>
          <div className="flex flex-row flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                className="h-16 justify-between px-6 rounded-2xl border-white/5 bg-card/50 hover:bg-primary hover:text-primary-foreground group transition-all duration-300"
              >
                <Link href={action.href}>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-white/20">
                      <action.icon className="size-5" />
                    </div>
                    <span className="font-semibold text-lg">
                      {action.label}
                    </span>
                  </div>
                  <ArrowRight className="size-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </Link>
              </Button>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Dashboard;
