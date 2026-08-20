"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    router.push("/search");
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl mb-8">
      <div className="relative flex items-center group">
        <Search className="absolute left-4 size-4 text-zinc-400 group-focus-within:text-green-400 transition-colors pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search grip socks, shin guards, studs..."
          className="w-full pl-11 pr-10 py-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-white placeholder-zinc-500 text-sm rounded-xl outline-none transition-all duration-300 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:bg-zinc-900 shadow-inner"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </form>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const searchWords = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const filteredProducts = products.filter((product) => {
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();

    return searchWords.some(
      (word) => name.includes(word) || category.includes(word)
    );
  });

  return (
    <>
      <SearchBar />

      {query ? (
        <h1 className="text-3xl font-bold mb-2">
          Search Results for: <span className="text-green-400">"{query}"</span>
        </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
      )}

      <p className="text-zinc-400 mb-8">
        Found {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#121212] border border-zinc-800 rounded-xl">
          <p className="text-lg text-zinc-400">No gear found matching your search.</p>
          <Link
            href="/"
            className="inline-block mt-4 text-green-400 hover:underline font-medium"
          >
            Go back to homepage
          </Link>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12 max-w-7xl mx-auto">
      <Suspense fallback={<div className="text-zinc-400">Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
