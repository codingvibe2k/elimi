import {
  ArrowUpRight,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const links: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    items: [
      { label: "Home", href: "/" },
      { label: "Cars", href: "/cars" },
      { label: "Media", href: "/media" },
      { label: "Protocol", href: "/protocol" },
    ],
  },
  {
    title: "Market",
    items: [
      { label: "Shop", href: "/shop" },
      { label: "Houses", href: "/houses" },
      { label: "PrintBe", href: "/printbe" },
      { label: "Nails", href: "/nails" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "License", href: "/#license" },
      { label: "Privacy", href: "/#privacy" },
      { label: "Terms", href: "/#terms" },
    ],
  },
];

const socials = [
  {
    label: "WhatsApp",
    icon: "/assets/icons/social/whatsapp-150x150.png",
    href: "https://wa.me/25764444546",
  },
  {
    label: "Facebook",
    icon: "/assets/icons/social/facebook-150x150.png",
    href: "https://facebook.com/elimiofficiel",
  },
  {
    label: "Instagram",
    icon: "/assets/icons/social/instagram-150x150.png",
    href: "https://instagram.com/elimiofficiel",
  },
  {
    label: "YouTube",
    icon: "/assets/icons/social/Youtube.png",
    href: "https://youtube.com/@elimiofficiel",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#3d77f5] text-foreground border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-6 pt-20 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/icons/ELIMI_LOGO.svg"
                alt="Elimi Logo"
                className="size-6 dark:invert"
              />
              <span className="font-bold uppercase tracking-tight">ELIMI</span>
            </a>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Luxury Services &amp; Market
            </span>
          </div>

          <form className="flex w-full items-center gap-2 rounded-full border border-border bg-card p-1 sm:w-auto sm:min-w-[320px]">
            <Mail className="ml-2.5 size-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Join our newsletter"
              className="h-9 flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:outline-none focus-visible:ring-0"
            />
            <Button
              size="sm"
              className="rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
            >
              Subscribe
            </Button>
          </form>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
          {links.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 pb-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; {year} ELIMI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="#status"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <span className="relative grid size-2 place-items-center">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full bg-emerald-500/50"
                />
              </span>
              All systems normal
              <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground overflow-hidden p-[2px]"
                >
                  <img
                    src={s.icon}
                    alt={s.label}
                    className="size-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="relative -mt-2 select-none overflow-hidden">
        <p
          className="block w-full text-center font-semibold leading-none text-foreground"
          style={{
            fontSize: "clamp(4rem, 22vw, 18rem)",
            letterSpacing: "-0.05em",
            background:
              "linear-gradient(180deg, hsl(var(--foreground) / 0.85) 0%, hsl(var(--background) / 0) 95%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ELIMI
        </p>
      </div>
    </footer>
  );
}
