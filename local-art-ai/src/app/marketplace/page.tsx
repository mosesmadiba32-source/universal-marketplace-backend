import ProductCard from "@/components/product/ProductCard";

const products = [
  { id: "p1", name: "Abstract Canvas", slug: "abstract-canvas", price: 120, originalPrice: 150, rating: 4.8, category: "Paintings" },
  { id: "p2", name: "Golden Sunset", slug: "golden-sunset", price: 95, originalPrice: 120, rating: 4.7, category: "Photography" },
  { id: "p3", name: "Stone Form", slug: "stone-form", price: 140, originalPrice: 175, rating: 4.9, category: "Sculptures" },
  { id: "p4", name: "Threaded Bloom", slug: "threaded-bloom", price: 72, rating: 4.6, category: "Textiles" },
  { id: "p5", name: "Luna Study", slug: "luna-study", price: 200, originalPrice: 240, rating: 4.9, category: "Paintings" },
  { id: "p6", name: "Studio Lamp", slug: "studio-lamp", price: 88, rating: 4.5, category: "Ceramics" },
  { id: "p7", name: "Northern Light", slug: "northern-light", price: 110, originalPrice: 135, rating: 4.8, category: "Photography" },
  { id: "p8", name: "Bloom Set", slug: "bloom-set", price: 130, rating: 4.7, category: "Prints" },
];

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue600">Marketplace</p>
          <h1 className="mt-2 text-3xl font-bold text-textPrimary">Explore the collection</h1>
        </div>
        <p className="text-sm text-textSecondary">{products.length} items</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
