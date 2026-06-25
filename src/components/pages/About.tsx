import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';

export default function About() {

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Brand Mission Story */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-10 space-y-6">
        <h1 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight font-serif-heading">
          About PaisaCalc
        </h1>
        <p className="text-base md:text-lg text-text font-serif leading-relaxed">
          "Our mission is simple: to provide high-quality, completely free financial math calculators to every Indian citizen without registration walls, subscriptions, or dark design patterns."
        </p>
        <p className="text-sm text-text-muted leading-relaxed font-sans">
          Managing income tax filing, home loan amortizations, and mutual fund systematic investments is complex enough on its own. We believe that finding correct calculations should not cost any extra fees or trigger pushy sales calls from financial lenders. 
        </p>
        <p className="text-sm text-text-muted leading-relaxed font-sans">
          PaisaCalc was engineered from the ground up to solve calculation friction instantly. No logins are required, meaning you can compute your HRA exemptions, gratuities, or PPF interest balances with complete local privacy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          <div className="flex gap-3 text-sm">
            <ShieldCheck className="w-6 h-6 text-accent shrink-0" />
            <div>
              <h3 className="font-semibold text-primary">Local-First Transactional Privacy</h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed font-sans">
                Every calculation is computed locally in your web browser. We do not store, scan, or sell your credit outlays or payroll digits.
              </p>
            </div>
          </div>

          <div className="flex gap-3 text-sm">
            <MapPin className="w-6 h-6 text-accent shrink-0" />
            <div>
              <h3 className="font-semibold text-primary">Made in India for India</h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed font-sans">
                Engineered with precise compliance guidelines pertaining to the Income Tax Department, the Payment of Gratuity Act, standard bank FDs, post offices, and GST COUNCIL structures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social / SEBI / General Compliance Disclaimer */}
      <section className="bg-yellow-50 text-yellow-800 border-l-4 border-accent rounded-xl p-6 md:p-8 space-y-3 font-sans text-xs leading-relaxed">
        <h3 className="font-bold text-yellow-905 uppercase tracking-wide flex items-center gap-1.5">
          Compliance & Advisory Disclaimer
        </h3>
        <p>
          <strong>SEBI Advisory Note:</strong> PaisaCalc is purely a provider of educational financial mathematical tools. We are NOT registered with the Securities and Exchange Board of India (SEBI) as stock advisors, research analysts, or investment advisors. None of our calculator estimations, comparison recommendations, or blog essays represent structured financial suggestions or sales pitches for mutual fund schemes, pension stocks, or banking deposits.
        </p>
        <p>
          Calculations are computed on approximate benchmark guidelines which may experience change after national fiscal budgets or RBI interest rate declarations. For specific personal tax planning or investment outlays, we highly recommend scheduling direct, paid counseling sessions with a qualified Chartered Accountant (CA) or certified financial planner.
        </p>
        <p>
          For official concerns, you can contact our technical webmasters directly at: <a href="mailto:contact@mypaisacalc.vercel.app" className="underline font-bold">contact@mypaisacalc.vercel.app</a>.
        </p>
      </section>
    </div>
  );
}
