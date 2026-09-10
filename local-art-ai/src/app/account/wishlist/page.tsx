import ProductCard from "@/components/product/ProductCard";

const products = [
  { id: "p1", name: "Abstract Canvas", slug: "abstract-canvas", price: 120, originalPrice: 150, rating: 4.8, category: "Paintings" },
  { id: "p3", name: "Stone Form", slug: "stone-form", price: 140, originalPrice: 175, rating: 4.9, category: "Sculptures" },
];

export default function WishlistPage() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-textPrimary">Wishlist</h1>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
