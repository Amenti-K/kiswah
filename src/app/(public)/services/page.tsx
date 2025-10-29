"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { servicesData } from "@/lib/data";
import ServiceModal from "@/components/sections/service/SeriviceModal";
import { PageHeader } from "@/components/sections/PageHeader";

// export const metadata = {
//   title: "Services",
//   description:
//     "Explore the services we provide — from design to development and deployment.",
// };

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<
    (typeof servicesData)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const process = [
    {
      step: "01",
      title: "Consultation",
      description: "We understand your needs and develop a customized solution",
    },
    {
      step: "02",
      title: "Planning",
      description: "Detailed logistics planning and documentation preparation",
    },
    {
      step: "03",
      title: "Execution",
      description:
        "Professional handling of all trading and logistics operations",
    },
    {
      step: "04",
      title: "Tracking",
      description: "Real-time monitoring and updates throughout the process",
    },
    {
      step: "05",
      title: "Delivery",
      description: "Safe and timely delivery with complete documentation",
    },
  ];
  const handleServiceClick = (service: (typeof servicesData)[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Our Services"
        image="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
      />
      {/* <p className="text-xl text-white/90 leading-relaxed">
              Comprehensive trading and logistics solutions designed to power
              your global business growth
            </p> */}

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <span className="text-md text-[var(--color-muted-foreground)]">
            services
          </span>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Transportation Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <Card
                  key={service.id}
                  className="hover-lift animate-fade-in-up border-border cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleServiceClick(service)}
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[hsl(var(--golden))] to-[hsl(var(--golden-dark))] flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="pt-4">
                      <div className="flex items-center gap-2 text-[hsl(var(--golden))] font-semibold group-hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl font-bold">Our Process</h2>
              <p className="text-lg text-muted-foreground">
                A streamlined approach to delivering exceptional results
              </p>
            </div>
            <div className="space-y-8">
              {process.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 items-start animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl font-bold text-gradient-golden">
                    {item.step}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
}
