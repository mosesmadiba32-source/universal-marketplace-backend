export default function OrderTrackingPanel() {
  return (
    <section className="mt-10 rounded-card border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue600">Track your order</p>
          <h2 className="mt-2 text-2xl font-bold text-textPrimary">See delivery progress in real time</h2>
        </div>
        <div className="flex w-full max-w-md items-center gap-2 rounded-btn border border-border bg-bgPage px-3 py-2">
          <input
            placeholder="Enter order number"
            className="w-full border-0 bg-transparent text-sm text-textPrimary placeholder:text-textSecondary focus:ring-0"
          />
          <button className="rounded-btn bg-navy900 px-4 py-2 text-sm font-medium text-white">
            Track
          </button>
        </div>
      </div>
    </section>
  );
}
