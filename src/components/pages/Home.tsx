import React from 'react';
import { ActiveView } from '../../types';
import { BLOG_POSTS } from '../../data/blogData';
import AdSenseHolder from '../AdSenseHolder';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface HomeProps {
  onNavigateView: (view: ActiveView) => void;
  onNavigateToBlog: (slug: string) => void;
}

export default function Home({ onNavigateView, onNavigateToBlog }: HomeProps) {
  const latestBlogPosts = BLOG_POSTS.slice(0, 3);

  const POPULAR_CALCS = [
    {
      view: ActiveView.SIP_CALC,
      name: "SIP Calculator",
      description: "Estimate mutual fund return compounding with annual step-ups."
    },
    {
      view: ActiveView.EMI_CALC,
      name: "EMI Calculator",
      description: "Plan home, car, or personal loan payouts with amortization tables."
    },
    {
      view: ActiveView.TAX_CALC,
      name: "Income Tax Calculator",
      description: "Compare your tax liabilities under Old vs New budget regimes side-by-side."
    }
  ];

  const CATEGORIES = [
    {
      title: "Investments & Savings",
      description: "Grow your wealth and plan long-term compound savings.",
      tools: [
        { view: ActiveView.SIP_CALC, name: "SIP Calculator" },
        { view: ActiveView.PPF_CALC, name: "PPF Calculator" },
        { view: ActiveView.FD_RD_CALC, name: "FD & RD Calculator" }
      ]
    },
    {
      title: "Taxation & Compliance",
      description: "Compare regimes, evaluate deductions, and plan invoices.",
      tools: [
        { view: ActiveView.TAX_CALC, name: "Income Tax Calculator" },
        { view: ActiveView.HRA_CALC, name: "HRA Exemption Calculator" },
        { view: ActiveView.GST_CALC, name: "GST Calculator" }
      ]
    },
    {
      title: "Loans & Benefits",
      description: "Plan borrowing costs and employment benefits.",
      tools: [
        { view: ActiveView.EMI_CALC, name: "EMI Calculator" },
        { view: ActiveView.GRATUITY_CALC, name: "Gratuity Calculator" }
      ]
    }
  ];

  const FAQS = [
    {
      q: "How accurate are these calculators?",
      a: "All calculations follow official Indian banking standards, interest compounding formulas, and the latest income tax regulations. However, these tools are for informational and estimation purposes only."
    },
    {
      q: "Is my personal financial data secure?",
      a: "Yes, completely. PaisaCalc operates entirely client-side in your browser. None of your inputs, salaries, deposits, or loan values are transmitted to any server or shared with third parties."
    },
    {
      q: "Which tax regime is better: Old or New?",
      a: "It depends on your annual income and total tax-saving deductions (like 80C, 80D, HRA, and home loan interest). You can use our side-by-side Income Tax Calculator to quickly compare both regimes and find the option that minimizes your liability."
    },
    {
      q: "What is an annual Step-Up in a SIP?",
      a: "A Step-Up SIP allows you to automatically increase your monthly contribution by a chosen percentage each year. This aligns your investments with your salary growth and accelerates compounding returns over time."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-border py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-tight">
            Calculate Your Financial Future — Plan Smarter, Save Better
          </h1>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From housing loan EMIs to SIP returns to side-by-side Income Tax brackets — all premium Indian financial calculators in one unified suite.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('categories-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-48 py-3 bg-accent text-white rounded-lg font-semibold text-sm hover:bg-teal-800 transition cursor-pointer text-center justify-center border border-accent"
            >
              Explore Calculators
            </button>
            <button
              onClick={() => onNavigateView(ActiveView.BLOG_LISTING)}
              className="w-48 py-3 bg-white hover:bg-slate-50 text-primary border border-border rounded-lg font-semibold text-sm transition cursor-pointer text-center justify-center"
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

      {/* Popular Calculators Grid */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">Popular Calculators</h2>
          <p className="text-text-muted text-sm font-sans">
            Quickly estimate returns, compare regime brackets, and plan loan borrowing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {POPULAR_CALCS.map((card) => (
            <div
              key={card.view}
              onClick={() => onNavigateView(card.view)}
              className="group bg-white p-6 rounded-xl border border-border hover:border-accent hover:bg-slate-50/30 transition cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary tracking-tight">
                  {card.name}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-accent mt-4">
                Calculate Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator Categories Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-8 pt-4 border-t border-border" id="categories-section">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">Browse All Calculators</h2>
          <p className="text-text-muted text-sm font-sans">
            Choose from our complete list of specialized financial tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-primary">{cat.title}</h3>
                <p className="text-xs text-text-muted font-sans mt-0.5">{cat.description}</p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-border/60">
                {cat.tools.map((tool) => (
                  <li key={tool.view}>
                    <button
                      onClick={() => onNavigateView(tool.view)}
                      className="w-full text-left py-2 px-3 text-sm font-medium rounded-lg text-primary hover:bg-slate-100 hover:text-accent transition flex justify-between items-center"
                    >
                      <span>{tool.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-accent transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-8 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-primary">Latest Financial Insights</h2>
            <p className="text-text-muted text-sm font-sans">Read helpful advice on taxation, personal investments, and mutual funds.</p>
          </div>
          <button
            onClick={() => onNavigateView(ActiveView.BLOG_LISTING)}
            className="text-xs font-semibold text-accent hover:text-teal-800 bg-white border border-border px-4 py-2 rounded-lg hover:border-accent flex items-center gap-1 transition cursor-pointer"
          >
            All Blog Articles <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBlogPosts.map((post) => (
            <div
              key={post.slug}
              onClick={() => onNavigateToBlog(post.slug)}
              className="group bg-white rounded-xl border border-border overflow-hidden flex flex-col justify-between hover:border-accent transition cursor-pointer"
            >
              <div className="p-6 space-y-3">
                <span className="inline-block text-[10px] text-accent uppercase tracking-wider font-bold">
                  {post.category}
                </span>
                <h3 className="text-base font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-text-muted font-sans leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-6 border-t border-border flex justify-between items-center text-[11px] text-text-muted">
                <span>{post.date} • {post.readTime}</span>
                <span className="font-semibold text-accent group-hover:text-teal-800 transition-colors flex items-center gap-0.5">
                  Read Article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="max-w-4xl mx-auto px-4 space-y-8 pt-8 border-t border-border">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-primary flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent" /> Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-sm font-sans max-w-lg mx-auto">
            Find answers to common questions about our calculators and tax planning in India.
          </p>
        </div>

        <div className="space-y-6 pt-4 font-sans">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="space-y-1.5 border-b border-border/40 pb-4">
              <h3 className="text-base font-semibold text-primary">{faq.q}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
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

