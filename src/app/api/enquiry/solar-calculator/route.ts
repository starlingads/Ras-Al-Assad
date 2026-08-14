import { handleEnquiry } from "@/server/mail/handle-enquiry";

export const dynamic = "force-dynamic";

/**
 * The calculator posts the visitor's details plus the figures they were shown,
 * so the sales team can see the exact estimate the enquiry refers to. Those
 * figures are computed client-side and are therefore untrusted display values —
 * they are sanitised like any other field and never used for logic.
 */
export async function POST(request: Request) {
  return handleEnquiry(request, {
    label: "Solar Calculator Enquiry",
    emailField: "email",
    nameField: "name",
    spec: {
      name: { label: "Name", required: true, max: 120 },
      email: { label: "Email", required: true, type: "email", max: 254 },
      phone: { label: "Phone", required: true, type: "phone", max: 40 },
      propertyType: { label: "Property Type", max: 120 },
      monthlyBill: { label: "Monthly DEWA Bill (AED)", max: 40 },
      systemSize: { label: "Estimated System Size", max: 40 },
      capitalCost: { label: "Estimated CAPEX (AED)", max: 40 },
      payback: { label: "Estimated Payback (years)", max: 40 },
      co2: { label: "Estimated CO2 Offset (tonnes)", max: 40 },
      notes: { label: "Notes", max: 5000 },
    },
    subject: (d) =>
      `Solar calculator enquiry — ${d.name}${d.systemSize ? ` (${d.systemSize})` : ""}`,
  });
}
