import { Card, CardContent } from "@/components/ui/card";
import { companyInfoDefault } from "@/lib/data";
import { getIcon } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";

export const VisionMissionSection = () => {
  const { data, status } = useAppSelector((state) => state.companyInfo);
  const companyInfo = status === "failed" ? companyInfoDefault : data;

  const values: any[] = [
    {
      title: "Our Mission",
      description:
        "Deliver reliable import/export and logistics services that connect Ethiopian producers with global markets while ensuring customs compliance, safety, and timely delivery.",
      icon: "Target",
    },
    {
      title: "Our Vision",
      description:
        "Be the trusted logistics and trade partner in East Africa — known for efficient cross-border trade, transparent operations and sustainable supply chains.",
      icon: "Lightbulb",
    },
    {
      title: "Our Values",
      description:
        "Customer focus, integrity in trade compliance, operational excellence, innovation, and long-term partnerships.",
      icon: "Heart",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = getIcon(value.icon);
            return (
              <Card
                key={index}
                className="border-border hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <CardContent className="p-6 md:p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
