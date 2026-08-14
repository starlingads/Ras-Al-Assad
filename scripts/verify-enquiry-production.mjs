/**
 * End-to-end production verification for the enquiry email backend.
 *
 * Run this ON the Hostinger server once the app is deployed and the SMTP
 * variables are set. It exercises the live endpoints over HTTP exactly as a
 * visitor's browser would, and prints a report that can be pasted back.
 *
 *   node scripts/verify-enquiry-production.mjs https://your-live-site \
 *        --inbox you@example.com
 *
 * `--inbox` is the address that receives the acknowledgement copies, so you can
 * confirm delivery. Omit it and the live sends are skipped (validation,
 * honeypot and rate-limit checks still run).
 *
 * Nothing here prints credentials.
 */

const base = (process.argv[2] || "").replace(/\/$/, "");
const inboxFlag = process.argv.indexOf("--inbox");
const inbox = inboxFlag > -1 ? process.argv[inboxFlag + 1] : null;

if (!base || !/^https?:\/\//.test(base)) {
  console.error(
    "Usage: node scripts/verify-enquiry-production.mjs <site-url> [--inbox you@example.com]",
  );
  process.exit(1);
}

const line = (s = "") => console.log(s);
const pass = (s) => console.log(`  PASS  ${s}`);
const fail = (s) => console.log(`  FAIL  ${s}`);
const info = (s) => console.log(`  ..    ${s}`);

let failures = 0;
const check = (cond, okMsg, failMsg) => {
  if (cond) pass(okMsg);
  else { fail(failMsg); failures++; }
};

