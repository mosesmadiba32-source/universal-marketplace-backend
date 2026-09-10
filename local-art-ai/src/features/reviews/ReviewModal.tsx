import React, { useState } from 'react';
import { useReviewMutations } from './useReviews';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { Star } from 'lucide-react';

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, productId }) => {
  const { createReview, isSubmitting } = useReviewMutations(productId);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        title: title.trim() || undefined,
        comment: comment.trim() || undefined,
      });
      onClose();
      setTitle('');
      setComment('');
      setRating(5);
    } catch {
      // Handled in hook
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Write a Customer Review"
      description="Share your genuine feedback with the community."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
            Overall Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 text-neutral-300 hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-7 h-7 ${
                    (hoverRating || rating) >= star
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-xs font-bold text-neutral-700">{rating} out of 5</span>
          </div>
        </div>

        <Input
          label="Headline / Title"
          placeholder="e.g. Excellent build quality, works perfectly!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
            Detailed Review
          </label>
          <textarea
            rows={4}
            placeholder="What did you like or dislike? How is the product performing?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-white border border-neutral-300 text-neutral-900 rounded-input p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" isLoading={isSubmitting}>
            Submit Review
          </Button>
        </div>
      </form>
    </Modal>
  );
};
