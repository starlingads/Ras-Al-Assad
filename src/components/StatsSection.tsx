"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { LucideIcon } from "@/components/LucideIcon";

/** Content comes from Homepage → Stats & Process. */
export type StatsSectionProps = {
  chip?: string | null;
  heading?: string | null;
  headingBold?: string | null;
  text?: string | null;
  pipelineHeading?: string | null;
  pipelineSteps: { title: string; description?: string | null }[];
  credentials: {
    icon?: string | null;
    value?: string | null;
    label?: string | null;
    description?: string | null;
  }[];
  quote: { text?: string | null; author?: string | null } | null;
};

export default function StatsSection({
  chip,
  heading,
  headingBold,
  text,
  pipelineHeading,
  pipelineSteps,
  credentials,
  quote,
}: StatsSectionProps) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-ras-sand/35 border-y border-ras-grey/5 relative overflow-hidden">
      {/* Background Soft Mesh Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(197,168,128,0.04),transparent)] z-0 pointer-events-none" />

      <div className="wrapper max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <span className="text-ras-goldInk text-xs font-bold uppercase tracking-widest mb-3 block">
            {chip}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-ras-charcoal tracking-tightest leading-tight mb-6">
            {heading} <br />
            <span className="font-semibold text-ras-charcoal">{headingBold}</span>
          </h2>
          <p className="text-base sm:text-lg text-ras-grey font-light leading-relaxed">
            {text}
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column - 5-Step Pipeline Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-lg font-bold text-ras-charcoal uppercase tracking-wider mb-6 flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-ras-gold" />
              <span>{pipelineHeading}</span>
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
                  {/* Step Bubble Node — numbers render automatically */}
                  <span className="absolute -left-[37px] top-1.5 w-[26px] h-[26px] bg-white border border-ras-gold/45 text-[10px] font-bold text-ras-goldInk rounded-full flex items-center justify-center shadow-sm group-hover:bg-ras-gold group-hover:text-white transition-colors duration-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-ras-charcoal group-hover:text-ras-goldInk transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-sm text-ras-grey leading-relaxed font-light">
                      {step.description}
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
                    <LucideIcon name={cred.icon} className="h-6 w-6 text-ras-goldInk" />
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-ras-goldDark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="space-y-1 mt-4">
                  <h3 className="text-2xl font-bold text-ras-goldInk tracking-tight group-hover:text-ras-charcoal transition-colors">
                    {cred.value}
                  </h3>
                  <h4 className="text-sm font-semibold text-ras-charcoal uppercase tracking-wider text-[11px]">
                    {cred.label}
                  </h4>
                  <p className="text-xs text-ras-grey leading-normal font-light">
                    {cred.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Narrative / Vision Quote Block */}
        {quote?.text && (
          <div className="max-w-5xl mx-auto mt-24 text-center border-t border-ras-grey/10 pt-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl font-extralight text-ras-charcoal leading-relaxed text-balance"
            >
              &ldquo;{quote.text}&rdquo;
            </motion.p>
            <span className="text-[10px] font-bold text-ras-goldInk uppercase tracking-[0.25em] mt-6 block">
              {quote.author}
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
