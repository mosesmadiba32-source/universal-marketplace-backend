export default function PaymentMethodsPage() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-textPrimary">Payment methods</h1>
      <div className="mt-6 space-y-4">
        {[
          { label: "Visa •••• 4581", status: "Default" },
          { label: "PayPal", status: "Secondary" },
        ].map((entry) => (
          <div key={entry.label} className="flex items-center justify-between rounded-btn border border-border bg-bgPage p-4">
            <p className="font-medium text-textPrimary">{entry.label}</p>
            <span className="rounded-full bg-blue600/10 px-2 py-1 text-xs font-semibold text-blue600">
              {entry.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
