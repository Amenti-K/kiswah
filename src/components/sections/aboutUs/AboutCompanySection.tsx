import Image from "next/image";

export const AboutCompanySection = () => (
  <section className="py-16 container mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
    <div className="w-full md:w-1/2">
      <span className="text-sm text-[var(--color-muted-foreground)]">
        about us
      </span>
      <h2 className="text-3xl font-bold text-primary mb-4">Kiswah Trading</h2>
      <div className="flex flex-col gap-y-4">
        <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed">
          Kiswah Trading PLC is a leading Ethiopian trading and logistics
          company specializing in import, export, and distribution of
          high-quality goods.
        </p>
        <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed">
          With a strong focus on reliability, customer satisfaction, and global
          standards, we bridge local markets with international opportunities.
        </p>
        <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed">
          Kiswah Trading PLC is a leading Ethiopian trading and logistics
          company specializing in import, export, and distribution of
          high-quality goods.
        </p>
        <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed">
          With a strong focus on reliability, customer satisfaction, and global
          standards, we bridge local markets with international opportunities.
        </p>
        <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed">
          Kiswah Trading PLC is a leading Ethiopian trading and logistics
          company specializing in import, export, and distribution of
          high-quality goods.
        </p>
        <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed">
          With a strong focus on reliability, customer satisfaction, and global
          standards, we bridge local markets with international opportunities.
        </p>
      </div>
    </div>
    <div className="flex justify-start w-full md:w-1/2 items-end">
      <div className="relative h-[500px] w-full md:w-[450px] overflow-hidden shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
          alt="Kiswah Trading operations"
          fill
          className="object-cover"
        />
      </div>
    </div>
  </section>
);
