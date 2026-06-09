import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateIncomeTax } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';
import { Calculator, ShieldAlert, CheckCircle, Scale, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface IncomeTaxCalculatorProps {
  onNavigateToBlog: (slug: string) => void;
}

export default function IncomeTaxCalculator({ onNavigateToBlog }: IncomeTaxCalculatorProps) {
  // Inputs
  const [grossIncome, setGrossIncome] = useState<number>(750000);
  const [financialYear, setFinancialYear] = useState<'2025-26' | '2024-25'>('2025-26');
  const [taxpayerCategory, setTaxpayerCategory] = useState<'individual' | 'senior' | 'super_senior'>('individual');
  const [showDeductions, setShowDeductions] = useState<boolean>(false);

  // Deductions for Old Regime
  const [sec80C, setSec80C] = useState<number>(150000); // EPF, PPF, Life Insurance, etc.
  const [sec80D, setSec80D] = useState<number>(25000);  // Health Insurance
  const [hraExemption, setHraExemption] = useState<number>(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(0); // 24(b)
  const [others, setOthers] = useState<number>(0); // 80E, etc.

  // Compute Tax
  const taxResults = useMemo(() => {
    return calculateIncomeTax(
      grossIncome,
      financialYear,
      taxpayerCategory,
      {
        sec80C,
        sec80D,
        hraExemption,
        homeLoanInterest,
        others
      }
    );
  }, [grossIncome, financialYear, taxpayerCategory, sec80C, sec80D, hraExemption, homeLoanInterest, others]);

  // Recommendation determination
  const { recommendationBanner, savingAmount } = useMemo(() => {
    const diff = Math.abs(taxResults.newRegime.totalTax - taxResults.oldRegime.totalTax);
    if (diff < 1) {
      return {
        recommendationBanner: 'Both Regimes yield equivalent tax liability.',
        savingAmount: 0
      };
    }
    if (taxResults.newRegime.totalTax < taxResults.oldRegime.totalTax) {
      return {
        recommendationBanner: `New Regime is highly beneficial! It saves you ${formatCurrency(diff)} annually.`,
        savingAmount: diff
      };
    } else {
      return {
        recommendationBanner: `Old Regime remains beneficial! It saves you ${formatCurrency(diff)} annually.`,
        savingAmount: diff
      };
    }
  }, [taxResults]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight mb-2">
          Income Taxold vs New Regime Calculator
        </h1>
        <p className="text-text-muted max-w-2xl">
          Instantly evaluate and compare tax liabilities under Old vs New Tax Regimes according to the Union Budget FY 2025-26 guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Columns (Calculators and side-by-side tables) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Inputs Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-medium text-text mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" /> Tax Assessment Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Financial Year */}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">Financial Year (FY)</label>
                <select
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value as '2025-26' | '2024-25')}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                >
                  <option value="2025-26">FY 2025-26 (Latest Budget Revised)</option>
                  <option value="2024-25">FY 2024-25 (Previous Budget)</option>
                </select>
              </div>

              {/* Taxpayer Category */}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">Category of Taxpayer</label>
                <select
                  value={taxpayerCategory}
                  onChange={(e) => setTaxpayerCategory(e.target.value as 'individual' | 'senior' | 'super_senior')}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                >
                  <option value="individual">Individual (Below 60 Years)</option>
                  <option value="senior">Senior Citizen (60 - 80 Years)</option>
                  <option value="super_senior">Super Senior Citizen (80+ Years)</option>
                </select>
              </div>

              {/* Gross Annual Income */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text">Gross Annual Salary / Business Income (₹)</label>
                  <input
                    type="number"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(Math.min(100000000, Math.max(0, Number(e.target.value))))}
                    className="w-32 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
                  />
                </div>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="25000"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
                  <span>₹1 Lakh</span>
                  <span>₹25 Lakhs</span>
                  <span>₹50 Lakhs</span>
                </div>
              </div>
            </div>

            {/* Collapsible Deduction Details (Only relevant for Old Regime) */}
            <div className="border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={() => setShowDeductions(!showDeductions)}
                className="w-full flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 p-3 rounded-xl transition border border-gray-100"
              >
                <div className="text-left">
                  <span className="text-sm font-semibold text-text block">Old Regime Tax Deductions</span>
                  <p className="text-[10px] text-text-muted">Enter active investments/outlays to re-calculate Old Tax Regime liability</p>
                </div>
                {showDeductions ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
              </button>

              {showDeductions && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50/30 rounded-xl border border-gray-150 animate-fadeIn">
                  {/* Sec 80C */}
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1">Section 80C (Max ₹1.5L)</label>
                    <input
                      type="number"
                      value={sec80C}
                      onChange={(e) => setSec80C(Math.min(150000, Math.max(0, Number(e.target.value))))}
                      placeholder="EPF, PPF, ELSS Mutual Funds"
                      className="w-full bg-white border border-gray-200 p-2 rounded-lg text-sm font-medium text-primary outline-none"
                    />
                  </div>

                  {/* Sec 80D */}
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1">
                      Section 80D ({taxpayerCategory === 'individual' ? 'Max ₹25K' : 'Max ₹50K'})
                    </label>
                    <input
                      type="number"
                      value={sec80D}
                      onChange={(e) => setSec80D(Math.min(taxpayerCategory === 'individual' ? 25000 : 50000, Math.max(0, Number(e.target.value))))}
                      placeholder="Medical Insurance Premiums"
                      className="w-full bg-white border border-gray-200 p-2 rounded-lg text-sm font-medium text-primary outline-none"
                    />
                  </div>

                  {/* HRA Exemption */}
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1">HRA Tax-Exempt Portion (₹)</label>
                    <input
                      type="number"
                      value={hraExemption}
                      onChange={(e) => setHraExemption(Math.max(0, Number(e.target.value)))}
                      placeholder="Exempt housing rent component"
                      className="w-full bg-white border border-gray-200 p-2 rounded-lg text-sm font-medium text-primary outline-none"
                    />
                  </div>

                  {/* Home Loan Interest (24b) */}
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1">Home Loan Interest 24(b) (Max ₹2L)</label>
                    <input
                      type="number"
                      value={homeLoanInterest}
                      onChange={(e) => setHomeLoanInterest(Math.min(200000, Math.max(0, Number(e.target.value))))}
                      placeholder="Interest portion paid"
                      className="w-full bg-white border border-gray-200 p-2 rounded-lg text-sm font-medium text-primary outline-none"
                    />
                  </div>

                  {/* Other tax exemptions */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-text-muted mb-1">Other Exemptions (Sec 80E, 80G, LTA, etc.) (₹)</label>
                    <input
                      type="number"
                      value={others}
                      onChange={(e) => setOthers(Math.max(0, Number(e.target.value)))}
                      placeholder="Education loan interest, eligible charity contributions"
                      className="w-full bg-white border border-gray-200 p-2 rounded-lg text-sm font-medium text-primary outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slabs updates disclaimer/warning */}
          <div className="bg-yellow-50 text-yellow-800 border-l-4 border-accent p-4 rounded-xl flex gap-3 text-xs leading-relaxed font-sans">
            <ShieldAlert className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900 mb-0.5">Budget FY 2025-26 Slabs Note:</p>
              Under FY 2025-26 New Tax Regime, Standard Deduction is automatically set to ₹75,000, and no tax is due on net incomes up to ₹12 Lakhs (with 87A rebate). Surcharges are capped at 25%. This information is for general estimate guidance. Always consult with a Chartered Accountant (CA) before filing returns.
            </div>
          </div>

          <AdSenseHolder label="Above Results Comparison Block" />

          {/* Comparison Side-by-Side Table results */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-xl font-medium text-text mb-6 flex items-center gap-1.5">
              <Scale className="w-5 h-5 text-primary" /> Side-by-Side Comparison Matrix
            </h3>

            {/* Recommendation Alert Banner */}
            <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success shrink-0" />
              <span className="text-sm font-semibold text-primary font-sans leading-relaxed">
                {recommendationBanner}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase text-primary">
                    <th className="py-3 px-4">Evaluation Metric</th>
                    <th className="py-3 px-4 text-right">Old Regime</th>
                    <th className="py-3 px-4 text-right bg-primary/5">New Regime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans">
                  <tr>
                    <td className="py-3 px-4 text-text font-medium">Gross Annual Income</td>
                    <td className="py-3 px-4 text-right text-text">{formatCurrency(grossIncome)}</td>
                    <td className="py-3 px-4 text-right text-text bg-primary/5">{formatCurrency(grossIncome)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text font-medium">Standard Deduction</td>
                    <td className="py-3 px-4 text-right text-text-muted">{formatCurrency(taxResults.oldRegime.standardDeduction)}</td>
                    <td className="py-3 px-4 text-right text-text bg-primary/5">{formatCurrency(taxResults.newRegime.standardDeduction)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text font-medium">Other Structural Deductions (Exempt)</td>
                    <td className="py-3 px-4 text-right text-text-muted">{formatCurrency(taxResults.oldRegime.otherDeductions)}</td>
                    <td className="py-3 px-4 text-right text-text-muted bg-primary/5">₹0 (Not Permitted)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text font-medium">Total Taxable Net Income</td>
                    <td className="py-3 px-4 text-right text-text font-semibold">{formatCurrency(taxResults.oldRegime.taxableIncome)}</td>
                    <td className="py-3 px-4 text-right text-text font-semibold bg-primary/5">{formatCurrency(taxResults.newRegime.taxableIncome)}</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-3 px-4 text-text font-medium">Base Slab Tax (Before Surcharges)</td>
                    <td className="py-3 px-4 text-right text-text">{formatCurrency(taxResults.oldRegime.baseTax)}</td>
                    <td className="py-3 px-4 text-right text-text bg-primary/5">{formatCurrency(taxResults.newRegime.baseTax)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text font-medium">Surcharges (High Income Bracket)</td>
                    <td className="py-3 px-4 text-right text-text-muted">{formatCurrency(taxResults.oldRegime.surcharge)}</td>
                    <td className="py-3 px-4 text-right text-text-muted bg-primary/5">{formatCurrency(taxResults.newRegime.surcharge)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text font-medium">Education & Health Cess (4%)</td>
                    <td className="py-3 px-4 text-right text-text-muted">{formatCurrency(taxResults.oldRegime.cess)}</td>
                    <td className="py-3 px-4 text-right text-text-muted bg-primary/5">{formatCurrency(taxResults.newRegime.cess)}</td>
                  </tr>
                  <tr className="bg-primary/5 border-t border-gray-200">
                    <td className="py-4 px-4 text-primary font-bold text-base">Total Income Tax Payable</td>
                    <td className="py-4 px-4 text-right text-text font-bold text-lg">{formatCurrency(taxResults.oldRegime.totalTax)}</td>
                    <td className="py-4 px-4 text-right text-primary font-bold text-xl bg-primary/10">{formatCurrency(taxResults.newRegime.totalTax)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right columns: Sidebar Info content (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Slabs quick snapshot */}
          <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">New Regime Slabs (FY 2025-26)</h3>
            <div className="text-xs space-y-2 font-mono divide-y divide-white/10">
              <div className="py-1 flex justify-between">
                <span>Up to ₹3,00,000</span>
                <span className="text-green-300">Nil</span>
              </div>
              <div className="py-1 flex justify-between">
                <span>₹3,00,001 - ₹7,00,000</span>
                <span>5%</span>
              </div>
              <div className="py-1 flex justify-between">
                <span>₹7,00,001 - ₹10,00,000</span>
                <span>10%</span>
              </div>
              <div className="py-1 flex justify-between">
                <span>₹10,00,001 - ₹12,00,000</span>
                <span>15%</span>
              </div>
              <div className="py-1 flex justify-between">
                <span>₹12,00,001 - ₹15,00,000</span>
                <span>20%</span>
              </div>
              <div className="py-1 flex justify-between">
                <span>Above ₹15,00,000</span>
                <span>30%</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-300 leading-relaxed font-sans">
              * Income up to ₹12 Lakhs incurs complete ZERO tax liabilities due to Section 87A rebate adjustments in default conditions.
            </p>
          </div>

          <AdSenseHolder label="Sidebar advertisement block" />

          {/* Related blog posts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-primary mb-4">Related Knowledge Base</h3>
            <div className="space-y-4">
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
                  <span className="text-[10px] text-text-muted mt-0.5 block">7 Min Read • Taxation Guide</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToBlog('how-hra-exemption-works')}
                className="w-full text-left group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-accent/10 text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text group-hover:text-accent font-serif-heading line-clamp-2">
                    HRA Exemption — How to Save Tax on House Rent Allowance
                  </h4>
                  <span className="text-[10px] text-text-muted mt-0.5 block">5 Min Read • House Rent Savings</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
