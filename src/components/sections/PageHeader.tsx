import Image from "next/image";

export const PageHeader = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => (
  <section
    className="relative h-[40vh] flex items-center justify-start text-center px-32 overflow-hidden"
    aria-label="Page header"
  >
    <Image
      src={image}
      alt={`${title} cover`}
      fill
      className="object-cover absolute inset-0 -z-10"
    />
    {/* <div className="absolute mx-4 inset-0 bg-black/40 dark:bg-black/50" /> */}
    <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
      {title}
    </h1>
  </section>
);
