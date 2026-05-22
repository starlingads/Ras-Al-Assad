"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Cpu, Wind, Zap, MapPin, Calendar, Award, CheckCircle, X } from "lucide-react";

// Project Data
const projects = [
  {
    id: 1,
    name: "Singapore Pavilion, Expo 2020 Dubai",
    category: "mep",
    image: "/assets/Ras Images/REMASTERED/SINGAPORE  PAVILION_x4.jpg",
    location: "Expo City, Dubai, UAE",
    client: "Government of Singapore / Expo Commission",
    capacity: "209 kWp Solar PV + Complete Pavilion MEP Integration",
    year: "2021",
    status: "Completed & Commissioned",
    highlights: [
      "Designed and installed net-zero building integration solar PV canopy.",
      "Provided high-end mechanical ventilation and multi-zone HVAC cooling networks.",
      "Completed grid synchronization and DEWA sub-metering systems under tight EXPO deadlines.",
      "Recognized with gold awards for outstanding sustainability integration and engineering safety."
    ]
  },
  {
    id: 2,
    name: "PNCA-SOBHA HARTLAND-2 Solar PV",
    category: "solar",
    image: "/assets/Ras Images/REMASTERED/SOBHA HEARTLAND.jpg",
    location: "Sobha Hartland, Dubai, UAE",
    client: "Sobha Group / Etihad ESCO",
    capacity: "376.2 kWp Rooftop Solar PV System",
    year: "2025",
    status: "Completed & Operational",
    highlights: [
      "Turnkey solar EPC deployment across premium residential villas and community complexes.",
      "Structured low-voltage power networks and automatic transfer panels.",
      "Achieved DEWA Net Metering approval in record time under Shams Dubai.",
      "Provides estimated annual electricity savings of over 25% for residents."
    ]
  },
  {
    id: 3,
    name: "ADNOC Substation & Infrastructure Projects",
    category: "substation",
    image: "/assets/Ras Images/REMASTERED/WhatsApp Image 2026-03-03 at 3_x4.07.35 PM (1).jpg",
    location: "Al Ruwais, Abu Dhabi, UAE",
    client: "ADNOC / Infrastructure Division",
    capacity: "Medium & High Voltage Substation Support",
    year: "2024",
    status: "Completed & Under AMC",
    highlights: [
      "Mounted high-voltage transformer units and cable containment assemblies.",
      "Performed structural modifications and substation earth-grid connections.",
      "Completed HV termination and jointing, strictly adhering to ADNOC safety regulations.",
      "Installed smart power distribution and automatic fire safety systems."
    ]
  },
  {
    id: 4,
    name: "HSBC Jebel Ali Solar PV Complex",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.33 PM.jpeg",
    location: "Jafza Gate 3, Dubai, UAE",
    client: "HSBC Middle East / Facilities Management",
    capacity: "300 kWp Commercial Rooftop Array",
    year: "2023",
    status: "Completed & Maintained",
    highlights: [
      "Turnkey design and construction of commercial rooftop solar PV arrays.",
      "Integrated high-efficiency solar inverters and grid-protection switchgears.",
      "Achieved DEWA grid connection and net metering approval under Shams Dubai.",
      "Offsets over 250 tons of carbon emissions annually for the Jafza complex."
    ]
  },
  {
    id: 5,
    name: "Dubai Government 5000 Villas Roof Solar",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.35 PM (1).jpeg",
    location: "Mizhar, Muhaisnah & Qusais, Dubai, UAE",
    client: "Etihad ESCO / DEWA",
    capacity: "2.145 MWp Distributed Rooftop Solar PV",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Solar integration across thousands of Dubai Government residential villas.",
      "Deployed high-efficiency monocrystalline solar modules and smart micro-inverters.",
      "Achieved simultaneous multi-site DEWA grid synchronization under Shams Dubai.",
      "Designed high-safety rooftop structural framing for extreme wind speed ratings."
    ]
  },
  {
    id: 6,
    name: "Al Garhoud Grid Substation Support",
    category: "substation",
    image: "/assets/Ras Images/REMASTERED/WhatsApp Image 2026-03-03 at 3_x16.07.33 PM (1).jpg",
    location: "Al Garhoud, Dubai, UAE",
    client: "Municipal Utilities & Infrastructure Development / DEWA",
    capacity: "132 kV / 11 kV Substation Works",
    year: "2024",
    status: "Completed & Operational",
    highlights: [
      "Executed heavy equipment shifting, transformer foundations, and containment arrays.",
      "Completed HV termination and jointing, strictly adhering to DEWA regulations.",
      "Performed structural modifications and substation earth-grid connections.",
      "Achieved zero-accident, zero-downtime delivery on active utility grid."
    ]
  },
  {
    id: 7,
    name: "Blue Deebaj FZCO Industrial Solar",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.32 PM (1).jpeg",
    location: "Jafza, Jebel Ali, Dubai, UAE",
    client: "Blue Deebaj FZCO",
    capacity: "294 kWp Industrial Rooftop Array",
    year: "2026",
    status: "Completed & Connected",
    highlights: [
      "Completed full engineering, structural roof load assessments, and racking installation.",
      "Deployed high-efficiency monocrystalline bifacial solar modules.",
      "Wired industrial-grade inverters and completed Shams Dubai net-metering synchronization.",
      "Eliminates approximately 250 tons of carbon dioxide per year."
    ]
  },
  {
    id: 8,
    name: "Dubai South District Cooling Network",
    category: "hvac",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.38 PM.jpeg",
    location: "Dubai South Industrial District, UAE",
    client: "Dubai South Development Consortium",
    capacity: "2.5km Pre-insulated Pipe Grid & District Loop",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Laid heavy-duty 600mm pre-insulated district cooling supply pipes.",
      "Welded, non-destructively tested, and insulated all underground joints.",
      "Constructed mechanical chamber stations and integrated automated flow bypass control valves.",
      "Successfully commissioned under peak summer ground temperatures of 45°C."
    ]
  },
  {
    id: 9,
    name: "Camelicious Solar PV Facility",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.31 PM (1).jpeg",
    location: "Umm Nahad, Dubai, UAE",
    client: "Camelicious (Emirates Industry for Camel Milk)",
    capacity: "56 kWp Behind-the-Meter Solar PV",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Installed behind-the-meter solar arrays on factory rooftops.",
      "Deployed hybrid solar inverters for battery storage readiness.",
      "Achieved Dubai Municipality and DEWA safety approvals.",
      "Integrates smart web-based remote performance monitoring systems."
    ]
  },
  {
    id: 10,
    name: "Chalhoub Group Head Office Solar & MEP",
    category: "mep",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.36 PM.jpeg",
    location: "Jebel Ali Free Zone, Dubai, UAE",
    client: "Chalhoub Group",
    capacity: "Commercial Solar PV & Electromechanical Integration",
    year: "2024",
    status: "Completed & Maintained",
    highlights: [
      "Designed energy-efficient solar PV installation for corporate headquarters.",
      "Upgraded MEP systems including energy-saving smart HVAC controls.",
      "Integrated advanced building energy management systems (BEMS).",
      "Successfully achieved LEED Gold standard compliance for electromechanical retrofits."
    ]
  },
  {
    id: 11,
    name: "Al Habtoor Al Quoz Solar PV",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.34 PM.jpeg",
    location: "Al Quoz Industrial Area, Dubai, UAE",
    client: "Al Habtoor Group",
    capacity: "485.19 kWp Rooftop Solar PV System",
    year: "2024",
    status: "Completed & Commissioned",
    highlights: [
      "Executed full turnkey rooftop solar design, grid synchronization, and structural reinforcing.",
      "Installed premium Tier-1 monocrystalline PV modules and smart central inverters.",
      "Successfully synchronized with the DEWA distribution network under Shams Dubai regulations.",
      "Provides over 720 MWh of clean, cost-effective energy annually for industrial operations."
    ]
  },
  {
    id: 12,
    name: "Euro Emirates DIP Solar PV",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.37 PM.jpeg",
    location: "Dubai Investments Park (DIP), Dubai, UAE",
    client: "Euro Emirates LLC",
    capacity: "89.4 kWp Commercial Rooftop Array",
    year: "2023",
    status: "Completed & Maintained",
    highlights: [
      "Installed high-efficiency commercial rooftop solar PV array to support corporate operations.",
      "Designed lightweight structural mounting and cable management layouts for extreme weather.",
      "Completed grid integration, DEWA metering setup, and compliance check approvals.",
      "Substantially reduced peak-hour building energy consumption and grid dependence."
    ]
  },
  {
    id: 13,
    name: "Emirates Hills Premium Solar PV",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.39 PM (1).jpeg",
    location: "Emirates Hills, Dubai, UAE",
    client: "Wattz Energy Solutions (for Private Client)",
    capacity: "41.3 kWp Residential Rooftop Solar",
    year: "2024",
    status: "Completed & Operational",
    highlights: [
      "Custom engineered luxury residential rooftop solar installation integrated seamlessly with villa architecture.",
      "Deployed ultra-low-profile black-frame solar panels for premium aesthetic continuity.",
      "Wired smart energy storage system interface for zero-downtime battery backup readiness.",
      "Achieved full DEWA Shams Dubai net metering connection approval."
    ]
  },
  {
    id: 14,
    name: "Dubai Living Legends Solar PV",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.29 PM.jpeg",
    location: "Living Legends, Dubailand, Dubai, UAE",
    client: "Wattz Energy Solutions",
    capacity: "12.34 kWp Residential Solar Integration",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Designed and installed compact high-output residential solar PV array.",
      "Provided smart energy monitoring solutions for active household consumption tracking.",
      "Implemented safety isolators and rapid-shutdown systems fully compliant with DEWA.",
      "Helped client offset over 10 tons of carbon dioxide emissions per year."
    ]
  },
  {
    id: 15,
    name: "Dubai Hills Luxury Villa Solar PV",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.30 PM.jpeg",
    location: "Dubai Hills Estate, Dubai, UAE",
    client: "Private Residence / Wattz Energy",
    capacity: "14.82 kWp Rooftop Solar Installation",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Turnkey engineering and installation of residential solar PV system on premium villa roofs.",
      "Deployed high-performance monocrystalline panels and micro-inverter topology.",
      "Coordinated with Dubai Hills developers for architectural and aesthetic structural clearance.",
      "Provides active net metering solar feedback directly to DEWA grid."
    ]
  },
  {
    id: 16,
    name: "ADNOC Al-Qusais Service Station Solar",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.35 PM.jpeg",
    location: "Al-Qusais, Dubai, UAE",
    client: "ADNOC / Infrastructure Division",
    capacity: "94 kWp Rooftop Solar PV Installation",
    year: "2024",
    status: "Completed & Maintained",
    highlights: [
      "Turnkey solar EPC deployment for fuel service station canopy and facility rooftops.",
      "Engineered specialized explosion-proof cabling pathways and heavy-duty hazard safety switches.",
      "Completed grid synchronization under DEWA Shams Dubai, optimizing operational running costs.",
      "Provides zero-emissions daytime energy to power station pumps and convenience stores."
    ]
  },
  {
    id: 17,
    name: "ADNOC DIP Service Station Solar",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.36 PM.jpeg",
    location: "Dubai Investments Park (DIP), Dubai, UAE",
    client: "ADNOC",
    capacity: "114 kWp Solar Canopy Integration",
    year: "2024",
    status: "Completed & Operational",
    highlights: [
      "Designed and constructed high-efficiency canopy-integrated solar array.",
      "Installed heavy-duty outdoor-rated inverters and safety isolators compliant with ADNOC codes.",
      "Coordinated with DEWA for fast-track inspection and meter synchronization.",
      "Supports green energy targets for corporate retail and customer charging infrastructure."
    ]
  },
  {
    id: 18,
    name: "Chalhoub Umm Eselay Solar PV",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.32 PM.jpeg",
    location: "Umm Eselay, Dubai, UAE",
    client: "Chalhoub Group",
    capacity: "91 kWp Agricultural & Commercial Solar",
    year: "2024",
    status: "Completed & Operational",
    highlights: [
      "Turnkey solar EPC deployment supporting off-main agricultural operations and facility services.",
      "Designed custom mounting racks to withstand sand accumulation and high wind shear.",
      "Integrated smart battery storage chargers and emergency automatic grid bypass transfers.",
      "Provides robust, sustainable power supply reducing generator diesel reliance."
    ]
  },
  {
    id: 19,
    name: "DSO High-Tech Office Complex Solar Canopy",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.33 PM (1).jpeg",
    location: "Dubai Silicon Oasis (DSO), Dubai, UAE",
    client: "Silicon Oasis Authority / Etihad ESCO",
    capacity: "450 kWp Commercial Carport Solar Canopy",
    year: "2025",
    status: "Completed & Operational",
    highlights: [
      "Turnkey design and structural installation of aesthetic commercial carport structures.",
      "Deployed smart high-efficiency monocrystalline solar panels with integrated LED lighting networks.",
      "Coordinated with Dubai Silicon Oasis authority for fast-track permit and planning clearance.",
      "Provides shade for over 150 executive parking slots while offsetting building air-conditioning grids."
    ]
  },
  {
    id: 20,
    name: "Muhaisnah Commercial HVAC Retrofit",
    category: "hvac",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.35 PM.jpeg",
    location: "Muhaisnah 4, Dubai, UAE",
    client: "Al Futtaim Real Estate / Etihad ESCO",
    capacity: "1,200 TR Central Cooling & VRF Retrofit",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Removed aging reciprocating chillers and installed premium high-efficiency variable speed screw chillers.",
      "Replaced ducted HVAC networks and installed smart multi-zone thermostatic controls.",
      "Reduced building energy metrics by 28% under Etihad ESCO energy saving criteria.",
      "Successfully commissioned during off-peak night shifts to prevent commercial business disruptions."
    ]
  },
  {
    id: 21,
    name: "Jebel Ali Phase 2 Underground Water Grid",
    category: "mep",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.38 PM (1).jpeg",
    location: "Jafza North, Dubai, UAE",
    client: "DP World / Facilities Management",
    capacity: "1.8km High-Density Polyethylene (HDPE) Hydraulic Loop",
    year: "2024",
    status: "Completed & Commissioned",
    highlights: [
      "Excavated, welded, and pressure-tested heavy-duty 400mm HDPE primary water distribution loops.",
      "Constructed mechanical chambers with integrated smart backflow preventers and bypass isolation valves.",
      "Complied with DP World engineering and Dubai Municipality safety and environmental specifications.",
      "Ensured zero-impact bypass flows for neighboring logistics warehouses during construction."
    ]
  },
  {
    id: 22,
    name: "Wattz Energy Residential Solar Cluster",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.39 PM.jpeg",
    location: "Emirates Hills Sector E, Dubai, UAE",
    client: "Wattz Energy / Private Residential Clients",
    capacity: "185 kWp Distributed Luxury Villa Solar Grid",
    year: "2024",
    status: "Completed & Operational",
    highlights: [
      "Custom engineered residential rooftop solar installations integrated with Spanish style roof tiles.",
      "Utilized premium low-reflection all-black solar modules to satisfy community aesthetic guidelines.",
      "Wired individual grid-synchronized micro-inverters with smartphone analytics for residents.",
      "Fully approved by DEWA under Shams Dubai initiative for active net metering rebates."
    ]
  },
  {
    id: 23,
    name: "Mirdif Private Villa Architectural Solar PV",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.40 PM.jpeg",
    location: "Mirdif Hills, Dubai, UAE",
    client: "Private Client / Residential Development",
    capacity: "35 kWp Custom Roof-Integrated Solar Array",
    year: "2025",
    status: "Completed & Operational",
    highlights: [
      "Engineered a lightweight custom aluminum frame to mount solar PV panels on a multi-tier pitched roof.",
      "Integrated smart performance optimizer modules to bypass shade from neighboring palm canopies.",
      "Designed and certified structural wind loads up to 160 km/h with local municipality engineering seal.",
      "Reduced monthly utility grid dependence for the luxury residential villa by over 45% annually."
    ]
  },
  {
    id: 24,
    name: "Dubai Healthcare City HVAC Air Ducts",
    category: "hvac",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.41 PM.jpeg",
    location: "Healthcare City Phase 1, Dubai, UAE",
    client: "Mediclinic Hospital Group",
    capacity: "Precision HEPA Filtration Air Ducts & AHU Integration",
    year: "2024",
    status: "Completed & Approved",
    highlights: [
      "Fabricated and installed antimicrobial galvanized sheet metal HVAC ducts with acoustic liners.",
      "Integrated premium Air Handling Units (AHUs) with multi-tier HEPA filters for sterile surgery zones.",
      "Satisfied strict Dubai Health Authority (DHA) and international hospital sanitation requirements.",
      "Conducted thorough smoke testing and visual airflow monitoring validation under active supervision."
    ]
  },
  {
    id: 25,
    name: "Sobha Heartland Community Infrastructure",
    category: "mep",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.29 PM (1).jpeg",
    location: "Sobha Hartland Phase 1, Dubai, UAE",
    client: "Sobha Group / Infrastructure Division",
    capacity: "Complete Subterranean Drainage & Storm Water Grid",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Laid heavy-duty reinforced concrete drainage pipes and constructed stormwater collection pits.",
      "Integrated dynamic gravity-flow drainage networks aligned with master planning level surveys.",
      "Coordinated with Dubai Municipality for structural alignment clearance and main outfall hookups.",
      "Successfully tested under simulated extreme rainfall scenarios using high-volume utility pumps."
    ]
  },
  {
    id: 26,
    name: "DIP Warehouse Industrial Solar Upgrade",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.31 PM.jpeg",
    location: "Dubai Investments Park (DIP) 2, Dubai, UAE",
    client: "Logistics Hub International",
    capacity: "540 kWp Rooftop Solar PV Installation",
    year: "2025",
    status: "Completed & Synchronized",
    highlights: [
      "Strengthened light-gauge corrugated warehouse roofs with structural steel grid reinforcements.",
      "Mounted solar panels utilizing premium leak-proof trapezoidal non-penetrative clamps.",
      "Synchronized four central commercial industrial inverters directly with the main DEWA distribution grid.",
      "Provides grid safety via automatic rapid-shutdown systems fully compliant with Shams Dubai."
    ]
  },
  {
    id: 27,
    name: "Al Garhoud Utility Grid Earth Protection",
    category: "substation",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.33 PM.jpeg",
    location: "Al Garhoud, Dubai, UAE",
    client: "Municipal Utilities / Infrastructure Division",
    capacity: "132kV Substation Earth Grid Protection",
    year: "2024",
    status: "Completed & Operational",
    highlights: [
      "Drilled, laid, and welded extensive copper bonding conductor tapes to construct a secure ground grid.",
      "Installed smart lightning arrestors, surge diverters, and earth fault monitoring sensor panels.",
      "Conducted soil resistivity mapping and achieved electrical ground resistance readings below 0.5 ohms.",
      "Coordinated with main utility engineers for final high-voltage commissioning safety certification."
    ]
  },
  {
    id: 28,
    name: "Dubai South District Cooling Loop Extension",
    category: "hvac",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.34 PM.jpeg",
    location: "Dubai South Logistics District, UAE",
    client: "Dubai South Development Consortium",
    capacity: "1.2km District Chilled Water Pipe Loop",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Aligned, welded, and hydro-tested pre-insulated carbon steel underground chilled water supply pipes.",
      "Completed non-destructive radiographic weld inspections and applied polyolefin insulation wraps.",
      "Integrated automated flow control valves connected directly to the primary cooling plant SCADA grid.",
      "Ensured zero-leak reliability under high operating pressures during peak summer cooling seasons."
    ]
  },
  {
    id: 29,
    name: "Sobha Villa Central MEP Integration",
    category: "mep",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.34 PM (1).jpeg",
    location: "Sobha Hartland Forest Villas, Dubai, UAE",
    client: "Sobha Group / Residential Division",
    capacity: "Full Villa MEP, Drainage & Electrical Feeds",
    year: "2025",
    status: "Completed & Handed Over",
    highlights: [
      "Wired primary residential electrical distribution boards, low-voltage lines, and smart lighting grids.",
      "Installed plumbing supply networks, high-reliability drainage stacks, and hot water heat-pump loops.",
      "Integrated premium concealed VRF climate control networks with aesthetic linear diffuser grilles.",
      "Successfully obtained Dubai Civil Defense and Dubai Municipality safety and layout approvals."
    ]
  },
  {
    id: 30,
    name: "Garhoud Star Building Primary Feeder Switchgear",
    category: "mep",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.35 PM (1).jpeg",
    location: "Al Garhoud, Dubai, UAE",
    client: "Garhoud Star Building Management / Private Owner",
    capacity: "2,500A Main Low-Voltage (MLV) Switchgear Upgrade",
    year: "2024",
    status: "Completed & Certified",
    highlights: [
      "Rigged, positioned, and anchored a heavy-duty 2,500A MLV switchboard within the building basement.",
      "Completed main feeder copper busbar coupling, cable terminations, and insulation resistance audits.",
      "Integrated intelligent digital power meters and automatic circuit breakers for overload protection.",
      "Coordinated with DEWA for scheduled shutdown, final safety audits, and grid re-energization."
    ]
  },
  {
    id: 31,
    name: "Muhaisnah Substation Transformer Support",
    category: "substation",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.36 PM (1).jpeg",
    location: "Muhaisnah 2, Dubai, UAE",
    client: "Etihad ESCO / Utility Services",
    capacity: "11kV Grid-Connected Substation Foundations & Cabling",
    year: "2024",
    status: "Completed & Operational",
    highlights: [
      "Cast reinforced concrete transformer foundations with integrated oil containment pit sumps.",
      "Laid heavy-duty 11kV high-voltage armoured cables from the substation terminal to primary switchgears.",
      "Completed mechanical cable tray support systems and high-voltage cable termination jointing works.",
      "Satisfied DEWA Transmission division safety protocols and QA/QC inspection requirements."
    ]
  },
  {
    id: 32,
    name: "Blue Deebaj FZCO Warehouse Structural Framing",
    category: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.37 PM.jpeg",
    location: "Jafza South, Dubai, UAE",
    client: "Blue Deebaj FZCO",
    capacity: "Structural Solar Mounting Grid Reinforcement",
    year: "2026",
    status: "Completed & Operational",
    highlights: [
      "Designed and erected custom structural steel bracing grids to strengthen wide-span warehouse roofs.",
      "Conducted localized finite element structural stress audits for high-speed coastal wind loads.",
      "Installed hot-dip galvanized steel purlins and specialized aluminum racking profiles for bifacial PV.",
      "Approved by Dubai Municipality structural committee and certified by a third-party engineer."
    ]
  },
  {
    id: 33,
    name: "HSBC Jebel Ali Sub-metering Integration",
    category: "mep",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.20.38 PM.jpeg",
    location: "Jebel Ali Industrial Area, Dubai, UAE",
    client: "HSBC Middle East / Asset Management",
    capacity: "Commercial Smart Sub-metering & Panel Integration",
    year: "2024",
    status: "Completed & Operational",
    highlights: [
      "Installed forty-two digital multi-function power sub-meters across distributed commercial sub-panels.",
      "Laid shielded RS-485 communication modbus loops connecting all meters to a central SCADA network.",
      "Configured automated monthly load profile indexing and energy usage analysis dashboards.",
      "Enabled facilities management to optimize building idle load metrics and drop opex waste."
    ]
  },
  {
    id: 34,
    name: "Jafza Gate 3 Substation Busbar Alignment",
    category: "substation",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.29.30 PM.jpeg",
    location: "Jafza North, Jebel Ali, Dubai, UAE",
    client: "DP World / Infrastructure Utility Services",
    capacity: "11kV Heavy Duty Copper Busbar Alignment & Torque",
    year: "2025",
    status: "Completed & Certified",
    highlights: [
      "Aligned and coupled heavy-duty tin-plated copper busbars within active 11kV switchgear panels.",
      "Torqued all connection bolts utilizing calibrated digital torque wrenches to DP World specs.",
      "Conducted extensive contact resistance testing (ductor test) and high-voltage dielectric insulation audits.",
      "Delivered with zero-accident safety records under active DP World permit-to-work guidelines."
    ]
  },
  {
    id: 35,
    name: "DSO Substation Control Panels Array",
    category: "substation",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.29.30 PM (1).jpeg",
    location: "Dubai Silicon Oasis, Dubai, UAE",
    client: "Silicon Oasis Authority / Electrical Utilities",
    capacity: "Substation Protection, Control & SCADA Panels",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Rigged, mounted, and wired premium control panels housing digital protection relays and RTU equipment.",
      "Completed low-voltage control wire terminations and applied structured wire-identification labeling.",
      "Conducted complete secondary injection testing for overcurrent, earth fault, and differential protection.",
      "Integrated remote control signals with the master utility operations SCADA control center."
    ]
  },
  {
    id: 36,
    name: "Ruwais Infrastructure Underground Cabling Grid",
    category: "substation",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.29.31 PM.jpeg",
    location: "ADNOC Ruwais Industrial City, Abu Dhabi, UAE",
    client: "ADNOC / Infrastructure Division",
    capacity: "33kV Armoured Cabling Trenching & Laying",
    year: "2024",
    status: "Completed & Under AMC",
    highlights: [
      "Excavated structured open-cut cable trenches with specialized sand bedding and warning slab protection.",
      "Laid three runs of heavy-duty 33kV three-core armoured copper cables totaling over 2.4 kilometers.",
      "Completed specialized outdoor heat-shrink cable terminations and high-voltage VLF withstand tests.",
      "Maintained strict ADNOC petroleum safety standards and active permit-to-work procedures on-site."
    ]
  },
  {
    id: 37,
    name: "DIP Substation Switchgear Commissioning",
    category: "substation",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.29.31 PM (1).jpeg",
    location: "Dubai Investments Park, Dubai, UAE",
    client: "DIP Utilities Board / DEWA",
    capacity: "11kV Air-Insulated Switchgear (AIS) Commissioning",
    year: "2025",
    status: "Completed & Operational",
    highlights: [
      "Installed and leveled an 8-panel line of 11kV AIS switchgear with vacuum circuit breakers.",
      "Completed busbar high-potential testing, CT/VT calibration checks, and breaker timing analytics.",
      "Integrated emergency trip push buttons and interlock systems to prevent hazardous operation.",
      "Achieved DEWA Shams grid network safety clearance for primary power connection."
    ]
  },
  {
    id: 38,
    name: "Jebel Ali Substation Battery Room Chargers",
    category: "substation",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.34.41 PM.jpeg",
    location: "Jafza Gate 4 Utility Complex, Dubai, UAE",
    client: "DP World / Electrical Infrastructure",
    capacity: "110V DC Battery Charger & Battery Rack System",
    year: "2025",
    status: "Completed & Operational",
    highlights: [
      "Installed dual-redundant 110V DC battery chargers and heavy-duty nickel-cadmium battery banks.",
      "Constructed acid-resistant battery racks and completed inter-cell copper strip connections.",
      "Wired smart alarm control systems to flag charger failures or ground faults to main SCADA centers.",
      "Ensures uninterrupted auxiliary control power for substation circuit breakers during blackouts."
    ]
  },
  {
    id: 39,
    name: "Dubai Living Legends Luxury Villa MEP",
    category: "mep",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.41.00 PM.jpeg",
    location: "Living Legends, Dubailand, Dubai, UAE",
    client: "Private Client / Luxury Residence",
    capacity: "Complete Custom Villa Electromechanical Systems",
    year: "2024",
    status: "Completed & Handed Over",
    highlights: [
      "Wired low-voltage power networks, emergency power transfer units, and smart home automation grids.",
      "Installed copper hydraulic loops, thermal water heaters, and quiet sound-isolated drainage ducts.",
      "Deployed concealed high-efficiency VRF cooling networks with premium decorative airflow diffusers.",
      "Conducted full pressure-leak tests and electrical load-balance checks for immediate occupancy."
    ]
  },
  {
    id: 40,
    name: "Muhaisnah Commercial HVAC Air Handling Unit",
    category: "hvac",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.57.35 PM.jpeg",
    location: "Muhaisnah 4 Industrial Plaza, Dubai, UAE",
    client: "Al Futtaim Real Estate Development",
    capacity: "Double-Skin Clean Air Handling Unit (AHU) Installation",
    year: "2025",
    status: "Completed & Commissioned",
    highlights: [
      "Rigged, leveled, and vibration-isolated a double-skin 8,500 CFM Air Handling Unit on the roof.",
      "Connected chilled water piping with automated 2-way energy modulating valves and bypass lines.",
      "Fabricated and linked premium thermal-insulated duct networks with flexible connector joints.",
      "Achieved certified low vibration and low noise levels complying with Dubai indoor acoustics guidelines."
    ]
  }
];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "solar", name: "Solar EPC" },
  { id: "mep", name: "MEP Works" },
  { id: "hvac", name: "HVAC Engineering" },
  { id: "substation", name: "Substations" }
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Filter projects
  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-ras-charcoal text-white min-h-screen pt-28 pb-24 relative overflow-hidden">
      {/* Dynamic Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(197,168,128,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(30,59,50,0.08),transparent_60%)] pointer-events-none" />

      <div className="wrapper max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-ras-gold text-xs font-bold uppercase tracking-[0.25em] mb-4 block"
          >
            Milestones of UAE Engineering
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-light tracking-tightest leading-tight mb-6"
          >
            Landmark <span className="text-ras-gold">Infrastructure</span> Portfolio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ras-light/70 text-lg leading-relaxed font-normal"
          >
            From DEWA-synchronized industrial solar plants to complex central district cooling plants and high-voltage transmission substation supports, explore our record of absolute reliability across the GCC.
          </motion.p>
        </div>

        {/* Categories / Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-ras-gold text-ras-charcoal shadow-lg hover:shadow-ras-gold/20 scale-102"
                  : "bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-[28px] overflow-hidden aspect-[0.8] w-full border border-white/5 bg-white/5 cursor-pointer hover:border-ras-gold/30 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal via-ras-charcoal/30 to-transparent z-10 transition-opacity group-hover:opacity-95" />
                
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Card Elements */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between text-white">
                  
                  {/* Category icon badge */}
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/15">
                      {project.category === "solar" && <Sun className="w-5.5 h-5.5 text-ras-gold" />}
                      {project.category === "mep" && <Cpu className="w-5.5 h-5.5 text-ras-gold" />}
                      {project.category === "hvac" && <Wind className="w-5.5 h-5.5 text-ras-gold" />}
                      {project.category === "substation" && <Zap className="w-5.5 h-5.5 text-ras-gold" />}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest bg-ras-gold text-ras-charcoal px-2.5 py-1 rounded-full font-bold">
                      View Specifications
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-ras-gold">
                      <MapPin className="h-3 w-3" />
                      <span>{project.location.split(",")[0]}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-light tracking-tight leading-snug">
                      {project.name}
                    </h3>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Specification Detail Lightbox/Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ras-charcoal/90 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-ras-charcoal border border-white/10 rounded-[32px] overflow-hidden max-w-4xl w-full max-h-[85vh] flex flex-col lg:flex-row relative z-50 shadow-2xl"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/40 text-white hover:bg-ras-gold hover:text-ras-charcoal transition-all border border-white/15"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Project Left Panel (Image) */}
                <div className="relative lg:w-1/2 aspect-video lg:aspect-auto lg:h-auto min-h-[250px] overflow-hidden bg-black flex-shrink-0">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ras-charcoal pointer-events-none" />
                </div>

                {/* Project Right Panel (Details) */}
                <div className="p-8 lg:p-12 flex flex-col justify-between overflow-y-auto max-h-[85vh] lg:max-h-none flex-grow">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-1.5 text-ras-gold font-semibold text-xs tracking-wider uppercase mb-1">
                        <Award className="h-4 w-4" />
                        <span>{selectedProject.category.toUpperCase()} PROJECT</span>
                      </div>
                      <h2 className="text-3xl font-light tracking-tight text-white leading-tight">
                        {selectedProject.name}
                      </h2>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-5 text-sm">
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Client</p>
                        <p className="text-white font-medium">{selectedProject.client}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Location</p>
                        <p className="text-white font-medium">{selectedProject.location}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Rating / Capacity</p>
                        <p className="text-ras-gold font-bold">{selectedProject.capacity}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Year Completed</p>
                        <div className="flex items-center gap-1 text-white font-medium">
                          <Calendar className="h-4 w-4 text-ras-gold" />
                          <span>{selectedProject.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Engineering highlights */}
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-widest text-white/50 font-bold">Engineering Deliverables</p>
                      <ul className="space-y-2.5">
                        {selectedProject.highlights.map((item, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-sm text-ras-light/75 leading-relaxed font-normal">
                            <CheckCircle className="h-4.5 w-4.5 text-ras-gold mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                    <span>STATUS</span>
                    <span className="font-bold uppercase tracking-wider text-ras-gold bg-ras-gold/10 px-3 py-1 rounded-full border border-ras-gold/20">
                      {selectedProject.status}
                    </span>
                  </div>

                </div>

              </motion.div>
              {/* Backing Dismissal */}
              <div 
                className="absolute inset-0 z-40 pointer-events-auto"
                onClick={() => setSelectedProject(null)}
              />
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
