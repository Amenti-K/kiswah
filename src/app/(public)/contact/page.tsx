// "use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { companyInfoDefault } from "@/lib/data";
import { ContactCard } from "@/components/sections/contact/ContactCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Kiswah Trading",
  description:
    "Explore Kiswah Trading’s full range of import, export, and logistics services — designed to help your business move faster and grow globally.",
  keywords: [
    "Trading Services",
    "Logistics Services",
    "Import Services Ethiopia",
    "Export Solutions",
    "Freight Forwarding Ethiopia",
    "Customs Clearing",
  ],
  openGraph: {
    title: "Trading & Logistics Services — Kiswah Trading",
    description:
      "We provide professional import, export, and logistics services for businesses across Ethiopia and China.",
    url: "https://kiswahtradingandlogistics.com/services",
    images: [
      {
        url: "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
        width: 1200,
        height: 630,
        alt: "Kiswah services showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services — Kiswah Trading",
    description:
      "Kiswah offers trading and logistics services designed to simplify import, export, and freight operations for Ethiopian businesses.",
    images: [
      "https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg",
    ],
  },
};

const Contact = () => {
  // const { data, status } = useAppSelector((state) => state.companyInfo);
  // const companyInfo = status === "failed" ? companyInfoDefault : data;

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
                    {companyInfoDefault?.address}
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
      </div>
    </div>
  );
};

export default Contact;
