import Link from "next/link";
import { Star, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

const product = {
  id: "p1",
  name: "Abstract Canvas",
  slug: "abstract-canvas",
  price: 120,
  originalPrice: 150,
  rating: 4.8,
  category: "Paintings",
  image: "/images/sample-art.jpg",
};

const relatedProducts = [
  { id: "p2", name: "Golden Sunset", slug: "golden-sunset", price: 95, rating: 4.7, category: "Photography" },
  { id: "p3", name: "Stone Form", slug: "stone-form", price: 140, rating: 4.9, category: "Sculptures" },
  { id: "p4", name: "Threaded Bloom", slug: "threaded-bloom", price: 72, rating: 4.6, category: "Textiles" },
];

export default function ProductPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/marketplace" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-textSecondary hover:text-textPrimary">
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-card border border-border bg-surface p-4 shadow-sm">
          <img src={product.image} alt={product.name} className="h-[560px] w-full object-cover" />
        </div>

        <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue600">{product.category}</p>
          <h1 className="mt-3 text-3xl font-bold text-textPrimary">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className={`h-4 w-4 ${index < Math.round(product.rating) ? "fill-gold500 text-gold500" : "text-slate-300"}`} />
              ))}
            </div>
            <span className="text-sm text-textSecondary">{product.rating.toFixed(1)} rating</span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-bold text-textPrimary">${product.price.toFixed(2)}</span>
            {product.originalPrice ? (
              <span className="text-lg text-strikethrough line-through">${product.originalPrice.toFixed(2)}</span>
            ) : null}
          </div>

          <p className="mt-5 text-sm leading-6 text-textSecondary">
            A modern statement piece designed to bring warmth, texture, and character into any space. Each item is selected for quality craftsmanship and visual impact.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-btn bg-navy900 px-5 py-3 text-sm font-semibold text-white">
              Add to cart
            </button>
            <button className="rounded-btn border border-border px-5 py-3 text-sm font-semibold text-textPrimary">
              Save for later
            </button>
          </div>

          <div className="mt-8 space-y-3 border-t border-border pt-5 text-sm text-textSecondary">
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-green600" />
              Free delivery over $50
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-blue600" />
              Secure payment and verified seller
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold text-textPrimary">You may also like</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {relatedProducts.map((entry) => (
            <ProductCard key={entry.id} {...entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
