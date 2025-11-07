import Image from "next/image";
import Link from "next/link";

export default function AutoIntro() {
  return (
    <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Your Trusted Automobile Import Partner
        </h2>
        <p className="text-muted-foreground mb-6">
          Our automobile division specializes in sourcing, importing, and
          delivering quality vehicles and heavy machinery from trusted Chinese
          manufacturers to Ethiopian businesses and individuals. We handle every
          step — from purchase coordination to shipping and customs clearance.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Get a Quote
        </Link>
      </div>

      <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522674149721-b0191358dc5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=686"
          alt="Imported vehicles"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
