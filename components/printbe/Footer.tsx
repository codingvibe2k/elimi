'use client';

import React from 'react';
import { Phone, Mail, MapPin, Printer, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl">
                E
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Elimi Print</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Your premier partner for custom printing solutions in Burundi, eco-friendly apparel, high-finish business stationery, and customized packaging boxes.
            </p>
            <div className="pt-2 text-xs space-y-2">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-400" /> +257 64 44 45 46</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-400" /> elimiofficiel@gmail.com</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-400" /> Elimi Print HQ, Bujumbura, Burundi</p>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Print Services</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Custom Apparel & Hoodies</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Business Cards & Stationery</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Custom Packaging Boxes</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Die-Cut Vinyl Stickers</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Promotional Mugs & Swag</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">3-Step Order Process</a></li>
              <li><a href="#bulk-discount" className="hover:text-white transition-colors">Bulk Volume Savings</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Print Marketplace</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artwork Upload Guidelines</a></li>
            </ul>
          </div>

          {/* Col 4: Quality Guarantee */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quality First</h4>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> CMYK Proofing
              </div>
              <p className="text-slate-400 text-[11px] leading-snug">
                Every file is manually inspected by our prepress team before printing.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Elimi Print Custom Printing Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Color Proof Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
