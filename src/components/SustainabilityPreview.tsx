"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Wind, Zap, Leaf } from "lucide-react";

const features = [
  {
    icon: Sun,
    title: "Renewable Energy",
    description: "Solar PV systems designed and installed to maximize clean energy generation for commercial and residential sectors.",
  },
  {
    icon: Wind,
    title: "Wind Energy",
    description: "Wind turbine integration and hybrid energy solutions for coastal and industrial zones across the UAE.",
  },
  {
    icon: Zap,
    title: "Future Energy Technologies",
    description: "Green hydrogen readiness, battery storage systems, and next-generation grid integration solutions.",
  },
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    description: "Commitment to reducing carbon emissions and supporting the UAE Energy Strategy 2050 clean energy targets.",
  },
];

export default function SustainabilityPreview() {
  return (
    <section className="py-24 bg-ras-green relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(197,168,128,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-ras-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            Sustainability
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-5">
            Powering a <span className="text-ras-gold">Sustainable</span> Future
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our commitment to clean energy and environmental stewardship drives every project we deliver across the UAE and beyond.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-ras-gold/20 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-ras-gold/10 flex items-center justify-center mb-5 group-hover:bg-ras-gold/20 transition-colors">
                <feature.icon className="h-6 w-6 text-ras-gold" />
              </div>
              <h3 className="text-white font-semibold text-lg tracking-tight mb-2">
                {feature.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/sustainability"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-ras-gold text-ras-charcoal font-semibold text-sm rounded-full hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            Learn More About Sustainability
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
