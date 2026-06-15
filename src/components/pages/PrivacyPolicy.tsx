import React from 'react';
import { ShieldCheck, Lock, Eye } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-100 pb-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight font-serif-heading mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-text-muted font-sans">
            Last Updated: June 2026 • Verified for Google AdSense Advisory Guidelines
          </p>
        </div>

        {/* Content blocks */}
        <div className="space-y-6 text-sm text-text-muted leading-relaxed font-sans">
          <div className="flex gap-4">
            <Lock className="w-10 h-10 text-accent shrink-0 p-1 bg-accent/10 rounded-xl" />
            <div>
              <h2 className="text-lg font-bold text-primary font-serif-heading mb-1.5">No Direct Data Harvesting</h2>
              <p>
                At PaisaCalc, accessible from paisacalcforindia.netlify.app, one of our main priorities is the absolute privacy of our visitors. We do NOT harvest, compile, scan, or store your mathematical calculator parameters, payroll digits, rent payouts, tax brackets, or investment projections. Every calculation is executed in real-time within your local web browser context.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-50">
            <Eye className="w-10 h-10 text-accent shrink-0 p-1 bg-accent/10 rounded-xl" />
            <div>
              <h2 className="text-lg font-bold text-primary font-serif-heading mb-1.5">Third-Party Cookies & AdSense Logging</h2>
              <p className="mb-2">
                PaisaCalc partners with third-party advertising vendors like Google AdSense to serve monetised advertisement units. Google, as a third-party vendor, uses cookies (including DoubleClick DART cookies) to serve ads to our site visitors based on their visit to paisacalcforindia.netlify.app and other sites on the internet.
              </p>
              <p>
                Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline">https://policies.google.com/technologies/ads</a>.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50 space-y-4">
            <h2 className="text-lg font-bold text-primary font-serif-heading">Log Files</h2>
            <p>
              PaisaCalc follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-50 space-y-4">
            <h2 className="text-lg font-bold text-primary font-serif-heading">CCPA & GDPR Privacy Rights</h2>
            <p className="mb-2">
              We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs pl-2">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data (we contain none).</li>
              <li><strong>The right to rectification:</strong> You have the right to correct inaccurate or incomplete metrics.</li>
              <li><strong>The right to erasure:</strong> You can request that we delete standard transaction logs.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-55 space-y-4 font-sans text-xs bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold text-primary">Consent Acknowledgement</h3>
            <p>
              By utilizing our financial calculators, blog insights, and webpage pages, you hereby consent to our corporate Privacy Policy and agree to its standard Terms and Conditions.
            </p>
            <p className="mt-2">
              If you hold queries or request clarifications, feel free to contact us via our secure technical webmaster inbox: <a href="mailto:contact@paisacalcforindia.netlify.app" className="underline font-bold text-primary">contact@paisacalcforindia.netlify.app</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
