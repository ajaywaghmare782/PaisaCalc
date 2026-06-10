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

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>(ActiveView.HOME);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');

  // Scroll to top on every view transition to ensure native user experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedPostSlug]);

  // Dynamically load Google AdSense script only after the page is interactive and idle
  useEffect(() => {
    const loadAdSense = () => {
      if (document.querySelector('script[src*="adsbygoogle.js"]')) return;
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4551792521922995';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => setTimeout(loadAdSense, 1000));
    } else {
      setTimeout(loadAdSense, 2000);
    }
  }, []);

  const handleNavigateView = (view: ActiveView) => {
    setCurrentView(view);
  };

  const handleNavigateToBlogPost = (slug: string) => {
    setSelectedPostSlug(slug);
    setCurrentView(ActiveView.BLOG_POST);
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
