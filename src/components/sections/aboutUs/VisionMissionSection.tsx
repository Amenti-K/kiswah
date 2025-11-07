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
        "To simplify international trade for our clients by providing secure, transparent, and efficient procurement and logistics solutions — built on strong global partnerships, deep local expertise, and a commitment to protecting every transaction from risk, delay, and uncertainty.",
      icon: "Target",
    },
    {
      title: "Our Vision",
      description:
        "To become Ethiopia’s most trusted and innovation-driven sourcing and logistics partner — empowering businesses to trade confidently, access global markets, and grow without barriers.",
      icon: "Lightbulb",
    },
    // {
    //   title: "Our Values",
    //   description:
    //     "Customer focus, integrity in trade compliance, operational excellence, innovation, and long-term partnerships.",
    //   icon: "Heart",
    // },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
