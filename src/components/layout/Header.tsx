"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Url } from "next/dist/shared/lib/router/router";

interface ITool {
  label: string;
  href?: string; // optional because nested tools may not have href
  target?: string;
  children?: ITool[]; // optional, only for nested items
}

const Header = () => {
  const { data: companyInfo } = useAppSelector((state) => state.companyInfo);
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [mobileNestedOpen, setMobileNestedOpen] = useState<
    Record<number, boolean>
  >({});

  const navigation = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/automobiles", label: "Auto mobiles" },
    // Tools will be inserted here
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  const tools: ITool[] = [
    {
      label: "Company Profile",
      href: "/CompanyProfileKiswah.pdf",
      target: "_blank",
    },
    // Nested example (currently not used, just scalable for future)
    // {
    //   label: "Container Details",
    //   children: [
    //     { label: "Container Specs", href: "/container-specs.pdf", target: "_blank" },
    //     { label: "ULD", href: "/uld.pdf", target: "_blank" },
    //   ],
    // },
    {
      label: "Incoterm",
      href: "/IncoTermKiswah.pdf",
      target: "_blank",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
  ];

  // Split navigation: inject Tools BEFORE news/contact
  const mainNavBeforeTools = navigation.slice(0, 4);
  const mainNavAfterTools = navigation.slice(4);

  return (
    <header className="sticky top-0 z-50 w-full h-20 backdrop-blur border-b border-border shadow-sm">
      <nav className="mx-auto px-2 sm:px-4 md:px-10 lg:px-16 gap-x-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg"
            alt="Kiswah Trading and logistics"
            width={32}
            height={32}
            className="h-8 w-8 object-contain rounded-md"
          />
          <span className="font-bold text-xl text-foreground">
            {companyInfo?.name ?? "Kiswah Trading and logistics"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 whitespace-nowrap">
          {/* BEFORE TOOLS */}
          {mainNavBeforeTools.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* TOOLS DROPDOWN – dynamic */}
          <li className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
              Tools <ChevronDown size={16} />
            </button>

            <div className="absolute left-0 mt-2 w-45 bg-card border border-border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <ul className="py-2 text-sm">
                {tools.map((tool, index) =>
                  tool.children ? (
                    <li key={index} className="relative group/container">
                      {/* nested rendering */}
                      {tool.children.map((child, i) => (
                        <Link
                          className="block px-4 py-2 hover:bg-muted"
                          key={i}
                          href={child.href as Url}
                          target={child.target}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </li>
                  ) : (
                    <li key={index}>
                      <Link
                        className="block px-4 py-2 hover:bg-muted"
                        href={tool.href as Url}
                        target={tool.target}
                      >
                        {tool.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </li>

          {/* AFTER TOOLS */}
          {mainNavAfterTools.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 z-40 h-screen bg-black/40 backdrop-blur-sm md:hidden transition-opacity ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[90%] bg-background border-r border-border shadow-lg p-8 z-50 md:hidden transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://res.cloudinary.com/dhgcbrxbw/image/upload/v1762148990/logo_hzckxp.jpg"
              alt="Kiswah Trading and logistics"
              width={32}
              height={32}
              className="h-8 w-8 object-contain rounded-md"
            />
            <span className="font-bold text-xl text-foreground">
              {companyInfo?.name ?? "Kiswah Trading and logistics"}
            </span>
          </Link>
          <ThemeToggle />
          <button className="md:hidden" onClick={() => setIsMenuOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <ul className="flex flex-col space-y-6">
          {/* Before Tools */}
          {mainNavBeforeTools.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-lg ${
                  pathname === item.href ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* TOOLS MOBILE */}
          <li>
            <button
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="flex justify-between w-full text-lg text-foreground"
            >
              Tools
              <ChevronDown
                size={18}
                className={
                  mobileToolsOpen ? "rotate-180 transition" : "transition"
                }
              />
            </button>

            {mobileToolsOpen && (
              <ul className="ml-4 mt-3 space-y-3">
                {tools.map((tool, index) =>
                  tool.children ? (
                    <li key={index}>
                      <button
                        onClick={() =>
                          setMobileNestedOpen((prev) => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                        className="flex justify-between w-full text-foreground"
                      >
                        {tool.label}
                        <ChevronDown
                          size={16}
                          className={
                            mobileNestedOpen[index]
                              ? "rotate-180 transition"
                              : "transition"
                          }
                        />
                      </button>

                      {mobileNestedOpen[index] && (
                        <ul className="ml-4 mt-2 space-y-2">
                          {tool.children.map((child, i) => (
                            <li key={i}>
                              <Link
                                href={child.href as Url}
                                target={child.target}
                                className="text-foreground"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={index}>
                      <Link
                        href={tool.href as Url}
                        target={tool.target}
                        className="text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {tool.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>

          {/* After Tools */}
          {mainNavAfterTools.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-lg ${
                  pathname === item.href ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
