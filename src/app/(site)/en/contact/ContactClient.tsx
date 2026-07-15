"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    serviceType: "Solar EPC",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">
              Global Headquarters
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ras-charcoal leading-tight mb-4">
              Connect With Our <span className="text-ras-gold">Engineers</span>
            </h1>
            <p className="text-sm md:text-base text-ras-grey leading-relaxed">
              Partner with Ras Al Assad Electromechanical Works L.L.C for your next solar grid integration or electromechanical project in Dubai. Request custom pricing or schedule a commercial site assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
            
            {/* Left Side: Corporate Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
              
              {/* Core Information Panel */}
              <div className="space-y-8 bg-white rounded-3xl p-8 shadow-md border border-ras-grey/5">
                <h3 className="text-lg font-extrabold text-ras-charcoal flex items-center gap-2">
                  <Building className="h-5 w-5 text-ras-gold" />
                  Office Details
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ras-sand/60 text-ras-gold flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Corporate Address</h4>
                      <p className="text-sm text-ras-charcoal mt-1 leading-normal font-semibold">
                        Office #204, B Block, Saraya Avenue Building,<br />
                        Al Garhoud, PO Box 241029,<br />
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>

                  {/* Telephone Dials */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ras-sand/60 text-ras-gold flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Phone Lines</h4>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm font-semibold text-ras-charcoal">
                          Landline: <a href="tel:+97142641717" className="hover:text-ras-gold transition-colors">+971 4 264 1717</a>
                        </p>
                        <p className="text-sm font-semibold text-ras-charcoal">
                          Mobile: <a href="tel:+971529051717" className="hover:text-ras-gold transition-colors">+971 52 905 1717</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mailboxes */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ras-sand/60 text-ras-gold flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Electronic Mail</h4>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm font-semibold text-ras-charcoal">
                          General: <a href="mailto:info@rasalassad.ae" className="hover:text-ras-gold transition-colors">info@rasalassad.ae</a>
                        </p>
                        <p className="text-sm font-semibold text-ras-charcoal">
                          Solar: <a href="mailto:solar@rasalassad.ae" className="hover:text-ras-gold transition-colors">solar@rasalassad.ae</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ras-sand/60 text-ras-gold flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Business Hours</h4>
                      <p className="text-sm text-ras-charcoal mt-1 font-semibold">
                        Monday – Saturday: 08:00 AM – 06:00 PM<br />
                        <span className="text-ras-gold text-xs">Sunday: Closed (Emergency AMC dispatch active)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* License / Registration details */}
              <div className="p-6 rounded-2xl bg-ras-sand/40 border border-ras-grey/10 space-y-3">
                <h4 className="text-xs font-bold text-ras-charcoal uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-ras-gold" />
                  Legal Accreditations
                </h4>
                <div className="text-xs text-ras-grey space-y-1">
                  <p>Commercial Registry Number: 1118671</p>
                  <p>Dubai Municipality Engineering License No. 718300</p>
                  <p>Approved Shams Dubai Solar PV EPC Registration</p>
                </div>
              </div>

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
                  <div className="w-16 h-16 bg-ras-gold/10 text-ras-gold rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-ras-charcoal">Engineering Request Logged</h3>
                    <p className="text-sm text-ras-grey max-w-md mx-auto">
                      Thank you for contacting Ras Al Assad. Your inquiry has been routed directly to our Dubai estimation department.
                    </p>
                  </div>
                  <div className="p-4 bg-ras-sand/40 rounded-xl max-w-sm mx-auto text-xs text-ras-grey border border-ras-gold/10">
                    We will review your property configuration and contact you to schedule an engineering site audit.
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-ras-gold hover:text-ras-charcoal uppercase tracking-wider underline mt-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-1 block">Inquiry Form</span>
                    <h3 className="text-xl font-extrabold text-ras-charcoal">Request Project Cost Feasibility</h3>
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
                        className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold"
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
                        className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold"
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
                        className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold"
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
                        className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold"
                      />
                    </div>
                  </div>

                  {/* System selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ras-charcoal">Required Engineering Discipline</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold"
                    >
                      <option value="Solar Energy">Solar Energy</option>
                      <option value="Wind Energy">Wind Energy</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="EPC Services">EPC Services</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Consultation">Consultation</option>
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
                      className="w-full px-4 py-3 bg-ras-sand/35 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-ras-gold hover:bg-ras-charcoal hover:text-white text-ras-charcoal text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    Submit engineering request
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
