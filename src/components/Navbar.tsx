"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Menu, X, ArrowUpRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About Us", href: "/about" },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "Solar PV EPC", href: "/services#solar-epc" },
      { name: "Electromechanical Works (MEP)", href: "/services#mep" },
      { name: "HVAC Engineering", href: "/services#hvac" },
      { name: "Substations & Infrastructure", href: "/services#substations" },
      { name: "Operations & Maintenance (O&M)", href: "/services#om" },
      { name: "Wind Energy Solutions", href: "/services#wind-energy" },
    ]
  },
  { name: "Projects", href: "/projects" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "Appreciation", href: "/appreciation" },
  { name: "Our Team", href: "/team" },
  { name: "Solar Calculator", href: "/solar-calculator" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname() || "";

  // Normalize pathname — strip /en prefix for matching
  const normalizedPath = pathname.replace(/^\/en/, "") || "/";

  // Active Link State Helper
  const isLinkActive = (href: string) => {
    if (href === "/") {
      return normalizedPath === "/";
    }
    const normalizedHref = href.replace(/^\/en/, "");
    return normalizedPath === normalizedHref || normalizedPath.startsWith(normalizedHref + "/") || normalizedPath.startsWith(normalizedHref + "#");
  };

  // Pages that feature transparent headers initially (hero extends behind navbar)
  const isTransparentHeaderPage =
    normalizedPath === "/" ||
    normalizedPath.includes("/about") ||
    normalizedPath.includes("/services") ||
    normalizedPath.includes("/projects") ||
    normalizedPath.includes("/sustainability") ||
    normalizedPath.includes("/appreciation") ||
    normalizedPath.includes("/team");

  const hasHeaderBg = scrolled || !isTransparentHeaderPage;
  // All inner-page heroes are now light-themed — no pages need white nav text
  const isTextWhite = false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasHeaderBg
          ? "navbar-glass shadow-md py-4 border-b border-ras-sand/30"
          : "bg-transparent py-6"
      }`}
    >
      <div className="wrapper max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center">
          <div className="relative w-44 h-11 md:w-48 md:h-12 overflow-hidden hover:scale-105 transition-all duration-300 flex items-center justify-center">
            <Image
              src="/assets/Logos/RAS-Logo-Main.png"
              alt="Ras Al Assad L.L.C"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group py-2"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center text-sm font-medium transition-colors hover:text-ras-gold tracking-tight relative pb-1"
                style={{ color: isLinkActive(link.href) ? '#C5A880' : (isTextWhite ? '#FCFCFC' : '#121212') }}
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                )}
              </Link>

              {isLinkActive(link.href) && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-ras-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Mega Dropdown */}
              {link.dropdown && activeDropdown === link.name && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-xl bg-ras-sand border border-white/40 shadow-2xl p-3 flex flex-col space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-ras-sand"></div>
                  {link.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="px-4 py-2.5 rounded-lg text-sm text-ras-charcoal hover:bg-white/50 hover:text-ras-gold transition-all flex items-center justify-between group/item"
                    >
                      {subItem.name}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Buttons — Solar Inquiry + Login */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full border transition-all duration-300 hover:scale-105"
            style={{
              color: isTextWhite ? '#FCFCFC' : '#121212',
              borderColor: isTextWhite ? 'rgba(252,252,252,0.3)' : 'rgba(18,18,18,0.15)',
            }}
          >
            <User className="h-4 w-4" />
            Login
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-ras-gold text-ras-charcoal text-sm font-semibold rounded-full hover:bg-ras-charcoal hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Solar Inquiry
          </Link>
        </div>

        {/* Mobile Burger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden z-50 p-2 rounded-full focus:outline-none bg-white/10 backdrop-blur-sm"
          style={{ color: (isTextWhite && !mobileMenuOpen) ? '#FCFCFC' : '#121212' }}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ras-sand pt-28 px-8 flex flex-col justify-between pb-12 overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  {link.dropdown ? (
                    <>
                      <span className="text-xs font-bold uppercase tracking-wider text-ras-grey mb-2">
                        {link.name}
                      </span>
                      <div className="flex flex-col pl-4 space-y-3">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg font-medium text-ras-charcoal hover:text-ras-gold transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-semibold text-ras-charcoal hover:text-ras-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-4 border-t border-ras-grey/25 pt-6">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 border border-ras-charcoal/15 text-ras-charcoal text-center font-semibold rounded-full flex items-center justify-center gap-2"
              >
                <User className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 bg-ras-gold text-ras-charcoal text-center font-bold rounded-full shadow-lg"
              >
                Solar Inquiry
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
