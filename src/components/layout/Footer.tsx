"use client";

import { Mail, Phone, MapPin } from "lucide-react";
// import { companyInfoDefault } from "@/lib/data";
import SocialLinksList from "@/components/SocialLInks";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const links = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { data: bootstrapData } = useAppSelector((state) => state.bootstrap);
  const company = bootstrapData?.company;

  const socialLinksRecord = company?.socialLinks?.reduce(
    (acc, link) => {
      acc[link.platform] = link.url;
      return acc;
    },
    {} as Record<string, string>,
  );
  // ) || (companyInfoDefault.socialLinks as Record<string, string>);

  // const name = company?.companyName || companyInfoDefault.name;
  const name = company?.companyName;
  // const emails = company?.emails.length
  //   ? company.emails
  //   : [companyInfoDefault.contactEmail];
  const emails = company?.emails;
  // const phones = company?.phones.length
  //   ? company.phones
  //   : [companyInfoDefault.contactPhone];
  const phones = company?.phones;
  // const addresses = company?.address.length
  //   ? company.address
  //   : companyInfoDefault.address;
  const addresses = company?.address;

  return (
    <footer className="bg-background text-muted-foreground p-4 md:p-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">{name}</h2>
          <ul className="space-y-3 text-sm">
            {emails?.map((email, index) => (
              <li key={index} className="flex items-center gap-2">
                <Mail size={16} /> <span>{email}</span>
              </li>
            ))}
            {phones?.map((phone, index) => (
              <li key={index} className="flex items-center gap-2">
                <Phone size={16} /> <span>{phone}</span>
              </li>
            ))}
            {addresses?.map((address, index) => (
              <li key={index} className="flex items-start gap-2">
                <MapPin size={20} className="shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Quick Links
          </h2>
          <ul className="space-y-2 text-md">
            {links.map((link: { label: string; href: string }) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Follow Us
          </h2>
          {socialLinksRecord && <SocialLinksList links={socialLinksRecord} />}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 pt-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {name}. All rights reserved.
      </div>
    </footer>
  );
}
