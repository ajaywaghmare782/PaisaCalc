/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { ActiveView } from './types';
import { BLOG_POSTS } from './data/blogData';
import { motion } from 'motion/react';

// Shared Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Views
import Home from './components/pages/Home';
import About from './components/pages/About';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Disclaimer from './components/pages/Disclaimer';

// Blog Views
import BlogListing from './components/blog/BlogListing';
import BlogPost from './components/blog/BlogPost';

// Calculator Views
import EmiCalculator from './components/calculators/EmiCalculator';
import SipCalculator from './components/calculators/SipCalculator';
import IncomeTaxCalculator from './components/calculators/IncomeTaxCalculator';
import FdRdCalculator from './components/calculators/FdRdCalculator';
import PpfCalculator from './components/calculators/PpfCalculator';
import HraCalculator from './components/calculators/HraCalculator';
import GstCalculator from './components/calculators/GstCalculator';
import GratuityCalculator from './components/calculators/GratuityCalculator';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>(ActiveView.HOME);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');

  // Scroll to top on every view transition to ensure native user experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedPostSlug]);

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
        <motion.div
          key={currentView + (currentView === ActiveView.BLOG_POST ? selectedPostSlug : '')}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="w-full"
        >
          {renderContentView()}
        </motion.div>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigateView} />
    </div>
  );
}
