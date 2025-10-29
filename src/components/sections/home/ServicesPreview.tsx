import { Card, CardContent } from "@/components/ui/card";
import { servicesData } from "@/lib/data";
import { getIcon } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const ServicesPreview = () => {
  // Select top 2 most representative trading services
  const homeServiceData = servicesData.slice(0, 2);

  const handleServiceClick = (service: (typeof servicesData)[0]) => {
    // Optional: navigate or log service click here
  };

  return (
    <section
      id="services"
      className="container mx-auto px-4 py-16 bg-section-even text-foreground transition-colors"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Trading Services
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We specialize in global commodity trading, logistics, and supply chain
          solutions designed to help partners grow sustainably.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {homeServiceData.map((service, index) => {
          const Icon = getIcon(service.icon);
          return (
            <Card
              key={service.id}
              className="hover-lift animate-fade-in-up border-border cursor-pointer group bg-card/70 backdrop-blur-sm"
              style={{ animationDelay: `${index * 120}ms` }}
              onClick={() => handleServiceClick(service)}
            >
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[hsl(var(--golden))] to-[hsl(var(--golden-dark))] flex items-center justify-center shadow-md">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
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

      <div className="flex justify-center mt-10">
        <Link
          href="/services"
          className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
        >
          View All Services →
        </Link>
      </div>
    </section>
  );
};
