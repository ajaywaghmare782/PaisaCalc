import React, { useState, useMemo } from 'react';
import { formatCurrency, calculatePpf } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';

interface PpfCalculatorProps {
  onNavigateToBlog: (slug: string) => void;
}

export default function PpfCalculator({ onNavigateToBlog }: PpfCalculatorProps) {
  // Inputs
  const [yearlyDeposit, setYearlyDeposit] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.1); // default PPF rate
  const [tenureYears, setTenureYears] = useState<number>(15); // options: 15, 20, 25, 30

  // Calculate
  const results = useMemo(() => {
    return calculatePpf(yearlyDeposit, interestRate, tenureYears);
  }, [yearlyDeposit, interestRate, tenureYears]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold text-primary tracking-tight mb-2">
          PPF Calculator
        </h1>
        <p className="text-text-muted text-base">
          Calculate maturity values and tax-free interest yields for the Public Provident Fund (PPF).
        </p>
      </div>

      {/* 1. Inputs Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Configure PPF Details
        </h2>

        <div className="space-y-6">
          {/* Yearly Deposit */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-primary">Yearly Deposit Amount (₹)</label>
              <input
                type="number"
                value={yearlyDeposit}
                onChange={(e) => setYearlyDeposit(Math.min(150000, Math.max(500, Number(e.target.value))))}
                className="w-28 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
              />
            </div>
            <input
              type="range"
              min="500"
              max="150000"
              step="500"
              value={yearlyDeposit}
              onChange={(e) => setYearlyDeposit(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
              <span>₹500 (Min)</span>
              <span>₹75,000</span>
              <span>₹1,50,000 (Max Limit)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interest Rate */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-2 uppercase">PPF Interest Rate (% p.a.)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-border focus:border-accent p-2 rounded-lg font-medium text-primary outline-none text-sm"
              />
              <span className="text-[10px] text-text-muted block mt-1">
                * Reviewed quarterly by the Ministry of Finance.
              </span>
            </div>

            {/* Account Extension */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-2 uppercase">Account Duration / Tenure</label>
              <select
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full bg-slate-50 border border-border focus:border-accent p-2 rounded-lg font-medium text-primary outline-none text-sm cursor-pointer"
              >
                <option value={15}>15 Years (Maturity term)</option>
                <option value={20}>20 Years (1 Extension Block)</option>
                <option value={25}>25 Years (2 Extension Blocks)</option>
                <option value={30}>30 Years (3 Extension Blocks)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <AdSenseHolder label="Above Results PPF Grid" />

      {/* 2. Results Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Maturity Breakdown
        </h2>

        <div className="space-y-6">
          <div className="bg-slate-50 rounded-lg p-5 border border-border text-center">
            <span className="text-xs text-text-muted font-medium uppercase tracking-wide block mb-1">
              Estimated Maturity Value
            </span>
            <span className="text-3xl font-bold text-teal-700 block">
              {formatCurrency(results.maturityValue)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-center sm:text-left">
            <div className="border-b sm:border-b-0 sm:border-r border-border pb-4 sm:pb-0 sm:pr-4">
              <span className="text-xs text-text-muted block mb-0.5">Total Principal Deposited</span>
              <span className="text-lg font-semibold text-primary">
                {formatCurrency(results.totalInvested)}
              </span>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-border pb-4 sm:pb-0 sm:pr-4">
              <span className="text-xs text-text-muted block mb-0.5">Total Compounded Interest</span>
              <span className="text-lg font-semibold text-primary">
                {formatCurrency(results.totalInterestEarned)}
              </span>
            </div>
            <div>
              <span className="text-xs text-text-muted block mb-0.5">Lock-In Tenure Selected</span>
              <span className="text-lg font-semibold text-primary">
                {tenureYears} Years
              </span>
            </div>
          </div>
        </div>

        {/* Amortisation Table */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-base font-semibold text-primary mb-3">PPF Annual Ledger Book</h3>
          <div className="overflow-x-auto max-h-[350px] overflow-y-auto border border-border rounded-lg">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border text-xs font-semibold uppercase text-primary sticky top-0">
                  <th className="py-2.5 px-4">Year</th>
                  <th className="py-2.5 px-4 text-right">Opening Bal.</th>
                  <th className="py-2.5 px-4 text-right">Deposit</th>
                  <th className="py-2.5 px-4 text-right text-teal-700">Interest Earned</th>
                  <th className="py-2.5 px-4 text-right">Closing Bal.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {results.yearByYearTable.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/50 transition">
                    <td className="py-2.5 px-4 font-medium text-primary">Year {row.year}</td>
                    <td className="py-2.5 px-4 text-right text-text-muted">{formatCurrency(row.openingBalance)}</td>
                    <td className="py-2.5 px-4 text-right text-text-muted">{formatCurrency(row.deposit)}</td>
                    <td className="py-2.5 px-4 text-right text-teal-700 font-medium">{formatCurrency(row.interestEarned)}</td>
                    <td className="py-2.5 px-4 text-right text-primary font-semibold">{formatCurrency(row.closingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. Explanation Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6 text-sm font-sans leading-relaxed">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          The Triple E (EEE) Advantage
        </h2>
        <div className="space-y-4 text-text-muted text-xs sm:text-sm">
          <p>
            The Public Provident Fund (PPF) is one of India's most popular long-term savings schemes, offering unique tax exemptions:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <li className="bg-slate-50 p-4 border border-border rounded-lg">
              <strong className="text-primary block mb-1">1. Exempt on Investment</strong>
              Deposits made up to ₹1,50,000 per financial year qualify for a tax deduction under Section 80C.
            </li>
            <li className="bg-slate-50 p-4 border border-border rounded-lg">
              <strong className="text-primary block mb-1">2. Exempt on Accrual</strong>
              The interest earned on the accumulated PPF balance is fully tax-exempt and compounds annually.
            </li>
            <li className="bg-slate-50 p-4 border border-border rounded-lg">
              <strong className="text-primary block mb-1">3. Exempt on Withdrawal</strong>
              The final lump sum maturity proceeds paid at the end of the lock-in period are entirely tax-free.
            </li>
          </ul>

          <h3 className="text-base font-semibold text-primary pt-4">Essential PPF Regulations</h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>• <strong>Lock-In Period:</strong> Standard lock-in of 15 years from the start of the account.</li>
            <li>• <strong>Extensions:</strong> You can extend your account in blocks of 5 years indefinitely.</li>
            <li>• <strong>Partial Withdrawals:</strong> Allowed from the 7th financial year under specific conditions.</li>
            <li>• <strong>Loans:</strong> You can avail of a loan against your PPF balance between the 3rd and 6th financial year.</li>
          </ul>
        </div>
      </div>

      {/* 4. FAQ Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 text-xs sm:text-sm">
          <div className="space-y-1">
            <h3 className="font-semibold text-primary">What is the maximum limit for PPF deposits?</h3>
            <p className="text-text-muted leading-relaxed">
              The maximum deposit limit in a PPF account is ₹1,50,000 per financial year. Any deposits made above this limit will not earn any interest and will not be eligible for tax deductions.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">Can I extend my PPF account after 15 years?</h3>
            <p className="text-text-muted leading-relaxed">
              Yes, you can extend your PPF account for an unlimited number of times in blocks of 5 years. This can be done either with fresh contributions or without making any further deposits.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">How is the interest on PPF calculated?</h3>
            <p className="text-text-muted leading-relaxed">
              Interest is calculated monthly on the lowest balance between the close of the 5th day and the end of the month, but it is credited to the account once a year on 31st March.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">What is the EEE tax status of PPF?</h3>
            <p className="text-text-muted leading-relaxed">
              EEE stands for Exempt-Exempt-Exempt. It means that the principal deposit, the interest earned, and the maturity amount are all fully exempt from income tax in India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

