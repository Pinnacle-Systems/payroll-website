import { FadeIn } from "@/components/ui/fade-in";
import {
  Users,
  Clock,
  CircleDollarSign,
  PieChart,
  ShieldCheck,
  Receipt,
  Lock,
  TrendingUp,
  Zap,
  Building2,
} from "lucide-react";

const featuresData = [
  {
    title: "Employee Management",
    description:
      "Manage employee profiles, departments, designations, salary structures, documents, and employment details from one place.",
    icon: <Users size={22} strokeWidth={2} />,
  },
  {
    title: "Attendance & Leave",
    description:
      "Track attendance, shifts, overtime, permissions, holidays, and leave with ease.",
    icon: <Clock size={22} strokeWidth={2} />,
  },
  {
    title: "Salary Processing",
    description:
      "Automate monthly salary calculations, earnings, deductions, overtime, incentives, and net pay.",
    icon: <CircleDollarSign size={22} strokeWidth={2} />,
  },
  {
    title: "Payroll Reports",
    description:
      "Get clear and detailed payroll reports including salary registers, deduction reports, department-wise payroll, and monthly summaries.",
    icon: <PieChart size={22} strokeWidth={2} />,
  },
  {
    title: "Statutory Compliance",
    description:
      "Simplify payroll compliance with support for PF, ESI, Professional Tax, TDS, Labour Welfare Fund, and other applicable statutory requirements.",
    icon: <ShieldCheck size={22} strokeWidth={2} />,
  },
  {
    title: "Digital Payslips",
    description:
      "Generate professional payslips and make them easily accessible to employees.",
    icon: <Receipt size={22} strokeWidth={2} />,
  },
  {
    title: "Secure Access",
    description:
      "Control access with role-based permissions, helping keep sensitive employee and payroll information secure.",
    icon: <Lock size={22} strokeWidth={2} />,
  },

  {
    title: "Multi-Company & Branch",
    description:
      "Manage payroll operations across multiple companies, branches, departments, and locations from a centralized system.",
    icon: <Building2 size={22} strokeWidth={2} />,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-20 space-y-4 max-w-3xl mx-auto">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] font-extrabold text-[#111827] leading-[1.15] tracking-tight">
            Powerful <span className="text-[#e56419]">Payroll Features</span>
          </h2>
          <p className="text-[1.1rem] sm:text-[1.15rem] text-[#4b5563] leading-relaxed font-medium">
            Everything you need to manage payroll accurately, efficiently, and
            effortlessly.
          </p>
        </FadeIn>

        {/* Feature List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 lg:gap-y-14">
          {featuresData.map((feature, idx) => (
            <FadeIn
              key={idx}
              delay={idx * 30}
              className="flex items-start gap-5 group"
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 w-14 h-14 rounded-[14px] bg-[#fff6f0] flex items-center justify-center text-[#e56419] transition-all duration-300 group-hover:bg-[#e56419] group-hover:text-white group-hover:scale-110 shadow-sm border border-[#ffe0cc]">
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="pt-1">
                <h3 className="text-[19px] font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#e56419] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed max-w-[450px]">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Banner */}
        <FadeIn delay={200} className="mt-24">
          <div className="bg-[#f8f9fa] rounded-[32px] p-10 md:p-14 text-center border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-shadow duration-500">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#e56419]/5 rounded-full blur-[60px] group-hover:bg-[#e56419]/10 transition-colors duration-500" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#e56419]/5 rounded-full blur-[60px] group-hover:bg-[#e56419]/10 transition-colors duration-500" />

            <h3 className="relative z-10 text-[1.5rem] md:text-[2rem] font-bold text-gray-900 tracking-tight">
              Simplify payroll. Automate routine work.{" "}
              <br className="hidden md:block" />
              <span className="text-[#e56419]">Empower your people.</span>
            </h3>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
