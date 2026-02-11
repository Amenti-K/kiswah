"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function AutoHero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1761993600321-757e086491c0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1330"
        alt="Automobiles background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-white max-w-2xl px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
          Invest in your future!
        </h1>
        <p className="text-3xl mb-6">
          Don’t let your money sit idle, import a car with us today!
        </p>
        {/* <p className="text-3xl mb-6"> Start your business journey today! </p> */}
        <Link
          href="#categories"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
        >
          Explore Our Vehicles
        </Link>
      </motion.div>
    </section>
  );
}
