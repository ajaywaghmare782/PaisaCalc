import React from 'react';
import { ActiveView } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (view: ActiveView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const QUICK_LINKS = [
    { view: ActiveView.HOME, label: "Home" },
    { view: ActiveView.BLOG_LISTING, label: "Blog" },
    { view: ActiveView.ABOUT, label: "About" },
    { view: ActiveView.CONTACT, label: "Contact Us" },
    { view: ActiveView.PRIVACY, label: "Privacy Policy" },
    { view: ActiveView.DISCLAIMER, label: "Disclaimer" }
  ];

  const CALCS_COLS = [
    { view: ActiveView.EMI_CALC, label: "EMI Calculator" },
    { view: ActiveView.SIP_CALC, label: "SIP Calculator" },
    { view: ActiveView.TAX_CALC, label: "Income Tax Calculator" },
    { view: ActiveView.FD_RD_CALC, label: "FD & RD Calculator" },
    { view: ActiveView.PPF_CALC, label: "PPF Calculator" },
    { view: ActiveView.HRA_CALC, label: "HRA Calculator" },
    { view: ActiveView.GST_CALC, label: "GST Calculator" },
    { view: ActiveView.GRATUITY_CALC, label: "Gratuity Calculator" }
  ];

  return (
    <footer className="bg-slate-50 text-text-muted pt-16 pb-12 mt-16 border-t border-border font-sans">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <button
            onClick={() => handleNavClick(ActiveView.HOME)}
            className="text-xl font-bold text-primary tracking-tight flex items-center gap-1 cursor-pointer"
          >
            <span className="font-semibold">Paisa</span>
            <span className="text-text-muted font-normal">Calc</span>
          </button>
          <p className="text-xs text-text-muted leading-relaxed">
            India's Free Financial Calculator Suite — Plan smarter, accumulate wealth, compare income tax regimes, and evaluate loans with absolute local privacy.
          </p>
          <span className="block text-[10px] text-text-muted font-mono">
            Version 2.5.0 • June 2026
          </span>
        </div>

        {/* Navigation Portals Column */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-primary tracking-wider uppercase">Navigation</h4>
          <ul className="space-y-2 text-xs">
            {QUICK_LINKS.map((link) => (
              <li key={link.view}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.view)}
                  className="hover:text-accent transition duration-150 cursor-pointer text-left font-medium"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Calculations Column */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-semibold text-primary tracking-wider uppercase">Calculators</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {CALCS_COLS.map((calc) => (
              <div key={calc.view}>
                <button
                  type="button"
                  onClick={() => handleNavClick(calc.view)}
                  className="hover:text-accent transition duration-150 cursor-pointer text-left font-medium"
                >
                  {calc.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advisory Warning & Statutory Copyright */}
      <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-border text-center space-y-4">
        <p className="text-[10px] leading-relaxed max-w-4xl mx-auto text-text-muted">
          Disclaimer: PaisaCalc provides calculations for informational and demonstration purposes only. We are not a SEBI registered entity, Chartered Accountants, or investment brokers. Please seek counsel from a certified CA prior to executing files or tax forms.
        </p>
        <p className="text-xs text-text-muted font-medium">
          © 2025 - 2026 PaisaCalc. All rights reserved. Made for Indian taxpayers and savers.
        </p>
      </div>
    </footer>
  );
}

