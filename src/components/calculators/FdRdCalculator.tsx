import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateFd, calculateRd } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';
import { Landmark, ArrowRight, Table, Percent, HelpCircle } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight mb-2">
          FD & RD Calculator India
        </h1>
        <p className="text-text-muted max-w-2xl">
          Instantly evaluate maturity values and wealth accrued through Fixed Deposits (FD) or Recurring Deposits (RD) with customized options.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-gray-100 p-1 rounded-xl max-w-xs mb-8">
        <button
          onClick={() => setActiveTab('fd')}
          className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'fd' ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
        >
          Fixed Deposit (FD)
        </button>
        <button
          onClick={() => setActiveTab('rd')}
          className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'rd' ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
        >
          Recurring Deposit (RD)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Calculator & Results */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'fd' ? (
            /* FD CALCULATOR */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-medium text-text flex items-center gap-2">
                <Landmark className="w-5 h-5 text-accent" /> Configure Fixed Deposit
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Principal */}
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-text">Deposit Principal Amount (₹)</label>
                    <input
                      type="number"
                      value={fdPrincipal}
                      onChange={(e) => setFdPrincipal(Math.max(1000, Number(e.target.value)))}
                      className="w-28 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
                    />
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="1000000"
                    step="5000"
                    value={fdPrincipal}
                    onChange={(e) => setFdPrincipal(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-gray-100 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
                    <span>₹5,000</span>
                    <span>₹5 Lakhs</span>
                    <span>₹10 Lakhs</span>
                  </div>
                </div>

                {/* Rate */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-text-muted uppercase">Annual Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={fdRate}
                      onChange={(e) => setFdRate(Math.min(15, Math.max(1, Number(e.target.value))))}
                      className="w-16 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1 text-sm	"
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.1"
                    value={fdRate}
                    onChange={(e) => setFdRate(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-gray-100 rounded-lg"
                  />
                </div>

                {/* Compounding frequency */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase mb-2">Compounding Frequency</label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(Number(e.target.value) as 12 | 4 | 2 | 1)}
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                  >
                    <option value={4}>Quarterly (Standard)</option>
                    <option value={12}>Monthly</option>
                    <option value={2}>Half-yearly</option>
                    <option value={1}>Yearly</option>
                  </select>
                </div>

                {/* Tenure */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase mb-2">Deposit Tenure</label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <span className="text-[10px] text-text-muted block">Years</span>
                      <input
                        type="number"
                        min="0"
                        max="25"
                        value={fdYears}
                        onChange={(e) => setFdYears(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-sm font-medium text-primary outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-text-muted block">Months</span>
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={fdMonths}
                        onChange={(e) => setFdMonths(Math.min(11, Math.max(0, Number(e.target.value))))}
                        className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-sm font-medium text-primary outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payout Option */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase mb-2">Interests Payout Mode</label>
                  <select
                    value={payoutOption}
                    onChange={(e) => setPayoutOption(e.target.value as 'maturity' | 'monthly_interest')}
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                  >
                    <option value="maturity">Accumulated Interest (At Maturity)</option>
                    <option value="monthly_interest">Monthly Periodic Payout</option>
                  </select>
                </div>

                {/* Senior Citizen Checkbox */}
                <div className="md:col-span-2 flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <input
                    type="checkbox"
                    id="seniorCheckbox"
                    checked={isSenior}
                    onChange={(e) => setIsSenior(e.target.checked)}
                    className="w-4 h-4 text-primary focus:ring-accent border-gray-350 rounded"
                  />
                  <label htmlFor="seniorCheckbox" className="text-sm font-semibold text-primary cursor-pointer select-none">
                    I am a Senior Citizen (Adds +0.50% automatic bonus interest rate)
                  </label>
                </div>
              </div>
            </div>
          ) : (
            /* RD CALCULATOR */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-medium text-text flex items-center gap-2">
                <Landmark className="w-5 h-5 text-accent" /> Configure Recurring Deposit
              </h2>

              <div className="space-y-6">
                {/* Monthly deposit */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-text">Monthly Deposit Amount (₹)</label>
                    <input
                      type="number"
                      value={rdMonthlyDeposit}
                      onChange={(e) => setRdMonthlyDeposit(Math.max(500, Number(e.target.value)))}
                      className="w-24 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
                    />
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={rdMonthlyDeposit}
                    onChange={(e) => setRdMonthlyDeposit(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-gray-100 rounded-lg"
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
                      <label className="text-xs font-semibold text-text-muted uppercase">Annual Int. Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={rdRate}
                        onChange={(e) => setRdRate(Math.min(15, Math.max(1, Number(e.target.value))))}
                        className="w-16 text-right font-medium text-primary border-b border-gray-200 focus:border-accent outline-none px-1 text-sm"
                      />
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.1"
                      value={rdRate}
                      onChange={(e) => setRdRate(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-gray-100 rounded-lg"
                    />
                  </div>

                  {/* Period Months */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold text-text-muted uppercase">Tenure Duration (Months)</label>
                      <input
                        type="number"
                        value={rdTenureMonths}
                        onChange={(e) => setRdTenureMonths(Math.min(120, Math.max(3, Number(e.target.value))))}
                        className="w-16 text-right font-medium text-primary border-b border-gray-200 focus:border-accent outline-none px-1 text-sm"
                      />
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="120"
                      step="1"
                      value={rdTenureMonths}
                      onChange={(e) => setRdTenureMonths(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-gray-100 rounded-lg"
                    />
                    <div className="flex justify-between text-[9px] text-text-muted mt-1 font-sans">
                      <span>3 M</span>
                      <span>60 M</span>
                      <span>120 M (10 Yrs)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <AdSenseHolder label="Above Results Advertisement Slot" />

          {/* Results section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-medium text-text mb-6">Aggregate Breakdown</h3>

            {activeTab === 'fd' ? (
              /* FD RESULTS */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                <div className="bg-success/5 p-4 rounded-xl border border-success/15 md:col-span-3 text-center">
                  <span className="text-xs text-success font-semibold uppercase tracking-wider block mb-1">Maturity Amount</span>
                  <span className="text-3xl font-extrabold text-primary block">
                    {formatCurrency(fdResults.maturityAmount)}
                  </span>
                </div>
                <div className="p-4 bg-gray-50/50 rounded-xl">
                  <span className="text-xs text-text-muted block">Deposited Principal</span>
                  <span className="text-lg font-semibold text-text">{formatCurrency(fdPrincipal)}</span>
                </div>
                <div className="p-4 bg-gray-50/50 rounded-xl">
                  <span className="text-xs text-text-muted block">Wealth Interest Gained</span>
                  <span className="text-lg font-semibold text-accent">{formatCurrency(fdResults.interestEarned)}</span>
                </div>
                <div className="p-4 bg-gray-50/50 rounded-xl">
                  <span className="text-xs text-text-muted block">Effective Annual Yield</span>
                  <span className="text-lg font-semibold text-text">{fdResults.effectiveYield.toFixed(2)}%</span>
                </div>
              </div>
            ) : (
              /* RD RESULTS */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                <div className="bg-success/5 p-4 rounded-xl border border-success/15 md:col-span-3 text-center">
                  <span className="text-xs text-success font-semibold uppercase tracking-wider block mb-1">Estimated Maturity Value</span>
                  <span className="text-3xl font-extrabold text-primary block">
                    {formatCurrency(rdResults.maturityAmount)}
                  </span>
                </div>
                <div className="p-4 bg-gray-50/50 rounded-xl">
                  <span className="text-xs text-text-muted block">Total Monthly Deposits</span>
                  <span className="text-lg font-semibold text-text">{formatCurrency(rdResults.totalDeposited)}</span>
                </div>
                <div className="p-4 bg-gray-50/50 rounded-xl">
                  <span className="text-xs text-text-muted block">Interest Sum Accrued</span>
                  <span className="text-lg font-semibold text-accent">{formatCurrency(rdResults.interestEarned)}</span>
                </div>
                <div className="p-4 bg-gray-50/50 rounded-xl">
                  <span className="text-xs text-text-muted block">Total Installments</span>
                  <span className="text-lg font-semibold text-text">{rdTenureMonths} Payments</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right columns: Sidebar Info content (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Reference Rate Table (static clearly marked as approximate) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="text-base font-semibold text-primary flex items-center gap-1.5">
              <Table className="w-5 h-5 text-accent" /> Indicative Bank FD Rates (2025-26)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-gray-100">
                <thead>
                  <tr className="text-text-muted font-bold">
                    <th className="pb-2">Bank</th>
                    <th className="pb-2 text-right">1 Yr</th>
                    <th className="pb-2 text-right">3 Yrs</th>
                    <th className="pb-2 text-right">5 Yrs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 font-sans">
                  <tr>
                    <td className="py-2.5 text-text font-medium">SBI</td>
                    <td className="py-2.5 text-right font-medium">6.80%</td>
                    <td className="py-2.5 text-right font-medium">6.75%</td>
                    <td className="py-2.5 text-right font-medium">6.50%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-text font-medium">HDFC Bank</td>
                    <td className="py-2.5 text-right font-medium">7.10%</td>
                    <td className="py-2.5 text-right font-medium">7.00%</td>
                    <td className="py-2.5 text-right font-medium">7.00%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-text font-medium">ICICI Bank</td>
                    <td className="py-2.5 text-right font-medium">7.10%</td>
                    <td className="py-2.5 text-right font-medium">7.00%</td>
                    <td className="py-2.5 text-right font-medium">6.90%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-text font-medium">Axis Bank</td>
                    <td className="py-2.5 text-right font-medium">7.20%</td>
                    <td className="py-2.5 text-right font-medium">7.10%</td>
                    <td className="py-2.5 text-right font-medium">7.00%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-text font-medium">Kotak Bank</td>
                    <td className="py-2.5 text-right font-medium">7.15%</td>
                    <td className="py-2.5 text-right font-medium">7.00%</td>
                    <td className="py-2.5 text-right font-medium">6.80%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-text-muted italic leading-relaxed">
              * Indicative standard citizen rates. Senior citizens optionally secure a 0.50% bonus additions. Always verify benchmarks prior to deposit creation.
            </p>
          </div>

          <AdSenseHolder label="Sidebar advertisement block" />

          {/* FD vs RD Info Box */}
          <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">FD vs RD: Which is better?</h3>
            <p className="text-sm text-gray-200 leading-relaxed font-sans">
              While both vehicles offer government-regulated risk-free gains, they suit distinct income flows:
            </p>
            <div className="text-xs text-gray-300 space-y-3 font-sans">
              <p>• <strong>Fixed Deposits (FD):</strong> Best when you hold idle surplus capital (windfalls, bonuses) that can lock in to earn compounding returns instantly.</p>
              <p>• <strong>Recurring Deposits (RD):</strong> Ideal to commit a portion of your regular monthly salary. Each installment gains interest as you continue to deposit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
