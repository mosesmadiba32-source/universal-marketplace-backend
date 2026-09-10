export default function NotificationsPage() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-textPrimary">Notifications</h1>
      <div className="mt-6 space-y-3">
        {[
          { title: "Order shipped", detail: "Your Abstract Canvas has been dispatched." },
          { title: "New collection", detail: "Explore the latest drop from emerging artists." },
        ].map((entry) => (
          <div key={entry.title} className="rounded-btn border border-border bg-bgPage p-4">
            <p className="font-semibold text-textPrimary">{entry.title}</p>
            <p className="mt-1 text-sm text-textSecondary">{entry.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
