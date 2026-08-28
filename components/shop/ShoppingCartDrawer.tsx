'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from './ProductGrid';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function ShoppingCartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: ShoppingCartDrawerProps) {
  if (!isOpen) return null;

  const totalBIF = cartItems.reduce(
    (sum, item) => sum + item.product.priceBIF * item.quantity,
    0
  );
  const totalUSD = cartItems.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0
  );

  const formatCartSummaryForWhatsApp = () => {
    if (cartItems.length === 0) return '';
    const itemLines = cartItems
      .map(
        (item) =>
          `• ${item.product.name} (x${item.quantity}) - ${(
            item.product.priceBIF * item.quantity
          ).toLocaleString()} BIF`
      )
      .join('\n');

    return `Hello ELIMI Boutique team! I would like to place an order for:\n\n${itemLines}\n\nTotal: ${totalBIF.toLocaleString()} BIF (~$${totalUSD} USD).\n\nPlease confirm availability and delivery location.`;
  };

  const whatsappCheckoutUrl = `https://wa.me/25779000000?text=${encodeURIComponent(
    formatCartSummaryForWhatsApp()
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between relative"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F2F4F8]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0D52FF] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#181B25]">
                  Your Boutique Bag
                </h3>
                <p className="text-[11px] text-[#525866]">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-[#525866] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F2F4F8] text-[#0D52FF] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-[#181B25]">
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#525866] max-w-xs">
                  Browse our Fashion, Electronics, Cultural Crafts, and Beauty items to add products.
                </p>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-[#F8FAFC] rounded-2xl p-3.5 border border-slate-200/60 flex items-center gap-3.5"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-xl bg-white border border-slate-200/60 p-1 shrink-0 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      referrerPolicy="no-referrer"
                      className="object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-extrabold text-xs text-[#181B25] truncate">
                      {product.name}
                    </h5>
                    <div className="text-xs font-bold text-[#0D52FF]">
                      {(product.priceBIF * quantity).toLocaleString()} BIF
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Approx. ${product.priceUSD * quantity} USD
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-[#181B25] flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold text-[#181B25]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-[#181B25] flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Block */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-[#F2F4F8] space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#525866]">
                  <span>Subtotal</span>
                  <span>{totalBIF.toLocaleString()} BIF</span>
                </div>
                <div className="flex justify-between text-xs text-[#525866]">
                  <span>Delivery in Bujumbura</span>
                  <span className="text-emerald-600 font-bold">Fast Delivery</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#181B25] pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-[#0D52FF]">
                    {totalBIF.toLocaleString()} BIF (~${totalUSD} USD)
                  </span>
                </div>
              </div>

              {/* Checkout WhatsApp Button */}
              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-full py-3.5 px-5 transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md"
              >
                <Image
                  src="/assets/icons/social/whatsapp-150x150.png"
                  alt="WhatsApp"
                  width={18}
                  height={18}
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="w-4 h-4 object-contain"
                />
                <span>Complete Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="text-[10px] text-center text-[#525866] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0D52FF]" />
                <span>Verified Payment via Mobile Money & Cash on Delivery</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
