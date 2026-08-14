import { handleEnquiry } from "@/server/mail/handle-enquiry";

export const dynamic = "force-dynamic";

/**
 * Service enquiry — for a "request this service" form on a service page.
 * `serviceName` should carry the service the visitor was looking at so the
 * enquiry arrives with its context attached.
 */
export async function POST(request: Request) {
  return handleEnquiry(request, {
    label: "Service Enquiry",
    emailField: "email",
    nameField: "name",
    spec: {
      name: { label: "Name", required: true, max: 120 },
      companyName: { label: "Company", max: 160 },
      email: { label: "Email", required: true, type: "email", max: 254 },
      phone: { label: "Phone", type: "phone", max: 40 },
      serviceName: { label: "Service", required: true, max: 160 },
      projectLocation: { label: "Project Location", max: 200 },
      message: { label: "Requirement", required: true, max: 5000 },
    },
    subject: (d) => `Service enquiry — ${d.serviceName} — ${d.name}`,
  });
}
