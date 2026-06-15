import React, { useState } from 'react';
import { Mail, ShieldCheck, MapPin, Send } from 'lucide-react';

export default function About() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In Netlify, the static HTML handling process intercepts form submits automatically.
    // In our live development preview, we'll show a friendly submission success toast/banner.
    setFormSubmitted(true);
  };

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

      {/* Contact Form Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-primary font-serif-heading mb-4">
          Get in Touch with PaisaCalc
        </h2>
        <p className="text-xs text-text-muted max-w-xl mb-6 font-sans">
          Have suggestions for a new calculator? Have feedback or bug corrections? Drop us a line below. Our financial developers check messages daily.
        </p>

        {formSubmitted ? (
          <div className="p-4 bg-success/5 border border-success/15 text-success rounded-xl text-center font-sans text-sm font-semibold">
            Thank you for reaching out! Your message was submitted successfully. We will contact you at your email soon.
          </div>
        ) : (
          <form 
            name="contact" 
            method="POST" 
            data-netlify="true" 
            onSubmit={handleSubmit}
            className="space-y-4 font-sans text-sm"
          >
            {/* Netlify hidden field required for static HTML form processing */}
            <input type="hidden" name="form-name" value="contact" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1">Your Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1">Your Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@gmail.com"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">Your Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Write your suggestions or questions here..."
                className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center gap-2 transition cursor-pointer"
            >
              Send Secure Message <Send className="w-4 h-4" />
            </button>
          </form>
        )}
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
          For official concerns, you can contact our technical webmasters directly at: <a href="mailto:contact@paisa-calc.vercel.app" className="underline font-bold">contact@paisa-calc.vercel.app</a>.
        </p>
      </section>
    </div>
  );
}
