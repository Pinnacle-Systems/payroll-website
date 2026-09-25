import { useState } from "react";
import { Button } from "@/components/ui/button";
import dashboardImg from "@/assets/homepageimages/payroll-in-dashboard-1x.webp";
import employerImg from "@/assets/homepageimages/employer-image.webp";
import employeeImg from "@/assets/homepageimages/employee-image.png";
import widgetLeft from "@/assets/homepageimages/payroll-widget-left.svg";
import widgetRight from "@/assets/homepageimages/payroll-widget-right.webp";
import { DemoModal } from "./demo-modal";

export function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen pt-32 pb-16 overflow-hidden bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1440px]">
          {/* Content */}
          <div className="text-center max-w-[900px] mx-auto space-y-7 mb-16 animate-fade-in-up relative">
            {/* Orange Shading Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#e56419]/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
            <h1 className="text-[0.5rem] sm:text-[1.5rem] lg:text-[2.25rem] font-extrabold text-[#111827] leading-[1.1] tracking-tight">
              Effortless HR & Payroll for the{" "}
              <span className="text-[#e56419]">Modern Workforce.</span>
            </h1>

            <p className="text-[1.1rem] sm:text-[1.15rem] text-[#4b5563] max-w-3xl mx-auto leading-relaxed font-medium">
              Dot<span className="text-[1.6rem]">.</span>
              <span className="text-[#e56419]">HR</span> by Pinnacle Systems is
              the fastest, most affordable way to manage your workforce from
              textile factory floors to corporate offices. From biometric
              attendance to one-click payroll, we handle the heavy lifting so
              you can focus on growing your Business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                size="lg"
                variant="outline"
                className="bg-[#e56419] cursor-pointer hover:bg-[#e56419] text-white rounded shadow-md px-8 py-7 text-[16px] font-bold"
                onClick={() => setIsDemoOpen(true)}
              >
                Request a demo
              </Button>
            </div>
          </div>

          {/* Hero Images Layout */}
          <div
            className="relative flex justify-center items-start mt-12 w-full max-w-[1350px] mx-auto gap-6 xl:gap-8 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            {/* Left Column (Employer) */}
            <div className="hidden lg:flex flex-col items-center gap-6 w-[190px] xl:w-[220px] shrink-0">
              <img
                src={employerImg}
                alt="Employer Dashboard"
                className="w-full rounded-[24px]"
              />
              <img src={widgetLeft} alt="Workflow Steps" className="w-full" />
            </div>

            {/* Center Main Dashboard */}
            <div className="relative w-full max-w-[850px] shrink-0 px-4 lg:px-0">
              <img
                src={dashboardImg}
                alt="Zoho Payroll Dashboard"
                className="w-full h-auto drop-shadow-2xl rounded-[12px]"
              />
            </div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
}
