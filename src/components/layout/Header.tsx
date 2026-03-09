import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
  FiChevronDown,
  FiMapPin,
  FiPackage,
  FiLogOut,
  FiGrid,
  FiTruck,
} from "react-icons/fi";
import { APP_ROUTES } from "../../constants/routes";
import { CATEGORIES } from "../../constants/categories";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { env } from "../../config/env";

// Helper function to get category emoji
function getCategoryEmoji(slug: string): string {
  const emojiMap: Record<string, string> = {
    "vegetables": "🥬",
    "fruits": "🍎",
    "rice-grains": "🍚",
    "beverages": "🥤",
    "snacks": "🍿",
    "frozen-foods": "🧊",
    "household-items": "🏠",
    "cooking-ingredients": "🧂",
  };
  return emojiMap[slug] || "📦";
}

// Helper function to get category description
function getCategoryDescription(slug: string): string {
  const descriptionMap: Record<string, string> = {
    "vegetables": "Fresh and organic vegetables",
    "fruits": "Juicy seasonal fruits",
    "rice-grains": "Premium rice and grains",
    "beverages": "Refreshing drinks",
    "snacks": "Delicious snacks",
    "frozen-foods": "Quality frozen foods",
    "household-items": "Home essentials",
    "cooking-ingredients": "Spices and ingredients",
  };
  return descriptionMap[slug] || "Explore our collection";
}

export function Header() {
  const navigate = useNavigate();
  const { summary } = useCart();
  const { user, isAuthenticated, signout } = useAuth();

  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`${APP_ROUTES.search}?q=${encodeURIComponent(search)}`);
    setSearch("");
    setIsSearchFocused(false);
  };

  const handleSignout = () => {
    signout();
    setIsUserDropdownOpen(false);
    navigate(APP_ROUTES.home);
  };

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "U";
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* PROMO BANNER */}
      <div className="bg-gradient-to-r from-[#549558] to-[#3d7240] text-white">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
            <FiTruck className="h-4 w-4 animate-bounce" />
            <span>
              <strong>Free Delivery</strong> on orders above ₦25,000 in Lagos!
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Same day delivery available</span>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4 lg:gap-8">
            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>

            {/* LOGO */}
<Link
  to={APP_ROUTES.home}
  className="flex items-center gap-3 transition-transform hover:scale-105"
>

  <img
    src="/logo.png"
    alt={env.appName}
    className="h-10 w-auto object-contain"
  />

  <div className="hidden sm:block">
    <span className="text-xl font-bold tracking-tight text-neutral-900">
      {env.appName}
    </span>

    <p className="text-[10px] text-neutral-500 leading-none">
      Fresh groceries delivered
    </p>
  </div>

