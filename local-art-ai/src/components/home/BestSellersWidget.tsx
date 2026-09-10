import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

const products = [
  { id: "p5", name: "Luna Study", slug: "luna-study", price: 200, originalPrice: 240, rating: 4.9, category: "Paintings" },
  { id: "p6", name: "Studio Lamp", slug: "studio-lamp", price: 88, rating: 4.5, category: "Ceramics" },
  { id: "p7", name: "Northern Light", slug: "northern-light", price: 110, originalPrice: 135, rating: 4.8, category: "Photography" },
];

export default function BestSellersWidget() {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-textPrimary">Best sellers</h2>
        <Link href="/marketplace" className="text-sm font-semibold text-blue600 hover:text-blue700">
          Explore more
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
