import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  features: string[];
  image: string;
  link: string;
  reversed?: boolean;
}

export default function AutoCategory({
  title,
  description,
  features,
  image,
  link,
  reversed,
}: Props) {
  return (
    <section
      id="categories"
      className={`py-16 ${
        reversed ? "bg-section-even" : "bg-background"
      } transition-colors`}
    >
      <div
        className={`container mx-auto grid md:grid-cols-2 gap-10 items-center px-6 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-4">{title}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>
          <ul className="mb-6 grid grid-cols-2 gap-2 text-foreground">
            {features.map((f, i) => (
              <li key={i}>✅ {f}</li>
            ))}
          </ul>
          <Link
            href={link}
            className="inline-flex items-center px-5 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
}
