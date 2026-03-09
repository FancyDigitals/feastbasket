import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Feast Basket</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
          <p className="text-sm text-slate-600">Secure access to your grocery orders, profile, and checkout.</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}