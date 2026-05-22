"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";

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
    <div className="bg-ras-light min-h-screen pt-28 pb-20">
      {/* Elegant Hero Header */}
      <section className="relative px-6 lg:px-8 py-20 bg-gradient-to-b from-ras-sand/50 to-transparent overflow-hidden">
        {/* Abstract background solar grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="solar-grid-about" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#solar-grid-about)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              className="lg:col-span-7"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.span 
                variants={fadeInUp}
                className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block"
              >
                Pioneering Engineering
              </motion.span>
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-extrabold tracking-tight text-ras-charcoal leading-tight mb-6"
              >
                Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-ras-gold via-ras-goldDark to-ras-green">Future of Energy</span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-base md:text-lg text-ras-grey max-w-2xl leading-relaxed mb-8"
              >
                Ras Al Assad Electromechanical Works L.L.C (RAAEW) is a premier Dubai-based engineering firm and DEWA-certified Solar PV contractor. We bring over 15 years of electromechanical and solar integration excellence to the Gulf.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link
                  href="/en/contact"
                  className="px-6 py-3.5 bg-ras-charcoal text-white text-sm font-semibold rounded-full hover:bg-ras-gold hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  Work With Us
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/en/services"
                  className="px-6 py-3.5 bg-white border border-ras-grey/20 text-ras-charcoal text-sm font-semibold rounded-full hover:border-ras-gold transition-all duration-300"
                >
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop"
                  alt="Modern architectural structure and clean solar panels"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal/40 to-transparent" />
              </div>
              
              {/* Decorative Floating Luxury Stat */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-ras-sand max-w-[200px] animate-bounce-slow">
                <p className="text-3xl font-extrabold text-ras-gold">100%</p>
                <p className="text-xs font-bold text-ras-charcoal uppercase tracking-wider mt-1">DEWA SHAMS Approved</p>
                <p className="text-[10px] text-ras-grey mt-1">Certified grid-tied Solar PV design & execution</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Corporate DNA & Executive Vision */}
      <section className="px-6 lg:px-8 py-24 bg-white border-y border-ras-grey/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Navas Komu MD Block */}
            <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full h-[380px] rounded-2xl overflow-hidden shadow-lg border border-ras-gold/15 bg-[#f5f3ef]">
                <Image
                  src="/assets/Team/Navas Komu.jpg"
                  alt="Managing Director, Mr. Navas Komu"
                  fill
                  className="object-cover object-center"
                  style={{ objectPosition: '50% 10%' }}
                />
              </div>
              <div className="border-l-4 border-ras-gold pl-4 py-1">
                <h4 className="text-lg font-bold text-ras-charcoal">Mr. Navas Komu</h4>
                <p className="text-xs font-semibold text-ras-gold uppercase tracking-widest">Managing Director</p>
              </div>
              <p className="text-sm text-ras-grey italic leading-relaxed">
                "Our vision has always been to build a legacy of uncompromising engineering accuracy and sustainable advancement. Every project we design under the UAE sky is a testament to electromechanical innovation and green energy empowerment."
              </p>
            </div>

            {/* Corporate Narrative Details */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-2 block">Our Journey</span>
                <h3 className="text-3xl font-bold text-ras-charcoal tracking-tight">From Mechanical Precision to Solar Excellence</h3>
              </div>
              
              <div className="space-y-6 text-ras-grey text-sm md:text-base leading-relaxed">
                <p>
                  Founded in 2013 in Dubai, Ras Al Assad Electromechanical Works L.L.C began with a core focus on complex electromechanical (MEP) infrastructure, high-voltage substations, and industrial HVAC installations. Over the years, we established our reputation as a trusted partner for commercial developers, industrial firms, and government enterprises in the UAE.
                </p>
                <p>
                  Anticipating the global energy transition, we launched our specialized **Solar PV Integration division in 2017**. Since then, we have grown into one of Dubai's preeminent DEWA-certified Solar contractors, delivering fully integrated solar EPC (Engineering, Procurement, and Construction) designs for luxury estates, manufacturing hubs, and corporate parks.
                </p>
                <p>
                  Today, RAAEW stands as a symbol of technological reliability, licensed by Dubai Municipality, fully accredited by **DEWA (Shams Dubai)**, and recognized by **Etihad ESCO** to lead energy efficiency audits and solar retrofitting campaigns.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Core Values */}
      <section className="px-6 lg:px-8 py-24 bg-ras-sand/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">Corporate Pillars</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ras-charcoal tracking-tight">The Principles Driving Our Operations</h2>
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
