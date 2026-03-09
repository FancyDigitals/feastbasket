import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../constants/routes";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-slate-900">Feast Basket Ecommerce Website</p>
          <p>Fast grocery ordering built for households across Nigeria.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link to={APP_ROUTES.products} className="hover:text-slate-950">
            Products
          </Link>
          <Link to={APP_ROUTES.orders} className="hover:text-slate-950">
            Orders
          </Link>
          <Link to={APP_ROUTES.profile} className="hover:text-slate-950">
            Account
          </Link>
        </div>
      </div>
    </footer>
  );
}