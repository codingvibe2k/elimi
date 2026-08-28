'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Box, Truck, ShieldCheck, Clock } from 'lucide-react';

interface FeaturesSectionProps {
  onLearnMore?: () => void;
}

export default function FeaturesSection({ onLearnMore }: FeaturesSectionProps) {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left Column: Image Composition & Experience Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Packaging Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Ylj73groQ5L2TIDkZEVCZUo1JEM5oVBY-xwdq7pUCXZHxPqsjxqp1jbC8M6YPnDG3TdNQgm6sg-dC6VmAUrp28QC8BojveO1BwOgo6MD0t2L2ercosdgiKhS-U45WS7UnYTWxWzPPhghUwe5kSc9HwKYut32W1zKmd_AaGIWxbMnTY3yeFzvzSaS_SFU6eBR7r_ROe8zZtIPb5RL_bq7cl38QhmTc7IBHZ1Rqm9nxfWPC0ezMuHS"
                  alt="Custom Box Packaging"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Stacked Secondary Image Overlay */}
              <div className="absolute -bottom-10 -right-6 lg:-right-8 w-2/3 z-20 rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-slate-50 hidden sm:block">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Ylj73groQ5L2TIDkZEVCZUo1JEM5oVBY-xwdq7pUCXZHxPqsjxqp1jbC8M6YPnDG3TdNQgm6sg-dC6VmAUrp28QC8BojveO1BwOgo6MD0t2L2ercosdgiKhS-U45WS7UnYTWxWzPPhghUwe5kSc9HwKYut32W1zKmd_AaGIWxbMnTY3yeFzvzSaS_SFU6eBR7r_ROe8zZtIPb5RL_bq7cl38QhmTc7IBHZ1Rqm9nxfWPC0ezMuHS"
                  alt="Packaging Mockups"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Badge: 24+ Years of Experience */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-6 -left-4 sm:-left-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 z-30 flex flex-col items-center min-w-[170px]"
              >
                <span className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight">24+</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 mt-1">Years of Experience</span>
                <span className="text-[10px] text-slate-400 font-medium">In Custom Printing</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Text Content & Key Features */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 mt-10 lg:mt-0"
          >
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-3 block">
              Business Design
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Reason To <span className="text-indigo-600">Get Printing</span> Started With Us
            </h2>

            <p className="text-slate-600 mb-10 text-base sm:text-lg leading-relaxed font-normal">
              We are committed to delivering top-notch printing solutions tailored to your business needs, ensuring speed, durability, and vibrant colors across every print item.
            </p>

            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="flex items-start gap-5 group">
                <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-indigo-100">
                  <Box className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    High Quality Materials
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    High Quality Materials engineered for extreme color fidelity, crisp detail, and long-lasting durability.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-5 group">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-blue-100">
                  <Truck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Fast Shipping & Delivery
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Fast Shipping and reliable order dispatch with real-time tracking so your event or marketing launch never waits.
                  </p>
                </div>
              </div>

              {/* Extra Perks */}
              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-100 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>24/7 Digital Proofing</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
