/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { ActiveView } from './types';
import { BLOG_POSTS } from './data/blogData';

// Shared Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Static landing page import for instant paint
import Home from './components/pages/Home';

// Lazy loaded page views
const About = lazy(() => import('./components/pages/About'));
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy'));
const Disclaimer = lazy(() => import('./components/pages/Disclaimer'));

// Lazy loaded blog views
const BlogListing = lazy(() => import('./components/blog/BlogListing'));
const BlogPost = lazy(() => import('./components/blog/BlogPost'));

// Lazy loaded calculators
const EmiCalculator = lazy(() => import('./components/calculators/EmiCalculator'));
const SipCalculator = lazy(() => import('./components/calculators/SipCalculator'));
const IncomeTaxCalculator = lazy(() => import('./components/calculators/IncomeTaxCalculator'));
const FdRdCalculator = lazy(() => import('./components/calculators/FdRdCalculator'));
const PpfCalculator = lazy(() => import('./components/calculators/PpfCalculator'));
const HraCalculator = lazy(() => import('./components/calculators/HraCalculator'));
const GstCalculator = lazy(() => import('./components/calculators/GstCalculator'));
const GratuityCalculator = lazy(() => import('./components/calculators/GratuityCalculator'));
const viewToPath = (view: ActiveView, slug?: string): string => {
  switch (view) {
    case ActiveView.HOME:
      return '/';
    case ActiveView.EMI_CALC:
      return '/emi-calculator';
    case ActiveView.SIP_CALC:
      return '/sip-calculator';
    case ActiveView.TAX_CALC:
      return '/income-tax-calculator';
    case ActiveView.FD_RD_CALC:
      return '/fd-rd-calculator';
    case ActiveView.PPF_CALC:
      return '/ppf-calculator';
    case ActiveView.HRA_CALC:
      return '/hra-calculator';
    case ActiveView.GST_CALC:
      return '/gst-calculator';
    case ActiveView.GRATUITY_CALC:
      return '/gratuity-calculator';
    case ActiveView.BLOG_LISTING:
      return '/blog';
    case ActiveView.BLOG_POST:
      return `/blog/${slug || ''}`;
    case ActiveView.ABOUT:
      return '/about';
    case ActiveView.PRIVACY:
      return '/privacy-policy';
    case ActiveView.DISCLAIMER:
      return '/disclaimer';
    default:
      return '/';
  }
};

const pathToView = (path: string): { view: ActiveView; slug: string } => {
  const cleanPath = path.toLowerCase().trim().replace(/\/$/, '');
  if (cleanPath === '' || cleanPath === '/') {
    return { view: ActiveView.HOME, slug: '' };
  }
  if (cleanPath === '/emi-calculator') {
    return { view: ActiveView.EMI_CALC, slug: '' };
  }
  if (cleanPath === '/sip-calculator') {
    return { view: ActiveView.SIP_CALC, slug: '' };
  }
  if (cleanPath === '/income-tax-calculator') {
    return { view: ActiveView.TAX_CALC, slug: '' };
  }
  if (cleanPath === '/fd-rd-calculator') {
    return { view: ActiveView.FD_RD_CALC, slug: '' };
  }
  if (cleanPath === '/ppf-calculator') {
    return { view: ActiveView.PPF_CALC, slug: '' };
  }
  if (cleanPath === '/hra-calculator') {
    return { view: ActiveView.HRA_CALC, slug: '' };
  }
  if (cleanPath === '/gst-calculator') {
    return { view: ActiveView.GST_CALC, slug: '' };
  }
  if (cleanPath === '/gratuity-calculator') {
    return { view: ActiveView.GRATUITY_CALC, slug: '' };
  }
  if (cleanPath === '/blog') {
    return { view: ActiveView.BLOG_LISTING, slug: '' };
  }
  if (cleanPath.startsWith('/blog/')) {
    const slug = path.substring(6);
    return { view: ActiveView.BLOG_POST, slug };
  }
  if (cleanPath === '/about') {
    return { view: ActiveView.ABOUT, slug: '' };
  }
  if (cleanPath === '/privacy-policy') {
    return { view: ActiveView.PRIVACY, slug: '' };
  }
  if (cleanPath === '/disclaimer') {
    return { view: ActiveView.DISCLAIMER, slug: '' };
  }
  return { view: ActiveView.HOME, slug: '' };
};

interface PageMetadata {
  title: string;
  description: string;
}

