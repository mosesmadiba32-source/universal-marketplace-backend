export default function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-textPrimary">Help center</h1>
      <p className="mt-2 text-sm text-textSecondary">Find answers related to shipping, returns, orders, and account support.</p>

      <div className="mt-6 space-y-4">
        {[
          "How do I track my order?",
          "What is your return policy?",
          "Can I update my shipping address?",
        ].map((question) => (
          <div key={question} className="rounded-card border border-border bg-surface p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-textPrimary">{question}</h2>
            <p className="mt-2 text-sm text-textSecondary">
              Use your order number in the tracking panel, or visit your account orders page for detailed updates.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
