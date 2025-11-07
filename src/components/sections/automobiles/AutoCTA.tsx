import Link from "next/link";

export default function AutoCTA() {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Looking to import vehicles?
        </h2>
        <p className="text-gray-300 mb-6">
          Let’s help you find the perfect one for your business or personal use.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="px-6 py-3 bg-[hsl(var(--golden))] text-black rounded-md font-medium hover:opacity-90 transition"
          >
            Request a Quote
          </Link>
          <Link
            href="https://wa.me/2519xxxxxxx"
            className="px-6 py-3 bg-transparent border border-white rounded-md font-medium hover:bg-white hover:text-black transition"
          >
            Talk to Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
