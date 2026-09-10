import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

const products = [
  { id: "p1", name: "Abstract Canvas", slug: "abstract-canvas", price: 120, originalPrice: 150, rating: 4.8, category: "Paintings" },
  { id: "p2", name: "Golden Sunset", slug: "golden-sunset", price: 95, originalPrice: 120, rating: 4.7, category: "Photography" },
  { id: "p3", name: "Stone Form", slug: "stone-form", price: 140, originalPrice: 175, rating: 4.9, category: "Sculptures" },
  { id: "p4", name: "Threaded Bloom", slug: "threaded-bloom", price: 72, rating: 4.6, category: "Textiles" },
];

export default function TrendingRail() {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-textPrimary">Trending now</h2>
        <Link href="/marketplace" className="text-sm font-semibold text-blue600 hover:text-blue700">
          View all
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
