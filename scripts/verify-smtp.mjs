/**
 * Microsoft 365 SMTP connectivity diagnostic.
 *
 * Run this ON the Hostinger server (where the app will actually send from) —
 * SMTP works or fails per-network, so a pass on a laptop proves nothing about
 * production. It performs the real Exchange Online handshake: TCP connect,
 * STARTTLS upgrade, AUTH LOGIN. Optionally sends one real test message.
 *
 *   node scripts/verify-smtp.mjs                  # verify connection + auth
 *   node scripts/verify-smtp.mjs --send you@x.com # also send a live test mail
 *
 * Reads the same env vars the app uses. Nothing is printed that could expose
 * the password.
 */
import net from "node:net";
import nodemailer from "nodemailer";

const env = {
  host: process.env.SMTP_HOST || "smtp.office365.com",
  port: Number(process.env.SMTP_PORT || 587),
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD,
  from: process.env.MAIL_FROM || process.env.SMTP_USER,
  to: process.env.MAIL_TO,
};

const sendTo = process.argv.includes("--send")
  ? process.argv[process.argv.indexOf("--send") + 1]
  : null;

const line = (s = "") => console.log(s);
const ok = (s) => console.log(`  PASS  ${s}`);
const bad = (s) => console.log(`  FAIL  ${s}`);

/**
 * Every Exchange Online failure we can anticipate, mapped to the exact admin
 * change that fixes it. Deliberately no workarounds — these are all things that
 * must be corrected in Microsoft 365 or the network, not coded around.
 */
function explain(err) {
  const msg = String(err && (err.message || err));
  const code = (err && err.code) || "";
  const rules = [
    {
      match: /535|5\.7\.139|authentication unsuccessful/i,
      title: "Authentication rejected by Exchange Online",
      fix: [
        "SMTP AUTH is disabled for this mailbox, or the password is wrong/not an App Password.",
        "1) Microsoft 365 admin centre → Users → Active users → info@rasalassad.ae",
        "   → Mail tab → Manage email apps → tick 'Authenticated SMTP' → Save.",
        "2) If Security Defaults or Conditional Access/MFA is enforced, a normal",
        "   password will ALWAYS be rejected. Create an App Password:",
        "   myaccount.microsoft.com → Security info → Add sign-in method → App password.",
        "   Use that value as SMTP_PASSWORD.",
        "3) Tenant-wide switch (if the per-user toggle is greyed out):",
        "   Set-TransportConfig -SmtpClientAuthenticationDisabled $false",
        "   then per mailbox: Set-CASMailbox -Identity info@rasalassad.ae -SmtpClientAuthenticationEnabled $true",
      ],
    },
    {
      match: /5\.7\.57|not permitted to send as|SendAsDenied/i,
      title: "MAIL_FROM is not an address this mailbox may send as",
      fix: [
        "Exchange Online only allows a From the authenticated mailbox owns.",
        "Set MAIL_FROM to exactly SMTP_USER, or grant SendAs rights:",
        "  Add-RecipientPermission <address> -AccessRights SendAs -Trustee info@rasalassad.ae",
      ],
    },
    {
      match: /ETIMEDOUT|ECONNREFUSED|EHOSTUNREACH|ENETUNREACH/i,
      title: "Cannot reach smtp.office365.com:587 from this server",
      fix: [
        "The host is blocking outbound SMTP. This is a hosting/network change:",
        "1) Ask Hostinger support to open outbound TCP 587 for this VPS.",
        "2) Check the local firewall: ufw allow out 587/tcp",
        "3) Confirm from the server:  nc -vz smtp.office365.com 587",
      ],
    },
    {
      match: /wrong version number|SSL routines|EPROTO/i,
      title: "TLS negotiation failed",
      fix: [
        "Port 587 requires STARTTLS, not implicit TLS. Ensure SMTP_PORT=587",
        "(the app sets secure:false + requireTLS:true, which is correct).",
        "Port 465 is not offered by Exchange Online.",
      ],
    },
    {
      match: /ENOTFOUND|EAI_AGAIN/i,
      title: "DNS lookup for the SMTP host failed",
      fix: ["Check SMTP_HOST spelling and the server's DNS resolver."],
    },
    {
      match: /4\.7\.500|Server busy|too many|throttl/i,
      title: "Throttled by Exchange Online",
      fix: [
        "Exchange Online caps ~30 messages/minute and 10,000 recipients/day.",
        "Retry shortly; if sustained, use a dedicated sending service.",
      ],
    },
  ];
  const hit = rules.find((r) => r.match.test(msg) || r.match.test(code));
  line();
  line("  ── Diagnosis ──────────────────────────────────────────────");
  if (hit) {
    line(`  ${hit.title}`);
    line();
    hit.fix.forEach((f) => line(`  ${f}`));
  } else {
    line("  Unrecognised failure. Raw error below — send it to whoever");
    line("  administers the Microsoft 365 tenant.");
  }
  line();
  line(`  Raw error: ${msg}`);
  if (code) line(`  Code: ${code}`);
}

