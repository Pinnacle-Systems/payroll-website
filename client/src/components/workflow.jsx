import { UserPlus, CalendarDays, Calculator, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function Workflow() {
  const steps = [
    {
      id: 1,
      title: "Onboard Your Workers",
      description:
        "Import your existing employee data or onboard new hires in minutes. Set up their wage structures and shift profiles instantly.",
      icon: UserPlus,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      iconBg: "bg-blue-600",
    },
    {
      id: 2,
      title: "Sync Biometrics & Track Time",
      description:
        "Connect your biometric devices. Dothr automatically tracks daily attendance, overtime, and leave requests, syncing data directly for payroll.",
      icon: CalendarDays,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      iconBg: "bg-purple-600",
    },
    {
      id: 3,
      title: "Run Payroll & Pay",
      description:
        "With one click, Dothr calculates wages, overtime, and statutory deductions, and processes direct deposits. Done.",
      icon: Calculator,
      color: "bg-[#fff6f0] text-[#e56419] border-[#ffe0cc]",
      iconBg: "bg-[#e56419]",
    },
  ];

  return (
    <section
      id="workflow"
      className="bg-[#fffaf5] py-16 border-b border-[#ffe0cc] overflow-hidden relative"
    >
      {/* Background Decor & Orange Shading */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-[#e56419]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-64 w-[600px] h-[600px] bg-[#e56419]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-20 space-y-4">
          {/* <p className="text-[#e56419] font-bold tracking-[0.2em] text-sm uppercase">
           
          </p> */}
          <h2 className="text-[0.5rem] sm:text-[1.5rem] lg:text-[2.25rem] font-extrabold text-[#111827] leading-tight tracking-tight">
            Simplify HR. Automate the busy work. Empower your{" "}
            <span className="text-[#e56419]"> workforce.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            How Dot<span className="text-[#e56419]">HR</span> Works A seamless
            process from onboarding to payday. Built to be faster and easier
            than traditional HR software
          </p>
        </FadeIn>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-[#ffe0cc] -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <FadeIn
                delay={index * 150}
                key={step.id}
                className="relative group"
              >
                {/* Step Card */}
                <div
                  className={`bg-white rounded-[32px] p-8 md:p-10 shadow-[0_12px_40px_rgba(229,100,25,0.08)] hover:shadow-[0_20px_50px_rgba(229,100,25,0.18)] transition-all duration-300 border border-[#ffe0cc] flex flex-col items-center text-center h-full relative z-10 hover:-translate-y-2 group-hover:border-[#e56419]/30`}
                >
                  {/* Step Number Badge */}
                  <div
                    className={`absolute -top-5 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${step.iconBg}`}
                  >
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border ${step.color} transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="w-10 h-10" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connecting mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8 -mb-4">
                    <ArrowRight className="w-8 h-8 text-gray-300 rotate-90" />
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
