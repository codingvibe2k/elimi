"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  Sun,
  Moon,
  Cloud,
  ShoppingBag,
  ArrowUpRight,
  MapPin,
  Copy,
  CheckCircle2,
  Briefcase,
  Heart,
  Bookmark,
  Share2,
  Menu,
  Home as HomeIcon,
  Wallet,
  ChevronDown,
  Bell,
  House,
  Car,
  HousePlus,
  MonitorPlay,
  PrinterCheck,
  UsersRound,
  Brush,
  Bot,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FourPillarsSection from "@/components/FourPillarsSection";
import HowElimiWorksSection from "@/components/HowElimiWorksSection";
import ElimiNumbersSection from "@/components/ElimiNumbersSection";
import { MobileNavigationMenu } from "@/components/MobileNavigationMenu";
import DesktopNavMenu from "@/components/DesktopNavMenu";

const heroSlides = [
  {
    id: "protocol",
    subtitle: (
      <>
        PROFESSIONALISM.
        <br className="lg:hidden" />
        PRECISION. PRESENCE.
      </>
    ),
    title: (
      <>
        Excellence <br />
        Beyond <br />
        <span className="text-[#0D52FF]">Expectations.</span>
      </>
    ),
    description:
      "ELIMI Protocol delivers exceptional hospitality and seamless event experiences with elegance, precision, and unmatched care.",
    ctaText: "Explore Our Services",
    ctaLink: "#pillars",
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAG8JHQdJflsaywqyMP6Za8Hj1vZ8yGaKEgmqnMn5ruzIpd8pc4ugb7CwrXuHdbooHVlWcsGoMo4McSMU6aE5a-AnK5EG9mfTQOCaWPcRfVSmhDXyBxumfC6PcO8bgNrirIqYaU8RzYlqI9ouMz6lkIl2svwb5sAVNFQxll3mwf6K95xC59R3C8OhA5CdbHEJUMZe7BKgtXMy_jApDD6g199bIV0Icif6jL4ufDRIbVArB2LFaw_3R7",
  },
  {
    id: "shop",
    subtitle: "STYLE. ELEGANCE. QUALITY.",
    title: (
      <>
        Premium <br />
        Shopping <br />
        <span className="text-[#0D52FF]">Experience.</span>
      </>
    ),
    description:
      "Discover curated collections of premium fashion and lifestyle products from top brands.",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    bgImage: "/assets/shop/hero-showcase.jpg",
  },
  {
    id: "cars",
    subtitle: "LUXURY. SPEED. COMFORT.",
    title: (
      <>
        Drive <br />
        Your <br />
        <span className="text-[#0D52FF]">Dream.</span>
      </>
    ),
    description:
      "Rent or buy top-tier luxury and performance vehicles for any occasion with unmatched service.",
    ctaText: "View Cars",
    ctaLink: "/cars",
    bgImage: "/assets/shop/mercedes-vclass.webp",
  },
  {
    id: "houses",
    subtitle: "SPACE. LIVING. COMFORT.",
    title: (
      <>
        Find <br />
        Your <br />
        <span className="text-[#0D52FF]">Home.</span>
      </>
    ),
    description:
      "Explore luxury villas, modern apartments, and comfortable homes tailored to your lifestyle.",
    ctaText: "Explore Houses",
    ctaLink: "/houses",
    bgImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
  },
  {
    id: "media",
    subtitle: "VISION. IMPACT. CREATIVITY.",
    title: (
      <>
        Capture <br />
        The <br />
        <span className="text-[#0D52FF]">Moment.</span>
      </>
    ),
    description:
      "Professional media, photography, and video production services for unforgettable events and branding.",
    ctaText: "See Media",
    ctaLink: "/media",
    bgImage: "/assets/media/media_hero_presenter.jpg",
  },
  {
    id: "printbe",
    subtitle: "DESIGN. PRINT. DELIVER.",
    title: (
      <>
        Bring <br />
        Ideas to <br />
        <span className="text-[#0D52FF]">Life.</span>
      </>
    ),
    description:
      "High-quality printing services, branding materials, and promotional items for your business.",
    ctaText: "Visit PrintBe",
    ctaLink: "/printbe",
    bgImage: "/assets/printbe/rollup-banner.jpg",
  },
  {
    id: "nails",
    subtitle: "BEAUTY. CARE. PERFECTION.",
    title: (
      <>
        Elevate <br />
        Your <br />
        <span className="text-[#0D52FF]">Look.</span>
      </>
    ),
    description:
      "Expert nail care, spa treatments, and beauty services for a flawless, polished appearance.",
    ctaText: "Book Nails",
    ctaLink: "/nails",
    bgImage: "/assets/shop/cat_beauty.jpg",
  },
];

