import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import Services from "@/components/sections/Services";
import Use from "@/components/sections/Use";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <Hero />
      <Features />
      <Use />
      <Services />
      <Pricing />
      <FAQ />
    </main>
  );
}
