import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import { APP_ROUTES } from "../constants/routes";

const Home = lazy(() => import("../pages/Home"));
const ProductList = lazy(() => import("../pages/ProductList"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Orders = lazy(() => import("../pages/Orders"));
const Profile = lazy(() => import("../pages/Profile"));
const Signin = lazy(() => import("../pages/Signin"));
const Signup = lazy(() => import("../pages/Signup"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const SearchResults = lazy(() => import("../pages/SearchResults"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-slate-600">Loading page...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={APP_ROUTES.home} element={<Home />} />
          <Route path={APP_ROUTES.products} element={<ProductList />} />
          <Route path={APP_ROUTES.productDetail} element={<ProductDetail />} />
          <Route path={APP_ROUTES.cart} element={<Cart />} />
          <Route path={APP_ROUTES.checkout} element={<Checkout />} />
          <Route path={APP_ROUTES.orders} element={<Orders />} />
          <Route path={APP_ROUTES.profile} element={<Profile />} />
          <Route path={APP_ROUTES.category} element={<CategoryPage />} />
          <Route path={APP_ROUTES.search} element={<SearchResults />} />
          <Route path={APP_ROUTES.wishlist} element={<Wishlist />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={APP_ROUTES.signin} element={<Signin />} />
          <Route path={APP_ROUTES.signup} element={<Signup />} />
        </Route>

        <Route path="/home" element={<Navigate to={APP_ROUTES.home} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}