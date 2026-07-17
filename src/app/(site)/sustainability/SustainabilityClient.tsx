"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Droplets, Award } from "lucide-react";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { LucideIcon } from "@/components/LucideIcon";

/**
 * View-model props, mapped from SUSTAINABILITY_PAGE_QUERY by the server page.
 * Markup and animations are unchanged from the original hardcoded version.
 */
type IconCard = { icon?: string | null; title: string; description?: string | null };

export type SustainabilityPageData = {
  hero: {
    chip?: string | null;
    title?: string | null;
    titleAccent?: string | null;
    titleEnd?: string | null;
    subtitle?: string | null;
    backgroundUrl?: string | null;
    backgroundAlt?: string | null;
  };
  commitment: {
    chip?: string | null;
    heading?: string | null;
    text?: string | null;
    points: IconCard[];
  } | null;
  impact: {
    chip?: string | null;
    heading?: string | null;
    text?: string | null;
    stats: { value?: string | null; label?: string | null; description?: string | null }[];
  } | null;
  windEnergy: {
    imageTag?: string | null;
    chip?: string | null;
    heading?: string | null;
    body: PortableTextBlock[] | null;
    bullets: string[];
    imageUrl?: string | null;
    imageAlt?: string | null;
  } | null;
  greenHydrogen: {
    chip?: string | null;
    heading?: string | null;
    body: PortableTextBlock[] | null;
    cards: IconCard[];
  } | null;
  uaeStrategy: {
    chip?: string | null;
    heading?: string | null;
    body: PortableTextBlock[] | null;
    cards: (IconCard & { highlight?: string | null })[];
  } | null;
  partnerSection: {
    logoLabel?: string | null;
    chip?: string | null;
    heading?: string | null;
    body: PortableTextBlock[] | null;
    bullets: string[];
    logoUrl?: string | null;
    logoAlt?: string | null;
  } | null;
};

/* Portable Text renderers matching the original per-section paragraph styles. */
const windBodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm md:text-base text-ras-grey leading-relaxed">{children}</p>
    ),
  },
};

const hydrogenBodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm md:text-base text-ras-light/70 leading-relaxed">{children}</p>
    ),
  },
};

const uaeBodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-ras-grey leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-bold text-ras-charcoal">{children}</span>
    ),
  },
};

const partnerBodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm md:text-base text-ras-light/70 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="text-ras-gold font-semibold">{children}</span>
    ),
  },
};

