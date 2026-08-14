import { handleEnquiry } from "@/server/mail/handle-enquiry";

/** Never prerender or cache a form endpoint. */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleEnquiry(request, {
    label: "Contact Enquiry",
    emailField: "email",
    nameField: "contactName",
    spec: {
      contactName: { label: "Contact Name", required: true, max: 120 },
      companyName: { label: "Company", max: 160 },
      email: { label: "Email", required: true, type: "email", max: 254 },
      phone: { label: "Phone", type: "phone", max: 40 },
      serviceType: { label: "Required Discipline", max: 160 },
      message: { label: "Message", required: true, max: 5000 },
    },
    subject: (d) =>
      `Website enquiry — ${d.contactName}${d.companyName ? ` (${d.companyName})` : ""}`,
  });
}
