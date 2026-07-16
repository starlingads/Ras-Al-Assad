import { sanityFetch } from "@/sanity/lib/live";
import { ORGANIZATION_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const FALLBACK_SITE_URL = "https://ras-al-assad.vercel.app";

/** "Mon – Fri" → ["Monday","Tuesday",…] for schema.org openingHoursSpecification. */
const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function parseDays(days: string): string[] {
  const found = DAY_NAMES.filter((day) =>
    new RegExp(day.slice(0, 3), "i").test(days),
  );
  // A range like "Monday – Saturday" yields the two endpoints; expand it.
  if (/[–—-]/.test(days) && found.length === 2) {
    const [from, to] = found.map((d) => DAY_NAMES.indexOf(d));
    if (from <= to) return DAY_NAMES.slice(from, to + 1);
  }
  return found;
}

/** "08:00 AM – 06:00 PM" → { opens: "08:00", closes: "18:00" }. */
function parseHours(hours: string): { opens: string; closes: string } | null {
  const times = hours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/gi);
  if (!times || times.length < 2) return null;
  const to24 = (t: string) => {
    const [, h, m, meridiem] = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)!;
    let hour = Number(h);
    if (/pm/i.test(meridiem ?? "") && hour !== 12) hour += 12;
    if (/am/i.test(meridiem ?? "") && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${m}`;
  };
  return { opens: to24(times[0]), closes: to24(times[1]) };
}

/**
 * Organization + LocalBusiness structured data, built from Site Settings →
 * Contact Details. Rendered on the homepage so search engines can surface
 * the company's address, phone and hours as rich results.
 */
export default async function OrganizationJsonLd() {
  const { data } = await sanityFetch({ query: ORGANIZATION_QUERY, stega: false });
  if (!data) return null;

  const base = (data.siteUrl || FALLBACK_SITE_URL).replace(/\/$/, "");
  const address = data.address;

  const openingHours = (data.officeHours ?? [])
    .flatMap((entry) => {
      if (!entry.days || !entry.hours) return [];
      const parsed = parseHours(entry.hours);
      const dayOfWeek = parseDays(entry.days);
      if (!parsed || dayOfWeek.length === 0) return [];
      return [{ "@type": "OpeningHoursSpecification", dayOfWeek, ...parsed }];
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${base}/#organization`,
    name: data.siteName ?? undefined,
    url: base,
    ...(data.logo?.asset ? { logo: urlFor(data.logo).width(600).url() } : {}),
    ...(data.defaultSeo?.description ? { description: data.defaultSeo.description } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: [address.line1, address.line2].filter(Boolean).join(", ") || undefined,
            postOfficeBoxNumber: address.poBox ?? undefined,
            addressLocality: address.city ?? undefined,
            addressCountry: "AE",
          },
        }
      : {}),
    ...(data.phones?.length ? { telephone: data.phones[0].number } : {}),
    ...(data.emails?.length ? { email: data.emails[0].email } : {}),
    ...(openingHours.length ? { openingHoursSpecification: openingHours } : {}),
    ...(data.socialLinks?.length
      ? { sameAs: data.socialLinks.map((s) => s.url).filter(Boolean) }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // Sanity content is trusted (authored by the client, not user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
