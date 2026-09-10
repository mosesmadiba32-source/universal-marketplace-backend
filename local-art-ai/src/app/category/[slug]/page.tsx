import ProductCard from "@/components/product/ProductCard";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const title = params.slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const products = [
    { id: "p1", name: `${title} Piece 1`, slug: `${params.slug}-piece-1`, price: 120, rating: 4.8, category: title },
    { id: "p2", name: `${title} Piece 2`, slug: `${params.slug}-piece-2`, price: 95, rating: 4.7, category: title },
    { id: "p3", name: `${title} Piece 3`, slug: `${params.slug}-piece-3`, price: 140, rating: 4.9, category: title },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue600">Category</p>
        <h1 className="mt-2 text-3xl font-bold text-textPrimary">{title}</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
