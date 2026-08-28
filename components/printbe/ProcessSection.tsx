'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Upload, CheckCircle, Truck, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onLearnMoreBulk: () => void;
  onStartUpload: () => void;
}

export default function ProcessSection({ onLearnMoreBulk, onStartUpload }: ProcessSectionProps) {
  return (
    <section id="process" className="bg-[#0B1120] pt-24 pb-28 text-white mt-8 curved-bg relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20 max-w-xl mx-auto">
          <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-3 block">
            Simple 3-Step Ordering
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Elimi Print Makes It Easier <br />
            With 03 Steps
          </h2>
          <p className="text-slate-400 text-sm">
            From design upload to nationwide delivery, experience hassle-free custom printing.
          </p>
        </div>

        {/* 3 Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-24 relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-0.5 bg-slate-800 z-0" />

          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center cursor-pointer group"
            onClick={onStartUpload}
          >
            <div className="w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center text-slate-950 mb-6 shadow-xl shadow-emerald-400/20 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">
              1. Upload Your Design
            </h3>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Upload vector graphics, logos, or design artwork. Instant automatic format check & CMYK color conversion.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative z-10 flex flex-col items-center group"
          >
            <div className="w-24 h-24 bg-pink-400 rounded-full flex items-center justify-center text-slate-950 mb-6 shadow-xl shadow-pink-400/20 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-pink-300 transition-colors">
              2. Approve the Proof
            </h3>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Review our high-resolution 3D digital proof. Approve bleed lines, paper weights, and finishing details.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 flex flex-col items-center group"
          >
            <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center text-slate-950 mb-6 shadow-xl shadow-amber-400/20 group-hover:scale-110 transition-transform duration-300">
              <Truck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">
              3. We Print & Ship
            </h3>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              We execute precision offset & digital printing, quality check each item, and ship securely with live tracking.
            </p>
          </motion.div>
        </div>

        {/* Promo Banner Block */}
        <motion.div 
          id="bulk-discount"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/90 rounded-3xl p-8 md:p-12 border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none" />

          {/* Left Text */}
          <div className="w-full md:w-1/2 relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 text-white leading-tight">
              Ready To Buy In Bulk & <br />
              <span className="text-indigo-400">Save Up To 30%?</span>
            </h3>

            <p className="text-slate-400 mb-8 max-w-md text-sm sm:text-base leading-relaxed">
              Scale your corporate stationery, event swag, or retail packaging. Tiered volume discounts automatically apply at checkout for qualifying quantities.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLearnMoreBulk}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-lg shadow-indigo-900/40 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Learn More & Calculate Savings</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10">
            <div className="relative group max-w-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1LSbuSdsvyupryCiMxlCe552i3ij-ADw8v-M0OuJAOH_cLzgQb2ulAbNMVJwz4i_fMmRNmexjzY3psMJttD1kZDrxlb98fbluMeR59nsK7CgaO5sChvcpww2xZn4WFCvO5yX7ezQiMtA4mW7UT8hOXPCMYeh_Kaemg1fRQChUpk1k0BBmKpn0h92Phel052QytxWeTwvc_GZlg6HqBxrT_iHdqh3E3Z7twtFDp0uSIapUCFINBUuU"
                alt="Bulk Printing Brochures"
                className="max-w-full h-auto max-h-64 object-contain rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500 drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
