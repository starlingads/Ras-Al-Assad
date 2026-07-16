import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import Navbar, { type NavbarMenuItem } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { LAYOUT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { resolveCta, resolveLink } from "@/lib/links";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/**
 * Regenerate every page in this group at most once a minute.
 *
 * Without this the pages are prerendered once at build time, so anything the
 * client publishes in the Studio would not reach the live site until the next
 * deploy. With it, a publish shows up within a minute and no webhook or
 * redeploy is needed. Applies to every route nested under (site).
 */
export const revalidate = 60;

/** One fetch for everything the shell needs (Navbar, Footer, metadata). */
async function getLayoutData() {
  const { data } = await sanityFetch({ query: LAYOUT_QUERY });
  return data;
}

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getLayoutData();
  const seo = settings?.defaultSeo;
  const title =
    seo?.title ?? "Ras Al Assad Electromechanical Works L.L.C";
  return {
    ...(settings?.siteUrl ? { metadataBase: new URL(settings.siteUrl) } : {}),
    title: settings?.titleTemplate
      ? { default: title, template: settings.titleTemplate }
      : title,
    description: seo?.description ?? undefined,
    icons: settings?.favicon?.asset
      ? { icon: urlFor(settings.favicon).width(128).url() }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { settings, services, accreditations } = await getLayoutData();

  const serviceLinks = (services ?? []).map((s) => ({
    label: s.title ?? "",
    href: `/services#${s.slug ?? ""}`,
  }));

  const menu: NavbarMenuItem[] = (settings?.mainMenu ?? [])
    .filter((item) => item.enabled !== false)
    .map((item) => ({
      label: item.label ?? "",
      href: resolveLink(item.link),
      dropdown: item.dropdown ? serviceLinks : undefined,
    }));

  const year = String(new Date().getFullYear());
  const address = settings?.address;
  const addressText = address
    ? [address.poBox, address.line1, address.line2, address.city]
        .filter(Boolean)
        .join(", ")
    : null;

  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="antialiased text-ras-charcoal bg-ras-light">
        <Navbar
          logoSrc={
            settings?.logo?.asset
              ? urlFor(settings.logo).width(384).url()
              : "/assets/Logos/RAS-Logo-Main.png"
          }
          logoAlt={settings?.siteName ?? "Ras Al Assad L.L.C"}
          menu={menu}
          cta={resolveCta(settings?.headerCta ?? null)}
        />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer
          banner={
            settings?.footerBanner
              ? {
                  chip: settings.footerBanner.chip,
                  heading: settings.footerBanner.heading,
                  headingAccent: settings.footerBanner.headingAccent,
                  headingEnd: settings.footerBanner.headingEnd,
                  cta: resolveCta(settings.footerBanner.cta ?? null),
                }
              : null
          }
          logoSrc={
            settings?.footerLogo?.asset
              ? urlFor(settings.footerLogo).width(288).url()
              : "/assets/Logos/RAS-Logo-02.png"
          }
          logoAlt={settings?.siteName ?? "Ras Al Assad L.L.C"}
          description={settings?.footerDescription}
          addressText={addressText}
          phone={settings?.phones?.[0]?.number ? { number: settings.phones[0].number } : null}
          email={settings?.emails?.[0]?.email ? { email: settings.emails[0].email } : null}
          capabilityHeading={settings?.capabilityHeading}
          capabilities={serviceLinks}
          companyMenu={(settings?.companyMenu ?? [])
            .filter((item) => item.enabled !== false)
            .map((item) => ({ label: item.label ?? "", href: resolveLink(item.link) }))}
          accreditationLabels={
            settings?.showAccreditations === false
              ? []
              : (accreditations ?? []).map((a) => a.shortLabel || a.name || "").filter(Boolean)
          }
          copyrightLeft={(settings?.copyrightText ?? "Copyright © {year}").replace("{year}", year)}
          companyName={settings?.siteName ?? "Ras Al Assad Electromechanical Works L.L.C"}
          tagline={settings?.footerTagline}
        />
        <SanityLive />
      </body>
    </html>
  );
}
