import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

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
      className={`py-24 ${
        reversed ? "bg-muted/30" : "bg-background"
      } relative overflow-hidden`}
    >
      <div
        className={`container mx-auto grid md:grid-cols-2 gap-16 items-center px-6 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: reversed ? 30 : -30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-xl group"
        >
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reversed ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-black mb-6 text-foreground">{title}</h3>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 group/item"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary transition-colors duration-300">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover/item:text-white transition-colors" />
                </div>
                <span className="font-medium text-foreground/80">{f}</span>
              </motion.div>
            ))}
          </div>

          <Link
            href={link}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:bg-primary hover:text-white transition-all font-bold group/btn shadow-lg"
          >
            Explore Options
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
