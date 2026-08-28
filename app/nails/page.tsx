'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  User, 
  ShoppingBag, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Gem, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  Star,
  Check,
  Menu,
  Phone,
  Sparkles,
  Database,
  Loader2,
  ExternalLink,
  Eye
} from 'lucide-react';
import { useRealtimeProducts } from '@/lib/firestore-products';
import { Product } from '@/lib/products';
import ElimiHeader from '@/components/ElimiHeader';

interface CartItem {
  id: string;
  name: string;
  price: number;
  priceBIF?: number;
  image: string;
  quantity: number;
  category?: string;
}

export default function NailsPage() {
  const router = useRouter();
  const { products: realtimeProducts, loading: isLoadingFirestore, isLive } = useRealtimeProducts();
  const [selectedSubCat, setSelectedSubCat] = useState<string>('All');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalUSD = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartSubtotalBIF = cart.reduce((sum, item) => sum + (item.priceBIF || item.price * 3000) * item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product: Product | { id: string; name: string; priceUSD: number; priceBIF?: number; image: string; category?: string }) => {
    const price = 'priceUSD' in product ? product.priceUSD : (product as any).price || 15;
    const priceBIF = 'priceBIF' in product ? product.priceBIF : (product as any).priceBIF || (price * 3000);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price,
          priceBIF,
          image: product.image,
          quantity: 1,
          category: product.category,
        },
      ];
    });
    showToast(`Added ${product.name} to cart!`);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 4000);
    }
  };

  // Filter products from Firestore DB
  const shopNailsProducts = useMemo(() => {
    if (!realtimeProducts || realtimeProducts.length === 0) return [];
    
    // First get Nails & Beauty products
    const nailItems = realtimeProducts.filter(
      (p) => p.category === 'Nails & Beauty'
    );

    // If sub-category filter applied
    if (selectedSubCat !== 'All') {
      const subFiltered = nailItems.filter((p) => {
        if (selectedSubCat === 'Gel Polish') return p.subCategory?.includes('Gel') || p.name.includes('Gel') || p.name.includes('Polish');
        if (selectedSubCat === 'Nail Art Tools') return p.subCategory?.includes('Tools') || p.name.includes('Brush') || p.name.includes('Drill');
        if (selectedSubCat === 'Nail Art Decor') return p.subCategory?.includes('Decor') || p.name.includes('Glitter') || p.name.includes('Foil');
        if (selectedSubCat === 'Press On Nails') return p.subCategory?.includes('Press-On') || p.name.includes('Press On') || p.name.includes('Kit');
        if (selectedSubCat === 'Nail Stickers') return p.subCategory?.includes('Stickers') || p.name.includes('Sticker');
        if (selectedSubCat === 'Nail Kits') return p.subCategory?.includes('Kit') || p.name.includes('Kit') || p.name.includes('Machine');
        return true;
      });
      if (subFiltered.length > 0) return subFiltered;
    }

    // If we have nail items, prioritize them, otherwise take boutique items
    if (nailItems.length > 0) {
      return nailItems;
    }

    return realtimeProducts.slice(0, 10);
  }, [realtimeProducts, selectedSubCat]);

  // Search filtered products
  const searchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return shopNailsProducts;
    const q = searchQuery.toLowerCase().trim();
    return realtimeProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q)
    );
  }, [searchQuery, shopNailsProducts, realtimeProducts]);

  const categories = [
    {
      title: 'Gel Polish',
      subCat: 'Gel Polish',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxXHAMQ3aC8vEWVz-achmjxj9kTKZyZjTsiw4PYcSfpDw2CoMXkYQfulqBk6btIu4jqPNWBaxnDVo3Mg3qz1KN9uQx07LWsWroN6oQiGEjQ9Cu5NPvqnJNZ5ghuBwU3SaB_0eFPw1OZucYZh-WwX9a9IjugIsqlaqSjUtvLM_UsXBK38H5gI8MLFPOTKgDYeXWHwjrzREDM-H68Tnu_OWjMXnvGRUaypbSbKW1O4ypCWRNDfT8yEhSHw',
    },
    {
      title: 'Nail Art Tools',
      subCat: 'Nail Art Tools',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfiRnqRD73c8gbOPXaXoRXZyl_pYtNUXsWcu0ppxJzEy_i2KXdihwCzXR65o9QETynNzSeNDNyF35MdUwtSK4MsL63XZVwgQxVAWqQvlG2ZwQ2Cl_gN7pYyFi_FtTFgE_D1cdTF6T302nZhD7tOY-mmGSS_df8aGEgndVy6TaU9m6raErZCrWlnrp0eubteSbg6xftOvanK88Ajk5myvw1-66PgTXyKg_gqAIys1QfraFB7PWZIy5N4A',
    },
    {
      title: 'Nail Art Decor',
      subCat: 'Nail Art Decor',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMQvSDVEsvhXUhtUWiAgVZZVsu3IeW3KLkOodsWS2MyFR0YsJ7-_gROE_5R5_N9jaOIdpyoR-zVAs6E9OVNVXgQmEDWwl_9d4_2-pellANkZeAwMTZwQOYLLCPY5vuC32p2Hjt9L_hHRLU0lRB002KHb_9P_0tDBNyhw3_Im6erVL-zqC6xkZNSxkIkqkSK5dLkqHrJKBVZn848TOutiVgrzYv4YxulFQT1W6Wzv2cGKyEcXaD-c_A0g',
    },
    {
      title: 'Press On Nails',
      subCat: 'Press On Nails',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH3b8G5O824RZNCiUKQ6u_7fBwYLzYUVx-7mU-M_GrCof0w-T7xS5UKyAW-252yXJIseIkp6ZKle9yUDdMqkIYIwuLD7XTHUT0L8zHHFWMLEc3gpoVmTKgNgUmZwAb2RWGJGhRox2_Nt4BnVSsV3WTnXJwvGQC-3w1XtKCmEGcFhVuXQ5WWTYywFAAImktvKnFlkXEXczDnoT3UnYj8ApaNM57lDcuBGglD87VX-JVN-dWLwAxFh5euA',
    },
    {
      title: 'Nail Stickers',
      subCat: 'Nail Stickers',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_Wq-nO0r44aiZjw-vrkPC1QPBwz-JACfYO3wK6lPphjzG1AJ8SKpnYAbPswhc3AbKXA3phdxEfAK1ZYTsjpogUoEpBA50Sky7lBQTBhZYp0q5wMiLSEmNxk-zHsmnihWDpZrsTdBI8u2QAPyK3vKfw2MHcuYFCVq6x-OpsG5AdFduVrKW3KgUNg94QynnAW5tqhtLhkWj2gEDzhnAqBfy9mfdIcAd9wC_5sPqOYdDVLkrsckP1hhsIg',
    },
    {
      title: 'Nail Kits',
      subCat: 'Nail Kits',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoIX8qcLkt1DjkdkPsriFTS1I3pyI4QTH8iRNh31qvZ0ChsfjHteaMzHkyKMx5Wll6Hhj1fGsY6u1SyMvrRTBGkhCmn2Isn2RRUaZc5n9SrQRjxxp4ybvabveiavzFDZNdj_OTn5EC9S8KcSqUGEoUacOLDx8H8wQJsvVMKJ_J7NYElHOKJvOqUWUlg4z6ghvFe4moNGDZ3QQewQbhZhOpwVlw4a-Dh5o7_a_rYuYepiMau6_Gh--saw',
    },
  ];

  const instagramImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuALZ9Q-e2rhaMQplNRINqUQsX15cgBDXXuC_5njvG7lVvIScEDvLxAYTo8yUzONSr1ox5dknPdVsLlCP3nmOEHfTSVVJ5pGgAx4ZzLerJ_GOeIV9SH-X8XrHMCu0MnhcCLustWz8Wba3ufNpcAgP7wk2qmcPYcLSvJZ3Dl2e6NOEERCx0-6I4a_Nf2JCSC4mkPTabbOMRD9RjOErT6r9zQJV-IVAhSAn8pFgjN32X9BQhYBF1435SVA1w',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Dl4t8HqnoYrjgURB7m9GEiYpV92psR52Tz4taD1ZTUwmVT0wncgeZUrdtic_W9nIsL9rpjHOjlFAImcHf7KMTul1iy1ITN3uVm8TYY47mzagMp2hk-lqrnZytO0YUzL8odBeuBC5GopFTlzkWCLmFJv447fUNIWOSLXZnegDw2QFShh1C4eA1kMuR_ycrsNrISmUkfmOJ5oIpFI6h_I4wfbC2mMByjGI8IkcK260mBy3KLwv_twSfw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAdLfWR68Umz02vwhej8W_YonjIcouZ-W9ew60akkHDafftL28iYYxBEVq2chZz7Qc4VwNEUmNGD8rlRG1z0X2n9bNX2gMdlU_D9olPAkpoMuYC6IbXJNUsAwmwU8Fgnbz5bhtpBCpe1G9lGYp6BkmvCZHl4HPcymd9mPqXjhHU5C_qQLgbgQpdm9r06zntNiov19pTcxfEzNE6E0DgsPxKK6elZl1msFzPz55gjsF3FEwYVHJOaTuw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD-AvBBPJgXxiznFr0jvWlhZYMM606Nlg7OGXYebhbG-s2SeGt7mBLEc8xXV2Qp1sbxMGxSudVBHF_sp1zG-SYF_M0tDZ3Pe641LLR8lbwvSxukoQOrsobnWMXZMUQp12Fdw9q6ShufRp0Rl2lFQlh_gpHboMicYoRxU4zscIswElUDi1BalEr5JqcvYQa4rU49Kpm9-6hLl_Ih2hktwTIIUxrLW0wwbq-8XzO8P9I7AoZQRPaf6OK3Fw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCUY-j1ZR0VrevMkAkJfpvTuzwJT1PGUuoy1EeYMjSStEfQ0Jd6QMY1OmNlCJRmgNRJvCMZOR2qC7PBFjYFRmF6jpsUfgjsv4qioMZJCWCLmCY-UV4BvaJdYZQaWiYgAKOPA0_KAbPYzw-K8-0dUFDc0djawl1qNVIKak4b5SUhpPocjxq7ChbrF4A7ZT9pZ_ci5716EBeWa4MnNt-kPuVR1NY4n5-5EEXv7vnROs5cEj4q8ABkRO379g',
  ];

  return (
    <div className="text-[#1e293b] antialiased min-h-screen bg-[#f8f9fc] font-sans flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D52FF] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-20 px-4">
          <div className="bg-white w-full max-w-xl rounded-2xl p-5 sm:p-6 shadow-2xl relative border border-blue-100 max-h-[85vh] flex flex-col">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-4 h-4 text-[#0D52FF]" />
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-gray-900">
                Search Shop &amp; Firestore Products
              </h3>
            </div>
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search gel polish, stickers, kits, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0D52FF] text-sm"
                autoFocus
              />
              <Search className="w-5 h-5 absolute left-3 top-3 sm:top-3.5 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
              {['All', 'Gel Polish', 'Glitter', 'Press On', 'Stickers', 'Liner Brush'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag === 'All' ? '' : tag)}
                  className="text-xs bg-[#EBF3FF] text-[#0D52FF] px-2.5 py-1 rounded-full hover:bg-blue-200 transition font-semibold"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Realtime Search Results */}
            <div className="overflow-y-auto flex-1 divide-y divide-gray-100 pr-1">
              {searchedProducts.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  No products matched &ldquo;{searchQuery}&rdquo; in our live Firestore catalogue.
                </div>
              ) : (
                searchedProducts.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between gap-3 hover:bg-blue-50/50 p-2 rounded-xl transition">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{p.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-bold text-[#0D52FF]">${p.priceUSD.toFixed(2)}</span>
                          <span>•</span>
                          <span>{p.priceBIF.toLocaleString()} BIF</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Link
                        href={`/shop/${p.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-1.5 text-gray-500 hover:text-[#0D52FF] hover:bg-white rounded-lg transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          addToCart(p);
                          setIsSearchOpen(false);
                        }}
                        className="bg-[#0D52FF] text-white text-xs px-2.5 py-1.5 rounded-lg font-semibold hover:bg-[#0b45d6] transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-5">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#0D52FF]" />
                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-gray-900">
                    Shopping Cart ({totalCartCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-blue-300" />
                  <p className="font-semibold text-base mb-1 text-gray-800">Your cart is empty</p>
                  <p className="text-xs text-gray-500 mb-6">Explore our live Firestore boutique catalogue and add your favorites!</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-[#0D52FF] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#0b45d6] transition shadow-sm uppercase tracking-wider"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 sm:gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg bg-white p-0.5 border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs sm:text-sm truncate text-gray-900">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-[#0D52FF] font-bold">${item.price.toFixed(2)}</span>
                          {item.priceBIF && (
                            <span className="text-[11px] text-gray-500 font-medium">({item.priceBIF.toLocaleString()} BIF)</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-300 text-xs font-bold hover:bg-gray-100 flex items-center justify-center text-gray-700"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-300 text-xs font-bold hover:bg-gray-100 flex items-center justify-center text-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, -item.quantity)}
                        className="text-gray-400 hover:text-red-500 p-1"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-5 border-t border-gray-200 mt-6 bg-white">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs sm:text-sm font-semibold uppercase text-gray-600">Subtotal (USD)</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">${cartSubtotalUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline mb-3 text-xs text-gray-500">
                  <span>Subtotal (BIF)</span>
                  <span className="font-semibold text-gray-700">{cartSubtotalBIF.toLocaleString()} BIF</span>
                </div>
                <p className="text-[11px] text-gray-400 mb-3">Live Firestore synced inventory with instant WhatsApp order dispatch.</p>
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/25779000000?text=${encodeURIComponent(
                      `Hello ELIMI Nails & Boutique! I would like to place an order from your shop:\n\n` +
                      cart.map(c => `• ${c.name} (x${c.quantity}) - $${(c.price * c.quantity).toFixed(2)} / ${(c.priceBIF || c.price * 3000) * c.quantity} BIF`).join('\n') +
                      `\n\nTotal: $${cartSubtotalUSD.toFixed(2)} USD / ${cartSubtotalBIF.toLocaleString()} BIF`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition tracking-wider uppercase shadow-md flex items-center justify-center gap-2"
                  >
                    <span>ORDER VIA WHATSAPP</span>
                  </a>
                  <button
                    onClick={() => {
                      showToast('Order recorded successfully! We are preparing your shipment.');
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-[#0D52FF] text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#0b45d6] transition tracking-wider uppercase shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>CHECKOUT VIA BOUTIQUE</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Announcement Bar */}
      <div className="bg-[#EBF3FF] py-2 px-4 text-xs font-medium text-center border-b border-blue-200 text-blue-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4 divide-y sm:divide-y-0 sm:divide-x divide-blue-300">
          <span className="sm:pr-4"><strong>FREE SHIPPING</strong> on orders $49+</span>
          <span className="sm:px-4"><strong>10% OFF</strong> your first order | Use code: <strong>NAILS10</strong></span>
          <span className="sm:pl-4"><strong>EASY RETURNS</strong> within 30 days</span>
        </div>
      </div>

      {/* Home Page Navigation Header */}
      <ElimiHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#EBF3FF] via-[#F4F8FF] to-white relative overflow-hidden border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center pt-10 sm:pt-14 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 gap-8 md:gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-100/90 border border-blue-200 text-[#0D52FF] px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPRESS. CREATE. SHINE.</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-gray-900 font-serif">
              Nail Art That<br />
              <span className="text-[#0D52FF]">Speaks You.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Discover salon-grade gel polishes, professional nail art tools, and bespoke press-on designs tailored for luxury and everyday elegance.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <a
                href="#best-sellers"
                className="bg-[#0D52FF] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#0b45d6] transition text-center text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-blue-500/20"
              >
                SHOP NOW
              </a>
              <a
                href="#categories"
                className="border-2 border-blue-200 bg-white text-[#0D52FF] px-7 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition text-center text-xs sm:text-sm tracking-wider uppercase shadow-xs"
              >
                EXPLORE NAIL ART
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square sm:aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9WvLtjQZuQ8HmTAeCdsm6GN1G1eYnbkk6a44r9DCDjSZCoRARPuPiIZF1FG73vgPyYDnNsrezyhgdWw2VWLF_Z6USc2Sts5B1l-GRcL9XxoASACovMKQ9_HH6G6-IUTdvfH8raBODkUOPnYPAc3K9OSwlVKHbCUKr-i6M7KWjUeHrrg0jKDJc9xsuEnz1WNqvBvu7aiuuoWoDOCkGWu0B7BRg6yqHGcPVfv0CmyjtWyT_DLXKBoCXEQ"
                alt="Hands with beautiful nail art"
                className="w-full h-full object-contain object-bottom"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-y border-gray-200/80 py-5 sm:py-6 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          <div className="flex items-center justify-center sm:justify-start space-x-2.5 font-semibold text-xs sm:text-sm uppercase tracking-wide text-gray-800">
            <Package className="w-5 h-5 text-[#0D52FF] shrink-0" />
            <span>SALON QUALITY</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-2.5 font-semibold text-xs sm:text-sm uppercase tracking-wide text-gray-800">
            <Clock className="w-5 h-5 text-[#0D52FF] shrink-0" />
            <span>LONG LASTING</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-2.5 font-semibold text-xs sm:text-sm uppercase tracking-wide text-gray-800">
            <Heart className="w-5 h-5 text-[#0D52FF] shrink-0" />
            <span>CRUELTY FREE</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-2.5 font-semibold text-xs sm:text-sm uppercase tracking-wide text-gray-800">
            <Star className="w-5 h-5 text-[#0D52FF] shrink-0" />
            <span>TRUSTED BY 3M+</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 sm:py-16 md:py-20 flex-grow">
        {/* Shop By Category */}
        <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16 sm:mb-20 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] bg-blue-50 border border-blue-200/70 px-3 py-1 rounded-full inline-block mb-2">
              Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wide text-gray-900">
              Shop By Category
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Browse real-time salon supplies, press-ons, and tools synced directly from our Firestore database.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedSubCat(cat.subCat);
                  const el = document.getElementById('best-sellers');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left bg-white border rounded-2xl p-4 sm:p-5 flex justify-between items-center group hover:shadow-lg transition duration-300 hover:-translate-y-0.5 ${
                  selectedSubCat === cat.subCat
                    ? 'border-[#0D52FF] ring-2 ring-blue-200 bg-blue-50/20'
                    : 'border-gray-200/80 hover:border-blue-300'
                }`}
              >
                <div className="pr-3">
                  <h3 className="text-base sm:text-lg font-bold mb-1.5 uppercase leading-tight text-gray-900 group-hover:text-[#0D52FF] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">Live collection supplies</p>
                  <span className="text-xs sm:text-sm font-semibold flex items-center space-x-1 uppercase text-[#0D52FF]">
                    <span>{selectedSubCat === cat.subCat ? 'Active Filter' : 'Filter Category'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-blue-50 rounded-xl overflow-hidden p-1 border border-blue-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section id="best-sellers" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16 sm:mb-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 sm:mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] bg-blue-50 border border-blue-200/70 px-3 py-1 rounded-full inline-block">
                  Top Rated
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Firestore DB Synced</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wide text-gray-900">
                Best Sellers &amp; Shop Catalogue
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Real-time boutique inventory with instant ordering and live USD/BIF conversion.
              </p>
            </div>

            {/* Sub-Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {['All', 'Gel Polish', 'Nail Art Tools', 'Nail Art Decor', 'Press On Nails', 'Nail Stickers', 'Nail Kits'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCat(sub)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition ${
                    selectedSubCat === sub
                      ? 'bg-[#0D52FF] text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-[#0D52FF]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Realtime Products Grid */}
          {isLoadingFirestore ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-xl mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : shopNailsProducts.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
              <Database className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-1">No products found in this filter</h3>
              <p className="text-xs text-gray-500 mb-4">Try clearing the category filter or searching for another nail product.</p>
              <button
                onClick={() => setSelectedSubCat('All')}
                className="bg-[#0D52FF] text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-[#0b45d6] transition"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6">
              {shopNailsProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col group bg-white border border-gray-200/80 rounded-2xl p-3 sm:p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 relative"
                >
                  {/* Badge */}
                  {item.badgeTag || item.badge ? (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0D52FF] text-white px-2 py-0.5 rounded-md shadow-xs">
                        {item.badgeTag || item.badge}
                      </span>
                    </div>
                  ) : null}

                  {/* Product Image */}
                  <Link
                    href={`/shop/${item.id}`}
                    className="bg-gray-50 rounded-xl mb-3 p-2 sm:p-3 aspect-square flex items-center justify-center overflow-hidden border border-gray-100 group-hover:bg-blue-50/50 transition relative block"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-contain w-full h-full group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </Link>

                  {/* Product Title */}
                  <Link
                    href={`/shop/${item.id}`}
                    className="font-semibold text-xs sm:text-sm mb-1 line-clamp-2 text-gray-900 group-hover:text-[#0D52FF] transition-colors"
                  >
                    {item.name}
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1 text-xs">
                    <span className="text-amber-400">{'★'.repeat(Math.round(item.rating || 5))}</span>
                    <span className="text-gray-400 text-[10px]">({item.reviewsCount || 20})</span>
                  </div>

                  {/* Price in USD & BIF */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-sm sm:text-base text-gray-900">
                        ${item.priceUSD.toFixed(2)}
                      </span>
                      {item.originalPriceUSD && item.originalPriceUSD > item.priceUSD && (
                        <span className="text-xs text-gray-400 line-through">
                          ${item.originalPriceUSD.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">
                      {item.priceBIF.toLocaleString()} BIF
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-1.5">
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-[#0D52FF] text-white py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold hover:bg-[#0b45d6] transition tracking-wider uppercase shadow-xs flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO CART</span>
                    </button>
                    <Link
                      href={`/shop/${item.id}`}
                      className="w-full bg-blue-50 text-[#0D52FF] hover:bg-blue-100 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-semibold transition tracking-wider uppercase flex items-center justify-center gap-1"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Promo Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16 sm:mb-20">
          <div className="bg-gradient-to-br from-[#EBF3FF] via-[#F4F8FF] to-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-sm border border-blue-200/80">
            {/* Left Side */}
            <div className="p-6 sm:p-10 md:p-12 lg:p-14 flex-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-blue-100">
              <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] bg-blue-100 px-3 py-1 rounded-full inline-block w-fit mb-3">
                Studio Guarantee
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold uppercase mb-3 text-gray-900">
                Create Without Limits
              </h2>
              <p className="mb-6 sm:mb-8 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Everything you need for stunning nails — non-toxic formulations, ultra-pigmented shades, and salon-certified tools.
              </p>
              <div>
                <a
                  href="#best-sellers"
                  className="bg-[#0D52FF] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#0b45d6] transition inline-flex items-center gap-1.5 text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-blue-500/20"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Side Features */}
            <div className="p-6 sm:p-10 md:p-12 lg:p-14 flex-1 grid grid-cols-2 gap-4 sm:gap-6 bg-white/70">
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-[#0D52FF]" />
                <span className="font-bold text-xs sm:text-sm uppercase leading-tight text-gray-900">
                  Professional<br />Quality
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-[#0D52FF]" />
                <span className="font-bold text-xs sm:text-sm uppercase leading-tight text-gray-900">
                  Safe &amp; Non-Toxic
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <Gem className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-[#0D52FF]" />
                <span className="font-bold text-xs sm:text-sm uppercase leading-tight text-gray-900">
                  Trendy &amp; Unique
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-[#0D52FF]" />
                <span className="font-bold text-xs sm:text-sm uppercase leading-tight text-gray-900">
                  Made With Passion
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Inspiration Section */}
        <section id="inspired" className="mb-8 scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] bg-blue-50 border border-blue-200/70 px-3 py-1 rounded-full inline-block mb-1.5">
              Community Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wide text-gray-900">
              Get Inspired
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-4">
            {instagramImages.map((imgSrc, i) => (
              <a
                key={i}
                href="#inspired"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Instagram inspiration preview');
                }}
                className="relative group aspect-square block overflow-hidden rounded-xl border border-gray-200/80 bg-gray-100"
              >
                <img
                  src={imgSrc}
                  alt={`Nail Art Inspiration ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0D52FF]/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white backdrop-blur-2xs">
                  <Heart className="w-7 h-7 text-white fill-white" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-gray-300 pt-12 sm:pt-16 pb-8 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10">
          {/* Brand & Socials */}
          <div className="space-y-4">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>ELIMI</span>
              <span className="text-[10px] tracking-widest uppercase bg-[#0D52FF] text-white px-2 py-0.5 rounded font-sans font-semibold">
                Nails
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Curated salon nail art, gel finishes, and precision tools for creators and professionals in Burundi.
            </p>
            <div className="flex space-x-3 pt-2">
              {['Facebook', 'Instagram', 'Pinterest', 'YouTube'].map((social) => (
                <button
                  key={social}
                  onClick={() => showToast(`Visit our ${social} page`)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#0D52FF] flex items-center justify-center transition text-gray-300 hover:text-white"
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-3 text-xs sm:text-sm text-white">Shop Categories</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li><Link href="/nails" className="hover:text-blue-400 transition">Studio Home</Link></li>
              <li><a href="#categories" className="hover:text-blue-400 transition">Gel Polishes</a></li>
              <li><a href="#categories" className="hover:text-blue-400 transition">Press On Sets</a></li>
              <li><a href="#best-sellers" className="hover:text-blue-400 transition">Best Sellers</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-3 text-xs sm:text-sm text-white">ELIMI Pillars</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li><Link href="/protocol" className="hover:text-blue-400 transition">VIP Protocol &amp; Summits</Link></li>
              <li><Link href="/cars" className="hover:text-blue-400 transition">Armored Fleet &amp; Mobility</Link></li>
              <li><Link href="/houses" className="hover:text-blue-400 transition">Estates &amp; Residencies</Link></li>
              <li><Link href="/shop" className="hover:text-blue-400 transition">Diplomatic Boutique</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-bold uppercase tracking-wider mb-3 text-xs sm:text-sm text-white">VIP Newsletter</h4>
            <p className="text-xs sm:text-sm text-gray-400 mb-3">Sign up for special drops and 10% off your first order.</p>
            
            {newsletterSuccess ? (
              <div className="bg-blue-900/50 border border-blue-400 text-blue-200 text-xs p-3 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Thank you for subscribing! Check your inbox for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex border border-gray-700 rounded-xl p-1 bg-slate-900 focus-within:border-[#0D52FF]">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 bg-transparent text-white px-3 py-2 outline-hidden text-xs sm:text-sm border-none focus:ring-0 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-[#0D52FF] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#0b45d6] transition tracking-wider uppercase shrink-0"
                >
                  SIGN UP
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center text-xs text-gray-500 pt-6 border-t border-gray-800">
          <p>© 2026 ELIMI Nails Studio &amp; Boutique. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

