/**
 * Phase 2 · Step 3 — seed the page singletons (all except the Homepage,
 * which is seeded in its Phase-3 wiring step so the hero copy maps 1:1
 * against the component's exact structure).
 *
 * Copy below is lifted verbatim from the previously hardcoded components.
 *
 * Run:  npx sanity exec scripts/seed/singletons.mjs --with-user-token
 */
import {
  client,
  figureFor,
  upsertSingleton,
  withKey,
} from "./lib.mjs";

const ref = (id) => ({ _type: "reference", _ref: id });

/** One Portable Text block from plain text, optional strong phrases. */
let blockN = 0;
function block(text, strongPhrases = []) {
  const key = `seedb${(blockN++).toString(36)}`;
  if (!strongPhrases.length) {
    return {
      _type: "block", _key: key, style: "normal", markDefs: [],
      children: [{ _type: "span", _key: `${key}0`, text, marks: [] }],
    };
  }
  // Split the paragraph around each strong phrase, preserving order.
  const pattern = new RegExp(`(${strongPhrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const children = text.split(pattern).filter(Boolean).map((part, i) => ({
    _type: "span",
    _key: `${key}${i}`,
    text: part,
    marks: strongPhrases.includes(part) ? ["strong"] : [],
  }));
  return { _type: "block", _key: key, style: "normal", markDefs: [], children };
}

const hero = (chip, title, subtitle, extra = {}) => ({
  _type: "pageHero",
  chip,
  title,
  subtitle,
  overlay: "default",
  ...extra,
});

const savedCta = (buttonId) => ({ _type: "cta", mode: "saved", savedButton: ref(buttonId) });

/** Full color object in the shape @sanity/color-input stores. */
const colorValue = (hex, hsl, hsv, rgb) => ({
  _type: "color",
  hex,
  alpha: 1,
  hsl: { _type: "hslaColor", ...hsl, a: 1 },
  hsv: { _type: "hsvaColor", ...hsv, a: 1 },
  rgb: { _type: "rgbaColor", ...rgb, a: 1 },
});
const customCta = (label, page, anchor) => ({
  _type: "cta", mode: "custom", label,
  link: { _type: "link", linkType: "page", page, ...(anchor ? { anchor } : {}) },
});

async function main() {
  const ids = await client.fetch(`{
    "dewa": *[_type == "accreditation" && name == "DEWA SHAMS Dubai"][0]._id,
    "esco": *[_type == "accreditation" && name == "Etihad ESCO"][0]._id,
    "anert": *[_type == "partner" && name == "ANERT"][0]._id,
    "getInTouch": *[_type == "ctaButton" && name == "Contact Us"][0]._id,
    "requestConsultation": *[_type == "ctaButton" && name == "Request Consultation"][0]._id
  }`);

  // ── Site Settings ─────────────────────────────────────────────────────
  const logoAsset = await figureFor("/assets/Logos/RAS-Logo-Main.png", "Ras Al Assad logo");
  const footerLogoAsset = await figureFor("/assets/Logos/RAS-Logo-02.png", "Ras Al Assad footer logo");
  const faviconAsset = await figureFor("/assets/Logos/Website_Favicon-01.webp", "Favicon");

  const nav = (label, page, extra = {}) =>
    withKey({
      _type: "navItem",
      label,
      link: { _type: "link", linkType: "page", page },
      enabled: true,
      dropdown: false,
      ...extra,
    });

  await upsertSingleton("siteSettings", {
    siteName: "Ras Al Assad Electromechanical Works L.L.C",
    logo: logoAsset.image,
    footerLogo: footerLogoAsset.image,
    favicon: faviconAsset.image,
    primaryColor: colorValue("#C5A880", { h: 34.8, s: 0.373, l: 0.637 }, { h: 34.8, s: 0.35, v: 0.773 }, { r: 197, g: 168, b: 128 }),
    secondaryColor: colorValue("#121212", { h: 0, s: 0, l: 0.071 }, { h: 0, s: 0, v: 0.071 }, { r: 18, g: 18, b: 18 }),
    accentColor: colorValue("#F7F4EF", { h: 37.5, s: 0.333, l: 0.953 }, { h: 37.5, s: 0.032, v: 0.969 }, { r: 247, g: 244, b: 239 }),
    defaultHeroOverlay: "dark",
    mainMenu: [
      nav("About Us", "/about"),
      nav("Services", "/services", { dropdown: true }),
      nav("Projects", "/projects"),
      nav("Sustainability", "/sustainability"),
      nav("Appreciation", "/appreciation"),
      nav("Our Team", "/team"),
      nav("Solar Calculator", "/solar-calculator"),
      nav("Contact", "/contact"),
    ],
    headerCta: customCta("Solar Inquiry", "/contact"),
    footerBanner: {
      chip: "Energy Transition",
      heading: "Start your",
      headingAccent: "solar transition",
      headingEnd: "today.",
      cta: customCta("Calculate Savings", "/solar-calculator"),
    },
    footerDescription:
      "UAE-based renewable and electromechanical infrastructure specialist. Over a decade of engineering, procurement, and construction (EPC) excellence.",
    capabilityHeading: "Capabilities",
    companyMenu: [
      nav("About Us", "/about"),
      nav("Our Capabilities", "/services"),
      nav("Projects", "/projects"),
      nav("Sustainability", "/sustainability"),
      nav("Appreciation", "/appreciation"),
      nav("Our Team", "/team"),
      nav("Solar Calculator", "/solar-calculator"),
      nav("Contact HQ", "/contact"),
      nav("Login", "/login"),
    ],
    showAccreditations: true,
    copyrightText: "Copyright © {year}",
    footerTagline: "Engineering Performance. Delivering Reliability.",
    address: {
      line1: "Office #204, B Block, Saraya Avenue Building",
      line2: "Al Garhoud",
      poBox: "PO Box 241029",
      city: "Dubai, United Arab Emirates",
    },
    phones: [
      withKey({ _type: "phoneEntry", label: "Landline", number: "+971 4 264 1717" }),
      withKey({ _type: "phoneEntry", label: "Mobile", number: "+971 52 905 1717" }),
    ],
    emails: [
      withKey({ _type: "emailEntry", label: "General", email: "info@rasalassad.ae" }),
      withKey({ _type: "emailEntry", label: "Solar", email: "solar@rasalassad.ae" }),
    ],
    inquiryEmail: "info@rasalassad.ae",
    officeHours: [
      withKey({ _type: "hoursEntry", days: "Monday – Saturday", hours: "08:00 AM – 06:00 PM" }),
      withKey({ _type: "hoursEntry", days: "Sunday", hours: "Closed (Emergency AMC dispatch active)" }),
    ],
    socialLinks: [],
    siteUrl: "https://ras-al-assad.vercel.app",
    titleTemplate: "%s | Ras Al Assad Electromechanical Works",
    defaultSeo: {
      _type: "seo",
      title:
        "Ras Al Assad Electromechanical Works L.L.C | DEWA Certified Solar EPC & MEP Dubai",
      description:
        "Ras Al Assad Electromechanical Works (RAAEW) is a premier Dubai-based DEWA-certified Solar PV EPC contractor and electromechanical engineering specialist.",
    },
  });

  // ── About ─────────────────────────────────────────────────────────────
  await upsertSingleton("aboutPage", {
    hero: {
      ...hero(
        "Pioneering Engineering",
        "About ",
        "A premier Dubai-based engineering firm and DEWA-certified Solar PV contractor, delivering over 15 years of electromechanical and solar integration excellence.",
      ),
      titleAccent: "Ras Al Assad",
      backgroundImage: await figureFor(
        "/assets/Projects/SINGAPORE  PAVILION_x4.jpg",
        "Ras Al Assad engineering excellence — Singapore Pavilion project",
      ),
    },
    missionVisionSection: { chip: "What Drives Us", heading: "Our Mission & Vision" },
    mission:
      "To deliver world-class electromechanical and renewable energy engineering solutions that empower businesses, communities, and governments across the UAE and beyond. We are committed to precision, compliance, and sustainability in every project we undertake.",
    vision:
      "To be the UAE's most trusted and innovative electromechanical and renewable energy EPC contractor — pioneering clean energy infrastructure that drives economic growth while protecting our environment for future generations.",
    storyChip: "Our Journey",
    storyHeading: "From Mechanical Precision to Solar Excellence",
    storyBody: [
      block(
        "Founded in 2013 in Dubai, Ras Al Assad Electromechanical Works L.L.C began with a core focus on complex electromechanical (MEP) infrastructure, high-voltage substations, and industrial HVAC installations. Over the years, we established our reputation as a trusted partner for commercial developers, industrial firms, and government enterprises in the UAE.",
      ),
      block(
        "Anticipating the global energy transition, we launched our specialized Solar PV Integration division in 2017. Since then, we have grown into one of Dubai's preeminent DEWA-certified Solar contractors, delivering fully integrated solar EPC (Engineering, Procurement, and Construction) designs for luxury estates, manufacturing hubs, and corporate parks.",
        ["Solar PV Integration division in 2017"],
      ),
      block(
        "Today, RAAEW stands as a symbol of technological reliability, licensed by Dubai Municipality, fully accredited by DEWA (Shams Dubai), and recognized by Etihad ESCO to lead energy efficiency audits and solar retrofitting campaigns.",
        ["DEWA (Shams Dubai)", "Etihad ESCO"],
      ),
    ],
    storyBadges: [
      withKey({
        _type: "storyBadge",
        icon: "Shield",
        title: "DEWA Certified",
        description: "Shams Dubai grid-connection compliance",
      }),
      withKey({
        _type: "storyBadge",
        icon: "Award",
        title: "Etihad ESCO",
        description: "Approved energy efficiency contractor",
      }),
    ],
    principlesChip: "Corporate Pillars",
    principlesHeading: "The Principles Driving Our Operations",
    principles: [
      withKey({
        _type: "principle",
        icon: "Building2",
        title: "Architectural Integrity",
        description:
          "We maintain strict mechanical compliance and premium aesthetic alignment. Our solar and MEP layouts harmonize with existing architecture without compromising visual beauty.",
      }),
      withKey({
        _type: "principle",
        icon: "Shield",
        title: "DEWA Compliance",
        description:
          "Safety and standard compliance are central to everything we do. RAAEW ensures flawless, zero-friction approvals from Dubai Electricity and Water Authority at all levels.",
      }),
      withKey({
        _type: "principle",
        icon: "Users",
        title: "Client Partnership",
        description:
          "We build relationships that span decades. Through our extensive Operations & Maintenance (O&M) programs, we guarantee performance optimization and long-term asset value.",
      }),
    ],
    partnerChip: "Supporting Partner",
    partnerHeading: "ANERT Partnership",
    partnerText:
      "We are proud to partner with the Agency for Non-conventional Energy and Rural Technology (ANERT) — strengthening our commitment to renewable energy adoption, sustainable infrastructure, and clean technology advocacy across the region.",
    partner: ids.anert ? ref(ids.anert) : undefined,
    accreditationStrip: [
      withKey({ _type: "stripItem", title: "DEWA SHAMS", subtitle: "Registered Solar Contractor" }),
      withKey({ _type: "stripItem", title: "ETIHAD ESCO", subtitle: "Energy Efficiency Audit" }),
      withKey({ _type: "stripItem", title: "ISO 9001:2015", subtitle: "Quality Management System" }),
      withKey({ _type: "stripItem", title: "DUBAI MUNICIPALITY", subtitle: "Approved Electromechanical contractor" }),
    ],
    seo: { _type: "seo" },
  });

  // ── Services page ─────────────────────────────────────────────────────
  await upsertSingleton("servicesPage", {
    hero: {
      ...hero(
        "What We Do",
        "Our ",
        "Comprehensive electromechanical engineering and renewable energy solutions — from solar EPC and HVAC systems to substations and wind energy infrastructure.",
      ),
      titleAccent: "Services",
      backgroundImage: await figureFor(
        "/assets/Projects/SOBHA HEARTLAND.jpg",
        "Ras Al Assad solar PV and electromechanical services",
      ),
    },
    zeroCapital: {
      chip: "Zero-CAPEX Solar Leases",
      heading: "Go Solar with Zero Capital Investment",
      text: "In alliance with leading Gulf investment banks, RAAEW offers fully funded **Solar Power Purchase Agreements (PPAs)**. We build, own, and maintain a solar system on your warehouse rooftop, billing you a low electricity tariff up to 40% cheaper than grid rates.",
      benefits: [
        withKey({
          _type: "benefit",
          icon: "TrendingUp",
          title: "No Initial Outlay",
          description: "We fund 100% of engineering, hardware, and grid connection.",
        }),
        withKey({
          _type: "benefit",
          icon: "FileCheck",
          title: "Immediate Opex Drops",
          description: "Reduce monthly energy charges from the very first day of activation.",
        }),
        withKey({
          _type: "benefit",
          icon: "Activity",
          title: "O&M Covered",
          description: "Includes 20 years of complimentary cleanings and technical maintenance.",
        }),
      ],
      cta: customCta("Calculate Solar Payback", "/solar-calculator"),
    },
    seo: { _type: "seo" },
  });

  // ── Projects page ─────────────────────────────────────────────────────
  await upsertSingleton("projectsPage", {
    hero: {
      ...hero(
        "Milestones of UAE Engineering",
        "Landmark ",
        "From DEWA-synchronized industrial solar plants to complex central district cooling plants and high-voltage transmission substation supports, explore our record of absolute reliability across the GCC.",
      ),
      titleAccent: "Infrastructure",
      titleEnd: " Portfolio",
      backgroundImage: await figureFor(
        "/assets/Projects/hsbc-jebel-ali-solar-pv-complex.jpeg",
        "Ras Al Assad landmark infrastructure portfolio",
      ),
    },
    emptyStateText: "No projects in this category yet",
    seo: { _type: "seo" },
  });

  // ── Team page ─────────────────────────────────────────────────────────
  await upsertSingleton("teamPage", {
    hero: {
      ...hero(
        "Engineering Performance. Delivering Reliability.",
        "Our ",
        "MEP infrastructure and renewable energy require absolute precision. Our leadership and engineering specialists bring together over a decade of UAE grid-compliant delivery.",
      ),
      titleAccent: "Leadership",
      titleEnd: " & Technical Team",
      backgroundImage: await figureFor(
        "/assets/Projects/SINGAPORE  PAVILION_x4.jpg",
        "Ras Al Assad leadership and technical team",
      ),
    },
    mdQuote: {
      text: "At Ras Al Assad, our mission is not simply to build, but to engineer performance that lasts. We believe that clean energy and robust mechanical infrastructure are the foundations of Dubai's future. Our team executes every solar panel array, every electrical substation, and every district cooling line with strict safety compliance, technical transparency, and a commitment to long-term value.",
      authorName: "Mr. Navas Komu",
      authorRole: "Managing Director, Ras Al Assad Electromechanical Works",
    },
    seo: { _type: "seo" },
  });

  // ── Appreciation page ─────────────────────────────────────────────────
  await upsertSingleton("appreciationPage", {
    hero: {
      ...hero(
        "Excellence Recognized",
        "Appreciation & ",
        "Celebrating a legacy of engineering excellence, industry accreditations, and trusted partnerships across the UAE.",
      ),
      titleAccent: "Recognition",
      backgroundImage: await figureFor(
        "/assets/Projects/chalhoub-group-head-office-solar-mep.jpeg",
        "Award-winning engineering recognition — Ras Al Assad",
      ),
    },
    overview: {
      chip: "Our Commitment",
      heading: "A Legacy Built on Excellence",
      text: "At Ras Al Assad Electromechanical Works, our dedication to engineering precision, safety, and sustainable innovation has earned recognition from government authorities, international standards bodies, and industry partners across the Gulf. Every certificate we receive reaffirms our unwavering commitment to delivering world-class electromechanical and solar energy solutions.",
    },
    certificatesSection: { chip: "Credentials", heading: "Certificates & Awards" },
    accreditationsSection: { chip: "Trusted Partnerships", heading: "Accreditations & Affiliations" },
    anertCard: {
      heading: "ANERT Recognised",
      text: "Agency for New and Renewable Energy Research and Technology – acknowledged partner for renewable energy projects and training.",
      partner: ids.anert ? ref(ids.anert) : undefined,
    },
    moreToCome: {
      chip: "Growing Portfolio",
      heading: "More to Come",
      text: "Our commitment to excellence continues. This section will be updated as we receive additional recognitions and certifications.",
    },
    pageCta: {
      heading: "Partner With an Award-Winning Team",
      text: "Experience the quality and reliability that has earned us recognition across the industry. Let's build something exceptional together.",
      primaryCta: customCta("Get in Touch", "/contact"),
      secondaryCta: customCta("Explore Services", "/services"),
    },
    seo: { _type: "seo" },
  });

  // ── Sustainability page ───────────────────────────────────────────────
  await upsertSingleton("sustainabilityPage", {
    hero: {
      ...hero(
        "Engineering a Greener Tomorrow",
        "Sustain",
        "Building a Cleaner Energy Future — through precision engineering, renewable innovation, and an unwavering commitment to the UAE's green vision.",
      ),
      titleAccent: "ability",
      backgroundImage: await figureFor(
        "/assets/Projects/dubai-government-5000-villas-roof-solar.jpeg",
        "Sustainable solar energy infrastructure by Ras Al Assad",
      ),
    },
    commitment: {
      chip: "Our Promise",
      heading: "Our Sustainability Commitment",
      text: "Ras Al Assad is committed to engineering performance that supports long-term sustainable development. We believe that responsible energy design is not optional — it is foundational to every project we undertake and every client relationship we build.",
      points: [
        withKey({ _type: "commitmentPoint", icon: "Leaf", title: "Environmental Stewardship", description: "Every project is designed with environmental longevity in mind — minimising waste, maximising resource efficiency, and protecting the ecological footprint of every site we serve." }),
        withKey({ _type: "commitmentPoint", icon: "Sun", title: "Clean Energy Integration", description: "As a DEWA Shams-certified solar contractor, we champion photovoltaic deployment across residential, commercial, and industrial landscapes — powering the UAE with sunlight." }),
        withKey({ _type: "commitmentPoint", icon: "Zap", title: "Energy Efficiency", description: "Through precision MEP engineering and smart automation, we reduce annual energy consumption across the buildings we service — cutting operational costs and carbon emissions alike." }),
        withKey({ _type: "commitmentPoint", icon: "Shield", title: "Regulatory Excellence", description: "We adhere to the highest international sustainability standards and UAE-specific energy mandates, ensuring every installation meets or exceeds compliance thresholds." }),
      ],
    },
    impact: {
      chip: "Measurable Results",
      heading: "Renewable Energy Impact",
      text: "Every kilowatt we deploy drives real change. Our cumulative solar portfolio speaks to a decade of dedication to clean energy generation across the Gulf.",
      stats: [
        withKey({ _type: "stat", value: "10+", label: "Years Experience", description: "in Renewable Energy" }),
        withKey({ _type: "stat", value: "50+", label: "Solar Projects", description: "Successfully Delivered" }),
        withKey({ _type: "stat", value: "15+", label: "MWp Deployed", description: "Clean Energy Capacity" }),
        withKey({ _type: "stat", value: "20,000+", label: "Tons CO₂ Offset", description: "Environmental Impact" }),
      ],
    },
    windEnergy: {
      imageTag: "Emerging Energy",
      chip: "Diversified Renewables",
      heading: "Wind Energy Services",
      body: [
        block("As the GCC accelerates its diversification beyond solar, Ras Al Assad is actively expanding into wind energy engineering. Our electromechanical expertise positions us to deliver turbine foundation engineering, grid-connection systems, and structural load analysis for onshore wind installations."),
        block("With the UAE investing in wind power capacity across its northern coastlines and elevated terrain, we are developing partnerships and technical competencies to deliver end-to-end wind energy EPC services — from feasibility studies to commissioning and ongoing O&M support."),
      ],
      bullets: [
        "Turbine foundation & structural engineering",
        "Grid-connection & substation integration",
        "Site feasibility & wind resource analysis",
        "Operations & maintenance contracts",
      ],
      image: await figureFor(
        "/assets/Projects/wind-energy-service.png",
        "Wind energy turbines powering a cleaner future",
      ),
    },
    greenHydrogen: {
      chip: "Future Technology",
      heading: "Green Hydrogen — The Next Frontier",
      body: [
        block("Green hydrogen represents one of the most promising pathways to a fully decarbonised energy economy. Produced through water electrolysis powered by renewable energy sources, it offers a zero-emission fuel for heavy industry, transportation, and long-duration energy storage."),
        block("The UAE has positioned itself as a global leader in hydrogen strategy, with Dubai and Abu Dhabi investing in pilot hydrogen refuelling stations and industrial-scale electrolysis plants. Ras Al Assad is monitoring these developments closely, building the technical knowledge base and engineering partnerships required to participate in the UAE's hydrogen economy as it matures."),
      ],
      cards: [
        withKey({ _type: "hydrogenCard", icon: "Zap", title: "Electrolysis-Ready", description: "Solar-powered hydrogen production pathways" }),
        withKey({ _type: "hydrogenCard", icon: "Globe", title: "UAE H₂ Strategy", description: "Aligned with national hydrogen roadmap" }),
        withKey({ _type: "hydrogenCard", icon: "TrendingUp", title: "Scalable Impact", description: "Industrial & transport decarbonisation" }),
      ],
    },
    uaeStrategy: {
      chip: "National Alignment",
      heading: "UAE Energy Strategy 2050",
      body: [
        block(
          "The United Arab Emirates has set one of the most ambitious clean energy targets in the Middle East — achieving 44% of total energy from clean sources by 2050. Ras Al Assad is proud to contribute to this national vision through every solar panel we install and every electromechanical system we optimise.",
          ["44% of total energy from clean sources by 2050"],
        ),
      ],
      cards: [
        withKey({ _type: "strategyCard", icon: "Target", title: "44% Clean Energy by 2050", description: "The UAE Energy Strategy 2050 aims to produce 44% of its electricity from clean sources, including solar, nuclear, and wind — reducing carbon emissions by 70%.", highlight: "44%" }),
        withKey({ _type: "strategyCard", icon: "Sun", title: "Solar-First Approach", description: "With over 350 days of sunshine annually, the UAE is ideally positioned for large-scale photovoltaic deployment. RAAEW is a certified contributor to this solar revolution.", highlight: "350+" }),
        withKey({ _type: "strategyCard", icon: "TrendingUp", title: "AED 600 Billion Investment", description: "The UAE is investing AED 600 billion in clean and renewable energy infrastructure through 2050, creating unprecedented opportunity for certified engineering firms.", highlight: "AED 600B" }),
      ],
    },
    partnerSection: {
      logoLabel: "Official Partner",
      chip: "Recognised Partnership",
      heading: "ANERT Supporting Partner",
      body: [
        block(
          "Ras Al Assad Electromechanical Works is proud to be recognised by the Agency for New and Renewable Energy Research and Technology (ANERT) as a certified supporting partner in the advancement of renewable energy systems.",
          ["Agency for New and Renewable Energy Research and Technology (ANERT)"],
        ),
        block("This recognition validates our commitment to engineering excellence in solar PV systems, energy-efficient building design, and sustainable electromechanical infrastructure. Working in alignment with ANERT's mission, we contribute to accelerating the adoption of clean energy technologies across the region."),
      ],
      bullets: [
        "Certified renewable energy engineering partner",
        "Solar PV design and deployment excellence",
        "Contribution to national energy research goals",
        "Ongoing technical knowledge exchange",
      ],
      partner: ids.anert ? ref(ids.anert) : undefined,
    },
    seo: { _type: "seo" },
  });

  // ── Contact page ──────────────────────────────────────────────────────
  await upsertSingleton("contactPage", {
    hero: {
      ...hero(
        "Global Headquarters",
        "Connect With Our ",
        "Partner with Ras Al Assad Electromechanical Works L.L.C for your next solar grid integration or electromechanical project in Dubai. Request custom pricing or schedule a commercial site assessment.",
      ),
      titleAccent: "Engineers",
    },
    departments: [],
    legalLines: [
      "Commercial Registry Number: 1118671",
      "Dubai Municipality Engineering License No. 718300",
      "Approved Shams Dubai Solar PV EPC Registration",
    ],
    formHeading: "Request Project Cost Feasibility",
    formServiceOptions: [
      "Solar Energy",
      "Wind Energy",
      "Infrastructure",
      "EPC Services",
      "Maintenance",
      "Consultation",
    ],
    formSuccessHeading: "Engineering Request Logged",
    formSuccessText:
      "Thank you for contacting Ras Al Assad. Your inquiry has been routed directly to our Dubai estimation department.",
    formSuccessNote:
      "We will review your property configuration and contact you to schedule an engineering site audit.",
    seo: { _type: "seo" },
  });

  // ── Solar calculator page ─────────────────────────────────────────────
  await upsertSingleton("solarCalculatorPage", {
    hero: {
      ...hero(
        "Interactive Feasibility Tool",
        "Solar Return & Savings ",
        "Estimate your commercial property's solar PV potential in Dubai. Adjust your average monthly electricity bill below and view immediate, high-fidelity financial projections.",
      ),
      titleAccent: "Estimator",
    },
    assumptions: {
      tariffAedPerKwh: 0.38,
      selfConsumptionFactor: 0.85,
      yieldKwhPerKwpYear: 1650,
      costAedPerKwp: 3600,
      savingsRate: 0.8,
      savingsHorizonYears: 20,
      co2TonnesPerKwp: 1.2,
      kwpPerPanel: 0.5,
    },
    leadGateEnabled: true,
    disclaimer:
      "All calculations are indicative and based on average assumptions. Final pricing, savings, and system sizing may vary depending on site conditions, equipment selection, and project requirements.",
    seo: { _type: "seo" },
  });

  console.log("\nSingletons seeded (homePage intentionally deferred to its wiring step).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
