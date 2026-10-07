import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      await login(formData);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">

      {/* Theme Toggle */}
      <div className="absolute right-5 top-5 z-50">
        <ThemeToggle />
      </div>

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ========================= */}
        {/* LEFT BRANDING SECTION */}
        {/* ========================= */}

        <div className="relative hidden overflow-hidden bg-slate-950 lg:flex">

          {/* Background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.45),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(124,58,237,0.35),_transparent_40%)]" />

          {/* Decorative circles */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-blue-400/20" />

          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full border border-violet-400/20" />

          <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-600/30">
                T
              </div>

              <span className="text-xl font-bold text-white">
                ExpenseTracker
              </span>

            </div>


            {/* Main content */}
            <div className="max-w-xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Your personal finance workspace
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
                Track your spending.
                <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Save more.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Record expenses, see where your money goes
                and stay on top of your budget.
              </p>


              {/* Feature cards */}
              <div className="mt-10 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="text-2xl">✓</div>

                  <p className="mt-3 font-semibold text-white">
                    Stay in control
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Keep every expense in one place.
                  </p>
                </div>


                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="text-2xl">↗</div>

                  <p className="mt-3 font-semibold text-white">
                    See the trends
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Know your top spending categories.
                  </p>
                </div>

              </div>

            </div>


            {/* Footer */}
            <p className="text-sm text-slate-500">
              © 2026 ExpenseTracker. Built for smart spending.
            </p>

          </div>
        </div>


        {/* ========================= */}
        {/* LOGIN SECTION */}
        {/* ========================= */}

        <div className="flex items-center justify-center px-5 py-20 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-10 flex justify-center lg:hidden">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                  T
                </div>

                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  ExpenseTracker
                </span>

              </div>

            </div>


            {/* Heading */}
            <div className="mb-8">

              <p className="mb-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
                WELCOME BACK
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sign in to ExpenseTracker
              </h2>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Enter your credentials to continue to your workspace.
              </p>

            </div>


            {/* Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">

              {/* Error */}
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">

                  <span>⚠️</span>

                  <span>{error}</span>

                </div>
              )}


              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Email */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Email address
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      @
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                    />

                  </div>

                </div>


                {/* Password */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      🔒
                    </span>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3.5 pr-14 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>


                {/* Remember */}
                <div className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="remember"
                    className="text-sm text-slate-500 dark:text-slate-400"
                  >
                    Remember me
                  </label>

                </div>


                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:translate-y-0 disabled:opacity-60"
                >
                  {loading
                    ? "Signing in..."
                    : "Sign in"}
                </button>

              </form>


              {/* Register */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center dark:border-slate-800">

                <p className="text-sm text-slate-500 dark:text-slate-400">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Create account
                  </Link>

                </p>

              </div>

            </div>


            <p className="mt-6 text-center text-xs text-slate-400">
              Secure authentication powered by ExpenseTracker
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;