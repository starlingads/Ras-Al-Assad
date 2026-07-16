import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Site-wide settings — the single source of truth for branding, menus,
 * footer, contact details, social links, SEO defaults and analytics IDs.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "branding", title: "Branding", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "contact", title: "Contact Details" },
    { name: "social", title: "Social" },
    { name: "seo", title: "SEO Defaults" },
    { name: "integrations", title: "Integrations" },
  ],
  fields: [
    // ── Branding ────────────────────────────────────────────────────────
    defineField({
      name: "siteName",
      type: "string",
      title: "Company Name",
      group: "branding",
      validation: (r) => r.required().error("The company name is used across the site"),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo (header)",
      group: "branding",
      description: "PNG or SVG with transparent background.",
      options: { accept: "image/png, image/svg+xml, image/webp" },
    }),
    defineField({
      name: "footerLogo",
      type: "image",
      title: "Logo (footer)",
      group: "branding",
      description: "Version used on the dark footer. Leave empty to reuse the header logo.",
      options: { accept: "image/png, image/svg+xml, image/webp" },
    }),
    defineField({
      name: "favicon",
      type: "image",
      title: "Favicon",
      group: "branding",
      description: "The little icon in the browser tab. Square, at least 128×128.",
    }),
    defineField({
      name: "primaryColor",
      type: "color",
      title: "Primary Color",
      group: "branding",
      description:
        "Stored centrally — the site currently uses its built-in theme; wiring these to the live design is a follow-up task.",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "secondaryColor",
      type: "color",
      title: "Secondary Color",
      group: "branding",
      description: "See Primary Color.",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "accentColor",
      type: "color",
      title: "Accent Color",
      group: "branding",
      description: "See Primary Color.",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "defaultHeroOverlay",
      type: "string",
      title: "Default Hero Overlay",
      group: "branding",
      description: "Used by every page hero set to “Site default”.",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
        ],
      },
      initialValue: "dark",
    }),

    // ── Navigation ──────────────────────────────────────────────────────
    defineField({
      name: "mainMenu",
      type: "array",
      title: "Main Menu",
      group: "navigation",
      description: "Drag to reorder. Switch items off instead of deleting them.",
      of: [defineArrayMember({ type: "navItem" })],
    }),
    defineField({
      name: "headerCta",
      type: "cta",
      title: "Header Button (optional)",
      group: "navigation",
      description: "The button at the right end of the menu, e.g. “Get a Quote”.",
    }),

    // ── Footer ──────────────────────────────────────────────────────────
    defineField({
      name: "footerBanner",
      type: "object",
      title: "Pre-footer banner",
      group: "footer",
      description: "The green call-to-action band above the footer.",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Energy Transition”" }),
        defineField({ name: "heading", type: "string", title: "Heading — start", description: "e.g. “Start your”" }),
        defineField({ name: "headingAccent", type: "string", title: "Heading — gold part", description: "e.g. “solar transition”" }),
        defineField({ name: "headingEnd", type: "string", title: "Heading — end", description: "e.g. “today.”" }),
        defineField({ name: "cta", type: "cta", title: "Button" }),
      ],
    }),
    defineField({
      name: "footerDescription",
      type: "text",
      rows: 3,
      title: "Footer Description",
      group: "footer",
      description: "The short paragraph under the footer logo.",
    }),
    defineField({
      name: "capabilityHeading",
      type: "string",
      title: "Capabilities column heading",
      group: "footer",
      initialValue: "Capabilities",
      description: "The links themselves come from your Services automatically.",
    }),
    defineField({
      name: "companyMenu",
      type: "array",
      title: "Company column links",
      group: "footer",
      of: [defineArrayMember({ type: "navItem" })],
    }),
    defineField({
      name: "showAccreditations",
      type: "boolean",
      title: "Show accreditation badges",
      group: "footer",
      initialValue: true,
      description: "Pulls from your Accreditations list.",
    }),
    defineField({
      name: "copyrightText",
      type: "string",
      title: "Copyright line",
      group: "footer",
      description: "Use {year} for the current year — it updates automatically.",
      initialValue: "© {year} Ras Al Assad Electromechanical Works L.L.C. All rights reserved.",
    }),
    defineField({
      name: "footerTagline",
      type: "string",
      title: "Bottom-right tagline",
      group: "footer",
      initialValue: "Engineering Performance. Delivering Reliability.",
    }),

    // ── Contact Details (single source of truth) ────────────────────────
    defineField({
      name: "address",
      type: "object",
      title: "Address",
      group: "contact",
      fields: [
        defineField({ name: "line1", type: "string", title: "Line 1" }),
        defineField({ name: "line2", type: "string", title: "Line 2 (optional)" }),
        defineField({ name: "poBox", type: "string", title: "PO Box" }),
        defineField({ name: "city", type: "string", title: "City / Emirate" }),
        defineField({
          name: "mapsUrl",
          type: "url",
          title: "Google Maps link (optional)",
          description: "Where “Get directions” goes.",
        }),
      ],
    }),
    defineField({
      name: "phones",
      type: "array",
      title: "Phone numbers",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "phoneEntry",
          fields: [
            defineField({ name: "label", type: "string", title: "Label", description: "e.g. “Main Office”" }),
            defineField({
              name: "number",
              type: "string",
              title: "Number",
              validation: (r) => r.required().error("Enter the phone number"),
            }),
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "emails",
      type: "array",
      title: "Email addresses",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "emailEntry",
          fields: [
            defineField({ name: "label", type: "string", title: "Label", description: "e.g. “General Inquiries”" }),
            defineField({
              name: "email",
              type: "string",
              title: "Email",
              validation: (r) =>
                r
                  .required()
                  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" })
                  .error("This doesn't look like an email address"),
            }),
          ],
          preview: { select: { title: "email", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "inquiryEmail",
      type: "string",
      title: "Where should website inquiries be sent?",
      group: "contact",
      description: "Form submissions will be delivered here (form backend arrives with the portal phase).",
      validation: (r) =>
        r
          .regex(/^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" })
          .error("This doesn't look like an email address"),
    }),
    defineField({
      name: "officeHours",
      type: "array",
      title: "Office hours",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "hoursEntry",
          fields: [
            defineField({ name: "days", type: "string", title: "Days", description: "e.g. “Mon – Fri”" }),
            defineField({ name: "hours", type: "string", title: "Hours", description: "e.g. “8:30 AM – 6:00 PM”" }),
          ],
          preview: { select: { title: "days", subtitle: "hours" } },
        }),
      ],
    }),

    // ── Social ──────────────────────────────────────────────────────────
    defineField({
      name: "socialLinks",
      type: "array",
      title: "Social profiles",
      group: "social",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "Facebook", value: "facebook" },
                  { title: "YouTube", value: "youtube" },
                  { title: "WhatsApp", value: "whatsapp" },
                ],
              },
              validation: (r) => r.required().error("Pick the platform"),
            }),
            defineField({
              name: "url",
              type: "url",
              title: "Profile link",
              validation: (r) => r.required().error("Paste the profile link"),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),

    // ── SEO Defaults ────────────────────────────────────────────────────
    defineField({
      name: "siteUrl",
      type: "url",
      title: "Website address",
      group: "seo",
      description: "The public address of this website, e.g. https://ras-al-assad.vercel.app",
    }),
    defineField({
      name: "titleTemplate",
      type: "string",
      title: "Browser-tab title pattern",
      group: "seo",
      description: "%s is replaced by each page's title.",
      initialValue: "%s | Ras Al Assad Electromechanical Works",
    }),
    defineField({
      name: "defaultSeo",
      type: "seo",
      title: "Site-wide fallbacks",
      group: "seo",
    }),

    // ── Integrations ────────────────────────────────────────────────────
    defineField({
      name: "ga4Id",
      type: "string",
      title: "Google Analytics ID",
      group: "integrations",
      description: "Looks like G-XXXXXXX. Your developer/marketer will give you this.",
    }),
    defineField({
      name: "gtmId",
      type: "string",
      title: "Google Tag Manager ID",
      group: "integrations",
      description: "Looks like GTM-XXXXXXX.",
    }),
    defineField({
      name: "metaPixelId",
      type: "string",
      title: "Meta (Facebook) Pixel ID",
      group: "integrations",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
