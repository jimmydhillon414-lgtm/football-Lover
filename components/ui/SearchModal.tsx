"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
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

    // Redirect to /search with query parameter
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* 1. Search Icon Button on Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-300 hover:text-white transition-colors"
        aria-label="Search products"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* 2. Fullscreen Search Overlay / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="relative w-full max-w-2xl bg-[#121212] border border-zinc-800 rounded-xl p-4 shadow-2xl">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for grip socks, shin guards, studs..."
                className="w-full bg-transparent text-white placeholder-zinc-500 outline-none text-base"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
