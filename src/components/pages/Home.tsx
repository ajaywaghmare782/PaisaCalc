import React from 'react';
import { ActiveView } from '../../types';
import { BLOG_POSTS } from '../../data/blogData';
import AdSenseHolder from '../AdSenseHolder';
import { 
  Calculator, 
  TrendingUp, 
  Landmark, 
  FileText, 
  Home as HomeIcon, 
  Percent, 
  Award, 
  Activity,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface HomeProps {
  onNavigateView: (view: ActiveView) => void;
  onNavigateToBlog: (slug: string) => void;
}

export default function Home({ onNavigateView, onNavigateToBlog }: HomeProps) {
  // Get latest 3 blog posts
  const latestBlogPosts = BLOG_POSTS.slice(0, 3);

  const CARDS = [
    {
      view: ActiveView.EMI_CALC,
      name: "EMI Calculator",
      description: "Plan payouts for Home, Car, or Personal Loans with custom schedules.",
      icon: <Calculator className="w-6 h-6 text-accent" />
    },
    {
      view: ActiveView.SIP_CALC,
      name: "SIP Calculator",
      description: "Estimate Mutual Fund savings and wealth compounded with annual Step-Up options.",
      icon: <TrendingUp className="w-6 h-6 text-accent" />
    },
    {
      view: ActiveView.TAX_CALC,
      name: "Income Tax Calculator",
      description: "Compare Old vs New tax regime brackets side-by-side easily.",
      icon: <FileText className="w-6 h-6 text-accent" />
    },
    {
      view: ActiveView.FD_RD_CALC,
      name: "FD & RD Calculator",
      description: "Compare Fixed Deposit (FD) and Recurring Deposit (RD) compound earnings.",
      icon: <Landmark className="w-6 h-6 text-accent" />
    },
    {
      view: ActiveView.PPF_CALC,
      name: "PPF Calculator",
      description: "Estimate risk-free long term Public Provident Scheme retirement balances.",
      icon: <Activity className="w-6 h-6 text-accent" />
    },
    {
      view: ActiveView.HRA_CALC,
      name: "HRA Calculator",
      description: "Check HRA tax exemption components in seconds under Section 10(13A).",
      icon: <HomeIcon className="w-6 h-6 text-accent" />
    },
    {
      view: ActiveView.GST_CALC,
      name: "GST Calculator",
      description: "Add or subtract standard Indian GST rates from invoices instantly.",
      icon: <Percent className="w-6 h-6 text-accent" />
    },
    {
      view: ActiveView.GRATUITY_CALC,
      name: "Gratuity Calculator",
      description: "Calculate continuous service gratitude payouts under Payment of Gratuity Act.",
      icon: <Award className="w-6 h-6 text-accent" />
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
        {/* Rupee watermark pattern background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none flex items-center justify-center text-[20rem] font-bold font-mono">
          ₹
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center space-y-6">
          <span className="inline-block bg-accent text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-sans">
            100% Free • No Signups • Safe & Secure
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight font-serif-heading max-w-4xl mx-auto leading-tight md:leading-none">
            Calculate Your Financial Future — Plan Smarter, Save Better
          </h1>
          <p className="text-gray-200 text-base md:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
            From housing loan EMIs to SIP returns to side-by-side Income Tax brackets — all premium Indian financial calculators in one unified suite.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('calculators-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-accent text-primary rounded-xl font-bold text-sm hover:bg-yellow-500 shadow-lg shadow-accent/20 transition-all cursor-pointer"
            >
              Explore Calculators
            </button>
            <button
              onClick={() => onNavigateView(ActiveView.BLOG_LISTING)}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold text-sm transition cursor-pointer border border-white/10"
            >
              Read Financial Blog
            </button>
          </div>
        </div>
      </section>

      {/* Ad slot below hero */}
      <div className="max-w-6xl mx-auto px-4">
        <AdSenseHolder label="Above the Fold Banner Advertisement" />
      </div>

      {/* Calculator Grid Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-6" id="calculators-grid">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-primary">All Free Calculators</h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto font-sans">
            Select an option below to perform seamless financial calculations with precise Indian standard rules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-4">
          {CARDS.map((card) => (
            <div
              key={card.view}
              onClick={() => onNavigateView(card.view)}
              className="group bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md hover:border-accent transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-4">
                <div className="bg-primary/5 p-3 rounded-xl w-fit group-hover:bg-accent/15 transition-colors">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary tracking-tight font-serif-heading">
                    {card.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-accent transition-colors mt-4">
                Calculate Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why PaisaCalc Section */}
      <section className="bg-gray-50 border-y border-gray-150 py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-primary">Why Use PaisaCalc?</h2>
            <p className="text-text-muted text-sm max-w-lg mx-auto">
              Built purposefully for Indian salaried workforce, family households, and retail investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4">
              <CheckCircle className="w-8 h-8 text-success shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-primary font-serif-heading">100% Free Suite</h3>
                <p className="text-xs text-text-muted leading-relaxed font-sans mt-1">
                  Access every calculation feature, amortisation sheet, and step-up simulator completely free of cost. No subscription models or trial limits.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4">
              <CheckCircle className="w-8 h-8 text-success shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-primary font-serif-heading">No Signups or Logins</h3>
                <p className="text-xs text-text-muted leading-relaxed font-sans mt-1">
                  We value your transactional privacy. Perform precise calculations without having to enter emails, passwords, PAN numbers, or keys.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4">
              <CheckCircle className="w-8 h-8 text-success shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-primary font-serif-heading">Made Specifically for India</h3>
                <p className="text-xs text-text-muted leading-relaxed font-sans mt-1">
                  Compliant with current Union Budgets, post office rules, HRA urban metro listings, and Payment of Gratuity Act parameters, with Indian crore numbering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-primary">Latest Financial Insights</h2>
            <p className="text-text-muted text-xs font-sans">Read helpful advice on taxation, personal investments, and mutual funds.</p>
          </div>
          <button
            onClick={() => onNavigateView(ActiveView.BLOG_LISTING)}
            className="text-xs font-bold text-primary hover:text-accent bg-white border border-gray-200 px-4 py-2 rounded-xl hover:border-accent flex items-center gap-1 transition cursor-pointer"
          >
            All Blog Articles <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBlogPosts.map((post) => (
            <div
              key={post.slug}
              onClick={() => onNavigateToBlog(post.slug)}
              className="group bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="p-6 space-y-3">
                <span className="inline-block bg-primary/5 text-primary text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-primary font-serif-heading group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-text-muted font-sans leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-6 border-t border-gray-50 flex justify-between items-center text-[11px] text-text-muted">
                <span>{post.date} • {post.readTime}</span>
                <span className="font-semibold text-primary group-hover:text-accent transition-colors flex items-center gap-0.5">
                  Read Article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad slot above footer */}
      <div className="max-w-6xl mx-auto px-4 pb-4">
        <AdSenseHolder label="Above Footer Banner Advertisement" />
      </div>
    </div>
  );
}
