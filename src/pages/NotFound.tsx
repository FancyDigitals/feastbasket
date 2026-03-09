import { Link } from "react-router-dom";
import { APP_ROUTES } from "../constants/routes";

export default function NotFound() {
  return (
    <section className="space-y-4 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">404</p>
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Page not found</h1>
      <p className="text-sm leading-6 text-slate-600">The page you requested does not exist or may have been moved.</p>
      <Link to={APP_ROUTES.home} className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
        Return home
      </Link>
    </section>
  );
}