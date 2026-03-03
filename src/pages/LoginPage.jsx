import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, Star, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import { PageTransition } from "../components/layout/PageTransition";

const features = [
  "Effortlessly spider and map targets to uncover hidden security flaws",
  "Deliver high-quality, validated findings in hours, not weeks.",
  "Generate professional, enterprise-grade security reports automatically.",
];

const socialButtons = [
  {
    label: "Apple",
    ariaLabel: "Sign up with Apple",
    bg: "bg-black hover:opacity-90 text-white",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-current"
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  {
    label: "Google",
    ariaLabel: "Sign up with Google",
    bg: "bg-white hover:bg-gray-50 border border-gray-200",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
  },
  {
    label: "Meta",
    ariaLabel: "Sign up with Meta",
    bg: "bg-[#1877F2] hover:opacity-90 text-white",
    icon: (
      <svg
        viewBox="0 0 48 24"
        className="w-6 h-4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 12C6 6 10 4 14 4C18 4 20 8 24 14C28 8 30 4 34 4C38 4 42 6 44 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 12C42 18 38 20 34 20C30 20 28 16 24 10C20 16 18 20 14 20C10 20 6 18 4 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [showPwd, setShowPwd] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    // ADD THIS — was missing
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!agreed) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success("Welcome to APS!");
      navigate("/dashboard");
    }, 1200);
  };

  const inputClass = [
    "w-full rounded-lg px-3 py-2.5 text-sm transition-all",
    "border border-gray-200 dark:border-white/10",
    "bg-white dark:bg-white/5",
    "text-gray-900 dark:text-white",
    "placeholder:text-gray-400 dark:placeholder:text-white/30",
    "focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal",
  ].join(" ");

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col overflow-hidden bg-[#080e08]">
        {/* Gradient background */}
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#071410] via-[#080e08] to-[#060606]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-red-800/10 rounded-full blur-[100px]" />
          <div className="absolute top-10 left-0 w-72 h-72 bg-brand-teal/8 rounded-full blur-[90px]" />
        </div>

        {/* Top bar */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-5 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-brand-teal flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <span className="font-bold text-[15px] text-white tracking-tight">
              aps
            </span>
          </div>

          <button
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg bg-white/8 text-white/70 hover:bg-white/15 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          >
            {isDark ? (
              <Sun size={15} aria-hidden="true" />
            ) : (
              <Moon size={15} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Page body */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            {/* LEFT: hero copy */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex-1 max-w-[500px] w-full"
            >
              <h1 className="text-4xl lg:text-[48px] font-bold text-white leading-[1.15] tracking-tight mb-6">
                Expert level Cybersecurity in{" "}
                <span className="text-brand-teal">hours</span> not weeks.
              </h1>

              <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-3">
                What's included
              </p>

              <ul className="space-y-2.5 mb-10">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={15}
                      className="text-brand-teal mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white/65 leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-1.5 mb-1">
                <Star
                  size={14}
                  className="text-brand-teal fill-brand-teal"
                  aria-hidden="true"
                />
                <span className="text-sm text-white/50">Trustpilot</span>
              </div>
              <p className="text-sm text-white/80">
                Rated <span className="font-bold text-white">4.5/5.0</span>{" "}
                <span className="text-white/40 text-xs">(100k+ reviews)</span>
              </p>
            </motion.div>

            {/* RIGHT: sign-up card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="w-full max-w-[420px] flex-shrink-0"
            >
              <div className="rounded-2xl p-8 bg-white dark:bg-[#161b16] border border-black/5 dark:border-white/6 shadow-2xl shadow-black/50">
                <h2 className="text-[22px] font-bold text-gray-900 dark:text-white text-center mb-1">
                  Sign up
                </h2>
                <p className="text-sm text-gray-400 dark:text-white/40 text-center mb-6">
                  Already have an account?{" "}
                  <button
                    onClick={() => toast.info("Login coming soon!")}
                    className="text-brand-teal hover:underline font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-sm"
                  >
                    Log in
                  </button>
                </p>

                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="First name*"
                      aria-label="First name"
                      aria-required="true"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, firstName: e.target.value }))
                      }
                      className={inputClass}
                    />
                    <input
                      type="text"
                      placeholder="Last name*"
                      aria-label="Last name"
                      aria-required="true"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, lastName: e.target.value }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email address*"
                    aria-label="Email address"
                    aria-required="true"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className={inputClass}
                  />

                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="Password (8+ characters)*"
                      aria-label="Password"
                      aria-required="true"
                      value={form.password}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, password: e.target.value }))
                      }
                      className={inputClass + " pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((p) => !p)}
                      aria-label={showPwd ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/25 hover:text-gray-600 dark:hover:text-white/60 transition-colors focus:outline-none"
                    >
                      {showPwd ? (
                        <EyeOff size={15} aria-hidden="true" />
                      ) : (
                        <Eye size={15} aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none pt-0.5">
                    <div
                      role="checkbox"
                      aria-checked={agreed}
                      aria-label="Agree to Terms and Conditions"
                      tabIndex={0}
                      onClick={() => setAgreed((p) => !p)}
                      onKeyDown={(e) =>
                        (e.key === " " || e.key === "Enter") &&
                        setAgreed((p) => !p)
                      }
                      className={[
                        "w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal",
                        agreed
                          ? "bg-brand-teal border-brand-teal"
                          : "border-gray-300 dark:border-white/20 bg-transparent",
                      ].join(" ")}
                    >
                      {agreed && (
                        <Check
                          size={10}
                          className="text-white"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
                      I agree to Aps's{" "}
                      <button
                        type="button"
                        onClick={() =>
                          toast.info("Terms & Conditions coming soon")
                        }
                        className="text-brand-teal hover:underline focus:outline-none"
                      >
                        Terms & Conditions
                      </button>{" "}
                      and acknowledge the{" "}
                      <button
                        type="button"
                        onClick={() => toast.info("Privacy Policy coming soon")}
                        className="text-brand-teal hover:underline focus:outline-none"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    aria-label="Create your account"
                    aria-busy={loading}
                    className="w-full bg-brand-teal hover:brightness-110 active:brightness-95 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 mt-1 disabled:opacity-60 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
                  >
                    {loading ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                          aria-hidden="true"
                        />
                        Creating...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </button>
                </form>

                <div
                  className="flex items-center gap-2.5 mt-4"
                  role="group"
                  aria-label="Social login options"
                >
                  {socialButtons.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      aria-label={s.ariaLabel}
                      onClick={() => toast.info(`${s.label} login coming soon`)}
                      className={[
                        "flex-1 py-2.5 rounded-lg flex items-center justify-center transition-all",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal",
                        s.bg,
                      ].join(" ")}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
