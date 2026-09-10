import Link from "next/link";

const stats = [
  { label: "Orders placed", value: "12" },
  { label: "Wishlist items", value: "8" },
  { label: "Saved addresses", value: "3" },
  { label: "Support tickets", value: "1" },
];

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue600">Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-textPrimary">Welcome back, Alex</h1>
        <p className="mt-2 text-sm text-textSecondary">Here is a quick overview of your recent activity and account health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-card border border-border bg-surface p-5 shadow-sm">
            <p className="text-sm text-textSecondary">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-textPrimary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-textPrimary">Recent orders</h2>
          <Link href="/account/orders" className="text-sm font-semibold text-blue600 hover:text-blue700">
            View all
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {[
            { id: "#2048", item: "Abstract Canvas", status: "Shipped", date: "May 18, 2026" },
            { id: "#2041", item: "Stone Form", status: "Delivered", date: "May 11, 2026" },
          ].map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-btn border border-border bg-bgPage px-4 py-3">
              <div>
                <p className="font-semibold text-textPrimary">{order.item}</p>
                <p className="text-sm text-textSecondary">{order.id} • {order.date}</p>
              </div>
              <span className="rounded-full bg-green600/10 px-2 py-1 text-xs font-semibold text-green600">
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
