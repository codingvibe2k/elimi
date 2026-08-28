"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ElimiHeader from "@/components/ElimiHeader";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe,
  Mail,
  Phone,
  Sparkles,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Search,
  PenTool,
  Layers,
  Zap,
  Play,
  X,
  Send,
  MessageSquare,
  Award,
  Calendar,
  Check,
} from "lucide-react";

interface ServiceDetail {
  id: string;
  name: string;
  category: string;
  number: string;
  title: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string };
  deliverables: string[];
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "strategy",
    name: "Strategy",
    category: "Digital Strategy",
    number: "01",
    title: "Omnichannel Digital Strategy",
    description:
      "Data-driven digital roadmaps designed to position your brand at the forefront of your industry, identifying high-yield opportunities and customer journeys.",
    highlights: [
      "Competitor Intelligence & Auditing",
      "Audience Persona Mapping",
      "Multi-Channel Budget Allocation",
      "Funnel Architecture",
    ],
    metrics: { label: "Average ROI Uplift", value: "+240%" },
    deliverables: [
      "Quarterly Growth Roadmap",
      "Channel Strategy Blueprint",
      "KPI Tracking Framework",
    ],
  },
  {
    id: "content",
    name: "Content Creation",
    category: "Creative Production",
    number: "02",
    title: "High-Impact Content Creation",
    description:
      "Compelling visual and written storytelling that captures audience attention, sparks organic virality, and articulates your unique value proposition.",
    highlights: [
      "High-Production Video & Reels",
      "Interactive Visual Assets",
      "Thought-Leadership Copywriting",
      "Brand Asset Libraries",
    ],
    metrics: { label: "Engagement Rate Increase", value: "4.8x" },
    deliverables: [
      "Monthly Asset Production Pack",
      "Copywriting & Script Bank",
      "Visual Brand Guidelines",
    ],
  },
  {
    id: "seo",
    name: "SEO",
    category: "Search Optimization",
    number: "03",
    title: "Technical & Organic SEO",
    description:
      "Dominate organic search with comprehensive technical health audits, high-intent keyword mapping, authoritative link building, and content optimization.",
    highlights: [
      "Core Web Vitals Optimization",
      "High-Intent Semantic Keywords",
      "Authoritative Editorial Backlinks",
      "Local & Global Search Dominance",
    ],
    metrics: { label: "Organic Traffic Growth", value: "+310%" },
    deliverables: [
      "Technical SEO Audit",
      "Keyword Matrix & Content Plan",
      "Monthly Ranking Reports",
    ],
  },
  {
    id: "social",
    name: "Social Media Management",
    category: "Social Growth",
    number: "04",
    title: "Social Media Management",
    description:
      "Transform your digital footprint with data-backed content strategies, continuous community engagement, and multi-channel campaign orchestration designed to turn followers into loyal brand advocates.",
    highlights: [
      "End-to-End Content Calendars",
      "Active Community Moderation",
      "Influencer & Creator Partnerships",
      "Real-Time Sentiment Monitoring",
    ],
    metrics: { label: "Audience Reach Multiplier", value: "5.2x" },
    deliverables: [
      "30-Day Content Scheduling",
      "Community Response Engine",
      "Weekly Analytics Reports",
    ],
  },
  {
    id: "design",
    name: "Design",
    category: "Brand Experience",
    number: "05",
    title: "UI/UX & Brand Design",
    description:
      "Bespoke digital design systems, high-converting landing page layouts, and modern visual identities that leave an unforgettable impression.",
    highlights: [
      "Conversion-Focused Landing Pages",
      "Design Systems & Component Kits",
      "Interactive Prototypes",
      "Motion & Graphic Assets",
    ],
    metrics: { label: "Conversion Lift", value: "+68%" },
    deliverables: [
      "Figma Design Files",
      "Design System Library",
      "Interactive Web Prototypes",
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    category: "Data & Insights",
    number: "06",
    title: "Advanced Analytics & Attribution",
    description:
      "Eliminate guesswork with full-funnel attribution models, custom real-time dashboards, and behavioral telemetry that pinpoint exactly where revenue comes from.",
    highlights: [
      "Multi-Touch Attribution",
      "GA4 & Server-Side Tagging",
      "Custom Executive Dashboards",
      "Cohort Retention Analysis",
    ],
    metrics: { label: "Attribution Accuracy", value: "99.4%" },
    deliverables: [
      "Live BI Dashboard Setup",
      "Tag Management Audit",
      "Weekly Executive Summaries",
    ],
  },
  {
    id: "email",
    name: "Email Marketing",
    category: "Lifecycle Retention",
    number: "07",
    title: "Lifecycle & Email Marketing",
    description:
      "Hyper-personalized automated email workflows, SMS sequences, and VIP retention campaigns that maximize customer lifetime value (LTV) on autopilot.",
    highlights: [
      "Behavior-Triggered Drip Series",
      "Predictive Segmentation",
      "Dynamic Content Personalization",
      "Deliverability Optimization",
    ],
    metrics: { label: "Average Open Rate", value: "42.6%" },
    deliverables: [
      "Automated Flow Blueprints",
      "Custom HTML Email Templates",
      "A/B Testing Framework",
    ],
  },
  {
    id: "performance",
    name: "Performance Ads",
    category: "Paid Acquisition",
    number: "08",
    title: "Paid Media & PPC Campaigns",
    description:
      "High-velocity ad creative testing, algorithmic bidding management, and cross-platform campaign scaling across Google Ads, Meta, LinkedIn, and TikTok.",
    highlights: [
      "Algorithmic Bid Strategy",
      "High-Velocity Creative Testing",
      "Omnichannel Retargeting Loops",
      "Strict ROAS Safeguards",
    ],
    metrics: { label: "Target ROAS Achieved", value: "4.2x" },
    deliverables: [
      "Ad Creative Variations",
      "Campaign Structure Setup",
      "Daily Spend Optimization",
    ],
  },
];

