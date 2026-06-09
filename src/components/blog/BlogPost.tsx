import React, { useMemo } from 'react';
import { BLOG_POSTS } from '../../data/blogData';
import { BlogPostType, ActiveView } from '../../types';
import AdSenseHolder from '../AdSenseHolder';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Printer } from 'lucide-react';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
  onNavigateView: (view: ActiveView) => void;
  onNavigateToPost: (slug: string) => void;
}

export default function BlogPost({ post, onBack, onNavigateView, onNavigateToPost }: BlogPostProps) {
  // Extract 2 other articles as "Related Articles"
  const relatedArticles = useMemo(() => {
    return BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  }, [post]);

  // Divide the blog text blocks to insert an ad halfway through
  const midIndex = Math.ceil(post.content.length / 2);
  const firstHalfContent = post.content.slice(0, midIndex);
  const secondHalfContent = post.content.slice(midIndex);

  // Core renderer for paragraph structures
  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'p':
        return (
          <p key={index} className="text-sm md:text-base text-gray-750 font-serif leading-relaxed mb-5 whitespace-pre-line text-justify">
            {block.text}
          </p>
        );
      case 'h2':
        return (
          <h2 key={index} className="text-xl md:text-2xl font-semibold text-primary font-serif-heading tracking-tight mt-8 mb-4">
            {block.text}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={index} className="text-lg font-bold text-primary tracking-tight mt-6 mb-3">
            {block.text}
          </h3>
        );
      case 'bullets':
        return (
          <ul key={index} className="list-disc list-inside pl-4 space-y-2 mb-6 text-sm text-text-muted font-sans">
            {block.items.map((item: string, i: number) => (
              <li key={i} className="leading-relaxed">
                <span className="text-text font-serif text-sm">{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'cta':
        return (
          <div key={index} className="bg-primary/5 p-6 rounded-2xl border border-primary/10 my-8 text-center text-sm">
            <p className="font-semibold text-primary font-sans mb-4 leading-relaxed">
              {block.text}
            </p>
            <button
              onClick={() => onNavigateView(block.actionView)}
              className="px-5 py-2.5 bg-accent hover:bg-yellow-550 text-primary font-bold rounded-xl text-xs transition cursor-pointer inline-flex items-center gap-1"
            >
              Launch Calc Component <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="text-xs font-semibold text-primary hover:text-accent flex items-center gap-1.5 transition cursor-pointer bg-white border border-gray-150 px-3 py-1.5 rounded-lg hover:border-accent"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Directory
        </button>
      </div>

      {/* Main post body */}
      <article className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-10 space-y-6">
        {/* Post header metadata */}
        <div className="border-b border-gray-100 pb-6 space-y-4">
          <span className="inline-block bg-primary/5 text-primary text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4.5xl font-semibold tracking-tight text-primary leading-tight font-serif-heading">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-text-muted font-sans">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  } catch (e) {
                    // Fallback alerts
                  }
                }}
                className="hover:text-primary flex items-center gap-1 transition"
                title="Share Article Link"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="hover:text-primary flex items-center gap-1 transition"
                title="Print post"
              >
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
        </div>

        {/* First Half content blocks */}
        <div className="serif-rich-content">
          {firstHalfContent.map((block, index) => renderBlock(block, index))}
        </div>

        {/* MID-ARTICLE AD SLOT — Required by AdSense requirements */}
        <AdSenseHolder label="Mid-Article Segment Ad Slot" />

        {/* Second Half content blocks */}
        <div className="serif-rich-content">
          {secondHalfContent.map((block, index) => renderBlock(block, index + midIndex))}
        </div>

        {/* BOTTOM-ARTICLE AD SLOT */}
        <AdSenseHolder label="End-Article Segment Ad Slot" />
      </article>

      {/* Related articles at bottom */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-primary font-serif-heading">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedArticles.map((rel) => (
            <div
              key={rel.slug}
              onClick={() => onNavigateToPost(rel.slug)}
              className="group bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="space-y-3">
                <span className="inline-block bg-primary/5 text-primary text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                  {rel.category}
                </span>
                <h4 className="text-base font-bold text-primary font-serif-heading group-hover:text-accent transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] text-text-muted mt-4">
                <span>{rel.date}</span>
                <span className="font-semibold text-primary group-hover:text-accent transition-colors flex items-center gap-0.5">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
