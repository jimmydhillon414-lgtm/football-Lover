"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product-card"; // Reusing your existing ProductCard component

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const searchWords = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  // Filters the main products database using name and category
  const filteredProducts = PRODUCTS.filter((product) => {
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();

    return searchWords.some(
      (word) => name.includes(word) || category.includes(word)
    );
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">
        Search Results for: <span className="text-green-400">"{query}"</span>
      </h1>
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
