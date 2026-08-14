/**
 * Client-safe form constants.
 *
 * The server's copy lives in `src/server/mail/validation.ts`, which is marked
 * `server-only` and therefore cannot be imported by a client component. This
 * file exists so both sides agree on the honeypot field name without dragging
 * the SMTP code into the browser bundle. Keep the two in sync.
 */

/** Hidden field that only automated submitters fill in. */
export const HONEYPOT_FIELD = "company_website";

/**
 * Props for the hidden honeypot input.
 *
 * Hidden from sight, from assistive technology, and from autofill — a real
 * visitor can neither see nor tab into it, so any value means a bot.
 */
export const honeypotInputProps = {
  type: "text" as const,
  name: HONEYPOT_FIELD,
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true,
  className:
    "absolute left-[-9999px] top-0 h-px w-px opacity-0 pointer-events-none",
};
