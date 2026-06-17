"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Leaf,
  Sun,
  Zap,
  Shield,
  Wind,
  Droplets,
  Target,
  TrendingUp,
  Globe,
  Award,
} from "lucide-react";

export default function SustainabilityClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };

  /* ───────────────────────────── Data ───────────────────────────── */

  const commitmentPoints = [
    {
      icon: Leaf,
      title: "Environmental Stewardship",
      description:
        "Every project is designed with environmental longevity in mind — minimising waste, maximising resource efficiency, and protecting the ecological footprint of every site we serve.",
    },
    {
      icon: Sun,
      title: "Clean Energy Integration",
      description:
        "As a DEWA Shams-certified solar contractor, we champion photovoltaic deployment across residential, commercial, and industrial landscapes — powering the UAE with sunlight.",
    },
    {
      icon: Zap,
      title: "Energy Efficiency",
      description:
        "Through precision MEP engineering and smart automation, we reduce annual energy consumption across the buildings we service — cutting operational costs and carbon emissions alike.",
    },
    {
      icon: Shield,
      title: "Regulatory Excellence",
      description:
        "We adhere to the highest international sustainability standards and UAE-specific energy mandates, ensuring every installation meets or exceeds compliance thresholds.",
    },
  ];

  const impactStats = [
    { value: "10+", label: "Years Experience", suffix: "in Renewable Energy" },
    { value: "50+", label: "Solar Projects", suffix: "Successfully Delivered" },
    { value: "15+", label: "MWp Deployed", suffix: "Clean Energy Capacity" },
    {
      value: "20,000+",
      label: "Tons CO₂ Offset",
      suffix: "Environmental Impact",
    },
  ];

  /* ──────────────────────────── Render ──────────────────────────── */

  return (
    <div className="bg-ras-light min-h-screen">
      {/* ═══════════════════ SECTION 1 — HERO ═══════════════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0 z-0 bg-[#0F2747]">
          <Image
            src="/assets/Projects/dubai-government-5000-villas-roof-solar.jpeg"
            alt="Sustainable solar energy infrastructure by Ras Al Assad"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Dark premium overlay */}
          <div className="absolute inset-0 bg-[#0F2747]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2747] via-[#0F2747]/45 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pb-16 pt-40 w-full">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#AB8857] mb-4 block"
          >
            Engineering a Greener Tomorrow
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Sustain
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB8857] via-[#D4B282] to-[#AB8857]">
              ability
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed"
          >
            Building a Cleaner Energy Future — through precision engineering,
            renewable innovation, and an unwavering commitment to the UAE&apos;s
            green vision.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ SECTION 2 — OUR COMMITMENT ═══════════════ */}
      <section className="px-6 lg:px-8 py-28 bg-ras-sand/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">
              Our Promise
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ras-charcoal tracking-tight mb-6">
              Our Sustainability Commitment
            </h2>
            <p className="text-base md:text-lg text-ras-grey leading-relaxed">
              Ras Al Assad is committed to engineering performance that supports
              long-term sustainable development. We believe that responsible energy
              design is not optional — it is foundational to every project we
              undertake and every client relationship we build.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {commitmentPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={idx}
                  variants={staggerChild}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-ras-grey/5 group hover:border-ras-gold/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center mb-6 group-hover:bg-ras-gold group-hover:text-white transition-colors duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-lg font-bold text-ras-charcoal mb-3">
                    {point.title}
                  </h4>
                  <p className="text-sm text-ras-grey leading-relaxed">
                    {point.description}
                  </p>
                  {/* Gold accent bar */}
                  <div className="w-full h-1 bg-ras-sand mt-6 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-ras-gold group-hover:w-full transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SECTION 3 — RENEWABLE ENERGY IMPACT ═══════════ */}
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
              Measurable Results
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
              Renewable Energy Impact
            </h2>
            <p className="text-base md:text-lg text-ras-light/65 leading-relaxed">
              Every kilowatt we deploy drives real change. Our cumulative solar
              portfolio speaks to a decade of dedication to clean energy
              generation across the Gulf.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {impactStats.map((stat, idx) => (
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
                <p className="text-xs text-ras-light/50">{stat.suffix}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4 — WIND ENERGY ═══════════════ */}
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
                <Image
                  src="/assets/Projects/wind-energy-service.png"
                  alt="Wind energy turbines powering a cleaner future"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal/50 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-ras-sand/40">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ras-gold">
                    Emerging Energy
                  </span>
                </div>
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
              <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center">
                <Wind className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-ras-gold block">
                Diversified Renewables
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ras-charcoal tracking-tight">
                Wind Energy Services
              </h2>
              <p className="text-sm md:text-base text-ras-grey leading-relaxed">
                As the GCC accelerates its diversification beyond solar, Ras Al
                Assad is actively expanding into wind energy engineering. Our
                electromechanical expertise positions us to deliver turbine
                foundation engineering, grid-connection systems, and structural
                load analysis for onshore wind installations.
              </p>
              <p className="text-sm md:text-base text-ras-grey leading-relaxed">
                With the UAE investing in wind power capacity across its
                northern coastlines and elevated terrain, we are developing
                partnerships and technical competencies to deliver end-to-end
                wind energy EPC services — from feasibility studies to
                commissioning and ongoing O&amp;M support.
              </p>

              <div className="h-[1px] bg-ras-grey/10 my-4" />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ras-gold mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-ras-charcoal leading-tight">
                    Turbine foundation &amp; structural engineering
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ras-gold mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-ras-charcoal leading-tight">
                    Grid-connection &amp; substation integration
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ras-gold mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-ras-charcoal leading-tight">
                    Site feasibility &amp; wind resource analysis
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ras-gold mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-ras-charcoal leading-tight">
                    Operations &amp; maintenance contracts
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 5 — GREEN HYDROGEN ═══════════════ */}
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
                  Future Technology
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Green Hydrogen — The Next Frontier
              </h2>

              <p className="text-sm md:text-base text-ras-light/70 leading-relaxed">
                Green hydrogen represents one of the most promising pathways to
                a fully decarbonised energy economy. Produced through water
                electrolysis powered by renewable energy sources, it offers a
                zero-emission fuel for heavy industry, transportation, and
                long-duration energy storage.
              </p>

              <p className="text-sm md:text-base text-ras-light/70 leading-relaxed">
                The UAE has positioned itself as a global leader in hydrogen
                strategy, with Dubai and Abu Dhabi investing in pilot hydrogen
                refuelling stations and industrial-scale electrolysis plants.
                Ras Al Assad is monitoring these developments closely, building
                the technical knowledge base and engineering partnerships
                required to participate in the UAE&apos;s hydrogen economy as it
                matures.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  {
                    icon: Zap,
                    title: "Electrolysis-Ready",
                    text: "Solar-powered hydrogen production pathways",
                  },
                  {
                    icon: Globe,
                    title: "UAE H₂ Strategy",
                    text: "Aligned with national hydrogen roadmap",
                  },
                  {
                    icon: TrendingUp,
                    title: "Scalable Impact",
                    text: "Industrial & transport decarbonisation",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/[0.04] border border-white/10 rounded-xl p-5"
                    >
                      <Icon className="h-5 w-5 text-ras-gold mb-3" />
                      <h5 className="font-bold text-sm text-white">
                        {item.title}
                      </h5>
                      <p className="text-xs text-ras-light/60 mt-1">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
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
                    <p className="text-[10px] text-ras-light/50 mt-1">
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

      {/* ═══════════ SECTION 6 — UAE ENERGY STRATEGY 2050 ═══════════ */}
      <section className="px-6 lg:px-8 py-28 bg-ras-sand/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">
              National Alignment
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ras-charcoal tracking-tight mb-6">
              UAE Energy Strategy 2050
            </h2>
            <p className="text-base md:text-lg text-ras-grey leading-relaxed">
              The United Arab Emirates has set one of the most ambitious clean
              energy targets in the Middle East — achieving{" "}
              <span className="font-bold text-ras-charcoal">
                44% of total energy from clean sources by 2050
              </span>
              . Ras Al Assad is proud to contribute to this national vision
              through every solar panel we install and every electromechanical
              system we optimise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "44% Clean Energy by 2050",
                description:
                  "The UAE Energy Strategy 2050 aims to produce 44% of its electricity from clean sources, including solar, nuclear, and wind — reducing carbon emissions by 70%.",
                highlight: "44%",
              },
              {
                icon: Sun,
                title: "Solar-First Approach",
                description:
                  "With over 350 days of sunshine annually, the UAE is ideally positioned for large-scale photovoltaic deployment. RAAEW is a certified contributor to this solar revolution.",
                highlight: "350+",
              },
              {
                icon: TrendingUp,
                title: "AED 600 Billion Investment",
                description:
                  "The UAE is investing AED 600 billion in clean and renewable energy infrastructure through 2050, creating unprecedented opportunity for certified engineering firms.",
                highlight: "AED 600B",
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
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
                    <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center mb-6 group-hover:bg-ras-gold group-hover:text-white transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-ras-charcoal mb-3">
                      {card.title}
                    </h4>
                    <p className="text-sm text-ras-grey leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="w-full h-1 bg-ras-sand mt-6 rounded-full overflow-hidden relative z-10">
                    <div className="w-1/3 h-full bg-ras-gold group-hover:w-full transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 7 — ANERT SUPPORTING PARTNER ═══════════ */}
      <section className="px-6 lg:px-8 py-28 bg-ras-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ras-green/10 via-transparent to-ras-gold/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* ANERT Logo */}
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
                  <Image
                    src="/assets/Logos/Anert.png"
                    alt="ANERT — Agency for New and Renewable Energy Research and Technology"
                    width={240}
                    height={120}
                    className="object-contain mx-auto"
                  />
                  <div className="mt-6 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-ras-gold">
                      Official Partner
                    </span>
                  </div>
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
                  Recognised Partnership
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                ANERT Supporting Partner
              </h2>

              <p className="text-sm md:text-base text-ras-light/70 leading-relaxed">
                Ras Al Assad Electromechanical Works is proud to be recognised by
                the{" "}
                <span className="text-ras-gold font-semibold">
                  Agency for New and Renewable Energy Research and Technology
                  (ANERT)
                </span>{" "}
                as a certified supporting partner in the advancement of renewable
                energy systems.
              </p>

              <p className="text-sm md:text-base text-ras-light/70 leading-relaxed">
                This recognition validates our commitment to engineering
                excellence in solar PV systems, energy-efficient building design,
                and sustainable electromechanical infrastructure. Working in
                alignment with ANERT&apos;s mission, we contribute to accelerating
                the adoption of clean energy technologies across the region.
              </p>

              <div className="h-[1px] bg-white/10 my-4" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Certified renewable energy engineering partner",
                  "Solar PV design and deployment excellence",
                  "Contribution to national energy research goals",
                  "Ongoing technical knowledge exchange",
                ].map((item, idx) => (
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
    </div>
  );
}
