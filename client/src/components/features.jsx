import { useState, useEffect } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Users,
  Clock,
  CircleDollarSign,
  PieChart,
  ShieldCheck,
  Receipt,
  Lock,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import employeeImg from "@/assets/Features/employee-image.webp";
import attendanceImg from "@/assets/Features/Mark Attendance _ Leaves.png";
import salaryImg from "@/assets/Features/salary.jpg";
import reportImg from "@/assets/Features/payroll-report.avif";
import complianceImg from "@/assets/Features/complaince.jpg";
import payslipImg from "@/assets/Features/Payslip.jpg";
import secureImg from "@/assets/Features/secureaccess.jpg";
import multicompanyImg from "@/assets/Features/multicompany.jpg";

const featuresData = [
  {
    title: "Employee Management",
    description:
      "Manage employee profiles, departments, designations, salary structures, documents, and employment details from one place.",
    icon: <Users size={22} strokeWidth={2} />,
    image: employeeImg,
  },
  {
    title: "Attendance & Leave",
    description:
      "Track attendance, shifts, overtime, permissions, holidays, and leave with ease.",
    icon: <Clock size={22} strokeWidth={2} />,
    image: attendanceImg,
  },
  {
    title: "Salary Processing",
    description:
      "Automate monthly salary calculations, earnings, deductions, overtime, incentives, and net pay.",
    icon: <CircleDollarSign size={22} strokeWidth={2} />,
    image: salaryImg,
  },
  {
    title: "Payroll Reports",
    description:
      "Get clear and detailed payroll reports including salary registers, deduction reports, department-wise payroll, and monthly summaries.",
    icon: <PieChart size={22} strokeWidth={2} />,
    image: reportImg,
  },
  {
    title: "Statutory Compliance",
    description:
      "Simplify payroll compliance with support for PF, ESI, Professional Tax, TDS, Labour Welfare Fund, and other applicable statutory requirements.",
    icon: <ShieldCheck size={22} strokeWidth={2} />,
    image: complianceImg,
  },
  {
    title: "Digital Payslips",
    description:
      "Generate professional payslips and make them easily accessible to employees.",
    icon: <Receipt size={22} strokeWidth={2} />,
    image: payslipImg,
  },
  {
    title: "Secure Access",
    description:
      "Control access with role-based permissions, helping keep sensitive employee and payroll information secure.",
    icon: <Lock size={22} strokeWidth={2} />,
    image: secureImg,
  },
  {
    title: "Multi-Company & Branch",
    description:
      "Manage payroll operations across multiple companies, branches, departments, and locations from a centralized system.",
    icon: <Building2 size={22} strokeWidth={2} />,
    image: multicompanyImg,
  },
];

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuresData.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="features" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-12 space-y-4 max-w-3xl mx-auto">
          <p className="text-[#e56419] font-bold tracking-[0.2em] text-sm uppercase">
            Employee Self-Service Portal
          </p>
          <h2 className="text-[0.5rem] sm:text-[1.5rem] lg:text-[2.25rem] font-extrabold text-[#111827] leading-[1.15] tracking-tight">
            Give your team a modern <br className="hidden md:block" />
            <span className="text-[#e56419]">payroll experience</span>
          </h2>
        </FadeIn>

        {/* Carousel Container */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Tabs */}
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-3 md:gap-5 justify-start lg:justify-center border-b border-gray-200 pb-2 mb-12 relative px-4">
            {featuresData.map((feature, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`whitespace-nowrap px-2 py-3 text-[13px] md:text-[14px] transition-all relative cursor-pointer ${
                  activeIndex === idx
                    ? "text-gray-900 font-extrabold"
                    : "text-gray-500 font-medium hover:text-gray-800"
                }`}
              >
                {feature.title}
                {activeIndex === idx && (
                  <div className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-[#e56419] rounded-t-md" />
                )}
              </button>
            ))}
          </div>

          {/* Cards Area */}
          <div className="relative h-[400px] md:h-[350px] w-full flex items-center justify-center">
            {featuresData.map((feature, idx) => {
              let offset = idx - activeIndex;
              if (offset < -featuresData.length / 2)
                offset += featuresData.length;
              if (offset > featuresData.length / 2)
                offset -= featuresData.length;

              const isActive = offset === 0;
              const isPrev =
                offset === -1 || offset === -1 + featuresData.length; // Ensure proper handling if close to edge
              const isNext = offset === 1 || offset === 1 - featuresData.length;

              // Hide cards that are too far away for performance and visual cleanliness
              if (
                Math.abs(offset) > 1 &&
                Math.abs(offset) !== featuresData.length - 1
              )
                return null;

              // Calculate style classes based on offset
              let translateVal = "0%";
              let scaleVal = "scale-100";
              let opacityVal = "opacity-100";
              let zIndex = "z-20";
              let bgClass =
                "bg-white shadow-[0_0_20px_rgba(229,100,25,0.2)] border-2 border-[#e56419] transition-all duration-700 ease-in-out";

              if (offset === -1 || offset === featuresData.length - 1) {
                translateVal = "-105%";
                scaleVal = "scale-90";
                opacityVal = "opacity-40 hover:opacity-70";
                zIndex = "z-10 cursor-pointer";
                bgClass = "bg-white shadow-sm border border-gray-100";
              } else if (
                offset === 1 ||
                offset === -(featuresData.length - 1)
              ) {
                translateVal = "105%";
                scaleVal = "scale-90";
                opacityVal = "opacity-40 hover:opacity-70";
                zIndex = "z-10 cursor-pointer";
                bgClass = "bg-white shadow-sm border border-gray-100";
              }

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (offset === -1 || offset === featuresData.length - 1)
                      setActiveIndex(
                        (prev) =>
                          (prev - 1 + featuresData.length) %
                          featuresData.length,
                      );
                    if (offset === 1 || offset === -(featuresData.length - 1))
                      setActiveIndex(
                        (prev) => (prev + 1) % featuresData.length,
                      );
                  }}
                  className={`absolute top-0 w-[90%] sm:w-full max-w-[850px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${zIndex} ${scaleVal} ${opacityVal}`}
                  style={{ transform: `translateX(${translateVal})` }}
                >
                  <div
                    className={`rounded-[32px] relative p-6 md:p-10 h-[400px] md:h-[350px] flex flex-col justify-center transition-colors duration-700 ${bgClass}`}
                  >
                    {/* Navigation Arrows for Active Card */}
                    {isActive && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(
                              (prev) =>
                                (prev - 1 + featuresData.length) %
                                featuresData.length,
                            );
                          }}
                          className="absolute left-[-16px] md:left-[-24px] top-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg border border-gray-200 text-gray-500 hover:text-[#e56419] hover:border-[#e56419] transition-all z-30 hover:scale-110"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(
                              (prev) => (prev + 1) % featuresData.length,
                            );
                          }}
                          className="absolute right-[-16px] md:right-[-24px] top-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg border border-gray-200 text-gray-500 hover:text-[#e56419] hover:border-[#e56419] transition-all z-30 hover:scale-110"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 h-full">
                      {/* Left: Text Content */}
                      <div className="flex-1 flex flex-col justify-center h-full text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                          <div
                            className={`p-4 rounded-2xl ${isActive ? "bg-black/10 text-black" : "bg-gray-100 text-[#e56419]"} shrink-0`}
                          >
                            {feature.icon}
                          </div>
                          <h3
                            className={`text-[1rem] md:text-[1.25rem] font-extrabold leading-tight ${isActive ? "text-gray-900" : "text-gray-800"}`}
                          >
                            {feature.title}
                          </h3>
                        </div>
                        <p
                          className={`text-base md:text-lg  text-justify leading-relaxed max-w-md mx-auto md:mx-0 ${isActive ? "text-gray-900/80 font-medium" : "text-gray-600"}`}
                        >
                          {feature.description}
                        </p>
                      </div>

                      {/* Right: Image Placeholder */}
                      {feature.image ? (
                        <div className="w-full md:w-[400px] h-[180px] md:h-full rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-100 flex items-center justify-center bg-gray-50">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-full md:w-[400px] h-[180px] md:h-full rounded-2xl border-2 border-dashed flex items-center justify-center p-6 text-center shrink-0 ${
                            isActive
                              ? "border-black/20 bg-black/5"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2 opacity-50">
                            <span
                              className={`text-sm font-bold uppercase tracking-widest ${isActive ? "text-black" : "text-gray-500"}`}
                            >
                              Content Image
                            </span>
                            <span className="text-xs font-medium">
                              Will be added later
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <FadeIn delay={200} className="mt-20 max-w-5xl mx-auto">
          <div className="bg-[#f8f9fa] rounded-[32px] p-8 md:p-12 text-center border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-shadow duration-500">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#e56419]/5 rounded-full blur-[60px] group-hover:bg-[#e56419]/10 transition-colors duration-500" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#e56419]/5 rounded-full blur-[60px] group-hover:bg-[#e56419]/10 transition-colors duration-500" />

            <h3 className="relative z-10 text-[1.5rem] font-bold text-gray-900 tracking-tight">
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
