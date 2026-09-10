import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Headphones, RotateCcw, ShoppingBag } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "Free Shipping", detail: "On orders over $75" },
  { icon: Lock, label: "Secure Payments", detail: "256-bit encrypted" },
  { icon: Headphones, label: "24/7 Support", detail: "Art advisor assistance" },
  { icon: RotateCcw, label: "Easy Returns", detail: "30-day guarantee" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[12px] border border-border bg-[radial-gradient(circle_at_center,_rgba(4,9,20,0.2),_rgba(10,24,48,0.88)_55%,_rgba(10,24,48,1)_100%)] px-4 py-6 shadow-sm sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="relative z-10 max-w-[480px] pt-4 lg:pt-12">
          <p className="mb-4 inline-flex text-[13px] font-semibold uppercase tracking-[0.2em] text-gold500">
            New This Week
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.5px] text-white sm:text-5xl lg:text-[56px] lg:leading-[60px]">
            <span className="block font-serif text-white">Discover Everything</span>
            <span className="block font-serif text-gold500">In One Place</span>
          </h1>
          <p className="mt-4 max-w-[480px] text-base text-navy100 lg:text-[16px] lg:leading-6">
            Explore curated paintings, photography, home décor, and collectible pieces selected for modern spaces.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-[8px] bg-gold500 px-6 py-3 text-[14px] font-semibold text-navy700 transition hover:bg-gold600"
            >
              Shop now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-[8px] border border-white/20 bg-white/5 px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-white/10"
            >
              Browse categories
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-navy100">
            <div>
              <div className="text-2xl font-bold text-white">12k+</div>
              <div>Curated items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div>Average rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">2-day</div>
              <div>Shipping</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 lg:pl-6">
          <div className="relative mx-auto w-full max-w-[520px] rounded-[12px] border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div className="overflow-hidden rounded-[8px] bg-page">
              <img
                src="/images/sample-art.jpg"
                alt="Featured artwork"
                className="h-[360px] w-full object-cover lg:h-[420px]"
              />
            </div>

            <div className="mt-4 flex items-center justify-between rounded-[8px] bg-white/5 px-3 py-2">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-navy200">Featured drop</div>
                <div className="mt-1 text-lg font-semibold text-white">Coastal Horizon</div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-[8px] bg-gold500 px-3 py-2 text-sm font-semibold text-navy700">
                <ShoppingBag className="h-4 w-4" />
                $180
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-6 top-6 z-20 hidden w-[320px] rounded-[12px] border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(10,24,48,0.12)] lg:block">
        <div className="space-y-4">
          {trustItems.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-gold50 p-1.5 text-gold500">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-ink900">{label}</div>
                <div className="text-[12px] text-ink600">{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
