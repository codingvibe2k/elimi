'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  House,
  ShoppingBag,
  Car,
  HousePlus,
  Bot,
  MonitorPlay,
  PrinterCheck,
  UsersRound,
  Brush,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface MobileNavigationMenuProps {
  className?: string;
}

export function MobileNavigationMenu({ className }: MobileNavigationMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  // Trigger ELIMI AI Assistant popup
  const handleTriggerAi = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-elimi-ai'));
    }
  };

  // Close on Escape key press or clicking outside
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: House,
      description: 'Concierge & overview',
    },
    {
      label: 'Shop',
      href: '/shop',
      icon: ShoppingBag,
      description: 'Luxury marketplace',
    },
    {
      label: 'Cars',
      href: '/cars',
      icon: Car,
      description: 'VIP fleet & rentals',
    },
    {
      label: 'Houses',
      href: '/houses',
      icon: HousePlus,
      description: 'Villas & residences',
    },
    {
      label: 'Media',
      href: '/media',
      icon: MonitorPlay,
      description: 'Streams & video catalog',
    },
    {
      label: 'PrintBe',
      href: '/printbe',
      icon: PrinterCheck,
      description: 'Prints & branding',
    },
    {
      label: 'Protocol',
      href: '/protocol',
      icon: UsersRound,
      description: 'VIP escort & delegations',
    },
    {
      label: 'Nails',
      href: '/nails',
      icon: Brush,
      description: 'Aesthetic lounge',
    },
  ];

  return (
    <div className={`lg:hidden ${className || ''}`} ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D52FF] transition-colors cursor-pointer z-40"
        aria-expanded={open}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="absolute"
              >
                <X className="size-5 text-[#0D52FF]" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="absolute"
              >
                <Menu className="size-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>

      {/* Animated Dropdown Menu Panel & Backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-[65px] bg-slate-900/30 backdrop-blur-[2px] z-30"
              aria-hidden="true"
            />

            {/* Dropdown Container that matches width, height and animation */}
            <motion.div
              initial={{ opacity: 0, y: -12, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -12, scaleY: 0.96 }}
              transition={{
                duration: 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: 'top center' }}
              className="fixed left-0 right-0 top-[65px] w-full max-w-full bg-white border-b border-slate-200 shadow-2xl z-40 overflow-hidden"
            >
              <div className="max-w-3xl mx-auto px-4 py-3 sm:px-6">
                {/* Header with Title and explicit Close Button */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Navigation Menu
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-md p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Navigation Items Grid / List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-[60vh] overflow-y-auto pr-1 py-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === '/'
                        ? pathname === '/'
                        : pathname === item.href || pathname?.startsWith(`${item.href}/`);

                    return (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => handleNavigate(item.href)}
                        className={`group flex items-center gap-3 w-full text-left rounded-lg px-3 py-2 text-sm transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-blue-50 text-[#0D52FF] font-medium'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <Icon
                          className={`size-4.5 shrink-0 transition-colors ${
                            isActive
                              ? 'text-[#0D52FF]'
                              : 'text-slate-500 group-hover:text-slate-900'
                          }`}
                        />
                        <div className="flex flex-col min-w-0 flex-1">
                          <span
                            className={`text-sm leading-tight ${
                              isActive ? 'font-semibold text-[#0D52FF]' : 'font-medium text-slate-800'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal leading-tight truncate">
                            {item.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="my-2 h-px bg-slate-100" />

                {/* Elimi AI Action Item */}
                <button
                  type="button"
                  onClick={handleTriggerAi}
                  className="group flex items-center justify-between w-full rounded-lg px-3 py-2.5 bg-blue-50/70 hover:bg-blue-100/70 text-[#0D52FF] transition-all cursor-pointer border border-blue-100"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Bot className="size-5 shrink-0 text-[#0D52FF]" />
                    <div className="flex flex-col text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#0D52FF] leading-tight">
                          Elimi AI
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-[#0D52FF] text-white px-1.5 py-0.2 rounded-full">
                          AI 24/7
                        </span>
                      </div>
                      <span className="text-[11px] text-blue-600/80 font-normal leading-tight truncate">
                        Smart concierge, pricing &amp; services
                      </span>
                    </div>
                  </div>
                  <Sparkles className="size-4 text-[#0D52FF] shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