const CAPABILITIES_CARDS = [
  {
    id: "video-marketing",
    title: "Video Marketing & Campaigns",
    subtitle:
      "High-conversion short-form Reels, TikToks, YouTube strategies, and video ad funnels engineered for maximum ROI.",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
    tag: "Video Marketing",
    badgeText: "$450/mo",
    badges: ["⭐ 4.9", "Viral Scripting", "High ROAS"],
    buttonText: "Book now",
    accent: "#3b82f6",
  },
  {
    id: "video-production",
    title: "Video & Commercial Production",
    subtitle:
      "Studio-grade 4K/8K cinematography, brand documentaries, high-impact TV commercials, and product shoots.",
    image:
      "https://images.unsplash.com/photo-1579632652988-699ee21786d6?auto=format&fit=crop&w=600&q=80",
    tag: "Video Production",
    badgeText: "$1.2k",
    badges: ["⭐ 5.0", "Cinematic 4K", "Full Edit"],
    buttonText: "Book now",
    accent: "#8b5cf6",
  },
  {
    id: "audio-production",
    title: "Audio & Music Production",
    subtitle:
      "Professional audio mastering, sonic branding, custom jingles, sound design, and broadcast mixing.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
    tag: "Audio Production",
    badgeText: "$290",
    badges: ["⭐ 4.8", "Dolby Atmos", "Mix & Master"],
    buttonText: "Book now",
    accent: "#10b981",
  },
  {
    id: "podcast-voiceover",
    title: "Podcast & Voiceover Studio",
    subtitle:
      "Full-service podcast production, global voiceover talent casting, noise cancellation, and RSS distribution.",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80",
    tag: "Podcast & Audio",
    badgeText: "$390",
    badges: ["⭐ 4.9", "HQ Recording", "Vocal Casting"],
    buttonText: "Book now",
    accent: "#f59e0b",
  },
];

