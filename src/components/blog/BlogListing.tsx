import React, { useState, useMemo } from 'react';
import { BLOG_POSTS } from '../../data/blogData';
import { BlogPostType } from '../../types';
import AdSenseHolder from '../AdSenseHolder';
import { Filter, Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogListingProps {
  onNavigateToPost: (slug: string) => void;
}

export default function BlogListing({ onNavigateToPost }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories extracted dynamically from BLOG_POSTS + 'All'
  const categories = useMemo(() => {
    const cats = ['All'];
    BLOG_POSTS.forEach((post) => {
      if (!cats.includes(post.category)) {
        cats.push(post.category);
      }
    });
    return cats;
  }, []);

  // Filter posts based on category selection
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight font-serif-heading">
          PaisaCalc Financial Knowledgebase
        </h1>
        <p className="text-text-muted text-sm max-w-xl mx-auto font-sans">
          Simple, helpful guides on Indian taxes, mutual funds, provident schemes, home loans, and employee savings benefits.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
        <span className="text-xs text-text-muted font-bold flex items-center gap-1 mr-2 uppercase font-sans">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition ${selectedCategory === cat ? 'bg-primary text-white shadow-sm' : 'bg-white border border-gray-150 text-text hover:bg-gray-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ad slot in category header */}
      <AdSenseHolder label="Below filters advertisement block" />

      {/* Grid listing */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              onClick={() => onNavigateToPost(post.slug)}
              className="group bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer"
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

              <div className="p-6 border-t border-gray-50 flex justify-between items-center text-[10px] text-text-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                <span className="font-semibold text-primary group-hover:text-accent transition-colors flex items-center gap-0.5">
                  Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* FALLBACK EMPTY STATE */
        <div className="p-12 text-center text-text-muted bg-white border border-dashed border-gray-250 rounded-2xl">
          No articles discovered in the selected category. Please check again soon!
        </div>
      )}
    </div>
  );
}
