import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateHraExemption } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';
import { Calculator, ArrowRight, ShieldCheck, Scale } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight mb-2">
          HRA Exemption Calculator India
        </h1>
        <p className="text-text-muted max-w-2xl">
          Determine the tax-deductible House Rent Allowance (HRA) portion of your salary slip under Section 10(13A).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Calculator inputs & Three-part output */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-medium text-text flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" /> Enter Salary Details (Monthly)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Salary */}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">Basic Salary per month (₹)</label>
                <input
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Math.max(1000, Number(e.target.value)))}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                />
                <span className="text-[10px] text-text-muted block mt-1">Basic Salary + Dearness Allowance (DA) combined.</span>
              </div>

              {/* HRA Received */}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">HRA Received per month (₹)</label>
                <input
                  type="number"
                  value={hraReceived}
                  onChange={(e) => setHraReceived(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                />
                <span className="text-[10px] text-text-muted block mt-1">Check "House Rent Allowance" in basic payslip.</span>
              </div>

              {/* Actual Rent Paid */}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">Actual Rent Paid per month (₹)</label>
                <input
                  type="number"
                  value={rentPaid}
                  onChange={(e) => setRentPaid(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                />
                <span className="text-[10px] text-text-muted block mt-1">Total rent cash paid to landlord monthly.</span>
              </div>

              {/* Metro location toggle */}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">Residing City classification</label>
                <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setIsMetro(true)}
                    className={`flex-1 py-2 rounded-lg text-center transition ${isMetro ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
                  >
                    Metro (Mumbai, Delhi, Chennai, Kolkata)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMetro(false)}
                    className={`flex-1 py-2 rounded-lg text-center transition ${!isMetro ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}
                  >
                    Non-Metro City
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AdSenseHolder label="Above Results HRA Breakdown" />

          {/* Results Summary and the three statutory rules comparison */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-medium text-text flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-success" /> Exemption Determination
            </h3>

            {/* Display final result in main highlight banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-success/5 p-4 rounded-xl border border-success/15 text-center">
                <span className="text-[11px] text-success font-semibold uppercase tracking-wider block mb-1">
                  Tax-Exempt HRA Portion
                </span>
                <span className="text-3xl font-extrabold text-primary block">
                  {formatCurrency(results.hraExemption * 12)}
                </span>
                <span className="text-[10px] text-text-muted block mt-1">
                  ({formatCurrency(results.hraExemption)} monthly)
                </span>
              </div>

              <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10 text-center">
                <span className="text-[11px] text-red-500 font-semibold uppercase tracking-wider block mb-1">
                  Fully Taxable HRA Component
                </span>
                <span className="text-3xl font-extrabold text-primary block">
                  {formatCurrency(results.taxableHra * 12)}
                </span>
                <span className="text-[10px] text-text-muted block mt-1">
                  ({formatCurrency(results.taxableHra)} monthly added to income)
                </span>
              </div>
            </div>

            {/* The Three Rules visualizer cards */}
            <div className="pt-4 border-t border-gray-100 space-y-4 font-sans">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                Comparison under Statutory Conditions:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 relative">
                  <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">Condition A</span>
                  <span className="text-xs font-semibold text-text block mb-2">{results.rule1Label}</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(results.rule1Val)}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 relative">
                  <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">Condition B</span>
                  <span className="text-xs font-semibold text-text block mb-2">{results.rule2Label}</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(results.rule2Val)}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 relative">
                  <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">Condition C</span>
                  <span className="text-xs font-semibold text-text block mb-2">{results.rule3Label}</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(results.rule3Val)}</span>
                </div>
              </div>

              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-xs text-primary/95 text-center font-medium leading-relaxed">
                * As per Rule 2A of Income Tax Rules, HRA tax exemption is designated as the <strong>absolute minimum</strong> of these three conditions, yielding {formatCurrency(results.hraExemption)} monthly.
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Sidebar guidance & details (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Detailed rule explanation card */}
          <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-semibold tracking-tight uppercase">Section 10(13A)</h3>
            <p className="text-xs text-gray-200 leading-relaxed font-sans">
              Under Section 10(13A), HRA is tax-deductible only if you actually live in a rented home. It cannot be claimed if you reside in your own household.
            </p>
            <h4 className="text-xs font-semibold text-accent uppercase tracking-wider">Required Compliance Files:</h4>
            <div className="space-y-3 font-sans text-xs text-gray-300">
              <p>• <strong>Rent Receipts:</strong> Receipts signed by the landlord acts as valid proof of rent payout.</p>
              <p>• <strong>PAN of Landlord:</strong> Mandatory to specify your landlord's PAN if annual rent payments exceed ₹1,00,000.</p>
              <p>• <strong>Agreement:</strong> Solid rental contract specifying lease details, deposit, and conditions.</p>
            </div>
          </div>

          <AdSenseHolder label="Sidebar advertisement block" />

          {/* Related Articles blog block */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-primary mb-4">Related Knowledge Base</h3>
            <button
                type="button"
                onClick={() => onNavigateToBlog('how-hra-exemption-works')}
                className="w-full text-left group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-accent/10 text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text group-hover:text-accent font-serif-heading line-clamp-2">
                    HRA Exemption — How to Save Tax on House Rent Allowance
                  </h4>
                  <span className="text-[10px] text-text-muted font-sans mt-0.5 block">5 Min Read • House Rent Savings</span>
                </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
