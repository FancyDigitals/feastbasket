// pages/ProfilePage.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPackage,
  FiMapPin,
  FiHeart,
  FiLock,
  FiLogOut,
  FiEdit3,
  FiChevronRight,
  FiCheck,
  FiX,
  FiPlus,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiShoppingBag,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiMail,
  FiPhone,
  FiHome,
  FiSettings,
  FiShield,
  FiCreditCard,
} from "react-icons/fi";
import { APP_ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";
import { formatPrice } from "../utils/formatPrice";

// Types
type TabType = "overview" | "orders" | "addresses" | "security";

type Address = {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  isDefault: boolean;
};

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
};

// Mock Data
const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 25500,
    itemCount: 5,
    items: [
      { name: "Organic Tomatoes", quantity: 2, price: 1500, image: "/images/tomatoes.jpg" },
      { name: "Basmati Rice 5kg", quantity: 1, price: 15000, image: "/images/rice.jpg" },
      { name: "Fresh Eggs (12)", quantity: 2, price: 4500, image: "/images/eggs.jpg" },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 18750,
    itemCount: 3,
    items: [
      { name: "Chicken Breast 1kg", quantity: 2, price: 8500, image: "/images/chicken.jpg" },
      { name: "Olive Oil 500ml", quantity: 1, price: 5500, image: "/images/oil.jpg" },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    date: "2024-01-25",
    status: "processing",
    total: 32000,
    itemCount: 8,
    items: [
      { name: "Assorted Vegetables", quantity: 5, price: 12000, image: "/images/veggies.jpg" },
      { name: "Fresh Fruits Pack", quantity: 3, price: 20000, image: "/images/fruits.jpg" },
    ],
  },
];

const MOCK_ADDRESSES: Address[] = [
  {
    id: "1",
    label: "Home",
    fullName: "John Doe",
    phone: "+234 801 234 5678",
    address: "123 Victoria Island",
    city: "Lagos",
    state: "Lagos State",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    fullName: "John Doe",
    phone: "+234 802 345 6789",
    address: "45 Broad Street, Marina",
    city: "Lagos",
    state: "Lagos State",
    isDefault: false,
  },
];

