import React, { useState } from 'react';
import { ActiveView } from '../types';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState<boolean>(false);

  const handleNavClick = (view: ActiveView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setCalcDropdownOpen(false);
  };

  const CALCULATORS_LIST = [
    { view: ActiveView.EMI_CALC, label: "EMI Calculator" },
    { view: ActiveView.SIP_CALC, label: "SIP Calculator" },
    { view: ActiveView.TAX_CALC, label: "Income Tax Calculator" },
    { view: ActiveView.FD_RD_CALC, label: "FD & RD Calculator" },
    { view: ActiveView.PPF_CALC, label: "PPF Calculator" },
    { view: ActiveView.HRA_CALC, label: "HRA Exemption Calculator" },
    { view: ActiveView.GST_CALC, label: "GST Calculator" },
    { view: ActiveView.GRATUITY_CALC, label: "Gratuity Calculator" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between font-sans relative">
        
        {/* LOGO */}
        <button
          onClick={() => handleNavClick(ActiveView.HOME)}
          className="text-xl font-bold tracking-tight inline-flex items-center gap-1 cursor-pointer select-none"
        >
          <span className="text-primary font-semibold">Paisa</span>
          <span className="text-text-muted font-normal">Calc</span>
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick(ActiveView.HOME)}
            className={`text-sm font-medium transition cursor-pointer hover:text-accent ${currentView === ActiveView.HOME ? 'text-accent font-semibold' : 'text-primary'}`}
          >
            Home
          </button>

          {/* Calculators Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => setCalcDropdownOpen(!calcDropdownOpen)}
              onMouseEnter={() => setCalcDropdownOpen(true)}
              className="text-sm font-medium text-primary hover:text-accent inline-flex items-center gap-1 cursor-pointer py-2"
            >
              Calculators <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${calcDropdownOpen ? 'rotate-185' : 'rotate-0'}`} />
            </button>

            {calcDropdownOpen && (
              <div
                onMouseLeave={() => setCalcDropdownOpen(false)}
                className="absolute left-0 mt-1 w-56 bg-white border border-border rounded-lg shadow-sm p-2 space-y-1 animate-fadeIn"
              >
                {CALCULATORS_LIST.map((calc) => (
                  <button
                    key={calc.view}
                    onClick={() => handleNavClick(calc.view)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md hover:bg-gray-50 hover:text-accent transition ${currentView === calc.view ? 'bg-gray-50 text-accent font-semibold' : 'text-primary'}`}
                  >
                    {calc.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick(ActiveView.BLOG_LISTING)}
            className={`text-sm font-medium transition cursor-pointer hover:text-accent ${currentView === ActiveView.BLOG_LISTING || currentView === ActiveView.BLOG_POST ? 'text-accent font-semibold' : 'text-primary'}`}
          >
            Blog
          </button>

          <button
            onClick={() => handleNavClick(ActiveView.ABOUT)}
            className={`text-sm font-medium transition cursor-pointer hover:text-accent ${currentView === ActiveView.ABOUT ? 'text-accent font-semibold' : 'text-primary'}`}
          >
            About
          </button>
        </div>

        {/* Removed CTA button to keep design clean */}
        <div className="hidden md:block w-1"></div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-primary hover:text-accent focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* MOBILE DRAWER LAYOUT */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border absolute w-full left-0 p-4 space-y-4 shadow-sm animate-fadeIn z-40">
          <div className="flex flex-col gap-3.5">
            <button
              onClick={() => handleNavClick(ActiveView.HOME)}
              className="text-left font-semibold text-primary hover:text-accent text-sm"
            >
              Home
            </button>

            {/* Calculators collapsible panel */}
            <div className="space-y-2 border-t border-border pt-2.5">
              <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">All Calculators:</span>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {CALCULATORS_LIST.map((calc) => (
                  <button
                    key={calc.view}
                    onClick={() => handleNavClick(calc.view)}
                    className="text-left text-xs text-primary hover:text-accent py-1 font-medium"
                  >
                    {calc.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick(ActiveView.BLOG_LISTING)}
              className="text-left font-semibold text-primary hover:text-accent text-sm border-t border-border pt-2.5"
            >
              Blog
            </button>

            <button
              onClick={() => handleNavClick(ActiveView.ABOUT)}
              className="text-left font-semibold text-primary hover:text-accent text-sm border-t border-border pt-2.5"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

