import "server-only";

import { escapeHtml } from "./validation";

/**
 * HTML email templates in the Ras Al Assad brand.
 *
 * Written for email clients, not browsers: table layout, inline styles, no
 * external CSS or webfonts (Outlook ignores <style>, Gmail strips <link>).
 * Colours are the site's verified palette — charcoal #121212, brand gold
 * #C5A880, the AA-safe text gold #82643B, and sand #F7F4EF. Gold is used as a
 * fill or on dark only; body copy uses charcoal/grey so the mail stays readable
 * (the same contrast rule the site follows).
 *
 * Every interpolated value passes through escapeHtml at the call site.
 */

const BRAND = {
  charcoal: "#121212",
  gold: "#C5A880",
  goldInk: "#82643B",
  sand: "#F7F4EF",
  grey: "#686868",
  light: "#FCFCFC",
};

export type Row = { label: string; value: string };

/** One label/value row of the enquiry detail table. */
function renderRows(rows: Row[]): string {
  return rows
    .filter((r) => r.value)
    .map(
      (r) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #E8E3DA;vertical-align:top;width:38%;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:${BRAND.goldInk};text-transform:uppercase;letter-spacing:.06em;">${escapeHtml(r.label)}</td>
        <td style="padding:12px 0;border-bottom:1px solid #E8E3DA;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:${BRAND.charcoal};">${escapeHtml(r.value).replace(/\n/g, "<br />")}</td>
      </tr>`,
    )
    .join("");
}

/** Shared shell: dark header band, white body card, muted footer. */
function shell({
  preheader,
  heading,
  intro,
  bodyHtml,
  footerNote,
  companyName,
}: {
  preheader: string;
  heading: string;
  intro: string;
  bodyHtml: string;
  footerNote: string;
  companyName: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.sand};">
  <!-- preheader: shown in the inbox preview, hidden in the body -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.sand};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${BRAND.light};border-radius:14px;overflow:hidden;border:1px solid #E8E3DA;">
          <tr>
            <td style="background:${BRAND.charcoal};padding:26px 32px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:.22em;text-transform:uppercase;color:${BRAND.gold};">${escapeHtml(companyName)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#FFFFFF;margin-top:8px;line-height:1.3;">${escapeHtml(heading)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:${BRAND.charcoal};">${escapeHtml(intro)}</p>
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 30px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${BRAND.grey};">${escapeHtml(footerNote)}</p>
            </td>
          </tr>
          <tr>
            <td style="background:${BRAND.sand};padding:16px 32px;border-top:1px solid #E8E3DA;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${BRAND.grey};">© ${new Date().getFullYear()} ${escapeHtml(companyName)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Internal notification sent to the Ras Al Assad mailbox. */
export function internalTemplate(opts: {
  enquiryLabel: string;
  rows: Row[];
  companyName: string;
  submittedAt: string;
  sourcePath: string;
}): { html: string; text: string } {
  const html = shell({
    preheader: `New ${opts.enquiryLabel} from the website`,
    heading: `New ${opts.enquiryLabel}`,
    intro: `A new enquiry was submitted from the website. Details below — reply directly to this email to respond to the sender.`,
    bodyHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${renderRows(opts.rows)}</table>`,
    footerNote: `Submitted ${opts.submittedAt} from ${opts.sourcePath}.`,
    companyName: opts.companyName,
  });

  const text =
    `New ${opts.enquiryLabel}\n\n` +
    opts.rows
      .filter((r) => r.value)
      .map((r) => `${r.label}: ${r.value}`)
      .join("\n") +
    `\n\nSubmitted ${opts.submittedAt} from ${opts.sourcePath}.`;

  return { html, text };
}

/** Acknowledgement sent back to the person who submitted the form. */
export function acknowledgementTemplate(opts: {
  name: string;
  enquiryLabel: string;
  rows: Row[];
  companyName: string;
  replyHours: string;
}): { html: string; text: string } {
  const greeting = opts.name ? `Thank you, ${opts.name}.` : "Thank you.";
  const html = shell({
    preheader: `We've received your ${opts.enquiryLabel.toLowerCase()} — our team will be in touch.`,
    heading: "We've received your enquiry",
    intro: `${greeting} Your ${opts.enquiryLabel.toLowerCase()} has reached our engineering team and we will respond within ${opts.replyHours}. A summary of what you sent is below.`,
    bodyHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${renderRows(opts.rows)}</table>`,
    footerNote:
      "This is an automated confirmation — there is no need to reply. If your enquiry is urgent, please call our office directly.",
    companyName: opts.companyName,
  });

  const text =
    `${greeting}\n\nYour ${opts.enquiryLabel.toLowerCase()} has reached our engineering team and we will respond within ${opts.replyHours}.\n\n` +
    opts.rows
      .filter((r) => r.value)
      .map((r) => `${r.label}: ${r.value}`)
      .join("\n") +
    `\n\nThis is an automated confirmation — there is no need to reply.`;

  return { html, text };
}
