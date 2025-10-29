"use client";
import { useEffect, useState } from "react";

const metrics = [
  { label: "Avg. Kilos", value: 5125 },
  { label: "Clients Worldwide", value: 5 },
  { label: "Locations", value: 2 },
  { label: "Satisfied Customers", value: 340 },
];

export const AchievementsSection = () => {
  const [counts, setCounts] = useState(metrics.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((c, i) =>
          c < metrics[i].value
            ? Math.min(metrics[i].value, c + Math.ceil(metrics[i].value / 120))
            : metrics[i].value
        )
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="p-4 rounded-md bg-card/60 border border-border"
            >
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {counts[i].toLocaleString()}
              </p>
              <p className="text-xs md:text-sm mt-2 uppercase tracking-wide text-muted-foreground">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
