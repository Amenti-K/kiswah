"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { companyInfoDefault } from "@/lib/data";
import SocialLinksList from "@/components/SocialLInks";
import Link from "next/link";

const links = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { data } = useAppSelector((state) => state.companyInfo);
  const companyInfo = data ?? companyInfoDefault;

  return (
    <footer className="bg-background text-muted-foreground py-10 mt-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            {companyInfo?.name}
          </h2>
          <ul className="space-y-2 text-sm">
            {companyInfo?.contactEmail && (
              <li className="flex items-center gap-2">
                <Mail size={16} /> <span>{companyInfo.contactEmail}</span>
              </li>
            )}
            {companyInfo?.contactPhone && (
              <li className="flex items-center gap-2">
                <Phone size={16} /> <span>{companyInfo.contactPhone}</span>
              </li>
            )}
            {companyInfo?.address && (
              <li className="flex items-center gap-2">
                <MapPin size={16} /> <span>{companyInfo.address}</span>
              </li>
            )}
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
                  className="text-muted-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        {companyInfo?.socialLinks &&
          Object.keys(companyInfo.socialLinks).length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Follow Us
              </h2>
              <SocialLinksList links={companyInfo.socialLinks} />
            </div>
          )}
      </div>

      {/* Bottom bar */}
      <div className="mt-8 pt-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {companyInfo?.name}. All rights
        reserved.
      </div>
    </footer>
  );
}
