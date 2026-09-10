import ProductCard from "@/components/product/ProductCard";

const results = [
  { id: "p1", name: "Abstract Canvas", slug: "abstract-canvas", price: 120, originalPrice: 150, rating: 4.8, category: "Paintings" },
  { id: "p2", name: "Golden Sunset", slug: "golden-sunset", price: 95, originalPrice: 120, rating: 4.7, category: "Photography" },
  { id: "p3", name: "Stone Form", slug: "stone-form", price: 140, originalPrice: 175, rating: 4.9, category: "Sculptures" },
];

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-textPrimary">Search results</h1>
      <p className="mt-2 text-sm text-textSecondary">Showing {results.length} results</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {results.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
