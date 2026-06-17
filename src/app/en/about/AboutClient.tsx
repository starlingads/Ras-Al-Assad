"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Users, CheckCircle2, ArrowRight, Target, Eye } from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-ras-light min-h-screen pb-20">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0 z-0 bg-[#0F2747]">
          <Image
            src="/assets/Projects/SINGAPORE  PAVILION_x4.jpg"
            alt="Ras Al Assad engineering excellence — Singapore Pavilion project"
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
            Pioneering Engineering
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB8857] via-[#D4B282] to-[#AB8857]">
              Ras Al Assad
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed"
          >
            A premier Dubai-based engineering firm and DEWA-certified Solar PV contractor, delivering over 15 years of electromechanical and solar integration excellence.
          </motion.p>
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
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">What Drives Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight">Our Mission & Vision</h2>
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
                <Target className="h-7 w-7 text-ras-gold" />
              </div>
              <h3 className="text-xl font-bold text-ras-charcoal mb-4">Our Mission</h3>
              <p className="text-sm md:text-base text-ras-grey leading-relaxed">
                To deliver world-class electromechanical and renewable energy engineering solutions that empower businesses, communities, and governments across the UAE and beyond. We are committed to precision, compliance, and sustainability in every project we undertake.
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
                <Eye className="h-7 w-7 text-ras-gold" />
              </div>
              <h3 className="text-xl font-bold text-ras-charcoal mb-4">Our Vision</h3>
              <p className="text-sm md:text-base text-ras-grey leading-relaxed">
                To be the UAE&apos;s most trusted and innovative electromechanical and renewable energy EPC contractor — pioneering clean energy infrastructure that drives economic growth while protecting our environment for future generations.
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
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-2 block">Our Journey</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight mb-8">From Mechanical Precision to Solar Excellence</h2>
          </motion.div>
          
          <motion.div
            className="space-y-6 text-ras-grey text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              Founded in 2013 in Dubai, Ras Al Assad Electromechanical Works L.L.C began with a core focus on complex electromechanical (MEP) infrastructure, high-voltage substations, and industrial HVAC installations. Over the years, we established our reputation as a trusted partner for commercial developers, industrial firms, and government enterprises in the UAE.
            </p>
            <p>
              Anticipating the global energy transition, we launched our specialized <strong>Solar PV Integration division in 2017</strong>. Since then, we have grown into one of Dubai&apos;s preeminent DEWA-certified Solar contractors, delivering fully integrated solar EPC (Engineering, Procurement, and Construction) designs for luxury estates, manufacturing hubs, and corporate parks.
            </p>
            <p>
              Today, RAAEW stands as a symbol of technological reliability, licensed by Dubai Municipality, fully accredited by <strong>DEWA (Shams Dubai)</strong>, and recognized by <strong>Etihad ESCO</strong> to lead energy efficiency audits and solar retrofitting campaigns.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ras-sand flex items-center justify-center text-ras-gold">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-ras-charcoal">DEWA Certified</h5>
                <p className="text-xs text-ras-grey mt-0.5">Shams Dubai grid-connection compliance</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ras-sand flex items-center justify-center text-ras-gold">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-ras-charcoal">Etihad ESCO</h5>
                <p className="text-xs text-ras-grey mt-0.5">Approved energy efficiency contractor</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Structured Core Values */}
      <section className="px-6 lg:px-8 py-24 bg-ras-sand/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">Corporate Pillars</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight">The Principles Driving Our Operations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-ras-grey/5 flex flex-col justify-between group hover:border-ras-gold transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-ras-charcoal mb-3">Architectural Integrity</h4>
                <p className="text-sm text-ras-grey leading-relaxed">
                  We maintain strict mechanical compliance and premium aesthetic alignment. Our solar and MEP layouts harmonize with existing architecture without compromising visual beauty.
                </p>
              </div>
              <div className="w-full h-1 bg-ras-sand mt-6 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-ras-gold group-hover:w-full transition-all duration-500" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-ras-grey/5 flex flex-col justify-between group hover:border-ras-gold transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-ras-charcoal mb-3">DEWA Compliance</h4>
                <p className="text-sm text-ras-grey leading-relaxed">
                  Safety and standard compliance are central to everything we do. RAAEW ensures flawless, zero-friction approvals from Dubai Electricity and Water Authority at all levels.
                </p>
              </div>
              <div className="w-full h-1 bg-ras-sand mt-6 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-ras-gold group-hover:w-full transition-all duration-500" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-ras-grey/5 flex flex-col justify-between group hover:border-ras-gold transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-ras-charcoal mb-3">Client Partnership</h4>
                <p className="text-sm text-ras-grey leading-relaxed">
                  We build relationships that span decades. Through our extensive Operations & Maintenance (O&M) programs, we guarantee performance optimization and long-term asset value.
                </p>
              </div>
              <div className="w-full h-1 bg-ras-sand mt-6 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-ras-gold group-hover:w-full transition-all duration-500" />
              </div>
            </div>
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
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-6 block">Supporting Partner</span>
            <div className="relative w-[180px] h-[80px] mb-6">
              <Image
                src="/assets/Logos/Anert.png"
                alt="ANERT - Agency for Non-conventional Energy and Rural Technology"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <h3 className="text-lg font-bold text-ras-charcoal mb-2">ANERT Partnership</h3>
            <p className="text-sm text-ras-grey max-w-xl leading-relaxed">
              We are proud to partner with the Agency for Non-conventional Energy and Rural Technology (ANERT) — strengthening our commitment to renewable energy adoption, sustainable infrastructure, and clean technology advocacy across the region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Official Accreditations / Logos grid */}
      <section className="px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-ras-grey/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-65 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-black tracking-widest text-ras-charcoal uppercase">DEWA SHAMS</span>
              <span className="text-[9px] font-bold text-ras-gold uppercase">Registered Solar Contractor</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-black tracking-widest text-ras-charcoal uppercase">ETIHAD ESCO</span>
              <span className="text-[9px] font-bold text-ras-gold uppercase">Energy Efficiency Audit</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-black tracking-widest text-ras-charcoal uppercase">ISO 9001:2015</span>
              <span className="text-[9px] font-bold text-ras-gold uppercase">Quality Management System</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-black tracking-widest text-ras-charcoal uppercase">DUBAI MUNICIPALITY</span>
              <span className="text-[9px] font-bold text-ras-gold uppercase">Approved Electromechanical contractor</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
