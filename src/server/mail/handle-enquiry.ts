import "server-only";

import { NextResponse } from "next/server";

import { clientIp, rateLimit } from "./rate-limit";
import { acknowledgementTemplate, internalTemplate, type Row } from "./templates";
import { getMailEnv, getTransport } from "./transport";
import {
  looksLikeSpam,
  sanitizeHeader,
  validatePayload,
  type FieldSpec,
} from "./validation";

/**
 * The shared pipeline behind every enquiry endpoint.
 *
 * Each route supplies only what differs (its fields, its labels); the security
 * behaviour — rate limit, honeypot, validation, sanitisation, error handling —
 * lives here once so the four forms cannot drift apart.
 *
 * Order matters: cheap rejections (rate limit, spam) happen before any parsing
 * or SMTP work, so a flood costs almost nothing.
 */

export type EnquiryConfig = {
  /** Human label: "Contact Enquiry", "Solar Calculator Enquiry", … */
  label: string;
  /** Field definitions, in the order they should appear in the email. */
  spec: Record<string, FieldSpec>;
  /** Which field holds the sender's email (used for Reply-To + the ack). */
  emailField: string;
  /** Which field holds the sender's name (used to personalise the ack). */
  nameField?: string;
  /** Subject line prefix for the internal notification. */
  subject: (data: Record<string, string>) => string;
  /** Max submissions per IP per window. */
  limit?: number;
  windowMs?: number;
};

const COMPANY = "Ras Al Assad Electromechanical Works L.L.C";
const REPLY_HOURS = "one business day";

export async function handleEnquiry(
  request: Request,
  config: EnquiryConfig,
): Promise<NextResponse> {
  const ip = clientIp(request.headers);
  const limit = config.limit ?? 5;
  const windowMs = config.windowMs ?? 15 * 60 * 1000;

  // 1. Rate limit first — before parsing, so abuse is cheap to reject.
  const rl = rateLimit(`${config.label}:${ip}`, { limit, windowMs });
  if (!rl.allowed) {
    console.warn(`[enquiry] rate limited ${config.label} ip=${ip}`);
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  // 2. Parse.
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // 3. Spam. Answer 200 so bots get no signal about what tripped the filter,
  //    while nothing is actually sent.
  if (looksLikeSpam(body)) {
    console.warn(`[enquiry] spam blocked ${config.label} ip=${ip}`);
    return NextResponse.json({ ok: true });
  }

  // 4. Validate + sanitise.
  const result = validatePayload(body, config.spec);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.errors.join(" "), errors: result.errors },
      { status: 422 },
    );
  }
  const data = result.data;

  // 5. Configuration. A missing mailbox is an operator problem, not a user
  //    one — log loudly, tell the visitor plainly, do not pretend it worked.
  const env = getMailEnv();
  if (!env) {
    console.error(
      `[enquiry] SMTP not configured — set SMTP_HOST/SMTP_USER/SMTP_PASSWORD/MAIL_TO. Dropped ${config.label} from ${data[config.emailField] || "unknown"}`,
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email delivery is not configured yet. Please call our office or email us directly.",
      },
      { status: 503 },
    );
  }

  const rows: Row[] = Object.entries(config.spec).map(([key, field]) => ({
    label: field.label,
    value: data[key] ?? "",
  }));

  const senderEmail = data[config.emailField] ?? "";
  const senderName = config.nameField ? (data[config.nameField] ?? "") : "";
  const submittedAt = new Date().toUTCString();
  const sourcePath = sanitizeHeader(
    request.headers.get("referer") || "the website",
    300,
  );

  const transport = getTransport(env);

  // 6. Deliver. The internal notification is the one that must not be lost;
  //    the acknowledgement is best-effort, so a bounce on the visitor's side
  //    never costs the business the lead.
  try {
    const internal = internalTemplate({
      enquiryLabel: config.label,
      rows,
      companyName: COMPANY,
      submittedAt,
      sourcePath,
    });

    await transport.sendMail({
      from: { name: COMPANY, address: env.from },
      to: env.to,
      // Reply-To carries the visitor so staff can just hit reply. From stays
      // the authenticated mailbox — spoofing the visitor's domain would fail
      // SPF/DMARC and land the mail in junk.
      replyTo: senderEmail
        ? { name: sanitizeHeader(senderName) || senderEmail, address: senderEmail }
        : undefined,
      subject: sanitizeHeader(config.subject(data), 180),
      html: internal.html,
      text: internal.text,
    });
  } catch (error) {
    console.error(
      `[enquiry] FAILED to deliver ${config.label} from ${senderEmail || "unknown"}:`,
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your enquiry just now. Please try again, or contact our office directly.",
      },
      { status: 502 },
    );
  }

  if (senderEmail) {
    try {
      const ack = acknowledgementTemplate({
        name: senderName,
        enquiryLabel: config.label,
        rows,
        companyName: COMPANY,
        replyHours: REPLY_HOURS,
      });
      await transport.sendMail({
        from: { name: COMPANY, address: env.from },
        to: senderEmail,
        subject: `We've received your enquiry — ${COMPANY}`,
        html: ack.html,
        text: ack.text,
      });
    } catch (error) {
      // Logged, not surfaced: the enquiry itself already reached the business.
      console.error(
        `[enquiry] acknowledgement to ${senderEmail} failed:`,
        error instanceof Error ? error.message : error,
      );
    }
  }

  console.info(`[enquiry] delivered ${config.label} from ${senderEmail} ip=${ip}`);
  return NextResponse.json({ ok: true });
}
