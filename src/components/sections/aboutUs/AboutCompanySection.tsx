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
          Kiswah Trading & Logistics is a forward-thinking sourcing and supply
          chain solutions company based in Ethiopia, dedicated to connecting
          global markets with local business needs. We specialize in end-to-end
          import support — from product sourcing and supplier verification to
          freight coordination, customs handling, warehousing, and final
          delivery. Our mission is to make international trade simple,
          transparent, and secure for companies operating in Ethiopia and the
          wider East African region.
        </p>
        <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed">
          Kiswah was founded with a clear vision: to shield our clients’ trade
          from uncertainty, delays, and inefficiencies through structured
          processes, ethical operations, and a culture built on accountability
          and partnership. Whether supporting large industrial imports or
          fast-moving consumer goods, we stand as a reliable bridge between
          suppliers and buyers, backed by strong compliance standards and
          evolving market expertise.
        </p>
        <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed">
          As a new-generation logistics partner, we combine global reach with
          local market intelligence, helping businesses access quality products,
          reduce procurement risks, and optimize their supply chain costs. We
          work with trusted manufacturers and logistics networks across Asia,
          the Middle East, Europe, and Africa — enabling our partners to focus
          on growth while we handle the complexity of cross-border trade.
        </p>
        <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed">
          In a rapidly expanding Ethiopian economy — where demand for imported
          goods, raw materials, and industrial inputs continues to grow — Kiswah
          is positioned not just as a service provider, but as a strategic ally
          for companies looking to scale with confidence. We are committed to
          redefining how sourcing and logistics operate in Ethiopia: modern,
          data-driven, and built on trust.
        </p>
      </div>
    </div>
    <div className="flex justify-start w-full md:w-1/2 items-end">
      <div className="relative h-[500px] w-full md:w-[450px] rounded-lg overflow-hidden shadow-lg">
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
