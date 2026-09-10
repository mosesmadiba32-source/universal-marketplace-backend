const faqs = [
  { question: "Do you offer free shipping?", answer: "Yes, orders above $75 qualify for complimentary shipping within the continental US." },
  { question: "Are your pieces authentic?", answer: "Every item is sourced from verified artists or reputable galleries and includes origin details." },
  { question: "Can I gift wrap an order?", answer: "Yes, select gift wrapping during checkout for eligible products." },
];

export default function FAQsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-textPrimary">Frequently asked questions</h1>
      <div className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-card border border-border bg-surface p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-textPrimary">{faq.question}</h2>
            <p className="mt-2 text-sm text-textSecondary">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
