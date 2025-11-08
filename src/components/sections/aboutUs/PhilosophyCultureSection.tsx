"use client";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

export const PhilosophyCultureSection = () => (
  <section className="py-12 md:py-16 container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* LEFT SIDE — Shield Image */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <Image
            src="https://images.unsplash.com/photo-1670874457182-862dfede5362?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1094"
            alt="Security Shield"
            fill
            className="object-cover drop-shadow-lg"
          />
        </div>
      </motion.div>

      {/* RIGHT SIDE — Culture + Button */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Corporate Culture — S.H.I.E.L.D
          </h2>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li>
              <strong>S</strong>ecurity – We protect our clients’ trade through
              ethical sourcing, reliable logistics, and full compliance.
            </li>
            <li>
              <strong>H</strong>onesty – We operate with transparency,
              integrity, and truth in every deal and delivery.
            </li>
            <li>
              <strong>I</strong>nnovation – We continuously improve through
              smarter systems and modernized trade strategies.
            </li>
            <li>
              <strong>E</strong>xcellence – We deliver consistent, high-quality
              performance every time.
            </li>
            <li>
              <strong>L</strong>oyalty – We build long-term partnerships, not
              transactions.
            </li>
            <li>
              <strong>D</strong>ependability – We are a partner you can count on
              — in every shipment, every challenge.
            </li>
          </ul>
        </div>

        {/* Company Profile Button */}
        <div className="pt-4">
          <Link
            href="/KiswahTradingCompanyProfile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-95 transition"
          >
            Company Profile
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);
