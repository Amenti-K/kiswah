import { Mail, Phone, MapPin } from "lucide-react";
import { companyInfoDefault } from "@/lib/data";
import SocialLinksList from "@/components/SocialLInks";
import Link from "next/link";

const links = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-background text-muted-foreground p-4 md:p-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            {companyInfoDefault?.name}
          </h2>
          <ul className="space-y-2 text-sm">
            {companyInfoDefault?.contactEmail && (
              <li className="flex items-center gap-2">
                <Mail size={16} />{" "}
                <span>{companyInfoDefault.contactEmail}</span>
              </li>
            )}
            {companyInfoDefault?.contactPhone && (
              <li className="flex items-center gap-2">
                <Phone size={16} />{" "}
                <span>{companyInfoDefault.contactPhone}</span>
              </li>
            )}
            {companyInfoDefault?.address && (
              <li className="flex items-center gap-2">
                <MapPin size={30} /> <span>{companyInfoDefault.address}</span>
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
        {companyInfoDefault?.socialLinks &&
          Object.keys(companyInfoDefault.socialLinks).length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Follow Us
              </h2>
              <SocialLinksList links={companyInfoDefault.socialLinks} />
            </div>
          )}
      </div>

      {/* Bottom bar */}
      <div className="mt-8 pt-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {companyInfoDefault?.name}. All rights
        reserved.
      </div>
    </footer>
  );
}
