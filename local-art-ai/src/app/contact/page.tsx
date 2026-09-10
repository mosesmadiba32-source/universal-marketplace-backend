export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-textPrimary">Contact us</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-textPrimary">Reach our team</h2>
          <p className="mt-3 text-sm text-textSecondary">Email: hello@localartai.com</p>
          <p className="text-sm text-textSecondary">Phone: +1 (212) 555-0192</p>
        </div>
        <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-textPrimary">Send a message</h2>
          <div className="mt-4 space-y-3">
            <input placeholder="Name" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
            <input placeholder="Email" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
            <textarea rows={4} placeholder="Your message" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
            <button className="rounded-btn bg-navy900 px-4 py-3 text-sm font-semibold text-white">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
