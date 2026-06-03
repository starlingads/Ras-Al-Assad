"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldAlert, Award, FileText } from "lucide-react";

const institutions = [
  { name: "DEWA", role: "Certified Solar PV Contractor", desc: "Shams Dubai regulatory grid-tied connection approvals." },
  { name: "Etihad ESCO", role: "Audited Energy Partner", desc: "Compliance under building retrofit efficiency frameworks." },
  { name: "Al Habtoor Group", role: "Landmark MEP Client", desc: "Electromechanical engineering for high-density luxury towers." },
  { name: "Sobha Realty", role: "Solar EPC Partner", desc: "Turnkey PV installations for major residential communities." },
  { name: "HSBC UAE", role: "Commercial Solar Client", desc: "Rooftop PV arrays powering leading corporate complexes." },
  { name: "Expo 2020 Dubai", role: "Core MEP Contractor", desc: "High-spec infrastructure engineering (Singapore Pavilion)." }
];

export default function LatestNews() {
  return (
    <section className="py-20 lg:py-28 bg-[#FCFCFC] border-t border-ras-grey/5 relative overflow-hidden">
      {/* Decorative Radial Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(197,168,128,0.03),transparent)] z-0 pointer-events-none" />

      <div className="wrapper max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Trusted By / Institutional Trust Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-ras-gold text-xs font-bold uppercase tracking-widest mb-3 block">
              Trusted Excellence
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-ras-charcoal tracking-tightest leading-tight">
              Trusted by leading institutions <br />
              <span className="font-semibold">across the UAE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutions.map((inst, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-ras-grey/10 hover:shadow-lg hover:border-ras-gold/25 transition-all duration-300 flex flex-col justify-between h-[170px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-ras-charcoal tracking-tight">
                      {inst.name}
                    </span>
                    <span className="px-2 py-0.5 bg-ras-sand/40 border border-ras-gold/20 rounded text-[9px] font-bold text-ras-goldDark uppercase tracking-wider">
                      Verified
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-ras-goldDark uppercase tracking-wider mb-2">
                    {inst.role}
                  </h4>
                  <p className="text-xs text-ras-grey leading-normal font-light">
                    {inst.desc}
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] font-bold text-ras-charcoal/40 uppercase tracking-widest">
                  <CheckCircle className="h-3 w-3 text-ras-gold" />
                  <span>DEWA Compliant</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corporate Slogan CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-ras-charcoal text-white rounded-[32px] p-8 sm:p-12 md:p-16 relative overflow-hidden mb-20 shadow-2xl border border-white/5"
        >
          {/* Subtle Abstract Wave Vector Layer */}
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-ras-gold text-xs font-bold uppercase tracking-[0.2em] block">
              Proven Capability
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tightest leading-none text-white">
              ENGINEERING EXCELLENCE.<br />
              <span className="font-bold text-ras-gold">PROVEN CAPABILITY.</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light max-w-xl leading-relaxed">
              Partner with an integrated electromechanical and renewable EPC contractor built on certified standards, technical precision, and disciplined execution.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-3 px-8 py-3.5 bg-ras-gold text-ras-charcoal font-semibold rounded-full hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Build with us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Full Core Corporate Vision Statement Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-ras-sand/40 border border-ras-gold/20 rounded-[32px] p-8 sm:p-12 md:p-16 text-center shadow-md relative overflow-hidden"
        >
          {/* Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-ras-gold/30 rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-ras-gold/30 rounded-br-xl" />

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-ras-gold/35 shadow-sm text-ras-goldDark">
                <FileText className="h-5 w-5" />
              </div>
            </div>

            <h3 className="text-[10px] font-bold text-ras-goldDark uppercase tracking-[0.25em]">
              Our Mission Statement
            </h3>

            <p className="text-base sm:text-lg md:text-xl font-light text-ras-charcoal leading-relaxed text-center italic tracking-wide max-w-3xl mx-auto text-balance">
              &ldquo;WE DESIGN, BUILD, AND MAINTAIN HIGH-PERFORMANCE ENERGY AND INFRASTRUCTURE SYSTEMS WITH PRECISION, SAFETY, AND ACCOUNTABILITY. THROUGH STRONG ENGINEERING EXPERTISE, REGULATORY COMPLIANCE, AND DISCIPLINED EXECUTION, WE DELIVER INTEGRATED EPC AND RENEWABLE SOLUTIONS THAT CREATE LASTING VALUE FOR OUR CLIENTS AND COMMUNITIES.&rdquo;
            </p>

            <div className="space-y-2 pt-4">
              <h4 className="text-lg sm:text-xl font-extralight text-ras-charcoal tracking-tight leading-none uppercase">
                Engineering Performance. <span className="font-bold text-ras-goldDark">Delivering Reliability.</span>
              </h4>
              <p className="text-[9px] font-bold text-ras-grey uppercase tracking-[0.3em]">
                RENEWABLE & ELECTROMECHANICAL INFRASTRUCTURE PARTNER
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
