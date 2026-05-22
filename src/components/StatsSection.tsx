"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Trophy, Shield, Award, Calendar } from "lucide-react";

const pipelineSteps = [
  { 
    step: "01", 
    title: "Engineering Design", 
    desc: "Detailed PV layout mapping, electrical single line diagrams (SLD), and structural load assessments compliant with UAE grid standards." 
  },
  { 
    step: "02", 
    title: "Procurement & Technical Coordination", 
    desc: "Strategic sourcing of Tier-1 PV components, transformers, switchgears, and regulatory-approved electromechanical apparatus." 
  },
  { 
    step: "03", 
    title: "Construction & Installation", 
    desc: "Field civil works, panel installation, electrical wiring, HVAC ducting, and piping systems executed by certified builders." 
  },
  { 
    step: "04", 
    title: "Testing & Commissioning", 
    desc: "Pre-commissioning insulation sweeps, hot-spot thermal scanning, grid integration safety checks, and authority approvals." 
  },
  { 
    step: "05", 
    title: "After-Sales & Operational Support", 
    desc: "Preventative AMC support, 24/7 remote generation tracking, structural testing, and immediate breakdown dispatch." 
  }
];

const credentials = [
  { 
    title: "13+ Years", 
    subtitle: "Engineering Experience", 
    desc: "A proven legacy of high-performance project execution since 2013.",
    icon: <Calendar className="h-6 w-6 text-ras-gold" />
  },
  { 
    title: "Certified", 
    subtitle: "Solar PV Consultant", 
    desc: "Officially registered and authorized by DEWA and local grid authorities.",
    icon: <Award className="h-6 w-6 text-ras-gold" />
  },
  { 
    title: "ISO Certified", 
    subtitle: "Operations & Management", 
    desc: "Strict compliance with international quality and safety benchmarks.",
    icon: <Shield className="h-6 w-6 text-ras-gold" />
  },
  { 
    title: "Integrated", 
    subtitle: "EPC Capability", 
    desc: "Comprehensive in-house design, procurement, and execution teams.",
    icon: <Trophy className="h-6 w-6 text-ras-gold" />
  }
];

export default function StatsSection() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-ras-sand/35 border-y border-ras-grey/5 relative overflow-hidden">
      {/* Background Soft Mesh Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(197,168,128,0.04),transparent)] z-0 pointer-events-none" />

      <div className="wrapper max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <span className="text-ras-gold text-xs font-bold uppercase tracking-widest mb-3 block">
            End-To-End Delivery
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-ras-charcoal tracking-tightest leading-tight mb-6">
            Building Infrastructure <br />
            <span className="font-semibold text-ras-charcoal">That Performs</span>
          </h2>
          <p className="text-base sm:text-lg text-ras-grey font-light leading-relaxed">
            We provide end-to-end EPC solutions across renewable energy and electromechanical infrastructure, from engineering design to commissioning and long-term operational support.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - 5-Step Pipeline Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-lg font-bold text-ras-charcoal uppercase tracking-wider mb-6 flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-ras-gold" />
              <span>Integrated EPC Pipeline</span>
            </h3>

            <div className="relative pl-6 border-l border-ras-gold/20 space-y-10">
              {pipelineSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Step Bubble Node */}
                  <span className="absolute -left-[37px] top-1.5 w-[26px] h-[26px] bg-white border border-ras-gold/45 text-[10px] font-bold text-ras-goldDark rounded-full flex items-center justify-center shadow-sm group-hover:bg-ras-gold group-hover:text-white transition-colors duration-300">
                    {step.step}
                  </span>

                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-ras-charcoal group-hover:text-ras-goldDark transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-sm text-ras-grey leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - 4 Credentials Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {credentials.map((cred, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="bg-white rounded-3xl p-8 border border-ras-grey/10 shadow-sm hover:shadow-xl hover:border-ras-gold/20 transition-all duration-300 flex flex-col justify-between h-[230px] group"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-ras-sand/50 rounded-2xl border border-ras-gold/15 group-hover:bg-ras-gold group-hover:text-white transition-colors duration-300">
                    {cred.icon}
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-ras-goldDark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="space-y-1 mt-4">
                  <h3 className="text-2xl font-bold text-ras-goldDark tracking-tight group-hover:text-ras-charcoal transition-colors">
                    {cred.title}
                  </h3>
                  <h4 className="text-sm font-semibold text-ras-charcoal uppercase tracking-wider text-[11px]">
                    {cred.subtitle}
                  </h4>
                  <p className="text-xs text-ras-grey leading-normal font-light">
                    {cred.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Narrative / Vision Quote Block */}
        <div className="max-w-5xl mx-auto mt-24 text-center border-t border-ras-grey/10 pt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl font-extralight text-ras-charcoal leading-relaxed text-balance"
          >
            &ldquo;At Ras Al Assad, we believe building high-performance energy infrastructure is not just a technical process but a long-term commitment. Our certified credentials and systematic EPC pipeline ensure maximum reliability for the UAE skyline.&rdquo;
          </motion.p>
          <span className="text-[10px] font-bold text-ras-gold uppercase tracking-[0.25em] mt-6 block">
            ENG. NAVAS KOMU &mdash; Managing Director, RAAEW
          </span>
        </div>

      </div>
    </section>
  );
}
