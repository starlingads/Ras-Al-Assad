"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Mail, MapPin, Shield } from "lucide-react";
import { motion } from "framer-motion";

/**
 * View-model props, supplied by the (site) layout from Site Settings +
 * the services and accreditations collections.
 */
export type FooterProps = {
  banner: {
    chip?: string | null;
    heading?: string | null;
    headingAccent?: string | null;
    headingEnd?: string | null;
    cta: { label: string; href: string } | null;
  } | null;
  logoSrc: string;
  logoAlt: string;
  description?: string | null;
  addressText?: string | null;
  phone?: { number: string } | null;
  email?: { email: string } | null;
  capabilityHeading?: string | null;
  capabilities: { label: string; href: string }[];
  companyMenu: { label: string; href: string }[];
  accreditationLabels: string[];
  copyrightLeft: string;
  companyName: string;
  tagline?: string | null;
};

export default function Footer({
  banner,
  logoSrc,
  logoAlt,
  description,
  addressText,
  phone,
  email,
  capabilityHeading,
  capabilities,
  companyMenu,
  accreditationLabels,
  copyrightLeft,
  companyName,
  tagline,
}: FooterProps) {
  return (
    <footer id="footer" className="bg-ras-charcoal text-white pt-16 pb-8 relative overflow-hidden border-t border-ras-grey/10">
      {/* Outer wrapper for alignment and responsiveness */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Pre-footer Call to Action */}
        {banner && (
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
              {banner.chip && (
                <span className="text-ras-gold font-bold text-xs tracking-widest uppercase mb-3 block">{banner.chip}</span>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {banner.heading} <span className="text-ras-gold">{banner.headingAccent}</span> {banner.headingEnd}
              </h2>
            </div>

            {banner.cta && (
              <div className="relative z-10 flex-shrink-0">
                <Link
                  href={banner.cta.href}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-ras-gold hover:bg-white hover:text-ras-charcoal text-ras-charcoal font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group/btn"
                >
                  <span>{banner.cta.label}</span>
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 relative z-10">

          {/* Logo & Info column */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Link href="/" className="relative z-50 flex items-center">
              <div className="relative w-36 h-20 overflow-hidden rounded-2xl bg-white px-3 py-1.5 border border-white/10 shadow-lg hover:scale-103 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  fill
                  sizes="144px"
                  className="object-contain px-1 py-0.5"
                />
              </div>
            </Link>

            {description && (
              <p className="text-sm text-ras-light/60 max-w-sm leading-relaxed">
                {description}
              </p>
            )}

            <div className="space-y-3 pt-2 text-xs text-ras-light/75">
              {addressText && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-ras-gold mt-0.5 flex-shrink-0" />
                  <span>{addressText}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-ras-gold flex-shrink-0" />
                  <a href={`tel:${phone.number.replace(/[^+\d]/g, "")}`} className="hover:text-ras-gold transition-colors">{phone.number}</a>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-ras-gold flex-shrink-0" />
                  <a href={`mailto:${email.email}`} className="hover:text-ras-gold transition-colors">{email.email}</a>
                </div>
              )}
            </div>
          </div>

          {/* Nav links columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-8 gap-8">

            {/* Capabilities menu */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-white tracking-tight border-b border-white/5 pb-2 text-sm uppercase tracking-wider">
                {capabilityHeading || "Capabilities"}
              </h3>
              <ul className="flex flex-col space-y-2 text-sm text-ras-light/70">
                {capabilities.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="hover:text-ras-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links menu */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-white tracking-tight border-b border-white/5 pb-2 text-sm uppercase tracking-wider">
                Company
              </h3>
              <ul className="flex flex-col space-y-2 text-sm text-ras-light/70">
                {companyMenu.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="hover:text-ras-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory Accreditations info column */}
            {accreditationLabels.length > 0 && (
              <div className="flex flex-col space-y-4">
                <h3 className="font-semibold text-white tracking-tight border-b border-white/5 pb-2 text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-ras-gold" />
                  Accredited
                </h3>
                <ul className="flex flex-col space-y-2 text-xs text-ras-light/60">
                  {accreditationLabels.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ras-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* Footer bottom meta metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 text-xs text-ras-greyOnDark relative z-10">

          <div className="flex items-center space-x-2">
            <span>{copyrightLeft}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-ras-gold" />
            <span className="font-medium text-ras-light/70">{companyName}</span>
          </div>

          {tagline && (
            <div className="flex items-center space-x-6 text-[10px] uppercase font-bold tracking-wider">
              <span>{tagline}</span>
            </div>
          )}

        </div>
      </div>
    </footer>
  );
}
