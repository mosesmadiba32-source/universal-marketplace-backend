"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

export type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  image?: string;
  category?: string;
};

export default function ProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  rating = 4.5,
  image = "/images/sample-art.jpg",
  category = "Featured",
}: ProductCardProps) {
  const isSaved = useWishlistStore((state) => state.isSaved(id));
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group overflow-hidden rounded-card border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative">
        <Link href={`/product/${slug}`}>
          <div className="h-64 overflow-hidden bg-slate-200">
            <img src={image} alt={name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
          </div>
        </Link>
        <button
          type="button"
          onClick={() => toggleItem(id)}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border ${
            isSaved ? "border-red-200 bg-red-50 text-red-600" : "border-white/80 bg-white/80 text-textPrimary"
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-textSecondary">{category}</span>
          <div className="flex items-center gap-1 text-xs text-textSecondary">
            <Star className="h-3.5 w-3.5 fill-gold500 text-gold500" />
            {rating.toFixed(1)}
          </div>
        </div>

        <Link href={`/product/${slug}`} className="text-lg font-semibold text-textPrimary hover:text-blue600">
          {name}
        </Link>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xl font-bold text-textPrimary">${price.toFixed(2)}</span>
          {originalPrice ? (
            <span className="text-sm text-strikethrough line-through">${originalPrice.toFixed(2)}</span>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href={`/product/${slug}`}
            className="rounded-btn border border-border px-3 py-2 text-sm font-medium text-textPrimary transition hover:border-blue600 hover:text-blue600"
          >
            View details
          </Link>
          <button
            type="button"
            onClick={() => addItem({ id, name, price, image, quantity: 1 })}
            className="inline-flex items-center gap-2 rounded-btn bg-navy900 px-3 py-2 text-sm font-medium text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
