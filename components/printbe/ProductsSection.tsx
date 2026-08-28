'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Star, Plus } from 'lucide-react';
import { Product } from './types';

interface ProductsSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
}

export const initialProducts: Product[] = [
  {
    id: 'prod-mug',
    name: 'Photo Mug',
    category: 'Promotional',
    priceRange: '$14.00 - $20.00',
    minPrice: 14.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO-eyAFhEWpLIVxkg-C2VnqFKDE4fCyd_cVNrxlK6ILS7d160epmf2dyousKV7rw5Ztt9tgwzq2g8gADA204NMhylEAvVegJPdK0rZd2OuHOozsyAQL-cWt2sYP71RZXQLYI1R3HgbkO6_T0lMqeCJE3l4Hy40qnxhgX9iAiow9G9N9RL90lXIq3Y2A-G3SJVbsOn-WEZJkB2_v2FMuO9konkUu0TnioDO3Ws4SXChUJ3QeL9erC_E',
    description: 'Custom ceramic photo mug with dishwasher-safe dye sublimation print. Vibrant full-wrap printing.',
    badge: 'Best Seller',
    options: {
      finishes: ['Glossy Ceramic', 'Matte Finish', 'Color Changing Magic'],
      quantities: [10, 25, 50, 100, 250],
    },
  },
  {
    id: 'prod-hoodie',
    name: 'Hoodie',
    category: 'Apparel',
    priceRange: '$35.00 - $50.00',
    minPrice: 35.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBJdFNOR5vYpik5beFUwnX3CG0z6dEvLnmLkiIfOiwSYTyzZbk5fK3MFOwNqiTjVCUxuqKjX30y2yPMTP3HeuGMyBGo7tgjr0MbnJQEPYeLV-E6T2wmoadi-2ZUlBeEB3HY3TUeg21tnL0eys7UfSOZlW_MRdgmxBQZP_mw9Z8BrYMqxUDgXTORuW637xBuqYkGFvo5XTZtYhurFZgrh-0ZTBZatHUSvj1snPBSRJlWFB8MPzlNavm',
    description: 'Heavyweight fleece hoodie with premium screen print or embroidery placement on chest & back.',
    badge: 'Popular Apparel',
    options: {
      finishes: ['Screen Print', 'Embroidered Chest', 'DTG Print'],
      quantities: [5, 15, 30, 50, 100],
    },
  },
  {
    id: 'prod-sticker',
    name: 'Sticker Pack',
    category: 'Packaging',
    priceRange: '$5.00 - $15.00',
    minPrice: 5.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3XhonsnbmNqBU5ZHxI4jDDHP4imIuBeGpEHcFcvSZV1VmPx1IAj-4mdUwd3xHRZZSQSUcEv22wpYMAHTyq9PI66m4BTRmehEdrY6t5WQnIa_9TDgU90Acj6Lm-XtIwUaC2D81ijqW6K925j_w8WtAxQrxM2oeXMKe3RfZOgaVwMQX3hmzLJLS_ldY9eDj3thqB58igB4cxwD__PE-gUUckBu9j0wwd2LBQCsK_5sUnaFi8fuXPbvn',
    description: 'Durable vinyl sticker pack with die-cut shapes, waterproof laminate finish, and high UV resistance.',
    badge: 'Trending',
    options: {
      finishes: ['Matte Vinyl', 'Glossy Holographic', 'Clear Backing'],
      quantities: [50, 100, 250, 500, 1000],
    },
  },
  {
    id: 'prod-tote',
    name: 'Tote Bag',
    category: 'Promotional',
    priceRange: '$12.00 - $18.00',
    minPrice: 12.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeJ4SAMBNVXwYRbmbfL0YNxJLtCb9Oob0X-WuZ33zn6lvnGgmJ0BceiQRML7HeN21uPGVzSx57XpXziaA9ul3GPC-RPR1vJ7U9kJdc68SmS0NOlMyBQ8ZSH_-ZPam82A2iiTVB5awtmNi65Wlb0TeNGFknvsuwQzUh26yEMFNy3bwBofaGUNUMuPENk8BzJQP3wC5WGPR9gf692lWZUDq0rqO0yZiN6R9eKBYM7RS4tiXHY2TEOIyQ',
    description: '100% natural organic cotton canvas tote bag with reinforced handles and full-color screen print.',
    badge: 'Eco Friendly',
    options: {
      finishes: ['Natural Canvas', 'Black Canvas', 'Heavyweight Organic'],
      quantities: [25, 50, 100, 250, 500],
    },
  },
];

export default function ProductsSection({ onSelectProduct, onAddToCartDirect }: ProductsSectionProps) {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section id="products" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2 block">
            Printing Market
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Amazing <span className="text-indigo-600">Products</span> Are <br />
            Ready For You
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            Click any product to customize print specifications, upload your artwork, or calculate bulk pricing.
          </p>
        </div>

        {/* 4 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {initialProducts.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-2xl transition-all duration-300 group text-center flex flex-col justify-between relative"
            >
              {/* Product Badge */}
              {item.badge && (
                <span className="absolute top-4 left-4 z-10 bg-slate-900 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}

              <div>
                {/* Image Box */}
                <div 
                  onClick={() => onSelectProduct(item)}
                  className="bg-slate-50 rounded-2xl p-6 h-60 mb-6 flex items-center justify-center overflow-hidden relative cursor-pointer group-hover:bg-indigo-50/40 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                  />

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCartDirect(item);
                      }}
                      className="bg-white text-slate-900 px-3.5 py-2 rounded-full font-bold text-xs shadow-lg hover:bg-indigo-600 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>

                {/* Title & Category */}
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {item.category}
                </span>
                <h3 
                  onClick={() => onSelectProduct(item)}
                  className="font-extrabold text-xl text-slate-900 mb-2 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  {item.name}
                </h3>

                {/* Price */}
                <p className="text-indigo-600 font-black text-base mb-4">
                  {item.priceRange}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => onAddToCartDirect(item)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 gap-2.5">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveDot(dot)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeDot === dot ? 'w-8 bg-indigo-600' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Page ${dot + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
