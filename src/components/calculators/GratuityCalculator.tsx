import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateGratuity } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';
import { Calculator, ArrowRight, ShieldAlert, Award } from 'lucide-react';

interface GratuityCalculatorProps {
  onNavigateToBlog: (slug: string) => void;
}

export default function GratuityCalculator({ onNavigateToBlog }: GratuityCalculatorProps) {
  // Inputs
  const [salaryBasicDa, setSalaryBasicDa] = useState<number>(50000);
  const [serviceYears, setServiceYears] = useState<number>(5);
  const [employmentType, setEmploymentType] = useState<'government' | 'private_covered' | 'private_uncovered'>('private_covered');

  // Compute Gratuity
  const results = useMemo(() => {
    return calculateGratuity(salaryBasicDa, serviceYears, employmentType);
  }, [salaryBasicDa, serviceYears, employmentType]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight mb-2">
          Gratuity Calculator India
        </h1>
        <p className="text-text-muted max-w-2xl">
          Instantly compute prospective gratuity payouts under the Payment of Gratuity Act 1972 based on service tenure and last basic payslip values.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs & outputs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-medium text-text flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" /> Customize Gratuity Inputs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic + DA Salary monthly */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-text">Last Drawn Monthly Basic + DA Salary (₹)</label>
                  <input
                    type="number"
                    value={salaryBasicDa}
                    onChange={(e) => setSalaryBasicDa(Math.max(1000, Number(e.target.value)))}
                    className="w-24 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
                  />
                </div>
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="2500"
                  value={salaryBasicDa}
                  onChange={(e) => setSalaryBasicDa(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-100 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
                  <span>₹5,000</span>
                  <span>₹1,25,000</span>
                  <span>₹2,50,000</span>
                </div>
              </div>

              {/* Service Years */}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">Years of Continuous Service</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={serviceYears}
                  onChange={(e) => setServiceYears(Math.min(50, Math.max(1, Number(e.target.value))))}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                />
                <span className="text-[10px] text-text-muted block mt-1">
                  * Organizational service requires minimum 5 years continuous tenure to secure eligibility.
                </span>
              </div>

              {/* Employment categorization */}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">Employment Type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value as 'government' | 'private_covered' | 'private_uncovered')}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl font-medium text-primary outline-none text-sm"
                >
                  <option value="private_covered">Company covered under Gratuity Act (Standard)</option>
                  <option value="private_uncovered">Company NOT covered under Gratuity Act</option>
                  <option value="government">Central / State Gov employee</option>
                </select>
              </div>
            </div>
          </div>

          <AdSenseHolder label="Above Results Gratuity Grid" />

          {/* Results Summary banner */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-medium text-text flex items-center gap-1.5">
              <Award className="w-5 h-5 text-accent" /> Gratuity Entitlements
            </h3>

            {results.isEligible ? (
              <div className="space-y-6">
                {/* Total amount */}
                <div className="bg-success/5 p-5 rounded-2xl border border-success/15 text-center font-sans">
                  <span className="text-xs text-success font-semibold uppercase tracking-wider block mb-1">
                    Calculated Gratuity Amount
                  </span>
                  <span className="text-3xl font-extrabold text-primary block">
                    {formatCurrency(results.gratuityAmount)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-center text-xs">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-text-muted block lowercase">Tax-Exempt Portion (Up to ₹20L)</span>
                    <span className="text-base font-semibold text-success block mt-1">{formatCurrency(results.taxExemptPortion)}</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-text-muted block lowercase">Taxable Gratuity Component</span>
                    <span className="text-base font-semibold text-text block mt-1">{formatCurrency(results.taxableGratuity)}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* INELIGIBILITY WARNING */
              <div className="bg-red-50 text-red-800 border-l-4 border-red-500 p-4 rounded-xl flex gap-3 text-xs leading-relaxed font-sans">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900 mb-0.5">Continuous Service Requirement Warning:</p>
                  Your entered tenure ({serviceYears} years) is less than the statutory 5-year requirement (4.5 years with fractional roundoffs). In normal cases, gratuity is only payable upon completing 5 years of contiguous service with a single employer. (Exception exists for tragic cases of employee death or permanent disability during duty terms).
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Sidebar info rules list (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Statutory Formula Block */}
          <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-semibold tracking-tight uppercase">Act of 1972</h3>
            <p className="text-xs text-gray-200 leading-relaxed font-sans">
              The Payment of Gratuity Act of 1972 mandates that companies employing 10 or more people pay gratitude credits to long-term personnel.
            </p>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/5 font-mono text-xs">
              <code>Gratuity = (Basic + DA) × 15/26 × Years of Service</code>
            </div>
            <p className="text-[10px] text-gray-300 leading-relaxed font-sans">
              * The number <strong>26</strong> represents standard monthly working days, and <strong>15</strong> is the half-month wage factor. Years of service above 6 months round up to the next full year.
            </p>
          </div>

          <AdSenseHolder label="Sidebar advertisement block" />

          {/* Related blog posts section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-primary mb-4">Related Knowledge Base</h3>
            <button
                type="button"
                onClick={() => onNavigateToBlog('gratuity-explained')}
                className="w-full text-left group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-accent/10 text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text group-hover:text-accent font-serif-heading line-clamp-2">
                    Gratuity — When Are You Eligible and How Much Will You Get?
                  </h4>
                  <span className="text-[10px] text-text-muted font-sans mt-0.5 block">5 Min Read • Gratuity Explainer</span>
                </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
