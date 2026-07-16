import { defineType } from "sanity";

/**
 * Curated icon list — the lucide icon names already used across the site.
 * Rendered as a searchable dropdown; the frontend maps each name to its
 * lucide-react component. (A visual icon input is a listed Phase-5 upgrade.)
 */
export const ICON_NAMES = [
  "Sun",
  "Wind",
  "Settings",
  "Zap",
  "Droplets",
  "Leaf",
  "Shield",
  "Award",
  "Calendar",
  "Wrench",
  "Building2",
  "Globe",
  "Factory",
  "PlugZap",
  "Gauge",
  "HardHat",
  "Recycle",
  "BadgeCheck",
  "Target",
  "TrendingUp",
  "Star",
  "Users",
  "CheckCircle",
  "Trophy",
  "Cpu",
  "Combine",
  "FileCheck",
  "Activity",
  "Eye",
] as const;

export const iconPicker = defineType({
  name: "iconPicker",
  title: "Icon",
  type: "string",
  options: {
    list: ICON_NAMES.map((name) => ({ title: name, value: name })),
  },
});
