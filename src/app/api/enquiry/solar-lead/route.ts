import { handleEnquiry } from "@/server/mail/handle-enquiry";

export const dynamic = "force-dynamic";

/**
 * The lead-capture gate shown BEFORE the solar calculator opens.
 *
 * This is a marketing lead: the visitor has given their details but has not
 * yet requested a site audit, so it is deliberately a separate endpoint from
 * /api/enquiry/solar-calculator (the post-calculation "Secure Free Site Audit"
 * enquiry). Separate endpoints mean separate subject lines and separate rate
 * limit buckets, so a lead never consumes the budget of a real audit request.
 *
 * `company` and `location` are accepted but not yet collected by the popup —
 * the gate asks only for bill, name, email and phone, to keep friction low.
 * They are declared here so adding the inputs later needs no backend change;
 * the email template omits empty rows.
 */
export async function POST(request: Request) {
  return handleEnquiry(request, {
    // Drives the email heading: internalTemplate renders `New ${label}`,
    // producing exactly "New Solar Calculator Lead".
    label: "Solar Calculator Lead",
    emailField: "email",
    nameField: "name",
    spec: {
      name: { label: "Name", required: true, max: 120 },
      company: { label: "Company", max: 160 },
      email: { label: "Email", required: true, type: "email", max: 254 },
      phone: { label: "Phone", required: true, type: "phone", max: 40 },
      location: { label: "Location", max: 200 },
      monthlyBill: { label: "Monthly DEWA Bill (AED)", max: 40 },
    },
    subject: (d) =>
      `New solar calculator lead — ${d.name}${d.monthlyBill ? ` (AED ${d.monthlyBill}/month)` : ""}`,
  });
}
