import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateSip } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';
import { Calculator, TrendingUp, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface SipCalculatorProps {
  onNavigateToBlog: (slug: string) => void;
}

export default function SipCalculator({ onNavigateToBlog }: SipCalculatorProps) {
  // Inputs
  const [monthlySip, setMonthlySip] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [duration, setDuration] = useState<number>(10);
  const [stepUpEnabled, setStepUpEnabled] = useState<boolean>(false);
  const [stepUpPercent, setStepUpPercent] = useState<number>(10);
  const [showProjectionTable, setShowProjectionTable] = useState<boolean>(false);

  // Derive SIP returns
  const results = useMemo(() => {
    return calculateSip(
      monthlySip,
      expectedReturn,
      duration,
      stepUpPercent,
      stepUpEnabled
    );
  }, [monthlySip, expectedReturn, duration, stepUpPercent, stepUpEnabled]);

  // SVG representation percentages
  const returnsPercent = useMemo(() => {
    const total = results.totalValue;
    if (total === 0) return 0;
    return (results.estimatedReturns / total) * 100;
  }, [results]);

  const investedPercent = 100 - returnsPercent;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold text-primary tracking-tight mb-2">
          SIP Calculator
        </h1>
        <p className="text-text-muted text-base">
          Estimate the prospective future value of your Mutual Fund investments through Systematic Investment Plans (SIP).
        </p>
      </div>

      {/* 1. Inputs on Top */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Configure SIP Investment
        </h2>

        <div className="space-y-6">
          {/* Monthly SIP Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-primary">
                Monthly SIP Amount (₹)
              </label>
              <input
                type="number"
                value={monthlySip}
                onChange={(e) => setMonthlySip(Math.min(1000000, Math.max(500, Number(e.target.value))))}
                className="w-28 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
              />
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlySip}
              onChange={(e) => setMonthlySip(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
              <span>₹500</span>
              <span>₹50,000</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          {/* Expected Returns Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-primary">
                Expected Annual Return Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Math.min(30, Math.max(1, Number(e.target.value))))}
                className="w-16 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
              <span>1%</span>
              <span>15%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Duration Years */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-primary">
                Investment Duration (Years)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Math.min(40, Math.max(1, Number(e.target.value))))}
                className="w-16 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
              />
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
              <span>1 Year</span>
              <span>20 Years</span>
              <span>40 Years</span>
            </div>
          </div>

          {/* Step-Up Toggle and Parameters */}
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center mb-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-primary">
                  Enable Annual Step-Up
                </span>
                <span className="text-[11px] text-text-muted">Increment SIP payouts year-on-year to counter inflation</span>
              </div>
              <button
                type="button"
                onClick={() => setStepUpEnabled(!stepUpEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${stepUpEnabled ? 'bg-accent' : 'bg-gray-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${stepUpEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {stepUpEnabled && (
              <div className="bg-slate-50 rounded-lg p-4 border border-border animate-fadeIn mt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-primary">
                    Annual Step-Up Increment Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={stepUpPercent}
                    onChange={(e) => setStepUpPercent(Math.min(100, Math.max(1, Number(e.target.value))))}
                    className="w-16 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 text-xs"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={stepUpPercent}
                  onChange={(e) => setStepUpPercent(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-text-muted mt-1 font-sans">
                  <span>1%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdSenseHolder label="Above Results Advertisement" />

      {/* 2. Results Directly Below */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Maturity Estimates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-5 border border-border">
              <span className="text-xs text-text-muted font-medium uppercase tracking-wide block mb-1">
                Estimated Future Value
              </span>
              <span className="text-3xl font-bold text-teal-700 block">
                {formatCurrency(results.totalValue)}
              </span>
              <span className="text-[10px] bg-slate-200/60 text-primary rounded px-2 py-0.5 mt-2 inline-block font-sans">
                Assumed CAGR: {expectedReturn}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-xs text-text-muted block mb-0.5">Total Sum Invested</span>
                <span className="text-base font-semibold text-primary">
                  {formatCurrency(results.totalInvested)}
                </span>
              </div>
              <div>
                <span className="text-xs text-text-muted block mb-0.5">Wealth Gained</span>
                <span className="text-base font-semibold text-teal-700">
                  {formatCurrency(results.estimatedReturns)}
                </span>
              </div>
            </div>
          </div>

          {/* SVG Pie Donut */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="3.5"
                  strokeDasharray={`${investedPercent} ${returnsPercent}`}
                  strokeDashoffset="0"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="3.5"
                  strokeDasharray={`${returnsPercent} ${investedPercent}`}
                  strokeDashoffset={-investedPercent}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Gains portion</span>
                <span className="text-base font-bold text-accent">{returnsPercent.toFixed(1)}%</span>
              </div>
            </div>

            <div className="flex gap-4 mt-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-primary rounded-full block"></span>
                <span className="text-text-muted">Invested ({investedPercent.toFixed(1)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-accent rounded-full block"></span>
                <span className="text-text-muted">Gains ({returnsPercent.toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Growth Table */}
        <div className="pt-6 border-t border-border">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-semibold text-primary">Year-by-Year Growth</h3>
              <p className="text-xs text-text-muted">Interactive projection of deposits and interest accruals</p>
            </div>
            <button
              type="button"
              onClick={() => setShowProjectionTable(!showProjectionTable)}
              className="text-xs font-semibold text-accent hover:text-teal-800 bg-slate-50 border border-border px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              {showProjectionTable ? 'Hide Table' : 'Show Projections'}
            </button>
          </div>

          {showProjectionTable && (
            <div className="overflow-x-auto max-h-[350px] overflow-y-auto rounded-lg border border-border animate-fadeIn">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-border sticky top-0">
                    <th className="py-2.5 px-4 font-semibold text-primary text-xs uppercase">End of Year</th>
                    <th className="py-2.5 px-4 font-semibold text-primary text-xs text-right uppercase">Invested Sum</th>
                    <th className="py-2.5 px-4 font-semibold text-accent text-xs text-right uppercase">Gains Acquired</th>
                    <th className="py-2.5 px-4 font-semibold text-primary text-xs text-right uppercase">Total Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-sans">
                  {results.yearlyGrowth.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50/50 transition">
                      <td className="py-2 px-4 font-medium text-text">Year {row.year}</td>
                      <td className="py-2 px-4 text-right text-text">{formatCurrency(row.totalDeposited)}</td>
                      <td className="py-2 px-4 text-right text-accent">{formatCurrency(row.interestEarned)}</td>
                      <td className="py-2 px-4 text-right text-text font-medium">{formatCurrency(row.totalBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-3 text-[10px] text-text-muted">
            * Returns calculations are based on monthly compound interests. Actual mutual fund returns vary.
          </div>
        </div>
      </div>

      {/* 3. Explanation Below Results */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6 text-sm font-sans leading-relaxed">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          What is a Mutual Fund SIP?
        </h2>
        <div className="space-y-4">
          <p className="text-text-muted">
            A Systematic Investment Plan (SIP) is a structured vehicle that permits you to invest a small, fixed amount regularly into mutual funds. It helps eliminate volatile market speculation by buying units continuously.
          </p>

          <h3 className="text-base font-semibold text-primary pt-2">Key Benefits of SIP</h3>
          <ul className="space-y-3 text-xs text-text-muted leading-relaxed">
            <li>
              <strong>Rupee Cost Averaging:</strong> 
              It automatically purchases more units when asset values fall, and fewer units when markets soar. Over the long run, this dampens portfolio volatility.
            </li>
            <li>
              <strong>Disciplined Savings:</strong> 
              Automated monthly bank mandates ensure you invest systematically before starting secondary discretionary spending.
            </li>
            <li>
              <strong>Compounding Growth:</strong> 
              As earnings are reinvested back into the mutual fund scheme, your wealth grows exponentially over 10, 20, or 30-year horizons.
            </li>
          </ul>
        </div>
      </div>

      <AdSenseHolder label="Below Explanation Advertisement" />

      {/* 4. FAQ at Bottom */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3 flex items-center gap-2">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">What is a Mutual Fund SIP?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              A Systematic Investment Plan (SIP) is a method of investing a fixed sum regularly (monthly, quarterly) in mutual funds instead of making a one-time lump-sum payment. It instills saving discipline and reduces average buying cost over time.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">What is Rupee Cost Averaging?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Rupee cost averaging is the benefit of buying more mutual fund units when market prices are low, and fewer units when prices are high. Since you invest a fixed amount regularly, it automatically averages out the buying price without trying to time the market.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">How does a Step-Up SIP help in wealth generation?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              A Step-Up SIP increases your monthly contribution by a specified percentage (e.g., 10%) every year, matching your annual salary increments. This dramatically accelerates compound interest growth, allowing you to reach financial goals much faster.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">Are mutual fund returns guaranteed?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              No. Equity and debt mutual funds do not offer fixed or guaranteed returns. They are subject to market risks. The expected return rates (like 12% or 15%) are based on historical performance and should only be used for planning purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
