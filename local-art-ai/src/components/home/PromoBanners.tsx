export default function PromoBanners() {
  return (
    <section className="mt-10 grid gap-4 lg:grid-cols-2">
      <div className="rounded-card border border-border bg-gradient-to-r from-gold500/20 to-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold600">Limited drop</p>
        <h3 className="mt-3 text-2xl font-bold text-textPrimary">Collector picks under $100</h3>
        <p className="mt-2 max-w-md text-sm text-textSecondary">
          Discover small-batch finds from emerging artists designed for gifting and first-time collecting.
        </p>
      </div>

      <div className="rounded-card border border-border bg-gradient-to-r from-blue600/10 to-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue600">Studio spotlight</p>
        <h3 className="mt-3 text-2xl font-bold text-textPrimary">Artist stories and behind-the-scenes</h3>
        <p className="mt-2 max-w-md text-sm text-textSecondary">
          Learn how each collection is made, what inspired it, and who is behind the craft.
        </p>
      </div>
    </section>
  );
}
