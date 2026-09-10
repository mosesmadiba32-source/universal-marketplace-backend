export default function SettingsPage() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-textPrimary">Settings</h1>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between rounded-btn border border-border bg-bgPage p-4">
          <div>
            <p className="font-medium text-textPrimary">Email notifications</p>
            <p className="text-sm text-textSecondary">Receive order updates and new collection alerts.</p>
          </div>
          <button className="rounded-full bg-green600 px-3 py-1 text-xs font-semibold text-white">Enabled</button>
        </div>
        <div className="flex items-center justify-between rounded-btn border border-border bg-bgPage p-4">
          <div>
            <p className="font-medium text-textPrimary">Marketing emails</p>
            <p className="text-sm text-textSecondary">Promotions and artist spotlights.</p>
          </div>
          <button className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-textPrimary">Optional</button>
        </div>
      </div>
    </div>
  );
}
