import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateFd, calculateRd } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';

interface FdRdCalculatorProps {
  onNavigateToBlog: (slug: string) => void;
}

export default function FdRdCalculator({ onNavigateToBlog }: FdRdCalculatorProps) {
  const [activeTab, setActiveTab] = useState<'fd' | 'rd'>('fd');

  // FD Inputs
  const [fdPrincipal, setFdPrincipal] = useState<number>(100000);
  const [fdRate, setFdRate] = useState<number>(7.1);
  const [fdYears, setFdYears] = useState<number>(1);
  const [fdMonths, setFdMonths] = useState<number>(0);
  const [compoundingFrequency, setCompoundingFrequency] = useState<12 | 4 | 2 | 1>(4); // Quarterly default
  const [isSenior, setIsSenior] = useState<boolean>(false);
  const [payoutOption, setPayoutOption] = useState<'maturity' | 'monthly_interest'>('maturity');

  // RD Inputs
  const [rdMonthlyDeposit, setRdMonthlyDeposit] = useState<number>(5000);
  const [rdRate, setRdRate] = useState<number>(6.8);
  const [rdTenureMonths, setRdTenureMonths] = useState<number>(12);

  // FD Results
  const fdResults = useMemo(() => {
    return calculateFd(
      fdPrincipal,
      fdRate,
      fdYears,
      fdMonths,
      compoundingFrequency,
      isSenior
    );
  }, [fdPrincipal, fdRate, fdYears, fdMonths, compoundingFrequency, isSenior]);

  // RD Results
  const rdResults = useMemo(() => {
    return calculateRd(rdMonthlyDeposit, rdRate, rdTenureMonths);
  }, [rdMonthlyDeposit, rdRate, rdTenureMonths]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold text-primary tracking-tight mb-2">
          FD & RD Calculator
        </h1>
        <p className="text-text-muted text-base">
          Calculate maturity values and interest yields for Fixed Deposits (FD) and Recurring Deposits (RD).
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-slate-100 p-0.5 rounded-lg max-w-xs font-semibold">
        <button
          onClick={() => setActiveTab('fd')}
          className={`flex-1 text-center py-2 text-sm rounded-md transition cursor-pointer ${activeTab === 'fd' ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
        >
          Fixed Deposit (FD)
        </button>
        <button
          onClick={() => setActiveTab('rd')}
          className={`flex-1 text-center py-2 text-sm rounded-md transition cursor-pointer ${activeTab === 'rd' ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
        >
          Recurring Deposit (RD)
        </button>
      </div>

      {/* 1. Inputs Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        {activeTab === 'fd' ? (
          /* FD CALCULATOR */
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
              Configure Fixed Deposit
            </h2>

            {/* Principal */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-primary">Deposit Principal Amount (₹)</label>
                <input
                  type="number"
                  value={fdPrincipal}
                  onChange={(e) => setFdPrincipal(Math.max(1000, Number(e.target.value)))}
                  className="w-28 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
                />
              </div>
              <input
                type="range"
                min="5000"
                max="1000000"
                step="5000"
                value={fdPrincipal}
                onChange={(e) => setFdPrincipal(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
                <span>₹5,000</span>
                <span>₹5 Lakhs</span>
                <span>₹10 Lakhs</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rate */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-primary uppercase">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={fdRate}
                    onChange={(e) => setFdRate(Math.min(15, Math.max(1, Number(e.target.value))))}
                    className="w-16 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 text-sm py-0.5"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.1"
                  value={fdRate}
                  onChange={(e) => setFdRate(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* Compounding frequency */}
              <div>
                <label className="block text-xs font-semibold text-primary uppercase mb-2">Compounding Frequency</label>
                <select
                  value={compoundingFrequency}
                  onChange={(e) => setCompoundingFrequency(Number(e.target.value) as 12 | 4 | 2 | 1)}
                  className="w-full bg-slate-50 border border-border p-2 rounded-lg font-medium text-primary outline-none text-sm cursor-pointer"
                >
                  <option value={4}>Quarterly (Standard)</option>
                  <option value={12}>Monthly</option>
                  <option value={2}>Half-yearly</option>
                  <option value={1}>Yearly</option>
                </select>
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-xs font-semibold text-primary uppercase mb-2">Deposit Tenure</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] text-text-muted block mb-1">Years</span>
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={fdYears}
                      onChange={(e) => setFdYears(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-slate-50 border border-border p-2 rounded-lg text-sm font-medium text-primary outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-text-muted block mb-1">Months</span>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={fdMonths}
                      onChange={(e) => setFdMonths(Math.min(11, Math.max(0, Number(e.target.value))))}
                      className="w-full bg-slate-50 border border-border p-2 rounded-lg text-sm font-medium text-primary outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payout Option */}
              <div>
                <label className="block text-xs font-semibold text-primary uppercase mb-2">Interests Payout Mode</label>
                <select
                  value={payoutOption}
                  onChange={(e) => setPayoutOption(e.target.value as 'maturity' | 'monthly_interest')}
                  className="w-full bg-slate-50 border border-border p-2 rounded-lg font-medium text-primary outline-none text-sm cursor-pointer"
                >
                  <option value="maturity">Accumulated Interest (At Maturity)</option>
                  <option value="monthly_interest">Monthly Periodic Payout</option>
                </select>
              </div>

              {/* Senior Citizen Checkbox */}
              <div className="md:col-span-2 flex items-center gap-3 bg-slate-50 border border-border rounded-xl p-4">
                <input
                  type="checkbox"
                  id="seniorCheckbox"
                  checked={isSenior}
                  onChange={(e) => setIsSenior(e.target.checked)}
                  className="w-4 h-4 text-primary focus:ring-accent border-border rounded cursor-pointer"
                />
                <label htmlFor="seniorCheckbox" className="text-sm font-medium text-primary cursor-pointer select-none">
                  Senior Citizen (Adds +0.50% automatic bonus interest rate)
                </label>
              </div>
            </div>
          </div>
        ) : (
          /* RD CALCULATOR */
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
              Configure Recurring Deposit
            </h2>

            {/* Monthly deposit */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-primary">Monthly Deposit Amount (₹)</label>
                <input
                  type="number"
                  value={rdMonthlyDeposit}
                  onChange={(e) => setRdMonthlyDeposit(Math.max(500, Number(e.target.value)))}
                  className="w-24 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
                />
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={rdMonthlyDeposit}
                onChange={(e) => setRdMonthlyDeposit(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
                <span>₹500</span>
                <span>₹25,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-primary uppercase">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rdRate}
                    onChange={(e) => setRdRate(Math.min(15, Math.max(1, Number(e.target.value))))}
                    className="w-16 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 text-sm py-0.5"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.1"
                  value={rdRate}
                  onChange={(e) => setRdRate(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* Period Months */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-primary uppercase">Tenure Duration (Months)</label>
                  <input
                    type="number"
                    value={rdTenureMonths}
                    onChange={(e) => setRdTenureMonths(Math.min(120, Math.max(3, Number(e.target.value))))}
                    className="w-16 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 text-sm py-0.5"
                  />
                </div>
                <input
                  type="range"
                  min="3"
                  max="120"
                  step="1"
                  value={rdTenureMonths}
                  onChange={(e) => setRdTenureMonths(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-text-muted mt-1 font-sans">
                  <span>3 M</span>
                  <span>60 M</span>
                  <span>120 M (10 Yrs)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AdSenseHolder label="Above Results Advertisement" />

      {/* 2. Results Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Maturity Breakdown
        </h2>

        {activeTab === 'fd' ? (
          /* FD RESULTS */
          <div className="space-y-6 font-sans">
            <div className="bg-slate-50 rounded-lg p-5 border border-border text-center">
              <span className="text-xs text-text-muted font-medium uppercase tracking-wide block mb-1">
                Estimated Maturity Amount
              </span>
              <span className="text-3xl font-bold text-teal-700 block">
                {formatCurrency(fdResults.maturityAmount)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-center sm:text-left">
              <div className="border-b sm:border-b-0 sm:border-r border-border pb-4 sm:pb-0 sm:pr-4">
                <span className="text-xs text-text-muted block mb-0.5">Deposited Principal</span>
                <span className="text-lg font-semibold text-primary">
                  {formatCurrency(fdPrincipal)}
                </span>
              </div>
              <div className="border-b sm:border-b-0 sm:border-r border-border pb-4 sm:pb-0 sm:pr-4">
                <span className="text-xs text-text-muted block mb-0.5">Wealth Interest Gained</span>
                <span className="text-lg font-semibold text-primary">
                  {formatCurrency(fdResults.interestEarned)}
                </span>
              </div>
              <div>
                <span className="text-xs text-text-muted block mb-0.5">Effective Annual Yield</span>
                <span className="text-lg font-semibold text-primary">
                  {fdResults.effectiveYield.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* RD RESULTS */
          <div className="space-y-6 font-sans">
            <div className="bg-slate-50 rounded-lg p-5 border border-border text-center">
              <span className="text-xs text-text-muted font-medium uppercase tracking-wide block mb-1">
                Estimated Maturity Value
              </span>
              <span className="text-3xl font-bold text-teal-700 block">
                {formatCurrency(rdResults.maturityAmount)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-center sm:text-left">
              <div className="border-b sm:border-b-0 sm:border-r border-border pb-4 sm:pb-0 sm:pr-4">
                <span className="text-xs text-text-muted block mb-0.5">Total Monthly Deposits</span>
                <span className="text-lg font-semibold text-primary">
                  {formatCurrency(rdResults.totalDeposited)}
                </span>
              </div>
              <div className="border-b sm:border-b-0 sm:border-r border-border pb-4 sm:pb-0 sm:pr-4">
                <span className="text-xs text-text-muted block mb-0.5">Interest Sum Accrued</span>
                <span className="text-lg font-semibold text-primary">
                  {formatCurrency(rdResults.interestEarned)}
                </span>
              </div>
              <div>
                <span className="text-xs text-text-muted block mb-0.5">Total Installments</span>
                <span className="text-lg font-semibold text-primary">
                  {rdTenureMonths} Payments
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Explanation Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6 text-sm font-sans leading-relaxed">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          FD vs RD: Which is better?
        </h2>
        <div className="space-y-4 text-text-muted text-xs sm:text-sm">
          <p>
            While both vehicles offer government-regulated risk-free gains, they suit distinct cash flows:
          </p>
          <ul className="space-y-3">
            <li>
              <strong>• Fixed Deposits (FD):</strong> Best when you hold idle surplus capital (windfalls, bonuses) that can lock in to earn compounding returns instantly.
            </li>
            <li>
              <strong>• Recurring Deposits (RD):</strong> Ideal to commit a portion of your regular monthly salary. Each installment gains interest as you continue to deposit.
            </li>
          </ul>

          <h3 className="text-base font-semibold text-primary pt-4">Indicative Bank FD Rates (2025-26)</h3>
          <div className="overflow-x-auto border border-border rounded-lg mt-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
                  <th className="py-2 px-3 font-semibold text-primary">Bank</th>
                  <th className="py-2 px-3 font-semibold text-primary text-right">1 Yr</th>
                  <th className="py-2 px-3 font-semibold text-primary text-right">3 Yrs</th>
                  <th className="py-2 px-3 font-semibold text-primary text-right">5 Yrs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-medium text-primary">SBI</td>
                  <td className="py-2 px-3 text-right">6.80%</td>
                  <td className="py-2 px-3 text-right">6.75%</td>
                  <td className="py-2 px-3 text-right">6.50%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-medium text-primary">HDFC Bank</td>
                  <td className="py-2 px-3 text-right">7.10%</td>
                  <td className="py-2 px-3 text-right">7.00%</td>
                  <td className="py-2 px-3 text-right">7.00%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-medium text-primary">ICICI Bank</td>
                  <td className="py-2 px-3 text-right">7.10%</td>
                  <td className="py-2 px-3 text-right">7.00%</td>
                  <td className="py-2 px-3 text-right">6.90%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-medium text-primary">Axis Bank</td>
                  <td className="py-2 px-3 text-right">7.20%</td>
                  <td className="py-2 px-3 text-right">7.10%</td>
                  <td className="py-2 px-3 text-right">7.00%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-medium text-primary">Kotak Bank</td>
                  <td className="py-2 px-3 text-right">7.15%</td>
                  <td className="py-2 px-3 text-right">7.00%</td>
                  <td className="py-2 px-3 text-right">6.80%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-text-muted mt-2 italic leading-relaxed">
            * Note: These are indicative interest rates for standard citizens. Senior citizens typically get an additional 0.50% interest rate. Check with the respective bank branches for updated yields before depositing.
          </p>
        </div>
      </div>

      {/* 4. FAQ Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 text-xs sm:text-sm">
          <div className="space-y-1">
            <h3 className="font-semibold text-primary">What is the compounding frequency of a standard Fixed Deposit in India?</h3>
            <p className="text-text-muted leading-relaxed">
              In India, standard bank Fixed Deposits compounding frequency is quarterly (4 times a year). This means the interest is calculated and added to the principal balance every three months.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">How do Senior Citizen FD rates differ?</h3>
            <p className="text-text-muted leading-relaxed">
              Most commercial and public sector banks in India offer senior citizens (individuals aged 60 and above) a premium of 0.50% over standard citizen rates on their Fixed Deposits.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">Is interest earned on FD and RD taxable?</h3>
            <p className="text-text-muted leading-relaxed">
              Yes, interest earned from FDs and RDs is fully taxable under the head "Income from Other Sources". Banks also deduct TDS (Tax Deducted at Source) at 10% if your annual interest income across branches exceeds ₹40,000 (₹50,000 for senior citizens).
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">Can I withdraw my money from an FD or RD early?</h3>
            <p className="text-text-muted leading-relaxed">
              Yes, premature withdrawal is permitted, but banks usually levy a premature withdrawal penalty, which is typically a reduction of 0.5% to 1% in the applicable interest rate for the duration the deposit was held.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

