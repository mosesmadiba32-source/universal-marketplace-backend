const trustItems = [
  { title: "Secure checkout", detail: "Encrypted payment flow" },
  { title: "Verified sellers", detail: "Curated artist network" },
  { title: "Fast delivery", detail: "Tracked shipping updates" },
  { title: "Easy returns", detail: "Hassle-free support" },
];

export default function TrustPanel() {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-4">
      {trustItems.map((item) => (
        <div key={item.title} className="rounded-card border border-border bg-surface p-5 shadow-sm">
          <div className="text-sm font-semibold text-textPrimary">{item.title}</div>
          <p className="mt-2 text-sm text-textSecondary">{item.detail}</p>
        </div>
      ))}
    </section>
  );
}
