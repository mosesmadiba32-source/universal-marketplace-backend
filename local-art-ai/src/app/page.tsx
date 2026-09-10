import Link from "next/link";
import Hero from "@/components/home/Hero";
import TrustPanel from "@/components/home/TrustPanel";
import CategoryRow from "@/components/home/CategoryRow";
import TrendingRail from "@/components/home/TrendingRail";
import PromoBanners from "@/components/home/PromoBanners";
import BestSellersWidget from "@/components/home/BestSellersWidget";
import OrderTrackingPanel from "@/components/home/OrderTrackingPanel";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <Hero />
      <TrustPanel />
      <CategoryRow />
      <TrendingRail />
      <PromoBanners />
      <BestSellersWidget />
      <OrderTrackingPanel />

      <section className="mt-10 rounded-card border border-border bg-surface p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue600">Need help?</p>
            <h2 className="mt-2 text-2xl font-bold text-textPrimary">Shop with confidence</h2>
          </div>
          <div className="flex gap-3">
            <Link
              href="/help"
              className="rounded-btn border border-border bg-white px-4 py-2 text-sm font-medium text-textPrimary transition hover:border-blue600 hover:text-blue600"
            >
              Help Center
            </Link>
            <Link
              href="/contact"
              className="rounded-btn bg-blue600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue700"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