// Helper Components
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const config = {
    pending: { bg: "bg-amber-100", text: "text-amber-700", icon: FiClock, label: "Pending" },
    processing: { bg: "bg-blue-100", text: "text-blue-700", icon: FiPackage, label: "Processing" },
    shipped: { bg: "bg-purple-100", text: "text-purple-700", icon: FiTruck, label: "Shipped" },
    delivered: { bg: "bg-green-100", text: "text-green-700", icon: FiCheckCircle, label: "Delivered" },
    cancelled: { bg: "bg-red-100", text: "text-red-700", icon: FiX, label: "Cancelled" },
  };

  const { bg, text, icon: Icon, label } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${bg} ${text}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handlers
  const handleSignout = () => {
    signout();
    navigate(APP_ROUTES.signin);
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveLoading(false);
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }
    setSaveLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveLoading(false);
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "U";
  };

  // Tab Navigation Items
  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: FiUser },
    { id: "orders" as TabType, label: "Orders", icon: FiPackage },
    { id: "addresses" as TabType, label: "Addresses", icon: FiMapPin },
    { id: "security" as TabType, label: "Security", icon: FiShield },
  ];

  // Redirect if not authenticated
  if (!user) {
    navigate(APP_ROUTES.signin);
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-neutral-900">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />
          </div>
          <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-[#549558]/20 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#f6ae59]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm">
            <Link to={APP_ROUTES.home} className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors">
              <FiHome className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <FiChevronRight className="h-4 w-4 text-neutral-600" />
            <span className="font-medium text-white">My Account</span>
          </nav>

          {/* Profile Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#549558] to-[#3d7240] text-2xl font-bold text-white shadow-xl sm:h-24 sm:w-24 sm:text-3xl">
                  {getUserInitials()}
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-lg">
                  <FiCheckCircle className="h-5 w-5 text-[#549558]" />
                </div>
              </div>

              {/* Info */}
              <div>
                <h1 className="text-2xl font-black text-white sm:text-3xl">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="mt-1 text-neutral-400">{user.email}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#549558]/20 px-3 py-1 text-xs font-semibold text-[#549558]">
                    <FiCheckCircle className="h-3 w-3" />
                    Verified Account
                  </span>
                  <span className="text-xs text-neutral-500">Member since Jan 2024</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                to={APP_ROUTES.wishlist}
                className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <FiHeart className="h-4 w-4" />
                <span className="hidden sm:inline">Wishlist</span>
              </Link>
              <button
                onClick={handleSignout}
                className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
              >
                <FiLogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" className="w-full">
            <path d="M0 25L60 21.7C120 18 240 12 360 12C480 12 600 18 720 21.7C840 25 960 25 1080 21.7C1200 18 1320 12 1380 9L1440 6V50H0V25Z" fill="#FAFAFA" />
          </svg>
        </div>
      </div>

      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-xl bg-[#549558] px-5 py-3 text-white shadow-xl animate-in slide-in-from-top">
          <FiCheckCircle className="h-5 w-5" />
          <span className="font-semibold">Profile updated successfully!</span>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-64">
            <div className="sticky top-24 space-y-2 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-neutral-900 text-white shadow-md"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                    {tab.id === "orders" && orders.length > 0 && (
                      <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        activeTab === tab.id ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"
                      }`}>
                        {orders.length}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Divider */}
              <div className="my-2 h-px bg-neutral-100" />

              {/* Quick Links */}
              <Link
                to={APP_ROUTES.wishlist}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-50"
              >
                <FiHeart className="h-5 w-5" />
                My Wishlist
              </Link>
              <Link
                to={APP_ROUTES.cart}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-50"
              >
                <FiShoppingBag className="h-5 w-5" />
                My Cart
              </Link>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Profile Info Card */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
                    <div>
                      <h2 className="text-lg font-bold text-neutral-900">Personal Information</h2>
                      <p className="text-sm text-neutral-500">Manage your personal details</p>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
                      >
                        <FiEdit3 className="h-4 w-4" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={saveLoading}
                          className="flex items-center gap-2 rounded-xl bg-[#549558] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#468349] disabled:opacity-50"
                        >
                          {saveLoading ? (
                            <>
                              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Saving...
                            </>
                          ) : (
                            <>
                              <FiCheck className="h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* First Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-neutral-700">First Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                          />
                        ) : (
                          <p className="rounded-xl bg-neutral-50 px-4 py-3 text-neutral-900">{user.firstName}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-neutral-700">Last Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                          />
                        ) : (
                          <p className="rounded-xl bg-neutral-50 px-4 py-3 text-neutral-900">{user.lastName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-neutral-700">Email Address</label>
                        <div className="relative">
                          <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                          <p className="rounded-xl bg-neutral-50 py-3 pl-12 pr-4 text-neutral-900">{user.email}</p>
                        </div>
                        <p className="text-xs text-neutral-500">Email cannot be changed</p>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-neutral-700">Phone Number</label>
                        {isEditing ? (
                          <div className="relative">
                            <FiPhone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+234 800 000 0000"
                              className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3 pl-12 pr-4 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <FiPhone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                            <p className="rounded-xl bg-neutral-50 py-3 pl-12 pr-4 text-neutral-900">
                              {user.phone || "Not provided"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                        <FiPackage className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-neutral-900">{orders.length}</p>
                        <p className="text-sm text-neutral-500">Total Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                        <FiCheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-neutral-900">
                          {orders.filter((o) => o.status === "delivered").length}
                        </p>
                        <p className="text-sm text-neutral-500">Delivered</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                        <FiMapPin className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-neutral-900">{addresses.length}</p>
                        <p className="text-sm text-neutral-500">Saved Addresses</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
                    <h2 className="text-lg font-bold text-neutral-900">Recent Orders</h2>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-sm font-semibold text-[#549558] hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {orders.slice(0, 2).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                            <FiPackage className="h-6 w-6 text-neutral-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-neutral-900">{order.orderNumber}</p>
                            <p className="text-sm text-neutral-500">{order.itemCount} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <StatusBadge status={order.status} />
                          <p className="mt-1 text-sm font-semibold text-neutral-900">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-neutral-900">My Orders</h2>
                    <p className="text-neutral-500">Track and manage your orders</p>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-white py-16">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-100">
                      <FiPackage className="h-10 w-10 text-neutral-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-neutral-900">No orders yet</h3>
                    <p className="mb-6 text-neutral-500">Start shopping to see your orders here</p>
                    <Link
                      to={APP_ROUTES.products}
                      className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-bold text-white"
                    >
                      <FiShoppingBag className="h-4 w-4" />
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 bg-neutral-50 px-6 py-4">
                          <div className="flex items-center gap-6">
                            <div>
                              <p className="text-xs text-neutral-500">Order Number</p>
                              <p className="font-bold text-neutral-900">{order.orderNumber}</p>
                            </div>
                            <div className="hidden sm:block">
                              <p className="text-xs text-neutral-500">Order Date</p>
                              <p className="font-semibold text-neutral-700">
                                {new Date(order.date).toLocaleDateString("en-NG", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <StatusBadge status={order.status} />
                        </div>

                        {/* Order Items */}
                        <div className="divide-y divide-neutral-100">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-4">
                              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/64";
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-neutral-900">{item.name}</p>
                                <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-bold text-neutral-900">{formatPrice(item.price)}</p>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer */}
                        <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-6 py-4">
                          <div>
                            <p className="text-sm text-neutral-500">Total Amount</p>
                            <p className="text-xl font-black text-neutral-900">{formatPrice(order.total)}</p>
                          </div>
                          <button className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-neutral-900">Saved Addresses</h2>
                    <p className="text-neutral-500">Manage your delivery addresses</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingAddress(null);
                      setShowAddressModal(true);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#549558]"
                  >
                    <FiPlus className="h-4 w-4" />
                    Add Address
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-white py-16">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-100">
                      <FiMapPin className="h-10 w-10 text-neutral-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-neutral-900">No addresses saved</h3>
                    <p className="mb-6 text-neutral-500">Add a delivery address to get started</p>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-bold text-white"
                    >
                      <FiPlus className="h-4 w-4" />
                      Add Address
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`relative rounded-2xl border-2 bg-white p-6 shadow-sm transition-all ${
                          address.isDefault ? "border-[#549558]" : "border-neutral-200"
                        }`}
                      >
                        {/* Default Badge */}
                        {address.isDefault && (
                          <span className="absolute right-4 top-4 rounded-full bg-[#549558]/10 px-3 py-1 text-xs font-semibold text-[#549558]">
                            Default
                          </span>
                        )}

                        {/* Label */}
                        <div className="mb-4 flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
                            {address.label === "Home" ? (
                              <FiHome className="h-5 w-5 text-neutral-600" />
                            ) : (
                              <FiMapPin className="h-5 w-5 text-neutral-600" />
                            )}
                          </div>
                          <span className="text-lg font-bold text-neutral-900">{address.label}</span>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm text-neutral-600">
                          <p className="font-semibold text-neutral-900">{address.fullName}</p>
                          <p>{address.address}</p>
                          <p>
                            {address.city}, {address.state}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <FiPhone className="h-4 w-4" />
                            {address.phone}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex items-center gap-3">
                          <button
                            onClick={() => {
                              setEditingAddress(address);
                              setShowAddressModal(true);
                            }}
                            className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
                          >
                            <FiEdit3 className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          {!address.isDefault && (
                            <>
                              <button
                                onClick={() => handleSetDefaultAddress(address.id)}
                                className="flex items-center gap-1.5 rounded-lg bg-[#549558]/10 px-3 py-2 text-xs font-semibold text-[#549558] transition-colors hover:bg-[#549558]/20"
                              >
                                <FiCheck className="h-3.5 w-3.5" />
                                Set as Default
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                              >
                                <FiTrash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900">Security Settings</h2>
                  <p className="text-neutral-500">Manage your account security</p>
                </div>

                {/* Change Password */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                        <FiLock className="h-6 w-6 text-neutral-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-neutral-900">Password</h3>
                        <p className="text-sm text-neutral-500">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
                    >
                      <FiEdit3 className="h-4 w-4" />
                      Change
                    </button>
                  </div>
                </div>

                {/* Two-Factor Auth */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                        <FiShield className="h-6 w-6 text-neutral-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-neutral-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-neutral-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="rounded-xl bg-[#549558] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#468349]">
                      Enable
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="border-b border-neutral-100 px-6 py-4">
                    <h3 className="font-bold text-neutral-900">Active Sessions</h3>
                    <p className="text-sm text-neutral-500">Manage devices where you're logged in</p>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                          <div className="h-3 w-3 rounded-full bg-green-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">Current Device</p>
                          <p className="text-sm text-neutral-500">Lagos, Nigeria • Chrome on Windows</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
                  <h3 className="flex items-center gap-2 font-bold text-red-700">
                    <FiAlertCircle className="h-5 w-5" />
                    Danger Zone
                  </h3>
                  <p className="mt-2 text-sm text-red-600">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="mt-4 rounded-xl border-2 border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setShowPasswordModal(false)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
              className="space-y-4"
            >
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Current Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3 pl-4 pr-12 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showPasswords.current ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3 pl-4 pr-12 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showPasswords.new ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3 pl-4 pr-12 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showPasswords.confirm ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <p className="text-sm text-red-500">Passwords do not match</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saveLoading || passwordData.newPassword !== passwordData.confirmPassword}
                className="w-full rounded-xl bg-neutral-900 py-4 font-bold text-white transition-colors hover:bg-[#549558] disabled:opacity-50"
              >
                {saveLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </>
      )}

      {/* Address Modal */}
      {showAddressModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddressModal(false);
              }}
              className="space-y-4"
            >
              {/* Label */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Address Label</label>
                <div className="flex gap-3">
                  {["Home", "Office", "Other"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      className="flex-1 rounded-xl border-2 border-neutral-200 py-3 text-sm font-semibold text-neutral-700 transition-all hover:border-neutral-300 focus:border-[#549558] focus:bg-[#549558]/5"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Full Name</label>
                <input
                  type="text"
                  defaultValue={editingAddress?.fullName}
                  placeholder="John Doe"
                  className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Phone Number</label>
                <input
                  type="tel"
                  defaultValue={editingAddress?.phone}
                  placeholder="+234 800 000 0000"
                  className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Street Address</label>
                <textarea
                  defaultValue={editingAddress?.address}
                  placeholder="123 Victoria Island..."
                  rows={2}
                  className="w-full resize-none rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                  required
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-700">City</label>
                  <input
                    type="text"
                    defaultValue={editingAddress?.city}
                    placeholder="Lagos"
                    className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-700">State</label>
                  <input
                    type="text"
                    defaultValue={editingAddress?.state}
                    placeholder="Lagos State"
                    className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all focus:border-[#549558] focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Default Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  defaultChecked={editingAddress?.isDefault}
                  className="h-4 w-4 rounded border-neutral-300 text-[#549558] focus:ring-[#549558]"
                />
                <label htmlFor="defaultAddress" className="text-sm text-neutral-600">
                  Set as default delivery address
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-neutral-900 py-4 font-bold text-white transition-colors hover:bg-[#549558]"
              >
                {editingAddress ? "Update Address" : "Add Address"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}