const getPageMetadata = (view: ActiveView, selectedPostSlug?: string): PageMetadata => {
  switch (view) {
    case ActiveView.HOME:
      return {
        title: "PaisaCalc — India's Free Personal Finance Calculators Suite",
        description: "Calculate EMIs, SIP yields with step-ups, side-by-side Old & New Income Tax, FD/RD compoundings, PPFs, HRAs, GSTs, and gratuity payouts completely free."
      };
    case ActiveView.EMI_CALC:
      return {
        title: "EMI Calculator — PaisaCalc",
        description: "Calculate loan EMIs, total interest outgo, and view a detailed monthly amortization schedule with our free EMI calculator."
      };
    case ActiveView.SIP_CALC:
      return {
        title: "SIP Calculator — PaisaCalc",
        description: "Estimate your mutual fund returns and wealth growth using systematic investment plans (SIP) with our free SIP calculator."
      };
    case ActiveView.TAX_CALC:
      return {
        title: "Income Tax Calculator (Old vs New) — PaisaCalc",
        description: "Compare tax liability under the Old and New tax regimes for FY 2025-26 side-by-side and find your ideal tax saving options."
      };
    case ActiveView.FD_RD_CALC:
      return {
        title: "FD & RD Calculator — PaisaCalc",
        description: "Calculate compounding interest and maturity amounts for Fixed Deposits (FD) and Recurring Deposits (RD) instantly."
      };
    case ActiveView.PPF_CALC:
      return {
        title: "PPF Calculator — PaisaCalc",
        description: "Estimate long-term retirement corpus, interest earned, and maturity amount of your Public Provident Fund (PPF) account."
      };
    case ActiveView.HRA_CALC:
      return {
        title: "HRA Exemption Calculator — PaisaCalc",
        description: "Calculate your house rent allowance (HRA) tax exemption under Section 10(13A) and save on income tax."
      };
    case ActiveView.GST_CALC:
      return {
        title: "GST Calculator — PaisaCalc",
        description: "Add or remove Goods and Services Tax (GST) from transaction amounts instantly using standard slab rates."
      };
    case ActiveView.GRATUITY_CALC:
      return {
        title: "Gratuity Calculator — PaisaCalc",
        description: "Calculate corporate gratuity payouts under the Payment of Gratuity Act 1972 based on service years and salary."
      };
    case ActiveView.BLOG_LISTING:
      return {
        title: "Financial Insights Blog — PaisaCalc",
        description: "Read expert financial advice, calculators guides, and smart tax planning strategies on PaisaCalc."
      };
    case ActiveView.BLOG_POST: {
      const post = BLOG_POSTS.find((p) => p.slug === selectedPostSlug);
      return {
        title: post ? `${post.title} — PaisaCalc` : "Financial Insights Blog — PaisaCalc",
        description: post ? post.excerpt : "Read expert financial advice, calculators guides, and smart tax planning strategies on PaisaCalc."
      };
    }
    case ActiveView.ABOUT:
      return {
        title: "About Us & Contact — PaisaCalc",
        description: "Learn about PaisaCalc, our mission to simplify personal finance math for Indian taxpayers, and get in touch."
      };
    case ActiveView.PRIVACY:
      return {
        title: "Privacy Policy — PaisaCalc",
        description: "Read our commitment to user privacy, absolute offline calculation security, and local data protection policies."
      };
    case ActiveView.DISCLAIMER:
      return {
        title: "Disclaimers & Limits — PaisaCalc",
        description: "View the standard terms, limitations of liability, and general financial advisory disclaimers for PaisaCalc."
      };
    default:
      return {
        title: "PaisaCalc — India's Free Personal Finance Calculators Suite",
        description: "Calculate EMIs, SIP yields with step-ups, side-by-side Old & New Income Tax, FD/RD compoundings, PPFs, HRAs, GSTs, and gratuity payouts completely free."
      };
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>(ActiveView.HOME);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');

  // 1. Initial URL synchronization & browser history popstate handling
  useEffect(() => {
    const { view, slug } = pathToView(window.location.pathname);
    
    // Redirect invalid/non-matching paths to the resolved path
    const expectedPath = viewToPath(view, slug);
    if (window.location.pathname !== expectedPath) {
      window.history.replaceState({}, '', expectedPath);
    }

    setCurrentView(view);
    setSelectedPostSlug(slug);

    const handlePopState = () => {
      const current = pathToView(window.location.pathname);
      setCurrentView(current.view);
      setSelectedPostSlug(current.slug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 2. Synchronize SEO Meta Tags dynamically with currentView and selectedPostSlug
  useEffect(() => {
    const path = viewToPath(currentView, selectedPostSlug);
    const { title, description } = getPageMetadata(currentView, selectedPostSlug);
    const canonicalUrl = `https://paisacalc.in${path}`;

    // Update document title
    document.title = title;

    // Update or create canonical tag
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonicalUrl);
    } else {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      canonicalEl.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalEl);
    }

    // Helper to update/create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Update SEO meta descriptions
    updateMeta('description', description);

    // Update Open Graph tags
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonicalUrl, true);
  }, [currentView, selectedPostSlug]);

  // Scroll to top on every view transition to ensure native user experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedPostSlug]);

  // Dynamically load Google AdSense script on the first user interaction to maximize initial performance
  useEffect(() => {
    let scriptLoaded = false;

    const loadAdSense = () => {
      if (scriptLoaded) return;
      if (document.querySelector('script[src*="adsbygoogle.js"]')) {
        scriptLoaded = true;
        return;
      }
      
      scriptLoaded = true;
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4551792521922995';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      // Clean up event listeners
      cleanupListeners();
    };

    const interactionEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    const cleanupListeners = () => {
      interactionEvents.forEach(event => {
        window.removeEventListener(event, loadAdSense);
      });
    };

    // Listen for any of these user interaction events
    interactionEvents.forEach(event => {
      window.addEventListener(event, loadAdSense, { passive: true });
    });

    return () => {
      cleanupListeners();
    };
  }, []);

  const handleNavigateView = (view: ActiveView) => {
    setCurrentView(view);
    const path = viewToPath(view);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  const handleNavigateToBlogPost = (slug: string) => {
    setSelectedPostSlug(slug);
    setCurrentView(ActiveView.BLOG_POST);
    const path = viewToPath(ActiveView.BLOG_POST, slug);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  // Find the selected blog post details based on slug
  const activeBlogPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.slug === selectedPostSlug) || BLOG_POSTS[0];
  }, [selectedPostSlug]);

  // View Router Switch Board
  const renderContentView = () => {
    switch (currentView) {
      case ActiveView.HOME:
        return (
          <Home 
            onNavigateView={handleNavigateView} 
            onNavigateToBlog={handleNavigateToBlogPost} 
          />
        );
      case ActiveView.ABOUT:
        return <About />;
      case ActiveView.PRIVACY:
        return <PrivacyPolicy />;
      case ActiveView.DISCLAIMER:
        return <Disclaimer />;
      
      // Blog Flows
      case ActiveView.BLOG_LISTING:
        return <BlogListing onNavigateToPost={handleNavigateToBlogPost} />;
      case ActiveView.BLOG_POST:
        return (
          <BlogPost 
            post={activeBlogPost} 
            onBack={() => setCurrentView(ActiveView.BLOG_LISTING)} 
            onNavigateView={handleNavigateView}
            onNavigateToPost={handleNavigateToBlogPost}
          />
        );

      // Calculators Flows
      case ActiveView.EMI_CALC:
        return <EmiCalculator onNavigateToBlog={handleNavigateToBlogPost} />;
      case ActiveView.SIP_CALC:
        return <SipCalculator onNavigateToBlog={handleNavigateToBlogPost} />;
      case ActiveView.TAX_CALC:
        return <IncomeTaxCalculator onNavigateToBlog={handleNavigateToBlogPost} />;
      case ActiveView.FD_RD_CALC:
        return <FdRdCalculator onNavigateToBlog={handleNavigateToBlogPost} />;
      case ActiveView.PPF_CALC:
        return <PpfCalculator onNavigateToBlog={handleNavigateToBlogPost} />;
      case ActiveView.HRA_CALC:
        return <HraCalculator onNavigateToBlog={handleNavigateToBlogPost} />;
      case ActiveView.GST_CALC:
        return <GstCalculator onNavigateToBlog={handleNavigateToBlogPost} />;
      case ActiveView.GRATUITY_CALC:
        return <GratuityCalculator onNavigateToBlog={handleNavigateToBlogPost} />;
      
      default:
        return <Home onNavigateView={handleNavigateView} onNavigateToBlog={handleNavigateToBlogPost} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-bg text-text">
      {/* Global Navigation Header */}
      <Navbar currentView={currentView} onNavigate={handleNavigateView} />

      {/* Main Container with smooth entry and route transition animations */}
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]" aria-busy="true" aria-live="polite">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <div
            key={currentView + (currentView === ActiveView.BLOG_POST ? selectedPostSlug : '')}
            className="w-full animate-pageEnter"
          >
            {renderContentView()}
          </div>
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigateView} />
    </div>
  );
}
