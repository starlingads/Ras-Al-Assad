import { SparklesIcon } from "@sanity/icons/Sparkles";
import { defineField, defineType } from "sanity";

/**
 * The Solar Calculator page. The assumption numbers were lifted verbatim
 * from the previous hardcoded implementation — changing any of them
 * changes every estimate the calculator produces.
 */
export const solarCalculatorPage = defineType({
  name: "solarCalculatorPage",
  title: "Solar Calculator",
  type: "document",
  icon: SparklesIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "assumptions", title: "Calculation Numbers" },
    { name: "options", title: "Options" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", title: "Page top", group: "hero" }),
    defineField({
      name: "assumptions",
      type: "object",
      title: "Calculation numbers",
      group: "assumptions",
      description:
        "⚠ Changing any number here changes every estimate the calculator shows.",
      fields: [
        defineField({
          name: "tariffAedPerKwh",
          type: "number",
          title: "Electricity tariff (AED per kWh)",
          description: "DEWA commercial/industrial tariff. Currently 0.38.",
          initialValue: 0.38,
          validation: (r) => r.required().positive().error("Enter the tariff, e.g. 0.38"),
        }),
        defineField({
          name: "selfConsumptionFactor",
          type: "number",
          title: "Usable consumption share (0–1)",
          description: "How much of the bill solar can offset when sizing. Currently 0.85.",
          initialValue: 0.85,
          validation: (r) => r.required().min(0).max(1).error("Use a number between 0 and 1"),
        }),
        defineField({
          name: "yieldKwhPerKwpYear",
          type: "number",
          title: "Annual yield (kWh per kWp)",
          description: "Dubai average generation per installed kWp. Currently 1650.",
          initialValue: 1650,
          validation: (r) => r.required().positive().error("Enter the annual yield, e.g. 1650"),
        }),
        defineField({
          name: "costAedPerKwp",
          type: "number",
          title: "Installed cost (AED per kWp)",
          description: "Average turnkey cost per kWp. Currently 3600.",
          initialValue: 3600,
          validation: (r) => r.required().positive().error("Enter the cost per kWp, e.g. 3600"),
        }),
        defineField({
          name: "savingsRate",
          type: "number",
          title: "Bill savings share (0–1)",
          description: "Share of the bill saved per year. Currently 0.80.",
          initialValue: 0.8,
          validation: (r) => r.required().min(0).max(1).error("Use a number between 0 and 1"),
        }),
        defineField({
          name: "savingsHorizonYears",
          type: "number",
          title: "Savings horizon (years)",
          description: "Used for the long-term savings figure. Currently 20.",
          initialValue: 20,
          validation: (r) => r.required().positive().error("Enter the number of years, e.g. 20"),
        }),
        defineField({
          name: "co2TonnesPerKwp",
          type: "number",
          title: "CO₂ offset (tonnes per kWp per year)",
          description: "Currently 1.2.",
          initialValue: 1.2,
          validation: (r) => r.required().positive().error("Enter the CO₂ factor, e.g. 1.2"),
        }),
        defineField({
          name: "kwpPerPanel",
          type: "number",
          title: "Panel size (kWp per module)",
          description: "Used for the “modules required” line. Currently 0.5.",
          initialValue: 0.5,
          validation: (r) => r.required().positive().error("Enter the panel size, e.g. 0.5"),
        }),
      ],
    }),
    defineField({
      name: "leadGateEnabled",
      type: "boolean",
      title: "Ask visitors for contact details first",
      group: "options",
      initialValue: true,
      description: "Shows the contact pop-up before the calculator can be used.",
    }),
    defineField({
      name: "disclaimer",
      type: "text",
      rows: 3,
      title: "Disclaimer (optional)",
      group: "options",
      description: "Small print under the results.",
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Solar Calculator" }) },
});
