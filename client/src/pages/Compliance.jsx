import { CheckCircle2 } from "lucide-react";

export default function Compliance() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-[#e56419] font-bold tracking-[0.2em] text-sm uppercase animate-fade-in-up">
            Seamless Compliance
          </p>
          <h2 className="text-[0.5rem] sm:text-[1.5rem] lg:text-[2.25rem] font-extrabold text-[#111827] leading-[1.1] tracking-tight">
            Payroll Compliance Made Simple
          </h2>
          <p
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Stay organized, reduce compliance risks, and manage payroll
            requirements with confidence. Our payroll platform helps businesses
            maintain accurate employee records, automate statutory calculations,
            and generate compliance-ready reports.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Statutory Compliance */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(229,100,25,0.1)] transition-shadow duration-300 border border-gray-100 md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#e56419] rounded-full"></span>
              Statutory Compliance
            </h2>
            <p className="text-gray-600 mb-6 text-[16px]">
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
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accurate Payroll Records */}
          <div className="bg-gradient-to-br from-[#e56419] to-[#d45610] rounded-[24px] p-8 shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">
              Accurate Payroll Records
            </h2>
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
                  <span className="font-medium text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Section: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Compliance Reports */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Compliance Reports
            </h2>
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
          </div>

          {/* Automated Calculations & Alerts */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Automated Calculations
              </h2>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Reduce manual calculations and minimize payroll processing
                errors with configurable salary structures, deductions,
                contributions, and tax calculations.
              </p>
            </div>
            <div className="bg-[#fff6f0] rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ffe0cc] flex-1">
              <h2 className="text-xl font-bold text-[#e56419] mb-3">
                Compliance Alerts
              </h2>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Stay informed about important payroll activities with reminders
                and alerts for payroll processing, statutory payments, and
                reporting deadlines.
              </p>
            </div>
          </div>

          {/* Audit-Friendly & Built for Growing */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Audit-Friendly Payroll
              </h2>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Keep a clear history of payroll transactions and changes.
                Authorized users can review payroll information and maintain
                records for internal verification and audits.
              </p>
            </div>
            <div className="bg-gray-900 rounded-[24px] p-8 shadow-lg text-white flex-1 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-3">
                  Built for Growing Businesses
                </h2>
                <p className="text-gray-300 text-[15px] leading-relaxed">
                  Whether you manage payroll for a small business or a large
                  workforce, our platform provides the tools needed to organize
                  operations and support statutory compliance.
                </p>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#e56419] rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#e56419] rounded-[32px] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden mt-12">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Process payroll. Manage compliance. Stay organized.
            </h2>
            <p className="text-lg text-white/90">
              Take the stress out of compliance with Pinnacle Payroll.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        </div>
      </section>
    </div>
  );
}
