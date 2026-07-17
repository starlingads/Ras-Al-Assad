"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Eye } from "lucide-react";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { LucideIcon } from "@/components/LucideIcon";

/**
 * View-model props, mapped from ABOUT_PAGE_QUERY by the server page.
 * Markup and animations are unchanged from the original hardcoded version.
 */
export type AboutPageData = {
  hero: {
    chip?: string | null;
    title?: string | null;
    titleAccent?: string | null;
    titleEnd?: string | null;
    subtitle?: string | null;
    backgroundUrl?: string | null;
    backgroundAlt?: string | null;
  };
  missionVisionSection: { chip?: string | null; heading?: string | null } | null;
  mission?: string | null;
  vision?: string | null;
  storyChip?: string | null;
  storyHeading?: string | null;
  storyBody: PortableTextBlock[] | null;
  storyBadges: { icon?: string | null; title: string; description?: string | null }[];
  principlesChip?: string | null;
  principlesHeading?: string | null;
  principles: { icon?: string | null; title: string; description?: string | null }[];
  partnerChip?: string | null;
  partnerHeading?: string | null;
  partnerText?: string | null;
  partnerLogoUrl?: string | null;
  partnerLogoAlt?: string | null;
  accreditationStrip: { title: string; subtitle?: string | null }[];
};

/** The per-card progress bar widths are a fixed design detail. */
const PRINCIPLE_BAR_WIDTHS = ["w-1/3", "w-1/2", "w-2/3"];

export default function AboutPage({ data }: { data: AboutPageData }) {
  const { hero } = data;

  return (
    <div className="bg-ras-light min-h-screen pb-20 pt-[76px] lg:pt-[80px]">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0 z-0 bg-black">
          {hero.backgroundUrl && (
            <Image
              src={hero.backgroundUrl}
              alt={hero.backgroundAlt || "Ras Al Assad engineering excellence"}
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

      {/* Mission & Vision Section */}
      <section className="px-6 lg:px-8 py-24 bg-white border-y border-ras-grey/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-ras-goldInk mb-3 block">{data.missionVisionSection?.chip}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight">{data.missionVisionSection?.heading}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-10 rounded-2xl shadow-sm border border-ras-grey/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-14 h-14 rounded-xl bg-ras-gold/10 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-ras-goldInk" />
              </div>
              <h3 className="text-xl font-bold text-ras-charcoal mb-4">Our Mission</h3>
              <p className="text-sm md:text-base text-ras-grey leading-relaxed">
                {data.mission}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-10 rounded-2xl shadow-sm border border-ras-grey/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-14 h-14 rounded-xl bg-ras-gold/10 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-ras-goldInk" />
              </div>
              <h3 className="text-xl font-bold text-ras-charcoal mb-4">Our Vision</h3>
              <p className="text-sm md:text-base text-ras-grey leading-relaxed">
                {data.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company History & Corporate Narrative */}
      <section className="px-6 lg:px-8 py-24 bg-ras-sand/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-ras-goldInk mb-2 block">{data.storyChip}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight mb-8">{data.storyHeading}</h2>
          </motion.div>

          <motion.div
            className="space-y-6 text-ras-grey text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {data.storyBody && <PortableText value={data.storyBody} />}
          </motion.div>

          {data.storyBadges.length > 0 && (
            <motion.div
              className="grid grid-cols-2 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {data.storyBadges.map((badge) => (
                <div key={badge.title} className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ras-sand flex items-center justify-center text-ras-goldInk">
                    <LucideIcon name={badge.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-ras-charcoal">{badge.title}</h5>
                    <p className="text-xs text-ras-grey mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Structured Core Values */}
      <section className="px-6 lg:px-8 py-24 bg-ras-sand/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-ras-goldInk mb-3 block">{data.principlesChip}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight">{data.principlesHeading}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.principles.map((principle, idx) => (
              <div key={principle.title} className="bg-white p-8 rounded-2xl shadow-sm border border-ras-grey/5 flex flex-col justify-between group hover:border-ras-gold transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-goldInk flex items-center justify-center mb-6">
                    <LucideIcon name={principle.icon} className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-ras-charcoal mb-3">{principle.title}</h4>
                  <p className="text-sm text-ras-grey leading-relaxed">
                    {principle.description}
                  </p>
                </div>
                <div className="w-full h-1 bg-ras-sand mt-6 rounded-full overflow-hidden">
                  <div className={`${PRINCIPLE_BAR_WIDTHS[idx % PRINCIPLE_BAR_WIDTHS.length]} h-full bg-ras-gold group-hover:w-full transition-all duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANERT Supporting Partner Section */}
      <section className="px-6 lg:px-8 py-16 bg-ras-sand/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-ras-goldInk mb-6 block">{data.partnerChip}</span>
            {data.partnerLogoUrl && (
              <div className="relative w-[180px] h-[80px] mb-6">
                <Image
                  src={data.partnerLogoUrl}
                  alt={data.partnerLogoAlt || data.partnerHeading || "Partner logo"}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            <h3 className="text-lg font-bold text-ras-charcoal mb-2">{data.partnerHeading}</h3>
            <p className="text-sm text-ras-grey max-w-xl leading-relaxed">
              {data.partnerText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Official Accreditations / Logos grid */}
      {data.accreditationStrip.length > 0 && (
        <section className="px-6 lg:px-8 py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* The dim + grayscale treatment here was written for image logos,
                but this strip renders text badges — grayscale has nothing to
                desaturate, and opacity-65 only dimmed the labels to 2.7:1. The
                muted gold and small caps carry the secondary weight already. */}
            <div className="border-t border-ras-grey/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {data.accreditationStrip.map((item) => (
                <div key={item.title} className="flex flex-col items-center space-y-2">
                  <span className="text-xs font-black tracking-widest text-ras-charcoal uppercase">{item.title}</span>
                  <span className="text-[9px] font-bold text-ras-goldInk uppercase">{item.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
