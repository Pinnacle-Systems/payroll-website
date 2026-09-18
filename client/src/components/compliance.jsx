import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function Compliance() {
  return (
    <div id="compliance" className="bg-gray-50 py-16 lg:py-24 relative overflow-hidden">
      {/* Orange Shading */}
      <div className="absolute top-40 right-0 w-[700px] h-[700px] bg-[#e56419]/10 rounded-full blur-[140px] pointer-events-none translate-x-1/2"></div>
      <div className="absolute bottom-20 left-0 w-[700px] h-[700px] bg-[#e56419]/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2"></div>

      {/* Section Header */}
      <FadeIn className="px-4 sm:px-6 lg:px-8 border-b border-[#e56419]/10 pb-12 mb-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-[#e56419] font-bold tracking-[0.2em] text-sm uppercase">
            Seamless Compliance
          </p>
          <h2 className="text-[0.5rem] sm:text-[1.5rem] lg:text-[2.25rem] font-extrabold text-[#111827] leading-tight tracking-tight">
            Payroll Compliance{" "}
            <span className="text-[#e56419]">Made Simple</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Stay organized, reduce compliance risks, and manage payroll
            requirements with confidence. Our payroll platform helps businesses
            maintain accurate employee records, automate statutory calculations,
            and generate compliance-ready reports.
          </p>
        </div>
      </FadeIn>

      {/* Main Content Grid */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Statutory Compliance */}
          <FadeIn className="bg-white rounded-[32px] p-8 shadow-[0_12px_40px_rgba(229,100,25,0.08)] hover:shadow-[0_20px_50px_rgba(229,100,25,0.15)] transition-shadow duration-300 border border-[#ffe0cc] lg:col-span-2 group">
            <h3 className="text-[22px] font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#e56419] rounded-full"></span>
              Statutory Compliance
            </h3>
            <p className="text-gray-600 mb-6 text-[15px]">
              Simplify payroll processing with tools designed to support
              commonly required statutory payroll activities, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Provident Fund (PF) calculations and reporting",
                "Employee State Insurance (ESI) calculations and reporting",
                "Professional Tax (PT) management",
                "Labour Welfare Fund (LWF) tracking",
                "Income Tax / TDS calculations",
                "Form 16 and tax-related reports",
                "Payroll registers and statutory reports",
                "Employee and employer contribution tracking",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#e56419] shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium text-[15px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Accurate Payroll Records */}
          <FadeIn delay={100} className="bg-gradient-to-br from-[#e56419] to-[#d45610] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(229,100,25,0.2)] text-white">
            <h3 className="text-[22px] font-bold mb-4">
              Accurate Payroll Records
            </h3>
            <p className="text-white/90 mb-6 text-[15px]">
              Maintain centralized employee payroll information with detailed
              records for:
            </p>
            <ul className="space-y-4">
              {[
                "Employee salary and earnings",
                "Deductions and contributions",
                "Attendance and leave",
                "PF and ESI details",
                "Tax declarations",
                "Payslips and payroll history",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="font-medium text-white text-[15px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* Middle Section: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Compliance Reports */}
          <FadeIn delay={150} className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(229,100,25,0.08)] hover:shadow-[0_8px_30px_rgba(229,100,25,0.15)] transition-shadow duration-300 border border-gray-100 flex flex-col">
            <h3 className="text-[20px] font-bold text-gray-900 mb-3">
              Compliance Reports
            </h3>
            <p className="text-gray-600 mb-6 text-[15px]">
              Generate structured reports to support payroll review and
              statutory filing processes. Available reports include:
            </p>
            <div className="space-y-3 mt-auto">
              {[
                "PF & ESI Contribution Report",
                "Professional Tax & TDS Report",
                "LWF Report",
                "Salary & Deduction Register",
                "Employee Payroll Register",
                "Monthly Payroll Summary",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#e56419]" />
                  <span className="text-gray-700 text-[14px] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Automated Calculations & Alerts */}
          <div className="flex flex-col gap-8">
            <FadeIn delay={200} className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(229,100,25,0.08)] hover:shadow-[0_8px_30px_rgba(229,100,25,0.15)] transition-shadow duration-300 border border-gray-100 flex-1">
              <h3 className="text-[20px] font-bold text-gray-900 mb-3">
                Automated Calculations
              </h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Reduce manual calculations and minimize payroll processing
                errors with configurable salary structures, deductions,
                contributions, and tax calculations.
              </p>
            </FadeIn>
            <FadeIn delay={250} className="bg-[#fff6f0] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(229,100,25,0.1)] hover:shadow-[0_8px_30px_rgba(229,100,25,0.15)] transition-shadow duration-300 border border-[#ffe0cc] flex-1">
              <h3 className="text-[20px] font-bold text-[#e56419] mb-3">
                Compliance Alerts
              </h3>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Stay informed about important payroll activities with reminders
                and alerts for payroll processing, statutory payments, and
                reporting deadlines.
              </p>
            </FadeIn>
          </div>

          {/* Audit-Friendly & Built for Growing */}
          <div className="flex flex-col gap-8">
            <FadeIn delay={300} className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(229,100,25,0.08)] hover:shadow-[0_8px_30px_rgba(229,100,25,0.15)] transition-shadow duration-300 border border-gray-100 flex-1">
              <h3 className="text-[20px] font-bold text-gray-900 mb-3">
                Audit-Friendly Payroll
              </h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Keep a clear history of payroll transactions and changes.
                Authorized users can review payroll information and maintain
                records for internal verification and audits.
              </p>
            </FadeIn>
            <FadeIn delay={350} className="bg-gray-900 rounded-[32px] p-8 shadow-[0_8px_30px_rgba(229,100,25,0.2)] text-white flex-1 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-[20px] font-bold text-white mb-3">
                  Built for Growing Businesses
                </h3>
                <p className="text-gray-300 text-[15px] leading-relaxed">
                  Whether you manage payroll for a small business or a large
                  workforce, our platform provides the tools needed to organize
                  operations and support statutory compliance.
                </p>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#e56419] rounded-full blur-3xl opacity-30"></div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom Banner */}
        <FadeIn delay={100} className="bg-[#e56419] rounded-[32px] p-10 md:p-12 text-center text-white shadow-[0_8px_30px_rgba(229,100,25,0.3)] relative overflow-hidden mt-8">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              Process payroll. Manage compliance. Stay organized.
            </h3>
            <p className="text-md text-white/90">
              Take the stress out of compliance with Pinnacle Payroll.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        </FadeIn>
      </section>
    </div>
  );
}
