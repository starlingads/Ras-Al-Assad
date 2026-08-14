import { handleEnquiry } from "@/server/mail/handle-enquiry";

export const dynamic = "force-dynamic";

/**
 * Project enquiry — for "enquire about this project" on a project card or
 * detail view. `projectName` carries which project prompted the enquiry.
 */
export async function POST(request: Request) {
  return handleEnquiry(request, {
    label: "Project Enquiry",
    emailField: "email",
    nameField: "name",
    spec: {
      name: { label: "Name", required: true, max: 120 },
      companyName: { label: "Company", max: 160 },
      email: { label: "Email", required: true, type: "email", max: 254 },
      phone: { label: "Phone", type: "phone", max: 40 },
      projectName: { label: "Project of Interest", required: true, max: 200 },
      message: { label: "Message", required: true, max: 5000 },
    },
    subject: (d) => `Project enquiry — ${d.projectName} — ${d.name}`,
  });
}
