"use client";

import React, { useState } from "react";
import ElimiHeader from "@/components/ElimiHeader";
import ShopHero from "@/components/shop/ShopHero";
import ProductGrid, {
  Product,
  BOUTIQUE_PRODUCTS,
} from "@/components/shop/ProductGrid";
import ProductDetailModal from "@/components/shop/ProductDetailModal";
import ShoppingCartDrawer, {
  CartItem,
} from "@/components/shop/ShoppingCartDrawer";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Phone,
  ShoppingBag,
} from "lucide-react";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: BOUTIQUE_PRODUCTS[0], quantity: 1 }, // Default item in bag for demo
  ]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.product.id === productId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen w-full bg-[#F2F4F8] text-[#181B25] font-sans flex flex-col justify-between antialiased">
      {/* Home Page Navigation Header */}
      <ElimiHeader />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Boutique Hero Section */}
        <ShopHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onSearchSubmit={() => {
            // Smoothly scroll to product grid if needed
            const gridEl = document.getElementById("boutique-catalog");
            if (gridEl) {
              gridEl.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* Product Catalog */}
        <div id="boutique-catalog">
          <ProductGrid
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Value Proposition & Guarantees Banner */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0D52FF]/10 text-[#0D52FF] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#181B25]">
                  Verified Sellers Only
                </h4>
                <p className="text-xs text-[#525866]">
                  Every item is inspected and authenticated before delivery.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0D52FF]/10 text-[#0D52FF] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#181B25]">
                  Burundi & Diaspora Shipping
                </h4>
                <p className="text-xs text-[#525866]">
                  Fast door-to-door delivery in Bujumbura, Gitega, and
                  worldwide.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0D52FF]/10 text-[#0D52FF] flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#181B25]">
                  Instant WhatsApp Order
                </h4>
                <p className="text-xs text-[#525866]">
                  Pay with Mobile Money (Lumicash, Ecocash) or Cash on Delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Shopping Bag Button */}
      <button
        onClick={() => setCartDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#0D52FF] hover:bg-[#0B44D8] text-white p-3.5 rounded-full shadow-xl flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
        aria-label="View Shopping Bag"
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="font-extrabold text-xs">Bag</span>
        <span className="bg-white text-[#0D52FF] font-black text-xs px-2 py-0.5 rounded-full">
          {totalCartCount}
        </span>
      </button>

      {/* Product Quick Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <ShoppingCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
