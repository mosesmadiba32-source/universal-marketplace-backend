import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-textPrimary">Create your account</h1>
        <p className="mt-2 text-sm text-textSecondary">Join to save favorites, track orders, and manage your collection.</p>

        <form className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-textPrimary">First name</label>
              <input type="text" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-textPrimary">Last name</label>
              <input type="text" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-textPrimary">Email</label>
            <input type="email" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-textPrimary">Password</label>
            <input type="password" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
          </div>

          <button type="submit" className="w-full rounded-btn bg-navy900 px-4 py-3 text-sm font-semibold text-white">
            Create account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-textSecondary">
          Already have an account?{" "}
          <Link href="/login" className="text-blue600 hover:text-blue700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
