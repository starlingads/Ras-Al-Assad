import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

/**
 * ESLint flat config.
 *
 * Next.js 16 removed the `next lint` command, so linting runs through the
 * ESLint CLI directly (`npm run lint`). `eslint-config-next` ships flat config
 * arrays natively from v16, so no `FlatCompat` shim is needed.
 */
const config = [
  ...nextCoreWebVitals,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      // Ad-hoc developer scratch files, not part of the application.
      "scratch/**",
      "scratch_fetch.js",
      "fetch_projects.js",
    ],
  },
  {
    rules: {
      /**
       * Downgraded from error to warning.
       *
       * `eslint-config-next@16` enables this React Compiler-era rule, which
       * flags four pre-existing call sites that predate the CMS work:
       *   - Hero.tsx, ExpertiseSlider.tsx, ProjectsSlider.tsx — the
       *     `setIsMounted(true)` guard used to defer client-only rendering
       *   - SolarCalculatorClient.tsx — deriving results on mount
       *
       * The advice is sound (see https://react.dev/learn/you-might-not-need-an-effect),
       * but acting on it means reworking animation-sensitive components, which
       * is out of scope while migrating to the CMS. Phase 3 rewrites each of
       * these components to take their data from Sanity — that is the point at
       * which to remove the pattern properly. Kept visible as a warning rather
       * than switched off so it is not silently lost.
       */
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
