// pages/Checkout.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiChevronRight,
  FiHome,
  FiMapPin,
  FiUser,
  FiPhone,
  FiMail,
  FiCreditCard,
  FiTruck,
  FiShield,
  FiClock,
  FiPackage,
  FiArrowLeft,
  FiLock,
  FiEdit3,
} from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { formatPrice } from "../utils/formatPrice";
import { APP_ROUTES } from "../constants/routes";
import { NIGERIAN_STATES } from "../data/nigerianStates";
import { PAYMENT_METHODS } from "../constants/paymentMethods";

type CheckoutStep = 1 | 2 | 3;

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, summary, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  // State
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [selectedPayment, setSelectedPayment] = useState<string>(PAYMENT_METHODS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    fullName: user ? `${user.firstName} ${user.lastName}` : "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    notes: "",
  });

  // Handlers
  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as CheckoutStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newOrderId = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);
    setIsProcessing(false);
    clearCart();
  };

  // Get item price (handles variations)
  const getItemPrice = (item: typeof items[0]) => {
    return item.selectedVariation?.price || item.product.price;
  };

  // Empty cart state
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-12 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100">
            <FiPackage className="h-12 w-12 text-neutral-400" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-neutral-900">Your cart is empty</h1>
          <p className="mb-8 text-neutral-500">Add some items before checking out</p>
          <Link
            to={APP_ROUTES.products}
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            <FiPackage className="h-5 w-5" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // Order success state
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#549558]/30" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#549558]">
              <FiCheck className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-bold text-neutral-900">Order Placed!</h1>
          <p className="mb-2 text-neutral-500">Thank you for your order</p>
          <p className="mb-8 text-lg font-semibold text-[#549558]">#{orderId}</p>

          {/* Order Info Card */}
          <div className="mb-8 w-full rounded-2xl border border-neutral-200 bg-white p-6 text-left">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#549558]/10">
                <FiTruck className="h-5 w-5 text-[#549558]" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Estimated Delivery</p>
                <p className="text-sm text-neutral-500">Within 2-4 hours</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-neutral-100 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Items</span>
                <span className="font-medium text-neutral-900">{summary.itemCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Paid</span>
                <span className="font-bold text-neutral-900">{formatPrice(summary.total)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Link
              to={APP_ROUTES.orders}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3.5 font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              <FiPackage className="h-5 w-5" />
              Track Order
            </Link>
            <Link
              to={APP_ROUTES.home}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-neutral-200 bg-white py-3.5 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              <FiHome className="h-5 w-5" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main checkout view
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header with Steps */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm">
            <Link to={APP_ROUTES.home} className="text-neutral-500 hover:text-neutral-900">
              Home
            </Link>
            <FiChevronRight className="h-4 w-4 text-neutral-300" />
            <Link to={APP_ROUTES.cart} className="text-neutral-500 hover:text-neutral-900">
              Cart
            </Link>
            <FiChevronRight className="h-4 w-4 text-neutral-300" />
            <span className="font-medium text-neutral-900">Checkout</span>
          </nav>

          {/* Step Indicator */}
          <div className="flex items-center">
            {[
              { step: 1, label: "Delivery", icon: FiTruck },
              { step: 2, label: "Payment", icon: FiCreditCard },
              { step: 3, label: "Review", icon: FiCheck },
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isCompleted = currentStep > item.step;

              return (
                <div key={item.step} className="flex flex-1 items-center">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold transition-colors sm:h-10 sm:w-10 ${
                        isCompleted
                          ? "bg-[#549558] text-white"
                          : isActive
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-200 text-neutral-500"
                      }`}
                    >
                      {isCompleted ? <FiCheck className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <span
                      className={`hidden text-sm font-medium sm:block ${
                        isActive || isCompleted ? "text-neutral-900" : "text-neutral-400"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {index < 2 && (
                    <div className="mx-3 h-1 flex-1 rounded-full bg-neutral-200 sm:mx-4">
                      <div
                        className={`h-full rounded-full bg-[#549558] transition-all duration-300 ${
                          isCompleted ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Left Column - Forms */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Step 1: Delivery */}
            {currentStep === 1 && (
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="border-b border-neutral-100 px-4 py-4 sm:px-6">
                  <h2 className="text-lg font-bold text-neutral-900">Delivery Information</h2>
                  <p className="text-sm text-neutral-500">Where should we deliver your order?</p>
                </div>

                <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
                  {/* Full Name */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="John Doe"
                        className={`w-full rounded-xl border-2 py-3 pl-11 pr-4 outline-none transition-colors ${
                          errors.fullName
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-neutral-200 bg-neutral-50 focus:border-[#549558] focus:bg-white"
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="john@example.com"
                          className={`w-full rounded-xl border-2 py-3 pl-11 pr-4 outline-none transition-colors ${
                            errors.email
                              ? "border-red-300 bg-red-50 focus:border-red-500"
                              : "border-neutral-200 bg-neutral-50 focus:border-[#549558] focus:bg-white"
                          }`}
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="+234 800 000 0000"
                          className={`w-full rounded-xl border-2 py-3 pl-11 pr-4 outline-none transition-colors ${
                            errors.phone
                              ? "border-red-300 bg-red-50 focus:border-red-500"
                              : "border-neutral-200 bg-neutral-50 focus:border-[#549558] focus:bg-white"
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
                      <textarea
                        value={formData.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        placeholder="123 Victoria Island, beside..."
                        rows={2}
                        className={`w-full resize-none rounded-xl border-2 py-3 pl-11 pr-4 outline-none transition-colors ${
                          errors.address
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-neutral-200 bg-neutral-50 focus:border-[#549558] focus:bg-white"
                        }`}
                      />
                    </div>
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </div>

                  {/* City & State */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="Lagos"
                        className={`w-full rounded-xl border-2 px-4 py-3 outline-none transition-colors ${
                          errors.city
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-neutral-200 bg-neutral-50 focus:border-[#549558] focus:bg-white"
                        }`}
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => updateField("state", e.target.value)}
                        className={`w-full appearance-none rounded-xl border-2 px-4 py-3 outline-none transition-colors ${
                          errors.state
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-neutral-200 bg-neutral-50 focus:border-[#549558] focus:bg-white"
                        }`}
                      >
                        <option value="">Select State</option>
                        {NIGERIAN_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                    </div>
                  </div>

                  {/* Delivery Notes */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                      Delivery Notes <span className="text-neutral-400">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      placeholder="Any special delivery instructions..."
                      rows={2}
                      className="w-full resize-none rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-colors focus:border-[#549558] focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="border-b border-neutral-100 px-4 py-4 sm:px-6">
                  <h2 className="text-lg font-bold text-neutral-900">Payment Method</h2>
                  <p className="text-sm text-neutral-500">Choose how you'd like to pay</p>
                </div>

                <div className="space-y-3 p-4 sm:p-6">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setSelectedPayment(method)}
                      className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                        selectedPayment === method
                          ? "border-[#549558] bg-[#549558]/5"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                          selectedPayment === method
                            ? "bg-[#549558] text-white"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {method === "Card Payment" && <FiCreditCard className="h-6 w-6" />}
                        {method === "Bank Transfer" && <FiHome className="h-6 w-6" />}
                        {method === "Pay on Delivery" && <span className="text-xl">💵</span>}
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900">{method}</p>
                        <p className="text-sm text-neutral-500">
                          {method === "Card Payment" && "Visa, Mastercard, Verve"}
                          {method === "Bank Transfer" && "Pay via bank transfer"}
                          {method === "Pay on Delivery" && "Pay when you receive"}
                        </p>
                      </div>

                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          selectedPayment === method
                            ? "border-[#549558] bg-[#549558]"
                            : "border-neutral-300"
                        }`}
                      >
                        {selectedPayment === method && <FiCheck className="h-4 w-4 text-white" />}
                      </div>
                    </button>
                  ))}

                  {/* Security Note */}
                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#549558]/10 p-4">
                    <FiShield className="h-5 w-5 shrink-0 text-[#549558]" />
                    <p className="text-sm text-neutral-600">Your payment information is secure and encrypted</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-4">
                {/* Delivery Review */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 sm:px-6">
                    <h3 className="font-semibold text-neutral-900">Delivery Address</h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-1 text-sm font-medium text-[#549558] hover:underline"
                    >
                      <FiEdit3 className="h-4 w-4" />
                      Edit
                    </button>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="font-semibold text-neutral-900">{formData.fullName}</p>
                    <p className="mt-1 text-sm text-neutral-600">{formData.phone}</p>
                    <p className="text-sm text-neutral-600">{formData.email}</p>
                    <p className="mt-2 text-sm text-neutral-600">
                      {formData.address}, {formData.city}, {formData.state}
                    </p>
                    {formData.notes && (
                      <p className="mt-2 text-sm italic text-neutral-500">Note: {formData.notes}</p>
                    )}
                  </div>
                </div>

                {/* Payment Review */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 sm:px-6">
                    <h3 className="font-semibold text-neutral-900">Payment Method</h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-1 text-sm font-medium text-[#549558] hover:underline"
                    >
                      <FiEdit3 className="h-4 w-4" />
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center gap-3 p-4 sm:p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
                      {selectedPayment === "Card Payment" && <FiCreditCard className="h-5 w-5 text-neutral-600" />}
                      {selectedPayment === "Bank Transfer" && <FiHome className="h-5 w-5 text-neutral-600" />}
                      {selectedPayment === "Pay on Delivery" && <span>💵</span>}
                    </div>
                    <span className="font-medium text-neutral-900">{selectedPayment}</span>
                  </div>
                </div>

                {/* Items Review */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 sm:px-6">
                    <h3 className="font-semibold text-neutral-900">Order Items ({summary.itemCount})</h3>
                    <Link
                      to={APP_ROUTES.cart}
                      className="flex items-center gap-1 text-sm font-medium text-[#549558] hover:underline"
                    >
                      <FiEdit3 className="h-4 w-4" />
                      Edit
                    </Link>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 p-4">
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/56?text=🛒";
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-neutral-900">{item.product.name}</p>
                          <p className="text-sm text-neutral-500">
                            {item.selectedVariation?.label || item.product.unit} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-neutral-900">
                          {formatPrice(getItemPrice(item) * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={currentStep === 1 ? () => navigate(APP_ROUTES.cart) : handleBack}
                className="flex items-center gap-2 rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 sm:px-6"
              >
                <FiArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">{currentStep === 1 ? "Back to Cart" : "Back"}</span>
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 sm:px-8"
                >
                  Continue
                  <FiChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex items-center gap-2 rounded-xl bg-[#549558] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#468349] disabled:opacity-50 sm:px-8"
                >
                  {isProcessing ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiLock className="h-5 w-5" />
                      Place Order
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-1 lg:order-2 lg:w-80 xl:w-96">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm lg:sticky lg:top-24">
              <div className="border-b border-neutral-100 px-4 py-4">
                <h2 className="font-bold text-neutral-900">Order Summary</h2>
              </div>

              {/* Items Preview - Hidden on small mobile */}
              <div className="hidden max-h-52 divide-y divide-neutral-100 overflow-y-auto border-b border-neutral-100 sm:block">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/48?text=🛒";
                        }}
                      />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-neutral-900">{item.product.name}</p>
                      <p className="text-xs text-neutral-500">{item.selectedVariation?.label || item.product.unit}</p>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {formatPrice(getItemPrice(item) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile: Just show count */}
              <div className="flex items-center justify-between border-b border-neutral-100 p-4 sm:hidden">
                <span className="text-neutral-600">{summary.itemCount} items</span>
                <Link to={APP_ROUTES.cart} className="text-sm font-medium text-[#549558]">
                  View Cart
                </Link>
              </div>

              {/* Totals */}
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatPrice(summary.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Delivery</span>
                  <span className={`font-medium ${summary.deliveryFee === 0 ? "text-[#549558]" : "text-neutral-900"}`}>
                    {summary.subtotal >= 15000 ? "FREE" : formatPrice(summary.deliveryFee)}
                  </span>
                </div>
                <div className="h-px bg-neutral-100" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">Total</span>
                  <span className="text-xl font-bold text-neutral-900">{formatPrice(summary.total)}</span>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="border-t border-neutral-100 p-4">
                <div className="flex items-center gap-3 rounded-xl bg-[#549558]/10 p-3">
                  <FiClock className="h-5 w-5 shrink-0 text-[#549558]" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Estimated Delivery</p>
                    <p className="text-xs text-neutral-500">2-4 hours after confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}