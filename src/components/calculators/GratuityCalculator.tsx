import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateGratuity } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';

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
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold text-primary tracking-tight mb-2">
          Gratuity Calculator
        </h1>
        <p className="text-text-muted text-base">
          Estimate prospective gratuity payouts under the Payment of Gratuity Act 1972 based on service tenure and last basic payslip values.
        </p>
      </div>

      {/* 1. Inputs Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Configure Employment Details
        </h2>

        <div className="space-y-6">
          {/* Basic + DA Salary monthly */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-primary">Last Drawn Monthly Basic + DA (₹)</label>
              <input
                type="number"
                value={salaryBasicDa}
                onChange={(e) => setSalaryBasicDa(Math.max(1000, Number(e.target.value)))}
                className="w-28 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
              />
            </div>
            <input
              type="range"
              min="5000"
              max="250000"
              step="2500"
              value={salaryBasicDa}
              onChange={(e) => setSalaryBasicDa(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-text-muted mt-1 font-sans">
              <span>₹5,000</span>
              <span>₹1,25,000</span>
              <span>₹2,50,000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Years */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-2 uppercase">Years of Continuous Service</label>
              <input
                type="number"
                min="1"
                max="50"
                value={serviceYears}
                onChange={(e) => setServiceYears(Math.min(50, Math.max(1, Number(e.target.value))))}
                className="w-full bg-slate-50 border border-border focus:border-accent p-2 rounded-lg font-medium text-primary outline-none text-sm"
              />
              <span className="text-[10px] text-text-muted block mt-1">
                * Minimum 5 years of continuous service is required for eligibility.
              </span>
            </div>

            {/* Employment type */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-2 uppercase">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as 'government' | 'private_covered' | 'private_uncovered')}
                className="w-full bg-slate-50 border border-border focus:border-accent p-2.5 rounded-lg font-medium text-primary outline-none text-sm cursor-pointer"
              >
                <option value="private_covered">Covered under Gratuity Act (Standard)</option>
                <option value="private_uncovered">NOT covered under Gratuity Act</option>
                <option value="government">Government Employee</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <AdSenseHolder label="Above Results Gratuity Grid" />

      {/* 2. Results Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Maturity Breakdown
        </h2>

        {results.isEligible ? (
          <div className="space-y-6">
            {/* Total amount */}
            <div className="bg-slate-50 p-5 rounded-lg border border-border text-center font-sans">
              <span className="text-xs text-text-muted font-medium uppercase tracking-wide block mb-1">
                Calculated Gratuity Amount
              </span>
              <span className="text-3xl font-bold text-teal-700 block">
                {formatCurrency(results.gratuityAmount)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-center text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-border">
                <span className="text-text-muted block uppercase">Tax-Exempt Portion (Up to ₹20L)</span>
                <span className="text-base font-semibold text-teal-700 block mt-1">{formatCurrency(results.taxExemptPortion)}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-border">
                <span className="text-text-muted block uppercase">Taxable Gratuity Component</span>
                <span className="text-base font-semibold text-primary block mt-1">{formatCurrency(results.taxableGratuity)}</span>
              </div>
            </div>
          </div>
        ) : (
          /* INELIGIBILITY WARNING */
          <div className="bg-slate-50 border border-border p-4 rounded-lg flex flex-col gap-2 text-xs leading-relaxed font-sans">
            <p className="font-semibold text-primary">Continuous Service Requirement Warning:</p>
            <p className="text-text-muted">
              Your entered tenure ({serviceYears} years) is less than the statutory 5-year requirement. Under normal circumstances, gratuity is only payable upon completing 5 years of continuous service with a single employer. Exception applies only in case of employee death or permanent disability due to accident/illness.
            </p>
          </div>
        )}
      </div>

      {/* 3. Explanation Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6 text-sm font-sans leading-relaxed">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Payment of Gratuity Act 1972 Rules
        </h2>
        <div className="space-y-4 text-text-muted text-xs sm:text-sm">
          <p>
            The Payment of Gratuity Act 1972 is a social security legislation that mandates organizations employing 10 or more personnel to pay a lump-sum gratuity to employees upon retirement, resignation, or termination after a minimum of 5 years of continuous service.
          </p>
          <h3 className="text-base font-semibold text-primary pt-2">Formula for Covered Organizations:</h3>
          <div className="bg-slate-50 rounded-lg p-4 border border-border text-center font-mono text-xs text-primary">
            <code>Gratuity = (Basic Salary + DA) × (15 / 26) × Years of Service</code>
          </div>
          <ul className="space-y-2 text-xs text-text-muted pt-2 leading-relaxed">
            <li>• <strong>Salary components:</strong> Only the Basic Salary and Dearness Allowance (DA) are included. Other allowances like HRA or special allowances are excluded.</li>
            <li>• <strong>Factor 15/26:</strong> Represents 15 days of wages out of 26 working days in a month.</li>
            <li>• <strong>Service Rounding:</strong> If service duration in the final year exceeds 6 months, it is rounded up to the next full year. If it is 6 months or less, it is ignored.</li>
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
            <h3 className="font-semibold text-primary">What is the minimum service period required for gratuity?</h3>
            <p className="text-text-muted leading-relaxed">
              An employee must complete 5 years of continuous service with a single employer to be eligible for gratuity. However, this 5-year requirement is waived in case of the employee's death or disablement during service.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">How is gratuity calculated for employees not covered under the Act?</h3>
            <p className="text-text-muted leading-relaxed">
              For employees not covered under the Gratuity Act, the calculation uses 30 days in a month instead of 26: `Gratuity = (Basic + DA) × (15 / 30) × Years of Service`. The service duration is only counted for fully completed years.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">What is the maximum tax-exempt gratuity limit?</h3>
            <p className="text-text-muted leading-relaxed">
              The maximum tax exemption limit for gratuity received by private-sector employees (covered or uncovered) is ₹20 Lakhs. Gratuity received by central, state, or local government employees is completely tax-exempt.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">Is gratuity paid if an employee resigns?</h3>
            <p className="text-text-muted leading-relaxed">
              Yes, gratuity is payable upon retirement, resignation, superannuation, or termination of employment, provided the employee has completed the statutory 5 years of continuous service with the employer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

