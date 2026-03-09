import { useState, FormEvent } from "react";
import { FiMail, FiArrowRight, FiCheck, FiGift } from "react-icons/fi";
import { HOME_CONTENT } from "../../config/homeContent";

const { newsletter } = HOME_CONTENT;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSuccess(true);
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900">
        {/* Background Accents */}
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#f6ae59]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#549558]/20 blur-3xl" />

        {/* Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            {/* Icon */}
            <div className="mb-6 inline-flex items-center justify-center">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f6ae59]">
                  <span className="text-3xl">{newsletter.emoji}</span>
                </div>
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-lg bg-[#549558]">
                  <FiGift className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {newsletter.title}
            </h2>

            {/* Subtitle */}
            <p className="mb-10 text-lg text-neutral-400">
              {newsletter.subtitle}
            </p>

            {/* Form */}
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* Input */}
                  <div className="relative flex-1">
                    <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={newsletter.placeholder}
                      required
                      className="h-14 w-full rounded-xl border-2 border-neutral-700 bg-neutral-800 pl-12 pr-4 text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-[#f6ae59] focus:outline-none"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex h-14 items-center justify-center gap-2 rounded-xl bg-[#f6ae59] px-8 font-bold text-neutral-900 transition-all duration-300 hover:bg-[#ffbe6a] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-5 w-5 animate-spin\" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Subscribing</span>
                      </span>
                    ) : (
                      <>
                        <span>{newsletter.ctaText}</span>
                        <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="mt-4 text-xs text-neutral-500">
                  {newsletter.disclaimer}
                </p>
              </form>
            ) : (
              /* Success State */
              <div className="mx-auto max-w-md rounded-2xl border border-[#549558]/30 bg-[#549558]/10 p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#549558]">
                  <FiCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">You're in!</h3>
                <p className="text-neutral-400">
                  Check your email for your exclusive discount code.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 text-sm font-semibold text-[#f6ae59] hover:underline"
                >
                  Subscribe another email
                </button>
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {[
                { icon: "🔒", text: "Secure & Private" },
                { icon: "✨", text: "Exclusive Deals" },
                { icon: "🚫", text: "No Spam Ever" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs font-medium text-neutral-500">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}