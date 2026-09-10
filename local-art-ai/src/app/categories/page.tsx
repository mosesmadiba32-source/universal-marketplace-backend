import Link from "next/link";
import { CATEGORY_SLUGS } from "@/lib/constants";

const categoryMap: Record<string, { title: string; description: string }> = {
  paintings: { title: "Paintings", description: "Expressive wall pieces for living rooms and studios." },
  sculptures: { title: "Sculptures", description: "Three-dimensional artwork with presence and texture." },
  prints: { title: "Prints", description: "Accessible originals for collectors and renters." },
  photography: { title: "Photography", description: "Fine art imagery captured with intent." },
  ceramics: { title: "Ceramics", description: "Functional objects crafted by hand." },
  textiles: { title: "Textiles", description: "Decorative fabrics with artist-led color stories." },
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-textPrimary">Browse categories</h1>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {CATEGORY_SLUGS.map((slug) => {
          const category = categoryMap[slug] ?? { title: slug, description: "Explore this collection" };

          return (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="rounded-card border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 h-44 overflow-hidden rounded-card bg-slate-200">
                <img src="/images/sample-art.jpg" alt={category.title} className="h-full w-full object-cover" />
              </div>
              <h2 className="text-xl font-semibold text-textPrimary">{category.title}</h2>
              <p className="mt-2 text-sm text-textSecondary">{category.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
