import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

const indices = [
  { name: "NIFTY 50", value: "25,000", change: "+0.82%", direction: "up" },
  { name: "SENSEX", value: "81,900", change: "+0.61%", direction: "up" },
  { name: "NIFTY IT", value: "41,280", change: "-0.34%", direction: "down" },
] as const;

const movers = [
  { name: "HDFC Bank", symbol: "HDFCBANK", price: "₹1,612.50", change: "+1.56%", direction: "up" },
  { name: "SBI", symbol: "SBIN", price: "₹785.40", change: "+0.82%", direction: "up" },
  { name: "Maruti Suzuki", symbol: "MARUTI", price: "₹11,248.30", change: "-1.06%", direction: "down" },
  { name: "Infosys", symbol: "INFY", price: "₹1,482.20", change: "-0.72%", direction: "down" },
] as const;

export default function MarketIntelligence() {
  return (
    <section className="market-intelligence-section" id="markets" aria-labelledby="market-intelligence-title">
      <div className="market-intelligence-inner">
        <div className="market-overview-layout">
          <div className="market-intro">
            <p className="eyebrow">A calmer view of the markets</p>
            <h2 id="market-intelligence-title">Markets, without the noise.</h2>
            <p>A clearer view of what is moving, what changed, and what might matter to your financial decisions.</p>
          </div>

          <section className="market-pulse-panel" id="market-pulse" aria-labelledby="market-pulse-title">
            <div className="market-panel-heading">
              <div>
                <p className="market-panel-eyebrow">Today at a glance</p>
                <h3 id="market-pulse-title">Market pulse</h3>
              </div>
              <span className="market-demo-label">Illustrative market data</span>
            </div>
            <div className="market-index-grid">
              {indices.map((index) => {
                const isUp = index.direction === "up";
                const DirectionIcon = isUp ? ArrowUpRight : ArrowDownRight;

                return (
                  <article className="market-index-card" key={index.name}>
                    <p className="market-index-name">{index.name}</p>
                    <p className="market-index-value">{index.value}</p>
                    <p className={`market-movement ${isUp ? "is-positive" : "is-negative"}`}>
                      <DirectionIcon size={14} strokeWidth={1.9} aria-hidden="true" />
                      <span>{index.change}</span>
                      <span className="sr-only">{isUp ? "up" : "down"}</span>
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="market-data-note">Illustrative figures for context only. Not live market data.</p>
          </section>
        </div>

        <div className="market-lower-grid">
          <section className="market-movers-panel" id="market-movers" aria-labelledby="market-movers-title">
            <div className="market-panel-heading movers-heading">
              <div>
                <p className="market-panel-eyebrow">A few names to follow</p>
                <h3 id="market-movers-title">What moved</h3>
              </div>
              <a className="market-view-link" href="#market-pulse">View all markets <ArrowRight size={14} aria-hidden="true" /></a>
            </div>
            <ul className="market-movers-list">
              {movers.map((mover) => {
                const isUp = mover.direction === "up";
                const DirectionIcon = isUp ? ArrowUpRight : ArrowDownRight;

                return (
                  <li className="market-mover-row" key={mover.symbol}>
                    <div className="market-company">
                      <span className="market-company-name">{mover.name}</span>
                      <span className="market-company-symbol">{mover.symbol}</span>
                    </div>
                    <div className="market-quote">
                      <span className="market-stock-price">{mover.price}</span>
                      <span className={`market-movement ${isUp ? "is-positive" : "is-negative"}`}>
                        <DirectionIcon size={13} strokeWidth={1.9} aria-hidden="true" />
                        <span>{mover.change}</span>
                        <span className="sr-only">{isUp ? "up" : "down"}</span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="market-movers-note">Illustrative company values · not live</p>
          </section>

          <aside className="market-context-panel" aria-labelledby="market-context-title">
            <p className="market-context-kicker">Why it matters</p>
            <h3 id="market-context-title">Markets moved higher, but not everything moved together.</h3>
            <p>Financial decisions rarely depend on one number. Compare market movements with your goals, time horizon and portfolio before reacting.</p>
            <a className="market-context-link" href="#market-movers">Understand the context <ArrowRight size={14} aria-hidden="true" /></a>
            <p className="market-context-disclaimer">A prompt to explore, not personal financial advice.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