</Link>

            {/* LOCATION SELECTOR - Desktop */}
            <button className="hidden items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:border-[#549558] hover:text-[#549558] lg:flex">
              <FiMapPin className="h-4 w-4" />
              <span className="max-w-[100px] truncate">Lagos, NG</span>
              <FiChevronDown className="h-3 w-3" />
            </button>

            {/* SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className={`hidden flex-1 transition-all duration-300 md:flex ${
                isSearchFocused ? "max-w-2xl" : "max-w-xl"
              }`}
            >
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FiSearch className={`h-5 w-5 transition-colors ${
                    isSearchFocused ? "text-[#549558]" : "text-neutral-400"
                  }`} />
                </div>
                <input
                  type="text"
                  placeholder="Search for rice, vegetables, fruits..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full rounded-full border-2 border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-24 text-sm transition-all placeholder:text-neutral-400 focus:border-[#549558] focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-[#549558] px-5 py-1.5 text-sm font-medium text-white transition-all hover:bg-[#468349] hover:shadow-md active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* WISHLIST */}
              <Link
                to={APP_ROUTES.wishlist}
                className="relative rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-[#549558]"
                aria-label="Wishlist"
              >
                <FiHeart className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>

              {/* CART */}
              <Link
                to={APP_ROUTES.cart}
                className="relative flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-2 text-white transition-all hover:bg-neutral-800 hover:shadow-md sm:px-4"
              >
                <FiShoppingCart className="h-5 w-5" />
                {summary.itemCount > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#f6ae59] px-1.5 text-xs font-bold text-white">
                    {summary.itemCount > 99 ? "99+" : summary.itemCount}
                  </span>
                )}
                <span className="hidden text-sm font-medium sm:inline">Cart</span>
              </Link>

              {/* USER MENU */}
              <div className="relative" ref={userDropdownRef}>
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 rounded-full p-1.5 transition-colors hover:bg-neutral-100"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#549558] to-[#3d7240] text-sm font-bold text-white shadow-sm">
                        {getUserInitials()}
                      </div>
                      <FiChevronDown className={`hidden h-4 w-4 text-neutral-500 transition-transform sm:block ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`} />
                    </button>

                    {/* User Dropdown */}
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-2xl border border-neutral-100 bg-white py-2 shadow-xl">
                        {/* User Info */}
                        <div className="border-b border-neutral-100 px-4 py-3">
                          <p className="text-sm font-semibold text-neutral-900">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                        </div>

                        <div className="py-1">
                          <Link
                            to={APP_ROUTES.profile}
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                          >
                            <FiUser className="h-4 w-4" />
                            My Profile
                          </Link>
                          <Link
                            to={APP_ROUTES.orders}
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                          >
                            <FiPackage className="h-4 w-4" />
                            My Orders
                          </Link>
                          <Link
                            to={APP_ROUTES.wishlist}
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                          >
                            <FiHeart className="h-4 w-4" />
                            Wishlist
                          </Link>
                        </div>

                        <div className="border-t border-neutral-100 py-1">
                          <button
                            onClick={handleSignout}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                          >
                            <FiLogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to={APP_ROUTES.signin}
                      className="hidden rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 sm:block"
                    >
                      Sign In
                    </Link>
                    <Link
                      to={APP_ROUTES.signup}
                      className="rounded-full bg-[#549558] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#468349] hover:shadow-md"
                    >
                      <span className="hidden sm:inline">Get Started</span>
                      <FiUser className="h-5 w-5 sm:hidden" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY NAVIGATION - Desktop */}
      <nav className="hidden border-b border-neutral-100 bg-neutral-50/50 lg:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1">
            {/* All Categories Dropdown */}
            <div className="relative" ref={categoryDropdownRef}>
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-2 rounded-lg bg-[#549558] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#468349]"
              >
                <FiGrid className="h-4 w-4" />
                All Categories
                <FiChevronDown className={`h-4 w-4 transition-transform ${
                  isCategoryDropdownOpen ? "rotate-180" : ""
                }`} />
              </button>

              {/* Categories Dropdown Menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-72 origin-top-left rounded-2xl border border-neutral-100 bg-white py-2 shadow-xl">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-neutral-50"
                    >
                      <span className="text-xl">
                        {getCategoryEmoji(cat.slug)}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-neutral-900 group-hover:text-[#549558]">
                          {cat.name}
                        </p>
                        <p className="text-xs text-neutral-500 line-clamp-1">
                          {getCategoryDescription(cat.slug)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Category Links */}
            <div className="flex items-center overflow-x-auto">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <NavLink
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className={({ isActive }) =>
                    `whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#549558] border-b-2 border-[#549558]"
                        : "text-neutral-600 hover:text-[#549558]"
                    }`
                  }
                >
                  {cat.name}
                </NavLink>
              ))}
            </div>

            {/* Quick Links */}
            <div className="ml-auto flex items-center gap-4">
              <NavLink
                to={`${APP_ROUTES.products}?filter=deals`}
                className="flex items-center gap-1 rounded-full bg-[#f6ae59]/10 px-3 py-1.5 text-sm font-medium text-[#e89830] transition-colors hover:bg-[#f6ae59]/20"
              >
                🔥 Hot Deals
              </NavLink>
              <NavLink
                to={`${APP_ROUTES.products}?filter=new`}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-[#549558]"
              >
                New Arrivals
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SEARCH - Shows below header on mobile */}
      <div className="border-b border-neutral-100 bg-white px-4 py-3 md:hidden">
        <form onSubmit={handleSearch} className="relative">
          <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search for groceries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm placeholder:text-neutral-400 focus:border-[#549558] focus:bg-white focus:outline-none"
          />
        </form>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[129px] z-50 bg-white lg:hidden">
          <div className="h-full overflow-y-auto pb-20">
            {/* Location */}
            <div className="border-b border-neutral-100 px-4 py-4">
              <button className="flex w-full items-center gap-3 rounded-xl bg-neutral-50 p-3">
                <FiMapPin className="h-5 w-5 text-[#549558]" />
                <div className="text-left">
                  <p className="text-xs text-neutral-500">Deliver to</p>
                  <p className="text-sm font-medium text-neutral-900">Lagos, Nigeria</p>
                </div>
                <FiChevronDown className="ml-auto h-4 w-4 text-neutral-400" />
              </button>
            </div>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="border-b border-neutral-100 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#549558] to-[#3d7240] text-lg font-bold text-white">
                    {getUserInitials()}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">
                      Hi, {user?.firstName}!
                    </p>
                    <p className="text-sm text-neutral-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-b border-neutral-100 px-4 py-4">
                <div className="flex gap-3">
                  <Link
                    to={APP_ROUTES.signin}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 rounded-xl border border-neutral-200 py-3 text-center text-sm font-medium text-neutral-700"
                  >
                    Sign In
                  </Link>
                  <Link
                    to={APP_ROUTES.signup}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 rounded-xl bg-[#549558] py-3 text-center text-sm font-medium text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="px-4 py-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Categories
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-neutral-50"
                  >
                    <span className="text-xl">{getCategoryEmoji(cat.slug)}</span>
                    <span className="text-sm font-medium text-neutral-700">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="border-t border-neutral-100 px-4 py-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Quick Links
              </h3>
              <div className="space-y-1">
                <Link
                  to={`${APP_ROUTES.products}?filter=deals`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-neutral-50"
                >
                  <span className="text-xl">🔥</span>
                  <span className="text-sm font-medium text-neutral-700">Hot Deals</span>
                </Link>
                <Link
                  to={`${APP_ROUTES.products}?filter=new`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-neutral-50"
                >
                  <span className="text-xl">✨</span>
                  <span className="text-sm font-medium text-neutral-700">New Arrivals</span>
                </Link>
              </div>
            </div>

            {/* Account Links */}
            {isAuthenticated && (
              <div className="border-t border-neutral-100 px-4 py-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  My Account
                </h3>
                <div className="space-y-1">
                  <Link
                    to={APP_ROUTES.profile}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-neutral-50"
                  >
                    <FiUser className="h-5 w-5 text-neutral-500" />
                    <span className="text-sm font-medium text-neutral-700">My Profile</span>
                  </Link>
                  <Link
                    to={APP_ROUTES.orders}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-neutral-50"
                  >
                    <FiPackage className="h-5 w-5 text-neutral-500" />
                    <span className="text-sm font-medium text-neutral-700">My Orders</span>
                  </Link>
                  <Link
                    to={APP_ROUTES.wishlist}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-neutral-50"
                  >
                    <FiHeart className="h-5 w-5 text-neutral-500" />
                    <span className="text-sm font-medium text-neutral-700">Wishlist</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-600 transition-colors hover:bg-red-50"
                  >
                    <FiLogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;