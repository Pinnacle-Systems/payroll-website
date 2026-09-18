import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <section id="pricing" className="bg-white py-24 border-b border-gray-100 relative overflow-hidden">
      {/* Orange Shading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#e56419]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-16 space-y-4">
          <p className="text-[#e56419] font-bold tracking-[0.2em] text-sm uppercase">
            Pricing
          </p>
          <h2 className="text-[0.5rem] sm:text-[1.5rem] lg:text-[2.25rem] font-extrabold text-[#111827] leading-tight tracking-tight">
            Simple, transparent <span className="text-[#e56419]">pricing</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. No hidden fees,
            cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <span className={`text-[15px] font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-[#e56419] transition-colors focus:outline-none cursor-pointer"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isYearly ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-[15px] font-medium flex items-center gap-2 ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
              <span className="bg-[#faedd8] text-[#e56419] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Save 16%</span>
            </span>
          </div>
        </FadeIn>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {/* Essential Plan */}
          <FadeIn delay={100} className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgba(229,100,25,0.05)] hover:shadow-[0_8px_30px_rgba(229,100,25,0.12)] transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Essential</h3>
            <p className="text-gray-600 mb-6 text-[15px]">
              Perfect for small teams getting started.
            </p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold text-gray-900">
                {isYearly ? "₹500" : "₹50"}
              </span>
              <span className="text-gray-500 font-medium">
                {" "}
                / employee / {isYearly ? "year" : "month"}
              </span>
              <p className="text-gray-500 text-sm mt-2">
                {isYearly ? "Billed annually" : "Billed monthly"}
              </p>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Basic payroll processing",
                "Automated statutory deductions",
                "Direct bank deposits",
                "Employee self-service portal",
                "Email support",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 py-6 text-lg rounded-xl font-bold shadow-sm cursor-pointer">
              Get Started
            </Button>
          </FadeIn>

          {/* Professional Plan (Highlighted) */}
          <FadeIn delay={150} className="bg-[#e56419] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgba(229,100,25,0.3)] relative transform md:-translate-y-4 border border-[#e56419]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-gray-900 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">
                Most Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
            <p className="text-white/80 mb-6 text-[15px]">
              Best for growing companies.
            </p>
            <div className="mb-8 text-white">
              <span className="text-4xl font-extrabold">
                {isYearly ? "₹750" : "₹75"}
              </span>
              <span className="text-white/80 font-medium">
                {" "}
                / employee / {isYearly ? "year" : "month"}
              </span>
              <p className="text-white/80 text-sm mt-2">
                {isYearly ? "Billed annually" : "Billed monthly"}
              </p>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Everything in Essential",
                "Leave & attendance management",
                "Multi-level approvals",
                "Custom payroll reports",
                "Priority email & chat support",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-white text-[#e56419] hover:bg-gray-50 py-6 text-lg rounded-xl font-bold shadow-lg cursor-pointer">
              Get Started
            </Button>
          </FadeIn>

          {/* Enterprise Plan */}
          <FadeIn delay={200} className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgba(229,100,25,0.05)] hover:shadow-[0_8px_30px_rgba(229,100,25,0.12)] transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Enterprise
            </h3>
            <p className="text-gray-600 mb-6 text-[15px]">
              For large organizations.
            </p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold text-gray-900">
                Custom
              </span>
              <p className="text-gray-500 text-sm mt-2">
                Contact us for pricing
              </p>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Everything in Professional",
                "Dedicated account manager",
                "Custom API integrations",
                "Advanced access control",
                "Premium SLA guarantee",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 py-6 text-lg rounded-xl font-bold shadow-sm">
              Contact Sales
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
