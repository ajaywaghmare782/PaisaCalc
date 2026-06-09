import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateEmi, getEmiAmortizationSchedule } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';
import { Calculator, Calendar, Percent, Landmark, HelpCircle, ArrowRight } from 'lucide-react';

interface EmiCalculatorProps {
  onNavigateToBlog: (slug: string) => void;
}

export default function EmiCalculator({ onNavigateToBlog }: EmiCalculatorProps) {
  // Inputs
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(5);
  const [isTenureYears, setIsTenureYears] = useState<boolean>(true);
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);

  // Derive months
  const tenureMonths = useMemo(() => {
    return isTenureYears ? tenure * 12 : tenure;
  }, [tenure, isTenureYears]);

  // Compute values
  const results = useMemo(() => {
    return calculateEmi(loanAmount, interestRate, tenureMonths);
  }, [loanAmount, interestRate, tenureMonths]);

  const schedule = useMemo(() => {
    return getEmiAmortizationSchedule(loanAmount, interestRate, tenureMonths);
  }, [loanAmount, interestRate, tenureMonths]);

  // SVG Donut Chart Slices
  const interestPercent = useMemo(() => {
    const total = results.totalAmountPayable;
    if (total === 0) return 0;
    return (results.totalInterestPayable / total) * 100;
  }, [results]);

  const principalPercent = 100 - interestPercent;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight mb-2">
          EMI Calculator India
        </h1>
        <p className="text-text-muted max-w-2xl">
          Instantly compute monthly Equated Monthly Installment (EMI) for your home loan, car loan, or personal loan with custom amortization schedules.
        </p>
      </div>

      {/* Main Grid: 60% Left, 40% Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Calculator & Outputs (8 columns on lg) */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-medium text-text mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" /> Configure Loan Details
            </h2>

            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-primary" /> Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Math.min(100000000, Math.max(10000, Number(e.target.value))))}
                    className="w-36 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
                  />
                </div>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-1">
                  <span>₹10,000</span>
                  <span>₹50 L</span>
                  <span>₹1 Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-primary" /> Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.min(30, Math.max(1, Number(e.target.value))))}
                    className="w-20 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-1">
                  <span>1%</span>
                  <span>15%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Tenure Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-text flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" /> Loan Tenure
                  </label>
                  <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => {
                        setIsTenureYears(true);
                        setTenure(Math.ceil(tenureMonths / 12));
                      }}
                      className={`px-3 py-1.5 rounded-md transition ${isTenureYears ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
                    >
                      Years
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsTenureYears(false);
                        setTenure(tenureMonths);
                      }}
                      className={`px-3 py-1.5 rounded-md transition ${!isTenureYears ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
                    >
                      Months
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max={isTenureYears ? 30 : 360}
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="flex-1 accent-primary h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Math.min(isTenureYears ? 30 : 360, Math.max(1, Number(e.target.value))))}
                    className="w-16 text-right font-medium text-primary border rounded-md p-1 border-gray-300 focus:border-accent outline-none text-sm"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-text-muted mt-1">
                  <span>1 {isTenureYears ? 'Yr' : 'Mo'}</span>
                  <span>{isTenureYears ? '15 Yrs' : '180 Mos'}</span>
                  <span>{isTenureYears ? '30 Yrs' : '360 Mos'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* AdSense Above results / details */}
          <AdSenseHolder label="Above results advertisement slot" />

          {/* Results Block */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-xl font-medium text-text mb-6">Summary Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Numerical results */}
              <div className="space-y-5">
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                  <span className="text-xs text-primary/80 font-medium tracking-wide uppercase block mb-1">
                    Monthly Loan EMI
                  </span>
                  <span className="text-3xl font-semibold text-primary block">
                    {formatCurrency(results.monthlyEmi)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-text-muted block mb-1">Principal Amount</span>
                    <span className="text-base font-semibold text-text">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-text-muted block mb-1">Interest Payable</span>
                    <span className="text-base font-semibold text-accent">
                      {formatCurrency(results.totalInterestPayable)}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xs text-text-muted block">Total Cost of Loan</span>
                  <span className="text-lg font-bold text-text mt-1">
                    {formatCurrency(results.totalAmountPayable)}
                  </span>
                  <span className="text-[10px] text-text-muted block mt-0.5">
                    (Principal + Total Interest combined)
                  </span>
                </div>
              </div>

              {/* Reactive SVG Donut Chart */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40">
                  {/* Styled SVG donut */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Circle Background */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3.5"
                    />

                    {/* Principal Portion */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#0F3460"
                      strokeWidth="3.5"
                      strokeDasharray={`${principalPercent} ${interestPercent}`}
                      strokeDashoffset="0"
                    />

                    {/* Interest Portion */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3.5"
                      strokeDasharray={`${interestPercent} ${principalPercent}`}
                      strokeDashoffset={-principalPercent}
                    />
                  </svg>
                  {/* Center Text labels */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">Interest</span>
                    <span className="text-lg font-bold text-accent">{interestPercent.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Donut Legend */}
                <div className="flex gap-4 mt-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-primary rounded-full block"></span>
                    <span className="text-text-muted">Principal ({principalPercent.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-accent rounded-full block"></span>
                    <span className="text-text-muted">Interest ({interestPercent.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Table / Schedule */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-6">
              <div>
                <h3 className="text-lg font-medium text-text">Amortisation Schedule</h3>
                <p className="text-xs text-text-muted">Yearly breakdown of loan principal and interest payments</p>
              </div>
              <button
                type="button"
                onClick={() => setShowFullSchedule(!showFullSchedule)}
                className="text-xs font-semibold text-primary hover:text-accent bg-gray-50 border border-gray-200 hover:border-accent px-3 py-1.5 rounded-lg transition"
              >
                {showFullSchedule ? 'Collapse Schedule' : 'Show Month-by-Month'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-2.5 px-4 font-semibold text-primary text-xs uppercase">
                      {showFullSchedule ? 'Month' : 'Year'}
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-primary text-xs uppercase text-right">
                      Principal Paid
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-accent text-xs uppercase text-right">
                      Interest Paid
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-primary text-xs uppercase text-right">
                      Remaining Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans">
                  {/* Select whether to render Year-by-Year or Month-by-Month */}
                  {(showFullSchedule ? schedule.monthlySchedule : schedule.yearlySchedule).slice(0, showFullSchedule ? 36 : 15).map((row) => (
                    <tr key={row.period} className="hover:bg-gray-50/50 transition">
                      <td className="py-2.5 px-4 font-medium text-text">
                        {showFullSchedule ? `Month ${row.period}` : `Year ${row.period}`}
                      </td>
                      <td className="py-2.5 px-4 text-right text-text">
                        {formatCurrency(row.principalPaid)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-accent">
                        {formatCurrency(row.interestPaid)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-text font-medium">
                        {formatCurrency(row.balanceRemaining)}
                      </td>
                    </tr>
                  ))}
                  {/* Truncation warning for Month-by-Month */}
                  {showFullSchedule && schedule.monthlySchedule.length > 36 && (
                    <tr>
                      <td colSpan={4} className="py-3 px-4 text-center text-xs text-text-muted italic bg-gray-50/50">
                        Showing first 36 months schedule for demonstration purposes.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-[10px] text-text-muted flex justify-between">
              <span>* Values rounded off to nearest Indian Rupee</span>
              <span>Formula: Standard Amortization Math</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar Info & Blog Links (5 columns on lg) */}
        <div className="col-span-1 lg:col-span-5 space-y-6">
          {/* SEO Content Box */}
          <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">How is EMI Calculated?</h3>
            <p className="text-sm text-gray-200 leading-relaxed font-sans">
              Banks and housing finance companies utilize standard annuity formulas to determine your exact, fixed monthly payouts:
            </p>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <code className="text-xs font-bold font-mono">EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)</code>
            </div>
            <div className="text-xs text-gray-300 space-y-2 font-sans pt-2">
              <p>• <strong>P</strong> is the Principal loan sum borrowed.</p>
              <p>• <strong>r</strong> is your monthly interest factor (Annual Interest / 12 / 100).</p>
              <p>• <strong>n</strong> is the duration of months (tenure years × 12).</p>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="text-base font-semibold text-primary flex items-center gap-1.5">
              <HelpCircle className="w-5 h-5 text-accent" /> Tips to Reduce Your Total EMI Outgo
            </h3>
            <ul className="space-y-3 text-xs leading-relaxed text-text-muted">
              <li className="flex gap-2">
                <span className="text-accent font-bold mt-0.5 font-sans">1.</span>
                <span><strong>Make Annual Prepayments:</strong> Directing even just 1 extra EMI payment per year toward principal can reduce total 20-year home loan durations by nearly 4 years.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold mt-0.5 font-sans">2.</span>
                <span><strong>Choose lower interest benchmarks:</strong> Shift floating interest loans tied to legacy frameworks to repo-linked lending rates (RLLR) for direct saving perks.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold mt-0.5 font-sans">3.</span>
                <span><strong>Optimize Loan Refinances:</strong> Maintain healthy Credit Scores (CIBIL 750+) to negotiate lower percentages or seamlessly switch balances to other banks.</span>
              </li>
            </ul>
          </div>

          {/* Ad Slot Sidebar */}
          <AdSenseHolder label="Sidebar advertisement block" />

          {/* Related Articles list */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-primary mb-4">Related Knowledgebase</h3>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => onNavigateToBlog('what-is-emi')}
                className="w-full text-left group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-accent/10 text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text group-hover:text-accent font-serif-heading line-clamp-2">
                    What is EMI? How Banks Calculate Your Monthly Loan Payment
                  </h4>
                  <span className="text-[10px] text-text-muted font-sans mt-1 block">5 Min Read • Loans Category</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToBlog('old-vs-new-tax-regime')}
                className="w-full text-left group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-accent/10 text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text group-hover:text-accent font-serif-heading line-clamp-2">
                    Old Tax Regime vs New Tax Regime 2025-26 — Complete Comparison
                  </h4>
                  <span className="text-[10px] text-text-muted font-sans mt-1 block">7 Min Read • Tax Category</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
