'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  onSelectCategory: (categoryName: string) => void;
}

const services = [
  {
    id: 'apparel',
    title: 'Custom Apparel',
    subtitle: 'T-Shirts, Hoodies, Polos & Caps',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSvRw53ZDp7iCDW0qzgcTC09hwaqYUXfiIpp_DLl6N0zDLE-c1WIlH_ArA5fBIxiK7C9jCeJBC7VcLE76WfSrigue4Mx0NjdMROw_IvbkH6z0h_Zs2W7hsX11RqGsWkt_sVa_2rtj9Ka6vvx4tFXUlngoc-C9HAfe-yUSyi6Vt8TuHqD9G0etNHJG4WoBT3rgBxpbn3ATQ3zHo9ws-TkG-iw63hnMHF2HY2KDdqYwjycIXCw3NJeH',
    tags: ['Screen Print', 'Embroidery', 'DTG'],
    badge: 'Popular',
  },
  {
    id: 'stationery',
    title: 'Business Stationery',
    subtitle: 'Business Cards, Letterheads & Envelopes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmkMZDKFG7Vtk6n5FbbM8NhO4JPHW5WOWB7Ajr37ExAXk0L47VCa4aJgtymW63w-QvLVOETD4EsShOS4MP7sbcwDsDANzG9h3vLMRw9becoEUZZosJ0aD40mSMQ1NNhBO1kdB0QL9mNKD23IFHI4Fd0CJ-RyAUgUnqSI1OM28eV1b87nwQq8fvkutdrrWw9pGJZTBmDLd1BysdOfvr_zSnnIuyWTNCBkMY3vAxbvIV_Xj8FhG8Rvxm',
    tags: ['Foil Stamping', 'Spot UV', 'Textured Paper'],
    badge: 'Essential',
  },
  {
    id: 'packaging',
    title: 'Packaging & Labels',
    subtitle: 'Custom Boxes, Jars, Stickers & Bags',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Ylj73groQ5L2TIDkZEVCZUo1JEM5oVBY-xwdq7pUCXZHxPqsjxqp1jbC8M6YPnDG3TdNQgm6sg-dC6VmAUrp28QC8BojveO1BwOgo6MD0t2L2ercosdgiKhS-U45WS7UnYTWxWzPPhghUwe5kSc9HwKYut32W1zKmd_AaGIWxbMnTY3yeFzvzSaS_SFU6eBR7r_ROe8zZtIPb5RL_bq7cl38QhmTc7IBHZ1Rqm9nxfWPC0ezMuHS',
    tags: ['Corrugated', 'Rigid Boxes', 'Die-Cut Labels'],
    badge: 'Best Value',
  },
  {
    id: 'promotional',
    title: 'Promotional Items',
    subtitle: 'Bottles, Mugs, Notebooks & Swag Kits',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuihW_pUe9stC3071PxkFCybFiONj-Joq-OTe_GcElx3MEKgsREWjQjuImSsM2PcbMudIykONgtdXMM716DZ8Ru0dtfOPpYA-vjiB0te8iBBuiBzM3bhToAmIqf3VUbAXXLxhmFNOKGUZCUx8PT2tgok6FgBo652kvUN2Ci8UKa1vLEb-9NsrjpShyL631d6W_olAEswb5bw6VRgUYk9xdLaLqGHCypmw__8DXqOmvApifka6JgMpm',
    tags: ['Laser Engraved', 'Pad Print', 'Full Wrap'],
    badge: 'Corporate',
  },
];

export default function ServicesSection({ onSelectCategory }: ServicesSectionProps) {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section id="services" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2 block">
            Premier Design
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Premier One-Stop <br />
            Custom <span className="text-indigo-600">Print Solutions</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            Select a service category to configure instant pricing, material options, and order proofing.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => {
                setActiveDot(idx);
                onSelectCategory(item.title);
              }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group cursor-pointer border border-slate-100 flex flex-col items-center justify-between"
            >
              {/* Image Container */}
              <div className="w-full h-52 mb-6 flex items-center justify-center overflow-hidden bg-slate-50/60 rounded-2xl p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Carousel Pagination Dots Indicator */}
        <div className="flex justify-center mt-10 gap-2">
          {[0, 1, 2].map((dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveDot(dotIdx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeDot === dotIdx ? 'bg-indigo-600' : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
