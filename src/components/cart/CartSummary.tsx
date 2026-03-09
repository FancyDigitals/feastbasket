import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../constants/routes";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

export function CartSummary() {
  const { summary } = useCart();

  return (
    <div className="space-y-4 rounded-3xl bg-slate-50 p-6">
      <h2 className="text-lg font-semibold text-slate-950">Order summary</h2>
      <div className="space-y-2 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(summary.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{formatPrice(summary.deliveryFee)}</span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-semibold text-slate-950">
          <span>Total</span>
          <span>{formatPrice(summary.total)}</span>
        </div>
      </div>
      <Link
        to={APP_ROUTES.checkout}
        className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
      >
        Proceed to checkout
      </Link>
    </div>
  );
}