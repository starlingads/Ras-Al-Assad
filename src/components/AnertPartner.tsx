"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface AnertPartnerProps {
  variant?: "light" | "dark";
}

export default function AnertPartner({ variant = "light" }: AnertPartnerProps) {
  const isDark = variant === "dark";

  return (
    <section className={`py-20 px-6 ${isDark ? "bg-ras-charcoal" : "bg-white"}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto"
      >
        <div className={`flex flex-col md:flex-row items-center gap-10 p-10 md:p-14 rounded-3xl border ${
          isDark 
            ? "bg-white/5 border-white/10" 
            : "bg-ras-sand/50 border-ras-sand"
        }`}>
          {/* ANERT Logo */}
          <div className="flex-shrink-0">
            <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden p-4 ${
              isDark ? "bg-white/10" : "bg-white"
            } shadow-sm`}>
              <Image
                src="/assets/Logos/Anert.png"
                alt="ANERT - Agency for New and Renewable Energy Research and Technology"
                fill
                className="object-contain p-3"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-ras-gold text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
              Supporting Partner
            </span>
            <h3 className={`font-display text-2xl md:text-3xl font-semibold tracking-tight mb-4 ${
              isDark ? "text-white" : "text-ras-charcoal"
            }`}>
              ANERT Partnership
            </h3>
            <p className={`text-sm md:text-base leading-relaxed max-w-xl ${
              isDark ? "text-white/70" : "text-ras-charcoal/70"
            }`}>
              Ras Al Assad is a recognized partner of the Agency for New and Renewable Energy Research and Technology (ANERT), reinforcing our commitment to advancing renewable energy technologies and sustainable development across the region.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
