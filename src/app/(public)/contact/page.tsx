"use client";

import { Mail, Phone, MapPin, Send, Globe, Clock } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { ContactCard } from "@/components/sections/contact/ContactCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { motion } from "motion/react";

const Contact = () => {
  const { data } = useAppSelector((state) => state.bootstrap);
  const companyInfo = data?.company;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      <PageHeader
        title="Contact Us"
        image="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=60&w=1200"
      />

      <div className="container mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight">
            Let&apos;s Start a{" "}
            <span className="text-gradient-golden">Conversation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you have a specific inquiry or just want to explore how we
            can help your business grow, our team is ready to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white text-primary shadow-sm">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="space-y-3 pt-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Our Headquarters
                  </h3>
                  <div className="space-y-2">
                    {companyInfo?.address.map((address, index) => (
                      <p
                        key={index}
                        className="text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                        {address}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white text-primary shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-3 pt-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Phone Support
                  </h3>
                  <div className="space-y-2">
                    {companyInfo?.phones.map((phone, index) => (
                      <p
                        key={index}
                        className="text-muted-foreground font-medium hover:text-primary transition-colors cursor-pointer"
                      >
                        {phone}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white text-primary shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-3 pt-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Direct Email
                  </h3>
                  <div className="space-y-2">
                    {companyInfo?.emails.map((email, index) => (
                      <p
                        key={index}
                        className="text-muted-foreground font-medium hover:text-primary transition-colors cursor-pointer"
                      >
                        {email}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional info / Trust badges */}
            <motion.div
              variants={itemVariants}
              className="pt-10 border-t border-border flex flex-wrap gap-10"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary opacity-60" />
                <span className="text-sm font-bold text-foreground/70 uppercase tracking-widest">
                  Global Ops
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary opacity-60" />
                <span className="text-sm font-bold text-foreground/70 uppercase tracking-widest">
                  24/7 Support
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <ContactCard companyEmail={companyInfo?.emails[0]} />
            {/* Background design element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
