export default function ProfilePage() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-textPrimary">Profile</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-textPrimary">First name</label>
          <input defaultValue="Alex" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-textPrimary">Last name</label>
          <input defaultValue="Morgan" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-textPrimary">Email</label>
          <input defaultValue="alex@example.com" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
        </div>
      </div>
      <button className="mt-6 rounded-btn bg-navy900 px-4 py-3 text-sm font-semibold text-white">
        Save changes
      </button>
    </div>
  );
}
