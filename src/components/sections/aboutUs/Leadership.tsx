import { Card, CardContent } from "@/components/ui/card";
import { aboutData } from "@/data/about";
import Image from "next/image";

const About = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Our Leadership</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the visionaries driving our mission forward
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {aboutData.leadership.map((manager, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in-up ${
                index % 2 === 0 ? "" : "lg:grid-flow-dense"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className={
                  index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2"
                }
              >
                <div className="aspect-square overflow-hidden rounded-lg shadow-lg bg-muted">
                  <Image
                    src={manager.image}
                    alt={manager.name}
                    className="w-full h-full object-cover hover-lift"
                  />
                </div>
              </div>

              <div
                className={
                  index % 2 === 0 ? "lg:col-start-2" : "lg:col-start-1"
                }
              >
                <Card className="border-border h-full">
                  <CardContent className="p-8 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-foreground">
                        {manager.name}
                      </h3>
                      <p className="text-[hsl(var(--golden))] font-semibold text-xl">
                        {manager.role}
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {manager.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
