import Link from "next/link";

const footerLinks = {
  Explore: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Categories", href: "/categories" },
    { label: "Search", href: "/search" },
  ],
  Support: [
    { label: "Help", href: "/help" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  Company: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy700 text-navy100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-navy700">
                LA
              </div>
              <div>
                <div className="text-lg font-bold text-white">Local Art AI</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-navy200">Discover Everything In One Place</div>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-navy200">
              Curated art, handcrafted pieces, and creator-led collections for modern homes and collectors.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">{title}</h3>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-navy200 transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-navy200">
          © 2026 Local Art AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
