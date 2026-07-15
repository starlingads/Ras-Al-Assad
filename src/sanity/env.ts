/**
 * Sanity connection settings, read from the environment.
 *
 * These are validated at module load so a misconfigured deployment fails fast
 * with an actionable message, rather than surfacing as a confusing runtime
 * error inside the Studio or a GROQ request.
 *
 * `NEXT_PUBLIC_*` values are safe to expose to the browser: the project ID and
 * dataset name are public identifiers. Secrets (read/write tokens) must never
 * use the `NEXT_PUBLIC_` prefix.
 */

/**
 * The Content Lake API version, pinned to a date.
 *
 * Pinning means Sanity's API behaviour never changes underneath us; bumping it
 * is a deliberate, reviewable act. Do not change this to `vX` (Sanity's
 * "latest" alias) — that reintroduces the drift the pin exists to prevent.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}\n\n` +
        `Add it to .env.local (copy .env.example as a starting point).\n\n` +
        `If the Sanity project does not exist yet, create it under the ` +
        `StarlingAds account:\n` +
        `  npx sanity login\n` +
        `  npx sanity init --project-name "Ras Al Assad" --dataset production\n\n` +
        `An existing project ID can be found at https://sanity.io/manage\n` +
        `Remember to set the same variables on Vercel.`,
    );
  }

  return value;
}
