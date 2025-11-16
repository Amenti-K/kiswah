import Image from "next/image";
import Link from "next/link";

export const AboutPreview = () => (
  <section
    id="about"
    className="container mx-auto px-4 py-12 md:py-16"
    aria-labelledby="about-preview-heading"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Text column (left on md+) */}
      <div className="order-2 md:order-1">
        <h2
          id="about-preview-heading"
          className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
        >
          Kiswah Trading And Logistics
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
          Kiswah specializes in logistics, import/export and trade facilitation
          across East Africa. We design secure supply chain solutions, manage
          customs clearance, and connect local producers with global markets
          using reliable and scalable processes.
        </p>

        <ul className="space-y-2 mb-6 text-sm md:text-base text-foreground/70">
          <li>• End-to-end freight & customs management</li>
          <li>• International procurement & vendor coordination</li>
          <li>• Customs compliance, documentation & tracking</li>
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-95 transition"
          >
            Learn More
          </Link>
          <Link
            href="/contact"
            className="text-sm text-foreground/80 hover:text-primary"
          >
            Contact Sales →
          </Link>
        </div>
      </div>

      {/* Image column (right on md+) */}
      <div className="order-1 md:order-2 flex justify-center md:justify-end">
        <div className="relative w-full max-w-md h-64 md:h-[420px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naXN0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1200"
            alt="Kiswah Trading operations"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);
