import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateGst } from '../../utils/financeUtils';
import AdSenseHolder from '../AdSenseHolder';
import { Calculator, ArrowRight, BookOpen, Percent } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight mb-2">
          GST Calculator India
        </h1>
        <p className="text-text-muted max-w-2xl">
          Instantly add or subtract Goods and Services Tax (GST) allocations from bill amounts with precise SGST and CGST split calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Calculator & Results */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-medium text-text flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" /> GST Transaction Configurator
            </h2>

            <div className="space-y-6">
              {/* Calculation Mode Toggles */}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase">Calculation Mode</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCalculationMode('add')}
                    className={`py-3 rounded-xl border font-semibold text-sm transition text-center ${calculationMode === 'add' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-gray-50 text-text border-gray-200 hover:bg-gray-100'}`}
                  >
                    Add GST to Net Amount
                  </button>
                  <button
                    onClick={() => setCalculationMode('remove')}
                    className={`py-3 rounded-xl border font-semibold text-sm transition text-center ${calculationMode === 'remove' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-gray-50 text-text border-gray-200 hover:bg-gray-100'}`}
                  >
                    Subtract GST (Find Pre-tax Base)
                  </button>
                </div>
              </div>

              {/* Amount input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-text">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(Math.max(1, Number(e.target.value)))}
                    className="w-28 text-right font-medium text-primary border-b border-gray-300 focus:border-accent outline-none px-1"
                  />
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={billAmount}
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-100 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-1 font-sans">
                  <span>₹500</span>
                  <span>₹50,000</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* GST Rate radio options */}
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-3">Select GST Slab Rate</label>
                <div className="flex flex-wrap gap-3">
                  {RATES_OPTIONS.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setGstRate(rate)}
                      className={`flex-1 min-w-[60px] py-2.5 rounded-xl border font-semibold text-xs transition ${gstRate === rate ? 'bg-accent text-white border-accent shadow-sm' : 'bg-gray-55/40 text-text border-gray-200 hover:bg-gray-100'}`}
                    >
                      {rate}% Slab
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <AdSenseHolder label="Above Results GST Breakdown" />

          {/* Results Display */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-medium text-text">GST Tax Splits</h3>
            
            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 text-center font-sans">
              <span className="text-xs text-primary/80 font-semibold tracking-wider uppercase block mb-1">
                {calculationMode === 'add' ? 'Final Amount (Inclusive of GST)' : 'Base Amount (Pre-Tax Price)'}
              </span>
              <span className="text-3xl font-extrabold text-primary block">
                {formatCurrency(calculationMode === 'add' ? results.finalAmount : results.baseAmount)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans text-center">
              <div className="p-4 bg-gray-50/50 rounded-xl">
                <span className="text-[10px] text-text-muted block lowercase">Input Amount</span>
                <span className="text-sm font-semibold text-text block mt-1">{formatCurrency(billAmount)}</span>
              </div>

              <div className="p-4 bg-gray-50/50 rounded-xl border-l-2 border-accent">
                <span className="text-[10px] text-text-muted block lowercase">SGST Portion ({gstRate / 2}%)</span>
                <span className="text-sm font-bold text-accent block mt-1">{formatCurrency(results.sgst)}</span>
              </div>

              <div className="p-4 bg-gray-50/50 rounded-xl border-l-2 border-accent">
                <span className="text-[10px] text-text-muted block lowercase">CGST Portion ({gstRate / 2}%)</span>
                <span className="text-sm font-bold text-accent block mt-1">{formatCurrency(results.cgst)}</span>
              </div>

              <div className="p-4 bg-success/5 rounded-xl border-l-2 border-success">
                <span className="text-[10px] text-success block lowercase">Total GST Paid</span>
                <span className="text-sm font-bold text-success block mt-1">{formatCurrency(results.totalGst)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Sidebar table & information (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick references categories table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="text-base font-semibold text-primary flex items-center gap-1.5 font-serif-heading">
              <BookOpen className="w-5 h-5 text-accent" /> GST Rate Guide (India)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-gray-150">
                <thead>
                  <tr className="text-text-muted font-bold">
                    <th className="pb-2">Rate</th>
                    <th className="pb-2">Standard Commodities Group</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans text-[11px] leading-relaxed">
                  <tr>
                    <td className="py-2.5 font-bold text-primary">0% (Nil)</td>
                    <td className="py-2.5 text-text-muted">Unpackaged grains, salt, milk, health and utility services.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-primary">5% Slab</td>
                    <td className="py-2.5 text-text-muted">Sugar, edible oils, spices, tea leaves, domestic lifesavers.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-primary">12% Slab</td>
                    <td className="py-2.5 text-text-muted">Computers, smart devices, sewing threads, processed butter/cheese.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-primary">18% Slab</td>
                    <td className="py-2.5 text-text-muted">Most commercial services, software, beauty salons, telecom, and clothing.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-primary">28% Slab</td>
                    <td className="py-2.5 text-text-muted">Luxury yachts, sports cars, AC, deep freezers, cigars/high-end goods.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-text-muted italic leading-relaxed">
              * GST allocations are subject to occasional modifications announced during Ministry Council conventions.
            </p>
          </div>

          <AdSenseHolder label="Sidebar advertisement block" />

          {/* Related Articles blog link */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-primary mb-4">Related Knowledge Base</h3>
            <button
                type="button"
                onClick={() => onNavigateToBlog('what-is-gst-india')}
                className="w-full text-left group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-accent/10 text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text group-hover:text-accent font-serif-heading line-clamp-2">
                    GST in India — A Simple Explainer for Common People
                  </h4>
                  <span className="text-[10px] text-text-muted font-sans mt-0.5 block">6 Min Read • Explainer Guide</span>
                </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