export default function DigitalMarketingPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("social");
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Social Media Management",
    budget: "$5,000 - $15,000 / mo",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeService =
    SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[3];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setIsContactModalOpen(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "Social Media Management",
      budget: "$5,000 - $15,000 / mo",
      message: "",
    });
  };

  return (
    <div
      id="digital-marketing-root"
      className="min-h-screen bg-[#0b0f17] text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white"
    >
      {/* Home Page Navigation Header */}
      <ElimiHeader />

      {/* Hero Section */}
      <section className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] w-full flex items-center overflow-hidden pt-12 pb-20 px-6 sm:px-12">
        {/* Background Image of Professional Business Woman with Tablet */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1684225764999-3597a8da10ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Smiling Digital Marketing Director"
            fill
            priority
            className="object-cover object-[center_28%] sm:object-[center_20%]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle cinematic gradient overlays to guarantee pristine text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111417] via-transparent to-black/40" />
        </div>

        {/* Hero Content on the Left */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              Digital Marketing <br />
              <span className="font-extrabold">Services</span>
            </h1>

            {/* Blue Badge matching exact design */}
            <div className="inline-flex items-center gap-2 bg-blue-600/90 hover:bg-blue-600 backdrop-blur-md text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full shadow-sm transition-all">
              <span className="w-2 h-2 rounded-full bg-blue-200 animate-pulse" />
              Award Winning Digital Agency & Growth Partner
            </div>
          </div>
        </div>
      </section>

      {/* Main Overlapping Content Container (White Card) */}
      <main className="relative z-20 -mt-16 sm:-mt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full pb-16">
        {/* The Large Rounded White Sheet */}
        <div
          id="services-overview"
          className="bg-white text-neutral-900 rounded-[28px] sm:rounded-[36px] shadow-2xl p-6 sm:p-10 md:p-12 transition-all duration-300 border border-neutral-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Interactive Services Menu */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-neutral-200/80 pb-6 lg:pb-0 lg:pr-6 flex flex-col justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 mb-5">
                  Core Solutions
                </p>

                <ul className="space-y-3 sm:space-y-3.5">
                  {SERVICES_DATA.map((service) => {
                    const isSelected = service.id === selectedServiceId;
                    return (
                      <li key={service.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedServiceId(service.id)}
                          className={`w-full text-left flex items-center gap-3 py-1.5 px-2 rounded-lg text-sm sm:text-[15px] font-medium transition-all group cursor-pointer ${
                            isSelected
                              ? "text-blue-600 font-bold translate-x-1"
                              : "text-neutral-500 hover:text-neutral-900 hover:translate-x-0.5"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              isSelected
                                ? "bg-blue-600 scale-125"
                                : "bg-neutral-300 group-hover:bg-blue-400"
                            }`}
                          />
                          <span>{service.name}</span>
                          {isSelected && (
                            <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-600" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Quick stats mini tag */}
              <div className="mt-8 pt-6 border-t border-neutral-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">
                      98.6% Client Retention
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Over 350+ enterprise rollouts
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column: Selected Service Showcase */}
            <div className="lg:col-span-4 flex flex-col justify-between py-2">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {activeService.category}
                  </span>
                  <span className="text-xs text-neutral-300">•</span>
                  <span className="text-xs font-semibold text-neutral-400">
                    {activeService.number}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                  {activeService.title}
                </h2>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                  {activeService.description}
                </p>

                {/* Key feature pills */}
                <div className="space-y-2 mb-6">
                  {activeService.highlights.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Metric */}
              <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      service: activeService.title,
                    }));
                    setIsContactModalOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-blue-600/20 transition-all active:scale-95 cursor-pointer"
                >
                  Explore Service
                </button>

                <div className="text-right">
                  <p className="text-lg font-extrabold text-blue-600 leading-none">
                    {activeService.metrics.value}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    {activeService.metrics.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Dark Hero Card "Let's grow your Brand Together!" */}
            <div
              id="cta-banner"
              className="lg:col-span-5 bg-[#0a0c0e] text-white rounded-[24px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-neutral-800/80 group"
            >
              {/* Background Image with heavy black overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
                  alt="Creative Workspace"
                  fill
                  className="object-cover opacity-[0.08] mix-blend-luminosity filter blur-[1px] group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0a0c0e]/95" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
              </div>

              {/* Subtle background glow & decorative tablet preview mockup */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none z-10" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/15 rounded-full blur-2xl pointer-events-none z-10" />

              {/* Graphic Mockup Element in background */}
              <div className="absolute right-[-10%] top-[25%] opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none hidden sm:block z-10">
                <div className="w-56 h-64 border-4 border-neutral-700 rounded-2xl bg-neutral-900 shadow-2xl rotate-12 p-3 flex flex-col justify-between">
                  <div className="w-12 h-2 bg-neutral-700 rounded-full mb-3" />
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-neutral-800 rounded-lg" />
                    <div className="w-3/4 h-3 bg-neutral-800 rounded" />
                    <div className="w-1/2 h-3 bg-neutral-800 rounded" />
                  </div>
                  <div className="w-full h-8 bg-neutral-800/80 rounded-md" />
                </div>
              </div>

              {/* Top Text Content */}
              <div className="relative z-10 mb-8 max-w-sm">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight mb-3">
                  Let’s grow your <br />
                  <span className="text-blue-400">Brand Together!</span>
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Tailored multi-channel strategies and high-converting
                  marketing funnels engineered to scale your audience and
                  maximize long-term ROI.
                </p>
              </div>

              {/* Bottom CTA Button */}
              <div className="relative z-10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: "Capabilities Together" / "Creative Solutions" */}
        <section id="capabilities-section" className="mt-16 sm:mt-20">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Video & Audio Production
              </h2>
              <span className="bg-blue-950/70 text-blue-400 border border-blue-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                Creative Studio
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="text-xs sm:text-sm text-neutral-400 hover:text-white border border-neutral-800 hover:border-blue-500/40 bg-neutral-900/80 px-4 py-2 rounded-full transition-all cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          {/* 4-Card Grid matching the exact design reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES_CARDS.map((card) => (
              <div
                key={card.id}
                className="relative overflow-hidden rounded-[28px] bg-neutral-900 border border-neutral-800/60 min-h-[480px] flex flex-col justify-end p-5 group transition-all duration-300 shadow-lg hover:border-blue-500/30"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Bottom-heavy dark gradient overlay matching the photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-black/60 to-transparent" />
                </div>

                {/* Floating Bookmark icon in the top right with glassmorphism */}
                <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-blue-600/80 transition-colors text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-none stroke-current"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                {/* Card Content Overlay */}
                <div className="relative z-10 w-full flex flex-col">
                  {/* Title */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-blue-300 transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  {/* Subtitle Description */}
                  <p className="text-neutral-300 text-xs sm:text-xs mt-2 leading-relaxed line-clamp-3">
                    {card.subtitle}
                  </p>

                  {/* Badges / Pill Tags matching the photo */}
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {card.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-950/60 backdrop-blur-sm text-blue-200 text-[10px] font-medium px-2.5 py-1 rounded-full border border-blue-500/20"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* White "Book now" Style Button */}
                  <button
                    type="button"
                    onClick={() => window.open("https://wa.me/", "_blank")}
                    className="mt-4.5 w-full bg-white hover:bg-blue-50 text-neutral-950 font-bold py-3 rounded-full text-xs sm:text-sm tracking-tight transition-all shadow-md hover:shadow-lg text-center cursor-pointer active:scale-[0.98]"
                  >
                    Book now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* Contact & Consultation Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111722] border border-neutral-700 rounded-[28px] max-w-xl w-full p-6 sm:p-8 relative shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={resetForm}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-blue-950/80 border border-blue-500/40 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Proposal Request Received!
                </h3>
                <p className="text-neutral-300 text-sm max-w-md mx-auto mb-6">
                  Thank you for reaching out to Migital. One of our Senior
                  Digital Strategists will analyze your requirements and get
                  back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-full text-sm transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Get In Touch
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                    Start Your Growth Journey
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                    Tell us about your project or current bottlenecks. We’ll
                    craft a custom growth plan.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Sarah Jenkins"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="sarah@company.com"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Apex Brands Ltd."
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Primary Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Estimated Monthly Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="$2,500 - $5,000 / mo">
                        $2,500 - $5,000 / mo
                      </option>
                      <option value="$5,000 - $15,000 / mo">
                        $5,000 - $15,000 / mo
                      </option>
                      <option value="$15,000 - $50,000 / mo">
                        $15,000 - $50,000 / mo
                      </option>
                      <option value="$50,000+ / mo">
                        $50,000+ / mo (Enterprise)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Project Goals & Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your goals, current challenges, target timelines..."
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-full text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting Proposal Request...</span>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
