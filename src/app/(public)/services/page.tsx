import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/utils";
import { servicesData } from "@/lib/data";
import { PageHeader } from "@/components/sections/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Kiswah Trading",
  description:
    "Explore Kiswah Trading’s full range of import, export, and logistics services — designed to help your business move faster and grow globally.",
  keywords: [
    "Trading Services",
    "Logistics Services",
    "Import Services Ethiopia",
    "Export Solutions",
    "Freight Forwarding Ethiopia",
    "Customs Clearing",
  ],
  openGraph: {
    title: "Trading & Logistics Services — Kiswah Trading",
    description:
      "We provide professional import, export, and logistics services for businesses across Ethiopia and China.",
    url: "https://kiswahtradingandlogistics.com/services",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Kiswah services showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services — Kiswah Trading",
    description:
      "Kiswah offers trading and logistics services designed to simplify import, export, and freight operations for Ethiopian businesses.",
    images: ["/og-services.jpg"],
  },
};

export default function ServicesPage() {
  // const [selectedService, setSelectedService] = useState<
  //   (typeof servicesData)[0] | null
  // >(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const process = [
    {
      step: "01",
      title: "Requirement Assessment",
      description:
        "We begin by understanding your business needs — product type, specifications, budget, delivery timelines, and import conditions. This ensures clarity before any engagement starts.",
    },
    {
      step: "02",
      title: "Supplier & Product Sourcing",
      description:
        "Our team identifies qualified manufacturers and exporters from our global network, verifies product standards, and negotiates competitive pricing on your behalf.",
    },
    {
      step: "03",
      title: "Proposal & Approval",
      description:
        "We provide a complete sourcing proposal including cost breakdown, shipping options, delivery schedule, and risk assessment. No action is taken until the client approves.",
    },
    {
      step: "04",
      title: "Purchase & Quality Assurance",
      description:
        "Once confirmed, we manage procurement, inspect product quality, verify certifications, and ensure packaging meets export and Ethiopian customs requirements.",
    },
    {
      step: "05",
      title: "Freight & Customs Coordination",
      description:
        "We handle sea, air, or land shipping, prepare all documents, and coordinate customs clearance — ensuring full compliance with Ethiopian regulations and minimizing port delays.",
    },
    {
      step: "06",
      title: "Warehousing & Final Delivery",
      description:
        "Upon arrival, we manage storage, inventory handling, or direct delivery to your warehouse, factory, or distribution channel — depending on your supply chain needs.",
    },
    {
      step: "07",
      title: "Ongoing Support & Partnership Growth",
      description:
        "Our work does not end after delivery. We stay engaged to improve your sourcing cycle, negotiate better supplier terms, and plan your future import requirements.",
    },
  ];
  // const handleServiceClick = (service: (typeof servicesData)[0]) => {
  //   setSelectedService(service);
  //   setIsModalOpen(true);
  // };

  return (
    <div>
      <PageHeader
        title="Our Services"
        image="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
      />

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
                  className="hover-lift animate-fade-in-up border-border group p-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                  // onClick={() => handleServiceClick(service)}
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--golden))] to-[hsl(var(--golden-dark))] flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.shortDescription}
                    </p>
                    {/* <div className="pt-4">
                      <div className="flex items-center gap-2 text-[hsl(var(--golden))] font-semibold group-hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div> */}
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

      {/* <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      /> */}
    </div>
  );
}