async function post(path, body) {
  const started = Date.now();
  try {
    const res = await fetch(base + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    return {
      status: res.status,
      json,
      retryAfter: res.headers.get("retry-after"),
      ms: Date.now() - started,
    };
  } catch (e) {
    return { status: "NETWORK_ERROR", json: { error: e.message }, ms: Date.now() - started };
  }
}

/** A submission old enough to clear the "too fast" spam trap. */
const humanTiming = () => Date.now() - 30_000;

async function main() {
  line("Enquiry backend — production verification");
  line("=".repeat(64));
  line(`  target : ${base}`);
  line(`  inbox  : ${inbox || "(not set — live sends skipped)"}`);
  line();

  // ── 0. Routes exist ────────────────────────────────────────────────────
  line("0. Endpoints reachable");
  for (const p of [
    "/api/enquiry/contact",
    "/api/enquiry/solar-calculator",
    "/api/enquiry/service",
    "/api/enquiry/project",
  ]) {
    // An empty body must be rejected by validation (422), not 404.
    const r = await post(p, { form_rendered_at: humanTiming() });
    const exists = r.status !== 404 && r.status !== "NETWORK_ERROR";
    check(exists, `${p} → ${r.status}`, `${p} → ${r.status} (route missing or unreachable)`);
  }

  // ── 1. Server-side validation ──────────────────────────────────────────
  line();
  line("1. Server-side validation");
  const bad = await post("/api/enquiry/contact", {
    contactName: "",
    email: "not-an-email",
    message: "",
    form_rendered_at: humanTiming(),
  });
  check(
    bad.status === 422 && Array.isArray(bad.json.errors) && bad.json.errors.length >= 3,
    `rejected with 422 and ${bad.json.errors?.length ?? 0} field errors`,
    `expected 422 with field errors, got ${bad.status} ${JSON.stringify(bad.json).slice(0, 120)}`,
  );

  // ── 2. Spam protection ─────────────────────────────────────────────────
  line();
  line("2. Spam protection");
  const honeypot = await post("/api/enquiry/contact", {
    contactName: "Bot", email: "bot@spam.test", message: "spam",
    company_website: "http://spam.test",
    form_rendered_at: humanTiming(),
  });
  check(
    honeypot.status === 200 && honeypot.json.ok === true,
    "honeypot submission silently accepted (200) — nothing sent",
    `honeypot handling unexpected: ${honeypot.status}`,
  );

  const tooFast = await post("/api/enquiry/contact", {
    contactName: "Speedy", email: "fast@spam.test", message: "instant",
    form_rendered_at: Date.now(),
  });
  check(
    tooFast.status === 200 && tooFast.json.ok === true,
    "sub-2s submission silently accepted (200) — nothing sent",
    `timing trap unexpected: ${tooFast.status}`,
  );

  // ── 3. Header injection ────────────────────────────────────────────────
  line();
  line("3. SMTP header injection");
  const inject = await post("/api/enquiry/project", {
    name: "Evil\r\nBcc: victim@elsewhere.test",
    email: inbox || "injection@example.test",
    projectName: "Injection probe",
    message: "CRLF header injection probe",
    form_rendered_at: humanTiming(),
  });
  check(
    inject.status !== 500,
    `handled without server error (${inject.status})`,
    `unexpected server error: ${inject.status}`,
  );
  info("confirm no Bcc reached an unexpected recipient (check the mailbox)");

  // ── 4. Live sends ──────────────────────────────────────────────────────
  line();
  line("4. Live delivery");
  if (!inbox) {
    info("skipped — pass --inbox <address> to send real enquiries");
  } else {
    const contact = await post("/api/enquiry/contact", {
      contactName: "Production Test",
      companyName: "Verification Run",
      email: inbox,
      phone: "0501234567",
      serviceType: "Solar PV EPC",
      message:
        "Automated production verification of the Contact form. Safe to delete.",
      form_rendered_at: humanTiming(),
    });
    check(
      contact.status === 200 && contact.json.ok === true,
      `Contact form accepted (${contact.ms}ms)`,
      `Contact form failed: ${contact.status} ${JSON.stringify(contact.json).slice(0, 200)}`,
    );

    const solar = await post("/api/enquiry/solar-calculator", {
      name: "Production Test",
      email: inbox,
      phone: "0501234567",
      propertyType: "Commercial Warehouse",
      monthlyBill: "12,000",
      systemSize: "195 kWp",
      capitalCost: "702,000",
      payback: "6.1",
      co2: "234",
      notes: "Automated production verification of the Solar Calculator. Safe to delete.",
      form_rendered_at: humanTiming(),
    });
    check(
      solar.status === 200 && solar.json.ok === true,
      `Solar Calculator accepted (${solar.ms}ms)`,
      `Solar Calculator failed: ${solar.status} ${JSON.stringify(solar.json).slice(0, 200)}`,
    );
  }

  // ── 5. Rate limiting ───────────────────────────────────────────────────
  line();
  line("5. Rate limiting (5 per IP per 15 min)");
  const statuses = [];
  for (let i = 0; i < 7; i++) {
    const r = await post("/api/enquiry/service", {
      name: `RateLimit ${i}`,
      email: "ratelimit@example.test",
      serviceName: "Rate limit probe",
      message: "probe",
      form_rendered_at: humanTiming(),
    });
    statuses.push(r.status + (r.retryAfter ? `(retry ${r.retryAfter}s)` : ""));
  }
  const got429 = statuses.some((s) => String(s).startsWith("429"));
  check(
    got429,
    `limiter engaged: ${statuses.join(" ")}`,
    `no 429 seen — limiter may not be working: ${statuses.join(" ")}`,
  );

  // ── Summary ────────────────────────────────────────────────────────────
  line();
  line("=".repeat(64));
  if (failures === 0) {
    pass("All automated checks passed.");
  } else {
    fail(`${failures} check(s) failed — see above.`);
  }
  line();
  line("Manual confirmation still required:");
  line(`  1. Internal notifications arrived at MAIL_TO`);
  line(`  2. Acknowledgement emails arrived at ${inbox || "the submitter"}`);
  line(`  3. Both render correctly (branding, no raw HTML, no missing values)`);
  line();
  line("Note: this run consumes the rate-limit budget for this IP for 15 minutes.");
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  fail(`verification crashed: ${e.message}`);
  process.exit(1);
});
