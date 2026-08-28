'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Bell, Bot } from 'lucide-react';
import DesktopNavMenu from '@/components/DesktopNavMenu';
import { MobileNavigationMenu } from '@/components/MobileNavigationMenu';

interface ElimiHeaderProps {
  className?: string;
  isSticky?: boolean;
}

export default function ElimiHeader({ className = '', isSticky = true }: ElimiHeaderProps) {
  return (
    <header className={`${isSticky ? 'sticky top-0 z-40' : 'relative z-30'} w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all ${className}`}>
      {/* BEGIN: Desktop Navigation Bar */}
      <div className="hidden lg:flex w-full max-w-6xl mx-auto items-center justify-between px-6 py-3 gap-4">
        {/* Buy Button */}
        <Link
          href="/shop"
          className="bg-white hover:bg-slate-50 text-slate-900 font-semibold py-2.5 px-6 sm:px-8 text-xs sm:text-sm rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-102 cursor-pointer shrink-0 border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Buy</span>
        </Link>

        {/* Center Desktop Navigation Menu (Shadcn UI Light Version) */}
        <DesktopNavMenu />

        {/* Rent Button */}
        <Link
          href="/protocol"
          className="bg-white hover:bg-slate-50 text-slate-900 font-semibold py-2.5 px-6 sm:px-8 text-xs sm:text-sm rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-102 cursor-pointer shrink-0 border border-slate-200"
        >
          <span>Rent</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
      {/* END: Desktop Navigation Bar */}

      {/* BEGIN: Mobile Top Navigation Bar */}
      <div className="lg:hidden w-full px-5 py-3.5 flex items-center justify-between">
        <MobileNavigationMenu />
        <Link href="/" className="flex items-center">
          <div className="relative w-8 h-8 mr-2">
            <Image src="/assets/icons/ELIMI_LOGO.svg" alt="Elimi Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col -space-y-0.5">
            <span className="text-[20px] font-black text-[#0D52FF] leading-none tracking-tight font-sans">ELIMI</span>
            <span className="text-[12px] text-gray-400 italic font-serif leading-none">Protocol</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-[#0D52FF] relative p-1.5 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 stroke-[1.5]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* Elimi AI Assistant (Monica) Trigger in Header */}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-elimi-ai'));
              }
            }}
            className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#0D52FF] bg-gray-50 shrink-0 cursor-pointer hover:scale-105 transition-all shadow-sm group"
            title="Chat with Monica (Elimi AI Assistant)"
            aria-label="Open Elimi AI Assistant (Monica)"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtR-s7uWHS8VUe3_jtGxzb-bi7WM0NQRTIWFlGpBEQ8LEIKXXlbBlObvodO21mgRJgwpSua5QI0R4LD-tfvzZ-KpyM-TmQUMyYC0GqB7gp7CIStN4Mcxn0BYLxBzl3x_7KQ4X_7BTG9c0EOegLs6NPEopDeWJD1IVFwEAG3W3J6V_vsvY6vFIUZsXaE-oLTFYjgkoQ09b04i6Pl9OCXlUGZTyHVc4Rxn7E4y3UBs-4pG9IA8t9itY-" 
              alt="Monica - Elimi AI Assistant" 
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#0D52FF] rounded-full flex items-center justify-center text-white border border-white shadow-xs">
              <Bot className="w-2.5 h-2.5" />
            </span>
          </button>
        </div>
      </div>
      {/* END: Mobile Top Navigation Bar */}
    </header>
  );
}