async function main() {
  line("Microsoft 365 SMTP diagnostic");
  line("═".repeat(62));
  line(`  host      ${env.host}:${env.port}`);
  line(`  user      ${env.user || "(not set)"}`);
  line(`  from      ${env.from || "(not set)"}`);
  line(`  to        ${env.to || "(not set)"}`);
  line(`  password  ${env.pass ? `set (${env.pass.length} chars)` : "(not set)"}`);
  line();

  const missing = ["SMTP_USER", "SMTP_PASSWORD", "MAIL_TO"].filter(
    (k) => !process.env[k],
  );
  if (missing.length) {
    bad(`Missing env vars: ${missing.join(", ")}`);
    line("  Set them in the Hostinger environment, then re-run.");
    process.exit(1);
  }

  // 1. Raw TCP reachability — separates "network blocked" from "auth refused".
  line("Step 1/3  TCP connect");
  try {
    await new Promise((resolve, reject) => {
      const sock = net.createConnection({ host: env.host, port: env.port });
      const t = setTimeout(() => {
        sock.destroy();
        reject(Object.assign(new Error("timed out after 10s"), { code: "ETIMEDOUT" }));
      }, 10_000);
      sock.once("connect", () => { clearTimeout(t); sock.end(); resolve(); });
      sock.once("error", (e) => { clearTimeout(t); reject(e); });
    });
    ok(`reached ${env.host}:${env.port}`);
  } catch (e) {
    bad(`cannot reach ${env.host}:${env.port}`);
    explain(e);
    process.exit(1);
  }

  // 2. STARTTLS + AUTH, without sending anything.
  line();
  line("Step 2/3  STARTTLS + authentication");
  const transport = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: env.port === 465,
    requireTLS: env.port !== 465,
    auth: { user: env.user, pass: env.pass },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
    tls: { minVersion: "TLSv1.2" },
  });

  try {
    await transport.verify();
    ok("STARTTLS upgrade and AUTH LOGIN accepted");
  } catch (e) {
    bad("authentication or TLS failed");
    explain(e);
    process.exit(1);
  }

  // 3. Optional live send.
  line();
  if (!sendTo) {
    line("Step 3/3  live send  (skipped — pass --send <address> to run it)");
    line();
    line("═".repeat(62));
    ok("SMTP is correctly configured on this server.");
    return;
  }

  line(`Step 3/3  live send to ${sendTo}`);
  try {
    const info = await transport.sendMail({
      from: { name: "Ras Al Assad Electromechanical Works L.L.C", address: env.from },
      to: sendTo,
      subject: "SMTP diagnostic — Ras Al Assad website",
      text:
        "This is an automated connectivity test from the Ras Al Assad website.\n" +
        "If you are reading this, Microsoft 365 SMTP is working from the production server.",
    });
    ok(`accepted by Exchange Online (id ${info.messageId})`);
    line(`  accepted: ${JSON.stringify(info.accepted)}`);
    if (info.rejected?.length) line(`  rejected: ${JSON.stringify(info.rejected)}`);
    line();
    line("═".repeat(62));
    ok("SMTP verified end to end. Check the inbox to confirm delivery.");
  } catch (e) {
    bad("send failed");
    explain(e);
    process.exit(1);
  }
}

main().catch((e) => { explain(e); process.exit(1); });
