export default function OrdersPage() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-textPrimary">Orders</h1>
      <div className="mt-6 space-y-3">
        {[
          { id: "#2048", item: "Abstract Canvas", status: "Shipped", total: "$120.00" },
          { id: "#2041", item: "Stone Form", status: "Delivered", total: "$140.00" },
        ].map((order) => (
          <div key={order.id} className="flex items-center justify-between rounded-btn border border-border bg-bgPage px-4 py-3">
            <div>
              <p className="font-semibold text-textPrimary">{order.item}</p>
              <p className="text-sm text-textSecondary">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-textPrimary">{order.total}</p>
              <p className="text-xs text-green600">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
