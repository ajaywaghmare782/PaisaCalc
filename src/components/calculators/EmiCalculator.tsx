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
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold text-primary tracking-tight mb-2">
          EMI Calculator
        </h1>
        <p className="text-text-muted text-base">
          Instantly compute Equated Monthly Installment (EMI) for your home loan, car loan, or personal loan.
        </p>
      </div>

      {/* 1. Inputs on Top */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Configure Loan Details
        </h2>

        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-primary">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.min(100000000, Math.max(10000, Number(e.target.value))))}
                className="w-36 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
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
            <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
              <span>₹10,000</span>
              <span>₹50 Lakhs</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-primary">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.min(30, Math.max(1, Number(e.target.value))))}
                className="w-20 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
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
            <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
              <span>1%</span>
              <span>15%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Tenure Selection */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-primary">
                Loan Tenure
              </label>
              <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setIsTenureYears(true);
                    setTenure(Math.ceil(tenureMonths / 12));
                  }}
                  className={`px-3 py-1.5 rounded-md transition cursor-pointer ${isTenureYears ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
                >
                  Years
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTenureYears(false);
                    setTenure(tenureMonths);
                  }}
                  className={`px-3 py-1.5 rounded-md transition cursor-pointer ${!isTenureYears ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
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
                className="w-16 text-right font-medium text-primary border border-border rounded p-1 outline-none text-sm"
              />
            </div>
            <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
              <span>1 {isTenureYears ? 'Year' : 'Month'}</span>
              <span>{isTenureYears ? '15 Years' : '180 Months'}</span>
              <span>{isTenureYears ? '30 Years' : '360 Months'}</span>
            </div>
          </div>
        </div>
      </div>

      <AdSenseHolder label="Above Results Advertisement" />

      {/* 2. Results Directly Below */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Monthly Payout Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Numerical Results */}
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-5 border border-border">
              <span className="text-xs text-text-muted font-medium uppercase tracking-wide block mb-1">
                Monthly Loan EMI
              </span>
              <span className="text-3xl font-bold text-teal-700 block">
                {formatCurrency(results.monthlyEmi)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-xs text-text-muted block mb-0.5">Principal Amount</span>
                <span className="text-base font-semibold text-primary">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <div>
                <span className="text-xs text-text-muted block mb-0.5">Total Interest Payable</span>
                <span className="text-base font-semibold text-primary">
                  {formatCurrency(results.totalInterestPayable)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <span className="text-xs text-text-muted block">Total Cost of Loan</span>
              <span className="text-lg font-semibold text-primary mt-1 block">
                {formatCurrency(results.totalAmountPayable)}
              </span>
              <span className="text-[10px] text-text-muted block mt-0.5">
                (Combined Principal and Interest charges)
              </span>
            </div>
          </div>

          {/* SVG Donut Chart */}
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
                  strokeDasharray={`${principalPercent} ${interestPercent}`}
                  strokeDashoffset="0"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="3.5"
                  strokeDasharray={`${interestPercent} ${principalPercent}`}
                  strokeDashoffset={-principalPercent}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Interest Portion</span>
                <span className="text-base font-bold text-accent">{interestPercent.toFixed(1)}%</span>
              </div>
            </div>

            <div className="flex gap-4 mt-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-primary rounded-full block"></span>
                <span className="text-text-muted">Principal ({principalPercent.toFixed(1)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-accent rounded-full block"></span>
                <span className="text-text-muted">Interest ({interestPercent.toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Schedule */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <div>
              <h3 className="text-base font-semibold text-primary">Amortisation Schedule</h3>
              <p className="text-xs text-text-muted">Annual breakdown of principal and interest payments</p>
            </div>
            <button
              type="button"
              onClick={() => setShowFullSchedule(!showFullSchedule)}
              className="text-xs font-semibold text-accent hover:text-teal-800 bg-slate-50 border border-border px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              {showFullSchedule ? 'Collapse Schedule' : 'Show Month-by-Month'}
            </button>
          </div>

          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
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
              <tbody className="divide-y divide-border/60 font-sans">
                {(showFullSchedule ? schedule.monthlySchedule : schedule.yearlySchedule).slice(0, showFullSchedule ? 36 : 15).map((row) => (
                  <tr key={row.period} className="hover:bg-slate-50/50 transition">
                    <td className="py-2 px-4 text-text font-medium">
                      {showFullSchedule ? `Month ${row.period}` : `Year ${row.period}`}
                    </td>
                    <td className="py-2 px-4 text-right text-text">
                      {formatCurrency(row.principalPaid)}
                    </td>
                    <td className="py-2 px-4 text-right text-accent">
                      {formatCurrency(row.interestPaid)}
                    </td>
                    <td className="py-2 px-4 text-right text-text font-medium">
                      {formatCurrency(row.balanceRemaining)}
                    </td>
                  </tr>
                ))}
                {showFullSchedule && schedule.monthlySchedule.length > 36 && (
                  <tr>
                    <td colSpan={4} className="py-3 px-4 text-center text-xs text-text-muted italic bg-slate-50/30">
                      Showing first 36 months schedule for demonstration purposes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-[10px] text-text-muted flex justify-between">
            <span>* Values rounded off to nearest Rupee</span>
            <span>Formula: Standard Reducing Balance Amortization Math</span>
          </div>
        </div>
      </div>

      {/* 3. Explanation Below Results */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6 text-sm font-sans leading-relaxed">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          How EMI Calculations Work
        </h2>
        <div className="space-y-4">
          <p className="text-text-muted">
            Lenders calculate your Equated Monthly Installment (EMI) using a reducing balance formula. 
            In this setup, each payment goes toward both the outstanding interest and the principal loan balance.
          </p>
          <div className="bg-slate-50 rounded-lg p-4 border border-border text-center">
            <code className="text-xs font-semibold font-mono text-primary">EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)</code>
          </div>
          <ul className="space-y-2 text-xs text-text-muted pt-2">
            <li>• <strong>P (Principal):</strong> The actual loan amount borrowed.</li>
            <li>• <strong>r (Interest Rate):</strong> Monthly interest rate (Annual Rate divided by 12 months, and divided by 100).</li>
            <li>• <strong>n (Tenure):</strong> The total number of monthly payments (Years multiplied by 12).</li>
          </ul>

          <h3 className="text-base font-semibold text-primary pt-2">Tips to Save on Total Interest Outgo</h3>
          <ul className="space-y-3 text-xs text-text-muted leading-relaxed">
            <li>
              <strong>1. Consider Principal Prepayments:</strong> 
              Making even one extra EMI payment annually or allocating a lump-sum amount toward your principal balance reduces the compounding period, which can save years of payments and lakhs in interest charges.
            </li>
            <li>
              <strong>2. Renegotiate Benchmarks:</strong> 
              If borrowing interest rates have dropped since you started your loan, ask your bank to transfer your rate to a repo-linked rate, or check refinance options at other lenders.
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
            <h3 className="text-sm font-semibold text-primary">Can I prepay my home loan early?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Yes. According to RBI guidelines, banks cannot levy foreclosure penalties or prepayment charges on floating-rate home loans. Prepaying a portion of your loan principal early is one of the most effective ways to lower your interest burden.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">What is the difference between flat and reducing interest rates?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              In a flat-rate scheme, interest is calculated on the entire principal for the entire tenure. Under a reducing rate (used by standard banks and this calculator), interest is only calculated on the remaining balance after each month's repayment, making it much more economical.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">How does loan tenure affect my total cost?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Choosing a longer tenure reduces your monthly EMI amount, which helps with monthly cash flows. However, it drastically increases the total interest paid over the life of the loan. A shorter tenure is always cheaper in absolute cost if you can afford the higher EMIs.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">What components make up my monthly EMI?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Every EMI contains a principal component and an interest component. In the initial years of the loan, most of your payment goes towards clearing the accumulated interest. As the years progress, the interest component decreases and a larger portion goes towards clearing the principal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
