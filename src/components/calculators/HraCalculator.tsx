import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateHraExemption } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';

interface HraCalculatorProps {
  onNavigateToBlog: (slug: string) => void;
}

export default function HraCalculator({ onNavigateToBlog }: HraCalculatorProps) {
  // Inputs
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [hraReceived, setHraReceived] = useState<number>(20000);
  const [rentPaid, setRentPaid] = useState<number>(15000);
  const [isMetro, setIsMetro] = useState<boolean>(false); // Metro cities: Delhi, Mumbai, Chennai, Kolkata

  // Calculate HRA exemptions
  const results = useMemo(() => {
    return calculateHraExemption(basicSalary, hraReceived, rentPaid, isMetro);
  }, [basicSalary, hraReceived, rentPaid, isMetro]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold text-primary tracking-tight mb-2">
          HRA Calculator
        </h1>
        <p className="text-text-muted text-base">
          Determine the tax-exempt and taxable House Rent Allowance (HRA) portions under Section 10(13A).
        </p>
      </div>

      {/* 1. Inputs Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Salary & Rent Parameters (Monthly)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Salary */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-2 uppercase">Basic Salary per month (₹)</label>
            <input
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(Math.max(1000, Number(e.target.value)))}
              className="w-full bg-slate-50 border border-border focus:border-accent p-2 rounded-lg font-medium text-primary outline-none text-sm"
            />
            <span className="text-[10px] text-text-muted block mt-1">Basic Salary + Dearness Allowance (DA) combined.</span>
          </div>

          {/* HRA Received */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-2 uppercase">HRA Received per month (₹)</label>
            <input
              type="number"
              value={hraReceived}
              onChange={(e) => setHraReceived(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-50 border border-border focus:border-accent p-2 rounded-lg font-medium text-primary outline-none text-sm"
            />
            <span className="text-[10px] text-text-muted block mt-1">Check "House Rent Allowance" in basic payslip.</span>
          </div>

          {/* Actual Rent Paid */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-2 uppercase">Actual Rent Paid per month (₹)</label>
            <input
              type="number"
              value={rentPaid}
              onChange={(e) => setRentPaid(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-50 border border-border focus:border-accent p-2 rounded-lg font-medium text-primary outline-none text-sm"
            />
            <span className="text-[10px] text-text-muted block mt-1">Total rent paid to landlord monthly.</span>
          </div>

          {/* Metro location toggle */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-2 uppercase">Residing City classification</label>
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setIsMetro(true)}
                className={`flex-1 py-1.5 rounded-md text-center transition cursor-pointer ${isMetro ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
              >
                Metro
              </button>
              <button
                type="button"
                onClick={() => setIsMetro(false)}
                className={`flex-1 py-1.5 rounded-md text-center transition cursor-pointer ${!isMetro ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
              >
                Non-Metro
              </button>
            </div>
            <span className="text-[10px] text-text-muted block mt-1">Metro covers Delhi, Mumbai, Chennai, and Kolkata.</span>
          </div>
        </div>
      </div>

      <AdSenseHolder label="Above Results HRA Breakdown" />

      {/* 2. Results Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Exemption Summary
        </h2>

        {/* Display final result in main highlight banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="bg-slate-50 p-5 rounded-lg border border-border text-center">
            <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wide block mb-1">
              Tax-Exempt HRA Portion
            </span>
            <span className="text-3xl font-bold text-teal-700 block">
              {formatCurrency(results.hraExemption * 12)}
            </span>
            <span className="text-[10px] text-text-muted block mt-1">
              ({formatCurrency(results.hraExemption)} monthly)
            </span>
          </div>

          <div className="bg-slate-50 p-5 rounded-lg border border-border text-center">
            <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wide block mb-1">
              Taxable HRA Component
            </span>
            <span className="text-3xl font-bold text-primary block">
              {formatCurrency(results.taxableHra * 12)}
            </span>
            <span className="text-[10px] text-text-muted block mt-1">
              ({formatCurrency(results.taxableHra)} monthly added to taxable income)
            </span>
          </div>
        </div>

        {/* The Three Rules comparison */}
        <div className="pt-6 border-t border-border space-y-4 font-sans text-xs">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">
            Comparison under Section 10(13A) Statutory Conditions (Monthly):
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-border">
              <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">Condition 1</span>
              <span className="text-xs font-semibold text-primary block mb-2">{results.rule1Label}</span>
              <span className="text-base font-bold text-primary">{formatCurrency(results.rule1Val)}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-border">
              <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">Condition 2</span>
              <span className="text-xs font-semibold text-primary block mb-2">{results.rule2Label}</span>
              <span className="text-base font-bold text-primary">{formatCurrency(results.rule2Val)}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-border">
              <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">Condition 3</span>
              <span className="text-xs font-semibold text-primary block mb-2">{results.rule3Label}</span>
              <span className="text-base font-bold text-primary">{formatCurrency(results.rule3Val)}</span>
            </div>
          </div>

          <p className="text-[10px] text-text-muted leading-relaxed italic">
            * Note: According to Rule 2A of the Income Tax Rules, the eligible HRA tax exemption is the minimum of the three conditions above.
          </p>
        </div>
      </div>

      {/* 3. Explanation Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6 text-sm font-sans leading-relaxed">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          HRA Claim Guidelines & Section 10(13A)
        </h2>
        <div className="space-y-4 text-text-muted text-xs sm:text-sm">
          <p>
            House Rent Allowance (HRA) is tax-deductible only if you reside in rented accommodation. You cannot claim HRA exemption if you live in your own house or do not pay rent.
          </p>
          <h3 className="text-base font-semibold text-primary pt-2">Key Documents Required to Claim HRA:</h3>
          <ul className="space-y-3">
            <li>
              <strong>1. Rent Receipts:</strong> Signed rent receipts from the landlord acts as valid proof of payment, especially if cash is paid.
            </li>
            <li>
              <strong>2. Landlord's PAN Card:</strong> Mandatory for you to declare your landlord's PAN if total rent paid in a financial year exceeds ₹1,00,000.
            </li>
            <li>
              <strong>3. Rent Agreement:</strong> A written tenancy agreement is highly recommended to validate details of the lease.
            </li>
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
            <h3 className="font-semibold text-primary">Can I claim both HRA and Home Loan interest tax benefits?</h3>
            <p className="text-text-muted leading-relaxed">
              Yes, you can claim both. For example, if you reside in a rented house in one city due to work and have a home loan for a house you own in another city, or if your own house is rented out or not ready for possession yet.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">What if my landlord doesn't have a PAN card?</h3>
            <p className="text-text-muted leading-relaxed">
              If your landlord does not have a PAN card, they must provide a signed declaration (Form 60) stating so. Otherwise, your claim for rent payments exceeding ₹1,00,000 per year might be rejected by the IT department.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">Can I claim HRA if I pay rent to my parents?</h3>
            <p className="text-text-muted leading-relaxed">
              Yes, you can pay rent to your parents and claim HRA, provided the parents own the property, you sign a rent agreement, pay rent regularly via bank transfer, and the parents declare this rent as income in their tax returns.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">What cities are classified as Metros for HRA calculation?</h3>
            <p className="text-text-muted leading-relaxed">
              Only four major cities in India are classified as metros for the purposes of HRA tax calculation: Delhi, Mumbai, Chennai, and Kolkata. All other cities, regardless of size or population, fall under the non-metro category (40% limit).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

