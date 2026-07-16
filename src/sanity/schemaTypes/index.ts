import type { SchemaTypeDefinition } from "sanity";

// Shared objects
import { cta } from "./objects/cta";
import { figure } from "./objects/figure";
import { iconPicker } from "./objects/iconPicker";
import { link } from "./objects/link";
import { navItem } from "./objects/navItem";
import { pageHero } from "./objects/pageHero";
import { seo } from "./objects/seo";
import { stat } from "./objects/stat";

// Collections
import { accreditation } from "./documents/accreditation";
import { category } from "./documents/category";
import { certificate } from "./documents/certificate";
import { clientLogo } from "./documents/clientLogo";
import { ctaButton } from "./documents/ctaButton";
import { filterGroup } from "./documents/filterGroup";
import { partner } from "./documents/partner";
import { project } from "./documents/project";
import { projectFilter } from "./documents/projectFilter";
import { service } from "./documents/service";
import { teamMember } from "./documents/teamMember";

// Singletons
import { aboutPage } from "./singletons/aboutPage";
import { appreciationPage } from "./singletons/appreciationPage";
import { contactPage } from "./singletons/contactPage";
import { homePage } from "./singletons/homePage";
import { projectsPage } from "./singletons/projectsPage";
import { servicesPage } from "./singletons/servicesPage";
import { siteSettings } from "./singletons/siteSettings";
import { solarCalculatorPage } from "./singletons/solarCalculatorPage";
import { sustainabilityPage } from "./singletons/sustainabilityPage";
import { teamPage } from "./singletons/teamPage";

/**
 * Document types that exist exactly once. The desk structure pins each to a
 * fixed documentId (=== the type name); sanity.config strips them from the
 * global "+ Create" menu and removes destructive document actions.
 */
export const SINGLETON_TYPES: string[] = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "projectsPage",
  "sustainabilityPage",
  "appreciationPage",
  "teamPage",
  "contactPage",
  "solarCalculatorPage",
];

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  seo,
  figure,
  link,
  cta,
  pageHero,
  navItem,
  stat,
  iconPicker,
  // collections
  project,
  service,
  category,
  filterGroup,
  projectFilter,
  teamMember,
  certificate,
  accreditation,
  partner,
  clientLogo,
  ctaButton,
  // singletons
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  projectsPage,
  sustainabilityPage,
  appreciationPage,
  teamPage,
  contactPage,
  solarCalculatorPage,
];
