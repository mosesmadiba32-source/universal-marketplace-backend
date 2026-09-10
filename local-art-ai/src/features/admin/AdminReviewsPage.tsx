import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from './adminApi';
import { ReviewStatus } from '../../shared/types/api';
import { formatDate } from '../../shared/lib/utils';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import { Select } from '../../shared/components/Select';
import { useUiStore } from '../../shared/store/uiStore';
import { Star, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

export const AdminReviewsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { addToast } = useUiStore();

  const [statusFilter, setStatusFilter] = useState<ReviewStatus | 'ALL'>('PENDING');

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ['admin-reviews', statusFilter],
    queryFn: () =>
      adminApi.getAdminReviews({
        status: statusFilter === 'ALL' ? undefined : (statusFilter as ReviewStatus),
        limit: 50,
      }),
  });

  const changeStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ReviewStatus }) =>
      adminApi.updateReviewStatus(id, status),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      addToast({
        type: 'success',
        title: `Review ${vars.status === 'APPROVED' ? 'Approved' : 'Rejected'}`,
        message: 'Review moderation status updated.',
      });
    },
  });

  const reviews = reviewsData?.reviews || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Review Moderation Queue
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Approve or reject customer product reviews before public listing
          </p>
        </div>

        <div className="w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ReviewStatus | 'ALL')}
            options={[
              { value: 'PENDING', label: 'Pending Moderation' },
              { value: 'APPROVED', label: 'Approved Reviews' },
              { value: 'REJECTED', label: 'Rejected Reviews' },
              { value: 'ALL', label: 'All Statuses' },
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 bg-white rounded-card animate-pulse border border-neutral-200" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-card border border-neutral-200 p-12 text-center space-y-3">
            <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="text-base font-bold text-neutral-900">No reviews found</h3>
            <p className="text-xs text-neutral-500">
              There are no reviews currently matching the selected filter.
            </p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-card border border-neutral-200 p-5 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    {rev.title || 'Untitled Review'}
                  </span>
                  <Badge status={rev.status} size="sm" />
                </div>
                <span className="text-[11px] text-neutral-400">{formatDate(rev.createdAt)}</span>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed">
                {rev.comment || 'No written comment provided.'}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-500">
                <span>
                  Author: <strong>{rev.user ? `${rev.user.firstName} ${rev.user.lastName}` : 'Customer'}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {rev.status !== 'APPROVED' && (
                    <Button
                      variant="accent"
                      size="sm"
                      isLoading={changeStatusMutation.isPending}
                      onClick={() =>
                        changeStatusMutation.mutate({ id: rev.id, status: 'APPROVED' })
                      }
                      className="bg-emerald-700 hover:bg-emerald-800"
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                    </Button>
                  )}
                  {rev.status !== 'REJECTED' && (
                    <Button
                      variant="danger"
                      size="sm"
                      isLoading={changeStatusMutation.isPending}
                      onClick={() =>
                        changeStatusMutation.mutate({ id: rev.id, status: 'REJECTED' })
                      }
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
