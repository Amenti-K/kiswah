import { JSX } from "react";
import { Users, Factory, Wrench, Award } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type ResourceType = "personnel" | "facilities" | "equipment" | "certifications";

interface ResourceSectionProps {
  type: ResourceType;
  data: any[];
}

// Map meta info (title + icon) per type
const sectionMeta: Record<ResourceType, { title: string; icon: JSX.Element }> =
  {
    personnel: {
      title: "Personnel",
      icon: <Users className="w-8 h-8 text-primary mr-3" />,
    },
    facilities: {
      title: "Facilities",
      icon: <Factory className="w-8 h-8 text-primary mr-3" />,
    },
    equipment: {
      title: "Equipment & Tools",
      icon: <Wrench className="w-8 h-8 text-primary mr-3" />,
    },
    certifications: {
      title: "Certifications & Standards",
      icon: <Award className="w-8 h-8 text-primary mr-3" />,
    },
  };

export function ResourceSection({ type, data }: ResourceSectionProps) {
  const { title, icon } = sectionMeta[type];

  return (
    <section className="mb-16">
      {/* Section header */}
      <div className="flex items-center mb-8">
        {icon}
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      {/* Render based on type */}
      {type === "personnel" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((category: any) => (
            <Card key={category.category}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">
                  {category.count}
                </CardTitle>
                <CardDescription className="font-semibold">
                  {category.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {type === "facilities" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.map((facility: any) => (
            <Card key={facility.name}>
              <CardHeader>
                <CardTitle>{facility.name}</CardTitle>
                <CardDescription className="font-semibold text-primary">
                  {facility.size}
                </CardDescription>
                <CardDescription>{facility.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-3">Capabilities:</h4>
                <ul className="space-y-1">
                  {facility.capabilities?.map((capability: string) => (
                    <li
                      key={capability}
                      className="text-sm text-muted-foreground flex items-center"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {type === "equipment" && (
        <Card>
          <CardHeader>
            <CardTitle>Electromechanical Workshop Equipment</CardTitle>
            <CardDescription>
              State-of-the-art equipment for precision manufacturing and
              assembly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((item: any) => (
                <div key={item.name} className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {type === "certifications" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((cert: any) => (
            <Card key={cert.name} className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">{cert.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
