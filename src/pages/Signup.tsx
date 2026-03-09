import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    firstName: "Ada",
    lastName: "Okafor",
    email: "ada@feastbasket.com",
    phone: "+2348012345678",
    password: "password123",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signup(form);
    navigate(APP_ROUTES.home);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input value={form.firstName} onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))} className="w-full rounded-full border border-slate-300 px-5 py-3 outline-none" placeholder="First name" />
      <input value={form.lastName} onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))} className="w-full rounded-full border border-slate-300 px-5 py-3 outline-none" placeholder="Last name" />
      <input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} className="w-full rounded-full border border-slate-300 px-5 py-3 outline-none" placeholder="Email address" type="email" />
      <input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} className="w-full rounded-full border border-slate-300 px-5 py-3 outline-none" placeholder="Phone number" />
      <input value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} className="w-full rounded-full border border-slate-300 px-5 py-3 outline-none" placeholder="Password" type="password" />
      <button type="submit" className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
        Create account
      </button>
      <p className="text-center text-sm text-slate-600">
        Already have an account? <Link to={APP_ROUTES.signin} className="font-medium text-slate-950">Sign in</Link>
      </p>
    </form>
  );
}