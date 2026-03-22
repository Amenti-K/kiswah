"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/utils";
import { PageHeader } from "@/components/sections/PageHeader";
import { useFetchProcess, useFetchServices } from "@/apis/service.api";
import { IService, IProcess } from "@/components/interface/service.interface";
import {
  ServiceSkeleton,
  ProcessSkeleton,
} from "@/components/sections/services/ServiceSkeleton";
import { motion } from "motion/react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const {
    data: servicesResponse,
    isLoading: isLoadingServices,
    isError: isErrorServices,
    refetch: refetchServices,
  } = useFetchServices();

  const {
    data: processResponse,
    isLoading: isLoadingProcess,
    isError: isErrorProcess,
    refetch: refetchProcess,
  } = useFetchProcess();

  const services = ((servicesResponse as any)?.data as IService[]) || [];
  const processes = ((processResponse as any)?.data as IProcess[]) || [];

  const handleRetry = () => {
    refetchServices();
    refetchProcess();
  };

  return (
    <div>
      <PageHeader
        title="Our Services"
        image="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
      />

      <section className="py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-golden/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              Expert Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
              Our Comprehensive{" "}
              <span className="text-gradient-golden">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              We provide end-to-end trading and logistics solutions tailored to
              your business needs, ensuring efficiency and growth in the global
              market.
            </p>
          </motion.div>

          {isLoadingServices ? (
            <ServiceSkeleton />
          ) : isErrorServices ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 glass-card rounded-2xl p-8 border-destructive/20">
              <AlertCircle className="w-16 h-16 text-destructive opacity-50" />
              <h3 className="text-2xl font-bold">Failed to load services</h3>
              <p className="text-muted-foreground">
                We encountered an error while fetching our services. Please try
                again.
              </p>
              <Button onClick={handleRetry} variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" /> Retry
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = getIcon(service.iconName);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="group relative h-full overflow-hidden p-2 border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-2xl border-2 hover:shadow-primary/5 hover:border-primary/50 transition-all duration-500 rounded-2xl">
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        </div>
                      </div>

                      <CardContent className="p-2 flex flex-col h-full space-y-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-golden/10 flex items-center justify-center group-hover:from-primary group-hover:to-golden transition-all duration-500 shadow-inner">
                            <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {/* <div className="pt-4 mt-auto">
                            <div className="h-1 w-12 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500" />
                        </div> */}
                      </CardContent>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-muted/20 relative overflow-hidden">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 space-y-4"
            >
              <span className="inline-block px-4 py-1.5 mb-2 text-xs font-bold tracking-widest uppercase rounded-full bg-golden/10 text-golden border border-golden/20">
                Efficiency First
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-foreground">
                Our Streamlined{" "}
                <span className="text-gradient-golden">Process</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We've perfected our logistics workflow to ensure transparency,
                security, and speed for every shipment.
              </p>
            </motion.div>

            {isLoadingProcess ? (
              <ProcessSkeleton />
            ) : isErrorProcess ? (
              <div className="text-center py-20 glass-card rounded-2xl border-destructive/20 max-w-md mx-auto">
                <p className="text-muted-foreground mb-6">
                  Could not load process steps.
                </p>
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Try again
                </Button>
              </div>
            ) : (
              <div className="relative">
                {/* Simplified Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/40 hidden md:block -translate-x-1/2" />

                <div className="space-y-12 md:space-y-16">
                  {processes
                    .sort((a, b) => Number(a.order) - Number(b.order))
                    .map((item, index) => {
                      const stepNumber = (index + 1)
                        .toString()
                        .padStart(2, "0");
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                        >
                          {/* Content Side */}
                          <div className="flex-1 w-full">
                            <div
                              className={`p-6 md:p-10 rounded-[2rem] bg-background border border-border/60 hover:border-primary/30 transition-all duration-500 group ${index % 2 === 0 ? "md:text-right md:mr-16" : "md:text-left md:ml-16"}`}
                            >
                              <span
                                className={`text-5xl md:text-6xl font-black text-muted/20 absolute -z-10 transition-colors group-hover:text-primary/10 ${index % 2 === 0 ? "right-10" : "left-10"}`}
                              >
                                {stepNumber}
                              </span>
                              <div
                                className={`w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/10 ${index % 2 === 0 ? "md:ml-auto" : ""}`}
                              >
                                <span className="text-sm font-bold text-primary">
                                  {stepNumber}
                                </span>
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-base text-muted-foreground leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* Center Dot - Simplified */}
                          <div className="relative z-10 flex-shrink-0 hidden md:block">
                            <div className="w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.1)] transition-transform group-hover:scale-125 duration-500" />
                          </div>

                          {/* Empty Side for Spacer */}
                          <div className="flex-1 hidden md:block" />

                          {/* Mobile Step Indicator - Simplified */}
                          <div className="md:hidden flex items-center gap-4 w-full px-6 opacity-30">
                            <div className="h-px flex-1 bg-border" />
                            <span className="font-bold text-xs uppercase tracking-widest">
                              {stepNumber}
                            </span>
                            <div className="h-px flex-1 bg-border" />
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
