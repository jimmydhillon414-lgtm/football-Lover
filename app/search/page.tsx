"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";

// Product list with actual image paths
const ALL_PRODUCTS = [
  {
    id: "1",
    name: "Pro Performance Grip Socks",
    category: "Grip Socks",
    price: 499,
    displayPrice: "₹499",
    image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Customized Carbon Shin Guards",
    category: "Shin Guards",
    price: 1299,
    displayPrice: "₹1,299",
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "Turf Master Football Studs",
    category: "Studs",
    price: 2499,
    displayPrice: "₹2,499",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    name: "Anti-Slip Training Socks",
    category: "Grip Socks",
    price: 399,
    displayPrice: "₹399",
    image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=300&auto=format&fit=crop&q=80",
  },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { addItem, open } = useCart();

  const searchWords = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();

    return searchWords.some(
      (word) => name.includes(word) || category.includes(word)
    );
  });

  const handleBuy = (product: typeof ALL_PRODUCTS[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image, // Dynamic product image linked
    });
    open();
  };

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
            <div
              key={product.id}
              className="bg-[#121212] border border-zinc-800 rounded-lg p-5 flex flex-col justify-between hover:border-zinc-700 transition relative z-10"
            >
              <div>
                <span className="text-xs text-green-400 uppercase tracking-wider font-semibold">
                  {product.category}
                </span>
                <h2 className="text-xl font-semibold mt-1 mb-2 text-white">
                  {product.name}
                </h2>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800 relative z-20">
                <span className="text-lg font-bold text-white">{product.displayPrice}</span>
                
                <button
                  type="button"
                  onClick={() => handleBuy(product)}
                  className="relative z-50 pointer-events-auto bg-green-500 hover:bg-green-600 text-black font-semibold text-sm px-4 py-2 rounded-md transition text-center shrink-0 cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>
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
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12 max-w-7xl mx-auto relative z-0">
      <Suspense fallback={<div className="text-zinc-400">Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
