import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateGst } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';

interface GstCalculatorProps {
  onNavigateToBlog: (slug: string) => void;
}

export default function GstCalculator({ onNavigateToBlog }: GstCalculatorProps) {
  // Inputs
  const [billAmount, setBillAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18); // standard: 0, 5, 12, 18, 28
  const [calculationMode, setCalculationMode] = useState<'add' | 'remove'>('add');

  // Compute GST details
  const results = useMemo(() => {
    return calculateGst(billAmount, gstRate, calculationMode);
  }, [billAmount, gstRate, calculationMode]);

  const RATES_OPTIONS = [0, 5, 12, 18, 28];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold text-primary tracking-tight mb-2">
          GST Calculator
        </h1>
        <p className="text-text-muted text-base">
          Add or subtract Goods and Services Tax (GST) and view CGST and SGST splits.
        </p>
      </div>

      {/* 1. Inputs Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          GST Transaction Parameters
        </h2>

        <div className="space-y-6">
          {/* Calculation Mode */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-2 uppercase">Calculation Mode</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setCalculationMode('add')}
                className={`py-2 rounded-lg border font-semibold text-xs transition cursor-pointer text-center ${calculationMode === 'add' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-slate-50 text-primary border-border hover:bg-slate-100'}`}
              >
                Add GST to Net Amount
              </button>
              <button
                type="button"
                onClick={() => setCalculationMode('remove')}
                className={`py-2 rounded-lg border font-semibold text-xs transition cursor-pointer text-center ${calculationMode === 'remove' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-slate-50 text-primary border-border hover:bg-slate-100'}`}
              >
                Subtract GST (Find Pre-tax Base)
              </button>
            </div>
          </div>

          {/* Amount input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-primary">
                Amount (₹)
              </label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(Math.max(1, Number(e.target.value)))}
                className="w-28 text-right font-medium text-primary border-b border-border focus:border-accent outline-none px-1 py-0.5"
              />
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted mt-1 font-sans">
              <span>₹500</span>
              <span>₹50,000</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          {/* GST Rate slab options */}
          <div>
            <label className="block text-xs font-semibold text-primary uppercase mb-3">Select GST Slab Rate</label>
            <div className="flex flex-wrap gap-3">
              {RATES_OPTIONS.map((rate) => (
                <button
                  type="button"
                  key={rate}
                  onClick={() => setGstRate(rate)}
                  className={`flex-1 min-w-[60px] py-2 rounded-lg border font-semibold text-xs transition cursor-pointer ${gstRate === rate ? 'bg-accent text-white border-accent shadow-sm' : 'bg-slate-50 text-primary border-border hover:bg-slate-100'}`}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdSenseHolder label="Above Results GST Breakdown" />

      {/* 2. Results Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          Tax Splits & Final Cost
        </h2>
        
        <div className="bg-slate-50 p-5 rounded-lg border border-border text-center font-sans">
          <span className="text-xs text-text-muted font-medium tracking-wide uppercase block mb-1">
            {calculationMode === 'add' ? 'Final Amount (Inclusive of GST)' : 'Base Amount (Pre-Tax Price)'}
          </span>
          <span className="text-3xl font-bold text-teal-700 block">
            {formatCurrency(calculationMode === 'add' ? results.finalAmount : results.baseAmount)}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans text-center">
          <div className="p-4 bg-slate-50 rounded-lg border border-border">
            <span className="text-[10px] text-text-muted block uppercase">Input Amount</span>
            <span className="text-sm font-semibold text-primary block mt-1">{formatCurrency(billAmount)}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-border">
            <span className="text-[10px] text-text-muted block uppercase">SGST ({gstRate / 2}%)</span>
            <span className="text-sm font-semibold text-primary block mt-1">{formatCurrency(results.sgst)}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-border">
            <span className="text-[10px] text-text-muted block uppercase">CGST ({gstRate / 2}%)</span>
            <span className="text-sm font-semibold text-primary block mt-1">{formatCurrency(results.cgst)}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-border">
            <span className="text-[10px] text-text-muted block uppercase">Total GST</span>
            <span className="text-sm font-bold text-teal-700 block mt-1">{formatCurrency(results.totalGst)}</span>
          </div>
        </div>
      </div>

      {/* 3. Explanation Section */}
      <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-6 text-sm font-sans leading-relaxed">
        <h2 className="text-lg font-semibold text-primary border-b border-border pb-3">
          GST Rate Slab Guide (India)
        </h2>
        <div className="space-y-4 text-text-muted text-xs sm:text-sm">
          <p>
            Goods and Services Tax (GST) is an indirect tax levied on the supply of goods and services. Commodities are structured under five major tax rates:
          </p>
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
                  <th className="py-2.5 px-3 font-semibold text-primary w-24">Rate Slab</th>
                  <th className="py-2.5 px-3 font-semibold text-primary">Standard Commodities & Services</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-medium text-primary">0% (Nil)</td>
                  <td className="py-2.5 px-3">Essential food items, salt, grains, milk, fresh vegetables, newspapers.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-medium text-primary">5% Slab</td>
                  <td className="py-2.5 px-3">Sugar, spices, tea, coffee, edible coal, basic medicines.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-medium text-primary">12% Slab</td>
                  <td className="py-2.5 px-3">Processed food, computer hardware, diagnostic kits, mobile phones.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-medium text-primary">18% Slab</td>
                  <td className="py-2.5 px-3">Software services, telecom, financial services, movie tickets, apparel.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-medium text-primary">28% Slab</td>
                  <td className="py-2.5 px-3">Luxury cars, yachts, air conditioners, tobacco products, high-end consumer goods.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-text-muted mt-2 italic leading-relaxed">
            * Note: GST rates are decided by the GST Council and are subject to periodic revisions.
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
            <h3 className="font-semibold text-primary">What are CGST and SGST splits?</h3>
            <p className="text-text-muted leading-relaxed">
              For intra-state transactions (within the same state), GST is split equally between the Central Government (CGST - Central GST) and the State Government (SGST - State GST). For example, an 18% slab is split into 9% CGST and 9% SGST.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">How is GST mathematically calculated?</h3>
            <p className="text-text-muted leading-relaxed">
              To add GST: `GST Amount = (Base Price * GST%) / 100`.
              To remove GST (inclusive prices): `Pre-tax Base Price = Price / (1 + (GST% / 100))`, and `GST Amount = Price - Pre-tax Base Price`.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">What is the difference between GST inclusive and exclusive?</h3>
            <p className="text-text-muted leading-relaxed">
              GST Inclusive price means the final price of the product or service already includes the tax amount. GST Exclusive price means the GST amount will be added on top of the base price during billing.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-primary">Who is eligible to register for GST in India?</h3>
            <p className="text-text-muted leading-relaxed">
              Businesses dealing in goods with annual turnover exceeding ₹40 lakhs (₹20 lakhs for North-Eastern states) and service providers exceeding ₹20 lakhs (₹10 lakhs for North-Eastern states) are required to register for GST.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
