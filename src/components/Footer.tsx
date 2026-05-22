"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Mail, MapPin, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const capabilityLinks = [
    { name: "Solar PV EPC", href: "/en/services#solar-epc" },
    { name: "Electromechanical Works (MEP)", href: "/en/services#mep" },
    { name: "HVAC Engineering", href: "/en/services#hvac" },
    { name: "Substations & Infrastructure", href: "/en/services#substations" },
    { name: "Operations & Maintenance (O&M)", href: "/en/services#om" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/en/about" },
    { name: "Our Capabilities", href: "/en/services" },
    { name: "Projects", href: "/en/projects" },
    { name: "Our Team", href: "/en/team" },
    { name: "Solar Calculator", href: "/en/solar-calculator" },
    { name: "Contact HQ", href: "/en/contact" },
  ];

  const certificationLinks = [
    { name: "DEWA Shams Dubai Approved" },
    { name: "Etihad ESCO Registered" },
    { name: "ISO 9001:2015 Quality" },
    { name: "ISO 14001:2015 Environment" },
    { name: "ISO 45001:2018 Safety" },
  ];

  return (
    <footer id="footer" className="bg-ras-charcoal text-white pt-16 pb-8 relative overflow-hidden border-t border-ras-grey/10">
      {/* Outer wrapper for alignment and responsiveness */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Pre-footer Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-ras-green rounded-3xl p-8 md:p-14 lg:p-16 mb-20 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 z-10 group border border-white/5"
        >
          {/* Custom SVG background shape */}
          <div className="pre-footer-shape absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none bg-cover bg-center md:bg-right-bottom scale-105 group-hover:scale-100 transition-transform duration-700" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="text-ras-gold font-bold text-xs tracking-widest uppercase mb-3 block">Energy Transition</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Start your <span className="text-ras-gold">solar transition</span> today.
            </h2>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Link 
              href="/en/solar-calculator" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-ras-gold hover:bg-white hover:text-ras-charcoal text-ras-charcoal font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group/btn"
            >
              <span>Calculate Savings</span>
              <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>

        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 relative z-10">
          
          {/* Logo & Info column */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Link href="/" className="relative z-50 flex items-center">
              <div className="relative w-36 h-20 overflow-hidden rounded-2xl bg-white px-3 py-1.5 border border-white/10 shadow-lg hover:scale-103 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <Image
                  src="/assets/Logos/RAS-Logo-02.png"
                  alt="Ras Al Assad L.L.C"
                  fill
                  className="object-contain px-1 py-0.5"
                />
              </div>
            </Link>
            
            <p className="text-sm text-ras-light/60 max-w-sm leading-relaxed">
              UAE-based renewable and electromechanical infrastructure specialist. Over a decade of engineering, procurement, and construction (EPC) excellence.
            </p>

            <div className="space-y-3 pt-2 text-xs text-ras-light/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-ras-gold mt-0.5 flex-shrink-0" />
                <span>PO Box 241029, Saraya Avenue Building, B Block, Office #204, Al Garhoud, Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-ras-gold flex-shrink-0" />
                <a href="tel:+97142641717" className="hover:text-ras-gold transition-colors">+971 4 264 1717</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-ras-gold flex-shrink-0" />
                <a href="mailto:info@rasalassad.ae" className="hover:text-ras-gold transition-colors">info@rasalassad.ae</a>
              </div>
            </div>
          </div>

          {/* Nav links columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-8 gap-8">
            
            {/* Capabilities menu */}
            <div className="flex flex-col space-y-4">
              <h5 className="font-semibold text-white tracking-tight border-b border-white/5 pb-2 text-sm uppercase tracking-wider">
                Capabilities
              </h5>
              <ul className="flex flex-col space-y-2 text-sm text-ras-light/70">
                {capabilityLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href} 
                      className="hover:text-ras-gold transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links menu */}
            <div className="flex flex-col space-y-4">
              <h5 className="font-semibold text-white tracking-tight border-b border-white/5 pb-2 text-sm uppercase tracking-wider">
                Company
              </h5>
              <ul className="flex flex-col space-y-2 text-sm text-ras-light/70">
                {companyLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href} 
                      className="hover:text-ras-gold transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory Accreditations info column */}
            <div className="flex flex-col space-y-4">
              <h5 className="font-semibold text-white tracking-tight border-b border-white/5 pb-2 text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-ras-gold" />
                Accredited
              </h5>
              <ul className="flex flex-col space-y-2 text-xs text-ras-light/60">
                {certificationLinks.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ras-gold flex-shrink-0" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Footer bottom meta metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 text-xs text-ras-light/45 relative z-10">
          
          <div className="flex items-center space-x-2">
            <span>Copyright © {currentYear}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-ras-gold" />
            <span className="font-medium text-ras-light/70">Ras Al Assad Electromechanical Works L.L.C</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] uppercase font-bold tracking-wider">
            <span>Engineering Performance. Delivering Reliability.</span>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
