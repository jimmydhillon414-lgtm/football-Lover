"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input field automatically when search opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Handle Form Submission / Redirect to Search Page
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
    setQuery("");
  };

  const handleQuickSearch = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* 1. Search Icon Button on Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-zinc-300 hover:text-green-400 transition-colors rounded-full hover:bg-zinc-800/50"
        aria-label="Search products"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* 2. Fullscreen Search Overlay / Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 transition-all"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl bg-[#0d1117] border border-zinc-800 rounded-2xl p-5 shadow-[0_0_50px_rgba(34,197,94,0.15)]">
            
            {/* Search Input Box */}
            <form onSubmit={handleSearch} className="relative flex items-center group">
              <Search className="w-5 h-5 text-zinc-400 group-focus-within:text-green-400 transition-colors shrink-0 absolute left-4 pointer-events-none" />
              
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for grip socks, shin guards, studs..."
                className="w-full bg-[#161b22] text-white placeholder-zinc-500 text-sm font-medium pl-12 pr-24 py-3.5 rounded-xl border border-zinc-700/60 outline-none transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-inner"
              />

              <div className="absolute right-3 flex items-center gap-2">
                {query && (
                  <button
                    type="submit"
                    className="p-1.5 bg-green-500 hover:bg-green-400 text-black rounded-lg transition"
                  >
                    <ArrowRight className="w-4 h-4 font-bold" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Trending Quick Search Chips */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-zinc-400 flex-wrap">
              <span className="flex items-center gap-1 text-green-400 font-semibold uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3 h-3" /> Trending:
              </span>
              {["Grip Socks", "Shin Guards", "Studs", "Match Ball"].map((term) => (
                <button
                  key={term}
                  onClick={() => handleQuickSearch(term)}
                  className="px-3 py-1 bg-zinc-800/60 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/30 border border-zinc-700/50 rounded-full text-zinc-300 transition-all cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
