"use client";

import Link from "next/link";
import { Home, Store, Heart, UserRound } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/marketplace", label: "Shop", icon: Store },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account", label: "Account", icon: UserRound },
];

export default function MobileTabBar() {
  return (
    <div className="mobile-tabbar fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2 px-3 py-2">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center gap-1 rounded-btn px-2 py-2 text-[10px] font-medium text-textSecondary"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
