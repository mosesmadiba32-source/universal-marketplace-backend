import Link from "next/link";
import { UserRound, Package, Heart, MapPin, CreditCard, Bell, Shield, Settings, LifeBuoy } from "lucide-react";

const navItems = [
  { href: "/account", label: "Dashboard", icon: UserRound },
  { href: "/account/profile", label: "Profile", icon: UserRound },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/payment-methods", label: "Payment Methods", icon: CreditCard },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
  { href: "/account/security", label: "Security", icon: Shield },
  { href: "/account/settings", label: "Settings", icon: Settings },
  { href: "/account/support", label: "Support", icon: LifeBuoy },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
        <aside className="rounded-card border border-border bg-surface p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-textPrimary">My account</h2>
          <nav className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-btn px-3 py-2 text-sm font-medium text-textSecondary transition hover:bg-bgPage hover:text-textPrimary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <div>{children}</div>
      </div>
    </div>
  );
}
