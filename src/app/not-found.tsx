"use client";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-7xl font-bold text-primary mb-6">404</h1>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Page Not Found
        </h2>

        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent transition"
        >
          Go Back Home
        </Link>
      </main>
    </>
  );
}
