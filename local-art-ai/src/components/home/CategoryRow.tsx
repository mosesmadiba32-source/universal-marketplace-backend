import Link from "next/link";
import { CATEGORY_SLUGS } from "@/lib/constants";

const categoryMap: Record<string, { title: string; description: string }> = {
  paintings: { title: "Paintings", description: "Modern wall art" },
  sculptures: { title: "Sculptures", description: "Statement pieces" },
  prints: { title: "Prints", description: "Affordable originals" },
  photography: { title: "Photography", description: "Fine visual stories" },
  ceramics: { title: "Ceramics", description: "Handcrafted objects" },
  textiles: { title: "Textiles", description: "Decorative fabrics" },
};

export default function CategoryRow() {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-textPrimary">Shop by category</h2>
        <Link href="/categories" className="text-sm font-semibold text-blue600 hover:text-blue700">
          View all
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {CATEGORY_SLUGS.map((slug) => {
          const category = categoryMap[slug] ?? { title: slug, description: "Explore collection" };

          return (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="rounded-card border border-border bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 h-28 overflow-hidden rounded-card bg-slate-200">
                <img
                  src="/images/sample-art.jpg"
                  alt={category.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-base font-semibold text-textPrimary">{category.title}</h3>
              <p className="mt-1 text-sm text-textSecondary">{category.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
