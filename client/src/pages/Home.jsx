import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Workflow } from "@/components/workflow";
import Compliance from "@/components/compliance";
import Industries from "@/components/industries";
import { Pricing } from "@/components/pricing";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Workflow />
      <Compliance />
      <Industries />
      <Pricing />
      {/* <Testimonials /> */}
    </main>
  );
}
