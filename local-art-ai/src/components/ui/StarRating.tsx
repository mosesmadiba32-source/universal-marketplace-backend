import { Star } from "lucide-react";

export default function StarRating({ rating = 0 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < Math.round(rating) ? "fill-gold500 text-gold500" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}
