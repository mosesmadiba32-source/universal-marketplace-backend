import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-textPrimary">Welcome back</h1>
        <p className="mt-2 text-sm text-textSecondary">Sign in to continue shopping and manage your account.</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-textPrimary">Email</label>
            <input type="email" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-textPrimary">Password</label>
            <input type="password" className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
          </div>

          <button type="submit" className="w-full rounded-btn bg-navy900 px-4 py-3 text-sm font-semibold text-white">
            Sign in
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-sm">
          <Link href="/register" className="text-blue600 hover:text-blue700">
            Create account
          </Link>
          <Link href="/forgot-password" className="text-textSecondary hover:text-textPrimary">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
