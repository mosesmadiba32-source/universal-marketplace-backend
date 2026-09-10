import React, { useState } from 'react';
import { useProductReviews, useProductReviewStats } from './useReviews';
import { ReviewModal } from './ReviewModal';
import { Button } from '../../shared/components/Button';
import { formatDate } from '../../shared/lib/utils';
import { Star, MessageSquare, CheckCircle2, ThumbsUp } from 'lucide-react';
import { useAuthStore } from '../../shared/store/authStore';

export interface ReviewSectionProps {
  productId: string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const { data: statsData } = useProductReviewStats(productId);
  const { data: reviewsData, isLoading } = useProductReviews(productId);
  const { isAuthenticated } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = reviewsData?.reviews || [];
  const averageRating = statsData?.averageRating ?? 5.0;
  const reviewCount = statsData?.reviewCount ?? 0;
  const breakdown = statsData?.ratingBreakdown ?? { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">Customer Reviews</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Verified purchaser reviews & ratings</p>
        </div>

        {isAuthenticated && (
          <Button variant="accent" size="sm" onClick={() => setIsModalOpen(true)}>
            <MessageSquare className="w-4 h-4 mr-1.5" /> Write a Review
          </Button>
        )}
      </div>

      {/* Summary Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-50 p-6 rounded-card border border-neutral-200">
        {/* Big Average */}
        <div className="flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-neutral-200">
          <span className="text-4xl font-extrabold text-neutral-950">{averageRating.toFixed(1)}</span>
          <div className="flex items-center gap-1 my-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(averageRating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-neutral-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500 font-medium">Based on {reviewCount} reviews</span>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-2 space-y-1.5 justify-center flex flex-col">
          {[5, 4, 3, 2, 1].map((ratingNum) => {
            const count = breakdown[ratingNum as 1 | 2 | 3 | 4 | 5] || 0;
            const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;

            return (
              <div key={ratingNum} className="flex items-center gap-3 text-xs">
                <span className="font-semibold text-neutral-700 w-12">{ratingNum} stars</span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-neutral-500 w-8 text-right font-medium">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-28 bg-neutral-100 animate-pulse rounded-card" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-xs text-neutral-500">
            No reviews published yet. Be the first verified purchaser to leave a review!
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {reviews.map((rev) => (
              <div key={rev.id} className="py-5 space-y-2 first:pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">
                      {rev.user ? `${rev.user.firstName} ${rev.user.lastName.charAt(0)}.` : 'Verified Buyer'}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">{formatDate(rev.createdAt)}</span>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                      }`}
                    />
                  ))}
                  {rev.title && <h4 className="text-xs font-bold text-neutral-900 ml-2">{rev.title}</h4>}
                </div>

                {rev.comment && (
                  <p className="text-xs text-neutral-700 leading-relaxed pt-1">{rev.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={productId}
      />
    </div>
  );
};
