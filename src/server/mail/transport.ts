import "server-only";

import nodemailer from "nodemailer";

/**
 * Office 365 SMTP transport.
 *
 * `server-only` is the guard that matters here: if any client component ever
 * imports this module (directly or transitively) the build fails, so the SMTP
 * password cannot be bundled into browser JavaScript by accident. None of
 * these variables carry the NEXT_PUBLIC_ prefix, so Next never inlines them.
 *
 * Office 365 requires STARTTLS on port 587 (`secure: false` means "upgrade the
 * plaintext connection with STARTTLS", not "unencrypted" — port 465/implicit
 * TLS is not offered by Exchange Online).
 */

export type MailEnv = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

/**
 * Read and validate the mail configuration.
 *
 * Returns null instead of throwing when unconfigured: the site must still
 * build and serve pages on a host that has no mail credentials yet. The API
 * routes turn a null config into a 503 with a logged reason, rather than a
 * crashed build.
 */
export function getMailEnv(): MailEnv | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  // Exchange Online only accepts a From that the authenticated mailbox owns
  // (itself, or an address it has SendAs rights on), so default From to the user.
  const from = process.env.MAIL_FROM || user || "";
  const to = process.env.MAIL_TO || "";

  if (!host || !user || !pass || !to || !Number.isFinite(port)) return null;
  return { host, port, user, pass, from, to };
}

let cached: nodemailer.Transporter | null = null;

/** Lazily create (and reuse) the pooled SMTP transport. */
export function getTransport(env: MailEnv): nodemailer.Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: env.port === 465, // 587 → STARTTLS, upgraded via requireTLS below
    requireTLS: env.port !== 465,
    auth: { user: env.user, pass: env.pass },
    // Reuse connections across submissions; Exchange Online throttles hard on
    // connection churn.
    pool: true,
    maxConnections: 2,
    maxMessages: 50,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: { minVersion: "TLSv1.2" },
  });
  return cached;
}
