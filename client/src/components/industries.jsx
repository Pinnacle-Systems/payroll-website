import { Factory, Briefcase, ShoppingCart, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const industries = [
  {
    icon: Factory,
    title: "Textile & Manufacturing",
    tag: "Blue-collar Ready",
    content:
      "Built for the factory floor. Dothr handles high-volume blue-collar workforces, complex rotating shifts, overtime calculations, and biometric attendance with ease. Reduce manual errors and pay your workers accurately every time.",
    gradient: "from-blue-600 to-blue-500",
    glowColor: "rgba(37,99,235,0.18)",
    tagBg: "bg-blue-500/20 text-blue-100 border-blue-400/30",
    number: "01",
  },
  {
    icon: Briefcase,
    title: "Corporate & IT Services",
    tag: "Office HR",
    content:
      "Streamline your office HR. Manage fixed-salary employees, track leave balances, process reimbursements, and generate digital payslips. Give your corporate team a modern, self-service HR experience.",
    gradient: "from-[#e56419] to-[#f07d3a]",
    glowColor: "rgba(229,100,25,0.22)",
    tagBg: "bg-white/20 text-white/90 border-white/30",
    number: "02",
    featured: true,
  },
  {
    icon: ShoppingCart,
    title: "Retail, Logistics & Warehousing",
    tag: "Multi-location",
    content:
      "Manage on-ground teams across multiple locations. Track attendance for drivers, warehouse staff, and retail associates, and process payroll based on hourly or daily wages.",
    gradient: "from-purple-600 to-purple-500",
    glowColor: "rgba(147,51,234,0.18)",
    tagBg: "bg-purple-500/20 text-purple-100 border-purple-400/30",
    number: "03",
  },
  {
    icon: Users,
    title: "Contractors & Staffing Agencies",
    tag: "Flexible Workforce",
    content:
      "Manage a flexible workforce with ease. Onboard contract workers quickly, manage multiple client sites, and run payroll for hundreds of workers in minutes, not days.",
    gradient: "from-emerald-600 to-emerald-500",
    glowColor: "rgba(5,150,105,0.18)",
    tagBg: "bg-emerald-500/20 text-emerald-100 border-emerald-400/30",
    number: "04",
  },
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="bg-[#f9fafb] py-16 relative overflow-hidden border-t border-gray-100"
    >
      {/* Background blobs */}
      <div className="absolute top-20 left-0 w-[450px] h-[450px] bg-[#e56419]/8 rounded-full blur-[130px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#e56419]/8 rounded-full blur-[130px] pointer-events-none translate-x-1/2" />

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-14 space-y-4 max-w-3xl mx-auto">
          <p className="text-[#e56419] font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">
            Industries We Serve
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] leading-tight tracking-tight">
            Built for Every Workspace.{" "}
            <span className="text-[#e56419]">Textiles to Corporates.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Whether your team is on the factory floor or in the boardroom, Dot
            <span className="text-[#e56419]">HR</span> adapts to your unique
            workforce needs.
          </p>
        </FadeIn>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <FadeIn
                key={idx}
                delay={idx * 80}
                className="group relative rounded-[28px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.13)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col bg-white border border-gray-100"
              >
                {/* Colored Header */}
                <div
                  className={`relative bg-gradient-to-br ${industry.gradient} px-6 pt-7 pb-10 flex flex-col gap-4 overflow-hidden`}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-10 -left-4 w-32 h-32 bg-black/10 rounded-full" />

                  {/* Number + Icon */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-white/30 font-black text-3xl leading-none select-none">
                      {industry.number}
                    </span>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-inner">
                      <Icon size={22} strokeWidth={2} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* White Content Area */}
                <div className="flex flex-col flex-1 px-6 pt-5 pb-6 -mt-4 relative z-10">
                  {/* Pull-up white card effect */}
                  <div className="absolute inset-x-0 top-0 h-5 bg-white rounded-t-[20px]" />

                  <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3 relative z-10">
                    {industry.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed text-justify relative z-10 flex-1">
                    {industry.content}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
