"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { LucideIcon } from "@/components/LucideIcon";

/**
 * View-model props, mapped from SERVICES_PAGE_QUERY by the server page.
 * Markup and animations are unchanged from the original hardcoded version.
 */
export type ServicesPageData = {
  hero: {
    chip?: string | null;
    title?: string | null;
    titleAccent?: string | null;
    titleEnd?: string | null;
    subtitle?: string | null;
    backgroundUrl?: string | null;
    backgroundAlt?: string | null;
  };
  services: {
    slug: string;
    icon?: string | null;
    title?: string | null;
    subtitle?: string | null;
    tagline?: string | null;
    description: PortableTextBlock[] | null;
    highlights: string[];
    imageUrl?: string | null;
    imageAlt?: string | null;
    cta: { label: string; href: string } | null;
  }[];
  zeroCapital: {
    chip?: string | null;
    heading?: string | null;
    text?: string | null;
    benefits: { icon?: string | null; title: string; description?: string | null }[];
    cta: { label: string; href: string } | null;
  } | null;
};

/** Keeps the CMS Portable Text visually identical to the old <p> styling. */
const descriptionComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-sm md:text-base text-ras-grey leading-relaxed">{children}</p>
    ),
  },
};

export default function ServicesPage({ data }: { data: ServicesPageData }) {
  const { hero, services, zeroCapital } = data;

  return (
    <div className="bg-ras-light min-h-screen pt-[76px] lg:pt-[80px]">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0 z-0 bg-black">
          {hero.backgroundUrl && (
            <Image
              src={hero.backgroundUrl}
              alt={hero.backgroundAlt || "Ras Al Assad solar PV and electromechanical services"}
              fill
              className="object-cover opacity-60"
              priority
            />
          )}
          {/* Premium Black Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 to-black/55" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pb-16 pt-40 w-full">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#AB8857] mb-4 block"
          >
            {hero.chip}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            {hero.title}
            {hero.titleAccent && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB8857] via-[#D4B282] to-[#AB8857]">
                {hero.titleAccent}
              </span>
            )}
            {hero.titleEnd}
          </motion.h1>

          {hero.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>
          )}
        </div>
      </section>

      {/* Luxury Services Anchor Listing */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto space-y-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.slug}
                id={service.slug}
                className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Service Visual representation */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl group"
                  >
                    {service.imageUrl && (
                      <Image
                        src={service.imageUrl}
                        alt={service.imageAlt || service.title || "Service"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal/50 via-transparent to-transparent opacity-60" />

                    {/* Brand floating category tag */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-ras-sand/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ras-gold">RAAEW Engineering</span>
                    </div>
                  </motion.div>
                </div>

                {/* Service Details and bullets */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"} space-y-6`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center mb-2">
                      <LucideIcon name={service.icon} className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-ras-gold block">
                      {service.tagline}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ras-charcoal tracking-tight">
                      {service.title}
                    </h2>
                    <h4 className="text-sm font-semibold text-ras-grey uppercase tracking-wide">
                      {service.subtitle}
                    </h4>
                    {service.description && (
                      <PortableText value={service.description} components={descriptionComponents} />
                    )}

                    <div className="h-[1px] bg-ras-grey/10 my-6" />

                    <ul className="grid grid-cols-1 gap-3">
                      {service.highlights.map((bullet, i) => (
                        <li key={i} className="flex items-start text-sm text-ras-charcoal">
                          <span className="w-2 h-2 rounded-full bg-ras-gold mt-1.5 mr-3 flex-shrink-0" />
                          <span className="leading-tight">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {service.cta && (
                      <div className="pt-6">
                        <Link
                          href={service.cta.href}
                          className="inline-flex items-center text-sm font-bold text-ras-gold hover:text-ras-charcoal transition-colors group"
                        >
                          {service.cta.label}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sustainable Zero-CAPEX Solar Lease Highlight */}
      {zeroCapital && (
        <section className="px-6 lg:px-8 py-24 bg-ras-charcoal text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="solar-grid-lease" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#solar-grid-lease)" />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold block">
              {zeroCapital.chip}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {zeroCapital.heading}
            </h2>
            <p className="text-base md:text-lg text-ras-light/75 max-w-3xl mx-auto leading-relaxed">
              {zeroCapital.text}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-6 text-left">
              {zeroCapital.benefits.map((benefit) => (
                <div key={benefit.title} className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <LucideIcon name={benefit.icon} className="h-5 w-5 text-ras-gold mb-3" />
                  <h5 className="font-bold text-sm">{benefit.title}</h5>
                  <p className="text-xs text-ras-light/70 mt-1">{benefit.description}</p>
                </div>
              ))}
            </div>

            {zeroCapital.cta && (
              <div className="pt-6">
                <Link
                  href={zeroCapital.cta.href}
                  className="px-8 py-4 bg-ras-gold text-ras-charcoal text-sm font-bold rounded-full hover:bg-white hover:text-ras-charcoal transition-all duration-300 inline-block shadow-lg"
                >
                  {zeroCapital.cta.label}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
