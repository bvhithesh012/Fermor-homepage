"use client";

import { motion, MotionConfig } from "framer-motion";
import { Check, ShieldCheck, TrendingUp } from "lucide-react";

const stats = [
  { label: "Investments", value: "₹31.2L" },
  { label: "Savings", value: "₹14.8L" },
  { label: "Goals", value: "68%" },
];

export default function FinancialDashboard() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        className="dashboard-wrap"
        id="dashboard"
        aria-label="Illustrative Fermor financial overview dashboard"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="dashboard">
          <div className="dashboard-topline">
            <div className="dashboard-brand">
              <span className="dashboard-brand-mark" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                  <path d="M3.5 14.5V5.5h8.8M3.5 9.8h7M11.5 14.5l4.2-4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="15.7" cy="5.4" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <span>Financial overview</span>
            </div>
            <span className="demo-label">Illustrative demo</span>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-heading">
              <div>
                <p className="dashboard-kicker">Total wealth</p>
                <p className="wealth-value">₹53,42,800</p>
                <p className="wealth-change"><TrendingUp size={12} aria-hidden="true" /> +12.4% this year</p>
              </div>
              <div className="health-chip" aria-label="Financial health: on track">
                <span className="health-dot" aria-hidden="true" />
                Financial health · On track
              </div>
            </div>

            <div className="chart-head">
              <span className="chart-title">Portfolio performance</span>
              <div className="chart-period" aria-label="Selected period: one year">
                <span>1M</span><span>3M</span><span className="active">1Y</span><span>All</span>
              </div>
            </div>

            <svg className="chart" viewBox="0 0 560 158" role="img" aria-labelledby="chart-title chart-description">
              <title id="chart-title">Illustrative portfolio performance over one year</title>
              <desc id="chart-description">A steadily rising green line with modest fluctuations, ending above its starting point.</desc>
              <defs>
                <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4a9b75" stopOpacity=".18" />
                  <stop offset="100%" stopColor="#4a9b75" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 58, 96, 134].map((y) => <line className="chart-grid" key={y} x1="0" x2="560" y1={y} y2={y} />)}
              <motion.path
                className="chart-area"
                d="M0 119 C24 112 31 108 48 111 S79 121 96 100 S127 93 144 97 S175 105 192 83 S222 91 240 73 S270 79 288 66 S318 74 336 56 S367 67 384 51 S414 60 432 41 S462 51 480 35 S510 45 528 24 S547 30 560 15 L560 158 L0 158Z"
                initial={{ opacity: 0, scaleY: 0.7 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.9, delay: 0.22, ease: "easeOut" }}
                style={{ transformOrigin: "bottom" }}
              />
              <motion.path
                className="chart-line"
                d="M0 119 C24 112 31 108 48 111 S79 121 96 100 S127 93 144 97 S175 105 192 83 S222 91 240 73 S270 79 288 66 S318 74 336 56 S367 67 384 51 S414 60 432 41 S462 51 480 35 S510 45 528 24 S547 30 560 15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.25, delay: 0.12, ease: "easeInOut" }}
              />
              <motion.circle cx="560" cy="15" r="4" fill="#287b5e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }} />
            </svg>
            <div className="chart-labels" aria-hidden="true"><span>Oct</span><span>Dec</span><span>Feb</span><span>Apr</span><span>Jun</span><span>Aug</span></div>

            <div className="dashboard-stats">
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <span className="stat-label"><span className="stat-dot" aria-hidden="true" />{stat.label}</span>
                  <motion.p className="stat-value" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.55 }}>
                    {stat.value}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-foot">
            <span>Values shown for demonstration</span>
            <span><ShieldCheck size={11} aria-hidden="true" /> Your overview, in one place <Check size={10} aria-hidden="true" /></span>
          </div>
        </div>
        <span className="sr-only">All dashboard amounts and performance figures are illustrative demo data.</span>
      </motion.section>
    </MotionConfig>
  );
}
