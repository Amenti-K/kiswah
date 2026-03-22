import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function AutoIntro() {
  return (
    <section className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            About Our Division
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground leading-tight">
          Your Trusted Automobile <span className="text-gradient-golden">Import Partner</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Our automobile division specializes in sourcing, importing, and
          delivering quality vehicles and heavy machinery from trusted Chinese
          manufacturers to Ethiopian businesses and individuals. We handle every
          step, from purchase coordination to shipping and customs clearance.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 uppercase tracking-wider"
        >
          Get a Quote
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl group"
      >
        <Image
          src="https://images.unsplash.com/photo-1522674149721-b0191358dc5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=686"
          alt="Imported vehicles"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </section>
  );
}
