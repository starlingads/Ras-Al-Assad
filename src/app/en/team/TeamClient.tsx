"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Users, Star, Award } from "lucide-react";

const teamMembers = [
  {
    name: "Mr. Navas Komu",
    role: "Managing Director",
    image: "/assets/Team/Navas Komu.jpg",
    bio: "Visionary leader driving the strategic direction of Ras Al Assad Electromechanical Works. With extensive industrial leadership in the UAE, Mr. Navas Komu has successfully steered the company from a localized facility contractor into a premier DEWA-certified Solar EPC and MEP powerhouse, prioritizing grid safety, commercial integrity, and sustainable growth.",
    stats: "15+ Years UAE Leadership",
    accreditation: "Strategic Vision & Board Head"
  },
  {
    name: "Mr. Muhammed Suhail",
    role: "Director & Project Head",
    image: "/assets/Team/MUHAMMED SUHAIL.jpg",
    bio: "Director and technical strategist heading all major electromechanical and infrastructure project executions. Mr. Suhail combines engineering discipline with executive oversight, ensuring high-voltage cabling systems, solar PV plants, and HVAC networks satisfy DEWA, Dubai Municipality, and Etihad ESCO audit benchmarks.",
    stats: "12+ Years Technical Direction",
    accreditation: "Engineering & Procurement Head"
  },
  {
    name: "Mr. Stalin Sebastian",
    role: "Senior Projects Manager / Senior MEP & Solar Engineer",
    image: "/assets/Team/STALIN SEBASTAIN.jpg",
    bio: "Technical core engineer responsible for managing on-site MEP systems and solar PV infrastructure. Mr. Stalin handles engineering designs, authority connection permits, procurement synchronization, and quality-safety audits. He has successfully overseen Shams Dubai grid integrations and large-scale Etihad ESCO villa installations.",
    stats: "10+ Years Project Management",
    accreditation: "Senior MEP & Solar Authority"
  },
  {
    name: "Mr. Shamnas MN",
    role: "Electrical & Solar Engineer",
    image: "/assets/Team/SHAMNAS MN.jpg",
    bio: "Electrical engineer managing Solar PV system drawings, load schedules, and local utility regulatory approvals. Mr. Shamnas Mn coordinates connection inspections and ensures that active Solar net-metering schemes are designed and commissioned to the highest standards of safety and efficiency.",
    stats: "8+ Years Electrical Engineering",
    accreditation: "DEWA Shams Certified Expert"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function TeamPage() {
  return (
    <div className="bg-ras-light min-h-screen pb-24 overflow-hidden relative">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0F2747]">
          <Image
            src="/assets/Projects/SINGAPORE  PAVILION_x4.jpg"
            alt="Ras Al Assad leadership and technical team"
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
            Engineering Performance. Delivering Reliability.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB8857] via-[#D4B282] to-[#AB8857]">
              Leadership
            </span>{' '}
            &amp; Technical Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed"
          >
            MEP infrastructure and renewable energy require absolute precision. Our leadership and engineering specialists bring together over a decade of UAE grid-compliant delivery.
          </motion.p>
        </div>
      </section>

      <div className="wrapper max-w-7xl mx-auto px-6 relative z-10 pt-16">

        {/* MD Message / Spotlight Quote Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white border border-ras-grey/10 rounded-[32px] p-8 md:p-14 mb-24 overflow-hidden group shadow-sm"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-ras-gold/5 rounded-full blur-[80px] group-hover:bg-ras-gold/10 transition-all duration-700 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <Star className="h-8 w-8 text-ras-gold fill-ras-gold mx-auto" />
            <blockquote className="text-xl md:text-2xl font-light leading-relaxed italic text-ras-charcoal/85">
              "At Ras Al Assad, our mission is not simply to build, but to engineer performance that lasts. We believe that clean energy and robust mechanical infrastructure are the foundations of Dubai's future. Our team executes every solar panel array, every electrical substation, and every district cooling line with strict safety compliance, technical transparency, and a commitment to long-term value."
            </blockquote>
            <div className="pt-2">
              <p className="text-lg font-bold text-ras-gold leading-none">Mr. Navas Komu</p>
              <p className="text-xs uppercase text-ras-grey tracking-wider mt-1.5">Managing Director, Ras Al Assad Electromechanical Works</p>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Staggered Team Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12"
        >
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-white border border-ras-grey/10 rounded-[32px] overflow-hidden hover:border-ras-gold/30 transition-all duration-500 hover:shadow-xl flex flex-col lg:flex-row group shadow-sm"
            >
              {/* Member Photo Block */}
              <div className="relative lg:w-96 aspect-square lg:aspect-auto lg:h-auto min-h-[320px] overflow-hidden bg-ras-sand/30 flex-shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/80 pointer-events-none" />
              </div>

              {/* Member Info Block */}
              <div className="p-8 md:p-12 flex flex-col justify-between flex-grow">
                <div className="space-y-6">
                  {/* Name and Role */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ras-grey/10 pb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-ras-charcoal group-hover:text-ras-gold transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-ras-gold font-bold text-sm tracking-wide uppercase mt-1">
                        {member.role}
                      </p>
                    </div>
                    {/* Badge */}
                    <div className="px-3.5 py-1.5 rounded-full bg-ras-sand/50 border border-ras-grey/10 flex items-center gap-1.5 text-xs text-ras-gold font-semibold self-start md:self-center">
                      <Award className="h-3.5 w-3.5" />
                      <span>{member.accreditation}</span>
                    </div>
                  </div>

                  {/* Biography */}
                  <p className="text-sm text-ras-grey leading-relaxed font-normal">
                    {member.bio}
                  </p>
                </div>

                {/* Bottom stats/badges */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-ras-grey/10 text-xs text-ras-grey font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4.5 w-4.5 text-ras-gold" />
                    <span>{member.stats}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </div>
  );
}
