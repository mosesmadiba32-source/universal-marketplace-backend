export default function TrackOrderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-textPrimary">Track your order</h1>
      <div className="mt-6 rounded-card border border-border bg-surface p-6 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-textPrimary">Order number</label>
        <div className="flex gap-3">
          <input placeholder="e.g. LAA-2048" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
          <button className="rounded-btn bg-navy900 px-4 py-3 text-sm font-semibold text-white">Track</button>
        </div>
        <div className="mt-6 rounded-btn border border-border bg-bgPage p-4">
          <p className="text-sm text-textSecondary">Current status</p>
          <p className="mt-2 text-xl font-semibold text-textPrimary">In transit</p>
          <p className="mt-1 text-sm text-textSecondary">Estimated delivery: Sep 18, 2026</p>
        </div>
      </div>
    </div>
  );
}
