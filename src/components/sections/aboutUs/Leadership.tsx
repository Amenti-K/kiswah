"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useFetchTeams } from "@/apis/company.api";
import { Skeleton } from "@/components/ui/skeleton";

const Leadership = () => {
  const { data: teamsResponse, isLoading, isError } = useFetchTeams();
  const teams = teamsResponse?.data || [];

  const renderTeam = (title: string, staffList: any[]) => (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-12"
    >
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-bold text-foreground inline-block relative">
          {title}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-10 md:gap-12">
        {staffList
          .sort((a, b) => a.order - b.order)
          .map((member: any, i: number) => (
            <motion.div
              key={member.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[340px] group"
            >
              <div className="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl border border-border/40 bg-muted transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">
                <Image
                  src={member.imageUrl || "/placeholder-avatar.png"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Refined Overlay - Modern & Professional */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Info Area */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transition-all duration-500 group-hover:pb-10">
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black tracking-tight leading-none">
                        {member.name}
                    </h4>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-0.5 bg-primary/60 rounded-full group-hover:w-12 transition-all duration-500" />
                        <p className="text-primary font-bold text-sm tracking-widest uppercase">
                            {member.position}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.section>
  );

  if (isError) return null;

  return (
    <main className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-4"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-2 block">
            The Visionaries
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Our Leadership
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated professionals leading Kiswah Trading across global
            markets — driven by excellence and cross-border innovation.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-24">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-12">
                <Skeleton className="h-10 w-48 mx-auto" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-[400px] w-full rounded-3xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-32">
            {teams
              .sort((a, b) => a.order - b.order)
              .map((team) => (
                <div key={team.id}>{renderTeam(team.name, team.staffs)}</div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Leadership;
