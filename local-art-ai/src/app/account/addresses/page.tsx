export default function AddressesPage() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-textPrimary">Addresses</h1>
      <div className="mt-6 space-y-4">
        {[
          { title: "Home", detail: "145 Lakeview Avenue, New York, NY" },
          { title: "Office", detail: "88 Hudson Street, New York, NY" },
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
