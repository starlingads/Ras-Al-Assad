"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HONEYPOT_FIELD, honeypotInputProps } from "@/lib/forms";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Send,
  CheckCircle2,
  Building
} from "lucide-react";

/**
 * View-model props, mapped from CONTACT_PAGE_QUERY by the server page.
 * Contact details render from Site Settings (single source of truth).
 */
export type ContactPageData = {
  hero: {
    chip?: string | null;
    title?: string | null;
    titleAccent?: string | null;
    titleEnd?: string | null;
    subtitle?: string | null;
  };
  address: { line1?: string | null; line2?: string | null; poBox?: string | null; city?: string | null } | null;
  phones: { label?: string | null; number: string }[];
  emails: { label?: string | null; email: string }[];
  hours: { days?: string | null; hours?: string | null }[];
  departments: { name: string; email?: string | null; phone?: string | null; note?: string | null }[];
  legalLines: string[];
  form: {
    heading?: string | null;
    serviceOptions: string[];
    successHeading?: string | null;
    successText?: string | null;
    successNote?: string | null;
  };
  mapEmbedUrl?: string | null;
};

export default function ContactPage({ data }: { data: ContactPageData }) {
  const [submitted, setSubmitted] = useState(false);
  const serviceOptions = data.form.serviceOptions;
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    serviceType: serviceOptions[0] ?? "",
    message: ""
  });

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Bots fill hidden fields; humans never see this one. Paired with the render
  // timestamp, it is checked server-side (see src/server/mail/validation.ts).
  const [honeypot, setHoneypot] = useState("");
  // Stamped after mount, not during render: Date.now() is impure and would be
  // re-read on every re-render under concurrent rendering.
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/enquiry/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          [HONEYPOT_FIELD]: honeypot,
          form_rendered_at: renderedAt.current,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const { hero, address, phones, emails, hours, departments, legalLines, form, mapEmbedUrl } = data;
  const [firstHours, ...restHours] = hours;

  return (
    <div className="bg-ras-light min-h-screen pt-28 pb-20">
      <section className="relative px-6 lg:px-8 py-16 bg-gradient-to-b from-ras-sand/50 to-transparent overflow-hidden">
        {/* Background mesh grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="url(#solar-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-ras-goldInk mb-3 block">
              {hero.chip}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ras-charcoal leading-tight mb-4">
              {hero.title}
              {hero.titleAccent && <span className="text-ras-goldInk">{hero.titleAccent}</span>}
              {hero.titleEnd}
            </h1>
            <p className="text-sm md:text-base text-ras-grey leading-relaxed">
              {hero.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

            {/* Left Side: Corporate Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-12">

              {/* Core Information Panel */}
              <div className="space-y-8 bg-white rounded-3xl p-8 shadow-md border border-ras-grey/5">
                <h2 className="text-lg font-extrabold text-ras-charcoal flex items-center gap-2">
                  <Building className="h-5 w-5 text-ras-goldInk" />
                  Office Details
                </h2>

                <div className="space-y-6">
                  {/* Address */}
                  {address && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-ras-sand/60 text-ras-goldInk flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Corporate Address</h3>
                        <p className="text-sm text-ras-charcoal mt-1 leading-normal font-semibold">
                          {address.line1},<br />
                          {[address.line2, address.poBox].filter(Boolean).join(", ")},<br />
                          {address.city}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Telephone Dials */}
                  {phones.length > 0 && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-ras-sand/60 text-ras-goldInk flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Phone Lines</h4>
                        <div className="mt-1 space-y-1">
                          {phones.map((p) => (
                            <p key={p.number} className="text-sm font-semibold text-ras-charcoal">
                              {p.label ? `${p.label}: ` : ""}
                              <a href={`tel:${p.number.replace(/[^+\d]/g, "")}`} className="hover:text-ras-goldInk transition-colors">{p.number}</a>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mailboxes */}
                  {emails.length > 0 && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-ras-sand/60 text-ras-goldInk flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Electronic Mail</h4>
                        <div className="mt-1 space-y-1">
                          {emails.map((m) => (
                            <p key={m.email} className="text-sm font-semibold text-ras-charcoal">
                              {m.label ? `${m.label}: ` : ""}
                              <a href={`mailto:${m.email}`} className="hover:text-ras-goldInk transition-colors">{m.email}</a>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hours */}
                  {firstHours && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-ras-sand/60 text-ras-goldInk flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Business Hours</h4>
                        <p className="text-sm text-ras-charcoal mt-1 font-semibold">
                          {firstHours.days}: {firstHours.hours}
                          {restHours.map((h) => (
                            <span key={h.days}>
                              <br />
                              <span className="text-ras-goldInk text-xs">{h.days}: {h.hours}</span>
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Departments (renders only when the client adds some) */}
                  {departments.length > 0 && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-ras-sand/60 text-ras-goldInk flex items-center justify-center flex-shrink-0">
                        <Building className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Departments</h4>
                        <div className="mt-1 space-y-2">
                          {departments.map((d) => (
                            <p key={d.name} className="text-sm font-semibold text-ras-charcoal">
                              {d.name}
                              {d.email && (
                                <>
                                  {": "}
                                  <a href={`mailto:${d.email}`} className="hover:text-ras-goldInk transition-colors">{d.email}</a>
                                </>
                              )}
                              {d.phone && <span className="text-ras-grey font-normal"> · {d.phone}</span>}
                              {d.note && <span className="block text-xs text-ras-grey font-normal">{d.note}</span>}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* License / Registration details */}
              {legalLines.length > 0 && (
                <div className="p-6 rounded-2xl bg-ras-sand/40 border border-ras-grey/10 space-y-3">
                  <h4 className="text-xs font-bold text-ras-charcoal uppercase tracking-widest flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-ras-goldInk" />
                    Legal Accreditations
                  </h4>
                  <div className="text-xs text-ras-grey space-y-1">
                    {legalLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Side: High Fidelity Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-ras-sand relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ras-gold to-ras-goldDark" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 bg-ras-gold/10 text-ras-goldInk rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-ras-charcoal">{form.successHeading}</h3>
                    <p className="text-sm text-ras-grey max-w-md mx-auto">
                      {form.successText}
                    </p>
                  </div>
                  {form.successNote && (
                    <div className="p-4 bg-ras-sand/40 rounded-xl max-w-sm mx-auto text-xs text-ras-grey border border-ras-gold/10">
                      {form.successNote}
                    </div>
                  )}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-ras-goldInk hover:text-ras-charcoal uppercase tracking-wider underline mt-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-ras-goldInk mb-1 block">Inquiry Form</span>
                    <h3 className="text-xl font-extrabold text-ras-charcoal">{form.heading}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ras-charcoal">Your Name</label>
                      <input
                        type="text"
                        name="contactName"
                        required
                        placeholder="John Doe"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:border-ras-goldInk"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ras-charcoal">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        placeholder="e.g. Acme Warehouses L.L.C"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:border-ras-goldInk"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Work Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ras-charcoal">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="email@company.ae"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:border-ras-goldInk"
                      />
                    </div>

                    {/* Contact Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ras-charcoal">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +971 50 123 4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:border-ras-goldInk"
                      />
                    </div>
                  </div>

                  {/* System selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="serviceType" className="text-xs font-bold text-ras-charcoal">Required Engineering Discipline</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:border-ras-goldInk"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ras-charcoal">Project Requirements</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Outline your building locations, estimated roof area or required services..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:border-ras-goldInk resize-none"
                    />
                  </div>

                  {/* Spam trap — visually and programmatically hidden. */}
                  <input
                    {...honeypotInputProps}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />

                  {error && (
                    <p
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 bg-ras-gold hover:bg-ras-charcoal hover:text-white text-ras-charcoal text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {sending ? "Sending…" : "Submit engineering request"}
                    <Send className={`h-4 w-4 ${sending ? "animate-pulse" : ""}`} />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Map (renders only when the client sets one in the Studio) */}
          {mapEmbedUrl && (
            <div className="mt-16 rounded-3xl overflow-hidden border border-ras-grey/10 shadow-md">
              <iframe
                src={mapEmbedUrl}
                title="Office location map"
                className="w-full h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
