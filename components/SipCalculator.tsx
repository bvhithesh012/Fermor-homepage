"use client";

import { useState, type ChangeEvent, type FocusEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const limits = {
  monthly: { min: 500, max: 1_000_000 },
  rate: { min: 0, max: 30 },
  years: { min: 1, max: 50 },
} as const;

const indianCurrency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function calculateSipProjection(monthly: number, annualRate: number, years: number) {
  const amountInvested = monthly * years * 12;
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  const futureValue = monthlyRate === 0
    ? amountInvested
    : monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);

  return {
    amountInvested,
    estimatedReturns: futureValue - amountInvested,
    futureValue,
  };
}

type NumberFieldProps = {
  id: string;
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  hint: string;
  onChange: (value: string) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

function NumberField({ id, label, value, min, max, step, prefix, suffix, hint, onChange, onBlur }: NumberFieldProps) {
  return (
    <div className="sip-field">
      <label className="sip-label" htmlFor={id}>{label}</label>
      <div className="sip-input-wrap">
        {prefix && <span className="sip-input-affix" aria-hidden="true">{prefix}</span>}
        <input
          className="sip-input"
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-describedby={`${id}-hint`}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.currentTarget.value)}
          onBlur={onBlur}
        />
        {suffix && <span className="sip-input-affix" aria-hidden="true">{suffix}</span>}
      </div>
      <p className="sip-field-hint" id={`${id}-hint`}>{hint}</p>
    </div>
  );
}

export default function SipCalculator() {
  const [monthlyValue, setMonthlyValue] = useState("10000");
  const [rateValue, setRateValue] = useState("12");
  const [yearsValue, setYearsValue] = useState("10");

  const monthly = clamp(Number(monthlyValue) || limits.monthly.min, limits.monthly.min, limits.monthly.max);
  const rate = clamp(Number(rateValue) || 0, limits.rate.min, limits.rate.max);
  const years = clamp(Number(yearsValue) || limits.years.min, limits.years.min, limits.years.max);
  const projection = calculateSipProjection(monthly, rate, years);
  const investedShare = projection.futureValue > 0 ? projection.amountInvested / projection.futureValue * 100 : 100;

  const normalizeOnBlur = (key: keyof typeof limits, setValue: (value: string) => void) =>
    (event: FocusEvent<HTMLInputElement>) => {
      const { min, max } = limits[key];
      const parsed = Number(event.currentTarget.value);
      const normalized = clamp(Number.isFinite(parsed) && event.currentTarget.value !== "" ? parsed : min, min, max);
      setValue(String(normalized));
    };

  return (
    <div className="sip-calculator" aria-label="SIP calculator">
      <div className="sip-input-panel">
        <div className="sip-panel-heading">
          <p className="sip-overline">Your investment</p>
          <h3>Set your starting point</h3>
          <p>Adjust the numbers to see how a regular investment may grow.</p>
        </div>
        <div className="sip-fields">
          <NumberField
            id="sip-monthly"
            label="Monthly investment"
            value={monthlyValue}
            min={limits.monthly.min}
            max={limits.monthly.max}
            step={500}
            prefix="₹"
            hint="₹500 to ₹10,00,000 per month"
            onChange={setMonthlyValue}
            onBlur={normalizeOnBlur("monthly", setMonthlyValue)}
          />
          <NumberField
            id="sip-return"
            label="Expected annual return"
            value={rateValue}
            min={limits.rate.min}
            max={limits.rate.max}
            step={0.1}
            suffix="%"
            hint="0% to 30% per year"
            onChange={setRateValue}
            onBlur={normalizeOnBlur("rate", setRateValue)}
          />
          <NumberField
            id="sip-years"
            label="Investment period"
            value={yearsValue}
            min={limits.years.min}
            max={limits.years.max}
            step={1}
            suffix="years"
            hint="1 to 50 years"
            onChange={setYearsValue}
            onBlur={normalizeOnBlur("years", setYearsValue)}
          />
        </div>
      </div>

      <div className="sip-results-panel" aria-live="polite" aria-atomic="true">
        <div className="sip-panel-heading sip-results-heading">
          <p className="sip-overline">Your projection</p>
          <h3>A view of what’s possible</h3>
        </div>
        <div className="sip-result-list">
          <div className="sip-result-row">
            <span className="sip-result-label">Amount invested</span>
            <motion.span key={`invested-${projection.amountInvested}`} className="sip-result-value" initial={{ opacity: 0.6, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>{indianCurrency.format(projection.amountInvested)}</motion.span>
          </div>
          <div className="sip-result-row">
            <span className="sip-result-label">Estimated returns</span>
            <motion.span key={`returns-${projection.estimatedReturns}`} className="sip-result-value sip-result-green" initial={{ opacity: 0.6, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>{indianCurrency.format(projection.estimatedReturns)}</motion.span>
          </div>
          <div className="sip-future-row">
            <span className="sip-result-label">Estimated future value</span>
            <motion.span key={`future-${projection.futureValue}`} className="sip-future-value" initial={{ opacity: 0.7, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>{indianCurrency.format(projection.futureValue)}</motion.span>
          </div>
        </div>

        <div className="sip-comparison" aria-label={`Invested amount is ${Math.round(investedShare)} percent of estimated future value; estimated returns are ${Math.round(100 - investedShare)} percent`}>
          <div className="sip-bar" role="img" aria-label="Proportion of invested amount and estimated returns">
            <motion.span className="sip-bar-invested" animate={{ width: `${investedShare}%` }} transition={{ duration: 0.35, ease: "easeOut" }} />
            <motion.span className="sip-bar-returns" animate={{ width: `${100 - investedShare}%` }} transition={{ duration: 0.35, ease: "easeOut" }} />
          </div>
          <div className="sip-legend">
            <span><i className="sip-legend-dot invested-dot" />Amount invested <strong>{Math.round(investedShare)}%</strong></span>
            <span><i className="sip-legend-dot returns-dot" />Estimated returns <strong>{Math.round(100 - investedShare)}%</strong></span>
          </div>
        </div>

        <p className="sip-disclaimer">Illustrative estimate only. Actual returns vary and are not guaranteed.</p>
        <a className="sip-detail-link" href="#calculators">Understand SIP investing <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </div>
  );
}
