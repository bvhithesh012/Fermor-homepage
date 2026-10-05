import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import FinancialTools from "@/components/FinancialTools";
import MarketIntelligence from "@/components/MarketIntelligence";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FinancialTools />
      <MarketIntelligence />
    </>
  );
}
