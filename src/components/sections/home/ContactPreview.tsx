"use client";

import { Mail, Phone, MapPin, Pin } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { companyInfoDefault } from "@/lib/data";
import { ContactCard } from "../contact/ContactCard";

export const ContactPreview = () => {
  // const { data, status } = useAppSelector((state) => state.companyInfo);
  // const companyInfo = status === "failed" ? companyInfoDefault : data;

  return (
    <section id="contact" className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            We&apos;d love to hear from you! Whether you have a question about
            our services, pricing, or anything else, our team is ready to answer
            all your questions.
          </p>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-12 h-12 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-muted-foreground">
                  {companyInfoDefault?.address.map((address, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Pin className="w-6 h-6 text-primary mt-1" />
                      <p>{address}</p>
                    </div>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-muted-foreground">
                  {companyInfoDefault?.contactPhone}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">
                  {companyInfoDefault?.contactEmail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactCard companyEmail={companyInfoDefault?.contactEmail} />
      </div>
    </section>
  );
};
