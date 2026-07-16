"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Star,
  ArrowRight,
  X,
  Plus,
} from "lucide-react";
import { LucideIcon } from "@/components/LucideIcon";

/**
 * View-model props, mapped from APPRECIATION_PAGE_QUERY by the server page.
 * Markup and animations are unchanged from the original hardcoded version.
 */
export type AppreciationPageData = {
  hero: {
    chip?: string | null;
    title?: string | null;
    titleAccent?: string | null;
    titleEnd?: string | null;
    subtitle?: string | null;
    backgroundUrl?: string | null;
    backgroundAlt?: string | null;
  };
  overview: { chip?: string | null; heading?: string | null; text?: string | null } | null;
  certificatesSection: { chip?: string | null; heading?: string | null } | null;
  certificates: { url: string; alt: string; title: string }[];
  accreditationsSection: { chip?: string | null; heading?: string | null } | null;
  accreditations: { icon?: string | null; label: string; desc?: string | null }[];
  anertCard: {
    heading?: string | null;
    text?: string | null;
    logoUrl?: string | null;
    logoAlt?: string | null;
  } | null;
  moreToCome: { chip?: string | null; heading?: string | null; text?: string | null } | null;
  pageCta: {
    heading?: string | null;
    text?: string | null;
    primary: { label: string; href: string } | null;
    secondary: { label: string; href: string } | null;
  } | null;
};

export default function AppreciationClient({ data }: { data: AppreciationPageData }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const { hero, overview, certificatesSection, certificates, accreditationsSection, accreditations, anertCard, moreToCome, pageCta } = data;

  return (
    <div className="bg-ras-light min-h-screen pb-0 pt-[76px] lg:pt-[80px]">
      {/* ───────────────────── 1. HERO ───────────────────── */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0 z-0 bg-black">
          {hero.backgroundUrl && (
            <Image
              src={hero.backgroundUrl}
              alt={hero.backgroundAlt || "Award-winning engineering recognition — Ras Al Assad"}
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

      {/* ───────────────── 2. RECOGNITION OVERVIEW ───────────────── */}
      {overview && (
        <section className="px-6 lg:px-8 py-24 bg-ras-sand/40">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">
              {overview.chip}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight mb-6">
              {overview.heading}
            </h2>
            <p className="text-sm md:text-base text-ras-grey leading-relaxed max-w-3xl mx-auto">
              {overview.text}
            </p>
          </motion.div>
        </section>
      )}

      {/* ───────────────── 3. CERTIFICATE GALLERY ───────────────── */}
      <section className="px-6 lg:px-8 py-24 bg-white border-y border-ras-grey/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">
              {certificatesSection?.chip}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight">
              {certificatesSection?.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, i) => (
              <motion.button
                key={cert.url}
                className="group relative bg-ras-sand/30 rounded-2xl overflow-hidden shadow-sm border border-ras-gold/15 hover:shadow-xl hover:border-ras-gold/40 transition-all duration-300 cursor-pointer text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                onClick={() => setLightboxIdx(i)}
                aria-label={`View ${cert.title}`}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={cert.url}
                    alt={cert.alt}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-ras-charcoal/0 group-hover:bg-ras-charcoal/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-bold text-white bg-ras-charcoal/70 px-4 py-2 rounded-full backdrop-blur-sm">
                      Click to view
                    </span>
                  </div>
                </div>
                <div className="p-5 border-t border-ras-gold/10">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-ras-gold flex-shrink-0" />
                    <h3 className="text-sm font-bold text-ras-charcoal">
                      {cert.title}
                    </h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. PARTNER & ACCREDITATION ACKNOWLEDGEMENTS ───────── */}
      <section className="px-6 lg:px-8 py-24 bg-ras-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">
              {accreditationsSection?.chip}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              {accreditationsSection?.heading}
            </h2>
          </motion.div>

          {/* accreditation badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {accreditations.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4 p-6 rounded-2xl border border-ras-gold/20 bg-white/[0.04] backdrop-blur-sm hover:border-ras-gold/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-ras-gold/15 flex items-center justify-center">
                  <LucideIcon name={item.icon} className="h-5 w-5 text-ras-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {item.label}
                  </h4>
                  <p className="text-xs text-ras-grey mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ANERT Logo Card */}
          {anertCard && (
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl border border-ras-gold/20 bg-white/[0.04] backdrop-blur-sm max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {anertCard.logoUrl && (
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-white/10 p-2">
                  <Image
                    src={anertCard.logoUrl}
                    alt={anertCard.logoAlt || anertCard.heading || "Partner logo"}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              )}
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-bold text-white">
                  {anertCard.heading}
                </h4>
                <p className="text-xs text-ras-grey mt-1 leading-relaxed">
                  {anertCard.text}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ───────────── 5. PLACEHOLDER / COMING SOON ───────────── */}
      {moreToCome && (
        <section className="px-6 lg:px-8 py-24 bg-ras-sand/40">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-14"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">
                {moreToCome.chip}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight">
                {moreToCome.heading}
              </h2>
              <p className="text-sm text-ras-grey mt-4 max-w-xl mx-auto leading-relaxed">
                {moreToCome.text}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <motion.div
                  key={n}
                  className="flex flex-col items-center justify-center h-56 rounded-2xl border-2 border-dashed border-ras-gold/25 bg-white/60 hover:border-ras-gold/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: n * 0.08 }}
                >
                  <div className="w-12 h-12 rounded-full bg-ras-gold/10 flex items-center justify-center mb-4">
                    <Plus className="h-5 w-5 text-ras-gold/60" />
                  </div>
                  <p className="text-xs font-semibold text-ras-grey/70 uppercase tracking-wider">
                    Coming Soon
                  </p>
                  <p className="text-[10px] text-ras-grey/50 mt-1">
                    More recognitions
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────── 6. CTA ───────────────── */}
      {pageCta && (
        <section className="px-6 lg:px-8 py-24 bg-ras-charcoal relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid-cta-appr"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#grid-cta-appr)"
              />
            </svg>
          </div>

          <motion.div
            className="max-w-3xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-ras-gold/15 flex items-center justify-center mx-auto mb-6">
              <Star className="h-7 w-7 text-ras-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              {pageCta.heading}
            </h2>
            <p className="text-sm md:text-base text-ras-grey leading-relaxed max-w-xl mx-auto mb-8">
              {pageCta.text}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {pageCta.primary && (
                <Link
                  href={pageCta.primary.href}
                  className="px-7 py-3.5 bg-ras-gold text-ras-charcoal text-sm font-semibold rounded-full hover:bg-ras-goldDark hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  {pageCta.primary.label}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              {pageCta.secondary && (
                <Link
                  href={pageCta.secondary.href}
                  className="px-7 py-3.5 border border-ras-gold/30 text-white text-sm font-semibold rounded-full hover:border-ras-gold transition-all duration-300"
                >
                  {pageCta.secondary.label}
                </Link>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* ───────────────── LIGHTBOX MODAL ───────────────── */}
      <AnimatePresence>
        {lightboxIdx !== null && certificates[lightboxIdx] && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
          >
            {/* close button */}
            <button
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <motion.div
              className="relative w-full max-w-3xl aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={certificates[lightboxIdx].url}
                alt={certificates[lightboxIdx].alt}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 95vw, 800px"
                priority
              />
            </motion.div>

            {/* certificate title under image */}
            <motion.p
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm font-semibold text-white/80 bg-black/40 px-5 py-2 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
            >
              {certificates[lightboxIdx].title}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
