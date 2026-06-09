import React, { useState, useMemo } from 'react';
import { formatCurrency, calculatePpf } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';
import { Calculator, Table, ShieldAlert, FileText, ArrowRight } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight mb-2">
          PPF Calculator India
        </h1>
        <p className="text-text-muted max-w-2xl">
          Model risk-free, tax-exempt savings and wealth growth with the Public Provident Fund (PPF) compounding calculator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs, Results & Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-medium text-text flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" /> Customize PPF Deposit
            </h2>

            <div className="space-y-6">
              {/* Yearly Deposit (Min 500, Max 1.5L) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-text">Yearly Deposit Amount (₹)</label>
                  <input
                    type="number"
                    value={yearlyDeposit}
                    onChange={(e) => setYearlyDeposit(Math.min(150000, Math.max(500, Number(e.target.value))))}
                    className="w-24 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
                  />
                </div>
                <input
                  type="range"
                  min="500"
                  max="150000"
                  step="500"
                  value={yearlyDeposit}
                  onChange={(e) => setYearlyDeposit(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
                  <span>₹500 (Min)</span>
                  <span>₹75,000</span>
                  <span>₹1,50,000 (Max limit)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Interest Rate */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">PPF Interest Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                  />
                  <span className="text-[10px] text-text-muted block mt-1">
                    * PPF rates are announced quarterly by the Ministry of Finance.
                  </span>
                </div>

                {/* Account Extension block selector */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">Account Duration / Tenure</label>
                  <select
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                  >
                    <option value={15}>15 Years (Maturity Block)</option>
                    <option value={20}>20 Years (1 Extension Block)</option>
                    <option value={25}>25 Years (2 Extension Blocks)</option>
                    <option value={30}>30 Years (3 Extension Blocks)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <AdSenseHolder label="Above Results PPF Grid" />

          {/* Results Summary block */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-medium text-text mb-6">Maturity Ledger</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              <div className="bg-success/5 p-4 rounded-xl border border-success/15 md:col-span-3 text-center">
                <span className="text-xs text-success font-semibold uppercase tracking-wider block mb-1">Maturity Valuation</span>
                <span className="text-3xl font-extrabold text-primary block">
                  {formatCurrency(results.maturityValue)}
                </span>
              </div>
              <div className="p-4 bg-gray-50/50 rounded-xl">
                <span className="text-xs text-text-muted block">Total Principal Deposited</span>
                <span className="text-lg font-semibold text-text">{formatCurrency(results.totalInvested)}</span>
              </div>
              <div className="p-4 bg-gray-50/50 rounded-xl">
                <span className="text-xs text-text-muted block">Total Compounded Interest</span>
                <span className="text-lg font-semibold text-accent">{formatCurrency(results.totalInterestEarned)}</span>
              </div>
              <div className="p-4 bg-gray-50/50 rounded-xl">
                <span className="text-xs text-text-muted block">Lock-In Tenure Selected</span>
                <span className="text-lg font-semibold text-text">{tenureYears} Years</span>
              </div>
            </div>
          </div>

          {/* Yearly Amortisation Schedule table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-medium text-text mb-6 flex items-center gap-1.5">
              <Table className="w-5 h-5 text-accent" /> PPF Annual Ledger Book
            </h3>
            <div className="overflow-x-auto max-h-[350px] overflow-y-auto rounded-xl border border-gray-100">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase text-primary sticky top-0">
                    <th className="py-2.5 px-4">Year</th>
                    <th className="py-2.5 px-4 text-right">Opening Bal.</th>
                    <th className="py-2.5 px-4 text-right">Yearly Payout</th>
                    <th className="py-2.5 px-4 text-right text-accent">Interest Gained</th>
                    <th className="py-2.5 px-4 text-right">Closing Bal.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans text-xs">
                  {results.yearByYearTable.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50/50 transition">
                      <td className="py-2.5 px-4 font-semibold text-text">Year {row.year}</td>
                      <td className="py-2.5 px-4 text-right text-text-muted">{formatCurrency(row.openingBalance)}</td>
                      <td className="py-2.5 px-4 text-right text-text-muted">{formatCurrency(row.deposit)}</td>
                      <td className="py-2.5 px-4 text-right text-accent font-medium">{formatCurrency(row.interestEarned)}</td>
                      <td className="py-2.5 px-4 text-right text-text font-semibold">{formatCurrency(row.closingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar info (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* EEE Facts list */}
          <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">The Triple E (EEE) Advantage</h3>
            <p className="text-xs text-gray-200 leading-relaxed font-sans">
              The Public Provident Fund occupies a premier rank in tax savings because it carries complete tax exemptions across all three phases:
            </p>
            <div className="space-y-3 font-sans text-xs text-gray-300">
              <p>• <strong>1. Invested:</strong> Deposits are deductible under Section 80C up to ₹1,50,000 annually.</p>
              <p>• <strong>2. Accumulated:</strong> Compounding interest earned on PPF balance triggers absolute zero tax.</p>
              <p>• <strong>3. Withdrawn:</strong> The final lump-sum maturity amount is fully tax-free on credit payout.</p>
            </div>
          </div>

          <AdSenseHolder label="Sidebar advertisement block" />

          {/* Key Facts list container card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="text-base font-semibold text-primary flex items-center gap-1.5">
              <FileText className="w-5 h-5 text-accent" /> Essential PPF Regulations
            </h3>
            <ul className="text-xs leading-relaxed text-text-muted space-y-3">
              <li>
                <strong>Lock-In:</strong> Standard 15-year holding term from account activation.
              </li>
              <li>
                <strong>Extensions:</strong> Unlimited options to extend in 5-year blocks under formal requests.
              </li>
              <li>
                <strong>Partial Withdrawals:</strong> Allowed from Year 7 onwards for critical financial outlays.
              </li>
              <li>
                <strong>Loan Privilege:</strong> Avail loans against your PPF balances from the 3rd to 6th financial year.
              </li>
            </ul>
          </div>

          {/* Related blog posts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-primary mb-4">Related Knowledge Base</h3>
            <button
                type="button"
                onClick={() => onNavigateToBlog('what-is-ppf')}
                className="w-full text-left group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-accent/10 text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text group-hover:text-accent font-serif-heading line-clamp-2">
                    PPF Account in India — Everything You Need to Know
                  </h4>
                  <span className="text-[10px] text-text-muted font-sans mt-0.5 block">5 Min Read • Investments Guide</span>
                </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
