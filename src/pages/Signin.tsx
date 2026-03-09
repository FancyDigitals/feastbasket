import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiMail, 
  FiLock, 
  FiArrowRight, 
  FiEye, 
  FiEyeOff, 
  FiCheck,
  FiShield,
  FiZap,
  FiUser
} from "react-icons/fi";
import { APP_ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";

export default function Signin() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  
  const [email, setEmail] = useState("customer@feastbasket.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      await signin({ email, password });
      
      // Show success state
      setIsSuccess(true);
      
      // Wait a moment then navigate to profile
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(APP_ROUTES.profile);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  // Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl text-center">
            {/* Success Animation */}
            <div className="mb-6 inline-flex">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-[#549558]/20" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#549558]">
                  <FiCheck className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="mb-2 text-2xl font-black text-neutral-900">Welcome Back!</h2>
            <p className="mb-6 text-neutral-500">Redirecting you to your profile...</p>
            
            {/* Loading Bar */}
            <div className="mx-auto h-1 w-48 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full w-full animate-[loading_1s_ease-in-out] rounded-full bg-[#549558]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading State (Full Screen)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#549558]/20 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#f6ae59]/20 blur-3xl" />
        </div>

        <div className="relative text-center">
          {/* Animated Logo */}
          <div className="mb-8 inline-flex">
            <div className="relative">
              {/* Outer Ring */}
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#549558]" style={{ animationDuration: '1s' }} />
              
              {/* Middle Ring */}
              <div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-[#f6ae59]" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
              
              {/* Center */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <span className="text-4xl">🛒</span>
              </div>
            </div>
          </div>

          <h2 className="mb-3 text-2xl font-black text-white">Signing you in...</h2>
          <p className="text-neutral-400">Please wait a moment</p>

          {/* Progress Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 animate-bounce rounded-full bg-[#549558]"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm">
            {/* Logo */}
            <div className="mb-8">
              <Link to={APP_ROUTES.home} className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#549558] to-[#3d7240] shadow-lg shadow-[#549558]/25">
                  <span className="text-2xl">🛒</span>
                </div>
                <span className="text-xl font-black text-neutral-900">FeastBasket</span>
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-neutral-900">
                Welcome back
              </h1>
              <p className="mt-2 text-neutral-500">
                Sign in to your account to continue shopping
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100">
                  <span>⚠️</span>
                </div>
                <p>{error}</p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3.5 pl-12 pr-4 text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-[#549558] focus:bg-white focus:outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-neutral-700">
                    Password
                  </label>
                  <Link
                    to="#"
                    className="text-sm font-semibold text-[#549558] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3.5 pl-12 pr-12 text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-[#549558] focus:bg-white focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-neutral-300 text-[#549558] focus:ring-[#549558]"
                />
                <label htmlFor="remember" className="text-sm text-neutral-600">
                  Keep me signed in for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-neutral-900 py-4 font-bold text-white transition-all hover:bg-[#549558] hover:shadow-lg hover:shadow-[#549558]/25"
              >
                <span>Sign In</span>
                <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-sm text-neutral-400">or continue with</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-200 bg-white py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-200 bg-white py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-neutral-600">
              Don't have an account?{" "}
              <Link
                to={APP_ROUTES.signup}
                className="font-bold text-[#549558] hover:underline"
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="relative hidden flex-1 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-[#549558] via-[#3d7240] to-[#2d5230]">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            {/* Decorative Orbs */}
            <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-[#f6ae59]/20 blur-3xl" />

            {/* Content */}
            <div className="relative flex h-full flex-col justify-center p-12 xl:p-20">
              {/* Main Visual */}
              <div className="mb-12">
                <div className="mb-8 text-9xl">🛒</div>
                <h2 className="mb-4 text-4xl font-black text-white xl:text-5xl">
                  Fresh groceries,
                  <br />
                  delivered fast.
                </h2>
                <p className="max-w-md text-lg text-white/80">
                  Join thousands of happy customers who shop with us every day.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {[
                  { icon: FiZap, text: "Same-day delivery available" },
                  { icon: FiShield, text: "100% secure checkout" },
                  { icon: FiUser, text: "Personalized recommendations" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-white">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-[#549558] bg-gradient-to-br from-white/20 to-white/5"
                    />
                  ))}
                </div>
                <div className="text-white">
                  <p className="font-bold">Trusted by 10,000+</p>
                  <p className="text-sm text-white/70">Happy customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}