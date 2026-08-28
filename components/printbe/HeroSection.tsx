'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewGallery: () => void;
}

export default function HeroSection({ onGetStarted, onViewGallery }: HeroSectionProps) {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden hero-gradient text-white">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 hero-pattern opacity-40 pointer-events-none" />

      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 text-white pr-0 lg:pr-6"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight drop-shadow-md">
              Printing <br />
              <span className="text-white underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-8">
                Company
              </span>
            </h1>

            <p className="text-lg lg:text-xl mb-8 text-white/95 max-w-lg leading-relaxed font-normal">
              Your premier partner for custom printing solutions. Quality, speed, and innovation delivered straight to your doorstep.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGetStarted}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-base transition shadow-xl shadow-indigo-950/30 flex items-center gap-2 border border-indigo-400/40 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center gap-3">
                {/* User Avatars */}
                <div className="flex -space-x-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxRnqsFxxJC3yPYvykWUeIFI3tJecopSYfzl10XZNgCIIxbjwvp7jvNhGqEVns40gd10tPOWuGIwKFqtCtUQ38klIzOJzLHFUHOTrQLlz-zNigs77qY_bekQHQzBWwZfDJKivPz1095jBlOJSd1W4H1UqPrLnRmBoDfXre_tzDC0Udm3agNwkojQSRL0_uY8ZN7bsycRWvefdObzXAvXhh5dz9qwoCZXlaTScZmeThcQfWTVk6uI9r"
                    alt="Satisfied Client"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvyw7yDYyDWXy1swZ6TXmGxv8DSm-oCu9Cr0671aQlw8KMJGl981sBVzQgKQ_-xDV0nm9jccZjfsEsvI815AlSF5szhtKuZBxrXbKoGJHQjTKWYkJCM9u0GVpBjg4wjCIZJQsoqC0ocCd6j15et1i6EXgIJuDUk0R8wxeGcx-sgC1iz4K4v0ZXLlVX8sNHjSmzUGZL6oRU9WxVful6PF3SEP1ngfcMd1UrUeFlLILbPpvsbkionfqg"
                    alt="Satisfied Client"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0xTl_0zzHiGRNCLSZiuhzrAiFT8T2Te26jqaBW9hnhxdeuTO7yXPcGv-ASugHvLm0uaJcRZjstzADo27rDPN6agb809aiZEfPzygY6XFFIM7-Xc0-9jfx9_8ZZCjottp3YObEJ8mKJPoduetHBupRkQISAtnGNinhl4nHFeHaDzFlsL6FqUDP-rZqvCWxBkw1wKJtwfxvX6wWsVQPkAFFeLtZu8W05yuht099HWUtK6kC_WHoe9cp"
                    alt="Satisfied Client"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                  />
                </div>

                <button
                  onClick={onViewGallery}
                  className="font-semibold text-white hover:text-emerald-200 transition-colors flex items-center text-sm group cursor-pointer"
                >
                  <span className="underline underline-offset-4 decoration-white/50 group-hover:decoration-emerald-200">View Gallery</span>
                  <ExternalLink className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-10 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-xs font-semibold text-white/90">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Fast Proofing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Bulk Savings</span>
              </div>
            </div>
          </motion.div>

          {/* Right Showcase Image Composition */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden p-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfjh90sExcRfDYSImAmQgvy4JnHa9v-8z9hHPkWtHGiVvqmpU-j3aFsCWZL5XWF9hAejCMD3F4Ej_QjuiJD3QoTy4OHKqQg1eTKa0vlEyfE4RlA9rrMWr6LPp6Cq_rfDvXNNLPtlcJSO9L7NiuTfzwaTJKm-I1GvhmiOya6popyQj7sodvOXGLCeL4Xn34f22MCAtnp4RBV1gjujMAZ6FfK0YFFDq3YmPJgpkSXxtW7EnQnTl1a52f"
                alt="Printing Products Display"
                className="w-full h-full object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-700"
              />
              

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
