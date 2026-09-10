export default function SecurityPage() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-textPrimary">Security</h1>
      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-textPrimary">Current password</label>
          <input type="password" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-textPrimary">New password</label>
          <input type="password" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
        </div>
      </div>
      <button className="mt-6 rounded-btn bg-navy900 px-4 py-3 text-sm font-semibold text-white">
        Update password
      </button>
    </div>
  );
}
