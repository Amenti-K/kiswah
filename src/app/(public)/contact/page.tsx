"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { companyInfoDefault } from "@/lib/data";
import { ContactCard } from "@/components/sections/contact/ContactCard";

const Contact = () => {
  const { data, status } = useAppSelector((state) => state.companyInfo);
  const companyInfo = status === "failed" ? companyInfoDefault : data;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <p className="text-muted-foreground mb-8">
              We’d love to hear from you! Whether you have a question about our
              services, pricing, or anything else, our team is ready to answer
              all your questions.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    {companyInfo?.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    {companyInfo?.contactPhone}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    {companyInfo?.contactEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactCard companyEmail={companyInfo?.contactEmail} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
