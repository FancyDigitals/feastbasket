import { PAYMENT_METHODS } from "../constants/paymentMethods";
import { NIGERIAN_STATES } from "../data/nigerianStates";

export default function Checkout() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Checkout</h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">Finalize delivery information and payment details with a checkout flow ready for service integration.</p>
      </div>
      <form className="grid gap-6 lg:grid-cols-2">
        <input className="rounded-full border border-slate-300 px-5 py-3 outline-none" placeholder="Full name" />
        <input className="rounded-full border border-slate-300 px-5 py-3 outline-none" placeholder="Phone number" />
        <input className="rounded-full border border-slate-300 px-5 py-3 outline-none lg:col-span-2" placeholder="Street address" />
        <input className="rounded-full border border-slate-300 px-5 py-3 outline-none" placeholder="City" />
        <select className="rounded-full border border-slate-300 px-5 py-3 outline-none">
          {NIGERIAN_STATES.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </select>
        <select className="rounded-full border border-slate-300 px-5 py-3 outline-none lg:col-span-2">
          {PAYMENT_METHODS.map((method) => (
            <option key={method}>{method}</option>
          ))}
        </select>
      </form>
    </section>
  );
}