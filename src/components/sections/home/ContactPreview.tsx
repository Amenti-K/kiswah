"use client";

import { Mail, Phone, MapPin, Globe, Clock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useAppSelector } from "@/redux/hooks";
import { ContactCard } from "../contact/ContactCard";

export const ContactPreview = () => {
  const { data } = useAppSelector((state) => state.bootstrap);
  const companyInfo = data?.company;

  const contactDetails = [
    {
      icon: MapPin,
      title: "Our Offices",
      items: companyInfo?.address || [],
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      items: companyInfo?.phones || [],
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      items: companyInfo?.emails || [],
      color: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 w-[300px] h-[300px] bg-golden/5 rounded-full blur-[100px] opacity-30" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                Get in <span className="text-gradient-golden">Touch</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you have questions about our global sourcing, logistics
                network, or specific import/export needs, our team is here to
                provide expert guidance.
              </p>
            </div>

            <div className="grid gap-8">
              {contactDetails.map((detail, idx) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl ${detail.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm`}
                  >
                    <detail.icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {detail.title}
                    </h3>
                    <div className="space-y-1">
                      {detail.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                          <p className="text-muted-foreground leading-snug">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Benefits */}
            <div className="mt-12 flex flex-wrap gap-6 pt-8 border-t border-border/10">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Secure Trade</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Globe className="w-4 h-4 text-primary" />
                <span>Global Reach</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <ContactCard companyEmail={companyInfo?.emails[0]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