export default function Home() {
  const pathname = usePathname();
  const [greeting, setGreeting] = useState("Hello");
  const [Icon, setIcon] = useState(() => Sun);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      requestAnimationFrame(() => {
        if (hour < 12) {
          setGreeting("Good Morning");
          setIcon(() => Sun);
        } else if (hour < 18) {
          setGreeting("Good Afternoon");
          setIcon(() => Cloud);
        } else {
          setGreeting("Good Evening");
          setIcon(() => Moon);
        }
      });
    };
    updateGreeting();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Hero Section Container */}
      <div className="p-2 sm:p-4 lg:p-5 flex justify-center w-full h-[750px] lg:h-[900px] min-h-[650px] lg:min-h-[900px]">
        <main className="relative w-full max-w-[1400px] h-full rounded-[2rem] sm:rounded-5xl overflow-hidden shadow-2xl bg-gray-900">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-gray-900">
            <AnimatePresence>
              <motion.img
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.8, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                src={heroSlides[currentSlide].bgImage}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent"></div>
          </div>

          {/* BEGIN: Top Navigation Bar */}
          <nav className="hidden lg:flex absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] max-w-5xl z-20 items-center justify-between gap-2 sm:gap-4">
            {/* Buy Button */}
            <Link
              href="/shop"
              className="bg-white hover:bg-slate-50 text-slate-900 font-semibold py-2.5 px-6 sm:px-8 text-xs sm:text-sm rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-102 cursor-pointer shrink-0 border border-white/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Buy</span>
            </Link>

            {/* Center Desktop Navigation Menu (Shadcn UI Light Version) */}
            <DesktopNavMenu />

            {/* Rent Button */}
            <Link
              href="/houses"
              className="bg-white hover:bg-slate-50 text-slate-900 font-semibold py-2.5 px-6 sm:px-8 text-xs sm:text-sm rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-102 cursor-pointer shrink-0 border border-white/60"
            >
              <span>Rent</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </nav>
          {/* END: Top Navigation Bar */}

          {/* BEGIN: Mobile Top Navigation Bar */}
          <nav className="lg:hidden relative w-full bg-white px-5 py-4 flex items-center justify-between z-30 shadow-sm">
            <MobileNavigationMenu />
            <div className="flex items-center">
              <div className="relative w-8 h-8 mr-2">
                <Image
                  src="/assets/icons/ELIMI_LOGO.svg"
                  alt="Elimi Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col -space-y-0.5">
                <span className="text-[20px] font-black text-[#0D52FF] leading-none tracking-tight font-sans">
                  ELIMI
                </span>
                <span className="text-[12px] text-gray-400 italic font-serif leading-none">
                  Protocol
                </span>
              </div>
            </div>
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
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-elimi-ai"));
                  }
                }}
                className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#0D52FF] bg-gray-50 shrink-0 cursor-pointer hover:scale-105 transition-all shadow-sm group"
                title="Chat with Monica (Elimi AI Assistant)"
                aria-label="Open Elimi AI Assistant (Monica)"
              >
                <img
                  src="https://unsplash.com/photos/womans-face-xOjzehJ49Hk"
                  alt="Monica - Elimi AI Assistant"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#0D52FF] rounded-full flex items-center justify-center text-white border border-white shadow-xs">
                  <Bot className="w-2.5 h-2.5" />
                </span>
              </button>
            </div>
          </nav>
          {/* END: Mobile Top Navigation Bar */}

          {/* BEGIN: Left Sidebar Quick Navigation (All Navigation Icons + Monica Bot in the Middle) */}
          <aside className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 glass rounded-full p-2 hidden md:flex flex-col gap-2.5 shadow-xl border border-white/40">
            {/* 1. Home */}
            <Link
              href="/"
              title="Home"
              aria-label="Home"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                pathname === "/"
                  ? "bg-[#0D52FF] text-white shadow-md scale-105"
                  : "text-slate-800 hover:bg-white/80 hover:text-[#0D52FF]"
              }`}
            >
              <House className="w-5 h-5" />
            </Link>

            {/* 2. Shop */}
            <Link
              href="/shop"
              title="Shop"
              aria-label="Shop"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                pathname === "/shop"
                  ? "bg-[#0D52FF] text-white shadow-md scale-105"
                  : "text-slate-800 hover:bg-white/80 hover:text-[#0D52FF]"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>

            {/* 3. Cars */}
            <Link
              href="/cars"
              title="Cars"
              aria-label="Cars"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                pathname === "/cars"
                  ? "bg-[#0D52FF] text-white shadow-md scale-105"
                  : "text-slate-800 hover:bg-white/80 hover:text-[#0D52FF]"
              }`}
            >
              <Car className="w-5 h-5" />
            </Link>

            {/* 4. Houses */}
            <Link
              href="/houses"
              title="Houses"
              aria-label="Houses"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                pathname === "/houses"
                  ? "bg-[#0D52FF] text-white shadow-md scale-105"
                  : "text-slate-800 hover:bg-white/80 hover:text-[#0D52FF]"
              }`}
            >
              <HousePlus className="w-5 h-5" />
            </Link>

            {/* IN THE MIDDLE: Monica - Elimi AI Assistant Trigger with Bot Icon */}
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-elimi-ai"));
                }
              }}
              title="Monica • Elimi AI Assistant"
              aria-label="Monica • Elimi AI Assistant"
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#0D52FF] shadow-md my-0.5 cursor-pointer hover:scale-110 transition-transform group"
            >
              <img
                alt="Monica - Elimi AI Assistant"
                className="w-full h-full object-cover"
                src="https://unsplash.com/photos/womans-face-xOjzehJ49Hk"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#0D52FF] rounded-full flex items-center justify-center text-white border border-white shadow-xs">
                <Bot className="w-2.5 h-2.5" />
              </span>
            </button>

            {/* 5. Media */}
            <Link
              href="/media"
              title="Media"
              aria-label="Media"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                pathname === "/media"
                  ? "bg-[#0D52FF] text-white shadow-md scale-105"
                  : "text-slate-800 hover:bg-white/80 hover:text-[#0D52FF]"
              }`}
            >
              <MonitorPlay className="w-5 h-5" />
            </Link>

            {/* 6. PrintBe */}
            <Link
              href="/printbe"
              title="PrintBe"
              aria-label="PrintBe"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                pathname === "/printbe"
                  ? "bg-[#0D52FF] text-white shadow-md scale-105"
                  : "text-slate-800 hover:bg-white/80 hover:text-[#0D52FF]"
              }`}
            >
              <PrinterCheck className="w-5 h-5" />
            </Link>

            {/* 7. Protocol */}
            <Link
              href="/protocol"
              title="Protocol"
              aria-label="Protocol"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                pathname === "/protocol"
                  ? "bg-[#0D52FF] text-white shadow-md scale-105"
                  : "text-slate-800 hover:bg-white/80 hover:text-[#0D52FF]"
              }`}
            >
              <UsersRound className="w-5 h-5" />
            </Link>

            {/* 8. Nails */}
            <Link
              href="/nails"
              title="Nails"
              aria-label="Nails"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                pathname === "/nails"
                  ? "bg-[#0D52FF] text-white shadow-md scale-105"
                  : "text-slate-800 hover:bg-white/80 hover:text-[#0D52FF]"
              }`}
            >
              <Brush className="w-5 h-5" />
            </Link>
          </aside>
          {/* END: Left Sidebar Quick Navigation */}

          {/* BEGIN: Hero Content Area */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 pt-6 sm:pt-12 lg:px-12 md:pl-28 lg:pl-32 lg:pt-28 pb-4 lg:pb-14">
            {/* Main Typography & CTA */}
            <div className="flex flex-col max-w-2xl lg:mt-0 relative min-h-[280px] lg:min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col"
                >
                  <p className="text-[#0D52FF] font-bold tracking-widest text-[10px] sm:text-xs mb-2 lg:mb-4 uppercase">
                    {heroSlides[currentSlide].subtitle}
                  </p>

                  <p className="text-[32px] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-3 lg:mb-6">
                    {heroSlides[currentSlide].title}
                  </p>

                  {/* Blue separator - mobile only */}
                  <div className="w-12 h-1.5 bg-[#0D52FF] rounded-full mb-6 lg:hidden"></div>

                  {/* Description text - visible on mobile/tablet (and desktop for slides > 0) */}
                  <p
                    className={`text-white/90 text-sm sm:text-base leading-relaxed mb-6 max-w-sm font-medium ${currentSlide === 0 ? "lg:hidden" : ""}`}
                  >
                    {heroSlides[currentSlide].description}
                  </p>

                  <Link
                    href={heroSlides[currentSlide].ctaLink}
                    className="w-fit bg-[#0D52FF] hover:bg-blue-700 text-white font-semibold py-3 px-6 lg:py-4 lg:px-8 rounded-full flex items-center gap-3 transition-colors shadow-lg cursor-pointer"
                  >
                    {heroSlides[currentSlide].ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* 10K+ Clients - Mobile Pill Style */}
                  {currentSlide === 0 && (
                    <div className="mt-8 flex items-center gap-4 bg-white/40 backdrop-blur-md rounded-full p-2 pr-6 w-fit lg:hidden shadow-lg border border-white/40">
                      <div className="flex -space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white overflow-hidden relative">
                          <Image
                            src="/assets/elimi-images/how-to/Step-1.webp"
                            alt="Client"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white overflow-hidden relative">
                          <Image
                            src="/assets/elimi-images/how-to/Step-2.webp"
                            alt="Client"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white overflow-hidden relative">
                          <Image
                            src="/assets/elimi-images/how-to/Step-3.webp"
                            alt="Client"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-[#0D52FF] leading-none tracking-tight">
                          10K+
                        </span>
                        <span className="block text-[11px] text-[#181B25] font-bold mt-0.5">
                          Clients Served
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop original cards - hidden on mobile/tablet */}
            <AnimatePresence>
              {currentSlide === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="hidden lg:flex flex-col lg:flex-row items-start lg:items-end justify-between w-full mt-12 lg:mt-auto gap-6 lg:mb-2"
                >
                  {/* Bottom Left Minimalist Showcase Card */}
                  <div
                    id="hero-service-banner-card"
                    className="bg-white rounded-[2rem] p-6 sm:p-7 shadow-2xl relative overflow-hidden w-full sm:w-auto max-w-sm flex flex-col justify-between transition-all hover:shadow-3xl space-y-5 lg:-translate-y-2"
                  >
                    <div className="space-y-3">
                      <h2 className="text-2xl sm:text-[26px] font-bold leading-[1.15] tracking-tight">
                        <span className="text-[#181B25] block">
                          Your Moments,
                        </span>
                        <span className="text-brand-600 block">
                          Our Mastery.
                        </span>
                      </h2>
                      <p className="text-xs sm:text-sm text-[#525866] leading-relaxed">
                        From arrival to farewell, we handle every detail so you
                        can focus on what truly matters. Experience seamless
                        coordination, premium care, and VIP treatment tailored
                        just for you.
                      </p>
                    </div>

                    <div className="flex items-end justify-between pt-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="block text-2xl sm:text-3xl font-bold text-brand-600 leading-none tracking-tight">
                            10K+
                          </span>
                          <span className="block text-xs text-[#525866] font-medium mt-1">
                            Clients Served
                          </span>
                        </div>
                        <div className="flex -space-x-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden relative bg-slate-200">
                            <Image
                              src="/assets/elimi-images/how-to/Step-1.webp"
                              alt="Client"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden relative bg-slate-200">
                            <Image
                              src="/assets/elimi-images/how-to/Step-2.webp"
                              alt="Client"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden relative bg-slate-200">
                            <Image
                              src="/assets/elimi-images/how-to/Step-3.webp"
                              alt="Client"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0">
                        <ArrowUpRight className="w-5 h-5 text-[#181B25]" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Right Minimalist Showcase Card */}
                  <div
                    id="hero-protocol-banner-card"
                    className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-7 shadow-2xl relative overflow-hidden w-full sm:w-auto max-w-md flex flex-col border border-white/60 transition-all hover:shadow-3xl lg:-translate-y-2"
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="space-y-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-brand-600">
                          ELIMI Protocol
                        </h2>
                        <div className="flex items-start gap-1.5 text-xs text-[#525866] font-medium">
                          <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>
                            Professional Protocol &<br />
                            Hospitality Services
                          </span>
                        </div>
                      </div>
                      <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm shrink-0">
                        <ArrowUpRight className="w-5 h-5 text-[#181B25]" />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-[#181B25] leading-relaxed font-medium mb-4">
                      We provide world-class protocol services that blend
                      sophistication with warmth—ensuring every guest, every
                      time, feels valued and respected.
                    </p>

                    <div className="flex flex-col gap-2.5 text-xs text-[#181B25] font-medium mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Copy className="w-4 h-4 text-brand-600" />
                          <span>Event Coordination</span>
                        </div>
                        <span className="text-[#525866]">•</span>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-brand-600" />
                          <span>VIP Handling</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                        <Briefcase className="w-4 h-4 text-brand-600" />
                        <span>Airport Assistance</span>
                      </div>
                    </div>

                    {/* Bottom Social / Branding area */}
                    <div className="flex items-end justify-between mt-auto pt-2">
                      {/* Fake ELIMI Logo area */}
                      <div className="flex flex-col items-center">
                        <Image
                          src="/assets/icons/ELIMI_LOGO.svg"
                          alt="Elimi Logo"
                          width={36}
                          height={36}
                          className="mb-0.5"
                        />
                        <span className="text-[10px] font-bold text-brand-600">
                          ELIMI
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-end gap-3.5">
                        <div className="flex flex-col items-center gap-1">
                          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/50 hover:bg-white/80 transition-colors flex items-center justify-center text-[#181B25]">
                            <Heart className="w-4 h-4" />
                          </button>
                          <span className="text-[10px] font-medium text-[#181B25]">
                            4.8K
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/50 hover:bg-white/80 transition-colors flex items-center justify-center text-[#181B25]">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <span className="text-[10px] font-medium text-[#181B25]">
                            157
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/50 hover:bg-white/80 transition-colors flex items-center justify-center text-[#181B25]">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <span className="text-[10px] font-medium text-[#181B25] invisible">
                            0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile/Tablet Search Card */}
            <AnimatePresence>
              {currentSlide === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="lg:hidden w-full bg-white rounded-[24px] p-5 shadow-xl mt-auto mb-2 relative z-20"
                >
                  <div className="flex flex-col gap-4">
                    {/* Location */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center text-[#0D52FF]">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 font-medium mb-0.5">
                            Location
                          </div>
                          <div className="text-sm font-bold text-[#181B25]">
                            Arizona
                          </div>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-[#0D52FF]" />
                    </div>

                    {/* Property Type */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center text-[#0D52FF]">
                          <HomeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 font-medium mb-0.5">
                            Property Type
                          </div>
                          <div className="text-sm font-bold text-[#181B25]">
                            Villa
                          </div>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-[#0D52FF]" />
                    </div>

                    {/* Max Price */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center text-[#0D52FF]">
                          <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 font-medium mb-0.5">
                            Max Price
                          </div>
                          <div className="text-sm font-bold text-[#0D52FF]">
                            $300 000
                          </div>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-[#0D52FF]" />
                    </div>

                    <button className="w-full bg-[#0D52FF] hover:bg-blue-700 text-white font-bold py-3 rounded-full transition-colors shadow-lg mt-1 text-sm">
                      Search
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* END: Bottom Cards & Branding */}
          </div>
        </main>
      </div>

      {/* ELIMI Protocol: Explore Our 4 Pillars Section */}
      <FourPillarsSection />

      {/* ELIMI Platform: How Elimi Works, Testimonials, & Trusted Partners */}
      <HowElimiWorksSection />

      {/* ELIMI Impact: Our Journey in Numbers */}
      <ElimiNumbersSection />
    </div>
  );
}
