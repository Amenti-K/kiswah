"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const { data: companyInfo } = useAppSelector((state) => state.companyInfo);
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-[var(--color-bg)]/90 backdrop-blur border-b border-[var(--color-border)] shadow-sm transition-colors">
      <nav className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {/* {companyInfo?.logo && (
            <Image
              src={companyInfo.logo}
              alt={`${companyInfo.name} Logo`}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          )} */}
          <Image
            src={logo}
            alt="Kiswah Trading and logistics"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-xl text-foreground">
            {companyInfo?.name ?? "Kiswah Trading and logistics"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden justify-center align-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 h-screen border-t border-border/20 bg-[var(--color-background)]">
          <ul className="flex flex-col space-y-4 px-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
