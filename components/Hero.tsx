import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import FinancialDashboard from "@/components/FinancialDashboard";

export default function Hero() {
  return (
    <main>
      <section className="hero" id="product" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">A clearer view of your finances</p>
            <h1 className="hero-title" id="hero-title">
              Make smarter decisions<br className="desktop-headline-break" /> with your <span>money.</span>
            </h1>
            <p className="hero-description">
              Fermor brings investing, planning and financial intelligence together, so you can understand what your money is doing and decide what to do next.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#get-started">
                Get started <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a className="button button-outline" href="#dashboard">
                Explore Fermor <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-note"><LockKeyhole size={13} strokeWidth={1.7} aria-hidden="true" /> A thoughtful place to see your whole financial picture.</p>
          </div>
          <FinancialDashboard />
        </div>
      </section>
    </main>
  );
}
