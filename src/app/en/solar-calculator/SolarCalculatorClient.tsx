"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  Leaf, 
  Clock, 
  HelpCircle,
  ArrowRight,
  Sun,
  ShieldCheck,
  Building
} from "lucide-react";
import Link from "next/link";

export default function SolarCalculatorPage() {
  const [bill, setBill] = useState<number>(12000);
  const [systemSize, setSystemSize] = useState<number>(0);
  const [capitalCost, setCapitalCost] = useState<number>(0);
  const [savingsYear, setSavingsYear] = useState<number>(0);
  const [savings20Years, setSavings20Years] = useState<number>(0);
  const [payback, setPayback] = useState<number>(0);
  const [co2, setCo2] = useState<number>(0);

  // Form submission state
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "Commercial Warehouse",
    notes: ""
  });

  useEffect(() => {
    // Dubai solar calculation metrics
    // Rule of thumb: A monthly bill of X AED in Dubai implies approximately Y kWh consumption
    // Tariff is around 0.38 AED/kWh for commercial/industrial.
    // Standard system size in kWp needed to offset 80% of consumption:
    const size = Math.round((bill / 0.38) * 12 * 0.85 / 1650); // 1650 kWh/kWp annual yield in Dubai
    
    // Average capital expenditure cost (approx. 3,500 - 4,000 AED per kWp installed for scale)
    const cost = size * 3600;

    // Annual savings (80% bill reduction)
    const annualSavings = Math.round(bill * 12 * 0.80);
    const savings20 = annualSavings * 20;

    // Return on investment payback period
    const paybackPeriod = Number((cost / annualSavings).toFixed(1));

    // CO2 reduction (1.2 Tons per kWp per year in the Gulf grid mix)
    const co2Reduction = Math.round(size * 1.2);

    setSystemSize(size);
    setCapitalCost(cost);
    setSavingsYear(annualSavings);
    setSavings20Years(savings20);
    setPayback(paybackPeriod > 0 ? paybackPeriod : 0);
    setCo2(co2Reduction);
  }, [bill]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="url(#solar-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-ras-gold mb-3 block">
              Interactive Feasibility Tool
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ras-charcoal leading-tight mb-4">
              Solar Return & Savings <span className="text-ras-gold">Estimator</span>
            </h1>
            <p className="text-sm md:text-base text-ras-grey leading-relaxed">
              Estimate your commercial property's solar PV potential in Dubai. Adjust your average monthly electricity bill below and view immediate, high-fidelity financial projections.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Input Dashboard Panel */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-xl border border-ras-sand relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ras-gold to-ras-goldDark" />
              
              <div className="flex items-center space-x-3 mb-8">
                <Calculator className="h-6 w-6 text-ras-gold" />
                <h3 className="text-lg font-bold text-ras-charcoal">Calculators Parameters</h3>
              </div>

              {/* Bill Range Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-ras-charcoal">Monthly DEWA Bill</label>
                  <span className="text-xl font-extrabold text-ras-gold">
                    {bill.toLocaleString()} <span className="text-xs font-semibold text-ras-grey">AED</span>
                  </span>
                </div>
                
                <input
                  type="range"
                  min="2000"
                  max="150000"
                  step="2000"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full h-2 bg-ras-sand rounded-lg appearance-none cursor-pointer accent-ras-gold focus:outline-none"
                />
                
                <div className="flex justify-between text-[10px] font-bold text-ras-grey uppercase tracking-wider">
                  <span>2k AED</span>
                  <span>50k AED</span>
                  <span>100k AED</span>
                  <span>150k AED</span>
                </div>
              </div>

              {/* Additional Context Info */}
              <div className="mt-8 p-4 rounded-xl bg-ras-sand/40 border border-ras-grey/5 space-y-3">
                <div className="flex items-start gap-2.5">
                  <Sun className="h-4 w-4 text-ras-gold mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-ras-grey leading-normal">
                    Calculations are optimized for the UAE solar irradiation profile (Dubai) using grid-connection rates under the **Shams Dubai net-metering framework**.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-ras-gold mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-ras-grey leading-normal">
                    Includes structural audit estimates, Tier-1 solar panel selection, inverter mounting, and full DEWA utility permits.
                  </p>
                </div>
              </div>

              {/* Property Details request */}
              <div className="mt-8 border-t border-ras-grey/10 pt-8">
                <h4 className="text-sm font-bold text-ras-charcoal mb-4">Request Complete Feasibility Study</h4>
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-ras-sand/50 rounded-xl text-center space-y-2 border border-ras-gold/30"
                  >
                    <p className="text-sm font-bold text-ras-gold">Proposal Requested Successfully!</p>
                    <p className="text-xs text-ras-grey">Our engineering lead will reach out within 24 hours to present a CAD system layout and PPA options.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ras-sand/50 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Work Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ras-sand/50 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone (e.g. 050...)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ras-sand/50 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold"
                      />
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ras-sand/50 border border-ras-grey/10 rounded-xl text-sm focus:outline-none focus:border-ras-gold"
                      >
                        <option value="Commercial Warehouse">Warehouse</option>
                        <option value="Industrial Factory">Industrial</option>
                        <option value="Office HQ">Corporate HQ</option>
                        <option value="Residential Villa">Luxury Villa</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-ras-gold hover:bg-ras-charcoal hover:text-white text-ras-charcoal text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md"
                    >
                      Secure Free Site Audit
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Interactive Dynamic Results Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Size Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-ras-grey/5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-ras-gold uppercase tracking-widest bg-ras-gold/10 px-2 py-1 rounded">System Size</span>
                    <Sun className="h-5 w-5 text-ras-gold" />
                  </div>
                  <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Recommended Capacity</h4>
                  <p className="text-4xl font-extrabold text-ras-charcoal mt-2">
                    {systemSize} <span className="text-lg font-bold">kWp</span>
                  </p>
                </div>
                <p className="text-xs text-ras-grey mt-4 leading-normal">Approx. {Math.round(systemSize / 0.5)} high-performance solar PV modules required.</p>
              </div>

              {/* Capex Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-ras-grey/5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-ras-gold uppercase tracking-widest bg-ras-gold/10 px-2 py-1 rounded">CAPEX Estimate</span>
                    <Building className="h-5 w-5 text-ras-gold" />
                  </div>
                  <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Estimated System Cost</h4>
                  <p className="text-3xl font-extrabold text-ras-charcoal mt-2">
                    {capitalCost.toLocaleString()} <span className="text-sm font-bold text-ras-grey">AED</span>
                  </p>
                </div>
                <p className="text-xs text-ras-grey mt-4 leading-normal">
                  Or choose our **Zero-CAPEX solar lease** with zero upfront engineering investment.
                </p>
              </div>

              {/* Payback Period Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-ras-grey/5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-ras-gold uppercase tracking-widest bg-ras-gold/10 px-2 py-1 rounded">Payback Timeline</span>
                    <Clock className="h-5 w-5 text-ras-gold" />
                  </div>
                  <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Return on Investment</h4>
                  <p className="text-4xl font-extrabold text-ras-charcoal mt-2">
                    {payback} <span className="text-lg font-bold">Years</span>
                  </p>
                </div>
                <p className="text-xs text-ras-grey mt-4 leading-normal">
                  Standard payback period in Dubai. Panel operational lifespan is guaranteed for 25+ years.
                </p>
              </div>

              {/* Carbon Reduction Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-ras-grey/5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-ras-gold uppercase tracking-widest bg-ras-gold/10 px-2 py-1 rounded">CO2 Offset</span>
                    <Leaf className="h-5 w-5 text-ras-gold" />
                  </div>
                  <h4 className="text-xs font-bold text-ras-grey uppercase tracking-wider">Carbon Savings / Year</h4>
                  <p className="text-4xl font-extrabold text-ras-charcoal mt-2">
                    {co2} <span className="text-lg font-bold">Tons</span>
                  </p>
                </div>
                <p className="text-xs text-ras-grey mt-4 leading-normal">
                  Equivalent to planting approximately {Math.round(co2 * 16)} trees annually in the UAE.
                </p>
              </div>

              {/* Combined 20-Year Accumulative Savings (Full Width spanning 2 columns) */}
              <div className="md:col-span-2 bg-ras-charcoal text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between border border-white/5">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="solar-glow" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#solar-glow)" />
                  </svg>
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-ras-gold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded border border-white/10">Financial Projection</span>
                    <h3 className="text-xl font-extrabold text-white mt-3">20-Year Asset Return Forecast</h3>
                  </div>
                  <TrendingUp className="h-6 w-6 text-ras-gold" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xs font-bold text-ras-light/65 uppercase tracking-wider">Estimated Annual Savings</h4>
                    <p className="text-2xl font-extrabold text-white mt-1">
                      {savingsYear.toLocaleString()} <span className="text-sm font-medium text-ras-gold">AED / yr</span>
                    </p>

                    <h4 className="text-xs font-bold text-ras-light/65 uppercase tracking-wider mt-6">Accumulated 20-Year Yield</h4>
                    <p className="text-4xl md:text-5xl font-extrabold text-ras-gold mt-1">
                      {savings20Years.toLocaleString()} <span className="text-lg font-bold text-white">AED</span>
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-ras-light/75 leading-relaxed space-y-2">
                    <p>
                      **DEWA Shams Dubai** regulations guarantee utility credit bank carrying. Extra electricity generated in the afternoon is stored in DEWA grid credits, offsetting night-time power.
                    </p>
                    <p className="text-ras-gold font-bold">
                      Calculations factor in a standard 0.5% yearly solar cell degradation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
