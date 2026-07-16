import {
  Activity,
  Award,
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle,
  Combine,
  Cpu,
  Droplets,
  Eye,
  Factory,
  FileCheck,
  Gauge,
  Globe,
  HardHat,
  Leaf,
  PlugZap,
  Recycle,
  Settings,
  Shield,
  Star,
  Sun,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Wind,
  Wrench,
  Zap,
  type LucideProps,
} from "lucide-react";

/**
 * Maps the CMS icon names (see the iconPicker schema type) to their
 * lucide-react components. Works in server and client components.
 *
 * Adding an icon = add it here AND to ICON_NAMES in
 * src/sanity/schemaTypes/objects/iconPicker.ts.
 */
const ICONS = {
  Activity,
  Award,
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle,
  Combine,
  Cpu,
  Droplets,
  Eye,
  Factory,
  FileCheck,
  Gauge,
  Globe,
  HardHat,
  Leaf,
  PlugZap,
  Recycle,
  Settings,
  Shield,
  Star,
  Sun,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Wind,
  Wrench,
  Zap,
} as const;

export type LucideIconName = keyof typeof ICONS;

export function LucideIcon({
  name,
  fallback = "BadgeCheck",
  ...props
}: Omit<LucideProps, "name"> & { name?: string | null; fallback?: LucideIconName }) {
  const Icon = (name && ICONS[name as LucideIconName]) || ICONS[fallback];
  return <Icon {...props} />;
}
