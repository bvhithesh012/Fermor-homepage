"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChartNoAxesCombined,
  FileText,
  House,
  Landmark,
  PiggyBank,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import SipCalculator from "@/components/SipCalculator";

const tools = [
  { id: "sip", name: "SIP", description: "Estimate how monthly investing could grow.", icon: TrendingUp },
  { id: "emi", name: "EMI", description: "Understand your monthly loan payment.", icon: House },
  { id: "fd", name: "FD", description: "See how a fixed deposit could grow.", icon: Landmark },
  { id: "tax", name: "Income Tax", description: "Get a simple estimate of your tax liability.", icon: FileText },
  { id: "ppf", name: "PPF", description: "Explore long-term PPF growth.", icon: PiggyBank },
  { id: "compound", name: "Compound Interest", description: "See how compounding can build wealth.", icon: ChartNoAxesCombined },
] as const satisfies ReadonlyArray<{ id: string; name: string; description: string; icon: LucideIcon }>;

type ToolId = (typeof tools)[number]["id"];

export default function FinancialTools() {
  const [activeTool, setActiveTool] = useState<ToolId>("sip");
  const selectedTool = tools.find((tool) => tool.id === activeTool) ?? tools[0];

  return (
    <motion.section
      className="financial-tools-section"
      id="calculators"
      aria-labelledby="financial-tools-title"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="financial-tools-inner">
        <div className="tools-intro">
          <p className="eyebrow">Tools for your next decision</p>
          <h2 id="financial-tools-title">Have a financial question? <span>Start here.</span></h2>
          <p>Simple tools to help you understand the numbers behind your next financial decision.</p>
        </div>

        <div className="tool-selector" role="group" aria-label="Choose a financial calculator">
          {tools.map(({ id, name, description, icon: Icon }) => (
            <button
              className={`tool-option${activeTool === id ? " is-active" : ""}`}
              type="button"
              key={id}
              aria-pressed={activeTool === id}
              onClick={() => setActiveTool(id)}
            >
              <span className="tool-icon"><Icon size={17} strokeWidth={1.7} aria-hidden="true" /></span>
              <span className="tool-option-name">{name}</span>
              <span className="tool-option-description">{description}</span>
            </button>
          ))}
        </div>

        {activeTool === "sip" ? (
          <SipCalculator />
        ) : (
          <div className="tool-coming-soon" role="status" aria-live="polite">
            <div className="tool-coming-copy">
              <span className="tool-coming-kicker">{selectedTool.name}</span>
              <h3>Your {selectedTool.name} calculator is on its way.</h3>
              <p>{selectedTool.description} For now, explore the working SIP calculator.</p>
            </div>
            <button className="button button-outline tool-back-button" type="button" onClick={() => setActiveTool("sip")}>
              Explore SIP <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        )}

        <p className="tools-footnote">Estimates are for learning and planning. They aren’t financial advice.</p>
      </div>
    </motion.section>
  );
}