export default function SustainabilityClient({ data }: { data: SustainabilityPageData }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    // `as const` keeps this a 4-tuple; without it TypeScript widens it to
    // number[], which no longer satisfies framer-motion's BezierDefinition.
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.12,
      },
    },
    viewport: { once: true },
  };

  const staggerChild = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  };

  const { hero, commitment, impact, windEnergy, greenHydrogen, uaeStrategy, partnerSection } = data;

  return (
    <div className="bg-ras-light min-h-screen pt-[76px] lg:pt-[80px]">
      {/* ═══════════════════ SECTION 1 — HERO ═══════════════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0 z-0 bg-black">
          {hero.backgroundUrl && (
            <Image
              src={hero.backgroundUrl}
              alt={hero.backgroundAlt || "Sustainable solar energy infrastructure by Ras Al Assad"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
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

      {/* ═══════════════ SECTION 2 — OUR COMMITMENT ═══════════════ */}
      {commitment && (
        <section className="px-6 lg:px-8 py-28 bg-ras-sand/40">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-bold uppercase tracking-widest text-ras-goldInk mb-3 block">
                {commitment.chip}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ras-charcoal tracking-tight mb-6">
                {commitment.heading}
              </h2>
              <p className="text-base md:text-lg text-ras-grey leading-relaxed">
                {commitment.text}
              </p>
            </motion.div>

            <motion.div
              {...staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {commitment.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerChild}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-ras-grey/5 group hover:border-ras-gold/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-ras-gold/10 text-ras-goldInk flex items-center justify-center mb-6 group-hover:bg-ras-gold group-hover:text-white transition-colors duration-300">
                    <LucideIcon name={point.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-ras-charcoal mb-3">
                    {point.title}
                  </h3>
                  <p className="text-sm text-ras-grey leading-relaxed">
                    {point.description}
                  </p>
                  {/* Gold accent bar */}
                  <div className="w-full h-1 bg-ras-sand mt-6 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-ras-gold group-hover:w-full transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════ SECTION 3 — RENEWABLE ENERGY IMPACT ═══════════ */}
      {impact && (
        <section className="px-6 lg:px-8 py-28 bg-ras-charcoal relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-ras-green/15 via-transparent to-ras-gold/5 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="sustain-stats-grid"
                  width="35"
                  height="35"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 35 0 L 0 0 0 35"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#sustain-stats-grid)"
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">
                {impact.chip}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
                {impact.heading}
              </h2>
              <p className="text-base md:text-lg text-ras-light/65 leading-relaxed">
                {impact.text}
              </p>
            </motion.div>

            <motion.div
              {...staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {impact.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerChild}
                  viewport={{ once: true }}
                  className="relative bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center group hover:border-ras-gold/40 hover:bg-white/[0.08] transition-all duration-300"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-gradient-to-r from-transparent via-ras-gold to-transparent rounded-full" />
                  <p className="text-4xl md:text-5xl font-extrabold text-ras-gold mb-2 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-ras-greyOnDark">{stat.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════ SECTION 4 — WIND ENERGY ═══════════════ */}
      {windEnergy && (
        <section className="px-6 lg:px-8 py-28 bg-ras-sand/40">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl group">
                  {windEnergy.imageUrl && (
                    <Image
                      src={windEnergy.imageUrl}
                      alt={windEnergy.imageAlt || "Wind energy turbines powering a cleaner future"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal/50 via-transparent to-transparent opacity-60" />
                  {windEnergy.imageTag && (
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-ras-sand/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ras-goldInk">
                        {windEnergy.imageTag}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-6"
              >
                <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-goldInk flex items-center justify-center">
                  <LucideIcon name="Wind" className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-ras-goldInk block">
                  {windEnergy.chip}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ras-charcoal tracking-tight">
                  {windEnergy.heading}
                </h2>
                {windEnergy.body && (
                  <PortableText value={windEnergy.body} components={windBodyComponents} />
                )}

                <div className="h-[1px] bg-ras-grey/10 my-4" />

                <div className="grid grid-cols-2 gap-4">
                  {windEnergy.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-ras-gold mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-ras-charcoal leading-tight">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ SECTION 5 — GREEN HYDROGEN ═══════════════ */}
      {greenHydrogen && (
        <section className="px-6 lg:px-8 py-28 bg-ras-charcoal relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tl from-ras-green/20 via-transparent to-ras-gold/5 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ras-gold bg-ras-gold/10 rounded-full border border-ras-gold/20">
                    {greenHydrogen.chip}
                  </span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {greenHydrogen.heading}
                </h2>

                {greenHydrogen.body && (
                  <PortableText value={greenHydrogen.body} components={hydrogenBodyComponents} />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {greenHydrogen.cards.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/[0.04] border border-white/10 rounded-xl p-5"
                    >
                      <LucideIcon name={item.icon} className="h-5 w-5 text-ras-gold mb-3" />
                      <h3 className="font-bold text-sm text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-ras-light/60 mt-1">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Visual element — decorative */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex items-center justify-center"
              >
                <div className="relative w-72 h-72 md:w-80 md:h-80">
                  {/* Concentric rings */}
                  <div className="absolute inset-0 rounded-full border border-ras-gold/15 animate-pulse" />
                  <div className="absolute inset-4 rounded-full border border-ras-gold/20" />
                  <div className="absolute inset-10 rounded-full border border-ras-gold/25" />
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-ras-gold/10 to-ras-green/10 flex items-center justify-center">
                    <div className="text-center">
                      <Droplets className="h-12 w-12 text-ras-gold mx-auto mb-3" />
                      <p className="text-xs font-bold text-ras-gold uppercase tracking-wider">
                        H₂
                      </p>
                      <p className="text-[10px] text-ras-greyOnDark mt-1">
                        Green Hydrogen
                      </p>
                    </div>
                  </div>
                  {/* Floating accent dots */}
                  <div className="absolute top-2 right-8 w-3 h-3 rounded-full bg-ras-gold/30 animate-ping" />
                  <div className="absolute bottom-8 left-2 w-2 h-2 rounded-full bg-ras-green/40 animate-ping" style={{ animationDelay: "1s" }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ SECTION 6 — UAE ENERGY STRATEGY 2050 ═══════════ */}
      {uaeStrategy && (
        <section className="px-6 lg:px-8 py-28 bg-ras-sand/40">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-ras-goldInk mb-3 block">
                {uaeStrategy.chip}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ras-charcoal tracking-tight mb-6">
                {uaeStrategy.heading}
              </h2>
              {uaeStrategy.body && (
                <PortableText value={uaeStrategy.body} components={uaeBodyComponents} />
              )}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {uaeStrategy.cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-ras-grey/5 group hover:border-ras-gold/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  {/* Background accent number */}
                  <span className="absolute -top-4 -right-2 text-8xl font-extrabold text-ras-sand/60 select-none pointer-events-none">
                    {card.highlight}
                  </span>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-goldInk flex items-center justify-center mb-6 group-hover:bg-ras-gold group-hover:text-white transition-colors duration-300">
                      <LucideIcon name={card.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-ras-charcoal mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm text-ras-grey leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="w-full h-1 bg-ras-sand mt-6 rounded-full overflow-hidden relative z-10">
                    <div className="w-1/3 h-full bg-ras-gold group-hover:w-full transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ SECTION 7 — ANERT SUPPORTING PARTNER ═══════════ */}
      {partnerSection && (
        <section className="px-6 lg:px-8 py-28 bg-ras-charcoal relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ras-green/10 via-transparent to-ras-gold/5 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Partner Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Glow ring */}
                  <div className="absolute -inset-6 bg-ras-gold/5 rounded-3xl blur-2xl" />
                  <div className="relative bg-white/[0.06] border border-white/10 rounded-3xl p-12 md:p-16 backdrop-blur-sm">
                    {partnerSection.logoUrl && (
                      <Image
                        src={partnerSection.logoUrl}
                        alt={partnerSection.logoAlt || partnerSection.heading || "Partner logo"}
                        width={240}
                        height={120}
                        className="object-contain mx-auto"
                      />
                    )}
                    {partnerSection.logoLabel && (
                      <div className="mt-6 text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-ras-gold">
                          {partnerSection.logoLabel}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center">
                    <Award className="h-6 w-6" />
                  </div>
                  <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ras-gold bg-ras-gold/10 rounded-full border border-ras-gold/20">
                    {partnerSection.chip}
                  </span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {partnerSection.heading}
                </h2>

                {partnerSection.body && (
                  <PortableText value={partnerSection.body} components={partnerBodyComponents} />
                )}

                <div className="h-[1px] bg-white/10 my-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {partnerSection.bullets.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-ras-gold mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-ras-light/80 leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
