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
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold text-primary tracking-tight mb-2">
          Income Tax Calculator (Old vs New)
        </h1>
        <p className="text-text-muted text-base">
          Compare your tax liability under the Old and New tax regimes for FY 2025-26 side-by-side.
        </p>
      </div>

      {/* 1. Inputs on Top */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Tax Assessment Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Financial Year */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-2 uppercase">Financial Year (FY)</label>
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value as '2025-26' | '2024-25')}
              className="w-full bg-slate-50 border border-border focus:border-accent p-2.5 rounded-lg font-medium text-primary outline-none text-sm cursor-pointer"
            >
              <option value="2025-26">FY 2025-26 (Latest Budget Revised)</option>
              <option value="2024-25">FY 2024-25 (Previous Budget)</option>
            </select>
          </div>

          {/* Taxpayer Category */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-2 uppercase">Category of Taxpayer</label>
            <select
              value={taxpayerCategory}
              onChange={(e) => setTaxpayerCategory(e.target.value as 'individual' | 'senior' | 'super_senior')}
              className="w-full bg-slate-50 border border-border focus:border-accent p-2.5 rounded-lg font-medium text-primary outline-none text-sm cursor-pointer"
            >
              <option value="individual">Individual (Below 60 Years)</option>
              <option value="senior">Senior Citizen (60 - 80 Years)</option>
              <option value="super_senior">Super Senior Citizen (80+ Years)</option>
            </select>
          </div>

          {/* Gross Annual Income */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-primary">Gross Annual Salary / Income (₹)</label>
              <input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(Math.min(100000000, Math.max(0, Number(e.target.value))))}
                className="w-32 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
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
        <div className="border-t border-border pt-5">
          <button
            type="button"
            onClick={() => setShowDeductions(!showDeductions)}
            className="w-full flex justify-between items-center bg-slate-50 hover:bg-slate-100/60 p-3.5 rounded-lg transition border border-border cursor-pointer"
          >
            <div className="text-left">
              <span className="text-sm font-semibold text-primary block">Old Regime Tax Deductions</span>
              <p className="text-[10px] text-text-muted mt-0.5">Enter active savings/investments to re-calculate Old Regime liability</p>
            </div>
            {showDeductions ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
          </button>

          {showDeductions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-5 bg-slate-50/50 rounded-lg border border-border animate-fadeIn">
              {/* Sec 80C */}
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Section 80C (Max ₹1.5L)</label>
                <input
                  type="number"
                  value={sec80C}
                  onChange={(e) => setSec80C(Math.min(150000, Math.max(0, Number(e.target.value))))}
                  placeholder="EPF, PPF, ELSS, Insurance"
                  className="w-full bg-white border border-border p-2 rounded-lg text-sm font-medium text-primary outline-none"
                />
              </div>

              {/* Sec 80D */}
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  Section 80D ({taxpayerCategory === 'individual' ? 'Max ₹25K' : 'Max ₹50K'})
                </label>
                <input
                  type="number"
                  value={sec80D}
                  onChange={(e) => setSec80D(Math.min(taxpayerCategory === 'individual' ? 25000 : 50000, Math.max(0, Number(e.target.value))))}
                  placeholder="Medical Insurance Premiums"
                  className="w-full bg-white border border-border p-2 rounded-lg text-sm font-medium text-primary outline-none"
                />
              </div>

              {/* HRA Exemption */}
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">HRA Tax-Exempt Portion (₹)</label>
                <input
                  type="number"
                  value={hraExemption}
                  onChange={(e) => setHraExemption(Math.max(0, Number(e.target.value)))}
                  placeholder="Exempt housing rent component"
                  className="w-full bg-white border border-border p-2 rounded-lg text-sm font-medium text-primary outline-none"
                />
              </div>

              {/* Home Loan Interest (24b) */}
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Home Loan Interest 24(b) (Max ₹2L)</label>
                <input
                  type="number"
                  value={homeLoanInterest}
                  onChange={(e) => setHomeLoanInterest(Math.min(200000, Math.max(0, Number(e.target.value))))}
                  placeholder="Interest portion paid"
                  className="w-full bg-white border border-border p-2 rounded-lg text-sm font-medium text-primary outline-none"
                />
              </div>

              {/* Other tax exemptions */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-primary mb-1">Other Exemptions (Sec 80E, 80G, LTA, etc.) (₹)</label>
                <input
                  type="number"
                  value={others}
                  onChange={(e) => setOthers(Math.max(0, Number(e.target.value)))}
                  placeholder="Education loan interest, eligible charity contributions"
                  className="w-full bg-white border border-border p-2 rounded-lg text-sm font-medium text-primary outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slabs updates warning */}
      <div className="bg-slate-50 text-primary border-l-4 border-accent p-4 rounded-lg flex gap-3 text-xs leading-relaxed font-sans border border-border">
        <ShieldAlert className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-primary mb-0.5">Budget FY 2025-26 Note:</p>
          Salaried standard deduction is automatically set to ₹75,000 under the New tax regime (and ₹50,000 under Old). Incomes up to ₹12 Lakhs incur ZERO tax liability due to Section 87A rebate adjustments in default conditions. For exact tax filing support, seek certified Chartered Accountant services.
        </div>
      </div>

      <AdSenseHolder label="Above Results Comparison Matrix" />

      {/* 2. Results Directly Below */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Tax regime comparison Matrix
        </h2>

        {/* Recommendation Alert Banner */}
        <div className="p-4 bg-slate-50 rounded-lg border border-border flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-accent shrink-0" />
          <span className="text-sm font-semibold text-teal-700 font-sans leading-relaxed">
            {recommendationBanner}
          </span>
        </div>

        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-border text-xs font-semibold uppercase text-primary">
                <th className="py-3 px-4">Evaluation Metric</th>
                <th className="py-3 px-4 text-right">Old Regime</th>
                <th className="py-3 px-4 text-right bg-slate-50/60">New Regime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-sans">
              <tr>
                <td className="py-3 px-4 text-primary font-medium">Gross Annual Income</td>
                <td className="py-3 px-4 text-right text-primary font-medium">{formatCurrency(grossIncome)}</td>
                <td className="py-3 px-4 text-right text-primary font-medium bg-slate-50/60">{formatCurrency(grossIncome)}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-muted">Standard Deduction</td>
                <td className="py-3 px-4 text-right text-text-muted">{formatCurrency(taxResults.oldRegime.standardDeduction)}</td>
                <td className="py-3 px-4 text-right text-primary font-medium bg-slate-50/60">{formatCurrency(taxResults.newRegime.standardDeduction)}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-muted">Other Exemptions (Deductions)</td>
                <td className="py-3 px-4 text-right text-text-muted">{formatCurrency(taxResults.oldRegime.otherDeductions)}</td>
                <td className="py-3 px-4 text-right text-text-muted bg-slate-50/60">₹0 (Not Allowed)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-primary font-medium">Net Taxable Income</td>
                <td className="py-3 px-4 text-right text-primary font-semibold">{formatCurrency(taxResults.oldRegime.taxableIncome)}</td>
                <td className="py-3 px-4 text-right text-primary font-semibold bg-slate-50/60">{formatCurrency(taxResults.newRegime.taxableIncome)}</td>
              </tr>
              <tr className="bg-slate-50/30">
                <td className="py-3 px-4 text-text-muted">Base Slab Tax</td>
                <td className="py-3 px-4 text-right text-text-muted">{formatCurrency(taxResults.oldRegime.baseTax)}</td>
                <td className="py-3 px-4 text-right text-primary bg-slate-50/60">{formatCurrency(taxResults.newRegime.baseTax)}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-muted">Surcharges (If applicable)</td>
                <td className="py-3 px-4 text-right text-text-muted">{formatCurrency(taxResults.oldRegime.surcharge)}</td>
                <td className="py-3 px-4 text-right text-text-muted bg-slate-50/60">{formatCurrency(taxResults.newRegime.surcharge)}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-muted">Education Cess (4%)</td>
                <td className="py-3 px-4 text-right text-text-muted">{formatCurrency(taxResults.oldRegime.cess)}</td>
                <td className="py-3 px-4 text-right text-text-muted bg-slate-50/60">{formatCurrency(taxResults.newRegime.cess)}</td>
              </tr>
              <tr className="bg-slate-50 border-t border-border font-bold">
                <td className="py-4 px-4 text-primary text-base">Total Income Tax Payable</td>
                <td className="py-4 px-4 text-right text-primary text-lg">{formatCurrency(taxResults.oldRegime.totalTax)}</td>
                <td className="py-4 px-4 text-right text-teal-700 text-xl bg-slate-100">{formatCurrency(taxResults.newRegime.totalTax)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Explanation Below Results */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6 text-sm font-sans leading-relaxed">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Income Tax Slab Slabs & Regime Notes
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-primary mb-3">New Tax Regime Slabs (FY 2025-26)</h3>
            <div className="text-xs space-y-2 font-mono divide-y divide-border border border-border rounded-lg overflow-hidden bg-slate-50/30 p-2">
              <div className="py-1.5 flex justify-between px-2">
                <span>Income up to ₹3,00,000</span>
                <span className="text-teal-700 font-semibold">Nil</span>
              </div>
              <div className="py-1.5 flex justify-between px-2">
                <span>₹3,00,001 - ₹7,00,000</span>
                <span>5%</span>
              </div>
              <div className="py-1.5 flex justify-between px-2">
                <span>₹7,00,001 - ₹10,00,000</span>
                <span>10%</span>
              </div>
              <div className="py-1.5 flex justify-between px-2">
                <span>₹10,00,001 - ₹12,00,000</span>
                <span>15%</span>
              </div>
              <div className="py-1.5 flex justify-between px-2">
                <span>₹12,00,001 - ₹15,00,000</span>
                <span>20%</span>
              </div>
              <div className="py-1.5 flex justify-between px-2">
                <span>Above ₹15,00,000</span>
                <span>30%</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-text-muted">
            * <strong>Section 87A rebate:</strong> Salaried individuals with a taxable income of up to ₹12,00,000 pay zero tax under the New tax regime because of revised budget rebate calculations.
          </p>
        </div>
      </div>

      <AdSenseHolder label="Below Slabs advertisement" />

      {/* 4. FAQ at Bottom */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3 flex items-center gap-2">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 font-sans">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">What are the main differences between the Old and New tax regimes?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              The Old regime has higher tax rates but allows you to claim numerous exemptions and deductions (like 80C, HRA, home loan interest, and LTA). The New regime offers lower tax slabs and simpler filing, but you must forfeit almost all deductions, except standard deduction.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">What is the Section 87A tax rebate?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Under the New regime for FY 2025-26, individuals with taxable income up to ₹12 Lakhs are eligible for a tax rebate under Section 87A, resulting in zero tax liability. Under the Old regime, this rebate is capped at ₹5 Lakhs.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">How much Standard Deduction is allowed in FY 2025-26?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              In the Union Budget FY 2025-26, the standard deduction for salaried individuals is ₹75,000 under the New tax regime, whereas it is ₹50,000 under the Old tax regime.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary">Can I switch regimes every year?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Salaried individuals (without business income) can choose and switch between the Old and New regimes every year when filing their Income Tax Return (ITR). Taxpayers with business or professional income generally have only a one-time option to opt out of the New regime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
