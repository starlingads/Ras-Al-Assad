import "server-only";

/**
 * Server-side validation and sanitisation for every enquiry form.
 *
 * Nothing here trusts the client. The browser forms do their own `required`
 * checks for UX, but these run again on the server because a POST can be sent
 * from anywhere.
 */

/** Fields a spam bot fills in but a human never sees. */
export const HONEYPOT_FIELD = "company_website";

/**
 * Matches C0 control characters and DEL, deliberately excluding tab (9) and
 * newline (10) — a message body legitimately contains those.
 *
 * Built with `String.fromCharCode` so no raw control bytes ever sit in this
 * source file; written literally they do not survive editors and diffs intact.
 */
const CONTROL_CHARS = new RegExp(
  "[" +
    String.fromCharCode(0) + "-" + String.fromCharCode(8) +
    String.fromCharCode(11) + String.fromCharCode(12) +
    String.fromCharCode(14) + "-" + String.fromCharCode(31) +
    String.fromCharCode(127) +
    "]",
  "g",
);

/**
 * Strip control characters and clamp length.
 *
 * The values end up in an HTML email, so `escapeHtml` (below) is what prevents
 * markup injection; this pass removes the characters that let an attacker forge
 * extra SMTP headers or smuggle terminal escapes into logs.
 */
export function sanitizeText(value: unknown, maxLength = 2000): string {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL_CHARS, " ").trim().slice(0, maxLength);
}

/**
 * Sanitise a value destined for a mail header (subject, reply-to).
 *
 * CRLF here would let a submitter inject `Bcc:` and turn the contact form into
 * an open relay, so newlines are removed outright rather than collapsed.
 */
export function sanitizeHeader(value: unknown, maxLength = 200): string {
  return sanitizeText(value, maxLength).replace(/[\r\n]/g, " ");
}

/** Escape for safe interpolation into the HTML email templates. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Pragmatic email check.
 *
 * Deliberately not RFC 5322 — that regex rejects valid addresses and accepts
 * nonsense. This catches typos and obvious junk; deliverability is the real
 * validator.
 */
export function isValidEmail(value: string): boolean {
  if (value.length > 254) return false;
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value);
}

/** Phone numbers arrive in many shapes; check it plausibly contains digits. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 20;
}

export type FieldSpec = {
  /** Maximum accepted length before truncation. */
  max?: number;
  required?: boolean;
  type?: "text" | "email" | "phone";
  /** Human label used in error messages and the email body. */
  label: string;
};

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: string[] };

/**
 * Validate a payload against a field spec.
 *
 * Returns every problem at once so the client can show them together rather
 * than one refresh at a time.
 */
export function validatePayload(
  body: Record<string, unknown>,
  spec: Record<string, FieldSpec>,
): ValidationResult<Record<string, string>> {
  const errors: string[] = [];
  const data: Record<string, string> = {};

  for (const [key, field] of Object.entries(spec)) {
    const value = sanitizeText(body[key], field.max ?? 2000);

    if (!value) {
      if (field.required) errors.push(`${field.label} is required.`);
      data[key] = "";
      continue;
    }

    if (field.type === "email" && !isValidEmail(value)) {
      errors.push(`${field.label} must be a valid email address.`);
    }
    if (field.type === "phone" && !isValidPhone(value)) {
      errors.push(`${field.label} must be a valid phone number.`);
    }

    data[key] = value;
  }

  return errors.length ? { ok: false, errors } : { ok: true, data };
}

/**
 * True when the submission looks automated.
 *
 * Two signals: the honeypot field (invisible to humans, irresistible to naive
 * bots) and a submission that arrives implausibly fast after the form rendered.
 */
export function looksLikeSpam(body: Record<string, unknown>): boolean {
  const honeypot = sanitizeText(body[HONEYPOT_FIELD], 200);
  if (honeypot) return true;

  const renderedAt = Number(body.form_rendered_at);
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    const elapsed = Date.now() - renderedAt;
    // Under 2s is faster than a human can read the form and type.
    if (elapsed >= 0 && elapsed < 2000) return true;
  }
  return false;
}
