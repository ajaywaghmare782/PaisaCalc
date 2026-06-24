import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-100 pb-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight font-serif-heading mb-2">
            Disclaimers of Liability
          </h1>
          <p className="text-xs text-text-muted font-sans">
            Last Updated: June 2026 • Verified for Google AdSense Advisory Guidelines
          </p>
        </div>

        {/* Content body */}
        <div className="space-y-6 text-sm text-text-muted leading-relaxed font-sans">
          <div className="flex gap-4 p-4 bg-yellow-50 text-yellow-850 rounded-xl border-l-4 border-accent">
            <AlertTriangle className="w-8 h-8 text-accent shrink-0" />
            <div>
              <h2 className="text-base font-bold text-yellow-905 font-serif-heading mb-1 text-yellow-900">Estimation Purposes Only</h2>
              <p className="text-xs text-yellow-900">
                Every calculation computed on PaisaCalc is meant strictly for simulated demonstration and estimation purposes. We do NOT guarantee exact accuracy with bank passbooks, corporate payroll systems, or local Income Tax Department final audits.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-primary font-serif-heading">Not Registered with SEBI</h2>
            <p>
              PaisaCalc is a provider of custom mathematical financial software. We do NOT operate as SEBI-registered stockbrokers, mutual fund research houses, qualified Chartered Accountants, or investment advisers. None of our visual comparison recommendation charts, percentage projections, or blog articles constitute legal or financial investment suggestions.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-50">
            <h2 className="text-lg font-bold text-primary font-serif-heading">Fluctuations & Updates</h2>
            <p>
              Under Indian fiscal frameworks, parameters like PPF rates, Senior Citizen banking premiums, national income tax slabs, and statutory gratuity exemptions fluctuate regularly upon Ministry declarations or Union Budget assemblies. While our developers make daily attempts to update the core constants of our files, some calculations could lag or reflect legacy guidelines. Always cross-verify calculations directly against official RBI, Ministry of Finance, or Income Tax portals prior to executing deposits.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-50 text-xs text-justify">
            <h3 className="font-bold text-primary">No Liability Policy</h3>
            <p>
              PaisaCalc, its webmasters, and developers hold absolute zero liability for financial losses, capital erosion, penalties, or miscalculated tax filings arising from using our calculators, tables, schedules, or textual blog writeups. Users navigate these pages voluntarily and accept standard risks associated with personal fiscal planning.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-50 text-xs">
            For corporate concerns or reports, reach us via: <a href="mailto:contact@mypaisacalc.vercel.app" className="underline font-bold text-primary">contact@mypaisacalc.vercel.app</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
