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
    <div className="bg-ras-charcoal text-white min-h-screen pt-28 pb-24 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,168,128,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(30,59,50,0.1),transparent_50%)] pointer-events-none" />

      <div className="wrapper max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Page Hero Title */}
        <div className="max-w-3xl mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-ras-gold text-xs font-bold uppercase tracking-[0.25em] mb-4 block"
          >
            Engineering Performance. Delivering Reliability.
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-light tracking-tightest leading-tight mb-6"
          >
            Our <span className="text-ras-gold">Leadership</span> & Technical Team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ras-light/70 text-lg leading-relaxed font-normal"
          >
            MEP infrastructure and renewable energy require absolute precision. Our leadership and engineering specialists bring together over a decade of UAE grid-compliant delivery, ensuring performance and compliance are built into every project.
          </motion.p>
        </div>

        {/* MD Message / Spotlight Quote Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-14 mb-24 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-ras-gold/5 rounded-full blur-[80px] group-hover:bg-ras-gold/10 transition-all duration-700 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* MD Photo Spot */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-ras-gold/30 shadow-2xl scale-98 group-hover:scale-100 transition-transform duration-700">
                <Image
                  src="/assets/Team/Navas Komu.jpg"
                  alt="Mr. Navas Komu MD"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Quote Copy */}
            <div className="lg:col-span-8 space-y-6">
              <Star className="h-8 w-8 text-ras-gold fill-ras-gold" />
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed italic text-white/90">
                "At Ras Al Assad, our mission is not simply to build, but to engineer performance that lasts. We believe that clean energy and robust mechanical infrastructure are the foundations of Dubai's future. Our team executes every solar panel array, every electrical substation, and every district cooling line with strict safety compliance, technical transparency, and a commitment to long-term value."
              </blockquote>
              <div className="pt-2">
                <p className="text-lg font-bold text-ras-gold leading-none">Mr. Navas Komu</p>
                <p className="text-xs uppercase text-white/50 tracking-wider mt-1.5">Managing Director, Ras Al Assad Electromechanical Works</p>
              </div>
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
              className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-ras-gold/30 transition-all duration-500 hover:shadow-2xl flex flex-col lg:flex-row group"
            >
              {/* Member Photo Block */}
              <div className="relative lg:w-96 aspect-square lg:aspect-auto lg:h-auto min-h-[320px] overflow-hidden bg-ras-charcoal flex-shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ras-charcoal/90 pointer-events-none" />
              </div>

              {/* Member Info Block */}
              <div className="p-8 md:p-12 flex flex-col justify-between flex-grow">
                <div className="space-y-6">
                  {/* Name and Role */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-ras-gold transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-ras-gold font-bold text-sm tracking-wide uppercase mt-1">
                        {member.role}
                      </p>
                    </div>
                    {/* Badge */}
                    <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 text-xs text-ras-gold font-semibold self-start md:self-center">
                      <Award className="h-3.5 w-3.5" />
                      <span>{member.accreditation}</span>
                    </div>
                  </div>

                  {/* Biography */}
                  <p className="text-sm text-ras-light/75 leading-relaxed font-normal">
                    {member.bio}
                  </p>
                </div>

                {/* Bottom stats/badges */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10 text-xs text-white/50 font-bold uppercase tracking-wider">
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
