"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  ChevronDown,
  ShieldCheck,
  Globe,
  HelpCircle,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { CATEGORY_SLUGS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    setMounted(true);

    const nav = document.querySelector("header");
    if (!nav) return;

    const setHeight = () => {
      document.documentElement.style.setProperty("--header-height", `${nav.offsetHeight}px`);
    };

    setHeight();
    window.addEventListener("resize", setHeight);

    return () => window.removeEventListener("resize", setHeight);
  }, []);

  const navItems = [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Categories", href: "/categories" },
    { label: "Help", href: "/help" },
    { label: "Track Order", href: "/track-order" },
  ];

  const accountItems = [
    { label: "Account", href: "/account", icon: User },
    { label: "Orders", href: "/account/orders", icon: ShieldCheck },
    { label: "Wishlist", href: "/account/wishlist", icon: Heart, badge: wishlistItems.length },
    { label: "Cart", href: "/checkout", icon: ShoppingCart, badge: cartItems.length },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-navy700">
      <div className="border-b border-white/10 bg-navy900 px-4 text-[11px] text-navy200 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              Global shipping
            </span>
            <span className="hidden text-navy300 sm:inline">USD</span>
          </div>
          <div className="flex items-center gap-4 text-navy200">
            <button type="button" className="inline-flex items-center gap-1.5 transition hover:text-white">
              <HelpCircle className="h-3.5 w-3.5" />
              Help
            </button>
            <button type="button" className="transition hover:text-white">Contact</button>
          </div>
        </div>
      </div>

      <div className="bg-navy700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-white/15 text-white md:hidden"
                onClick={() => setMobileMenuOpen((value) => !value)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-base font-bold text-navy700">
                  LA
                </div>
                <div>
                  <div className="text-lg font-bold leading-none text-white">Local Art AI</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-navy200">
                    Discover Everything In One Place
                  </div>
                </div>
              </Link>
            </div>

            <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="flex w-full max-w-[640px] items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 shadow-sm">
                <Search className="h-4 w-4 text-ink300" />
                <input
                  placeholder="Search art, artists, collections..."
                  className="w-full border-0 bg-transparent text-sm text-textPrimary placeholder:text-ink300 focus:ring-0"
                />
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold500 text-navy700"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {accountItems.map(({ label, href, icon: Icon, badge }) => {
                const content = (
                  <div className="flex w-[72px] flex-col items-center justify-center gap-1 text-center text-[11px] font-medium text-navy100 transition hover:text-gold500">
                    <Icon className="h-[22px] w-[22px]" />
                    <span className="leading-none">{label}</span>
                  </div>
                );

                return badge !== undefined ? (
                  <div key={label} className="relative">
                    <Link href={href}>{content}</Link>
                    {mounted && badge > 0 ? (
                      <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red500 px-1 text-[10px] font-bold text-white">
                        {badge}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <Link key={label} href={href} className="block w-[72px]">
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex h-12 items-center justify-between border-t border-white/10 bg-surface">
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="relative pb-1 text-sm font-medium text-textSecondary transition hover:text-textPrimary">
                  {item.label}
                </Link>
              ))}

              <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-textSecondary transition hover:text-textPrimary">
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <div className="inline-flex items-center gap-2 rounded-full bg-green50 px-3 py-1 text-[11px] font-semibold text-green700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified sellers
              </div>
              <Link href="/returns" className="text-sm text-textSecondary transition hover:text-textPrimary">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-border bg-surface px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-textPrimary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {CATEGORY_SLUGS.map((slug) => (
                <Link key={slug} href={`/category/${slug}`} className="rounded-full border border-border px-2 py-1 text-xs text-textSecondary">
                  {slug}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
