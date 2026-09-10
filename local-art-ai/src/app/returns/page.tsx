export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-textPrimary">Returns & exchanges</h1>
      <p className="mt-2 text-sm text-textSecondary">
        We accept returns within 30 days of delivery for eligible items in original condition.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          { title: "Eligibility", text: "Unworn, unopened, and undamaged items qualify for return." },
          { title: "Shipping", text: "Customers can request a prepaid label in the order detail page." },
          { title: "Refunds", text: "Funds are returned to the original payment method within 5-7 business days." },
          { title: "Exchanges", text: "Exchange requests are processed for size or artwork variations when inventory allows." },
        ].map((item) => (
          <div key={item.title} className="rounded-card border border-border bg-surface p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-textPrimary">{item.title}</h2>
            <p className="mt-2 text-sm text-textSecondary">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
