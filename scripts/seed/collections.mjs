/**
 * Phase 2 · Step 2 — seed every COLLECTION document (taxonomies, projects,
 * services, team, certificates, accreditations, partners, client logos,
 * reusable buttons) plus all their image assets.
 *
 * Idempotent: documents are looked up by slug/name before creating; asset
 * uploads are cached in .asset-cache.json.
 *
 * Run:  npx sanity exec scripts/seed/collections.mjs --with-user-token
 */
import {
  client,
  ensureDoc,
  ensureMediaTags,
  figureFor,
  loadExtracted,
  rankGenerator,
  slugValue,
  slugify,
  uploadImage,
  withKey,
} from "./lib.mjs";

const data = loadExtracted();
const g = (suffix) => data[Object.keys(data).find((k) => k.endsWith(suffix))];

const ref = (id, weak = false) => ({ _type: "reference", _ref: id, ...(weak ? { _weak: true } : {}) });

async function main() {
  console.log("→ media tags");
  await ensureMediaTags();

  // ── Categories ──────────────────────────────────────────────────────────
  console.log("→ categories");
  const categoryIds = {};
  const catRank = rankGenerator();
  for (const [title, icon] of [["Solar", "Sun"], ["Wind", "Wind"], ["Infrastructure", "Cpu"]]) {
    categoryIds[title.toLowerCase()] = await ensureDoc("category", "slug", slugify(title), {
      title,
      slug: slugValue(title),
      icon,
      orderRank: catRank(),
    });
  }

  // ── Filter groups + filters ─────────────────────────────────────────────
  console.log("→ filter groups & filters");
  const groupRank = rankGenerator();
  const oemGroupId = await ensureDoc("filterGroup", "slug", "panel-brand-oem", {
    title: "Panel Brand (OEM)",
    slug: { _type: "slug", current: "panel-brand-oem" },
    allLabel: "All Brands",
    appliesTo: [withKey(ref(categoryIds.solar))],
    orderRank: groupRank(),
  });
  const sectorGroupId = await ensureDoc("filterGroup", "slug", "sector", {
    title: "Sector",
    slug: { _type: "slug", current: "sector" },
    allLabel: "All Sectors",
    // Matches today's site: the sector row appears under Infrastructure.
    appliesTo: [withKey(ref(categoryIds.infrastructure))],
    orderRank: groupRank(),
  });

  const filterIds = {};
  const filterRank = rankGenerator();
  for (const oem of ["LONGi", "Jinko", "Trina", "Canadian Solar", "JA Solar"]) {
    filterIds[oem] = await ensureDoc("projectFilter", "slug", slugify(oem), {
      title: oem,
      slug: slugValue(oem),
      group: ref(oemGroupId),
      orderRank: filterRank(),
    });
  }
  for (const sector of ["Commercial", "Government", "Industrial", "Utility"]) {
    filterIds[sector.toLowerCase()] = await ensureDoc("projectFilter", "slug", slugify(sector), {
      title: sector,
      slug: slugValue(sector),
      group: ref(sectorGroupId),
      orderRank: filterRank(),
    });
  }

  // ── Reusable buttons ────────────────────────────────────────────────────
  console.log("→ reusable buttons");
  const buttonIds = {};
  const BUTTONS = [
    ["Request Consultation", "/contact"],
    ["Explore Projects", "/projects"],
    ["Get a Quote", "/contact"],
    ["Contact Us", "/contact"],
  ];
  for (const [label, page] of BUTTONS) {
    buttonIds[label] = await ensureDoc("ctaButton", "name", label, {
      name: label,
      label,
      link: { _type: "link", linkType: "page", page },
    });
  }

  // ── Accreditations ──────────────────────────────────────────────────────
  console.log("→ accreditations");
  const shortLabels = {
    "DEWA SHAMS Dubai": "DEWA Shams Dubai Approved",
    "Etihad ESCO": "Etihad ESCO Registered",
    "ISO 9001:2015": "ISO 9001:2015 Quality",
    "ISO 14001:2015": "ISO 14001:2015 Environment",
    "ISO 45001:2018": "ISO 45001:2018 Safety",
  };
  const accredRank = rankGenerator();
  const accreditationIds = {};
  for (const a of g("::accreditations")) {
    accreditationIds[a.label] = await ensureDoc("accreditation", "name", a.label, {
      name: a.label,
      description: a.desc,
      shortLabel: shortLabels[a.label],
      icon: a.icon === "CheckCircle" ? "CheckCircle" : a.icon,
      orderRank: accredRank(),
    });
  }

  // ── Partners (ANERT + authority institutions) ───────────────────────────
  console.log("→ partners");
  const partnerRank = rankGenerator();
  await ensureDoc("partner", "name", "ANERT", {
    name: "ANERT",
    type: "supporting",
    role: "Official Sustainability Partner",
    description:
      "Agency for New and Renewable Energy Research and Technology — supporting partner for renewable energy development.",
    logo: await figureFor("/assets/Logos/Anert.png", "ANERT logo"),
    orderRank: partnerRank(),
  });
  for (const inst of g("::institutions")) {
    await ensureDoc("partner", "name", inst.name, {
      name: inst.name,
      type: "authority",
      role: inst.role,
      description: inst.desc,
      orderRank: partnerRank(),
    });
  }

  // ── Client logos (Asset 3..25 → "Client 1..23") ─────────────────────────
  console.log("→ client logos");
  const logoRank = rankGenerator();
  for (let i = 0; i < 23; i++) {
    const file = `/assets/Trusted Clients/Asset ${i + 3}.png`;
    const name = `Client ${i + 1}`;
    const existing = await client.fetch(`*[_type == "clientLogo" && name == $name][0]._id`, { name });
    if (existing) continue;
    await client.create({
      _type: "clientLogo",
      name,
      logo: {
        _type: "image",
        asset: ref(await uploadImage(file, `${name} logo`)),
      },
      visible: true,
      featured: false,
      orderRank: logoRank(),
    });
    console.log(`  + clientLogo: ${name}`);
  }

  // ── Team members ────────────────────────────────────────────────────────
  console.log("→ team members");
  const teamRank = rankGenerator();
  for (const t of g("::teamMembers")) {
    await ensureDoc("teamMember", "name", t.name, {
      name: t.name,
      designation: t.role,
      photo: await figureFor(t.image, `${t.name} — ${t.role}`),
      bio: t.bio,
      stats: t.stats,
      accreditation: t.accreditation,
      visible: true,
      orderRank: teamRank(),
    });
  }

  // ── Certificates ────────────────────────────────────────────────────────
  console.log("→ certificates");
  const certRank = rankGenerator();
  for (const c of g("::certificates")) {
    await ensureDoc("certificate", "title", c.title, {
      title: c.title,
      type: "certificate",
      image: await figureFor(c.src, c.alt),
      visible: true,
      orderRank: certRank(),
    });
  }

  // ── Services ────────────────────────────────────────────────────────────
  console.log("→ services");
  const cards = g("ExpertiseSlider.tsx::cards");
  const cardByAnchor = Object.fromEntries(
    cards.map((c) => [c.href.split("#")[1], c]),
  );
  const iconFix = { Cpu: "Cpu", Combine: "Combine" };
  const serviceRank = rankGenerator();
  const serviceIds = {};
  for (const s of g("ServicesClient.tsx::services")) {
    const card = cardByAnchor[s.id];
    serviceIds[s.id] = await ensureDoc("service", "slug", s.id, {
      title: s.title,
      slug: { _type: "slug", current: s.id },
      icon: iconFix[s.icon] ?? s.icon,
      subtitle: s.subtitle,
      tagline: s.tagline,
      summary: card?.desc ?? s.subtitle,
      featured: Boolean(card),
      description: [
        {
          _type: "block",
          _key: `desc-${s.id}`,
          style: "normal",
          markDefs: [],
          children: [{ _type: "span", _key: `desc-${s.id}-1`, text: s.description, marks: [] }],
        },
      ],
      highlights: s.highlights,
      heroImage: await figureFor(s.image, s.title),
      cta: {
        _type: "cta",
        mode: "custom",
        label: "Request engineering audit",
        link: { _type: "link", linkType: "page", page: "/contact" },
      },
      visible: true,
      seo: { _type: "seo" },
      orderRank: serviceRank(),
    });
  }

  // ── Projects (42) ───────────────────────────────────────────────────────
  console.log("→ projects");
  // Featured = the six projects the old homepage slider hardcoded.
  const FEATURED_IMAGES = [
    "SOBHA HEARTLAND.jpg",
    "adnoc-substation-infrastructure-projects.jpg",
    "hsbc-jebel-ali-solar-pv-complex.jpeg",
    "SINGAPORE  PAVILION_x4.jpg",
    "dubai-government-5000-villas-roof-solar.jpeg",
    "al-garhoud-grid-substation-support.jpg",
  ];
  const projectRank = rankGenerator();
  for (const p of g("ProjectsClient.tsx::projects")) {
    const filters = [];
    if (p.subCategory) {
      const sectorId = filterIds[p.subCategory.toLowerCase()];
      if (sectorId) filters.push(withKey(ref(sectorId)));
    }
    if (p.oem && filterIds[p.oem]) filters.push(withKey(ref(filterIds[p.oem])));

    await ensureDoc("project", "slug", slugify(p.name), {
      name: p.name,
      slug: slugValue(p.name),
      summary: `${p.capacity} — ${p.location}.`,
      thumbnail: await figureFor(p.image, p.name),
      completionDate: p.year ? `${p.year}-01-01` : undefined,
      location: p.location,
      clientName: p.client,
      capacity: p.capacity,
      statusLabel: p.status,
      highlights: p.highlights,
      category: ref(categoryIds[p.category]),
      filters,
      featured: FEATURED_IMAGES.some((f) => p.image.endsWith(f)),
      hidden: false,
      seo: { _type: "seo" },
      orderRank: projectRank(),
    });
  }

  // ── Verification ────────────────────────────────────────────────────────
  console.log("\n→ verification counts");
  const counts = await client.fetch(`{
    "projects": count(*[_type == "project"]),
    "services": count(*[_type == "service"]),
    "categories": count(*[_type == "category"]),
    "filterGroups": count(*[_type == "filterGroup"]),
    "filters": count(*[_type == "projectFilter"]),
    "team": count(*[_type == "teamMember"]),
    "certificates": count(*[_type == "certificate"]),
    "accreditations": count(*[_type == "accreditation"]),
    "partners": count(*[_type == "partner"]),
    "clientLogos": count(*[_type == "clientLogo"]),
    "buttons": count(*[_type == "ctaButton"]),
    "brokenCategoryRefs": count(*[_type == "project" && !defined(category->_id)])
  }`);
  console.table(counts);
  const expected = { projects: 42, services: 6, categories: 3, filterGroups: 2, filters: 9, team: 4, certificates: 3, accreditations: 5, partners: 7, clientLogos: 23, buttons: 4, brokenCategoryRefs: 0 };
  const bad = Object.entries(expected).filter(([k, v]) => counts[k] !== v);
  if (bad.length) {
    console.error("MISMATCH:", bad.map(([k, v]) => `${k}: got ${counts[k]}, expected ${v}`).join("; "));
    process.exitCode = 1;
  } else {
    console.log("All counts match expectations ✓");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
