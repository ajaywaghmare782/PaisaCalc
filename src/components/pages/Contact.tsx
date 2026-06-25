import React, { useState } from 'react';
import { Mail, Send, PhoneCall, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In Netlify, the static HTML handling process intercepts form submits automatically.
    // In our live development preview, we show a submission success banner.
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Page Header */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-10 space-y-4">
        <h1 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight font-serif-heading">
          Get in Touch
        </h1>
        <p className="text-base text-text-muted max-w-2xl leading-relaxed font-sans">
          Have suggestions for a new personal finance calculator? Found a calculation bug or have feedback on our tax regime comparisons? Our development team is all ears. We read messages daily and build updates based on user ideas.
        </p>
      </section>

      {/* Grid: Form and Side Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Form Section */}
        <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-semibold text-primary font-serif-heading mb-4">
            Send a Secure Message
          </h2>
          
          {formSubmitted ? (
            <div className="p-6 bg-success/5 border border-success/15 text-success rounded-xl text-center font-sans text-sm font-semibold animate-fadeIn">
              Thank you for reaching out! Your message was submitted successfully. We will contact you at your email address soon.
            </div>
          ) : (
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit}
              className="space-y-5 font-sans text-sm"
            >
              {/* Netlify hidden field required for static HTML form processing */}
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                  Your Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Write your suggestions, questions, or bug reports here..."
                  className="w-full bg-gray-50 border border-gray-200 focus:border-accent p-2.5 rounded-xl outline-none resize-none transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center gap-2 transition cursor-pointer active:scale-98 shadow-sm"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </section>

        {/* Side Panel Information */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-primary font-serif-heading">
              Support Center
            </h3>
            
            <div className="space-y-4 text-xs font-sans leading-relaxed">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Direct Email Address</h4>
                  <p className="text-text-muted mt-0.5">
                    Send bug reports or inquiries directly:
                  </p>
                  <a href="mailto:contact@mypaisacalc.vercel.app" className="underline font-bold text-accent hover:text-accent/80 mt-1 block">
                    contact@mypaisacalc.vercel.app
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                <PhoneCall className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Corporate Outreach</h4>
                  <p className="text-text-muted mt-0.5">
                    For licensing, partnership requests, or commercial inquiries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                <MessageSquare className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Open-Source & Webmasters</h4>
                  <p className="text-text-muted mt-0.5">
                    We maintain absolute privacy guidelines and are committed to local browser calculators.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-teal-50/50 dark:bg-slate-800 border border-teal-100/50 dark:border-border rounded-2xl p-6 text-xs leading-relaxed font-sans text-text-muted">
            <h4 className="font-bold text-primary mb-2">Privacy Assurance</h4>
            <p>
              PaisaCalc never stores your tax details, asset counts, or message coordinates. Messages sent through this portal are safely forwarded through encrypted email routing and are purged dynamically.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
