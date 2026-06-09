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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight mb-2">
          SIP Calculator India
        </h1>
        <p className="text-text-muted max-w-2xl">
          Estimate the prospective future value of your Mutual Fund investments through Systematic Investment Plans (SIP) with optional Annual Step-Ups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input sliders & outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-medium text-text mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" /> Customize SIP Outlay
            </h2>

            <div className="space-y-6">
              {/* Monthly SIP Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text">
                    Monthly SIP Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlySip}
                    onChange={(e) => setMonthlySip(Math.min(1000000, Math.max(500, Number(e.target.value))))}
                    className="w-24 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
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
                  <label className="text-sm font-medium text-text">
                    Expected Annual Return Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Math.min(30, Math.max(1, Number(e.target.value))))}
                    className="w-16 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
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
                  <label className="text-sm font-medium text-text">
                    Investment Duration (Years)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Math.min(40, Math.max(1, Number(e.target.value))))}
                    className="w-16 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
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
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-text flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-accent" /> Enable Annual Step-Up
                    </span>
                    <span className="text-[11px] text-text-muted">Increment SIP payouts year-on-year to counteract inflation</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStepUpEnabled(!stepUpEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${stepUpEnabled ? 'bg-primary' : 'bg-gray-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${stepUpEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {stepUpEnabled && (
                  <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 animate-fadeIn mt-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold text-text">
                        Annual Step-Up Increment Percentage (%)
                      </label>
                      <input
                        type="number"
                        value={stepUpPercent}
                        onChange={(e) => setStepUpPercent(Math.min(100, Math.max(1, Number(e.target.value))))}
                        className="w-16 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1 text-xs"
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

          <AdSenseHolder label="Above Results Advertisement Slot" />

          {/* Results Summary Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-xl font-medium text-text mb-6">Maturity Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="bg-success/5 rounded-xl p-4 border border-success/10">
                  <span className="text-xs text-success font-semibold tracking-wide uppercase block mb-1">
                    Estimated Future Value
                  </span>
                  <span className="text-3xl font-bold text-primary block">
                    {formatCurrency(results.totalValue)}
                  </span>
                  <span className="text-[10px] bg-accent/20 text-text rounded-full px-2 py-0.5 mt-2 inline-block font-sans">
                    Estimated CAGR: {expectedReturn}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-text-muted block mb-0.5">Total Sum Invested</span>
                    <span className="text-base font-semibold text-text">
                      {formatCurrency(results.totalInvested)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-text-muted block mb-0.5">Wealth Gained</span>
                    <span className="text-base font-semibold text-success">
                      {formatCurrency(results.estimatedReturns)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reactive SVG Pie Donut */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3.5"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#0F3460"
                      strokeWidth="3.5"
                      strokeDasharray={`${investedPercent} ${returnsPercent}`}
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      strokeDasharray={`${returnsPercent} ${investedPercent}`}
                      strokeDashoffset={-investedPercent}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Gains portion</span>
                    <span className="text-lg font-bold text-success">{returnsPercent.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-primary rounded-full block"></span>
                    <span className="text-text-muted">Invested ({investedPercent.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-success rounded-full block"></span>
                    <span className="text-text-muted">Gains ({returnsPercent.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Growth Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-text">Year-by-Year Growth Table</h3>
                <p className="text-xs text-text-muted">Interactive projection of deposits and interest accruals</p>
              </div>
              <button
                type="button"
                onClick={() => setShowProjectionTable(!showProjectionTable)}
                className="text-xs font-semibold text-primary hover:text-accent bg-gray-50 border border-gray-200 hover:border-accent px-3 py-1.5 rounded-lg transition"
              >
                {showProjectionTable ? 'Hide Table' : 'Show Projections'}
              </button>
            </div>

            {showProjectionTable && (
              <div className="overflow-x-auto max-h-[350px] overflow-y-auto mt-4 rounded-xl border border-gray-100 animate-fadeIn">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 sticky top-0">
                      <th className="py-2 px-4 font-semibold text-primary text-xs uppercase">End of Year</th>
                      <th className="py-2 px-4 font-semibold text-primary text-xs text-right uppercase">Invested Sum</th>
                      <th className="py-2 px-4 font-semibold text-success text-xs text-right uppercase">Gains Acquired</th>
                      <th className="py-2 px-4 font-semibold text-primary text-xs text-right uppercase">Total Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans">
                    {results.yearlyGrowth.map((row) => (
                      <tr key={row.year} className="hover:bg-gray-50/50 transition">
                        <td className="py-2 px-4 font-medium text-text">Year {row.year}</td>
                        <td className="py-2 px-4 text-right text-text">{formatCurrency(row.totalDeposited)}</td>
                        <td className="py-2 px-4 text-right text-success">{formatCurrency(row.interestEarned)}</td>
                        <td className="py-2 px-4 text-right text-text font-medium">{formatCurrency(row.totalBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-gray-105 text-[10px] text-text-muted">
              * Returns calculations are based on monthly compound interests. Actual mutual fund returns vary.
            </div>
          </div>
        </div>

        {/* Right: Sidebar content & resources (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Informational SEO Content Block */}
          <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">What is a Mutual Fund SIP?</h3>
            <p className="text-sm text-gray-200 leading-relaxed font-sans">
              A Systematic Investment Plan (SIP) is a structured vehicle that permits you to invest a small, fixed amount regularly into mutual funds, eliminating volatile market speculation.
            </p>
            <h4 className="text-sm font-semibold text-accent">Crucial Advantages of SIP:</h4>
            <ul className="text-xs text-gray-300 space-y-2 font-sans">
              <li>• <strong>Rupee Cost Averaging:</strong> Automatically purchase more units when asset values fall, and fewer units when markets soar.</li>
              <li>• <strong>Disciplined Budget Savings:</strong> Automated bank mandates instill a robust habit of saving regularly before choosing secondary expenses.</li>
              <li>• <strong>Compound Returns:</strong> Earnings reinvested yield accelerated long-term wealth growth over 10-25 year horizons.</li>
            </ul>
          </div>

          <AdSenseHolder label="Sidebar advertisement block" />

          {/* Related Articles List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-primary mb-4">Related Articles</h3>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => onNavigateToBlog('sip-vs-lumpsum')}
                className="w-full text-left group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-accent/10 text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text group-hover:text-accent font-serif-heading line-clamp-2">
                    SIP vs Lumpsum Investment — Which is Better for Indian Investors?
                  </h4>
                  <span className="text-[10px] text-text-muted font-sans mt-0.5 block">6 Min Read • Investment Guide</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToBlog('what-is-ppf')}
                className="w-full text-left group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-accent/10 text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text group-hover:text-accent font-serif-heading line-clamp-2">
                    PPF Account in India — Everything You Need to Know
                  </h4>
                  <span className="text-[10px] text-text-muted font-sans mt-0.5 block">5 Min Read • Government Schemes</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
