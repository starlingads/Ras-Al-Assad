"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Sun, 
  Settings, 
  Wind, 
  Cpu, 
  Wrench, 
  ArrowRight,
  TrendingUp,
  FileCheck,
  Zap,
  Activity,
  Combine
} from "lucide-react";

export default function ServicesPage() {
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

  const services = [
    {
      id: "solar-epc",
      icon: Sun,
      title: "Solar PV EPC Contracts",
      subtitle: "Turnkey Solar Engineering & Construction",
      tagline: "DEWA Shams Certified grid-tied setups",
      description: "We provide complete end-to-end solar EPC (Engineering, Procurement, and Construction) services for commercial warehouses, industrial parks, and luxury villas. From structural engineering audits and solar PV layout drafting to obtaining official DEWA connection permissions, we manage every detail.",
      highlights: [
        "High-efficiency Tier-1 Solar PV modules",
        "DEWA solar net-metering grid connection approvals",
        "Industrial structural load analysis & engineering seals",
        "Optimized rooftop, carport, and ground-mount configurations"
      ],
      image: "/assets/Projects/SINGAPORE  PAVILION_x4.jpg"
    },
    {
      id: "mep",
      icon: Settings,
      title: "Electromechanical Works (MEP)",
      subtitle: "Integrated HVAC, Electrical, and Piping Solutions",
      tagline: "High-spec engineering compliance",
      description: "Our core electromechanical division offers elite installation, auditing, and maintenance of comprehensive building systems. We work closely with real estate developers and general contractors to coordinate electrical feeds, hydraulic plumbing, and building management systems (BMS).",
      highlights: [
        "High-voltage electrical switchgear and distribution",
        "Complex plumbing networks and rainwater drainage",
        "Fire-fighting systems & civil defense authority approvals",
        "Smart building automation (BMS) integration"
      ],
      image: "/assets/Projects/adnoc-substation-infrastructure-projects.jpg"
    },
    {
      id: "hvac",
      icon: Wind,
      title: "HVAC Engineering & Cooling",
      subtitle: "District Cooling & Industrial HVAC Solutions",
      tagline: "Optimized thermal management systems",
      description: "In the intense Middle Eastern climate, optimal climate control is a necessity. RAAEW engineers supply high-efficiency chiller plants, VRF (Variable Refrigerant Flow) setups, and ducted central air systems. We reduce annual thermal electricity loads through precision airflow calculation.",
      highlights: [
        "Chilled water district cooling integrations",
        "VRF (Variable Refrigerant Flow) luxury setups",
        "Industrial ducting fabrication and acoustic isolation",
        "Indoor air quality (IAQ) HEPA filtration systems"
      ],
      image: "/assets/Projects/SOBHA HEARTLAND.jpg"
    },
    {
      id: "substations",
      icon: Cpu,
      title: "Substations & Infrastructure",
      subtitle: "Medium-Voltage to High-Voltage Power Engineering",
      tagline: "Critical electrical grid infrastructure",
      description: "We design, install, and commission electrical substations (11kV to 132kV) for heavy industrial plants and large community hubs. Our specialists ensure total grid compliance, deploying durable transformers, ring main units (RMUs), and protection systems.",
      highlights: [
        "11kV & 33kV distribution substation construction",
        "Transformer design, installation, and dielectric testing",
        "Power factor correction (PFC) banks",
        "Underground cabling networks and earth-grid protection"
      ],
      image: "/assets/Projects/substation-engineering.jpg"
    },
    {
      id: "om",
      icon: Wrench,
      title: "Operations & Maintenance (O&M)",
      subtitle: "24/7 Asset Performance Monitoring & Upkeep",
      tagline: "Protecting and optimizing long-term yields",
      description: "Maximize your solar system output and MEP reliability with our elite Annual Maintenance Contracts (AMC). We deploy thermal drone imaging, active smart-dashboard monitors, and environmental sensors to prevent breakdowns and guarantee high asset productivity.",
      highlights: [
        "Automated solar cleaning cycles & debris removal",
        "Thermal imaging checks to identify micro-cracks",
        "Emergency MEP dispatching and immediate replacement",
        "Monthly efficiency reports and performance indexing"
      ],
      image: "/assets/Projects/operations-maintenance.jpg"
    },
    {
      id: "wind-energy",
      icon: Combine,
      title: "Wind Energy Solutions",
      subtitle: "Renewable Wind Power & Hybrid Energy Systems",
      tagline: "Next-generation renewable infrastructure",
      description: "As the GCC accelerates its diversification beyond solar, Ras Al Assad is expanding into wind energy engineering. Our electromechanical expertise positions us to deliver turbine engineering, hybrid solar-wind systems, and grid-connected wind infrastructure — powering the region's transition to a diversified renewable energy future.",
      highlights: [
        "Wind Energy Systems & Turbine Engineering",
        "Renewable Energy Infrastructure",
        "Hybrid Energy Solutions (Solar + Wind)",
        "Future Energy Integration & Grid Connection"
      ],
      image: "/assets/Projects/wind-energy-service.png"
    }
  ];

  return (
    <div className="bg-ras-light min-h-screen pt-[76px] lg:pt-[80px]">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src="/assets/Projects/SOBHA HEARTLAND.jpg"
            alt="Ras Al Assad solar PV and electromechanical services"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Premium Black Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 to-black/55" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pb-16 pt-40 w-full">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#AB8857] mb-4 block"
          >
            What We Do
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB8857] via-[#D4B282] to-[#AB8857]">
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed"
          >
            Comprehensive electromechanical engineering and renewable energy solutions — from solar EPC and HVAC systems to substations and wind energy infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Luxury Services Anchor Listing */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto space-y-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div 
                key={service.id} 
                id={service.id} 
                className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Service Visual representation */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl group"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal/50 via-transparent to-transparent opacity-60" />
                    
                    {/* Brand floating category tag */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-ras-sand/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ras-gold">RAAEW Engineering</span>
                    </div>
                  </motion.div>
                </div>

                {/* Service Details and bullets */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"} space-y-6`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-ras-gold/10 text-ras-gold flex items-center justify-center mb-2">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-ras-gold block">
                      {service.tagline}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ras-charcoal tracking-tight">
                      {service.title}
                    </h2>
                    <h4 className="text-sm font-semibold text-ras-grey uppercase tracking-wide">
                      {service.subtitle}
                    </h4>
                    <p className="text-sm md:text-base text-ras-grey leading-relaxed">
                      {service.description}
                    </p>

                    <div className="h-[1px] bg-ras-grey/10 my-6" />

                    <ul className="grid grid-cols-1 gap-3">
                      {service.highlights.map((bullet, i) => (
                        <li key={i} className="flex items-start text-sm text-ras-charcoal">
                          <span className="w-2 h-2 rounded-full bg-ras-gold mt-1.5 mr-3 flex-shrink-0" />
                          <span className="leading-tight">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6">
                      <Link
                        href="/contact"
                        className="inline-flex items-center text-sm font-bold text-ras-gold hover:text-ras-charcoal transition-colors group"
                      >
                        Request engineering audit
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sustainable Zero-CAPEX Solar Lease Highlight */}
      <section className="px-6 lg:px-8 py-24 bg-ras-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="solar-grid-lease" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#solar-grid-lease)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-ras-gold block">
            Zero-CAPEX Solar Leases
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Go Solar with Zero Capital Investment
          </h2>
          <p className="text-base md:text-lg text-ras-light/75 max-w-3xl mx-auto leading-relaxed">
            In alliance with leading Gulf investment banks, RAAEW offers fully funded **Solar Power Purchase Agreements (PPAs)**. We build, own, and maintain a solar system on your warehouse rooftop, billing you a low electricity tariff up to 40% cheaper than grid rates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-6 text-left">
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <TrendingUp className="h-5 w-5 text-ras-gold mb-3" />
              <h5 className="font-bold text-sm">No Initial Outlay</h5>
              <p className="text-xs text-ras-light/70 mt-1">We fund 100% of engineering, hardware, and grid connection.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <FileCheck className="h-5 w-5 text-ras-gold mb-3" />
              <h5 className="font-bold text-sm">Immediate Opex Drops</h5>
              <p className="text-xs text-ras-light/70 mt-1">Reduce monthly energy charges from the very first day of activation.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <Activity className="h-5 w-5 text-ras-gold mb-3" />
              <h5 className="font-bold text-sm">O&M Covered</h5>
              <p className="text-xs text-ras-light/70 mt-1">Includes 20 years of complimentary cleanings and technical maintenance.</p>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/solar-calculator"
              className="px-8 py-4 bg-ras-gold text-ras-charcoal text-sm font-bold rounded-full hover:bg-white hover:text-ras-charcoal transition-all duration-300 inline-block shadow-lg"
            >
              Calculate Solar Payback
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
