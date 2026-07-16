import type { Metadata } from "next";

import SolarCalculatorClient, {
  type SolarCalculatorData,
} from "./SolarCalculatorClient";
import { sanityFetch } from "@/sanity/lib/live";
import { SOLAR_CALCULATOR_PAGE_QUERY } from "@/sanity/lib/queries";
import { pageMetadata } from "@/sanity/lib/seo";

/** Fallbacks mirror the previous hardcoded calculator constants. */
const DEFAULT_ASSUMPTIONS: SolarCalculatorData["assumptions"] = {
  tariffAedPerKwh: 0.38,
  selfConsumptionFactor: 0.85,
  yieldKwhPerKwpYear: 1650,
  costAedPerKwp: 3600,
  savingsRate: 0.8,
  savingsHorizonYears: 20,
  co2TonnesPerKwp: 1.2,
  kwpPerPanel: 0.5,
};

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: SOLAR_CALCULATOR_PAGE_QUERY, stega: false });
  return pageMetadata(data?.seo ?? null, {
    fallbackTitle: "Solar Calculator",
    path: "/solar-calculator",
  });
}

export default async function SolarCalculatorPage() {
  const { data } = await sanityFetch({ query: SOLAR_CALCULATOR_PAGE_QUERY });
  const a = data?.assumptions;

  const viewData: SolarCalculatorData = {
    hero: {
      chip: data?.hero?.chip,
      title: data?.hero?.title,
      titleAccent: data?.hero?.titleAccent,
      titleEnd: data?.hero?.titleEnd,
      subtitle: data?.hero?.subtitle,
    },
    assumptions: {
      tariffAedPerKwh: a?.tariffAedPerKwh ?? DEFAULT_ASSUMPTIONS.tariffAedPerKwh,
      selfConsumptionFactor: a?.selfConsumptionFactor ?? DEFAULT_ASSUMPTIONS.selfConsumptionFactor,
      yieldKwhPerKwpYear: a?.yieldKwhPerKwpYear ?? DEFAULT_ASSUMPTIONS.yieldKwhPerKwpYear,
      costAedPerKwp: a?.costAedPerKwp ?? DEFAULT_ASSUMPTIONS.costAedPerKwp,
      savingsRate: a?.savingsRate ?? DEFAULT_ASSUMPTIONS.savingsRate,
      savingsHorizonYears: a?.savingsHorizonYears ?? DEFAULT_ASSUMPTIONS.savingsHorizonYears,
      co2TonnesPerKwp: a?.co2TonnesPerKwp ?? DEFAULT_ASSUMPTIONS.co2TonnesPerKwp,
      kwpPerPanel: a?.kwpPerPanel ?? DEFAULT_ASSUMPTIONS.kwpPerPanel,
    },
    leadGateEnabled: data?.leadGateEnabled ?? true,
    disclaimer: data?.disclaimer,
  };

  return <SolarCalculatorClient data={viewData} />;
}
