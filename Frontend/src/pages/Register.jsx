// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { useAuth } from "../context/AuthContext";

// const Register = () => {

//   const navigate = useNavigate();
//   const { register } = useAuth();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });

//   };

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     setError("");

//     if (
//       formData.password !==
//       formData.confirmPassword
//     ) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {

//       await register({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password
//       });

//       navigate("/dashboard");

//     } catch (error) {

//       setError(
//         error.response?.data?.message ||
//         "Registration failed"
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

//       <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

//         <h1 className="mb-2 text-center text-3xl font-bold">
//           Create Account
//         </h1>

//         <p className="mb-6 text-center text-gray-500">
//           Join ExpenseTracker
//         </p>

//         {error && (
//           <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
//             {error}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >

//           <div>

//             <label className="mb-2 block font-semibold">
//               Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full rounded border px-4 py-3"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block font-semibold">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full rounded border px-4 py-3"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block font-semibold">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               minLength="6"
//               className="w-full rounded border px-4 py-3"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block font-semibold">
//               Confirm Password
//             </label>

//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               className="w-full rounded border px-4 py-3"
//             />

//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded bg-slate-900 py-3 font-semibold text-white"
//           >
//             {loading ? "Creating..." : "Create Account"}
//           </button>

//         </form>

//         <p className="mt-6 text-center text-gray-600">

//           Already have an account?{" "}

//           <Link
//             to="/login"
//             className="font-semibold text-blue-600"
//           >
//             Login
//           </Link>

//         </p>

//       </div>

//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const getPasswordStrength = () => {
    const password = formData.password;

    if (!password) {
      return {
        label: "",
        width: "w-0",
        text: ""
      };
    }

    if (password.length < 6) {
      return {
        label: "Weak",
        width: "w-1/4",
        text: "text-red-500"
      };
    }

    if (password.length < 8) {
      return {
        label: "Medium",
        width: "w-2/4",
        text: "text-amber-500"
      };
    }

    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return {
        label: "Strong",
        width: "w-full",
        text: "text-emerald-500"
      };
    }

    return {
      label: "Good",
      width: "w-3/4",
      text: "text-blue-500"
    };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      await register(userData);

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Registration failed"
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
        {/* REGISTER FORM */}
        {/* ========================= */}

        <div className="order-2 flex items-center justify-center px-5 py-16 lg:order-1 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-8 flex justify-center lg:hidden">

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
            <div className="mb-7">

              <p className="mb-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
                GET STARTED
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Create your account
              </h1>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Start tracking your expenses with ExpenseTracker today.
              </p>

            </div>


            {/* Form Card */}
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
                className="space-y-4"
              >

                {/* Name */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Full name
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                      👤
                    </span>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Anuraag Narayan"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                    />

                  </div>

                </div>


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

                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
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
                      placeholder="Create a password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3.5 pr-16 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>


                  {/* Password strength */}
                  {formData.password && (
                    <div className="mt-3">

                      <div className="flex justify-between text-xs">

                        <span className="text-slate-400">
                          Password strength
                        </span>

                        <span
                          className={`font-semibold ${passwordStrength.text}`}
                        >
                          {passwordStrength.label}
                        </span>

                      </div>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

                        <div
                          className={`h-full rounded-full bg-blue-500 transition-all duration-300 ${passwordStrength.width}`}
                        />

                      </div>

                    </div>
                  )}

                </div>


                {/* Confirm Password */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Confirm password
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                      🔐
                    </span>

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={
                        formData.confirmPassword
                      }
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3.5 pr-16 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    >
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>


                {/* Terms */}
                <div className="flex gap-3 pt-2">

                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs leading-5 text-slate-500 dark:text-slate-400"
                  >
                    I agree to the ExpenseTracker terms and
                    acknowledge the privacy policy.
                  </label>

                </div>


                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:translate-y-0 disabled:opacity-60"
                >
                  {loading
                    ? "Creating account..."
                    : "Create account"}
                </button>

              </form>


              {/* Login */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center dark:border-slate-800">

                <p className="text-sm text-slate-500 dark:text-slate-400">

                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Sign in
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* RIGHT BRANDING */}
        {/* ========================= */}

        <div className="relative order-1 hidden overflow-hidden bg-slate-950 lg:order-2 lg:flex">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.45),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.4),_transparent_45%)]" />

          <div className="relative z-10 flex flex-col justify-center p-12 xl:p-20">

            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-2xl font-bold text-white shadow-2xl shadow-blue-500/30">
              T
            </div>

            <h2 className="max-w-xl text-5xl font-bold leading-tight text-white xl:text-6xl">
              Everything you need to
              <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                manage your money.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
              Add expenses, sort them by category and
              see exactly where your money goes every month.
            </p>


            {/* Progress visualization */}
            <div className="mt-12 max-w-lg rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-white">
                    Monthly spending
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Keep moving forward
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  +24%
                </span>

              </div>


              <div className="mt-6 flex items-end gap-2">

                {[35, 50, 45, 70, 60, 85, 95].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-violet-500 opacity-80"
                      style={{
                        height: `${height}px`
                      }}
                    />
                  )
                )}

              </div>

              <div className="mt-3 flex justify-between text-[10px] text-slate-600">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;