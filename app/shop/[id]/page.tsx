'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Clock,
  Tag,
  Package,
  Calendar,
  Truck,
  Check,
  Menu,
  X,
  MessageCircle,
  Share2,
  ThumbsUp,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { getProductById, getRelatedProducts, Product, ProductReview, BOUTIQUE_PRODUCTS } from '@/lib/products';
import { useRealtimeProduct, useRealtimeProducts, addReviewToProductInFirestore } from '@/lib/firestore-products';
import ShoppingCartDrawer, { CartItem } from '@/components/shop/ShoppingCartDrawer';
import ElimiHeader from '@/components/ElimiHeader';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const productId = resolvedParams.id;
  
  // Real-time Product & Catalog from Firestore
  const { product: liveProduct, loading: isProductLoading, isLive } = useRealtimeProduct(productId);
  const { products: allRealtimeProducts } = useRealtimeProducts();
  
  const product: Product = liveProduct || getProductById(productId) || BOUTIQUE_PRODUCTS[0];
  
  // Related products calculated from real-time catalog
  const relatedProducts = (allRealtimeProducts && allRealtimeProducts.length > 0 ? allRealtimeProducts : BOUTIQUE_PRODUCTS)
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Gallery Active Image
  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image, product.image, product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Size Selector
  const availableSizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || 'M');

  // Accordion Toggles
  const [isDescOpen, setIsDescOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(true);

  // Wishlist / Like State
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Cart State & Drawer
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Countdown timer for next-day delivery (e.g. Order in 02:30:25)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 25 });

  // Reviews Carousel & Real-time Reviews State
  const defaultFallbackReviews: ProductReview[] = [
    {
      id: 'r-default',
      author: 'Alex Mathio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      date: '13 Oct 2024',
      rating: 5,
      comment:
        "NextGen's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning the brand as a responsible choice in the fashion world.",
      verified: true,
    },
  ];

  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [optimisticReviews, setOptimisticReviews] = useState<ProductReview[]>([]);

  // Merge live Firestore reviews with any immediate locally submitted reviews
  const customReviews = (product.reviews && product.reviews.length > 0)
    ? [...optimisticReviews.filter(r => !product.reviews?.some(pr => pr.id === r.id)), ...product.reviews]
    : optimisticReviews.length > 0
    ? optimisticReviews
    : defaultFallbackReviews;

  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Category filter / search in header
  const [headerSearch, setHeaderSearch] = useState('');

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num: number) => String(num).padStart(2, '0');

  // Handle Add to Cart
  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1600);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Handle Review submission with Firestore sync
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      date: 'Just now',
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      verified: true,
    };

    // Optimistic local update
    setOptimisticReviews((prev) => [newRev, ...prev]);
    setActiveReviewIndex(0);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewModalOpen(false);

    // Save to Firestore in background
    try {
      await addReviewToProductInFirestore(
        product.id,
        newRev,
        product.reviews || [],
        product.rating,
        product.reviewsCount
      );
    } catch (err) {
      console.error('Error persisting review to Firestore:', err);
    }
  };

  const currentReview = customReviews[activeReviewIndex] || customReviews[0];

  const ratingBars = [
    { stars: 5, pct: '75%' },
    { stars: 4, pct: '18%' },
    { stars: 3, pct: '5%' },
    { stars: 2, pct: '1%' },
    { stars: 1, pct: '1%' },
  ];

  const whatsappMessage = `Hello ELIMI Boutique, I am interested in purchasing "${product.name}" (Size: ${selectedSize}) for $${product.priceUSD} USD / ${product.priceBIF.toLocaleString()} BIF.`;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#191919] font-sans antialiased selection:bg-[#0D52FF] selection:text-white">
      {/* Home Page Navigation Header */}
      <ElimiHeader />

      {/* MAIN CONTAINER */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Breadcrumb Navigation: ← Home • Product details */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 hover:text-[#0D52FF] transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>•</span>
          <span className="text-neutral-900 font-medium truncate">Product details</span>
        </div>

        {/* 3. HERO PRODUCT SECTION (2-Column Grid matching Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Large Rounded Photo Showcase with Top Story Bars & Bottom 3 Thumbnails */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4">
            <div className="relative w-full aspect-[4/4.7] sm:aspect-[4/4.8] bg-[#E8E6E1]/70 rounded-[28px] overflow-hidden flex flex-col justify-between p-4 sm:p-6 group border border-neutral-200/60 shadow-xs">
              {/* Story/Progress bars at top */}
              <div className="relative z-10 grid grid-cols-3 gap-2 w-full max-w-[90%] mx-auto pt-1">
                {galleryImages.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className="h-1 rounded-full cursor-pointer overflow-hidden bg-white/40 backdrop-blur-xs transition-all"
                  >
                    <div
                      className={`h-full transition-all duration-300 ${
                        activeImageIndex === idx ? 'bg-[#0D52FF] w-full' : 'bg-transparent w-0'
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Main Active Product Photo */}
              <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
                <Image
                  src={galleryImages[activeImageIndex] || product.image}
                  alt={product.name}
                  fill
                  priority
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="object-cover sm:object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Navigation Arrows for Image Gallery on Hover */}
              <button
                type="button"
                onClick={() =>
                  setActiveImageIndex((prev) =>
                    prev > 0 ? prev - 1 : galleryImages.length - 1
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-[#0D52FF] hover:text-white text-neutral-800 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveImageIndex((prev) =>
                    prev < galleryImages.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-[#0D52FF] hover:text-white text-neutral-800 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Bottom Thumbnail Strip (3 rounded cards inside bottom of showcase) */}
              <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-3 w-full mt-auto">
                {galleryImages.slice(0, 3).map((imgUrl, index) => {
                  const isActive = activeImageIndex === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative aspect-square rounded-2xl overflow-hidden bg-white/90 p-1 border-2 transition-all cursor-pointer shadow-xs ${
                        isActive
                          ? 'border-[#0D52FF] ring-2 ring-[#0D52FF]/30 scale-[1.03]'
                          : 'border-white/80 hover:border-[#0D52FF]/40 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${product.name} angle ${index + 1}`}
                        fill
                        unoptimized
                        referrerPolicy="no-referrer"
                        className="object-cover rounded-xl"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Metadata, Size, Add to Cart, Accordions */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 lg:pl-2">
            {/* Category Tag Pill: e.g. "Man Fashion" */}
            <div>
              <span className="inline-block bg-blue-50 text-[#0D52FF] text-[11px] font-bold px-3.5 py-1 rounded-full border border-blue-200/80">
                {product.badgeTag || product.category || 'Man Fashion'}
              </span>
            </div>

            {/* Product Title (Loose Fit Hoodie) */}
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-neutral-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price (e.g. $24.99) */}
            <div className="flex items-baseline gap-3">
              <span className="text-xl sm:text-2xl font-bold text-[#0D52FF]">
                ${product.priceUSD.toFixed(2)}
              </span>
              {product.originalPriceUSD && (
                <span className="text-sm text-neutral-400 line-through">
                  ${product.originalPriceUSD.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-neutral-500 font-medium">
                ({product.priceBIF.toLocaleString()} BIF)
              </span>
            </div>

            {/* Delivery Countdown Banner: 🕒 Order in 02:30:25 to get next day delivery */}
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-blue-50/80 border border-blue-200/80 rounded-full text-xs text-slate-800 max-w-fit">
              <Clock className="w-3.5 h-3.5 text-[#0D52FF] shrink-0" />
              <span>
                Order in{' '}
                <span className="font-bold text-[#0D52FF] font-mono">
                  {formatTwoDigits(timeLeft.hours)}:{formatTwoDigits(timeLeft.minutes)}:
                  {formatTwoDigits(timeLeft.seconds)}
                </span>{' '}
                to get next day delivery
              </span>
            </div>

            {/* Select Size Options */}
            <div className="space-y-2.5 pt-1">
              <div className="text-xs font-semibold text-neutral-800">Select Size</div>
              <div className="flex flex-wrap items-center gap-2">
                {availableSizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-10 px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#0D52FF] text-white shadow-sm ring-2 ring-[#0D52FF]/20'
                          : 'bg-slate-100 hover:bg-blue-50 hover:text-[#0D52FF] text-neutral-700'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Add to Cart + Heart (Wishlist) */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-[#0D52FF] hover:bg-[#0B44D8] text-white font-semibold py-3.5 px-6 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20 active:scale-[0.99] cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                  isWishlisted
                    ? 'bg-blue-50 border-blue-200 text-[#0D52FF]'
                    : 'bg-white border-neutral-200 hover:bg-blue-50 hover:text-[#0D52FF] text-neutral-700'
                }`}
                aria-label="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#0D52FF]' : ''}`} />
              </button>
            </div>

            {/* Direct WhatsApp Concierge Order Option */}
            <div className="pt-0.5">
              <a
                href={`https://wa.me/25779000000?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1EBE5D] font-semibold py-2.5 px-4 rounded-full text-xs transition-colors flex items-center justify-center gap-2 border border-[#25D366]/30"
              >
                <Image
                  src="/assets/icons/social/whatsapp-150x150.png"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="w-4 h-4 object-contain"
                />
                <span>Instant Mobile Money Order via WhatsApp Concierge</span>
              </a>
            </div>

            {/* Accordion 1: Description & Fit */}
            <div className="border-t border-neutral-200 pt-3">
              <button
                type="button"
                onClick={() => setIsDescOpen(!isDescOpen)}
                className="w-full flex items-center justify-between py-2 text-left text-sm font-semibold text-neutral-900 cursor-pointer"
              >
                <span>Description &amp; Fit</span>
                {isDescOpen ? (
                  <ChevronUp className="w-4 h-4 text-neutral-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                )}
              </button>
              {isDescOpen && (
                <div className="pt-1 pb-3 text-xs text-neutral-600 leading-relaxed space-y-2">
                  <p>{product.description}</p>
                  {product.descriptionFit && (
                    <p className="text-neutral-500">{product.descriptionFit}</p>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 2: Shipping (2x2 Grid matching screenshot) */}
            <div className="border-t border-neutral-200 pt-3">
              <button
                type="button"
                onClick={() => setIsShippingOpen(!isShippingOpen)}
                className="w-full flex items-center justify-between py-2 text-left text-sm font-semibold text-neutral-900 cursor-pointer"
              >
                <span>Shipping</span>
                {isShippingOpen ? (
                  <ChevronUp className="w-4 h-4 text-neutral-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                )}
              </button>
              {isShippingOpen && (
                <div className="pt-2 pb-3">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    {/* Item 1: Discount */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0D52FF] flex items-center justify-center shrink-0">
                        <Tag className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 font-medium">Discount</div>
                        <div className="font-semibold text-neutral-800">
                          {product.shipping?.discount || 'Disc 50%'}
                        </div>
                      </div>
                    </div>

                    {/* Item 2: Package */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0D52FF] flex items-center justify-center shrink-0">
                        <Package className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 font-medium">Package</div>
                        <div className="font-semibold text-neutral-800">
                          {product.shipping?.packageType || 'Regular Package'}
                        </div>
                      </div>
                    </div>

                    {/* Item 3: Delivery Time */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0D52FF] flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 font-medium">Delivery Time</div>
                        <div className="font-semibold text-neutral-800">
                          {product.shipping?.deliveryTime || '3-4 Working Days'}
                        </div>
                      </div>
                    </div>

                    {/* Item 4: Estimation Arrive */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0D52FF] flex items-center justify-center shrink-0">
                        <Truck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 font-medium">Estimation Arrive</div>
                        <div className="font-semibold text-neutral-800">
                          {product.shipping?.estimatedArrival || '10 - 12 October 2024'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. RATING & REVIEWS SECTION (Matching Screenshot) */}
        <section className="mt-16 sm:mt-20 pt-10 border-t border-neutral-200/80">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Rating &amp; Reviews
            </h2>
            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              className="text-xs font-semibold text-[#0D52FF] hover:text-[#0B44D8] underline underline-offset-4 cursor-pointer"
            >
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Score Block: 4,5 /5 + (50 New Reviews) + Star Distribution Bars */}
            <div className="md:col-span-5 lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <div>
                <div className="text-5xl sm:text-6xl font-black text-[#0D52FF] tracking-tight">
                  4,5<span className="text-xl sm:text-2xl font-medium text-neutral-400">/5</span>
                </div>
                <div className="text-xs text-neutral-500 font-medium mt-1">
                  ({product.reviewsCount} New Reviews)
                </div>
              </div>

              {/* Progress Lines */}
              <div className="flex-1 w-full max-w-[200px] space-y-2 text-xs">
                {ratingBars.map((bar) => (
                  <div key={bar.stars} className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-neutral-600 flex items-center gap-0.5 w-6">
                      ★ {bar.stars}
                    </span>
                    <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0D52FF] rounded-full"
                        style={{ width: bar.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Review Card Showcase with Author + Quote + Carousel Controls */}
            <div className="md:col-span-7 lg:col-span-7">
              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/70 relative">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">
                      {currentReview.author}
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= currentReview.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <span className="text-[11px] text-neutral-400 font-medium">
                    {currentReview.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-4">
                  &ldquo;{currentReview.comment}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative bg-neutral-200">
                      <Image
                        src={currentReview.avatar}
                        alt={currentReview.author}
                        fill
                        unoptimized
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-600">
                      Verified Buyer
                    </span>
                  </div>

                  {/* Carousel slider indicators & right arrow button */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {customReviews.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveReviewIndex(idx)}
                          className={`h-1 rounded-full transition-all cursor-pointer ${
                            activeReviewIndex === idx
                              ? 'w-5 bg-[#0D52FF]'
                              : 'w-2 bg-neutral-300'
                          }`}
                          aria-label={`Go to review ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveReviewIndex((prev) =>
                          prev < customReviews.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="w-7 h-7 rounded-full bg-white hover:bg-[#0D52FF] hover:text-white border border-neutral-300 hover:border-[#0D52FF] flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. "YOU MIGHT ALSO LIKE" SECTION (Matching Screenshot) */}
        <section className="mt-20 pt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-neutral-900 tracking-tight mb-8">
            You might also like
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.id}`}
                className="group flex flex-col justify-between space-y-3 cursor-pointer"
              >
                {/* Product Thumbnail Container */}
                <div className="relative aspect-square w-full rounded-[22px] bg-[#E8E6E1]/60 overflow-hidden border border-neutral-200/70 p-3 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-xs sm:text-sm text-neutral-900 group-hover:text-[#0D52FF] transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[11px]">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= Math.floor(item.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-200 fill-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-neutral-500 font-medium">
                      {item.rating.toFixed(1)}/5
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="font-bold text-[#0D52FF]">
                      ${item.priceUSD.toFixed(0)}
                    </span>
                    {item.originalPriceUSD && (
                      <span className="text-xs text-neutral-400 line-through">
                        ${item.originalPriceUSD.toFixed(0)}
                      </span>
                    )}
                    {item.discountPercentage && (
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-sm">
                        -{item.discountPercentage}%
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4"
            >
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-neutral-900">Write a Review</h3>
              <p className="text-xs text-neutral-500">
                Share your thoughts on {product.name} with future buyers.
              </p>

              <form onSubmit={handleAddReview} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newReviewRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Marie Claire"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#0D52FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="How was the fit, material, and delivery?"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#0D52FF] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#0D52FF] hover:bg-[#0B44D8] text-white font-semibold py-2.5 rounded-full text-xs transition-colors cursor-pointer shadow-sm"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Shopping Cart Drawer */}
      <ShoppingCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
