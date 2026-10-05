import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

// Billing periods: key, label, discount badge, billing suffix
const PERIODS = [
  { key: "monthly", label: "Monthly", save: null, suffix: "mo" },
  { key: "quarterly", label: "Quarterly", save: "Save 5%", suffix: "qtr" },
  { key: "halfyearly", label: "Half-Yearly", save: "Save 10%", suffix: "6mo" },
  { key: "yearly", label: "Yearly", save: "Save 17%", suffix: "yr" },
];

// Prices per period per plan
const PRICES = {
  Silver: {
    monthly: { amount: "₹49", note: "Billed every month" },
    quarterly: { amount: "₹139", note: "Billed every 3 months" },
    halfyearly: { amount: "₹264", note: "Billed every 6 months" },
    yearly: { amount: "₹490", note: "Billed annually" },
  },
  Gold: {
    monthly: { amount: "₹99", note: "Billed every month" },
    quarterly: { amount: "₹282", note: "Billed every 3 months" },
    halfyearly: { amount: "₹534", note: "Billed every 6 months" },
    yearly: { amount: "₹990", note: "Billed annually" },
  },
  Platinum: {
    monthly: { amount: "₹179", note: "Billed every month" },
    quarterly: { amount: "₹509", note: "Billed every 3 months" },
    halfyearly: { amount: "₹964", note: "Billed every 6 months" },
    yearly: { amount: "₹1,790", note: "Billed annually" },
  },
};

const plans = [
  {
    name: "Silver",
    tagline: "Small teams getting started with digital HR.",
    cta: "Get Started",
    ctaStyle:
      "w-full bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 py-6 text-base rounded-2xl font-bold shadow-sm cursor-pointer transition-all duration-200",
    cardStyle:
      "bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(229,100,25,0.05)] hover:shadow-[0_12px_36px_rgba(229,100,25,0.10)] transition-all duration-300 h-full flex flex-col",
    checkStyle: "text-gray-400",
    features: [
      "Core Employee Management",
      "Basic Attendance Tracking",
      "Digital Payslips",
      "Automated Statutory Deductions (PF/ESI)",
      "Email Support",
    ],
    featured: false,
  },
  {
    name: "Gold",
    tagline: "Growing companies needing advanced automation.",
    badge: "Most Popular",
    cta: "Get Started",
    ctaStyle:
      "w-full bg-white text-[#e56419] hover:bg-orange-50 py-6 text-base rounded-2xl font-bold shadow-lg cursor-pointer transition-all duration-200",
    cardStyle:
      "bg-gradient-to-b from-[#e56419] to-[#d4551a] rounded-[32px] p-8 shadow-[0_16px_50px_rgba(229,100,25,0.35)] relative md:-translate-y-5 border border-[#e56419] h-full flex flex-col",
    checkStyle: "text-white",
    features: [
      "Everything in Silver",
      "Custom Shift Scheduling",
      "Biometric Integration",
      "Leave & Overtime Management",
      "Priority Email & Chat Support",
    ],
    featured: true,
  },
  {
    name: "Platinum",
    tagline: "Large organizations with complex, multi-site needs.",
    cta: "Get Started",
    ctaStyle:
      "w-full bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 py-6 text-base rounded-2xl font-bold shadow-sm cursor-pointer transition-all duration-200",
    cardStyle:
      "bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(229,100,25,0.05)] hover:shadow-[0_12px_36px_rgba(229,100,25,0.10)] transition-all duration-300 h-full flex flex-col",
    checkStyle: "text-gray-400",
    features: [
      "Everything in Gold",
      "Multi-Site & Multi-Company Support",
      "Dedicated Account Manager",
      "Custom API Integrations",
      "Premium SLA Guarantee",
    ],
    featured: false,
  },
];

export function Pricing() {
  const [period, setPeriod] = useState("monthly");
  const activePeriod = PERIODS.find((p) => p.key === period);

  return (
    <section
      id="pricing"
      className="bg-[#fffaf5] py-16 border-b border-[#ffe0cc] relative overflow-hidden"
    >
      {/* Orange Shading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#e56419]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-12 space-y-4">
          <p className="text-[#e56419] font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">
            Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] leading-tight tracking-tight">
            Simple, transparent <span className="text-[#e56419]">pricing.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            Choose the perfect plan for your business needs.
          </p>

          {/* Billing Period Tabs */}
          <div className="flex items-center justify-center pt-4">
            <div className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
              {PERIODS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    period === p.key
                      ? "bg-[#e56419] text-white shadow-md"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {p.label}
                  {p.save && period === p.key && (
                    <span className="absolute -top-2.5 -right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none inline-flex items-center gap-0.5 whitespace-nowrap">
                      <Sparkles size={8} />
                      {p.save}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active period discount reminder */}
          {/* {activePeriod.save && (
            <p className="text-emerald-600 text-sm font-semibold animate-pulse">
              🎉 {activePeriod.save} on {activePeriod.label} billing
            </p>
          )} */}
        </FadeIn>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, idx) => {
            const priceData = PRICES[plan.name]?.[period];
            return (
              <FadeIn key={idx} delay={idx * 80} className={plan.cardStyle}>
                {/* Most Popular Badge */}
                {plan.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gray-900 text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3
                  className={`text-2xl font-extrabold mb-1 ${
                    plan.featured ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>

                {/* Tagline */}
                <p
                  className={`text-sm mb-6 leading-relaxed ${
                    plan.featured ? "text-white/75" : "text-gray-500"
                  }`}
                >
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="mb-7">
                  {plan.custom ? (
                    <div>
                      <span
                        className={`text-4xl font-black leading-none ${
                          plan.featured ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Custom
                      </span>
                      <p
                        className={`text-xs mt-2 font-medium ${
                          plan.featured ? "text-white/60" : "text-gray-400"
                        }`}
                      >
                        Contact us for pricing
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-end gap-1">
                        <span
                          className={`text-4xl font-black leading-none transition-all duration-200 ${
                            plan.featured ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {priceData?.amount}
                        </span>
                        <span
                          className={`text-sm font-medium mb-1 ${
                            plan.featured ? "text-white/70" : "text-gray-500"
                          }`}
                        >
                          / employee / {activePeriod.suffix}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-2 font-medium ${
                          plan.featured ? "text-white/60" : "text-gray-400"
                        }`}
                      >
                        {priceData?.note}
                      </p>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div
                  className={`h-px mb-6 ${
                    plan.featured ? "bg-white/20" : "bg-gray-100"
                  }`}
                />

                {/* Features */}
                <ul className="space-y-3.5 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`shrink-0 mt-0.5 ${
                          plan.featured ? "bg-white/15 rounded-full p-0.5" : ""
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${plan.checkStyle}`}
                          strokeWidth={2.5}
                        />
                      </div>
                      <span
                        className={`text-sm leading-snug ${
                          plan.featured
                            ? "text-white font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button className={plan.ctaStyle}>{plan.cta}</Button>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
